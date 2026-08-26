import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Base - MyCalAgent",
  description:
    "Learn how MyCalAgent works, explore AI meal scanning, nutrition science, onboarding, and answers to common questions in the MyCalAgent Knowledge Base.",
  alternates: {
    canonical: "https://www.mycalagent.com/knowledge-base",
  },
  openGraph: {
    title: "Knowledge Base - MyCalAgent",
    description:
      "Learn how MyCalAgent works, explore AI meal scanning, nutrition science, onboarding, and answers to common questions in the MyCalAgent Knowledge Base.",
    url: "https://www.mycalagent.com/knowledge-base",
  },
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How It Works" },
  { id: "core-features", label: "Core Features" },
  { id: "ai-technology", label: "AI Technology" },
  { id: "nutrition-science", label: "Nutrition Science" },
  { id: "health-snapshot", label: "Your Health Snapshot" },
  { id: "getting-started", label: "Getting Started" },
  { id: "faq", label: "FAQ" },
  { id: "scientific-foundation", label: "Scientific Foundation" },
  { id: "contact", label: "Contact & Support" },
];

const faqItems = [
  {
    question: "Is MyCalAgent just another calorie counter?",
    answer:
      "No. Traditional calorie counters require manual food searches. MyCalAgent uses AI to instantly recognize meals from photos, calculate macros and 14+ micronutrients, and provide personalized insights — no searching, no manual entry.",
  },
  {
    question: "How accurate is the meal recognition?",
    answer:
      "MyCalAgent achieves 95%+ accuracy for calorie estimation. Every meal includes a confidence score (85%–99%). For best results, take clear photos in good lighting showing the full plate.",
  },
  {
    question: "Do I need health apps to get full benefits?",
    answer:
      "No. Core features work standalone. Apple Health integration is optional on iOS, and WHOOP support is available for a fuller wellness picture.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Yes. Your data is encrypted in Supabase-backed storage and handled through secure app workflows. You can export or delete your data anytime. We never sell your data to third parties.",
  },
  {
    question: "Why different protein targets for different goals?",
    answer:
      "For weight loss, higher protein preserves muscle while losing fat. For muscle gain, higher protein supports growth. For maintenance, moderate protein sustains muscle mass.",
  },
  {
    question: "My calories are low but I'm not hungry. Is that wrong?",
    answer:
      "If you feel satisfied and energized, you're likely fine. If being consistently below targets causes fatigue or muscle loss, gradually increase your calorie intake.",
  },
  {
    question: "What if I can't hit my protein target?",
    answer:
      "Targets are optimized goals, not strict minimums. If you can't reach the full amount, aim for a consistent lower target and adjust gradually over time.",
  },
  {
    question: "How often should I update my profile?",
    answer:
      "Update after significant weight changes (5+ lbs) or activity level changes. Quarterly reviews are sufficient for most people unless actively pursuing a specific goal.",
  },
  {
    question: "Do I need to exercise to use MyCalAgent?",
    answer:
      "No. The app works for all activity levels from sedentary to very active. Exercise helps achieve goals faster but is not required to get value from the app.",
  },
  {
    question: "What if I have food allergies or dietary restrictions?",
    answer:
      "MyCalAgent tracks allergies during onboarding and flags problematic foods. You can manually edit meals or note restrictions in your profile for tailored recommendations.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Yes. The app works without internet connection. Data syncs automatically in the background when your connection is restored.",
  },
  {
    question: "Can I use it on multiple devices?",
    answer:
      "Yes. Your data syncs seamlessly across all devices signed in to your account — phone, tablet, and web.",
  },
  {
    question: "What's the difference between Free and Premium?",
    answer:
      "Free includes meal logging, nutrition tracking, and basic analytics with a daily scan limit. Premium adds unlimited scans, health device integration, advanced analytics, custom nutrition plans, and priority support.",
  },
  {
    question: "How much mobile data does the app use?",
    answer:
      "Very little. Most data is processed locally on your device, and background syncing happens over WiFi when available to minimize cellular data use.",
  },
  {
    question: "I want to lose weight. What should I do?",
    answer:
      "MyCalAgent creates a 300–500 calorie deficit based on your goal. Prioritize hitting your protein target to preserve muscle, and follow micronutrient alerts to stay healthy while losing.",
  },
  {
    question: "I want to build muscle. What's the strategy?",
    answer:
      "MyCalAgent raises your calorie target slightly and adjusts macros for higher protein intake. Combine with resistance training 3–5× per week and track weekly progress.",
  },
  {
    question: "I just want to maintain my weight. What should I do?",
    answer:
      "MyCalAgent calculates your maintenance calories and helps you hit them consistently — most valuable for understanding how much you actually eat day-to-day.",
  },
  {
    question: "How accurate is AI analysis?",
    answer:
      "AI provides smart estimates, not lab-grade measurements. You can edit any meal anytime to improve accuracy. MyCalAgent does not provide medical diagnosis or treatment.",
  },
];

