import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MyCalAgent vs MyFitnessPal — Which AI Wellness App Is Better?",
  description: "Compare MyCalAgent and MyFitnessPal across AI features, meal logging, wellness intelligence, and pricing. See which app goes beyond calorie counting.",
  keywords: ["MyCalAgent vs MyFitnessPal", "MyFitnessPal alternative", "best calorie tracking app", "AI wellness app comparison", "MyFitnessPal competitor"],
  openGraph: {
    title: "MyCalAgent vs MyFitnessPal — Which Is Better for Wellness Intelligence?",
    description: "Side-by-side comparison of MyCalAgent and MyFitnessPal across AI features, wellness insights, meal logging, and pricing.",
    url: "https://www.mycalagent.com/comparisons/mycalagent-vs-myfitnesspal",
  },
  alternates: { canonical: "https://www.mycalagent.com/comparisons/mycalagent-vs-myfitnesspal" },
};

const faqItems = [
  {
    question: "Is MyCalAgent better than MyFitnessPal?",
    answer: "MyCalAgent and MyFitnessPal serve different use cases. MyFitnessPal excels at database-driven calorie counting and has a large food database. MyCalAgent focuses on AI-powered meal photo analysis and wellness pattern intelligence — connecting your food habits to how you actually feel, not just hitting a calorie number.",
  },
  {
    question: "Does MyCalAgent have a food database like MyFitnessPal?",
    answer: "MyCalAgent's primary logging method is AI photo analysis rather than manual database search. It can also use packaged product cues and manual search. MyFitnessPal's database is larger, but MyCalAgent's AI removes the need to search in most cases.",
  },
  {
    question: "Which app is better for wellness insights?",
    answer: "MyCalAgent provides wellness pattern intelligence that MyFitnessPal does not — connecting meals, hydration, fasting, and habits to surface insights about how your diet affects your energy and mood. MyFitnessPal focuses primarily on nutrition tracking without this behavioral layer.",
  },
  {
    question: "How does pricing compare?",
    answer: "Both apps offer free tiers with premium upgrades. MyFitnessPal Premium costs $19.99/month or $79.99/year. MyCalAgent offers competitive premium pricing with a focus on AI wellness features rather than ad removal and advanced macro targets.",
  },
];

const comparison = [
  { feature: "Meal logging method", mca: "AI photo analysis (primary)", mfp: "Manual database search (primary)" },
  { feature: "Photo recognition", mca: "✅ Built-in AI computer vision", mfp: "⚠️ Limited (barcode scan only)" },
  { feature: "Nutrition analysis speed", mca: "✅ Under 6 seconds from photo", mfp: "⚠️ Manual search required" },
  { feature: "Wellness pattern insights", mca: "✅ AI-powered pattern recognition", mfp: "❌ Not available" },
  { feature: "Food & mood tracking", mca: "✅ Yes", mfp: "❌ No" },
  { feature: "Hydration tracking", mca: "✅ Water + all beverage types", mfp: "⚠️ Water only" },
  { feature: "Caffeine tracking", mca: "✅ Yes, with timing analysis", mfp: "⚠️ Basic only" },
  { feature: "Fasting tracker", mca: "✅ Full fasting planner with AI insights", mfp: "⚠️ Premium only, basic" },
  { feature: "Apple Health integration", mca: "✅ Full read/write", mfp: "✅ Yes" },
  { feature: "Allergen detection", mca: "✅ Yes", mfp: "❌ No" },
  { feature: "Barcode scanning", mca: "✅ Yes", mfp: "✅ Yes" },
  { feature: "Food database size", mca: "Growing AI-powered database", mfp: "✅ Very large (14M+ items)" },
  { feature: "AI wellness insights", mca: "✅ Core feature", mfp: "❌ Not available" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "MyCalAgent vs MyFitnessPal: Full Feature Comparison",
      url: "https://www.mycalagent.com/comparisons/mycalagent-vs-myfitnesspal",
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
        { "@type": "ListItem", position: 2, name: "Comparisons", item: "https://www.mycalagent.com/comparisons" },
        { "@type": "ListItem", position: 3, name: "MyCalAgent vs MyFitnessPal", item: "https://www.mycalagent.com/comparisons/mycalagent-vs-myfitnesspal" },
      ],
    },
  ],
};

export default function VsMyFitnessPalPage() {
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
              <span className="text-foreground">MyCalAgent vs MyFitnessPal</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">App Comparison</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                MyCalAgent vs MyFitnessPal
                <br />
                <span className="gradient-text">Beyond Calorie Counting</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                MyFitnessPal is the most-used calorie tracker in the world. MyCalAgent is built for what comes after calorie counting — understanding how your diet actually affects how you feel.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/comparisons/mycalagent-vs-myfitnesspal"
                pageTitle="MyCalAgent vs MyFitnessPal"
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
                      <th className="text-center p-4 font-semibold text-muted-foreground">MyFitnessPal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr key={i} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-white/40 dark:bg-card/40" : ""}`}>
                        <td className="p-4 text-muted-foreground">{row.feature}</td>
                        <td className="p-4 text-center">{row.mca}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.mfp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic">Comparison based on publicly available app information. Subject to change as apps update.</p>
            </section>

            <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
                <h2 className="font-bold mb-3">Choose MyCalAgent if you want to…</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Log meals with a photo, not manual search</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Understand how food affects your energy and mood</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Track hydration, caffeine, and fasting together</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Get AI-powered wellness pattern insights</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Detect allergens automatically in meals</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                <h2 className="font-bold mb-3">MyFitnessPal may be better if you…</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> Rely heavily on a very large food database</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> Already have years of data logged in MFP</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> Primarily need basic calorie counting</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">•</span> Want social features and a large community</li>
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
              <p className="font-semibold mb-2">Ready to go beyond calorie counting?</p>
              <p className="text-sm text-muted-foreground mb-5">Try MyCalAgent free and see what wellness intelligence feels like.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">More comparisons</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/comparisons/mycalagent-vs-noom" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">vs Noom</Link>
                <Link href="/comparisons/mycalagent-vs-lose-it" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">vs Lose It</Link>
                <Link href="/comparisons/mycalagent-vs-cronometer" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">vs Cronometer</Link>
                <Link href="/why-calorie-tracking-fails" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Why Calorie Tracking Fails</Link>
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
