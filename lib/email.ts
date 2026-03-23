import nodemailer from 'nodemailer';

function getSmtpConfig() {
  const host = (process.env.SMTP_HOST || '').trim();
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();

  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
  };
}

function createTransporter() {
  const config = getSmtpConfig();

  if (!config.host || !config.user || !config.pass) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.');
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

export async function sendExpiryReminderEmail(to: string, name: string, daysLeft: number, planName: string) {
  const transporter = createTransporter();
  const subject = `Your FormatFusion ${planName} subscription expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #1e40af;">Hi ${name || 'there'},</h2>
      <p>Your <strong>${planName}</strong> plan on <strong>FormatFusion</strong> is expiring in <strong>${daysLeft} day${daysLeft !== 1 ? 's' : ''}</strong>.</p>
      <p>To keep enjoying unlimited conversions and background removal, renew your plan before it expires.</p>
      <a href="${process.env.NEXTAUTH_URL}/pricing"
         style="display:inline-block;margin-top:16px;padding:12px 24px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
        Renew Now
      </a>
      <p style="margin-top:24px;color:#6b7280;font-size:14px;">
        If you have any questions, reply to this email or contact us at support@formatfusion.dev.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"FormatFusion" <noreply@formatfusion.dev>`,
    to,
    subject,
    html,
  });
}

export async function sendPasswordResetEmail(to: string, name: string, token: string, baseUrl?: string) {
  const transporter = createTransporter();
  const resolvedBaseUrl = (baseUrl || process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '');
  const resetUrl = `${resolvedBaseUrl}/reset-password?token=${encodeURIComponent(token)}`;

  const subject = 'Reset your FormatFusion password';
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #1e40af;">Hi ${name || 'there'},</h2>
      <p>We received a request to reset your password for your <strong>FormatFusion</strong> account.</p>
      <p>Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
      <a href="${resetUrl}"
         style="display:inline-block;margin-top:16px;padding:12px 24px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
        Reset Password
      </a>
      <p style="margin-top:24px;color:#6b7280;font-size:14px;">
        If you didn’t request this, you can safely ignore this email.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"FormatFusion" <noreply@formatfusion.dev>`,
    to,
    subject,
    html,
  });
}
