import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { dbconnect } from "@/lib/db";
import User from "@/models/User";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbconnect();

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    const forwardedProto = request.headers.get('x-forwarded-proto');
    const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host');
    const requestBaseUrl = forwardedProto && forwardedHost
      ? `${forwardedProto}://${forwardedHost}`
      : request.nextUrl.origin;
    const explicitResetBaseUrl = (process.env.PASSWORD_RESET_BASE_URL || '').trim();
    const nextAuthBaseUrl = (process.env.NEXTAUTH_URL || '').trim();
    const isLocalUrl = (value: string) => /localhost|127\.0\.0\.1/i.test(value);

    const configuredBaseUrl = explicitResetBaseUrl
      || (nextAuthBaseUrl && !isLocalUrl(nextAuthBaseUrl) ? nextAuthBaseUrl : '');

    const effectiveBaseUrl = (configuredBaseUrl || requestBaseUrl).replace(/\/$/, '');

    if (user && user.password) {
      const rawToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpires = expiresAt;
      await user.save();

      await sendPasswordResetEmail(user.email, user.name || "", rawToken, effectiveBaseUrl);
    } else if (user && !user.password) {
      console.info("Forgot-password requested for OAuth-only account:", user.email);
    }

    return NextResponse.json({
      message: "If an account with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    console.error("Error in forgot-password:", errorMessage);

    return NextResponse.json(
      {
        error: process.env.NODE_ENV === "development" ? errorMessage : "Internal server error",
      },
      { status: 500 }
    );
  }
}
