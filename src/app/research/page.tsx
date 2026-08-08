import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research — MyCalAgent | Wellness Intelligence Methodology",
  description: "The science behind MyCalAgent's AI wellness intelligence: our methodology for meal analysis, wellness pattern recognition, food & mood tracking, and hydration insights.",
  keywords: ["wellness intelligence research", "AI meal analysis methodology", "food and mood science", "hydration research", "wellness pattern recognition"],
  openGraph: {
    title: "Research — MyCalAgent | Wellness Intelligence Methodology",
    description: "The science behind MyCalAgent's AI wellness intelligence methodology — meal analysis, pattern recognition, food & mood, and hydration insights.",
    url: "https://www.mycalagent.com/research",
  },
  alternates: { canonical: "https://www.mycalagent.com/research" },
};

const researchAreas = [
  {
    emoji: "📸",
    title: "AI Meal Photo Analysis",
    summary: "Computer vision models identify foods from photos by recognizing visual patterns in color, texture, shape, and context. Portion estimation uses depth inference and reference objects within the frame. Nutritional values are derived from recognized ingredients mapped to established food composition databases.",
    note: "Accuracy varies based on image quality, food presentation, and cuisine type. Estimates are approximations, not precise measurements.",
  },
  {
    emoji: "🧠",
    title: "Wellness Pattern Recognition",
    summary: "Pattern recognition in wellness data uses time-series analysis to detect recurring signals across meal logs, hydration entries, fasting windows, and habit tracking. Statistical correlations identify which inputs associate with observable output patterns — such as energy, focus, or mood — over weeks of consistent logging.",
    note: "Correlation does not imply causation. Patterns are probabilistic insights, not clinical diagnoses.",
  },
  {
    emoji: "💡",
    title: "Food & Mood Research",
    summary: "The relationship between diet and mental/physical state is supported by research in nutritional psychiatry and cognitive neuroscience. Key mechanisms include: blood glucose fluctuations affecting energy and mood, gut-brain axis signaling, neurotransmitter precursor availability from dietary amino acids, and inflammatory responses to certain dietary patterns.",
    note: "Individual responses to food vary significantly. MyCalAgent's insights are personalized to your data, not clinical prescriptions.",
  },
  {
    emoji: "💧",
    title: "Hydration Science",
    summary: "Research consistently shows that mild dehydration (1–2% of body weight) impairs cognitive performance, reduces short-term memory, increases perceived effort, and elevates fatigue. MyCalAgent tracks daily fluid intake and surfaces patterns between hydration levels and user-reported or inferred energy signals.",
    note: "Optimal hydration needs vary by individual, climate, activity level, and health status.",
  },
  {
    emoji: "⏱️",
    title: "Intermittent Fasting Patterns",
    summary: "Research on intermittent fasting (IF) indicates potential benefits for metabolic health, insulin sensitivity, and cognitive clarity for some individuals. Common IF protocols — 16:8, 5:2, and time-restricted eating — show varying outcomes across different populations. MyCalAgent tracks fasting windows and correlates them with logged energy and nutrition patterns.",
    note: "IF is not appropriate for all individuals. Consult a healthcare professional before starting a fasting protocol.",
  },
];

export default function ResearchPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">

          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Research</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Methodology & Science</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
              The Science Behind
              <br />
              <span className="gradient-text">AI Wellness Intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              MyCalAgent&apos;s AI is grounded in established research across nutritional science, behavioral health, cognitive performance, and machine learning. Here&apos;s how our methodology works — and where its limits are.
            </p>
          </div>

          {/* Research areas */}
          <div className="space-y-6 mb-16">
            {researchAreas.map((area, i) => (
              <section key={i} className="p-8 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{area.emoji}</span>
                  <div>
                    <h2 className="text-xl font-bold mb-3">{area.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">{area.summary}</p>
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">⚠️ {area.note}</p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Data privacy in research */}
          <section className="mb-12 p-8 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
            <h2 className="text-2xl font-bold mb-4">Data Privacy in Our Research</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              MyCalAgent is privacy-first by design. We do not sell user data or use personal wellness data to train public AI models without explicit consent.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Any internal model improvement is done with anonymized, aggregated signals — never with identifiable personal data. Users retain full control over their data and can request deletion at any time.
            </p>
          </section>

          {/* Internal links */}
          <section className="p-8 rounded-3xl border border-border/40 bg-white/50 dark:bg-card/50">
            <h2 className="text-lg font-bold mb-4">Related Pages</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/ai-wellness-insights" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">AI Wellness Insights</Link>
              <Link href="/editorial-policy" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Editorial Policy</Link>
              <Link href="/ai-disclaimer" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">AI Disclaimer</Link>
              <Link href="/blog" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Blog</Link>
              <Link href="/privacy" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Privacy Policy</Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
