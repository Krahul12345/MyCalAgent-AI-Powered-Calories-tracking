import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apple Health Integration — MyCalAgent | Full Wellness Picture",
  description: "Sync MyCalAgent with Apple Health to combine nutrition, hydration, and fasting data with steps, sleep, and workouts for a complete wellness view.",
  keywords: ["Apple Health integration", "Apple Health nutrition app", "MyCalAgent Apple Health", "health app sync", "wellness app integration", "Apple Health calories"],
  openGraph: {
    title: "Apple Health Integration — MyCalAgent",
    description: "Connect MyCalAgent with Apple Health for a complete picture of how nutrition, movement, and sleep interact.",
    url: "https://www.mycalagent.com/features/apple-health",
  },
  alternates: { canonical: "https://www.mycalagent.com/features/apple-health" },
};

const faqItems = [
  {
    question: "Does MyCalAgent sync with Apple Health?",
    answer: "Yes. MyCalAgent integrates with Apple Health to both read data (steps, sleep, workouts, calories burned) and write data (nutrition logs, hydration, fasting windows) — creating a unified view across all your health tracking.",
  },
  {
    question: "What data does MyCalAgent read from Apple Health?",
    answer: "MyCalAgent can read steps, active calories burned, workouts, sleep duration and quality, and heart rate data from Apple Health. This data is used to provide context for your nutrition and wellness patterns.",
  },
  {
    question: "What data does MyCalAgent write to Apple Health?",
    answer: "MyCalAgent writes nutritional data (calories, macros, micronutrients), water intake, and meal logs to Apple Health — so your nutrition data is available to other Apple Health apps and the Health app itself.",
  },
  {
    question: "Is the Apple Health integration required?",
    answer: "No. Apple Health integration is optional. MyCalAgent works fully as a standalone app. The integration simply adds context and creates a more complete wellness picture.",
  },
  {
    question: "Is my Apple Health data private?",
    answer: "Yes. MyCalAgent never shares your Apple Health data with third parties. Data is encrypted in transit and at rest. You can revoke access at any time from iPhone Settings > Privacy & Security > Health.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Apple Health Integration: How MyCalAgent Creates a Complete Wellness Picture",
      url: "https://www.mycalagent.com/features/apple-health",
      publisher: { "@type": "Organization", name: "MyCalAgent", url: "https://www.mycalagent.com" },
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
        { "@type": "ListItem", position: 2, name: "Features", item: "https://www.mycalagent.com/features" },
        { "@type": "ListItem", position: 3, name: "Apple Health", item: "https://www.mycalagent.com/features/apple-health" },
      ],
    },
  ],
};

const dataPoints = [
  { direction: "reads", emoji: "👟", label: "Steps & movement", detail: "Daily step count and movement data for activity context." },
  { direction: "reads", emoji: "🔥", label: "Active calories burned", detail: "Workout and activity calories to inform net calorie calculations." },
  { direction: "reads", emoji: "💤", label: "Sleep data", detail: "Sleep duration and quality to surface food-sleep pattern connections." },
  { direction: "reads", emoji: "🏋️", label: "Workouts", detail: "Workout type, duration, and intensity for pre/post-workout nutrition insight." },
  { direction: "writes", emoji: "🍽️", label: "Meal nutrition data", detail: "Calories, macros, and micronutrients written back to Apple Health." },
  { direction: "writes", emoji: "💧", label: "Hydration logs", detail: "Water and beverage intake synced to Apple Health water tracking." },
];

export default function AppleHealthPage() {
  const reads = dataPoints.filter((d) => d.direction === "reads");
  const writes = dataPoints.filter((d) => d.direction === "writes");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <Navigation />

        <main className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">

            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
              <span>/</span>
              <span className="text-foreground">Apple Health</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Feature Deep Dive</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                Apple Health Integration
                <br />
                <span className="gradient-text">One Complete Wellness Picture</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Nutrition doesn't exist in isolation. By connecting MyCalAgent with Apple Health, you can see how your meals, movement, and sleep interact — and let the AI surface patterns across all of it.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/features/apple-health"
                pageTitle="Apple Health Integration in MyCalAgent"
                pageType="feature"
              />
            </div>

            <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-blue-200/50 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800/30">
                <h2 className="font-bold text-base mb-4">📥 MyCalAgent reads from Apple Health</h2>
                <div className="space-y-3">
                  {reads.map((d, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-lg flex-shrink-0">{d.emoji}</span>
                      <div>
                        <p className="text-sm font-medium">{d.label}</p>
                        <p className="text-xs text-muted-foreground">{d.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
                <h2 className="font-bold text-base mb-4">📤 MyCalAgent writes to Apple Health</h2>
                <div className="space-y-3">
                  {writes.map((d, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-lg flex-shrink-0">{d.emoji}</span>
                      <div>
                        <p className="text-sm font-medium">{d.label}</p>
                        <p className="text-xs text-muted-foreground">{d.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mb-16 p-8 rounded-3xl border border-border/40 bg-white/50 dark:bg-card/50">
              <h2 className="text-2xl font-bold mb-4">Why Integration Matters for Wellness Intelligence</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Most apps live in silos. Your step counter doesn't talk to your meal logger. Your sleep app doesn't know what you ate. The result is incomplete data — and incomplete insights.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Apple Health integration brings your data together. MyCalAgent's AI can then surface connections that would otherwise be invisible: how post-workout meals affect recovery, how sleep quality correlates with breakfast habits, how step count changes on days when nutrition is off.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The integration is bidirectional — your nutrition data is available in Apple Health, and Apple Health data enriches your wellness patterns in MyCalAgent.
              </p>
            </section>

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

            <div className="mb-10 p-8 rounded-3xl border border-border/40 bg-white/50 dark:bg-card/50 text-center">
              <p className="font-semibold mb-2">Connect your full wellness picture</p>
              <p className="text-sm text-muted-foreground mb-5">Download MyCalAgent and link Apple Health in seconds from the app settings.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">Related features</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/features/ai-meal-analysis" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">AI Meal Analysis</Link>
                <Link href="/features/wellness-pattern-recognition" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Wellness Patterns</Link>
                <Link href="/features/hydration-tracking" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Hydration Tracking</Link>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
