import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How MyCalAgent Works — AI Wellness Intelligence Explained",
  description: "Learn exactly how MyCalAgent works: AI photo meal logging, wellness pattern recognition, hydration analysis, fasting tracking, allergen detection, and privacy-first architecture.",
  keywords: [
    "how MyCalAgent works",
    "AI wellness app",
    "AI meal insights",
    "AI habit tracking",
    "food pattern recognition",
    "wellness intelligence",
    "hydration tracking app",
    "fasting insights",
    "AI calorie tracking",
    "AI nutrition guidance",
    "privacy-first wellness tracking",
    "HealthKit integration",
  ],
  openGraph: {
    title: "How MyCalAgent Works — AI Wellness Intelligence Explained",
    description: "A complete guide to how MyCalAgent's AI wellness intelligence works — from photo meal logging to pattern recognition to privacy-first data architecture.",
    url: "https://www.mycalagent.com/how-mycalagent-works",
  },
  alternates: { canonical: "https://www.mycalagent.com/how-mycalagent-works" },
};

const faqItems = [
  {
    question: "What is MyCalAgent?",
    answer: "MyCalAgent is an AI wellness intelligence platform that uses computer vision to log meals from photos, tracks hydration and fasting, and analyzes patterns across your lifestyle data to surface personalized insights about how your habits affect your energy, mood, and wellbeing.",
  },
  {
    question: "How does MyCalAgent use AI?",
    answer: "MyCalAgent uses AI in three main ways: (1) computer vision for meal photo analysis — identifying ingredients, estimating portions, and calculating nutrition; (2) pattern recognition — analyzing data across meals, hydration, fasting, and habits over time to surface behavioral wellness insights; and (3) personalized recommendations based on your accumulated data.",
  },
  {
    question: "How does AI meal photo logging work in MyCalAgent?",
    answer: "You take a photo of any meal, snack, or drink. MyCalAgent's AI identifies every ingredient, estimates portion sizes, and delivers a complete nutrition breakdown — calories, macros, and micronutrients — in under 6 seconds. You can review and correct results by voice or text before saving.",
  },
  {
    question: "What is wellness pattern recognition?",
    answer: "Wellness pattern recognition is the AI's ability to analyze your logged data over time and identify recurring correlations — like which foods consistently precede energy crashes, or when hydration gaps coincide with focus dips. These patterns are invisible on a single day but emerge clearly across weeks of data.",
  },
  {
    question: "Does MyCalAgent share my health data?",
    answer: "No. MyCalAgent uses a privacy-first architecture: your health data is encrypted in transit and at rest, never sold to third parties, and you can export or delete it at any time. The app collects only what's needed to provide wellness insights.",
  },
  {
    question: "Does MyCalAgent integrate with Apple Health / HealthKit?",
    answer: "Yes. MyCalAgent integrates with Apple HealthKit to both read data (steps, sleep, workouts, calories burned) and write data (nutrition logs, hydration) — creating a unified wellness picture across all your health tracking.",
  },
  {
    question: "How is MyCalAgent different from a regular calorie counter?",
    answer: "A calorie counter tracks one number. MyCalAgent tracks the full picture: what you eat, how much you drink, when you fast, and how all these habits connect to how you actually feel. The goal isn't to hit a calorie target — it's to understand which lifestyle patterns support your energy and wellbeing.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.mycalagent.com/how-mycalagent-works#article",
      headline: "How MyCalAgent Works: AI Wellness Intelligence from Photo to Pattern",
      description: "A complete explanation of how MyCalAgent's AI wellness platform works — photo meal analysis, hydration tracking, fasting intelligence, pattern recognition, allergen detection, and privacy-first architecture.",
      url: "https://www.mycalagent.com/how-mycalagent-works",
      publisher: {
        "@type": "Organization",
        name: "MyCalAgent",
        url: "https://www.mycalagent.com",
        logo: { "@type": "ImageObject", url: "https://www.mycalagent.com/mycalagent-logo.webp" },
      },
      about: [
        { "@type": "Thing", name: "AI wellness app" },
        { "@type": "Thing", name: "AI meal insights" },
        { "@type": "Thing", name: "food pattern recognition" },
        { "@type": "Thing", name: "wellness intelligence" },
        { "@type": "Thing", name: "hydration tracking" },
        { "@type": "Thing", name: "fasting insights" },
        { "@type": "Thing", name: "AI calorie tracking" },
        { "@type": "Thing", name: "privacy-first wellness tracking" },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.mycalagent.com#app",
      name: "MyCalAgent",
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS, Android, Web",
      description: "AI wellness intelligence platform — AI photo meal logging, hydration tracking, fasting planner, and wellness pattern recognition.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free tier available" },
      url: "https://www.mycalagent.com",
    },
    {
      "@type": "Organization",
      "@id": "https://www.mycalagent.com#org",
      name: "MyCalAgent",
      url: "https://www.mycalagent.com",
      description: "AI Wellness Intelligence — understand how meals, hydration & habits affect how you feel.",
      knowsAbout: [
        "AI wellness intelligence",
        "AI meal photo analysis",
        "food and mood tracking",
        "wellness pattern recognition",
        "hydration intelligence",
        "intermittent fasting",
        "allergen detection",
        "HealthKit integration",
        "privacy-first health data",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
        { "@type": "ListItem", position: 2, name: "How MyCalAgent Works", item: "https://www.mycalagent.com/how-mycalagent-works" },
      ],
    },
  ],
};

