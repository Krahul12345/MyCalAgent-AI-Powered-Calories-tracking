## Project Summary
MyCalAgent is an AI-powered calorie and wellness tracking mobile app designed for everyday lifestyles. It features AI meal photo analysis, nutrition tracking (macros, micros), hydration, caffeine, alcohol, intermittent fasting, and health data integration (Apple Health). The platform prioritizes privacy and a non-restrictive approach to health tracking.

## Tech Stack
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL) with Drizzle ORM
- **Auth**: Better Auth (configured with Supabase)
- **Payments**: Stripe
- **Styling**: Tailwind CSS 4, Framer Motion, Lucide Icons

## Architecture
- `src/app`: Next.js App Router pages and API routes
- `src/components`: UI components (including shadcn/ui)
- `src/db`: Database schema and client configuration
- `src/lib`: Utility functions and core logic
- `drizzle`: Migration files

## User Preferences
- Sync project to GitHub repository (Verified in .env, handled by platform)
- Use functional components
- No comments unless requested

## Project Guidelines
- Use relative URLs for client-side API calls
- Redirect external URLs using `window.parent.postMessage` pattern
- Ensure all new features are integrated with the existing Auth and Stripe setup

## Common Patterns
- AI meal photo analysis for calorie estimation (Placeholder in UI)
- Holistic wellness tracking (Hydration, Caffeine, Fasting)
- Stripe integration for subscriptions
- Better Auth for user management
- Functional health calculators (BMI, BMR, TDEE)

## Roadmap (Planned)
1. **Core Tracking**: Implement `meals` and `wellness_logs` tables (Completed).
2. **Dynamic Dashboard**: Connect Analytics page to real database logs (Completed).
3. **Food Logging UI**: Create a "Log Food" modal with AI analysis placeholder (Completed).
4. **Onboarding**: Connect Survey results to initial user health profile (Completed).
