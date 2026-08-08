import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wellness Pattern Recognition — MyCalAgent | AI That Learns Your Body",
  description: "MyCalAgent's AI analyzes your meals, hydration, fasting, and habits over time to surface personalized wellness patterns — revealing how your lifestyle affects how you feel.",
  keywords: ["wellness pattern recognition", "AI wellness patterns", "personalized health insights", "behavioral wellness AI", "health pattern tracking", "wellness intelligence"],
  openGraph: {
    title: "Wellness Pattern Recognition — MyCalAgent",
    description: "AI that learns your patterns over time — connecting meals, hydration, fasting, and habits to surface personalized insights about how you feel.",
    url: "https://www.mycalagent.com/features/wellness-pattern-recognition",
  },
  alternates: { canonical: "https://www.mycalagent.com/features/wellness-pattern-recognition" },
};

const faqItems = [
  {
    question: "What is wellness pattern recognition?",
    answer: "Wellness pattern recognition is the ability of AI to analyze multiple streams of personal health data — meals, hydration, fasting, sleep, and activity — and identify recurring correlations that reveal how your lifestyle habits affect your energy, mood, and overall wellbeing.",
  },
  {
    question: "How long does it take for patterns to emerge?",
    answer: "Meaningful patterns typically emerge after 7–14 days of consistent tracking. The more data you log, the more precise and personalized the insights become. Some patterns — like post-meal energy — may surface within the first week.",
  },
  {
    question: "What kinds of patterns does MyCalAgent detect?",
    answer: "MyCalAgent detects patterns including: which meals correlate with energy crashes, when hydration gaps appear relative to focus dips, which fasting windows align with natural energy rhythms, how caffeine timing affects sleep quality, and weekly habit rhythms that affect overall wellness.",
  },
  {
    question: "Is the AI trained on my personal data only?",
    answer: "Your personal patterns are derived from your own data. The underlying AI models are trained on broad datasets to understand general nutritional and behavioral science, but your insights are individualized based on your specific logs and patterns.",
  },
  {
    question: "How is this different from just tracking calories?",
    answer: "Calorie tracking counts intake. Wellness pattern recognition connects that intake to outcomes. The goal isn't just to know what you ate — it's to understand how it affected you, so you can make better choices going forward.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Wellness Pattern Recognition: How MyCalAgent's AI Learns What Makes You Feel Good",
      url: "https://www.mycalagent.com/features/wellness-pattern-recognition",
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
        { "@type": "ListItem", position: 3, name: "Wellness Pattern Recognition", item: "https://www.mycalagent.com/features/wellness-pattern-recognition" },
      ],
    },
  ],
};

const dataStreams = [
  { emoji: "🍽️", label: "Meal data", detail: "What you eat, when you eat, and how often — logged via AI photo analysis." },
  { emoji: "💧", label: "Hydration data", detail: "Daily fluid intake across all beverage types, tracked throughout the day." },
  { emoji: "⏱️", label: "Fasting windows", detail: "Start/end times, duration, and consistency of fasting schedules." },
  { emoji: "☕", label: "Caffeine & alcohol", detail: "Timing and volume of stimulants and depressants relative to other patterns." },
  { emoji: "👟", label: "Activity data", detail: "Steps, workouts, and calories burned from Apple Health or manual entry." },
  { emoji: "💤", label: "Sleep data", detail: "Sleep duration and quality from Apple Health or connected wearables." },
];

const insights = [
  { title: "Energy pattern detection", body: "Identifies which meals, meal timings, or nutrient combinations correlate with energy peaks and crashes throughout your day." },
  { title: "Hydration-focus correlation", body: "Surfaces days when hydration gaps coincide with periods of low focus or fatigue — making the connection visible." },
  { title: "Fasting rhythm alignment", body: "Reveals which fasting schedules align with your natural energy rhythms rather than working against them." },
  { title: "Caffeine timing analysis", body: "Identifies how caffeine timing relative to bedtime affects your sleep quality and next-day energy." },
  { title: "Weekly habit patterns", body: "Shows how your habits shift across the week — and how those variations connect to how you feel." },
];

export default function WellnessPatternRecognitionPage() {
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
              <span className="text-foreground">Wellness Pattern Recognition</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Feature Deep Dive</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                Wellness Pattern Recognition
                <br />
                <span className="gradient-text">AI That Learns What Makes You Feel Good</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Single-day data is noise. Patterns across weeks reveal signal. MyCalAgent's AI connects your meals, hydration, fasting, and habits over time — surfacing the patterns that explain how your lifestyle affects how you feel.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/features/wellness-pattern-recognition"
                pageTitle="Wellness Pattern Recognition in MyCalAgent"
                pageType="feature"
              />
            </div>

            <section className="mb-16 p-8 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
              <h2 className="text-2xl font-bold mb-4">Why Patterns Matter More Than Daily Numbers</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Knowing you ate 1,800 calories today doesn't tell you much. Knowing that on days when you skip breakfast and under-hydrate, you reliably experience a 2pm energy crash — that's actionable.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Wellness pattern recognition shifts the question from "what did I eat?" to "how does what I eat affect how I feel?" — which is the question that actually leads to better decisions.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Data Streams the AI Analyzes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dataStreams.map((d, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <span className="text-2xl flex-shrink-0">{d.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{d.label}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{d.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Types of Insights Surfaced</h2>
              <div className="space-y-4">
                {insights.map((ins, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{ins.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{ins.body}</p>
                    </div>
                  </div>
                ))}
              </div>
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
              <p className="font-semibold mb-2">Start building your personal pattern dataset</p>
              <p className="text-sm text-muted-foreground mb-5">Download MyCalAgent — the more you log, the smarter your insights become.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">Explore the full picture</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/wellness-pattern-recognition" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">Pattern Recognition Guide</Link>
                <Link href="/ai-wellness-insights" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">AI Wellness Insights</Link>
                <Link href="/features/food-and-mood" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Food & Mood</Link>
                <Link href="/research" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Research</Link>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