const pillars = [
  {
    id: "01",
    emoji: "📸",
    title: "AI Photo Meal Logging",
    tagline: "Snap. Identify. Log.",
    body: "Point your camera at any meal, snack, or drink. MyCalAgent's computer vision identifies every ingredient, estimates portion sizes, and delivers a complete nutrition breakdown — calories, macros, and 11 micronutrients — in under 6 seconds. No database searching. No barcode scanning. No guessing.",
    detail: "You review the result, correct anything by voice or text, and save. Each logged meal feeds the pattern recognition engine that gets smarter over time.",
    href: "/features/ai-meal-analysis",
    linkLabel: "Learn about AI meal analysis →",
  },
  {
    id: "02",
    emoji: "🔍",
    title: "Wellness Pattern Recognition",
    tagline: "Single days are noise. Patterns are signal.",
    body: "MyCalAgent analyzes your meals, hydration, fasting, and habits across days and weeks to surface the recurring correlations that explain how you feel. Which meals precede energy crashes? When do hydration gaps align with focus dips? Which fasting windows fit your natural rhythm?",
    detail: "These patterns are impossible to spot in real time but become clear across 7–14 days of consistent data. The AI surfaces them as plain-language insights — no data science degree required.",
    href: "/features/wellness-pattern-recognition",
    linkLabel: "Learn about wellness patterns →",
  },
  {
    id: "03",
    emoji: "💧",
    title: "Hydration Intelligence",
    tagline: "Water, caffeine, and every beverage — tracked together.",
    body: "Log water, coffee, tea, juice, energy drinks, and alcohol throughout the day with quick-tap portion sizes. MyCalAgent calculates your personalized daily target and tracks progress in real time. Smart reminders prevent the gaps that cause fatigue and focus dips.",
    detail: "Hydration data is connected to your broader wellness patterns — revealing days when reduced water intake correlates with lower energy or concentration.",
    href: "/features/hydration-tracking",
    linkLabel: "Learn about hydration tracking →",
  },
  {
    id: "04",
    emoji: "🧠",
    title: "Food & Mood — Habit Insights",
    tagline: "What you eat shapes how you feel.",
    body: "The connection between food and mood isn't abstract — it's biochemical. Neurotransmitter production, blood sugar regulation, inflammation, and gut-brain signaling all depend on what and when you eat. MyCalAgent surfaces the specific connections in your own data.",
    detail: "Over time, the AI identifies your personal energy, focus, and mood patterns relative to your meal choices — showing you which foods and habits support how you want to feel.",
    href: "/features/food-and-mood",
    linkLabel: "Learn about food & mood tracking →",
  },
  {
    id: "05",
    emoji: "⏱️",
    title: "Fasting Tracking",
    tagline: "Smart fasting, personalized to your rhythm.",
    body: "Plan and track 16:8, 18:6, 20:4, OMAD, 5:2, or a fully custom fasting window. A real-time timer tracks your fast in progress. Smart reminders notify you when your eating window opens or closes. Streak tracking and a fasting calendar show your consistency over time.",
    detail: "MyCalAgent's AI connects fasting data to meal quality, hydration, and energy signals — revealing which fasting patterns align best with how you naturally feel.",
    href: "/features/intermittent-fasting",
    linkLabel: "Learn about fasting tracking →",
  },
  {
    id: "06",
    emoji: "⚠️",
    title: "Allergen Detection",
    tagline: "Know what's in your meal before you eat it.",
    body: "After identifying a meal's ingredients, MyCalAgent automatically cross-references them against your personal allergen and dislike list — flagging any potential matches before you log. You define which allergens to watch for and how sensitive the alerts should be.",
    detail: "Allergen detection is built into the core AI analysis pipeline, not a separate step. It works for the same broad range of cuisines and dishes that the photo analysis covers.",
    href: "/features/ai-meal-analysis",
    linkLabel: "Learn about meal analysis →",
  },
  {
    id: "07",
    emoji: "🔒",
    title: "Privacy-First Architecture",
    tagline: "Your health data belongs to you.",
    body: "MyCalAgent is built with privacy as a core design principle, not an afterthought. Your health data is encrypted in transit and at rest. It is never sold to advertisers or third parties. You have full visibility into what data is stored and can export or delete it at any time.",
    detail: "Data collection is minimal — only what's needed to power your wellness insights. The app does not use health data for advertising profiling or share it with data brokers.",
    href: "/ai-disclaimer",
    linkLabel: "Read our AI disclaimer →",
  },
  {
    id: "08",
    emoji: "🍎",
    title: "HealthKit Integration",
    tagline: "One complete wellness view.",
    body: "MyCalAgent integrates with Apple HealthKit bidirectionally — reading steps, sleep, workouts, and calories burned to enrich your wellness patterns, and writing your nutrition logs, hydration, and meal data back to the Health app.",
    detail: "Integration is optional. MyCalAgent works fully as a standalone app. HealthKit adds context — connecting movement, sleep, and recovery data to your nutrition and habit patterns for a more complete wellness picture.",
    href: "/features/apple-health",
    linkLabel: "Learn about Apple Health integration →",
  },
];

