'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface Subscription {
  status: 'free' | 'active' | 'cancelled' | 'expired';
  plan: 'free' | 'basic' | 'premium';
  currentPeriodEnd?: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [subscription, setSubscription] = useState<Subscription>({
    status: 'free',
    plan: 'free',
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const refreshSubscription = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(`/api/subscription/status?t=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Manual refresh subscription data:', JSON.stringify(data, null, 2));
        setSubscription(data.subscription || { status: 'free', plan: 'free' });
      } else {
        console.error('Failed to fetch subscription:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error refreshing subscription:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const debugUser = async () => {
    try {
      const response = await fetch('/api/debug/user');
      if (response.ok) {
        const data = await response.json();
        console.log('DEBUG - Complete user data:', JSON.stringify(data, null, 2));
        alert('Check console for complete user data');
      } else {
        console.error('Failed to fetch debug data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching debug data:', error);
    }
  };

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      redirect('/login');
    }
  }, [session, status]);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        // Add timestamp to force fresh data
        const response = await fetch(`/api/subscription/status?t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Dashboard subscription data:', data);
          setSubscription(data.subscription || { status: 'free', plan: 'free' });
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [session]);

  // Add effect to refetch subscription data when user returns from payment
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && session?.user?.email) {
        // Refetch subscription when page becomes visible (user returns from payment)
        const fetchSubscription = async () => {
          try {
            const response = await fetch(`/api/subscription/status?t=${Date.now()}`);
            if (response.ok) {
              const data = await response.json();
              console.log('Refreshed subscription data:', data);
              setSubscription(data.subscription || { status: 'free', plan: 'free' });
            }
          } catch (error) {
            console.error('Error refreshing subscription:', error);
          }
        };
        fetchSubscription();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {session.user?.name || session.user?.email}!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Subscription Status Card */}
          <div className="lg:col-span-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Subscription Status
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={refreshSubscription}
                      disabled={refreshing}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                    <button
                      onClick={debugUser}
                      className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Debug
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        subscription.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : subscription.status === 'expired'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {subscription.status.charAt(0).toUpperCase() + 
                       subscription.status.slice(1)}
                    </span>
                    <span className="ml-2 text-sm text-gray-900 capitalize">
                      {subscription.plan} Plan
                    </span>
                  </div>
                  
                  {subscription.currentPeriodEnd && (
                    <p className="mt-2 text-sm text-gray-600">
                      {subscription.status === 'active' ? 'Renews' : 'Expired'} on{' '}
                      {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-IN')}
                    </p>
                  )}

                  {subscription.status !== 'active' && (
                    <div className="mt-4">
                      <Link
                        href="/pricing"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Upgrade Plan
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Quick Actions
                </h3>
                <div className="mt-4 space-y-3">
                  <Link
                    href="/convert"
                    className="block w-full text-left px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    🔄 Convert Files
                  </Link>
                  <Link
                    href="/removebackground"
                    className="block w-full text-left px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    🖼️ Remove Background
                  </Link>
                  <Link
                    href="/history"
                    className="block w-full text-left px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    📋 View History
                  </Link>
                  <Link
                    href="/pricing"
                    className="block w-full text-left px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    💰 View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Features */}
        <div className="mt-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Your Plan Features
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center">
                  <svg
                    className={`h-5 w-5 ${
                      subscription.status === 'active' ? 'text-green-500' : 'text-gray-400'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm text-gray-900">
                    {subscription.status === 'active' ? 'Unlimited' : '5'} Conversions
                  </span>
                </div>
                
                <div className="flex items-center">
                  <svg
                    className={`h-5 w-5 ${
                      subscription.status === 'active' ? 'text-green-500' : 'text-gray-400'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm text-gray-900">
                    All File Formats
                  </span>
                </div>

                <div className="flex items-center">
                  <svg
                    className={`h-5 w-5 ${
                      subscription.plan === 'premium' ? 'text-green-500' : 'text-gray-400'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm text-gray-900">
                    Batch Processing
                  </span>
                </div>

                <div className="flex items-center">
                  <svg
                    className={`h-5 w-5 ${
                      subscription.plan === 'premium' ? 'text-green-500' : 'text-gray-400'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm text-gray-900">
                    API Access
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Statistics Card */}
        <div className="mt-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Account Information
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{session.user?.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Current Plan</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">
                    {subscription.plan} Plan
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">
                    {subscription.status}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date().toLocaleDateString('en-IN')}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
