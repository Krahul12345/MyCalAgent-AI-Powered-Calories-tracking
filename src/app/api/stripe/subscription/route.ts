import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { subscriptions } from '@/db/schema';
import { eq, and, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session?.user) {
      return NextResponse.json({ subscription: null });
    }

    const userSubscription = await db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.userId, session.user.id),
          or(
            eq(subscriptions.status, 'active'),
            eq(subscriptions.status, 'trialing')
          )
        )
      )
      .limit(1);

    if (userSubscription.length === 0) {
      return NextResponse.json({ subscription: null });
    }

    const sub = userSubscription[0];
    const now = new Date();
    const trialEnd = sub.trialEnd;
    const isTrialing = sub.status === 'trialing' && trialEnd && trialEnd > now;
    
    let trialDaysRemaining = 0;
    if (isTrialing && trialEnd) {
      trialDaysRemaining = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    }

      return NextResponse.json({
        subscription: {
          plan: sub.plan,
          status: sub.status,
          billingInterval: sub.billingInterval,
          currency: sub.currency,
          currentPeriodEnd: sub.currentPeriodEnd,
          trialEnd: sub.trialEnd,
          trialStart: sub.createdAt,
          isTrialing,
          trialDaysRemaining,
          cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
        }
      });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ subscription: null });
  }
}
