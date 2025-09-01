import { NextResponse } from 'next/server';

export async function GET() {
  // Read Razorpay keys to determine mode (development helper endpoint)
  const keyId = process.env.RAZORPAY_KEY_ID || '';
  const publicKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
  
  // Determine mode from key prefix (safe to expose this info in development)
  let mode: 'live' | 'test' | 'unknown' = 'unknown';
  const activeKey = keyId || publicKeyId;
  
  if (activeKey.startsWith('rzp_live_')) mode = 'live';
  else if (activeKey.startsWith('rzp_test_')) mode = 'test';

  // Only expose minimal, safe debugging info
  return NextResponse.json({
    mode,
    hasKeys: {
      server: !!keyId,
      public: !!publicKeyId,
    },
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
