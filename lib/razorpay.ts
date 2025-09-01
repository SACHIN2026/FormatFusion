import Razorpay from 'razorpay';

// Get environment variables
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay credentials are not set in environment variables');
}

// Initialize Razorpay instance (following official docs)
export const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_KEY_ID!,
  key_secret: RAZORPAY_KEY_SECRET!,
});

// Plan configurations with exact amounts in paise
export const PLANS = {
  basic: {
    name: 'Basic Plan',
    amount: 100, // ₹1.00 in paise
    currency: 'INR',
    description: 'Unlimited conversions with priority support',
  },
  premium: {
    name: 'Premium Plan', 
    amount: 199, // ₹1.99 in paise
    currency: 'INR',
    description: 'Everything in Basic + Batch processing + API access',
  },
};

// Utility function to create orders (following Razorpay docs pattern)
export const createOrder = async (amount: number, currency = 'INR', receipt?: string) => {
  const options = {
    amount: amount, // amount in paise
    currency,
    receipt: receipt || `rcpt_${Date.now().toString().slice(-8)}`, // Max 40 chars
  };

  return await razorpayInstance.orders.create(options);
};

// Utility to verify payment signature
export const verifyPaymentSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): boolean => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const crypto = require('crypto');
    
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    return expectedSignature === razorpaySignature;
  } catch (error) {
    console.error('Error verifying payment signature:', error);
    return false;
  }
};