import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  // This endpoint is for debugging purposes to inspect environment variables
  // on the server.
  
  const envVars = {
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'Not Set',
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'Not Set',
    NODE_ENV: process.env.NODE_ENV || 'Not Set',
    // You can add other variables here to check them
  };

  return NextResponse.json(envVars);
}
