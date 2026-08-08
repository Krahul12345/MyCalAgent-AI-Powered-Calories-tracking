import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hydration Tracking — MyCalAgent | Water, Caffeine & Beverage Intelligence",
  description: "Track water intake, caffeine, juice, tea, and alcohol with smart beverage logging. MyCalAgent connects your hydration habits to your energy and focus patterns.",
  keywords: ["hydration tracking app", "water intake tracker", "caffeine tracker", "beverage tracking", "hydration and energy", "hydration app"],
  openGraph: {
    title: "Hydration Tracking — MyCalAgent",
    description: "Log water, caffeine, and all beverages. See how hydration patterns connect to your daily energy and focus.",
    url: "https://www.mycalagent.com/features/hydration-tracking",
  },
  alternates: { canonical: "https://www.mycalagent.com/features/hydration-tracking" },
};

const faqItems = [
  {
    question: "How does hydration tracking work in MyCalAgent?",
    answer: "You log water and beverages throughout the day using quick-tap portion sizes. MyCalAgent tracks total fluid intake across all beverage types and compares it to your personalized daily target, adjusting for body weight, activity level, and climate.",
  },
  {
    question: "Does MyCalAgent track caffeine intake?",
    answer: "Yes. Coffee, tea, energy drinks, and sodas are all tracked with automatic caffeine calculations. You get a daily caffeine total alongside hydration data so you can see both at once.",
  },
  {
    question: "How much water should I drink per day?",
    answer: "General guidelines suggest 2–3.7 liters daily depending on body size and activity. MyCalAgent calculates a personalized target based on your profile and tracks progress toward it throughout the day.",
  },
  {
    question: "Can I set hydration reminders?",
    answer: "Yes. MyCalAgent can send push notifications at custom intervals to remind you to drink water — especially useful during long work sessions or physical activity.",
  },
  {
    question: "Does hydration data connect to energy patterns?",
    answer: "Yes. Over time, MyCalAgent's AI surfaces patterns between your hydration habits and energy signals — identifying days when hydration gaps coincide with fatigue or focus dips.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Hydration Tracking: How MyCalAgent Connects Water Intake to Energy and Focus",
      url: "https://www.mycalagent.com/features/hydration-tracking",
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
        { "@type": "ListItem", position: 3, name: "Hydration Tracking", item: "https://www.mycalagent.com/features/hydration-tracking" },
      ],
    },
  ],
};

const beverages = [
  { emoji: "💧", label: "Water", detail: "Plain, sparkling, or flavored — all counted toward your daily target." },
  { emoji: "☕", label: "Coffee & Espresso", detail: "Caffeine calculated automatically. Milk-based calories included." },
  { emoji: "🍵", label: "Tea", detail: "All varieties — green, black, herbal. Caffeine tracked per type." },
  { emoji: "🧃", label: "Juice", detail: "Calories and sugar logged. Natural sugars tracked separately from added." },
  { emoji: "⚡", label: "Energy Drinks", detail: "Caffeine and sugar content pulled from product database." },
  { emoji: "🍺", label: "Alcohol", detail: "Calories added to daily total. Alcohol units tracked separately." },
];

const stats = [
  { value: "1–2%", label: "dehydration level at which cognitive performance measurably drops" },
  { value: "~60%", label: "of the human body is water — even mild deficits have outsized effects" },
  { value: "3–4×", label: "more likely to feel fatigued when chronically under-hydrated" },
];

export default function HydrationTrackingPage() {
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
              <span className="text-foreground">Hydration Tracking</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Feature Deep Dive</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                Hydration Tracking
                <br />
                <span className="gradient-text">Water, Caffeine & Beverage Intelligence</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Mild dehydration — just 1–2% below optimal — measurably reduces cognitive performance. MyCalAgent tracks every beverage and connects your hydration habits to how you actually feel.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/features/hydration-tracking"
                pageTitle="Hydration Tracking in MyCalAgent"
                pageType="feature"
              />
            </div>

            <section className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="p-6 rounded-2xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30 text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{s.value}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.label}</p>
                </div>
              ))}
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Every Beverage, Tracked</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {beverages.map((b, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <span className="text-2xl flex-shrink-0">{b.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{b.label}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{b.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16 p-8 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
              <h2 className="text-2xl font-bold mb-4">From Tracking to Intelligence</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Logging water intake is useful on its own. But what makes MyCalAgent different is connecting that data to everything else. Over weeks, the AI identifies patterns — like days you drink less water coinciding with afternoon energy crashes, or caffeine peaking late in the day correlating with worse sleep quality.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                These are the kinds of insights that are impossible to see in a single day but become obvious when patterns are surfaced over time.
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
              <p className="font-semibold mb-2">Start tracking your hydration today</p>
              <p className="text-sm text-muted-foreground mb-5">Download MyCalAgent and see how water intake connects to your energy.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">Related</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/hydration-and-productivity" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">Hydration & Productivity</Link>
                <Link href="/features/food-and-mood" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Food & Mood</Link>
                <Link href="/features/wellness-pattern-recognition" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Wellness Patterns</Link>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
