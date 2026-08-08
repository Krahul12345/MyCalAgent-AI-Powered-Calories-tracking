"use client";

import { useEffect, useState, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Navigation } from '@/components/Navigation';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type CheckoutState = 
  | { status: 'idle' }
  | { status: 'loading_checkout' }
  | { status: 'ready'; clientSecret: string; subscriptionId: string }
  | { status: 'error'; message: string };

function PaymentForm({ subscriptionId, onSuccess }: { subscriptionId: string; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [expressCheckoutReady, setExpressCheckoutReady] = useState(false);
  const [showExpressCheckout, setShowExpressCheckout] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || isProcessing) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message || 'An error occurred');
        setIsProcessing(false);
        return;
      }

      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success?subscription_id=${subscriptionId}`,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'An error occurred');
        setIsProcessing(false);
      } else if (setupIntent) {
        if (setupIntent.status === 'succeeded') {
          onSuccess();
        } else if (setupIntent.status === 'processing') {
          setErrorMessage('Your payment is processing. Please wait...');
        } else if (setupIntent.status === 'requires_payment_method') {
          setErrorMessage('Payment failed. Please try another payment method.');
          setIsProcessing(false);
        } else {
          setErrorMessage(`Unexpected status: ${setupIntent.status}`);
          setIsProcessing(false);
        }
      } else {
        setErrorMessage('Something went wrong. Please try again.');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setIsProcessing(false);
    }
  };

  const onExpressCheckoutConfirm = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success?subscription_id=${subscriptionId}`,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'An error occurred');
        setIsProcessing(false);
      } else if (setupIntent) {
        if (setupIntent.status === 'succeeded') {
          onSuccess();
        } else {
          setErrorMessage(`Payment status: ${setupIntent.status}`);
          setIsProcessing(false);
        }
      } else {
        setErrorMessage('Something went wrong. Please try again.');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Express checkout error:', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {showExpressCheckout && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <ExpressCheckoutElement
              onReady={({ availablePaymentMethods }) => {
                if (availablePaymentMethods) {
                  setExpressCheckoutReady(true);
                } else {
                  setShowExpressCheckout(false);
                }
              }}
              onConfirm={onExpressCheckoutConfirm}
              options={{
                buttonType: {
                  applePay: 'subscribe',
                  googlePay: 'subscribe',
                },
                layout: {
                  maxColumns: 2,
                  maxRows: 2,
                },
              }}
            />
          </div>
          
          {expressCheckoutReady && (
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500">or pay with card</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <PaymentElement 
            onReady={() => setIsReady(true)}
            options={{
              layout: 'accordion',
            }}
          />
        </div>

        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || !elements || isProcessing || !isReady}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : !isReady ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Loading...
            </>
          ) : (
            'Start Free Trial'
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          Your card will be charged after the 3-day free trial ends.
          <br />
          Cancel anytime before then and you won&apos;t be charged.
        </p>
      </form>
    </div>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, isPending: isAuthPending } = useSession();
  const [state, setState] = useState<CheckoutState>({ status: 'idle' });
  const initRef = useRef(false);

  const plan = searchParams.get('plan') as 'pro' | 'proPlus' | null;
  const interval = searchParams.get('interval') as 'month' | 'year' | null;
  const currency = searchParams.get('currency') as 'usd' | 'inr' | null;

  const handleSuccess = () => {
    if (state.status === 'ready') {
      router.push(`/checkout/success?subscription_id=${state.subscriptionId}&redirect_status=succeeded`);
    }
  };

  useEffect(() => {
    if (isAuthPending) return;
    
    if (!session?.user) {
      const currentUrl = `/checkout?plan=${plan}&interval=${interval}&currency=${currency}`;
      router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
      return;
    }

    if (initRef.current) return;
    initRef.current = true;

    async function createCheckout() {
      if (!plan || !interval || !currency) {
        setState({ status: 'error', message: 'Missing checkout parameters. Please select a plan from the pricing page.' });
        return;
      }

      setState({ status: 'loading_checkout' });

      try {
        const bearerToken = localStorage.getItem('bearer_token') || '';
        const response = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
          },
          body: JSON.stringify({ plan, interval, currency }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            const currentUrl = `/checkout?plan=${plan}&interval=${interval}&currency=${currency}`;
            router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
            return;
          }
          setState({ status: 'error', message: data.error || 'Failed to create checkout session' });
          return;
        }

        setState({ 
          status: 'ready', 
          clientSecret: data.clientSecret,
          subscriptionId: data.subscriptionId,
        });
      } catch (err) {
        console.error('Checkout error:', err);
        setState({ status: 'error', message: 'Failed to initialize checkout. Please try again.' });
      }
    }

    createCheckout();
  }, [isAuthPending, session, plan, interval, currency, router]);

  const planName = plan === 'proPlus' ? 'Pro PLUS' : 'Pro';
  const intervalLabel = interval === 'year' ? 'Annual' : 'Monthly';

  const getPriceDisplay = () => {
    const prices = {
      pro: {
        month: { usd: '$6.99', inr: '₹299' },
        year: { usd: '$69.99', inr: '₹2,999' },
      },
      proPlus: {
        month: { usd: '$14.99', inr: '₹599' },
        year: { usd: '$149.99', inr: '₹5,999' },
      },
    };

    if (!plan || !interval || !currency) return null;
    
    const planPrices = prices[plan];
    if (!planPrices) return null;
    
    const intervalPrices = planPrices[interval];
    if (!intervalPrices) return null;
    
    return intervalPrices[currency] || intervalPrices.usd;
  };

  const price = getPriceDisplay();

  if (isAuthPending || state.status === 'idle' || state.status === 'loading_checkout') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">
            {isAuthPending && 'Verifying your account...'}
            {!isAuthPending && !session?.user && 'Redirecting to login...'}
            {!isAuthPending && session?.user && state.status === 'idle' && 'Initializing...'}
            {state.status === 'loading_checkout' && 'Preparing your checkout...'}
          </p>
        </div>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 glass-card rounded-2xl">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Checkout Error</h2>
          <p className="text-muted-foreground mb-6">{state.message}</p>
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Pricing
          </Link>
        </div>
      </div>
    );
  }

  const elementsOptions = {
    clientSecret: state.clientSecret,
    appearance: {
      theme: 'flat' as const,
      variables: {
        colorPrimary: '#7c3aed',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#dc2626',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        borderRadius: '10px',
        spacingUnit: '4px',
      },
      rules: {
        '.Input': {
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        },
        '.Input:focus': {
          border: '1px solid #7c3aed',
          boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.1)',
        },
        '.Input:hover': {
          border: '1px solid #d1d5db',
        },
        '.Label': {
          color: '#374151',
          fontWeight: '500',
        },
        '.Tab': {
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
        },
        '.Tab:hover': {
          backgroundColor: '#f3f4f6',
        },
        '.Tab--selected': {
          backgroundColor: '#ffffff',
          borderColor: '#7c3aed',
        },
        '.Block': {
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  };

    return (
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Subscription</h1>
          <p className="text-muted-foreground">
            {planName} - {intervalLabel} Plan
          </p>
          {price && (
            <p className="text-2xl font-bold text-purple-500 mt-3">
              {price}<span className="text-base font-normal text-muted-foreground">/{interval === 'year' ? 'year' : 'month'}</span>
            </p>
          )}
          <p className="text-sm text-purple-500 mt-2">
            Includes 3-day free trial
          </p>
        </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg border border-gray-200">
        <Elements stripe={stripePromise} options={elementsOptions}>
          <PaymentForm subscriptionId={state.subscriptionId} onSuccess={handleSuccess} />
        </Elements>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <main className="pt-32 pb-20 px-6">
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <CheckoutContent />
        </Suspense>
      </main>
    </div>
  );
}
