import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

async function setupProducts() {
  console.log('Creating Stripe products and prices...');

  // Create Pro product
  const proProduct = await stripe.products.create({
    name: 'MyCalAgent Pro',
    description: 'For serious health enthusiasts and fitness goals',
    metadata: {
      plan: 'pro',
    },
  });
  console.log('Created Pro product:', proProduct.id);

  // Create Pro PLUS product
  const proPlusProduct = await stripe.products.create({
    name: 'MyCalAgent Pro PLUS',
    description: 'Perfect for families with advanced AI coaching & multi-user tracking',
    metadata: {
      plan: 'proPlus',
    },
  });
  console.log('Created Pro PLUS product:', proPlusProduct.id);

  // Pro prices - USD
  const proMonthlyUSD = await stripe.prices.create({
    product: proProduct.id,
    unit_amount: 699, // $6.99
    currency: 'usd',
    recurring: { interval: 'month' },
    metadata: { plan: 'pro', interval: 'month', currency: 'usd' },
  });
  console.log('Pro Monthly USD:', proMonthlyUSD.id);

  const proAnnualUSD = await stripe.prices.create({
    product: proProduct.id,
    unit_amount: 6999, // $69.99
    currency: 'usd',
    recurring: { interval: 'year' },
    metadata: { plan: 'pro', interval: 'year', currency: 'usd' },
  });
  console.log('Pro Annual USD:', proAnnualUSD.id);

  // Pro prices - INR
  const proMonthlyINR = await stripe.prices.create({
    product: proProduct.id,
    unit_amount: 29900, // ₹299
    currency: 'inr',
    recurring: { interval: 'month' },
    metadata: { plan: 'pro', interval: 'month', currency: 'inr' },
  });
  console.log('Pro Monthly INR:', proMonthlyINR.id);

  const proAnnualINR = await stripe.prices.create({
    product: proProduct.id,
    unit_amount: 299900, // ₹2,999
    currency: 'inr',
    recurring: { interval: 'year' },
    metadata: { plan: 'pro', interval: 'year', currency: 'inr' },
  });
  console.log('Pro Annual INR:', proAnnualINR.id);

  // Pro PLUS prices - USD
  const proPlusMonthlyUSD = await stripe.prices.create({
    product: proPlusProduct.id,
    unit_amount: 1499, // $14.99
    currency: 'usd',
    recurring: { interval: 'month' },
    metadata: { plan: 'proPlus', interval: 'month', currency: 'usd' },
  });
  console.log('Pro PLUS Monthly USD:', proPlusMonthlyUSD.id);

  const proPlusAnnualUSD = await stripe.prices.create({
    product: proPlusProduct.id,
    unit_amount: 14999, // $149.99
    currency: 'usd',
    recurring: { interval: 'year' },
    metadata: { plan: 'proPlus', interval: 'year', currency: 'usd' },
  });
  console.log('Pro PLUS Annual USD:', proPlusAnnualUSD.id);

  // Pro PLUS prices - INR
  const proPlusMonthlyINR = await stripe.prices.create({
    product: proPlusProduct.id,
    unit_amount: 59900, // ₹599
    currency: 'inr',
    recurring: { interval: 'month' },
    metadata: { plan: 'proPlus', interval: 'month', currency: 'inr' },
  });
  console.log('Pro PLUS Monthly INR:', proPlusMonthlyINR.id);

  const proPlusAnnualINR = await stripe.prices.create({
    product: proPlusProduct.id,
    unit_amount: 599900, // ₹5,999
    currency: 'inr',
    recurring: { interval: 'year' },
    metadata: { plan: 'proPlus', interval: 'year', currency: 'inr' },
  });
  console.log('Pro PLUS Annual INR:', proPlusAnnualINR.id);

  console.log('\n=== PRICE IDS FOR stripe.ts ===');
  console.log(`
export const STRIPE_PRICES = {
  pro: {
    monthlyUSD: '${proMonthlyUSD.id}',
    annualUSD: '${proAnnualUSD.id}',
    monthlyINR: '${proMonthlyINR.id}',
    annualINR: '${proAnnualINR.id}',
  },
  proPlus: {
    monthlyUSD: '${proPlusMonthlyUSD.id}',
    annualUSD: '${proPlusAnnualUSD.id}',
    monthlyINR: '${proPlusMonthlyINR.id}',
    annualINR: '${proPlusAnnualINR.id}',
  },
} as const;
`);
}

setupProducts().catch(console.error);
