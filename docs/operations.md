# MyCalAgent Website Operations

This repository is the working home for managing the MyCalAgent.com website.

## Local Development

```bash
bun install
bun run dev
```

The development server runs at `http://localhost:3000` unless that port is already in use.

## Production Build Check

```bash
bun install --frozen-lockfile
bun run build
bun run audit:visibility
```

The production build and visibility audit are the deploy gates used by GitHub Actions.

## GitHub CI/CD

Workflows live in `.github/workflows`:

| Workflow | Purpose |
|---|---|
| `ci.yml` | Runs the production build on pull requests and pushes to `main` |
| `deploy-production.yml` | Deploys the Vercel production site from `main` |

## Required GitHub Secrets

Configure these in GitHub before relying on production deploys:

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Vercel access token with deploy permission |
| `VERCEL_ORG_ID` | Vercel team/account identifier |
| `VERCEL_PROJECT_ID` | Vercel project identifier for MyCalAgent |

## Required Vercel Environment Variables

Configure runtime app variables in Vercel, not GitHub Actions:

```text
DATABASE_URL
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
BETTER_AUTH_SECRET
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
GOOGLE_SHEETS_ID
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_SERVICE_ACCOUNT_KEY
ADMIN_API_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
RESEND_REPLY_TO
```

## Release Flow

1. Make changes locally.
2. Run `bun run build`.
3. Commit to `main` or open a pull request.
4. Push to GitHub.
5. GitHub Actions runs CI.
6. A push to `main` runs the Vercel production deployment.

## Current Known Follow-Up

`bun run typecheck` reports existing Stripe SDK and Drizzle typing issues. `bun run lint` may also require native optional resolver bindings depending on the machine. Keep production deploys gated on `bun run build` until those issues are fixed.

`bun run audit:visibility` is enforced in CI and may emit warnings for older migrated pages that still need page-specific structured data. Treat those warnings as the AEO/GEO backlog for future enhancements.
