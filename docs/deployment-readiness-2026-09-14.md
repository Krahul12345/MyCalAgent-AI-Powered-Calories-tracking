# Deployment Readiness - 2026-09-14

## Release Scope

Updated homepage sections, editorial pages, Upcoming Features, download QR, navigation, newsletter signup, and AI discovery files. Local prototype and unrelated content-ops drafts are excluded.

## Checks

- Next.js 15.5.25 production build passed, including types and build lint.
- Dependency audit passed with no reported vulnerabilities after dependency repairs.
- AI visibility audit passed with advisory structured-data heuristic warnings.
- Newsletter migration passed a transactional dry run; no changes were retained locally.
- PostgreSQL migration creates the missing table and unique email index, enables RLS, and disables direct public access.
- Deployment workflow validates source, builds against Vercel production settings, and verifies the newsletter schema before publishing.

## Deployment Plan

Deploy the reviewed release branch through the existing GitHub production workflow before updating main, avoiding an automatic main deployment racing database preparation. Production database settings come from the linked Vercel project.

Target: Vercel project app, mycalagent.com and www.mycalagent.com.
Previous deployment: dpl_B7JTRnEJ9Dndc6N9eHDMt5t9dS13, commit 35d067c48b5fac844acd19c1e9895c560b49dd30.

## Verification Boundaries

## Deployment Result: Blocked By Credential

GitHub production workflow run 34913816283 failed at Vercel authentication: `vercel whoami` returned `User not found`. The stored VERCEL_TOKEN must be replaced with a valid credential for the linked team. Verified project identifiers are now explicit in the workflow. Production was not changed, and no production migration ran. Main remains unchanged; release source is on codex/website-release-2026-09-14.

Local full lint and HTTP checks passed for the homepage, upcoming features, How It Works, AI Insights, About, Download, AI index, sitemap, robots, and anonymous session endpoint. Newsletter invalid-input validation returned 400. Desktop and mobile homepage layout checks passed.

Live checks are required after publishing. Real app-store installation, account registration, payment completion, and webhook delivery are not covered by build checks. Existing testimonial provenance and remaining marketing claims were not independently validated. A clean dependency audit is not a security certification.

## Rollback

Restore the prior successful Vercel deployment if smoke checks fail. Website rollback does not undo database changes. The additive newsletter migration preserves existing records.
