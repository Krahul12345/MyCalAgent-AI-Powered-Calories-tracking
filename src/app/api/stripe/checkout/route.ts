import { NextRequest, NextResponse } from 'next/server';
import { stripe, getPriceId } from '@/lib/stripe';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { plan, interval, currency } = body as {
      plan: 'pro' | 'proPlus';
      interval: 'month' | 'year';
      currency: 'usd' | 'inr';
    };

    if (!plan || !interval || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields: plan, interval, currency' },
        { status: 400 }
      );
    }

    if (!['pro', 'proPlus'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    if (!['month', 'year'].includes(interval)) {
      return NextResponse.json({ error: 'Invalid interval' }, { status: 400 });
    }

    if (!['usd', 'inr'].includes(currency)) {
      return NextResponse.json({ error: 'Invalid currency' }, { status: 400 });
    }

    const existingSub = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, session.user.id))
      .limit(1);

    if (existingSub.length > 0 && existingSub[0].status === 'active') {
      return NextResponse.json(
        { error: 'You already have an active subscription' },
        { status: 400 }
      );
    }

    let customerId: string | undefined;
    if (existingSub.length > 0) {
      customerId = existingSub[0].stripeCustomerId;
    }

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name,
        metadata: {
          userId: session.user.id,
        },
      });
      customerId = customer.id;
    }

    const priceId = getPriceId(plan, interval, currency);

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: 5,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['pending_setup_intent'],
      metadata: {
        userId: session.user.id,
        plan,
        interval,
        currency,
      },
    });

    const pendingSetupIntent = subscription.pending_setup_intent;
    
    if (!pendingSetupIntent || typeof pendingSetupIntent === 'string') {
      return NextResponse.json(
        { error: 'Failed to create setup intent' },
        { status: 500 }
      );
    }

    // Save subscription to database immediately after creation
    const now = new Date();
    const trialEndDate = subscription.trial_end 
      ? new Date(subscription.trial_end * 1000) 
      : new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
    
    // For trial subscriptions, period start is now and period end is trial end
    const periodStart = subscription.current_period_start 
      ? new Date(subscription.current_period_start * 1000) 
      : now;
    const periodEnd = subscription.current_period_end 
      ? new Date(subscription.current_period_end * 1000) 
      : trialEndDate;

    // Check if subscription already exists (in case of retry)
    const existingSubRecord = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.stripeSubscriptionId, subscription.id))
      .limit(1);

    if (existingSubRecord.length === 0) {
      try {
        await db.insert(subscriptions).values({
          id: crypto.randomUUID(),
          userId: session.user.id,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscription.id,
          stripePriceId: priceId,
          plan,
          status: subscription.status,
          billingInterval: interval,
          currency,
          currentPeriodStart: periodStart,
          currentPeriodEnd: periodEnd,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          trialEnd: trialEndDate,
          createdAt: now,
          updatedAt: now,
        });
      } catch (dbError) {
        console.error('Failed to save subscription to DB');
        // Continue anyway - the subscription is created in Stripe
      }
    }

    return NextResponse.json({ 
      clientSecret: pendingSetupIntent.client_secret,
      subscriptionId: subscription.id,
      customerId,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
