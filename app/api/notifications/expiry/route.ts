import { NextRequest, NextResponse } from 'next/server';
import { dbconnect } from '@/lib/db';
import User from '@/models/User';
import { sendExpiryReminderEmail } from '@/lib/email';

// Protect with a shared secret so only a cron job / scheduled call can trigger this
const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(req: NextRequest) {
  // Simple bearer-token guard
  const auth = req.headers.get('authorization');
  if (CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbconnect();

  const now = new Date();
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  // Find active subscribers whose subscription ends within the next 3 days
  const usersExpiringSoon = await User.find({
    subscriptionStatus: 'active',
    subscriptionCurrentPeriodEnd: { $gte: now, $lte: in3Days },
    expiryReminderSent: { $ne: true },
  });

  let sent = 0;
  const errors: string[] = [];

  for (const user of usersExpiringSoon) {
    try {
      const endDate = new Date(user.subscriptionCurrentPeriodEnd);
      const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      const planName = user.subscriptionPlan
        ? user.subscriptionPlan.charAt(0).toUpperCase() + user.subscriptionPlan.slice(1)
        : 'Paid';

      await sendExpiryReminderEmail(user.email, user.name || '', daysLeft, planName);

      // Mark as notified so we don't spam
      await User.findByIdAndUpdate(user._id, { expiryReminderSent: true });
      sent++;
    } catch (err) {
      errors.push(`${user.email}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return NextResponse.json({
    checked: usersExpiringSoon.length,
    sent,
    errors: errors.length > 0 ? errors : undefined,
  });
}
