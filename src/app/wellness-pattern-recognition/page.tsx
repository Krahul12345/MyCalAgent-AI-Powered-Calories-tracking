import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wellness Pattern Recognition — What It Is & How It Works",
  description: "Learn what wellness pattern recognition means, how AI detects behavioral health patterns from lifestyle data, and why patterns matter more than daily numbers.",
  keywords: ["wellness pattern recognition", "AI health patterns", "behavioral wellness tracking", "personalized wellness insights", "AI pattern recognition health"],
  openGraph: {
    title: "Wellness Pattern Recognition — What It Is & How AI Detects Your Health Patterns",
    description: "How AI analyzes lifestyle data over time to surface the patterns that reveal what makes you feel your best.",
    url: "https://www.mycalagent.com/wellness-pattern-recognition",
  },
  alternates: { canonical: "https://www.mycalagent.com/wellness-pattern-recognition" },
};

const faqItems = [
  {
    question: "What is wellness pattern recognition?",
    answer: "Wellness pattern recognition is the use of AI and data analysis to identify recurring correlations across multiple health and lifestyle signals — such as meals, hydration, sleep, fasting, and activity — that reveal how your habits affect your energy, mood, and overall wellbeing.",
  },
  {
    question: "How is wellness pattern recognition different from calorie tracking?",
    answer: "Calorie tracking measures a single variable (intake) against a target. Wellness pattern recognition analyzes multiple variables over time to surface connections between cause and effect — e.g., which meal patterns correlate with energy crashes, or how hydration habits relate to focus quality.",
  },
  {
    question: "What data is needed for wellness pattern recognition?",
    answer: "Meaningful patterns typically emerge from consistent logging of 3–5 key data streams: meals, hydration, sleep, fasting, and activity. The more consistently these are logged over 2–4 weeks, the more precise and actionable the pattern insights become.",
  },
  {
    question: "Can AI detect patterns a person couldn't see themselves?",
    answer: "Yes. Human memory is unreliable for detecting subtle correlations across dozens of variables over weeks of data. AI can analyze the full dataset, identify statistically significant co-occurrences, and surface patterns that would be invisible to self-reflection alone.",
  },
  {
    question: "Is wellness pattern recognition the same as predictive health AI?",
    answer: "They're related but different. Wellness pattern recognition surfaces retrospective patterns — 'here's what's been happening.' Predictive health AI makes forward-looking assessments. MyCalAgent focuses on the former: helping you understand your patterns so you can make better-informed decisions.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.mycalagent.com/wellness-pattern-recognition#article",
      headline: "Wellness Pattern Recognition: What It Is, How It Works, and Why It Matters",
      url: "https://www.mycalagent.com/wellness-pattern-recognition",
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

const examples = [
  {
    trigger: "You consistently eat a high-carb lunch",
    pattern: "Afternoon energy dip appears 60–90 minutes later",
    insight: "Switching to a protein-focused lunch may reduce the crash",
  },
  {
    trigger: "Water intake drops below 1.5L on certain days",
    pattern: "Focus ratings and productivity dip on those same days",
    insight: "Hydration tracking with reminders could address the gap",
  },
  {
    trigger: "Caffeine consumption after 2pm",
    pattern: "Sleep duration shortens by 30–60 minutes those nights",
    insight: "Moving the last coffee to before noon may improve sleep quality",
  },
  {
    trigger: "Skipping breakfast on Monday mornings",
    pattern: "Higher calorie intake at lunch and lower energy midday",
    insight: "A small, protein-rich breakfast may stabilize the weekly start",
  },
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
              <span className="text-foreground">Wellness Pattern Recognition</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Wellness Intelligence</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                Wellness Pattern Recognition
                <br />
                <span className="gradient-text">What It Is & How AI Detects It</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-4">
                Single data points are noise. Patterns across weeks reveal signal. Wellness pattern recognition is the ability of AI to analyze your lifestyle data over time and surface the recurring correlations that explain how you feel.
              </p>
            </div>

            <section className="mb-16 p-8 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
              <h2 className="text-2xl font-bold mb-4">The Core Idea</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your wellness is the product of hundreds of small, recurring decisions — what you eat, when you eat, how much you drink, how you sleep, how you move. On any given day, these variables interact in complex ways that are nearly impossible to interpret in real time.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                But over weeks, patterns emerge. The AI can see what you can't: which combinations of variables consistently precede energy crashes, which habits correlate with better sleep, which meal patterns support your focus. That's wellness pattern recognition.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Real-World Pattern Examples</h2>
              <div className="space-y-4">
                {examples.map((ex, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Trigger</p>
                        <p className="text-foreground">{ex.trigger}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Pattern Detected</p>
                        <p className="text-foreground">{ex.pattern}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">Insight</p>
                        <p className="text-muted-foreground">{ex.insight}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-5">How the AI Detects Patterns</h2>
              <ol className="space-y-4 text-muted-foreground">
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <div><strong className="text-foreground">Data collection.</strong> Meals, hydration, fasting windows, and habits are logged consistently over time — building a rich personal dataset.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <div><strong className="text-foreground">Feature extraction.</strong> The AI identifies variables in the data — meal composition, timing, hydration levels, fasting duration, caffeine intake.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <div><strong className="text-foreground">Correlation analysis.</strong> The AI tests relationships between variables — looking for statistically significant co-occurrences across the full dataset.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  <div><strong className="text-foreground">Pattern surfacing.</strong> Significant patterns are translated into plain-language insights and shown in the wellness dashboard.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                  <div><strong className="text-foreground">Refinement over time.</strong> As more data accumulates, patterns become more precise and personalized.</div>
                </li>
              </ol>
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
              <p className="text-sm text-muted-foreground mb-5">Log consistently for 2 weeks and let the AI reveal what your data says.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">Related</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/features/wellness-pattern-recognition" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">Wellness Patterns Feature</Link>
                <Link href="/ai-wellness-insights" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">AI Wellness Insights</Link>
                <Link href="/why-calorie-tracking-fails" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Why Calorie Tracking Fails</Link>
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
