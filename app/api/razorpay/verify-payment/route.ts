import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { verifyPaymentSignature } from '@/lib/razorpay';
import { dbconnect } from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      planId 
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !planId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify payment signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update user subscription in database
    await dbconnect();

    const currentDate = new Date();
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(currentDate.getMonth() + 1);

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          subscriptionStatus: 'active',
          subscriptionPlan: planId,
          subscriptionCurrentPeriodEnd: nextMonthDate,
          subscriptionId: razorpay_order_id,
          stripeCustomerId: razorpay_payment_id,
        },
      },
      { new: true, upsert: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to update user subscription' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and subscription updated successfully',
      subscription: {
        status: user.subscriptionStatus,
        plan: user.subscriptionPlan,
        currentPeriodEnd: user.subscriptionCurrentPeriodEnd,
      },
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
