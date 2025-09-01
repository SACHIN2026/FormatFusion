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
    price: 100, // Amount in paise (₹1.00)
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
    price: 199, // Amount in paise (₹1.99)
    features: [
      'Everything in Basic',
      'Batch processing',
      'API access',
      'Custom integrations',
      '24/7 premium support',
    ],
  },
];

export default function PricingPlans() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      alert('Please login to subscribe');
      return;
    }

    if (planId === 'free') {
      alert('You are already on the free plan');
      return;
    }

    setLoading(planId);

    try {
      // Step 1: Create order on server (amount computed server-side)
      console.log('Creating order with:', { planId });
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Step 2: Load Razorpay checkout
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        // Step 3: Initialize Razorpay checkout
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'FormatFusion',
          description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan Subscription`,
          order_id: orderData.id,
          handler: async (response: any) => {
            try {
              // Step 4: Verify payment on server
              const verifyResponse = await fetch('/api/razorpay/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  planId: planId,
                }),
              });

              const verifyData = await verifyResponse.json();

              if (verifyData.success) {
                window.location.href = '/subscription/success';
              } else {
                throw new Error('Payment verification failed');
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              alert('Payment verification failed. Please contact support.');
            }
          },
          prefill: {
            name: session.user?.name || '',
            email: session.user?.email || '',
          },
          theme: {
            color: '#3B82F6',
          },
          modal: {
            ondismiss: () => {
              setLoading(null);
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        alert('Failed to load Razorpay checkout. Please try again.');
        setLoading(null);
      };

    } catch (error) {
      console.error('Payment initiation error:', error);
      alert('Failed to initiate payment. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Upgrade to unlock unlimited conversions and premium features
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 ${
                plan.recommended
                  ? 'border-blue-500 shadow-lg scale-105'
                  : ''
              }`}
            >
              {plan.recommended && (
                <div className="bg-blue-500 text-white text-center py-2 rounded-t-lg">
                  <span className="text-sm font-medium">Most Popular</span>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-4 text-sm text-gray-500">
                  Perfect for {plan.name.toLowerCase()} users
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ₹{plan.price === 0 ? '0' : (plan.price / 100).toFixed(2)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-base font-medium text-gray-500">
                      /month
                    </span>
                  )}
                </p>
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                  className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                    plan.recommended
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-800 text-white hover:bg-gray-900'
                  } ${
                    loading === plan.id ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading === plan.id ? 'Processing...' : 
                   plan.id === 'free' ? 'Current Plan' : 'Subscribe Now'}
                </button>
              </div>
              
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
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