import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createOrder, PLANS } from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    // Validate session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { planId } = body;

    if (!planId) {
      return NextResponse.json({ error: 'Missing planId' }, { status: 400 });
    }

    // Validate planId and get server-side amount
    const validPlans = ['basic', 'premium'];
    if (!validPlans.includes(planId)) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const plan = PLANS[planId as keyof typeof PLANS];
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 400 });
    }

    // Server-side amount calculation with minimum enforcement
    const safeAmount = Math.max(plan.amount, 100); // Enforce INR minimum of ₹1.00 (100 paise)

        // Create order with short receipt (Razorpay limit: 40 chars)
    const timestamp = Date.now().toString().slice(-8);
    const receipt = `rcpt_${timestamp}`;

    const order = await createOrder(safeAmount, 'INR', receipt);

    return NextResponse.json({
      id: order.id,
  amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
