'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      '5 conversions per month',
      'Basic file formats',
      'Standard processing speed',
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 100, // Amount in paisa (₹1.00)
    features: [
      'Unlimited conversions',
      'All file formats',
      'Fast processing',
      'Priority support',
    ],
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199, // Amount in paisa (₹1.99)
    features: [
      'Everything in Basic',
      'Batch processing',
      'API access',
      'Custom integrations',
      '24/7 premium support',
    ],
  },
];

export default function PricingPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      // Redirect to login instead of showing alert
      window.location.href = '/login';
      return;
    }

    if (planId === 'free') {
      alert('You are already on the free plan');
      return;
    }

    setLoading(planId);

    try {
      // Create order (send only planId; server computes amount)
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        if (orderResponse.status === 401) {
          window.location.href = '/login';
          return;
        }
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          openRazorpayCheckout(orderData, planId);
        };

        script.onerror = () => {
          alert('Failed to load payment gateway');
          setLoading(null);
        };
      } else {
        openRazorpayCheckout(orderData, planId);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to initiate payment');
      setLoading(null);
    }
  };

  const openRazorpayCheckout = (orderData: any, planId: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'FormatFusion',
      description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan Subscription`,
      order_id: orderData.id,
      prefill: {
        name: session?.user?.name || '',
        email: session?.user?.email || '',
      },
      theme: {
        color: '#3B82F6'
      },
      handler: async function (response: any) {        
        try {
          const verifyResponse = await fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok && verifyData.success) {
            console.log('✅ Payment verification successful, redirecting to success page');
            window.location.href = '/subscription/success';
          } else {
            console.error('❌ Payment verification failed:', verifyData);
            alert('Payment verification failed: ' + (verifyData.error || 'Unknown error'));
            window.location.href = '/subscription/cancel';
          }
        } catch (error) {
          console.error('❌ Payment verification error:', error);
          alert('Payment verification error: ' + (error instanceof Error ? error.message : 'Unknown error'));
          window.location.href = '/subscription/cancel';
        }
      },
      modal: {
        ondismiss: function () {
          setLoading(null);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the perfect plan for your file conversion needs
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                plan.recommended
                  ? 'border-2 border-blue-500 relative'
                  : 'border border-gray-200'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-blue-500 text-white">
                    Recommended
                  </span>
                </div>
              )}
              <div className="p-6 bg-white rounded-t-lg">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ₹{plan.price === 0 ? '0' : (plan.price / 100).toFixed(2)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-base font-medium text-gray-500">/month</span>
                  )}
                </p>
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id || plan.id === 'free'}
                  className={`mt-8 w-full rounded-md px-6 py-3 text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    plan.recommended
                      ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                      : plan.id === 'free'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500'
                  } ${loading === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading === plan.id
                    ? 'Processing...'
                    : plan.id === 'free'
                    ? 'Current Plan'
                    : !session
                    ? 'Login to Subscribe'
                    : 'Get Started'}
                </button>
              </div>
              <div className="px-6 pt-6 pb-8 bg-gray-50 rounded-b-lg">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}