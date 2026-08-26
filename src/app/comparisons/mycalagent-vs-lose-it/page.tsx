import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MyCalAgent vs Lose It — AI Wellness App Comparison",
  description: "Compare MyCalAgent and Lose It across AI meal analysis, wellness pattern tracking, hydration intelligence, and pricing. Which app fits your wellness goals?",
  keywords: ["MyCalAgent vs Lose It", "Lose It alternative", "Lose It competitor", "AI wellness app comparison", "best nutrition tracking app"],
  openGraph: {
    title: "MyCalAgent vs Lose It — AI Wellness Intelligence vs Calorie Tracker",
    description: "Feature-by-feature comparison of MyCalAgent and Lose It for meal tracking, wellness insights, and daily habit intelligence.",
    url: "https://www.mycalagent.com/comparisons/mycalagent-vs-lose-it",
  },
  alternates: { canonical: "https://www.mycalagent.com/comparisons/mycalagent-vs-lose-it" },
};

const faqItems = [
  {
    question: "How is MyCalAgent different from Lose It?",
    answer: "Lose It is a well-designed calorie-counting app with a clean interface and barcode scanning. MyCalAgent shifts the focus from counting calories to understanding wellness patterns — using AI photo analysis for logging and surfacing insights about how your meals, hydration, and fasting affect your energy and mood.",
  },
  {
    question: "Does MyCalAgent have photo meal logging like Lose It?",
    answer: "Yes — and it's more advanced. Lose It's Snap It feature identifies foods from photos. MyCalAgent's AI photo analysis also estimates portions, calculates full nutrition including 11 micronutrients, and feeds the data into wellness pattern recognition.",
  },
  {
    question: "Is Lose It better for weight loss than MyCalAgent?",
    answer: "Lose It is purpose-built for weight loss through calorie deficit management. MyCalAgent supports weight management as part of a broader wellness intelligence approach — understanding how habits, energy, hydration, and mood connect to long-term health rather than just tracking intake vs. output.",
  },
  {
    question: "Which app has better hydration tracking?",
    answer: "MyCalAgent offers more comprehensive beverage tracking — water counts toward your hydration goal, while coffee, tea, juice, and alcohol are logged separately for calorie and habit context. Lose It's hydration tracking is more basic.",
  },
];

const comparison = [
  { feature: "Meal logging method", mca: "AI photo analysis (primary)", li: "Manual search + Snap It photo" },
  { feature: "AI photo recognition depth", mca: "✅ Full nutrition + micronutrients", li: "⚠️ Basic food ID only" },
  { feature: "Wellness pattern insights", mca: "✅ AI-powered patterns", li: "❌ Not available" },
  { feature: "Food & mood tracking", mca: "✅ Yes", li: "❌ No" },
  { feature: "Hydration tracking", mca: "✅ Full beverage + caffeine analysis", li: "⚠️ Water only" },
  { feature: "Caffeine tracking", mca: "✅ Yes, with timing patterns", li: "❌ No" },
  { feature: "Fasting tracker", mca: "✅ Full fasting planner + insights", li: "❌ Not available" },
  { feature: "Allergen detection", mca: "✅ Yes", li: "❌ No" },
  { feature: "Apple Health integration", mca: "✅ Full read/write", li: "✅ Yes" },
  { feature: "Barcode scanning", mca: "✅ Yes", li: "✅ Yes" },
  { feature: "Exercise tracking", mca: "Via Apple Health", li: "✅ Built-in" },
  { feature: "Budgeting calories", mca: "Goal-based tracking", li: "✅ Core feature" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "MyCalAgent vs Lose It: Full Feature Comparison",
      url: "https://www.mycalagent.com/comparisons/mycalagent-vs-lose-it",
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

export default function VsLoseItPage() {
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
              <span className="text-foreground">MyCalAgent vs Lose It</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">App Comparison</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                MyCalAgent vs Lose It
                <br />
                <span className="gradient-text">Wellness Intelligence vs Calorie Budgeting</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Lose It focuses on calorie budgeting and weight loss goals. MyCalAgent is built to surface how your diet habits connect to how you feel — energy, mood, hydration, and beyond.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/comparisons/mycalagent-vs-lose-it"
                pageTitle="MyCalAgent vs Lose It"
                pageType="comparison"
              />
            </div>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Feature Comparison</h2>
              <div className="overflow-x-auto rounded-2xl border border-border/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/40 bg-muted/30">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold text-emerald-600">MyCalAgent</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">Lose It</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr key={i} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-white/40 dark:bg-card/40" : ""}`}>
                        <td className="p-4 text-muted-foreground">{row.feature}</td>
                        <td className="p-4 text-center">{row.mca}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.li}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic">Comparison based on publicly available information. Subject to change as apps update.</p>
            </section>

            <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
                <h2 className="font-bold mb-3">Choose MyCalAgent if you want…</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Deeper AI photo nutrition analysis</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Wellness pattern insights beyond calories</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Hydration + caffeine pattern tracking</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Fasting planning with AI insights</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Food & mood connection tracking</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                <h2 className="font-bold mb-3">Lose It may suit you better if…</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> You want built-in exercise tracking</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> Calorie budgeting is your primary focus</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> You prefer a simpler, more focused interface</li>
                </ul>
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
              <p className="font-semibold mb-2">Ready to try a smarter approach?</p>
              <p className="text-sm text-muted-foreground mb-5">Start with MyCalAgent free and experience AI wellness intelligence.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">More comparisons</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/comparisons/mycalagent-vs-myfitnesspal" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">vs MyFitnessPal</Link>
                <Link href="/comparisons/mycalagent-vs-noom" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">vs Noom</Link>
                <Link href="/comparisons/mycalagent-vs-cronometer" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">vs Cronometer</Link>
              </div>
            </section>

          </div>

          {/* Trademark disclaimer */}
          <p className="text-xs text-muted-foreground text-center mt-10 px-4 leading-relaxed max-w-2xl mx-auto">
            Third-party names and logos are trademarks of their respective owners. MyCalAgent is not affiliated with or endorsed by these companies.
          </p>
        </main>

        <Footer />
      </div>
    </>
  );
}
