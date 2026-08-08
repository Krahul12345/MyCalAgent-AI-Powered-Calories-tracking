import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MyCalAgent vs Cronometer — AI Wellness vs Micronutrient Precision Tracking",
  description: "Compare MyCalAgent and Cronometer across AI meal analysis, micronutrient tracking, wellness pattern recognition, and approach. Which app fits how you want to track?",
  keywords: ["MyCalAgent vs Cronometer", "Cronometer alternative", "Cronometer competitor", "AI wellness app vs Cronometer", "micronutrient tracking app comparison"],
  openGraph: {
    title: "MyCalAgent vs Cronometer — AI Wellness vs Micronutrient Precision",
    description: "Feature-by-feature comparison of MyCalAgent and Cronometer for nutrition tracking, wellness insights, and user experience.",
    url: "https://www.mycalagent.com/comparisons/mycalagent-vs-cronometer",
  },
  alternates: { canonical: "https://www.mycalagent.com/comparisons/mycalagent-vs-cronometer" },
};

const faqItems = [
  {
    question: "How is MyCalAgent different from Cronometer?",
    answer: "Cronometer is renowned for precise micronutrient tracking using verified food data from scientific databases. MyCalAgent uses AI photo analysis for effortless logging and focuses on wellness pattern intelligence — connecting nutrition to energy, mood, and habits. Cronometer is for precision; MyCalAgent is for understanding.",
  },
  {
    question: "Does MyCalAgent track micronutrients like Cronometer?",
    answer: "Yes. MyCalAgent tracks 11 micronutrients including sodium, calcium, iron, potassium, and vitamins A, C, and D on every meal analysis. Cronometer tracks a significantly broader range of micronutrients with higher database precision — it's the gold standard for micronutrient detail.",
  },
  {
    question: "Which app is better for someone focused on nutrient sufficiency?",
    answer: "Cronometer is better suited for users who want to audit specific micronutrient intake with high precision. MyCalAgent is better for users who want to connect their overall diet and lifestyle habits to how they feel — a wellness-first approach rather than a precision-nutrition approach.",
  },
  {
    question: "Is MyCalAgent easier to use than Cronometer?",
    answer: "Generally yes. MyCalAgent's AI photo logging removes the need for manual database entry in most cases, making logging faster and requiring less nutritional knowledge. Cronometer's interface is optimized for precision users who want granular control over their data.",
  },
];

const comparison = [
  { feature: "Logging method", mca: "AI photo analysis (primary)", cron: "Manual database search (primary)" },
  { feature: "AI photo recognition", mca: "✅ Built-in computer vision", cron: "❌ Not available" },
  { feature: "Micronutrient breadth", mca: "11 core micronutrients", cron: "✅ 80+ micronutrients tracked" },
  { feature: "Data source precision", mca: "AI-estimated + database", cron: "✅ USDA, NCCDB verified data" },
  { feature: "Wellness pattern insights", mca: "✅ AI-powered patterns", cron: "❌ Not available" },
  { feature: "Food & mood tracking", mca: "✅ Yes", cron: "❌ No" },
  { feature: "Hydration + caffeine tracking", mca: "✅ Full beverage intelligence", cron: "⚠️ Basic water only" },
  { feature: "Fasting tracker", mca: "✅ Full planner + AI insights", cron: "✅ Yes (Gold plan)" },
  { feature: "Allergen detection", mca: "✅ Yes", cron: "❌ No" },
  { feature: "Apple Health integration", mca: "✅ Full read/write", cron: "✅ Yes" },
  { feature: "Ease of logging", mca: "✅ Photo = fastest method", cron: "Manual precision required" },
  { feature: "Target user", mca: "Wellness-focused, AI-first", cron: "Precision nutrition users" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "MyCalAgent vs Cronometer: AI Wellness Intelligence vs Micronutrient Precision",
      url: "https://www.mycalagent.com/comparisons/mycalagent-vs-cronometer",
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

export default function VsCronometerPage() {
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
              <span className="text-foreground">MyCalAgent vs Cronometer</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">App Comparison</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                MyCalAgent vs Cronometer
                <br />
                <span className="gradient-text">Wellness Intelligence vs Precision Nutrition</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Cronometer is the gold standard for micronutrient precision. MyCalAgent is built for people who want to understand how their diet affects how they feel — with AI photo logging and wellness pattern recognition at its core.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/comparisons/mycalagent-vs-cronometer"
                pageTitle="MyCalAgent vs Cronometer"
                pageType="comparison"
              />
            </div>

            <section className="mb-16 p-8 rounded-3xl border border-border/40 bg-white/50 dark:bg-card/50">
              <h2 className="text-xl font-bold mb-4">Two Different Philosophies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-semibold text-emerald-600 mb-2">MyCalAgent's approach</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Make logging effortless via AI photo analysis. Accumulate data over time. Surface patterns connecting your diet, hydration, fasting, and habits to your energy and mood. Focus on wellness outcomes, not just intake numbers.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Cronometer's approach</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Log every food item manually with high precision using verified databases. Audit specific micronutrients in granular detail. Ideal for clinical nutrition protocols, therapeutic diets, or users who want absolute data accuracy.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Feature Comparison</h2>
              <div className="overflow-x-auto rounded-2xl border border-border/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/40 bg-muted/30">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold text-emerald-600">MyCalAgent</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">Cronometer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr key={i} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-white/40 dark:bg-card/40" : ""}`}>
                        <td className="p-4 text-muted-foreground">{row.feature}</td>
                        <td className="p-4 text-center">{row.mca}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.cron}</td>
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
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> AI photo logging (no manual entry)</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Wellness pattern insights and food-mood tracking</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Hydration + caffeine + fasting in one app</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> A faster, less manual logging experience</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                <h2 className="font-bold mb-3">Cronometer may be better if…</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> You need 80+ micronutrients tracked with precision</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> You follow a specific therapeutic or clinical diet</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> Absolute data accuracy matters more than ease</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> You're working with a registered dietitian</li>
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
              <p className="font-semibold mb-2">Try the AI-first approach to wellness</p>
              <p className="text-sm text-muted-foreground mb-5">Log meals with a photo and let the AI surface your patterns.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">More comparisons</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/comparisons/mycalagent-vs-myfitnesspal" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">vs MyFitnessPal</Link>
                <Link href="/comparisons/mycalagent-vs-noom" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">vs Noom</Link>
                <Link href="/comparisons/mycalagent-vs-lose-it" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">vs Lose It</Link>
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
