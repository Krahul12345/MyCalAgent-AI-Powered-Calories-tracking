# MyCalAgent

**AI Wellness Intelligence Platform — Understand How Meals, Habits & Hydration Affect How You Feel**

MyCalAgent is a privacy-first AI wellness app that goes beyond calorie counting. It recognizes patterns across meals, hydration, fasting, sleep, and daily habits — helping users understand how their lifestyle choices affect their energy, focus, and mood.

Live site: [https://www.mycalagent.com](https://www.mycalagent.com)

---

## Table of Contents

1. [Product Overview](#product-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [All Page Routes](#all-page-routes)
5. [API Endpoints](#api-endpoints)
6. [Database Schema](#database-schema)
7. [Components](#components)
8. [Environment Variables](#environment-variables)
9. [Design System](#design-system)
10. [Homepage Sections](#homepage-sections)
11. [Navigation & Footer](#navigation--footer)
12. [SEO & AEO Strategy](#seo--aeo-strategy)
13. [Security Configuration](#security-configuration)
14. [Getting Started](#getting-started)

---

## Product Overview

MyCalAgent is positioned as an **AI Wellness Intelligence Platform** — not just a calorie tracker. The core value proposition is pattern recognition: connecting what you eat, drink, and do with how you actually feel.

### Core Features

| Feature | Description |
|---|---|
| **AI Meal Analysis** | Snap a photo of any meal; AI identifies ingredients, estimates portions, and returns a full nutrition breakdown in seconds |
| **Wellness Pattern Recognition** | AI analyzes data across weeks to surface correlations between food, hydration, fasting, and energy/mood/focus |
| **Hydration Tracking** | Tracks water, coffee, tea, juice, energy drinks, and alcohol — with caffeine calculations and daily targets |
| **Intermittent Fasting** | Supports 16:8, 18:6, 20:4, OMAD, 5:2, and custom windows. Real-time timer, streak tracking, fasting calendar |
| **Food & Mood Tracking** | Connects meals to energy, focus, mood, and sleep quality over time |
| **Apple Health Integration** | Bidirectional sync — reads steps, sleep, workouts; writes nutrition and hydration data back |

### App Store Links

- **Apple App Store**: https://apps.apple.com/us/app/mycalagent/id6759270828
- **Google Play Store**: https://play.google.com/store/apps/details?id=com.mycalagent.app&pcampaignid=web_share

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15.3.6 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **UI** | React 19, Radix UI primitives, Tailwind CSS v4 |
| **Animations** | Framer Motion, Motion DOM |
| **Database** | PostgreSQL via Supabase |
| **ORM** | Drizzle ORM (postgres-js driver) |
| **Auth** | Better Auth v1.3.10 |
| **Payments** | Stripe v19 (subscriptions, webhooks) |
| **Email** | Resend |
| **Analytics** | Google Analytics 4 via Google Tag Manager |
| **Icons** | Lucide React, Tabler Icons, React Icons |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |
| **Notifications** | Sonner (toast) |
| **Carousels** | Embla Carousel, Swiper |
| **Package Manager** | npm (lockfile: package-lock.json) |

---

## Project Structure

```
/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout (fonts, metadata, CSP)
│   │   ├── globals.css         # Global styles, Tailwind config, CSS variables
│   │   ├── sitemap.ts          # Auto-generated sitemap
│   │   ├── robots.ts           # Robots.txt rules
│   │   ├── api/                # API route handlers
│   │   ├── blog/               # Blog index + 6 article pages
│   │   ├── comparisons/        # 6 comparison pages
│   │   ├── features/           # Features index + 6 feature deep-dive pages
│   │   └── [other routes]/     # All other pages (see full list below)
│   ├── components/             # Reusable UI components (22 main + 53 Radix UI primitives)
│   ├── db/
│   │   ├── index.ts            # Drizzle ORM client (DATABASE_URL)
│   │   └── schema.ts           # All 11 database table definitions
│   └── lib/
│       ├── auth.ts             # Better Auth server config
│       ├── auth-client.ts      # Better Auth client (useSession hook)
│       ├── stripe.ts           # Stripe SDK instance
│       ├── rate-limit.ts       # IP-based rate limiter
│       ├── currency.ts         # Currency helpers
│       └── health-actions.ts   # Server actions for health data
├── public/
│   ├── mycalagent-logo.png     # Main app logo (used in Navigation)
│   ├── favicon.png             # Favicon (PNG)
│   ├── favicon.ico             # Favicon (ICO)
│   └── appstore-qr.png         # App Store QR code
├── .env                        # Environment variables (never commit)
├── next.config.ts              # Next.js + CSP + security headers config
├── postcss.config.mjs          # Tailwind CSS v4 PostCSS config
└── package.json
```

---

## All Page Routes

### Marketing & Content Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, features, how it works, app download, FAQ |
| `/about` | Company mission, team, values |
| `/features` | Features overview with deep-dive links |
| `/pricing` | Subscription plans |
| `/faq` | Frequently asked questions |
| `/blog` | Blog index — premium editorial design, category filters, newsletter signup |
| `/survey` | Pre-launch survey for early access |
| `/get-started` | Onboarding / entry point |

### Feature Deep-Dive Pages (`/features/[slug]`)

| Route | Description |
|---|---|
| `/features/ai-meal-analysis` | How AI photo meal logging works |
| `/features/food-and-mood` | Food–mood–energy connection |
| `/features/hydration-tracking` | Water, caffeine, and beverage intelligence |
| `/features/intermittent-fasting` | Fasting protocols, timer, AI insights |
| `/features/apple-health` | Bidirectional Apple Health sync |
| `/features/wellness-pattern-recognition` | AI pattern detection across all data streams |

### Blog Articles (`/blog/[slug]`)

| Route | Title |
|---|---|
| `/blog/how-food-affects-energy-focus-mood` | How What You Eat Affects Your Energy, Focus, and Mood |
| `/blog/what-is-wellness-intelligence` | What Is Wellness Intelligence? |
| `/blog/hydration-productivity-science` | The Hydration–Productivity Link |
| `/blog/intermittent-fasting-ai-patterns` | Intermittent Fasting Patterns: What AI Reveals |
| `/blog/ai-behavioral-wellness-patterns` | How AI Detects Behavioral Patterns in Wellness Data |
| `/blog/meal-timing-afternoon-energy` | Meal Timing and Afternoon Energy Crashes |

### Comparison Pages (`/comparisons/[slug]`)

| Route | Description |
|---|---|
| `/comparisons/mycalagent-vs-myfitnesspal` | Side-by-side comparison vs MyFitnessPal |
| `/comparisons/mycalagent-vs-noom` | Side-by-side comparison vs Noom |
| `/comparisons/mycalagent-vs-lose-it` | Side-by-side comparison vs Lose It |
| `/comparisons/mycalagent-vs-cronometer` | Side-by-side comparison vs Cronometer |
| `/comparisons/best-calorie-tracking-app` | Best calorie tracking app roundup |
| `/comparisons/best-calorie-tracking-apps-2025` | Best calorie tracking apps 2025 |

### AEO Content Pages (Answer Engine Optimized)

| Route | Target Question |
|---|---|
| `/how-mycalagent-works` | How does MyCalAgent work? (AI retrieval anchor page) |
| `/how-ai-meal-analysis-works` | How does AI meal analysis work? |
| `/how-food-affects-energy` | How does food affect energy levels? |
| `/hydration-and-productivity` | How does hydration affect productivity? |
| `/wellness-pattern-recognition` | What is wellness pattern recognition? |
| `/why-calorie-tracking-fails` | Why does calorie tracking fail? |
| `/ai-wellness-insights` | What are AI wellness insights? |

### Trust & Legal Pages

| Route | Description |
|---|---|
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/security` | Security practices |
| `/editorial-policy` | Editorial standards |
| `/ai-disclaimer` | AI accuracy and limitations disclaimer |
| `/research` | Research sources and citations |

### Auth Pages

| Route | Description |
|---|---|
| `/login` | Sign in (email/password) |
| `/register` | Create account |

### App Pages (Authenticated)

| Route | Description |
|---|---|
| `/analytics` | User dashboard — calorie tracking, nutrition breakdown |
| `/calculator` | Nutrition / BMR calculator |
| `/checkout` | Subscription checkout (Stripe) |
| `/checkout/success` | Post-payment confirmation with app store links |
| `/knowledge-base` | Help articles |

---

## API Endpoints

All API routes live under `/src/app/api/`.

### Public Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/trial-signups` | Capture email for weekly insights / trial signup. Stores in `trial_signups` table. Rate-limited: 5/IP/hour |
| `GET` | `/api/trial-signups` | Admin-only (requires `x-admin-key` header). Returns paginated signup list |
| `POST` | `/api/survey` | Submit pre-launch survey response |
| `POST` | `/api/send-trial-email` | Trigger trial welcome email via Resend |

### Authenticated Endpoints

| Method | Route | Description |
|---|---|---|
| `GET/POST` | `/api/meals` | Fetch or log meal entries |
| `POST/GET` | `/api/wellness-logs` | Log wellness data (hydration, fasting, etc.) |
| `GET` | `/api/policy-versions` | Fetch active policy document versions |

### Stripe Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/stripe/checkout` | Create Stripe checkout session |
| `GET/POST` | `/api/stripe/subscription` | Fetch current subscription status |
| `POST` | `/api/stripe/confirm-subscription` | Confirm subscription after payment |
| `POST` | `/api/stripe/cancel-subscription` | Cancel active subscription |
| `POST` | `/api/stripe/webhook` | Stripe webhook handler (signature verified) |

### Auth

| Route | Description |
|---|---|
| `/api/auth/[...all]` | Better Auth catch-all handler (login, register, session, OAuth) |

---

## Database Schema

**Host**: Supabase (`kxlkulmuhnnnalnzlftn.supabase.co`)
**ORM**: Drizzle ORM with `postgres-js` driver
**Connection**: `DATABASE_URL` environment variable

### Tables (11 total)

#### `user`
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key |
| name | text | Required |
| email | text | Unique, required |
| email_verified | boolean | Default false |
| image | text | Profile avatar URL |
| created_at | timestamp | Auto |
| updated_at | timestamp | Auto |

#### `session`
Better Auth session management. Stores token, IP, user agent, expiry.
FK: `user_id → user`

#### `account`
Better Auth OAuth providers and password accounts.
FK: `user_id → user`

#### `verification`
Better Auth email verification tokens with expiry.

#### `trial_signups`
Emails collected from blog newsletter form and landing pages.

| Column | Type | Notes |
|---|---|---|
| id | serial | Auto-increment primary key |
| email | text | Unique, required |
| created_at | timestamp | Auto |

#### `health_profiles`
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key |
| user_id | text | FK → user (unique, cascade delete) |
| gender | text | |
| age | integer | |
| weight | integer | |
| height | integer | |
| activity | text | |
| goal | text | |
| unit_system | text | Default 'metric' |
| updated_at | timestamp | Auto |

#### `subscriptions`
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key |
| user_id | text | FK → user |
| stripe_customer_id | text | |
| stripe_subscription_id | text | Unique |
| stripe_price_id | text | |
| plan | text | e.g., 'premium' |
| status | text | e.g., 'active', 'canceled' |
| billing_interval | text | 'month' or 'year' |
| currency | text | |
| current_period_start/end | timestamp | |
| cancel_at_period_end | boolean | Default false |
| trial_end | timestamp | |

#### `survey_responses`
Pre-launch survey submissions. Unique per email. Captures goals, frustrations, timeline, AI helpfulness ratings, early access interest.

#### `meals`
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key |
| user_id | text | FK → user |
| food_name | text | |
| calories | integer | |
| protein / carbs / fat | integer | |
| meal_type | text | Default 'other' |
| image_url | text | |
| created_at | timestamp | |

#### `wellness_logs`
| Column | Type | Notes |
|---|---|---|
| id | text | Primary key |
| user_id | text | FK → user |
| type | text | e.g., 'hydration', 'fasting' |
| value | text | |
| unit | text | |
| created_at | timestamp | |

#### `policy_documents`
Versioned Terms and Privacy policy documents with active/deleted flags, reconsent tracking, and content hashing.

---

## Components

### Main Components (`/src/components/`)

| Component | Description |
|---|---|
| `Navigation.tsx` | Top nav — logo, nav links, Features dropdown (6 sub-pages), auth state, mobile menu |
| `Footer.tsx` | Footer — 5-column grid, social links, product/compare/legal links |
| `HeroSection.tsx` | Homepage hero — headline, description, CTA buttons |
| `AppStoreButtons.tsx` | Reusable App Store + Google Play buttons (inline SVG Apple logo + Play triangle) |
| `AnimatedBackground.tsx` | Animated gradient background used on all marketing pages |
| `FeaturesSection.tsx` | Homepage features grid (6 cards) |
| `HowItWorksSection.tsx` | Step-by-step: snap → analyze → discover patterns |
| `FoodMoodSection.tsx` | Food & mood pattern visualization |
| `WellnessComparisonSection.tsx` | MyCalAgent vs. traditional calorie trackers table |
| `AppDownloadSection.tsx` | App store download CTA section |
| `VideoSection.tsx` | Embedded product demo video |
| `TrustSignalStrip.tsx` | Trust badges and social proof strip |
| `ComparisonCTA.tsx` | Comparison-focused call-to-action block |
| `QuickFAQ.tsx` | Reusable collapsible FAQ accordion |
| `TrialPopup.tsx` | Delayed trial offer popup modal |
| `BetaAccessDialog.tsx` | Beta access request dialog |
| `LogFoodModal.tsx` | Meal logging modal |
| `CookieConsent.tsx` | GDPR cookie consent banner |
| `ErrorReporter.tsx` | Client-side error reporting |
| `GeoFlag.tsx` | Country flag via IP geolocation (ipapi.co) |
| `ThemeToggle.tsx` | Light/dark mode toggle |

### UI Primitives (`/src/components/ui/`)

53 Radix UI-based primitives including accordion, alert-dialog, avatar, badge, button, calendar, card, carousel, chart, checkbox, command, dialog, drawer, dropdown-menu, form, input, label, popover, progress, radio-group, scroll-area, select, separator, sheet, sidebar, skeleton, slider, switch, table, tabs, textarea, toggle, tooltip, and more.

---

## Environment Variables

```bash
# Database (Supabase PostgreSQL — used by Drizzle ORM)
DATABASE_URL=postgresql://...

# Supabase (for direct SDK usage)
SUPABASE_URL=https://kxlkulmuhnnnalnzlftn.supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=<value>

# Authentication (Better Auth)
BETTER_AUTH_SECRET=...

# Payments (Stripe)
STRIPE_SECRET_KEY=<value>
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Admin (protects GET /api/trial-signups)
ADMIN_API_KEY=...

# GitHub (optional)
GITHUB_TOKEN=...
GITHUB_REPO_URL=...
```

---

## Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary green | `#15803D` | Brand color, buttons, links |
| Emerald hover | `#10B981` | Hover states, gradients |
| Light emerald | `#34d399` | Gradient endpoints |
| Navy text | `#0F172A` | Headings, body text |
| Slate secondary | `#64748B` | Muted text, descriptions |
| Background light | `#F8FAFC` | Page backgrounds (light) |
| Background dark | `#0f172a` | Page backgrounds (dark) |
| Border light | `#E2E8F0` | Card borders (light) |
| Emerald tint | `#ECFDF5` | Success states, highlights |

### Typography

| Font | Weights | Role |
|---|---|---|
| **Inter** | 300–900 | Body text, UI labels, paragraphs |
| **Space Grotesk** | 300–700 | Headings, hero text, feature titles |

### Key CSS Classes

```css
/* Gradient text — used on brand taglines and H1 spans */
.gradient-text {
  background: linear-gradient(135deg, #15803D, #10B981, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Glass card */
.glass-card {
  background: rgba(21,128,61,0.06);
  border: 1px solid rgba(21,128,61,0.12);
  backdrop-filter: blur(20px);
}
```

### Standard Card

```tsx
className="p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm"
```

### Emerald Accent Box

```tsx
className="p-8 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30"
```

### Page Layout Template

```tsx
<div className="relative min-h-screen overflow-hidden">
  <AnimatedBackground />
  <Navigation />
  <main className="relative z-10 pt-32 pb-20 px-6">
    <div className="max-w-4xl mx-auto">
      {/* breadcrumb → H1 with gradient-text → sections → FAQ → AppStoreButtons CTA */}
    </div>
  </main>
  <Footer />
</div>
```

---

## Homepage Sections

The homepage renders these sections in order:

1. `AnimatedBackground` — full-screen gradient animation
2. `Navigation` — sticky top navbar
3. `HeroSection` — headline, two-paragraph description, survey + app store CTAs
4. `TrustSignalStrip` — trust badges (ratings, downloads, privacy)
5. `HowItWorksSection` — 3-step: snap → analyze → discover patterns
6. `FeaturesSection` — 6 feature cards
7. `FoodMoodSection` — food & mood explainer
8. `WellnessComparisonSection` — MyCalAgent vs. calorie trackers comparison
9. `VideoSection` — product demo video
10. `AppDownloadSection` — app store download CTA
11. `ComparisonCTA` — comparison prompt block
12. `QuickFAQ` — 7-question FAQ accordion
13. `TrialPopup` — delayed trial offer modal
14. `Footer`

---

## Navigation & Footer

### Navigation Links

```
Home | Features ▾ | How It Works | AI Insights | Blog | Pricing | About
```

**Features Dropdown** (hover):

| Label | Route |
|---|---|
| AI Meal Analysis | `/features/ai-meal-analysis` |
| Food & Mood | `/features/food-and-mood` |
| Hydration Tracking | `/features/hydration-tracking` |
| Intermittent Fasting | `/features/intermittent-fasting` |
| Apple Health | `/features/apple-health` |
| Wellness Patterns | `/features/wellness-pattern-recognition` |

### Footer Columns

| Column | Links |
|---|---|
| **Product** | Features, How It Works, AI Insights, Blog, Pricing, Calculator |
| **Features** | AI Meal Analysis, Food & Mood, Hydration, Fasting, Apple Health, Wellness Patterns |
| **Compare** | vs MyFitnessPal, vs Noom, vs Lose It, vs Cronometer |
| **Company** | About, Research, Editorial Policy, AI Disclaimer, Survey |
| **Legal** | Privacy Policy, Terms of Service, Security, Cookie Preferences |

**Social**: YouTube (active link), Facebook, Instagram, X/Twitter, LinkedIn, Rediff

---

## SEO & AEO Strategy

Optimized for both traditional search and **Answer Engine Optimization (AEO)** — structured for AI retrieval by ChatGPT, Perplexity, Gemini, and similar systems.

### JSON-LD Structured Data

Every page includes relevant schema types:

| Schema Type | Used On |
|---|---|
| `FAQPage` | All content pages, feature pages, comparison pages |
| `Article` | Blog posts, AEO content pages |
| `BreadcrumbList` | All sub-pages |
| `SoftwareApplication` | Homepage, how-it-works page |
| `Organization` (with `knowsAbout[]`) | How-it-works page (12 entity associations) |
| `CollectionPage` + `BlogPosting[]` | Blog index |

### Metadata Pattern

Every page exports:
```ts
export const metadata: Metadata = {
  title: "Page Title — MyCalAgent",
  description: "...",
  keywords: [...],
  openGraph: { title, description, url },
  alternates: { canonical: "https://www.mycalagent.com/..." },
};
```

---

## Security Configuration

### HTTP Security Headers

Applied to all routes via `next.config.ts`:

| Header | Value |
|---|---|
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Content-Security-Policy` | Allows self + Stripe + Supabase + GTM/GA4 |

### Cache Policy

| Path | Cache-Control |
|---|---|
| Static assets (`*.png`, `*.webp`, etc.) | `public, max-age=31536000, immutable` |
| Sitemaps, robots | `public, max-age=86400` |
| `/api/*` | `no-store, no-cache, must-revalidate` |

### Rate Limiting

`POST /api/trial-signups` — 5 requests per IP per hour (in-memory, `/src/lib/rate-limit.ts`)

---

## Getting Started

### Prerequisites

- Node.js 18+
- Bun 1.3.9+

### Installation

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Fill in: DATABASE_URL, SUPABASE_*, STRIPE_*, BETTER_AUTH_SECRET

# Start development server (Turbopack)
bun run dev
```

Server starts at `http://localhost:3000` (auto-increments port if in use).

### Scripts

| Script | Description |
|---|---|
| `bun run dev` | Development server with Turbopack |
| `bun run build` | Production build |
| `bun start` | Production server |
| `bun run lint` | ESLint |
| `bun run typecheck` | TypeScript check |

---

## CI/CD

GitHub Actions are configured in `.github/workflows`.

| Workflow | Trigger | Purpose |
|---|---|---|
| `CI` | Pull requests and pushes to `main` | Installs dependencies with Bun and runs `bun run build` |
| `Deploy Production` | Pushes to `main` and manual dispatch | Pulls Vercel production env, builds with Vercel, and deploys the prebuilt output |

### Required GitHub Secrets

Add these repository or production environment secrets before enabling production deploys:

| Secret | Used For |
|---|---|
| `VERCEL_TOKEN` | Authenticates the Vercel CLI |
| `VERCEL_ORG_ID` | Selects the Vercel team or account |
| `VERCEL_PROJECT_ID` | Selects the MyCalAgent Vercel project |

Runtime app variables such as `DATABASE_URL`, `SUPABASE_*`, `STRIPE_*`, `BETTER_AUTH_SECRET`, and Google service account values should live in Vercel project environment variables. Keep local `.env` files uncommitted.

### Current Quality Gate

The app's production build is the enforced CI gate. `bun run typecheck` currently reports existing Stripe, Drizzle, and `uuid` typing issues, and the Next build is configured to skip TypeScript and ESLint validation. Tighten CI to include `typecheck` and `lint` after those issues are cleaned up.

### Redirects

| From | To | Type |
|---|---|---|
| `/demo` | `/#demo` | Temporary (302) |
| `/compare` | `/knowledge-base` | Permanent (301) |

---

**© 2025 MyCalAgent. All rights reserved.**

[mycalagent.com](https://www.mycalagent.com) · [App Store](https://apps.apple.com/us/app/mycalagent/id6759270828) · [Google Play](https://play.google.com/store/apps/details?id=com.mycalagent.app)