const quickLinks = [
  {
    title: "Compare Apps",
    description:
      "See how MyCalAgent compares to MyFitnessPal, Cal AI, and other calorie trackers.",
    href: "/comparisons/best-calorie-tracking-apps-2025",
  },
  {
    title: "FAQ",
    description:
      "Quick answers about accuracy, data privacy, pricing, and device support.",
    href: "/faq",
  },
  {
    title: "Privacy First",
    description:
      "Learn how we encrypt data, control access, and prioritize your privacy.",
    href: "/privacy",
  },
  {
    title: "Pricing",
    description:
      "Explore Free vs Premium features and the full MyCalAgent plan details.",
    href: "/pricing",
  },
];

// Reusable responsive table wrapper
function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/60">
      <table className="min-w-full text-sm text-slate-600">{children}</table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 sm:px-4 sm:py-2 text-left font-semibold text-slate-700 bg-slate-50 whitespace-nowrap">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-3 py-2 sm:px-4 sm:py-2 align-top">{children}</td>
  );
}

// Card with optional bullet list
function Card({
  title,
  body,
  bullets,
}: {
  title: string;
  body: string;
  bullets?: string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 sm:p-5 shadow-sm">
      <h3 className="font-semibold mb-2 text-slate-900 text-base">{title}</h3>
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">{body}</p>
      {bullets && (
        <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-5 marker:text-emerald-500">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function KnowledgeBasePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-24 sm:pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
              MyCalAgent Knowledge Center
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent leading-tight">
              Your AI-Powered Calories &amp; Wellness Tracking Guide
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about how MyCalAgent works, why it is
              different, and how to use it to hit your goals without the stress
              of manual calorie counting.
            </p>
          </div>

          {/* Quick links + essentials */}
          <section className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10 sm:mb-12">
            <div className="sm:col-span-2 lg:col-span-3 rounded-3xl border border-slate-200/60 bg-white/80 p-5 sm:p-8 shadow-sm backdrop-blur">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                Start with the essentials
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-5">
                Use this guide as your product playbook. Every section explains
                what the feature does, why it matters, and how to use it in
                real life so you can move from setup to results quickly.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="rounded-2xl border border-slate-200/60 bg-white/80 p-3 sm:p-4 text-slate-900 shadow-sm transition hover:border-emerald-300/70 hover:bg-emerald-50"
                  >
                    <h3 className="font-semibold mb-1 text-sm sm:text-base">{link.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-snug">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-5 sm:p-6 shadow-sm backdrop-blur">
              <h3 className="text-base font-semibold mb-3 text-slate-900">What you will learn</h3>
              <ul className="space-y-2.5 text-sm text-slate-600 list-disc pl-4 marker:text-emerald-500">
                <li>How photo logging turns a meal photo into a full nutrient breakdown.</li>
                <li>How calorie, macro, and micronutrient targets are calculated.</li>
                <li>How wellness habits like hydration and caffeine influence your plan.</li>
                <li>What insights to focus on during your first 7 days.</li>
              </ul>
            </div>
          </section>

          {/* Main layout: sidebar TOC + content */}
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

            {/* Sidebar TOC — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-3xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur">
                <h3 className="text-base font-semibold mb-4 text-slate-900">On this page</h3>
                <nav className="space-y-2.5 text-sm text-slate-600">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block transition hover:text-emerald-600"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="space-y-14 min-w-0">

              {/* ── Overview ── */}
              <section id="overview" className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Overview</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm">
                    <h3 className="text-base font-semibold mb-3 text-slate-900">What MyCalAgent delivers</h3>
                    <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4 marker:text-emerald-500">
                      <li>Instant meal logging from a single photo with calories, macros, and 14+ micronutrients.</li>
                      <li>Daily targets that adapt to your goals, activity level, and real-world adherence.</li>
                      <li>A wellness dashboard connecting nutrition, hydration, caffeine, fasting, and recovery.</li>
                      <li>Weekly insights highlighting gaps, wins, and the next best action to take.</li>
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm">
                    <h3 className="text-base font-semibold mb-3 text-slate-900">Who it is for</h3>
                    <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4 marker:text-emerald-500">
                      <li>Busy professionals who want accurate tracking without manual food search.</li>
                      <li>Health-focused users balancing weight, performance, and energy.</li>
                      <li>Beginners who need guidance on macros and micronutrients.</li>
                      <li>Advanced users who still want automation and privacy-first logging.</li>
                    </ul>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
                  MyCalAgent removes the friction of traditional logging. Snap a photo, and the AI identifies
                  foods, estimates portions, and delivers calories, macros, and 14+ micronutrients instantly.
                  You receive personalized insights plus a daily plan based on your goals and lifestyle.
                </p>
                <div className="mt-5 rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm">
                  <h3 className="text-base font-semibold mb-3 text-slate-900">Example: a single meal photo</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                        You snap a photo of grilled salmon, quinoa, and roasted vegetables. MyCalAgent returns:
                      </p>
                      <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-4 marker:text-emerald-500">
                        <li>Calories: 540 kcal (confidence 94%)</li>
                        <li>Macros: 38g protein, 52g carbs, 18g fat</li>
                        <li>Micros: Omega-3, B12, magnesium, vitamin A</li>
                        <li>Suggested swap: add leafy greens for fiber + iron</li>
                      </ul>
                    </div>
                    <Table>
                      <thead>
                        <tr>
                          <Th>Output</Th>
                          <Th>What it helps you do</Th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60">
                        <tr><Td>Calorie target update</Td><Td>See exactly how much room you have left today</Td></tr>
                        <tr><Td>Macro progress</Td><Td>Balance protein and carbs for energy + recovery</Td></tr>
                        <tr><Td>Micronutrient gaps</Td><Td>Spot deficiencies before they add up</Td></tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </section>

              {/* ── How It Works ── */}
              <section id="how-it-works" className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">How It Works</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { title: "1. Snap", body: "Take a clear photo of your meal. The AI detects foods, portion sizes, and preparation style." },
                    { title: "2. Verify", body: "Review the auto-filled nutrition breakdown and adjust ingredients, portions, or cooking method if needed." },
                    { title: "3. Learn", body: "Your dashboard updates in real time with calorie, macro, and micronutrient progress plus next-step coaching." },
                  ].map((item) => (
                    <Card key={item.title} title={item.title} body={item.body} />
                  ))}
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {[
                    { title: "Plan", body: "Daily targets are set for calories, macros, and key micronutrients based on your onboarding profile." },
                    { title: "Act", body: "MyCalAgent suggests food swaps and habit nudges to close nutrient gaps before the day ends." },
                    { title: "Review", body: "Weekly reports summarize your progress, consistency, and the next focus area to improve." },
                  ].map((item) => (
                    <Card key={item.title} title={item.title} body={item.body} />
                  ))}
                </div>
                <div className="mt-5 rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm">
                  <h3 className="text-base font-semibold mb-3 text-slate-900">What happens after each scan</h3>
                  <Table>
                    <thead>
                      <tr>
                        <Th>Step</Th>
                        <Th>What you see</Th>
                        <Th>Why it matters</Th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60">
                      <tr><Td>AI breakdown</Td><Td>Calories, macros, micros, confidence score</Td><Td>Know exactly what counts toward today</Td></tr>
                      <tr><Td>Edit &amp; save</Td><Td>Swap items, portions, or cooking style</Td><Td>Personalises future recognition and accuracy</Td></tr>
                      <tr><Td>Insight update</Td><Td>Remaining targets + suggested action</Td><Td>Guides your next meal or habit focus</Td></tr>
                    </tbody>
                  </Table>
                </div>
              </section>

              {/* ── Core Features ── */}
              <section id="core-features" className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Core Features</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "AI Meal Photo Analysis",
                      body: "Log meals in seconds with automatic calories, macros, and 14+ micronutrients, plus ingredient-level confidence scoring.",
                      bullets: ["Recognises ingredients, cuisine style, and cooking method", "Highlights low-confidence items for quick edits", "Learns from your corrections for better future scans"],
                    },
                    {
                      title: "Personalised Calorie Targets",
                      body: "Get daily targets based on your goal, activity, metabolism, and adherence history so your plan stays realistic.",
                      bullets: ["Uses BMR + activity + goal to set daily range", "Adjusts targets when adherence is low or weight shifts", "Supports weight loss, maintenance, and lean gain"],
                    },
                    {
                      title: "Macro + Micronutrient Coaching",
                      body: "Daily macro ranges and micronutrient alerts highlight gaps (fiber, iron, vitamin D, omega-3) before they add up.",
                      bullets: ["Macro ranges update based on training intensity", "Micros sourced from USDA nutrient references", "Smart alerts suggest food-based fixes, not supplements"],
                    },
                    {
                      title: "Holistic Wellness Tracking",
                      body: "Track hydration, caffeine, alcohol, fasting windows, and mood to see how habits impact energy and hunger.",
                      bullets: ["Separate logs for water, caffeine, and alcohol", "Fasting windows compare eating rhythm to energy levels", "Daily prompts tie hydration to performance and cravings"],
                    },
                    {
                      title: "Health Integrations",
                      body: "Sync steps, sleep, and workouts from Apple Health on iOS, and connect supported devices such as WHOOP for a fuller wellness picture.",
                      bullets: ["Auto-imports workouts to adjust activity factors", "Sleep quality influences recovery recommendations", "All integrations are opt-in and private"],
                    },
                    {
                      title: "Trend & Insight Reports",
                      body: "Weekly summaries show consistency, adherence, and the single most important improvement for next week.",
                      bullets: ["Highlights best day, toughest day, and why", "Shows trend lines for calories, protein, and water", "Ends with one clear next-step recommendation"],
                    },
                  ].map((item) => (
                    <Card key={item.title} title={item.title} body={item.body} bullets={item.bullets} />
                  ))}
                </div>
                <div className="mt-5 rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm">
                  <h3 className="text-base font-semibold mb-3 text-slate-900">Feature coverage by plan</h3>
                  <Table>
                    <thead>
                      <tr><Th>Feature</Th><Th>Free</Th><Th>Premium</Th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60">
                      <tr><Td>AI meal scans</Td><Td>Daily scan limit</Td><Td>Unlimited + batch scans</Td></tr>
                      <tr><Td>Health integrations</Td><Td>Limited</Td><Td>Full access</Td></tr>
                      <tr><Td>Advanced insights</Td><Td>Weekly summary</Td><Td>Daily + weekly coaching</Td></tr>
                      <tr><Td>Custom nutrition plans</Td><Td>—</Td><Td>Included</Td></tr>
                    </tbody>
                  </Table>
                </div>
              </section>

              {/* ── AI Technology ── */}
              <section id="ai-technology" className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">AI Technology</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Visual Recognition",
                      body: "Trained on thousands of real-world meals to identify foods, cuisines, and preparation methods with high accuracy.",
                      bullets: ["Recognises multi-item plates, mixed bowls, and packaged foods", "Understands cooking methods: grilled, baked, fried"],
                    },
                    {
                      title: "Portion Estimation",
                      body: "Uses plate geometry, utensil cues, and volume heuristics to estimate portion size for calories and macros.",
                      bullets: ["Detects plate size and depth to estimate volume", "Learns from edits to improve future portion estimates"],
                    },
                    {
                      title: "Confidence Scoring",
                      body: "Every scan includes an accuracy range and highlights low-confidence items so you can edit quickly.",
                      bullets: ["Confidence ranges show 85% to 99% accuracy", "Low-confidence items are flagged for review"],
                    },
                    {
                      title: "Smart Corrections",
                      body: "Edits teach the model your preferences over time, improving future suggestions for similar meals.",
                      bullets: ["Remembers preferred brands and portions", "Reduces manual edits over time"],
                    },
                    {
                      title: "Nutrition Enrichment",
                      body: "Food matches are linked to a nutrient database to surface 14+ micronutrients automatically.",
                      bullets: ["Vitamin and mineral data follows USDA references", "Highlights top three micronutrient gaps daily"],
                    },
                    {
                      title: "Privacy by Design",
                      body: "Images are processed securely, and you control what is stored or deleted in your history.",
                      bullets: ["Encrypted Supabase-backed storage for sensitive wellness data", "Full control of data export and deletion"],
                    },
                  ].map((item) => (
                    <Card key={item.title} title={item.title} body={item.body} bullets={item.bullets} />
                  ))}
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm">
                    <h3 className="text-base font-semibold mb-3 text-slate-900">Example scan workflow</h3>
                    <ol className="space-y-2 text-sm text-slate-600 list-decimal pl-4 marker:text-emerald-500">
                      <li>Capture photo in natural light for best recognition.</li>
                      <li>AI returns foods, portions, and confidence ranges.</li>
                      <li>Confirm or edit ingredients and portion sizes.</li>
                      <li>Save to update daily targets and health snapshot.</li>
                    </ol>
                  </div>
                  <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm">
                    <h3 className="text-base font-semibold mb-3 text-slate-900">What improves accuracy</h3>
                    <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4 marker:text-emerald-500">
                      <li>Full plate visibility (no cut-off foods)</li>
                      <li>One plate per photo when possible</li>
                      <li>Consistent lighting and no heavy shadows</li>
                      <li>Edit meals when portions differ from AI estimate</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* ── Nutrition Science ── */}
              <section id="nutrition-science" className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Nutrition Science</h2>
                <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm backdrop-blur">
                  <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed">
                    MyCalAgent is built around evidence-based nutrition. It prioritises protein for muscle
                    preservation, balances fats and carbs for energy, and emphasises micronutrient adequacy
                    to support long-term health. Targets update when your weight or activity shifts.
                  </p>
                  <ul className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2 list-disc pl-4 marker:text-emerald-500">
                    <li>Protein targets adapt to your goal, lean mass, and training frequency.</li>
                    <li>Carb ranges scale with activity days to support performance.</li>
                    <li>Fat minimums protect hormone health and satiety.</li>
                    <li>Micronutrient alerts flag common deficiencies like iron and vitamin D.</li>
                    <li>Fiber focus supports gut health, glucose stability, and fullness.</li>
                    <li>Hydration goals align with activity, climate, and sodium intake.</li>
                  </ul>
                </div>
                <div className="mt-5 rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm">
                  <h3 className="text-base font-semibold mb-3 text-slate-900">Macro guide by goal</h3>
                  <Table>
                    <thead>
                      <tr><Th>Goal</Th><Th>Protein</Th><Th>Carbs</Th><Th>Fats</Th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60">
                      <tr><Td>Weight loss</Td><Td>High (30–35%)</Td><Td>Moderate (35–40%)</Td><Td>Moderate (25–30%)</Td></tr>
                      <tr><Td>Maintenance</Td><Td>Moderate (25–30%)</Td><Td>Moderate (40–45%)</Td><Td>Moderate (25–30%)</Td></tr>
                      <tr><Td>Muscle gain</Td><Td>High (25–30%)</Td><Td>High (45–50%)</Td><Td>Moderate (20–25%)</Td></tr>
                    </tbody>
                  </Table>
                </div>
              </section>

              {/* ── Health Snapshot ── */}
              <section id="health-snapshot" className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Your Health Snapshot</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-5 leading-relaxed">
                  The Health Snapshot is your personalised dashboard. It blends nutrition intake, body metrics,
                  and lifestyle signals into a clear daily summary so you know exactly what to focus on next.
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    "Daily calorie + macro progress with remaining targets",
                    "Micronutrient coverage score with top three gaps",
                    "Hydration and caffeine balance with timing nudges",
                    "Activity, sleep, and recovery insights from integrations",
                    "Weekly trend analysis to spot consistency patterns",
                    "Goal progress score with projected timeline",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200/60 bg-white/80 p-3 sm:p-4 text-sm text-slate-600 shadow-sm flex items-start gap-2"
                    >
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Daily focus prompt", body: "Each morning, the Snapshot highlights the single habit that will move your goal forward fastest." },
                    { title: "Evening recap", body: "At day-end, you see where you over- or under-shot targets and how to adjust tomorrow." },
                  ].map((item) => (
                    <Card key={item.title} title={item.title} body={item.body} />
                  ))}
                </div>
                <div className="mt-5 rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm">
                  <h3 className="text-base font-semibold mb-3 text-slate-900">Example daily snapshot</h3>
                  <Table>
                    <thead>
                      <tr><Th>Metric</Th><Th>Today</Th><Th>Coach note</Th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60">
                      <tr><Td>Calories</Td><Td>1,460 / 1,750 kcal</Td><Td>Room for a protein + fiber snack</Td></tr>
                      <tr><Td>Protein</Td><Td>92g / 120g</Td><Td>Add 25g at dinner</Td></tr>
                      <tr><Td>Hydration</Td><Td>58 / 90 oz</Td><Td>Drink 2 bottles before 6 pm</Td></tr>
                      <tr><Td>Micronutrient score</Td><Td>73%</Td><Td>Low iron + vitamin D today</Td></tr>
                    </tbody>
                  </Table>
                </div>
              </section>

              {/* ── Getting Started ── */}
              <section id="getting-started" className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Getting Started</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Complete onboarding",
                      body: "Share your goal, lifestyle, dietary preferences, and current habits so the plan is tailored on day one.",
                      bullets: ["Choose your goal (lose, maintain, or gain)", "Set activity level and training frequency", "Add dietary restrictions or allergies"],
                    },
                    {
                      title: "Log your first meal",
                      body: "Take a photo, confirm the ingredients, and save the meal to populate your dashboard instantly.",
                      bullets: ["Use natural light and include the full plate", "Confirm portion sizes if they look off", "Save to trigger the first insight update"],
                    },
                    {
                      title: "Review your daily targets",
                      body: "Your dashboard shows calorie, macro, and micronutrient targets plus remaining ranges for the day.",
                      bullets: ["Track remaining calories and protein", "Review top 3 micronutrient gaps", "Check hydration and caffeine limits"],
                    },
                    {
                      title: "Use the daily focus prompt",
                      body: "Each day you receive one high-impact action like a protein goal or hydration target.",
                      bullets: ["Follow the prompt before lunch if possible", "Use it to decide your next snack or meal", "Check it again after workouts"],
                    },
                    {
                      title: "Weekly progress review",
                      body: "Scan your weekly report for adherence, trend lines, and the next recommended adjustment.",
                      bullets: ["Look for the strongest and weakest day", "Review 7-day average calories and protein", "Apply the single priority recommendation"],
                    },
                    {
                      title: "Adjust when life changes",
                      body: "Update your profile after weight shifts, schedule changes, or new training blocks.",
                      bullets: ["Update every 5–10 lbs or 4–6 weeks", "Change activity level with new workouts", "Revisit macros if goals change"],
                    },
                  ].map((item) => (
                    <Card key={item.title} title={item.title} body={item.body} bullets={item.bullets} />
                  ))}
                </div>
                <div className="mt-5 rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm">
                  <h3 className="text-base font-semibold mb-3 text-slate-900">First week checklist</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4 marker:text-emerald-500">
                      <li>Log at least 10 meals to train the AI to your patterns</li>
                      <li>Hit protein target on 4 of 7 days</li>
                      <li>Drink your hydration target 5 days this week</li>
                      <li>Review your top 3 micronutrient gaps</li>
                    </ul>
                    <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4 marker:text-emerald-500">
                      <li>Try the daily focus prompt by 2 pm</li>
                      <li>Complete one weekly review on Sunday</li>
                      <li>Update weight if you weigh-in weekly</li>
                      <li>Enable integrations if you use Apple Health</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* ── FAQ ── */}
              <section id="faq" className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">FAQ</h2>
                <div
                  className="space-y-4"
                  itemScope
                  itemType="https://schema.org/FAQPage"
                >
                  {faqItems.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 sm:p-5 shadow-sm"
                      itemScope
                      itemType="https://schema.org/Question"
                      itemProp="mainEntity"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <h3
                          className="font-semibold text-slate-900 text-sm sm:text-base leading-snug"
                          itemProp="name"
                        >
                          {item.question}
                        </h3>
                      </div>
                      <div
                        className="text-sm text-slate-600 leading-relaxed pl-7 sm:pl-8"
                        itemScope
                        itemType="https://schema.org/Answer"
                        itemProp="acceptedAnswer"
                      >
                        <span itemProp="text">{item.answer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Scientific Foundation ── */}
              <section id="scientific-foundation" className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Scientific Foundation</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Metabolic rate calculations",
                      body: "BMR is calculated using the Mifflin-St Jeor equation and adjusted with activity multipliers and goal-based deficits or surpluses.",
                      bullets: ["Recalculated whenever weight or activity changes", "Uses mild deficit/surplus ranges for sustainability"],
                    },
                    {
                      title: "Protein requirements",
                      body: "Protein targets align with ISSN guidelines for muscle retention and performance across different activity levels.",
                      bullets: ["Higher range for resistance training or fat loss", "Moderate range for maintenance and light activity"],
                    },
                    {
                      title: "Micronutrient standards",
                      body: "Vitamin and mineral benchmarks are based on USDA dietary reference intakes to flag common deficiencies.",
                      bullets: ["Daily score highlights top 3 gaps", "Food-based fixes recommended first"],
                    },
                    {
                      title: "Activity guidance",
                      body: "Weekly movement recommendations follow CDC and WHO guidelines, tailored by your training frequency.",
                      bullets: ["Movement goal scales with baseline steps", "Recovery nudges prioritise sleep and hydration"],
                    },
                  ].map((item) => (
                    <Card key={item.title} title={item.title} body={item.body} bullets={item.bullets} />
                  ))}
                </div>
                <div className="mt-5 rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm">
                  <h3 className="text-base font-semibold mb-3 text-slate-900">Research-backed inputs</h3>
                  <ul className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2 list-disc pl-4 marker:text-emerald-500">
                    <li>Mifflin-St Jeor equation for BMR</li>
                    <li>USDA Dietary Reference Intakes</li>
                    <li>ISSN position stands for protein needs</li>
                    <li>CDC + WHO weekly movement guidelines</li>
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  MyCalAgent provides educational guidance, not medical advice. Always consult a healthcare
                  professional for personalised medical recommendations.
                </p>
              </section>

              {/* ── Contact ── */}
              <section id="contact" className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Contact &amp; Support</h2>
                <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-4 sm:p-6 shadow-sm backdrop-blur">
                  <p className="text-sm sm:text-base text-slate-600 mb-4">
                    Need help or want to share feedback? Our support team is here for you.
                  </p>
                  <div className="flex flex-col gap-3 text-sm text-slate-600">
                    <div>Email: <a href="mailto:support@mycalagent.com" className="text-slate-900 hover:text-emerald-600 transition-colors">support@mycalagent.com</a></div>
                    <div>Response time: <span className="text-slate-900">within 24 hours</span></div>
                    <div>Knowledge Base updates weekly with new guides and tips.</div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