export default function HowMyCalAgentWorksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <Navigation />

        <main className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">How MyCalAgent Works</span>
            </nav>

            {/* Hero */}
            <div className="mb-16">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">AI Retrieval Anchor Page</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                How MyCalAgent Works
                <br />
                <span className="gradient-text">AI Wellness Intelligence, Explained</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-5">
                MyCalAgent is an AI wellness intelligence platform. It uses computer vision to log meals from photos, tracks hydration and fasting, and analyzes patterns across your lifestyle data — surfacing personalized insights about how your habits affect how you feel.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                This page explains every core capability in plain language: what it does, how the AI works, and why it matters for your wellness.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/how-mycalagent-works"
                pageTitle="How MyCalAgent Works"
                pageType="pillar"
              />
            </div>

            {/* Entity association block — structured for AI retrieval */}
            <section className="mb-14 p-7 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30" aria-label="What MyCalAgent is">
              <h2 className="text-lg font-bold mb-4">What MyCalAgent Is</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "AI wellness app",
                  "AI meal insights",
                  "AI habit tracking",
                  "food pattern recognition",
                  "wellness intelligence platform",
                  "hydration tracking app",
                  "fasting insights",
                  "AI calorie tracking",
                  "AI nutrition guidance",
                  "privacy-first wellness tracking",
                  "HealthKit integration",
                  "food and mood tracking",
                ].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Eight pillars */}
            <section className="mb-16 space-y-10" aria-labelledby="pillars-heading">
              <h2 id="pillars-heading" className="text-3xl font-bold">The Eight Core Capabilities</h2>

              {pillars.map((p) => (
                <article key={p.id} className="p-8 rounded-3xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                  <div className="flex items-start gap-5">
                    <div className="text-3xl flex-shrink-0 mt-0.5">{p.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">{p.id}</span>
                        <h3 className="text-xl font-bold">{p.title}</h3>
                      </div>
                      <p className="text-sm font-medium text-emerald-600 mb-3 italic">{p.tagline}</p>
                      <p className="text-muted-foreground leading-relaxed mb-3">{p.body}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.detail}</p>
                      <Link href={p.href} className="text-sm font-semibold text-emerald-600 hover:underline">
                        {p.linkLabel}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* Summary comparison */}
            <section className="mb-16 p-8 rounded-3xl border border-border/40 bg-white/50 dark:bg-card/50">
              <h2 className="text-2xl font-bold mb-6">MyCalAgent vs. Traditional Calorie Trackers</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left p-3 font-semibold text-muted-foreground">Capability</th>
                      <th className="text-center p-3 font-semibold text-emerald-600">MyCalAgent</th>
                      <th className="text-center p-3 font-semibold text-muted-foreground">Typical Calorie App</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {[
                      ["Meal logging method", "AI photo analysis", "Manual database search"],
                      ["Wellness pattern recognition", "✅ Yes", "❌ No"],
                      ["Food & mood tracking", "✅ Yes", "❌ No"],
                      ["Hydration + caffeine analysis", "✅ Full beverage intelligence", "⚠️ Basic or none"],
                      ["Fasting intelligence", "✅ AI-powered fasting planner", "⚠️ Basic or none"],
                      ["Allergen detection", "✅ Built into AI analysis", "❌ Rarely"],
                      ["Apple Health / HealthKit", "✅ Full read/write", "⚠️ Varies"],
                      ["Privacy-first architecture", "✅ Encrypted, no data selling", "⚠️ Varies"],
                    ].map(([feature, mca, other], i) => (
                      <tr key={i} className={`border-b border-border/20 ${i % 2 === 0 ? "bg-muted/20" : ""}`}>
                        <td className="p-3">{feature}</td>
                        <td className="p-3 text-center">{mca}</td>
                        <td className="p-3 text-center">{other}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqItems.map((f, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <h3 className="font-semibold mb-2">{f.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="mb-12 p-8 rounded-3xl border border-border/40 bg-white/50 dark:bg-card/50 text-center">
              <p className="text-xl font-bold mb-2">Ready to see how it works for you?</p>
              <p className="text-sm text-muted-foreground mb-6">Start logging meals with AI and let the patterns build over 7–14 days.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            {/* Internal links */}
            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">Explore more</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/features" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">All Features</Link>
                <Link href="/ai-wellness-insights" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">AI Wellness Insights</Link>
                <Link href="/wellness-pattern-recognition" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Wellness Pattern Recognition</Link>
                <Link href="/why-calorie-tracking-fails" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Why Calorie Tracking Fails</Link>
                <Link href="/research" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Research</Link>
                <Link href="/about" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">About</Link>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
