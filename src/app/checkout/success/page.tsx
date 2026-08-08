"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Check, Calendar, Clock, CreditCard, Gift, Sparkles } from 'lucide-react';
import { Suspense } from 'react';
import Link from 'next/link';
import AppStoreButtons from '@/components/AppStoreButtons';

interface SubscriptionDetails {
  plan: string;
  status: string;
  billingInterval: string;
  currency: string;
  trialStart: string;
  trialEnd: string | null;
  isTrialing: boolean;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscription_id');
  const setupIntentStatus = searchParams.get('redirect_status');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getPlanDisplayName = (plan: string) => {
    if (plan === 'pro') return 'Pro';
    if (plan === 'proPlus') return 'Pro PLUS';
    return plan;
  };

  const getPrice = (plan: string, interval: string, currency: string) => {
    const prices: Record<string, Record<string, Record<string, string>>> = {
      pro: {
        month: { usd: '$6.99', inr: '₹299' },
        year: { usd: '$69.99', inr: '₹2,999' }
      },
      proPlus: {
        month: { usd: '$14.99', inr: '₹599' },
        year: { usd: '$149.99', inr: '₹5,999' }
      }
    };
    return prices[plan]?.[interval]?.[currency] || '';
  };

  const getTrialDaysRemaining = (trialEnd: string | null) => {
    if (!trialEnd) return 0;
    const now = new Date();
    const end = new Date(trialEnd);
    return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    async function confirmSubscription() {
      if (!subscriptionId) {
        setStatus('error');
        return;
      }

      if (setupIntentStatus === 'succeeded' || subscriptionId) {
        try {
          const bearerToken = localStorage.getItem('bearer_token') || '';
          const res = await fetch('/api/stripe/confirm-subscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${bearerToken}`,
            },
            body: JSON.stringify({ subscriptionId }),
          });

          const data = await res.json();

          if (res.ok && data.subscription) {
            setSubscriptionDetails(data.subscription);
            setStatus('success');
          } else if (res.ok) {
            // API succeeded but no subscription details returned
            setStatus('success');
          } else {
            console.error('Failed to confirm subscription:', data.error);
            setStatus('error');
          }
        } catch (err) {
          console.error('Error confirming subscription:', err);
          setStatus('error');
        }
      } else if (setupIntentStatus === 'failed') {
        setStatus('error');
      }
    }

    confirmSubscription();
  }, [subscriptionId, setupIntentStatus]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Setting up your subscription...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 glass-card rounded-2xl">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t verify your payment. Please contact support if this issue persists.
          </p>
          <a
            href="/pricing"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Pricing
          </a>
        </div>
      </div>
    );
  }

  const trialDays = subscriptionDetails ? getTrialDaysRemaining(subscriptionDetails.trialEnd) : 3;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          
          <h1 className="text-4xl font-bold mb-3">
            Welcome to MyCalAgent {subscriptionDetails ? getPlanDisplayName(subscriptionDetails.plan) : 'Pro'}!
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Your subscription is now active
          </p>
        </div>

        {/* Trial Info Card */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Your 3-Day Free Trial Has Started!</h2>
              <p className="text-muted-foreground">Enjoy full access to all premium features</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <Calendar className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Trial Started</p>
                <p className="font-semibold">
                  {subscriptionDetails ? formatDate(subscriptionDetails.trialStart) : 'Today'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <Clock className="w-6 h-6 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Trial Remaining</p>
                <p className="font-semibold text-amber-400">
                  {trialDays} {trialDays === 1 ? 'day' : 'days'} left
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <CreditCard className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Billing Starts</p>
                <p className="font-semibold">
                  {subscriptionDetails ? formatDate(subscriptionDetails.trialEnd) : 'In 3 days'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Confirmation Card */}
        <div className="glass-card rounded-2xl p-6 mb-6 bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-green-500/20">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-bold text-green-400 mb-1">Payment Method Saved Successfully</h3>
              <p className="text-muted-foreground text-sm">
                {subscriptionDetails ? (
                  <>
                    Your {getPlanDisplayName(subscriptionDetails.plan)} subscription of{' '}
                    <span className="font-semibold text-foreground">
                      {getPrice(subscriptionDetails.plan, subscriptionDetails.billingInterval, subscriptionDetails.currency)}/{subscriptionDetails.billingInterval}
                    </span>{' '}
                    will automatically begin on{' '}
                    <span className="font-semibold text-foreground">
                      {formatDate(subscriptionDetails.trialEnd)}
                    </span>
                  </>
                ) : (
                  'Your subscription will automatically begin after the trial ends.'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* What's Next Card */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold">What&apos;s Included in Your Trial</h3>
          </div>
          <ul className="space-y-3">
            {[
              '7 meal scans per day',
              'Advanced nutritional analysis',
              'Unlimited meal log history',
              'AI coaching & insights',
              'Custom goals & tracking',
              'Health app integration',
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <AppStoreButtons className="justify-center" />
          <Link
            href="/"
            className="block w-full px-6 py-4 border border-white/10 text-foreground rounded-xl font-semibold hover:bg-white/5 transition-colors text-center"
          >
            Go to Home
          </Link>
        </div>

        {/* Cancel Info */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Cancel anytime before your trial ends and you won&apos;t be charged.
        </p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <main className="pt-32 pb-20 px-6">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
