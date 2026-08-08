import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MyCalAgent vs Noom — AI Wellness vs Behavioral Coaching App",
  description: "Compare MyCalAgent and Noom across AI meal analysis, wellness insights, behavioral coaching, and pricing. Which app better connects your habits to how you feel?",
  keywords: ["MyCalAgent vs Noom", "Noom alternative", "Noom competitor", "AI wellness app vs Noom", "best wellness tracking app"],
  openGraph: {
    title: "MyCalAgent vs Noom — AI Wellness Intelligence vs Behavioral Coaching",
    description: "Side-by-side comparison of MyCalAgent and Noom across features, approach, and value.",
    url: "https://www.mycalagent.com/comparisons/mycalagent-vs-noom",
  },
  alternates: { canonical: "https://www.mycalagent.com/comparisons/mycalagent-vs-noom" },
};

const faqItems = [
  {
    question: "How is MyCalAgent different from Noom?",
    answer: "Noom uses a behavioral coaching model with daily lessons, color-coded food categorization, and human coaches. MyCalAgent uses AI to analyze meal photos and surface wellness patterns — connecting your food habits to energy, mood, and hydration insights without a coaching program structure.",
  },
  {
    question: "Is MyCalAgent cheaper than Noom?",
    answer: "Noom typically costs $70–$209/month depending on plan and promotional pricing. MyCalAgent offers competitive premium pricing at a significantly lower price point with no coaching fees bundled in.",
  },
  {
    question: "Does MyCalAgent offer coaching like Noom?",
    answer: "MyCalAgent does not currently offer human coaching. It provides AI-powered wellness intelligence — automated pattern insights and recommendations rather than scheduled coaching sessions.",
  },
  {
    question: "Which app is better for long-term habit tracking?",
    answer: "Both apps support long-term habit formation, but through different mechanisms. Noom uses educational content and behavioral psychology techniques. MyCalAgent uses AI pattern recognition to make your own data tell you what's working — showing you your patterns rather than teaching you general principles.",
  },
];

const comparison = [
  { feature: "Core approach", mca: "AI wellness pattern intelligence", noom: "Behavioral coaching & psychology" },
  { feature: "Meal logging", mca: "✅ AI photo analysis", noom: "Manual database search" },
  { feature: "Calorie color-coding", mca: "❌ Not applicable", noom: "✅ Green/Yellow/Red system" },
  { feature: "Human coaching", mca: "❌ AI-driven only", noom: "✅ Yes (premium plans)" },
  { feature: "Daily lessons", mca: "❌ Not available", noom: "✅ Behavioral curriculum" },
  { feature: "Wellness pattern insights", mca: "✅ AI-powered", noom: "⚠️ General, not personalized" },
  { feature: "Food & mood tracking", mca: "✅ Yes", noom: "⚠️ Limited" },
  { feature: "Hydration tracking", mca: "✅ Full beverage intelligence", noom: "⚠️ Basic" },
  { feature: "Fasting tracker", mca: "✅ Full fasting planner", noom: "❌ Not available" },
  { feature: "Apple Health", mca: "✅ Full integration", noom: "⚠️ Limited" },
  { feature: "Allergen detection", mca: "✅ Yes", noom: "❌ No" },
  { feature: "Pricing", mca: "Lower monthly cost", noom: "Higher (coaching included)" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "MyCalAgent vs Noom: Full Comparison of AI Wellness vs Behavioral Coaching",
      url: "https://www.mycalagent.com/comparisons/mycalagent-vs-noom",
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

export default function VsNoomPage() {
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
              <span className="text-foreground">MyCalAgent vs Noom</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">App Comparison</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                MyCalAgent vs Noom
                <br />
                <span className="gradient-text">AI Intelligence vs Behavioral Coaching</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Noom built its reputation on behavioral psychology and human coaching. MyCalAgent uses AI to surface your personal wellness patterns from the data you already generate. Different philosophies. Different use cases.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/comparisons/mycalagent-vs-noom"
                pageTitle="MyCalAgent vs Noom"
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
                      <th className="text-center p-4 font-semibold text-muted-foreground">Noom</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr key={i} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-white/40 dark:bg-card/40" : ""}`}>
                        <td className="p-4 text-muted-foreground">{row.feature}</td>
                        <td className="p-4 text-center">{row.mca}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.noom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic">Comparison based on publicly available app information. Subject to change as apps update.</p>
            </section>

            <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
                <h2 className="font-bold mb-3">Choose MyCalAgent if you want…</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> AI-powered meal photo logging</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Personal pattern insights from your own data</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Full hydration + fasting + nutrition in one place</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Lower monthly cost</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Less structured, more self-directed experience</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                <h2 className="font-bold mb-3">Noom may be better if you…</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> Benefit from structured daily lessons and accountability</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> Want human coaching and group support</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> Prefer a prescribed behavioral curriculum</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> Are comfortable with higher monthly pricing</li>
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
              <p className="font-semibold mb-2">See what AI wellness intelligence feels like</p>
              <p className="text-sm text-muted-foreground mb-5">Try MyCalAgent free — no coaching fees, no curriculum.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">More comparisons</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/comparisons/mycalagent-vs-myfitnesspal" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">vs MyFitnessPal</Link>
                <Link href="/comparisons/mycalagent-vs-lose-it" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">vs Lose It</Link>
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
