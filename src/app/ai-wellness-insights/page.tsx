import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { QuickFAQ } from "@/components/QuickFAQ";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Wellness Insights — MyCalAgent | How AI Understands Your Body",
  description: "Learn how MyCalAgent's AI wellness intelligence works — connecting meals, hydration, fasting, and habits to surface personalized patterns about how your body responds.",
  keywords: ["AI wellness insights", "wellness pattern recognition", "food and mood AI", "AI health analysis", "hydration intelligence", "behavioral wellness AI"],
  openGraph: {
    title: "AI Wellness Insights — MyCalAgent | How AI Understands Your Body",
    description: "Learn how MyCalAgent's AI wellness intelligence connects meals, hydration, fasting, and habits to surface personalized patterns about how your body responds.",
    url: "https://www.mycalagent.com/ai-wellness-insights",
  },
  alternates: { canonical: "https://www.mycalagent.com/ai-wellness-insights" },
};

const faqItems = [
  {
    question: "What is AI wellness intelligence?",
    answer: "AI wellness intelligence is the ability of an AI system to analyze patterns across multiple health and lifestyle signals — meals, hydration, fasting, sleep, and habits — and surface meaningful insights about how those patterns affect your energy, mood, and overall wellbeing. Unlike simple calorie trackers, wellness intelligence connects cause and effect.",
  },
  {
    question: "How does AI recognize wellness patterns?",
    answer: "MyCalAgent tracks your meals, hydration, fasting windows, and daily habits over time. Its AI analyzes this longitudinal data to detect recurring signals — like which foods correlate with energy dips, when hydration gaps appear, or how meal timing affects your rhythm. These patterns emerge only when data is collected consistently across days and weeks.",
  },
  {
    question: "What is food and mood tracking?",
    answer: "Food and mood tracking is the practice of connecting what you eat with how you feel — including energy levels, focus, mood, and physical performance. Certain nutrients, meal timings, and dietary patterns have measurable effects on brain chemistry, blood sugar, and cognitive function. AI can surface these connections from your personal data.",
  },
  {
    question: "How does hydration affect energy and focus?",
    answer: "Dehydration as mild as 1–2% below optimal levels has been shown to reduce cognitive performance, impair short-term memory, and increase fatigue. MyCalAgent tracks your daily water intake and surfaces patterns between hydration habits and your energy and focus signals.",
  },
  {
    question: "Is AI wellness intelligence the same as medical advice?",
    answer: "No. AI wellness intelligence provides personalized lifestyle insights based on your patterns — not clinical diagnoses or medical treatment. MyCalAgent is not a medical device or healthcare provider. Always consult a licensed healthcare professional for medical decisions.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.mycalagent.com/ai-wellness-insights#article",
      headline: "AI Wellness Intelligence: How MyCalAgent Understands Your Body",
      description: "How AI pattern recognition across meals, hydration, fasting, and habits surfaces personalized wellness insights.",
      url: "https://www.mycalagent.com/ai-wellness-insights",
      publisher: {
        "@type": "Organization",
        name: "MyCalAgent",
        url: "https://www.mycalagent.com",
      },
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
        { "@type": "ListItem", position: 2, name: "AI Wellness Insights", item: "https://www.mycalagent.com/ai-wellness-insights" },
      ],
    },
  ],
};

const pillars = [
  {
    emoji: "🍽️",
    title: "Meal Pattern Recognition",
    body: "AI analyzes what you eat, when you eat, and how often — detecting recurring patterns like skipped meals, late-night eating, or macro imbalances that correlate with how you feel.",
  },
  {
    emoji: "💧",
    title: "Hydration Intelligence",
    body: "Your daily water intake is tracked alongside energy and focus signals. The AI surfaces patterns between hydration habits and how alert, productive, or fatigued you feel.",
  },
  {
    emoji: "⏱️",
    title: "Fasting Window Analysis",
    body: "Intermittent fasting works differently for different people. AI identifies which fasting patterns align best with your natural energy rhythms and meal habits.",
  },
  {
    emoji: "🧠",
    title: "Food & Mood Connections",
    body: "Certain foods, nutrients, and meal timings measurably affect mood, focus, and energy. MyCalAgent connects your meal logs with observable wellness signals over time.",
  },
  {
    emoji: "🔄",
    title: "Behavioral Habit Tracking",
    body: "Recurring behaviors — like caffeine timing, alcohol frequency, or post-meal movement — are tracked and analyzed to reveal which habits support or undermine your wellness goals.",
  },
  {
    emoji: "📈",
    title: "Longitudinal Insights",
    body: "Single-day data is noise. Patterns across weeks reveal signal. MyCalAgent's AI gets smarter and more personalized the longer you use it.",
  },
];

export default function AIWellnessInsightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <Navigation />

        <main className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">AI Wellness Insights</span>
            </nav>

            {/* Hero */}
            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">AI Wellness Intelligence</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                How AI Understands
                <br />
                <span className="gradient-text">How Your Body Responds</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                MyCalAgent doesn&apos;t just log what you eat — it recognizes patterns across meals, hydration, fasting, and habits to surface personalized insights about how your lifestyle affects how you feel.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Most health apps give you numbers. Wellness intelligence gives you understanding. The difference is the ability to connect cause and effect across your personal data — something only AI can do at scale, consistently, and without requiring a nutrition degree.
              </p>
            </div>

            {/* Six pillars */}
            <section className="mb-16" aria-labelledby="pillars-heading">
              <h2 id="pillars-heading" className="text-3xl font-bold mb-8">
                The Six Pillars of Wellness Intelligence
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {pillars.map((p, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <div className="text-2xl mb-3">{p.emoji}</div>
                    <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How it works narrative */}
            <section className="mb-16 p-8 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
              <h2 className="text-2xl font-bold mb-5">How AI Meal Analysis Works</h2>
              <ol className="space-y-4 text-muted-foreground">
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <div><strong className="text-foreground">Snap a photo.</strong> Point your camera at any meal, snack, or drink. No barcodes, no manual searching.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <div><strong className="text-foreground">AI identifies the meal.</strong> Computer vision recognizes every ingredient, estimates portions, and delivers a full nutrition breakdown in seconds.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <div><strong className="text-foreground">Data accumulates.</strong> Over days and weeks, your meal logs, hydration entries, and fasting windows build a rich personal dataset.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  <div><strong className="text-foreground">Patterns emerge.</strong> The AI detects recurring signals — correlations between your food choices, habits, and how you feel — and surfaces them as personalized insights.</div>
                </li>
              </ol>
            </section>

            {/* FAQ */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <QuickFAQ items={faqItems} />
            </section>

            {/* Internal links */}
            <section className="p-8 rounded-3xl border border-border/40 bg-white/50 dark:bg-card/50">
              <h2 className="text-lg font-bold mb-4">Explore More</h2>
              <div className="flex flex-wrap gap-3">
                <Link href="/features" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Features</Link>
                <Link href="/blog" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Blog</Link>
                <Link href="/research" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Research</Link>
                <Link href="/editorial-policy" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Editorial Policy</Link>
                <Link href="/ai-disclaimer" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">AI Disclaimer</Link>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
