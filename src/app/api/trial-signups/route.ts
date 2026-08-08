import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { trialSignups } from '@/db/schema';
import { eq, like, desc } from 'drizzle-orm';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// RFC-5322-ish — stricter than the original regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const GENERIC_500 = { error: 'Something went wrong. Please try again.' };

// ── POST /api/trial-signups  (public, rate-limited) ──────────────────────────
export async function POST(request: NextRequest) {
  // Rate limit: 5 signups per IP per hour
  const ip = getClientIp(request);
  const rl = rateLimit(ip, { namespace: 'trial-signups-post', limit: 5, windowMs: 60 * 60 * 1000 });
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

    const { email } = body as Record<string, unknown>;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.', code: 'MISSING_EMAIL' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail.length > 254) {
      return NextResponse.json({ error: 'Invalid email format.', code: 'INVALID_EMAIL_FORMAT' }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json({ error: 'Invalid email format.', code: 'INVALID_EMAIL_FORMAT' }, { status: 400 });
    }

    const existing = await db.select({ id: trialSignups.email })
      .from(trialSignups)
      .where(eq(trialSignups.email, trimmedEmail))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email already registered.', code: 'EMAIL_ALREADY_EXISTS' }, { status: 409 });
    }

    const newSignup = await db.insert(trialSignups)
      .values({ email: trimmedEmail, createdAt: new Date() })
      .returning();

    // Return only the non-sensitive fields
    return NextResponse.json({ id: newSignup[0].id, email: newSignup[0].email }, { status: 201 });

  } catch (error) {
    console.error('[trial-signups POST]', error);
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      return NextResponse.json({ error: 'Email already registered.', code: 'EMAIL_ALREADY_EXISTS' }, { status: 409 });
    }
    return NextResponse.json(GENERIC_500, { status: 500 });
  }
}

// ── GET /api/trial-signups  (admin-only, requires secret header) ─────────────
export async function GET(request: NextRequest) {
  // Require a server-side admin secret — never exposed to the browser
  const adminKey = request.headers.get('x-admin-key');
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey || !adminKey || adminKey !== expectedKey) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') ?? '50'), 1), 100);
    const offset = Math.max(parseInt(searchParams.get('offset') ?? '0'), 0);
    const search = searchParams.get('search')?.trim().slice(0, 100) ?? '';

    let query = db.select().from(trialSignups);
    if (search) {
      query = query.where(like(trialSignups.email, `%${search}%`));
    }

    const results = await query
      .orderBy(desc(trialSignups.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('[trial-signups GET]', error);
    return NextResponse.json(GENERIC_500, { status: 500 });
  }
}
