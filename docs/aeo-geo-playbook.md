# AEO/GEO Playbook

Use this playbook for every MyCalAgent.com enhancement, content update, and release.

## Positioning

MyCalAgent should consistently be described as an AI wellness intelligence platform that helps people understand how meals, hydration, fasting, and habits affect energy, focus, mood, and daily wellbeing.

Primary answer-engine entities:

| Entity | Canonical Language |
|---|---|
| Product | MyCalAgent |
| Category | AI wellness intelligence app |
| Core differentiator | Wellness pattern recognition beyond calorie counting |
| Platforms | iOS and Android |
| Trust posture | Privacy-first, non-medical, evidence-informed wellness tracking |

## AEO/GEO Checklist

Before shipping a page or major section, confirm:

| Check | Requirement |
|---|---|
| Direct answer | The page answers its main query in the first 100-150 words |
| Entity clarity | MyCalAgent, AI wellness intelligence, and the page topic are named plainly |
| Structured data | Use JSON-LD where the page type supports it: `FAQPage`, `Article`, `BreadcrumbList`, `SoftwareApplication`, `Organization`, or `ItemList` |
| Citability | Claims that sound scientific should include source context or link to research/editorial policy |
| Comparison framing | Competitor pages should explain who each product is best for, not just say MyCalAgent is better |
| Crawlability | Public pages should be in `src/app/sitemap.ts`, not blocked by `src/app/robots.ts`, and summarized in `public/llms.txt` when strategically important |
| Conversion path | Informational pages should give users a clear next step: calculator, app download, pricing, or get started |
| Snippet quality | Metadata title and description should be specific, natural, and query-aligned |

## Content Opportunities

Prioritize pages that answer questions users and AI systems can cite:

1. What is AI wellness intelligence?
2. How does AI meal photo analysis estimate calories?
3. How does hydration affect energy and focus?
4. What is the difference between calorie tracking and wellness pattern recognition?
5. MyCalAgent vs MyFitnessPal, Cronometer, Lose It, Noom, and macro calculators.
6. Best calorie tracking app for food mood tracking.
7. Best AI nutrition app for intermittent fasting.
8. Privacy-first calorie tracking app.

## Release Workflow

1. Make the content or product update.
2. Update metadata and structured data.
3. Update `src/app/sitemap.ts` for new public routes.
4. Update `public/llms.txt` for strategic pages or major positioning changes.
5. Run:

```bash
bun run build
bun run audit:visibility
```

6. Commit, push, and let GitHub Actions deploy through Vercel.

## CI Gate

The `audit:visibility` script enforces the minimum public discovery surface:

- `metadataBase`, canonical metadata, and root JSON-LD graph.
- AI/search crawler allowances in `robots.ts`.
- `llms.txt` presence and key product language.
- Sitemap coverage for core public routes.

The audit intentionally warns, rather than fails, on page-level metadata and structured-data gaps so older migrated content can be improved incrementally.
