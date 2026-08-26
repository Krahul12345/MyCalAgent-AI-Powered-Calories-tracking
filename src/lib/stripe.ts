import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }

  stripeClient ??= new Stripe(secretKey, {
    apiVersion: '2025-10-29.clover',
  });

  return stripeClient;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    return Reflect.get(getStripe(), prop, receiver);
  },
});

export const STRIPE_PRICES = {
  pro: {
    monthlyUSD: 'price_1Sl1OhGsZdCWBFffsa1Dlunu',
    annualUSD: 'price_1Sl1OhGsZdCWBFffGjMh57Gk',
    monthlyINR: 'price_1Sl1OiGsZdCWBFffsvAfbmbD',
    annualINR: 'price_1Sl1OiGsZdCWBFffp6Ok2myt',
  },
  proPlus: {
    monthlyUSD: 'price_1Sl1OiGsZdCWBFffa2sU9n7k',
    annualUSD: 'price_1Sl1OiGsZdCWBFff4cddVCBl',
    monthlyINR: 'price_1Sl1OjGsZdCWBFffcZw7uCXr',
    annualINR: 'price_1Sl1OjGsZdCWBFffYCEsJYTg',
  },
} as const;

export function getPriceId(
  plan: 'pro' | 'proPlus',
  interval: 'month' | 'year',
  currency: 'usd' | 'inr'
): string {
  const prices = STRIPE_PRICES[plan];
  if (interval === 'month') {
    return currency === 'usd' ? prices.monthlyUSD : prices.monthlyINR;
  }
  return currency === 'usd' ? prices.annualUSD : prices.annualINR;
}

export type PlanKey = keyof typeof STRIPE_PRICES;
