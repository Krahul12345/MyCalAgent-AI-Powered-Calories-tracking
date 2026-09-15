import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { newsletterSubscribers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export async function POST(request: NextRequest) {
  const rl = rateLimit(getClientIp(request), { namespace: 'newsletter-post', limit: 5, windowMs: 60 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const body = await request.json().catch(() => null);
    const email = body && typeof body === 'object' ? (body as Record<string, unknown>).email : null;
    const consent = body && typeof body === 'object' ? (body as Record<string, unknown>).consent : false;
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!normalizedEmail || normalizedEmail.length > 254 || !EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }
    if (consent !== true) {
      return NextResponse.json({ error: 'Please confirm you want to receive Weekly Insights.' }, { status: 400 });
    }

    const existing = await db.select({ id: newsletterSubscribers.id })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, normalizedEmail))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ success: true, alreadySubscribed: true }, { status: 200 });
    }

    await db.insert(newsletterSubscribers).values({
      email: normalizedEmail,
      source: 'weekly-insights-footer',
      consentAt: new Date(),
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('[newsletter POST]', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
