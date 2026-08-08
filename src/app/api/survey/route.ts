import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { surveyResponses } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
const GENERIC_500 = { error: 'Something went wrong. Please try again.' };

/** Trim and cap a string field — prevents oversized payloads reaching the DB */
function sanitiseStr(val: unknown, maxLen = 500): string | null {
  if (typeof val !== 'string') return null;
  const trimmed = val.trim();
  return trimmed.length > 0 ? trimmed.slice(0, maxLen) : null;
}

export async function POST(request: NextRequest) {
  // Rate limit: 3 survey submissions per IP per hour
  const ip = getClientIp(request);
  const rl = rateLimit(ip, { namespace: 'survey-post', limit: 3, windowMs: 60 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const {
      email,
      name,
      primaryGoals,
      primaryGoalOther,
      targetTimeline,
      struggles,
      frustrations,
      aiHelpfulnessRatings,
      appExpectations,
      earlyAccess,
      additionalSuggestions,
    } = body as Record<string, unknown>;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.', code: 'MISSING_EMAIL' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail.length > 254 || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json({ error: 'Invalid email format.', code: 'INVALID_EMAIL_FORMAT' }, { status: 400 });
    }

    // Safely encode JSON fields — only accept arrays/objects, cap at 10KB each
    function safeJson(val: unknown, maxLen = 10_000): string | null {
      if (val === undefined || val === null) return null;
      try {
        const str = JSON.stringify(val);
        return str.length <= maxLen ? str : null;
      } catch {
        return null;
      }
    }

    const existing = await db
      .select({ email: surveyResponses.email })
      .from(surveyResponses)
      .where(eq(surveyResponses.email, trimmedEmail))
      .limit(1);

    const payload = {
      name: sanitiseStr(name, 100),
      primaryGoal: safeJson(primaryGoals),
      primaryGoalOther: sanitiseStr(primaryGoalOther, 200),
      targetTimeline: sanitiseStr(targetTimeline, 100),
      struggles: safeJson(struggles),
      frustrations: safeJson(frustrations),
      aiHelpfulnessRatings: safeJson(aiHelpfulnessRatings),
      appExpectation: safeJson(appExpectations),
      earlyAccess: sanitiseStr(earlyAccess, 10),
      additionalSuggestions: sanitiseStr(additionalSuggestions, 200),
    };

    if (existing.length > 0) {
      const updated = await db
        .update(surveyResponses)
        .set(payload)
        .where(eq(surveyResponses.email, trimmedEmail))
        .returning();
      return NextResponse.json({ success: true, updated: true, id: updated[0]?.id }, { status: 200 });
    }

    const inserted = await db
      .insert(surveyResponses)
      .values({ ...payload, email: trimmedEmail, createdAt: new Date() })
      .returning();

    return NextResponse.json({ success: true, id: inserted[0]?.id }, { status: 201 });

  } catch (error) {
    console.error('[survey POST]', error);
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      return NextResponse.json({ error: 'Email already submitted.', code: 'EMAIL_ALREADY_EXISTS' }, { status: 409 });
    }
    return NextResponse.json(GENERIC_500, { status: 500 });
  }
}
