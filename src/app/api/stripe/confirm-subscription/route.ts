import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
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
    const { subscriptionId } = body;

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Missing subscriptionId' }, { status: 400 });
    }

    // Find the subscription in our DB first to verify ownership before hitting Stripe
    const existing = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionId))
      .limit(1);

    // Ownership check: the subscription must belong to the authenticated user
    if (existing.length > 0 && existing[0].userId !== session.user.id) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (!stripeSubscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    // Double-check via Stripe metadata if the DB row doesn't exist yet
    if (existing.length === 0) {
      const metaUserId = stripeSubscription.metadata?.userId;
      if (metaUserId && metaUserId !== session.user.id) {
        return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
      }
    }

    const now = new Date();

    if (existing.length > 0) {
      // Update existing subscription status
      const trialEnd = stripeSubscription.trial_end 
        ? new Date(stripeSubscription.trial_end * 1000) 
        : existing[0].trialEnd;

      await db
        .update(subscriptions)
        .set({
          status: stripeSubscription.status,
          cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
          trialEnd,
          updatedAt: now,
        })
        .where(eq(subscriptions.stripeSubscriptionId, stripeSubscription.id));

      const updatedSub = existing[0];
      return NextResponse.json({ 
        success: true, 
        status: 'updated',
        subscription: {
          plan: updatedSub.plan,
          status: stripeSubscription.status,
          billingInterval: updatedSub.billingInterval,
          currency: updatedSub.currency,
          trialStart: updatedSub.createdAt,
          trialEnd,
          isTrialing: stripeSubscription.status === 'trialing',
        }
      });
    }

    // If subscription doesn't exist in DB (shouldn't happen normally), create it
    const priceId = stripeSubscription.items.data[0]?.price?.id;
    const price = stripeSubscription.items.data[0]?.price;
    const metadata = stripeSubscription.metadata;

    const plan = metadata.plan || 'pro';
    const billingInterval = metadata.interval || price?.recurring?.interval || 'month';
    const currency = metadata.currency || price?.currency || 'usd';
    
    const trialEndDate = stripeSubscription.trial_end 
      ? new Date(stripeSubscription.trial_end * 1000) 
      : new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    await db.insert(subscriptions).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      stripeCustomerId: stripeSubscription.customer as string,
      stripeSubscriptionId: stripeSubscription.id,
      stripePriceId: priceId || '',
      plan,
      status: stripeSubscription.status,
      billingInterval,
      currency,
      currentPeriodStart: now,
      currentPeriodEnd: trialEndDate,
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      trialEnd: trialEndDate,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ 
      success: true, 
      status: 'created',
      subscription: {
        plan,
        status: stripeSubscription.status,
        billingInterval,
        currency,
        trialStart: now,
        trialEnd: trialEndDate,
        isTrialing: stripeSubscription.status === 'trialing',
      }
    });
  } catch (error) {
    console.error('Confirm subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm subscription' },
      { status: 500 }
    );
  }
}
