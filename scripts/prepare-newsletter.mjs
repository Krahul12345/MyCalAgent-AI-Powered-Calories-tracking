import { readFileSync } from 'node:fs';
import postgres from 'postgres';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.');
const sql = postgres(process.env.DATABASE_URL, { prepare: false, max: 1, connect_timeout: 15 });
const dryRun = process.argv.includes('--dry-run');
const rollback = new Error('Newsletter dry run rollback');
try {
  await sql.begin(async tx => {
    await tx`SELECT pg_advisory_xact_lock(77319421)`;
    const [existing] = await tx`SELECT to_regclass('public.newsletter_subscribers') AS name`;
    if (!existing.name) {
      const migration = readFileSync(new URL('../drizzle/0003_weekly_insights.sql', import.meta.url), 'utf8');
      await tx.unsafe(migration);
      console.log('Created newsletter table with RLS and public access disabled.');
    }
    const columns = await tx`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'newsletter_subscribers'`;
    const expected = { id: 'integer', email: 'text', source: 'text', consent_at: 'timestamp without time zone', created_at: 'timestamp without time zone', unsubscribed_at: 'timestamp without time zone' };
    for (const [name, type] of Object.entries(expected)) {
      if (!columns.some(column => column.column_name === name && column.data_type === type)) throw new Error(`Newsletter column mismatch: ${name}`);
    }
    const [security] = await tx`SELECT relrowsecurity AS rls FROM pg_class WHERE oid = 'public.newsletter_subscribers'::regclass`;
    if (!security.rls) throw new Error('Newsletter RLS must be enabled.');
    const grants = await tx`SELECT grantee FROM information_schema.role_table_grants WHERE table_schema = 'public' AND table_name = 'newsletter_subscribers' AND grantee IN ('anon', 'authenticated', 'PUBLIC')`;
    if (grants.length) throw new Error('Newsletter table must not grant direct public access.');
    const indexes = await tx`SELECT indexdef FROM pg_indexes WHERE schemaname = 'public' AND tablename = 'newsletter_subscribers'`;
    if (!indexes.some(index => index.indexdef.includes('UNIQUE INDEX') && index.indexdef.includes('(email)'))) throw new Error('Newsletter email uniqueness is required.');
    if (dryRun) throw rollback;
  });
  console.log('Newsletter migration verified. Existing subscriber data was preserved.');
} catch (error) {
  if (error === rollback) console.log('Newsletter dry run passed; all database changes rolled back.');
  else {
    console.error('Newsletter preparation failed:', error instanceof Error ? error.message : 'Unknown error');
    process.exitCode = 1;
  }
} finally {
  await sql.end();
}
