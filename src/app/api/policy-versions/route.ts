import { NextResponse } from 'next/server';
import { db } from '@/db';
import { policyDocuments } from '@/db/schema';
import { and, eq, or, isNull, lte, sql } from 'drizzle-orm';

/**
 * GET /api/policy-versions
 *
 * Returns currently effective active policy versions.
 * Enforces effective_at <= now() so early-published policies
 * are not exposed before their legal effective date.
 *
 * Response:
 *   {
 *     terms:   { version, title, url, requiresReconsent, changeSummary, effectiveAt },
 *     privacy: { version, title, url, requiresReconsent, changeSummary, effectiveAt }
 *   }
 *
 * Cache: 1 hour (policy versions rarely change)
 */
export async function GET() {
  try {
    const rows = await db
      .select({
        policyType:        policyDocuments.policyType,
        version:           policyDocuments.version,
        title:             policyDocuments.title,
        url:               policyDocuments.url,
        requiresReconsent: policyDocuments.requiresReconsent,
        changeSummary:     policyDocuments.changeSummary,
        effectiveAt:       policyDocuments.effectiveAt,
      })
      .from(policyDocuments)
      .where(
        and(
          eq(policyDocuments.isActive,  true),
          eq(policyDocuments.isDeleted, false),
          or(
            isNull(policyDocuments.effectiveAt),
            lte(policyDocuments.effectiveAt, sql`now()`)
          )
        )
      );

    type PolicyRow = typeof rows[0];
    const result: { terms?: PolicyRow; privacy?: PolicyRow } = {};
    for (const row of rows) {
      if (row.policyType === 'terms' || row.policyType === 'privacy') {
        result[row.policyType] = row;
      }
    }

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=300' },
    });
  } catch (err) {
    console.error('[policy-versions] DB query failed:', err);
    return NextResponse.json({ terms: null, privacy: null }, { status: 500 });
  }
}