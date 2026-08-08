import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Calorie Tracking Fails — And What Works Instead",
  description: "Calorie counting is the most common diet approach — and one of the most abandoned. Explore the real reasons calorie tracking fails and what a wellness-first approach looks like.",
  keywords: ["why calorie tracking fails", "calorie counting problems", "calorie tracking doesn't work", "beyond calorie counting", "wellness approach vs calorie counting"],
  openGraph: {
    title: "Why Calorie Tracking Fails — And What Works Instead",
    description: "The real reasons calorie counting gets abandoned — and how a wellness intelligence approach changes the outcome.",
    url: "https://www.mycalagent.com/why-calorie-tracking-fails",
  },
  alternates: { canonical: "https://www.mycalagent.com/why-calorie-tracking-fails" },
};

const faqItems = [
  {
    question: "Why do most people quit calorie tracking?",
    answer: "Most people quit calorie tracking because it's tedious, inaccurate, and doesn't connect to how they feel. Manually searching databases, estimating portions, and entering every item is time-consuming. When the effort doesn't translate into feeling better, motivation collapses.",
  },
  {
    question: "Is calorie counting accurate?",
    answer: "Calorie counts on food labels are allowed to be up to 20% inaccurate by FDA regulations. Restaurant meals can vary by 100–300+ calories from stated values. Cooking methods, individual metabolic differences, and the thermic effect of different macros all mean the calorie number is an estimate — often a poor one.",
  },
  {
    question: "What is a better alternative to calorie tracking?",
    answer: "A wellness-first approach tracks patterns across multiple lifestyle variables — nutrition, hydration, sleep, fasting, and habits — and connects them to how you feel. Instead of hitting a calorie number, the goal is understanding which behaviors correlate with better energy, mood, and performance.",
  },
  {
    question: "Does MyCalAgent still track calories?",
    answer: "Yes. MyCalAgent tracks calories as part of complete nutrition analysis. But calories are one signal among many — not the only thing that matters. The platform is designed to show you the full picture, not just a calorie counter.",
  },
  {
    question: "Can you lose weight without counting calories?",
    answer: "Yes. Many people successfully manage weight without explicit calorie counting by focusing on food quality, hunger signals, meal timing, and habit patterns. Research shows that calorie quality (nutrient density, satiety, inflammation) often predicts outcomes better than calorie quantity alone.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.mycalagent.com/why-calorie-tracking-fails#article",
      headline: "Why Calorie Tracking Fails — And What a Wellness-First Approach Looks Like",
      url: "https://www.mycalagent.com/why-calorie-tracking-fails",
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
  ],
};

const reasons = [
  {
    n: "1",
    title: "It's too tedious to sustain",
    body: "Manually searching a food database, estimating portions, logging every item, and adjusting for restaurant variations requires significant daily effort. Most people maintain this for 1–3 weeks before the friction wins.",
  },
  {
    n: "2",
    title: "The numbers are less accurate than they appear",
    body: "FDA regulations allow food labels to be up to 20% inaccurate. Restaurant meals frequently deviate by 200–500 calories from stated values. Individual metabolic responses vary. The precision implied by a calorie number is largely false confidence.",
  },
  {
    n: "3",
    title: "Calories don't capture food quality",
    body: "200 calories of almonds and 200 calories of soda have radically different effects on blood sugar, satiety, inflammation, and micronutrient intake. A calorie-only lens misses everything that matters about food quality.",
  },
  {
    n: "4",
    title: "It ignores how food makes you feel",
    body: "A calorie log tells you nothing about how a meal affected your energy, focus, or mood. Without this feedback loop, you're optimizing for a number with no signal about whether the number is making you feel better.",
  },
  {
    n: "5",
    title: "It creates an adversarial relationship with food",
    body: "Framing every meal as a math problem — how many calories can I afford? — can increase food-related anxiety, trigger restrict-binge cycles, and make eating less enjoyable. Long-term wellness requires a sustainable relationship with food.",
  },
  {
    n: "6",
    title: "It doesn't address the full picture",
    body: "Hydration, sleep, fasting patterns, caffeine, and stress all affect metabolism and wellness outcomes. A calorie tracker that ignores these variables will routinely produce confusing results when the other factors change.",
  },
];

export default function WhyCaolrieTrackingFailsPage() {
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
              <span className="text-foreground">Why Calorie Tracking Fails</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Wellness Intelligence</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                Why Calorie Tracking Fails
                <br />
                <span className="gradient-text">And What Works Instead</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-4">
                Calorie counting is the most widely adopted diet strategy — and one of the most abandoned. Here are the real reasons it doesn't stick, and what a wellness-first approach looks like instead.
              </p>
            </div>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Six Reasons Calorie Tracking Fails</h2>
              <div className="space-y-4">
                {reasons.map((r) => (
                  <div key={r.n} className="flex gap-4 p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{r.n}</span>
                    <div>
                      <h3 className="font-bold text-base mb-2">{r.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16 p-8 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
              <h2 className="text-2xl font-bold mb-5">What the Alternative Looks Like</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A wellness intelligence approach still tracks nutrition — but it contextualizes that data within the broader picture of how you live. Meals are logged effortlessly with AI photo analysis. Hydration, fasting, and habits are tracked alongside nutrition. Patterns emerge over time that explain cause and effect.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The goal isn't a calorie number. It's understanding which behaviors support how you want to feel — and making that understanding visible, specific, and actionable.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When tracking is effortless (AI photo logging), when the data tells you something meaningful (wellness patterns), and when the insights connect to how you actually feel — the motivation to keep tracking doesn't have to come from willpower alone.
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
              <p className="font-semibold mb-2">Try the wellness-first approach</p>
              <p className="text-sm text-muted-foreground mb-5">MyCalAgent combines AI logging with wellness pattern intelligence — beyond calorie counting.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">Related</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/wellness-pattern-recognition" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">Wellness Pattern Recognition</Link>
                <Link href="/how-food-affects-energy" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">How Food Affects Energy</Link>
                <Link href="/comparisons/mycalagent-vs-myfitnesspal" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">vs MyFitnessPal</Link>
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
