import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Food & Mood Tracking — MyCalAgent | How Your Diet Affects How You Feel",
  description: "Discover how MyCalAgent connects your meals to your energy, focus, and mood using AI pattern recognition — so you can eat in a way that makes you feel better.",
  keywords: ["food and mood tracking", "diet and mood connection", "food and energy levels", "how food affects mood", "AI food mood app", "meal mood tracker"],
  openGraph: {
    title: "Food & Mood Tracking — MyCalAgent",
    description: "AI pattern recognition that connects your meals to your energy and mood — revealing which foods help you feel your best.",
    url: "https://www.mycalagent.com/features/food-and-mood",
  },
  alternates: { canonical: "https://www.mycalagent.com/features/food-and-mood" },
};

const faqItems = [
  {
    question: "Can food really affect your mood?",
    answer: "Yes. Food directly influences neurotransmitter production, blood sugar regulation, and inflammation — all of which affect mood, energy, and cognitive function. Nutrients like tryptophan, omega-3s, B vitamins, and magnesium play measurable roles in how you feel.",
  },
  {
    question: "What is food and mood tracking?",
    answer: "Food and mood tracking is the practice of logging meals alongside how you feel — including energy levels, focus, and emotional state. Over time, patterns emerge showing which foods, meal timings, and dietary habits correlate with better or worse wellbeing.",
  },
  {
    question: "How does MyCalAgent connect food to mood?",
    answer: "MyCalAgent logs your meals with AI and tracks wellness signals over time. Its pattern recognition identifies recurring correlations — like which meals precede energy dips, focus peaks, or mood shifts — and surfaces them as personalized insights.",
  },
  {
    question: "Which foods are most likely to affect energy?",
    answer: "High-glycemic foods cause rapid blood sugar spikes followed by crashes. Protein and healthy fats support more stable energy. Meal timing and size also matter — large meals often cause post-meal fatigue regardless of composition.",
  },
  {
    question: "Is this feature available on MyCalAgent?",
    answer: "Yes. MyCalAgent's wellness dashboard includes food & mood pattern tracking as part of its AI wellness intelligence suite, available with a premium subscription.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Food & Mood Tracking: How MyCalAgent Reveals the Connection Between Your Diet and How You Feel",
      url: "https://www.mycalagent.com/features/food-and-mood",
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
        { "@type": "ListItem", position: 3, name: "Food & Mood", item: "https://www.mycalagent.com/features/food-and-mood" },
      ],
    },
  ],
};

const connections = [
  { emoji: "⚡", title: "Energy After Meals", body: "Track how different meals and meal timings affect your energy levels throughout the day. Spot patterns like post-lunch crashes or late-evening fatigue." },
  { emoji: "🧠", title: "Focus & Cognition", body: "Certain nutrients — omega-3s, B vitamins, iron — support cognitive function. The AI identifies which meal patterns correlate with sharper focus." },
  { emoji: "😌", title: "Mood Signals", body: "Blood sugar stability, gut health, and nutrient balance all affect mood. MyCalAgent surfaces patterns between your food choices and how you feel." },
  { emoji: "🌙", title: "Sleep Quality Clues", body: "Late-night eating, caffeine timing, and alcohol intake all impact sleep quality. Wellness patterns connect what you eat to how you rest." },
  { emoji: "💪", title: "Physical Performance", body: "Pre- and post-workout nutrition, hydration, and meal timing affect how your body performs and recovers." },
  { emoji: "📆", title: "Weekly Rhythm Patterns", body: "Week-on-week data reveals larger rhythms — which days you eat well, which habits drift, and how those patterns connect to how you feel." },
];

export default function FoodAndMoodPage() {
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
              <span className="text-foreground">Food & Mood</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Feature Deep Dive</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                Food & Mood Tracking
                <br />
                <span className="gradient-text">See What Your Meals Do to You</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-4">
                The connection between food and how you feel isn't abstract — it's biochemical. MyCalAgent's AI surfaces the patterns between what you eat and your energy, focus, and mood.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Most nutrition apps tell you what you ate. Food & mood tracking tells you how it affected you — so you can make smarter choices going forward.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/features/food-and-mood"
                pageTitle="Food and Mood Tracking in MyCalAgent"
                pageType="feature"
              />
            </div>

            <section className="mb-16 p-8 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
              <h2 className="text-2xl font-bold mb-4">The Science Behind the Connection</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Food affects mood through several biological pathways. Tryptophan (found in turkey, eggs, and nuts) is a precursor to serotonin. Omega-3 fatty acids reduce inflammation linked to depression. Blood sugar spikes from high-glycemic foods cause energy crashes that impair focus and mood.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The gut-brain axis means your digestive health directly signals your emotional state. MyCalAgent tracks the data. The AI finds the patterns. You get actionable insight.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8">What Gets Tracked & Connected</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {connections.map((c, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <div className="text-2xl mb-3">{c.emoji}</div>
                    <h3 className="font-bold text-base mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
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
              <p className="font-semibold mb-2">Start connecting food to how you feel</p>
              <p className="text-sm text-muted-foreground mb-5">Download MyCalAgent and let the patterns build.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">Related reading</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/how-food-affects-energy" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">How Food Affects Energy</Link>
                <Link href="/features/ai-meal-analysis" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">AI Meal Analysis</Link>
                <Link href="/features/wellness-pattern-recognition" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Wellness Patterns</Link>
                <Link href="/ai-wellness-insights" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">AI Wellness Insights</Link>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
