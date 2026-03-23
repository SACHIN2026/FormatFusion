import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { dbconnect } from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbconnect();
    
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check and auto-expire subscription
    const isActive = user.subscriptionStatus === 'active' &&
      user.subscriptionCurrentPeriodEnd &&
      new Date(user.subscriptionCurrentPeriodEnd) > new Date();
    if (user.subscriptionStatus === 'active' && !isActive) {
      await User.updateOne({ _id: user._id }, { $set: { subscriptionStatus: 'expired' } });
      user.subscriptionStatus = 'expired';
    }

    // Get this month's conversion count
    const { default: History } = await import('@/models/History');
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const conversionCount = await History.countDocuments({
      userId: user._id,
      createdAt: { $gte: startOfMonth },
    });

    return NextResponse.json({
      subscription: {
        status: user.subscriptionStatus || 'free',
        plan: user.subscriptionPlan || 'free',
        currentPeriodEnd: user.subscriptionCurrentPeriodEnd || null,
        createdAt: user.createdAt || null,
        conversionCount,
        conversionLimit: (user.subscriptionStatus === 'active' && isActive) ? null : 5,
      }
    });

  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
