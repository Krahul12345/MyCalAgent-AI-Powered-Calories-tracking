"use client";

import { Navigation } from "@/components/Navigation";
import { Check, Sparkles, Loader2, Crown, Clock, Calendar, CreditCard, Gift, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BetaAccessDialog } from "@/components/BetaAccessDialog";

interface FAQ {
  question: string;
  answer: string;
}

interface PricingPageClientProps {
  pricingFAQ: FAQ[];
}

interface Subscription {
  plan: string;
  status: string;
  billingInterval: string;
  currency: string;
  currentPeriodEnd: string | null;
  trialEnd: string | null;
  trialStart: string | null;
  isTrialing: boolean;
  trialDaysRemaining: number;
  cancelAtPeriodEnd: boolean;
}

const plans = [
  {
    name: "Free",
    planKey: null,
    monthlyPrice: "$0",
    annualPrice: "$0",
    inrMonthlyPrice: "₹0",
    inrAnnualPrice: "₹0",
    period: "3 days",
    description: "Perfect for getting started with AI calorie tracking",
    features: [
      "15 meal scans per day",
      "3-day meal log history",
      "Macro & micronutrient analysis",
      "AI coaching & insights",
      "Personal Hydration Goal",
      "Allergen Detection",
      "Dietary conflict detection",
      "Intermittent Fast planning",
      "Alcohol Consumption Tracking",
      "Set Meal Reminders & Notifications",
      "Health app integration",
      "Custom goals & tracking"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    planKey: "pro" as const,
    monthlyPrice: "$6.99",
    annualPrice: "$69.99",
    annualMonthlyEquiv: "$5.83",
    inrMonthlyPrice: "₹299",
    inrAnnualPrice: "₹2,999",
    inrAnnualMonthlyEquiv: "₹250",
    period: "month",
    annualPeriod: "year",
    description: "For serious health enthusiasts and fitness goals",
    features: [
      "Unlimited meal scans",
      "Advanced macro & micronutrient analysis",
      "Unlimited meal log history",
      "AI coaching & insights",
      "Wellness Reports — 4 per month",
      "Personal Hydration Goal",
      "Allergen Detection",
      "Dietary conflict detection",
      "Intermittent Fast planning",
      "Alcohol Consumption Tracking",
      "Set Meal Reminders & Notifications",
      "Health app integration",
      "Custom goals & tracking",
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Pro PLUS",
    planKey: "proPlus" as const,
    monthlyPrice: "$14.99",
    annualPrice: "$149.99",
    annualMonthlyEquiv: "$12.50",
    inrMonthlyPrice: "₹599",
    inrAnnualPrice: "₹5,999",
    inrAnnualMonthlyEquiv: "₹500",
    period: "month",
    annualPeriod: "year",
    description: "Perfect for families with advanced AI coaching & multi-user tracking",
    features: [
      "Everything in Pro",
      "Wellness Reports — 4 per month",
      "Up to 3 family members",
      "Family meal planning",
      "Shared meal reminders & notifications",
      "Parental controls on Allergen detection",
      "Family progress dashboard",
      "Dedicated Agentic AI support"
    ],
    cta: "Coming Soon",
    popular: false,
    comingSoon: true
  },
];

export default function PricingPageClient({ pricingFAQ }: PricingPageClientProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isIndia, setIsIndia] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);
  const [showProPlusDialog, setShowProPlusDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showBetaDialog, setShowBetaDialog] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("region") === "IN") {
      setIsIndia(true);
      return;
    }

    // Check cookie set by middleware first (no network needed)
    const match = document.cookie.match(/(?:^|;\s*)geo_country=([^;]+)/);
    if (match) {
      if (match[1].toUpperCase() === "IN") setIsIndia(true);
      return;
    }

    // Fallback: ipapi.co with 3s timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    fetch("https://ipapi.co/json/", { cache: "force-cache", signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        if (data?.country_code === "IN") setIsIndia(true);
      })
      .catch(() => {/* silently ignore — pricing defaults to USD */})
      .finally(() => clearTimeout(timeoutId));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    async function checkAuthAndSubscription() {
      try {
        const session = await authClient.getSession();
        const isLoggedIn = !!session?.data?.user;
        setIsAuthenticated(isLoggedIn);

        if (isLoggedIn) {
          const bearerToken = localStorage.getItem('bearer_token') || '';
          const res = await fetch('/api/stripe/subscription', {
            headers: {
              'Authorization': `Bearer ${bearerToken}`
            }
          });
          const data = await res.json();
          setSubscription(data.subscription);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoadingSubscription(false);
      }
    }
    checkAuthAndSubscription();
  }, []);

    const handlePlanClick = async (planKey: 'pro' | 'proPlus' | null) => {
      setShowBetaDialog(true);
      return;
    };

  const handleProPlusRedirectToPro = () => {
    setShowProPlusDialog(false);
    handlePlanClick('pro');
  };

  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    try {
      const res = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
      });
      
      if (res.ok) {
        setSubscription(null);
        setShowCancelDialog(false);
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to cancel subscription');
      }
    } catch {
      alert('Failed to cancel subscription');
    } finally {
      setIsCancelling(false);
    }
  };

  const getButtonText = (plan: typeof plans[0]) => {
    if (!plan.planKey) {
      return plan.cta;
    }

    if (subscription) {
      if (subscription.plan === plan.planKey) {
        return subscription.isTrialing 
          ? `Trial - ${subscription.trialDaysRemaining} days left`
          : 'Current Plan';
      }
      if (subscription.plan === 'proPlus' && plan.planKey === 'pro') {
        return 'Included in Pro PLUS';
      }
      if (subscription.plan === 'pro' && plan.planKey === 'proPlus') {
        return 'Upgrade to Pro PLUS';
      }
    }

    return plan.cta;
  };

  const isCurrentPlan = (planKey: string | null) => {
    if (!planKey || !subscription) return false;
    return subscription.plan === planKey;
  };

  const isButtonDisabled = (plan: typeof plans[0]) => {
    if (!plan.planKey) return false;
    if (loadingPlan === plan.planKey) return true;
    if (subscription) {
      if (subscription.plan === plan.planKey) return true;
      if (subscription.plan === 'proPlus' && plan.planKey === 'pro') return true;
    }
    return false;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, Transparent
              <br />
              <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Choose the plan that fits your needs. All plans include our core AI features.
            </p>

            <div className="flex items-center justify-center gap-4 mb-12">
              <Label 
                htmlFor="billing-toggle" 
                className={`text-lg font-medium cursor-pointer transition-colors ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}
                onClick={() => setIsAnnual(false)}
              >
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="scale-125"
              />
                <div className="flex items-center gap-2">
                  <Label 
                    htmlFor="billing-toggle" 
                    className={`text-lg font-medium cursor-pointer transition-colors ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}
                    onClick={() => setIsAnnual(true)}
                  >
                    Annual
                  </Label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/20">
                    Save 16%
                  </span>
                </div>
              </div>

                {subscription?.isTrialing && (
                  <div className="max-w-2xl mx-auto mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                          <Gift className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Your Free Trial is Active!</h3>
                          <p className="text-sm text-muted-foreground">
                            Enjoying {getPlanDisplayName(subscription.plan)} features
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowCancelDialog(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel Trial
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <Calendar className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-xs text-muted-foreground">Trial Started</p>
                          <p className="font-semibold text-sm">{formatDate(subscription.trialStart)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <Clock className="w-5 h-5 text-amber-400" />
                        <div>
                          <p className="text-xs text-muted-foreground">Days Remaining</p>
                          <p className="font-semibold text-sm">
                            {subscription.trialDaysRemaining} {subscription.trialDaysRemaining === 1 ? 'day' : 'days'} left
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <CreditCard className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-xs text-muted-foreground">Billing Starts</p>
                          <p className="font-semibold text-sm">{formatDate(subscription.trialEnd)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                      <div className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-medium text-blue-600">Payment method saved</p>
                          <p className="text-muted-foreground">
                            Your subscription of {getPrice(subscription.plan, subscription.billingInterval, subscription.currency)}/{subscription.billingInterval} will begin on {formatDate(subscription.trialEnd)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl transition-all duration-300 hover:scale-105 ${
                  isCurrentPlan(plan.planKey)
                    ? "glass border-2 border-green-500/50 shadow-2xl ring-2 ring-green-500/20"
                    : plan.popular
                    ? "glass border-2 border-purple-500/50 shadow-2xl"
                    : "glass-card"
                }`}
              >
                {isCurrentPlan(plan.planKey) && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold flex items-center gap-1">
                      <Crown className="w-4 h-4" />
                      {subscription?.isTrialing ? 'Free Trial Active' : 'Your Plan'}
                    </div>
                  )}
                  {!isCurrentPlan(plan.planKey) && plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </div>
                  )}
                  {'comingSoon' in plan && plan.comingSoon && !isCurrentPlan(plan.planKey) && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Coming Soon
                    </div>
                  )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold">
                      {isIndia
                        ? (isAnnual ? plan.inrAnnualPrice : plan.inrMonthlyPrice)
                        : (isAnnual ? plan.annualPrice : plan.monthlyPrice)
                      }
                    </span>
                    <span className="text-muted-foreground">
                      / {isAnnual && plan.name !== "Free" ? plan.annualPeriod : plan.period}
                    </span>
                  </div>
                  {isAnnual && plan.name !== "Free" && (
                    <p className="text-sm text-emerald-600 font-medium mb-2">
                      {isIndia ? (plan as any).inrAnnualMonthlyEquiv : (plan as any).annualMonthlyEquiv} / month — billed annually
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  {plan.planKey && !isCurrentPlan(plan.planKey) && (
                    <p className="text-xs text-purple-400 mt-2">3-day free trial included</p>
                  )}
                  {isCurrentPlan(plan.planKey) && subscription?.isTrialing && (
                    <p className="text-xs text-green-400 mt-2 font-medium">
                      Trial ends in {subscription.trialDaysRemaining} days
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                    onClick={() => handlePlanClick(plan.planKey)}
                    disabled={isButtonDisabled(plan) || (plan.planKey !== null && isLoadingSubscription)}
                    className={`block w-full text-center py-3 rounded-xl font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
                      isCurrentPlan(plan.planKey)
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white cursor-default"
                        : plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90"
                        : "bg-gradient-to-r from-[#15803D] to-[#10B981] text-white hover:opacity-90"
                    }`}
                  >
                  {plan.planKey !== null && isLoadingSubscription ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Loading...
                        </span>
                      ) : loadingPlan !== null && loadingPlan === plan.planKey ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Loading...
                        </span>
                      ) : (
                        getButtonText(plan)
                      )}
                  </button>
              </div>
            ))}
          </div>

          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {pricingFAQ.map((faq, index) => (
                <div key={index} className="p-6 rounded-2xl glass-card">
                  <h3 className="font-bold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
            </div>
          </div>
        </main>

        <Dialog open={showProPlusDialog} onOpenChange={setShowProPlusDialog}>
          <DialogContent className="sm:max-w-md bg-[#1a1a2e] border-purple-500/30">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Clock className="w-5 h-5 text-amber-500" />
                Pro PLUS is Coming Soon!
              </DialogTitle>
              <DialogDescription className="text-base pt-2">
                We&apos;re working hard to bring you exciting multi-user features including family meal planning, shared tracking, and parental controls.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <p className="text-sm text-muted-foreground">
                In the meantime, our <span className="font-semibold text-purple-400">Pro plan</span> offers all the powerful features you need for personal calorie tracking and AI-powered nutrition insights.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleProPlusRedirectToPro}
                  className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-all"
                >
                  Start with Pro Plan
                </button>
                <button
                  onClick={() => setShowProPlusDialog(false)}
                  className="w-full py-3 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition-all"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent className="sm:max-w-md bg-[#1a1a2e] border-red-500/30">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <XCircle className="w-5 h-5 text-red-500" />
                Cancel Your Trial?
              </DialogTitle>
              <DialogDescription className="text-base pt-2">
                Are you sure you want to cancel your free trial? You&apos;ll lose access to all Pro features immediately.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-sm text-amber-300">
                  You still have {subscription?.trialDaysRemaining} {subscription?.trialDaysRemaining === 1 ? 'day' : 'days'} left in your trial. Why not make the most of it?
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => setShowCancelDialog(false)}
                  className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-all"
                >
                  Keep My Trial
                </button>
                <button
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                  className="w-full py-3 rounded-xl font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50"
                >
                  {isCancelling ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Cancelling...
                    </span>
                  ) : (
                    'Yes, Cancel Trial'
                  )}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <BetaAccessDialog open={showBetaDialog} onOpenChange={setShowBetaDialog} />
      </div>
    );
  }
