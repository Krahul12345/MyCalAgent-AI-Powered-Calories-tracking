import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Intermittent Fasting Tracker — MyCalAgent | Smart Fasting Intelligence",
  description: "Plan 16:8, 18:6, and 20:4 fasting schedules with AI-powered insights. MyCalAgent tracks your fasting windows and reveals which patterns align with your energy rhythms.",
  keywords: ["intermittent fasting app", "fasting tracker", "16:8 fasting", "intermittent fasting planner", "fasting window tracker", "AI fasting insights"],
  openGraph: {
    title: "Intermittent Fasting Tracker — MyCalAgent",
    description: "AI-powered fasting planner with smart insights about which fasting windows work best for your body and energy rhythms.",
    url: "https://www.mycalagent.com/features/intermittent-fasting",
  },
  alternates: { canonical: "https://www.mycalagent.com/features/intermittent-fasting" },
};

const faqItems = [
  {
    question: "What intermittent fasting schedules does MyCalAgent support?",
    answer: "MyCalAgent supports all major fasting protocols including 16:8, 18:6, 20:4, OMAD (one meal a day), and 5:2. You can also create a fully custom fasting window that fits your lifestyle.",
  },
  {
    question: "How does MyCalAgent track fasting windows?",
    answer: "You set your eating window and the app tracks time elapsed in real time. A visual timeline shows your fasting progress. Smart reminders can notify you when your eating window opens or closes.",
  },
  {
    question: "Does the AI tell me which fasting schedule is best for me?",
    answer: "Over time, MyCalAgent analyzes your fasting data alongside energy, meal quality, and hydration to surface patterns about which fasting windows align best with your natural rhythms. It's personalized, not prescriptive.",
  },
  {
    question: "Is intermittent fasting safe?",
    answer: "Intermittent fasting is generally safe for healthy adults. It's not appropriate for everyone, including those who are pregnant, have a history of eating disorders, or manage certain medical conditions. Always consult a healthcare professional before starting a fasting protocol.",
  },
  {
    question: "Can I see fasting streaks and history?",
    answer: "Yes. MyCalAgent tracks your fasting streaks, logs each completed fast, and shows a calendar view of your fasting history so you can see consistency over time.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Intermittent Fasting Tracker: How MyCalAgent Optimizes Your Fasting Windows",
      url: "https://www.mycalagent.com/features/intermittent-fasting",
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
        { "@type": "ListItem", position: 3, name: "Intermittent Fasting", item: "https://www.mycalagent.com/features/intermittent-fasting" },
      ],
    },
  ],
};

const protocols = [
  { name: "16:8", eating: "8 hours", fasting: "16 hours", note: "Most popular. Skip breakfast or dinner." },
  { name: "18:6", eating: "6 hours", fasting: "18 hours", note: "More aggressive. 2 meals within a tighter window." },
  { name: "20:4", eating: "4 hours", fasting: "20 hours", note: "One main meal plus a smaller window." },
  { name: "5:2", eating: "5 normal days", fasting: "2 days ~500 kcal", note: "Weekly rhythm with two restricted days." },
  { name: "OMAD", eating: "1 hour", fasting: "23 hours", note: "One meal a day. High discipline required." },
  { name: "Custom", eating: "Your choice", fasting: "Your choice", note: "Set any eating/fasting window that fits your life." },
];

const features = [
  { emoji: "⏱️", title: "Real-time fasting timer", body: "See exactly how long you've been fasting with a live countdown to your eating window." },
  { emoji: "🔔", title: "Smart reminders", body: "Get notified when your eating window opens, closes, or when you're approaching a new personal best." },
  { emoji: "📅", title: "Fasting calendar", body: "A visual calendar showing every fast — completed, broken, and missed — for full accountability." },
  { emoji: "🔥", title: "Streak tracking", body: "Track consecutive fasting days and celebrate milestones that reinforce the habit." },
  { emoji: "📊", title: "AI pattern insights", body: "The AI connects fasting data to meal quality, energy, and hydration to surface personalized patterns." },
  { emoji: "✏️", title: "Flexible logging", body: "Log fasts retroactively or adjust windows on the fly without breaking your streak." },
];

export default function IntermittentFastingPage() {
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
              <span className="text-foreground">Intermittent Fasting</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Feature Deep Dive</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                Intermittent Fasting
                <br />
                <span className="gradient-text">Smart Fasting, Personalized</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Not all fasting schedules work the same for everyone. MyCalAgent plans your fasting windows, tracks your progress, and reveals which patterns align with your energy rhythms — so fasting actually works for you.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/features/intermittent-fasting"
                pageTitle="Intermittent Fasting Tracking in MyCalAgent"
                pageType="feature"
              />
            </div>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Supported Fasting Protocols</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {protocols.map((p, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-emerald-600 mb-2">{p.name}</div>
                    <div className="text-xs text-muted-foreground mb-1">Eating: <span className="text-foreground font-medium">{p.eating}</span></div>
                    <div className="text-xs text-muted-foreground mb-3">Fasting: <span className="text-foreground font-medium">{p.fasting}</span></div>
                    <p className="text-xs text-muted-foreground italic">{p.note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Built-In Fasting Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {features.map((f, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <div className="text-2xl mb-3">{f.emoji}</div>
                    <h3 className="font-bold text-base mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16 p-8 rounded-3xl border border-amber-200/50 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800/30">
              <div className="flex gap-3 mb-3">
                <span className="text-amber-500">⚠️</span>
                <h2 className="font-bold">Medical Disclaimer</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Intermittent fasting is not appropriate for everyone. It is not recommended for children, pregnant or breastfeeding individuals, those with a history of eating disorders, or those managing certain medical conditions. Always consult a licensed healthcare professional before starting any fasting protocol. MyCalAgent is a wellness app and not a medical service.
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
              <p className="font-semibold mb-2">Start your first fast today</p>
              <p className="text-sm text-muted-foreground mb-5">Download MyCalAgent, set your window, and let the AI find your patterns.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">Related</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/features/ai-meal-analysis" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">AI Meal Analysis</Link>
                <Link href="/features/wellness-pattern-recognition" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Wellness Patterns</Link>
                <Link href="/why-calorie-tracking-fails" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Why Calorie Tracking Fails</Link>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
