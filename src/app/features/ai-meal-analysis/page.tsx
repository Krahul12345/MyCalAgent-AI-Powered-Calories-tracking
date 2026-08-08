import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Meal Analysis — MyCalAgent | Photo-Based Nutrition in Seconds",
  description: "Learn how MyCalAgent's AI meal analysis uses computer vision to identify foods, estimate portions, and deliver full nutrition breakdowns from a single photo.",
  keywords: ["AI meal analysis", "photo meal logging", "AI calorie tracker", "food photo recognition", "AI nutrition app", "automatic meal tracking"],
  openGraph: {
    title: "AI Meal Analysis — MyCalAgent | Photo-Based Nutrition in Seconds",
    description: "MyCalAgent's AI analyzes any meal photo to identify ingredients, estimate portions, and calculate full nutrition facts instantly.",
    url: "https://www.mycalagent.com/features/ai-meal-analysis",
  },
  alternates: { canonical: "https://www.mycalagent.com/features/ai-meal-analysis" },
};

const faqItems = [
  {
    question: "How does AI meal analysis work?",
    answer: "MyCalAgent uses computer vision to analyze a photo of your meal. The AI identifies each ingredient, estimates portion sizes based on visual cues and reference objects, and calculates a full nutrition breakdown — calories, macros, and micronutrients — in seconds.",
  },
  {
    question: "How accurate is photo-based meal analysis?",
    answer: "Accuracy depends on photo quality and meal complexity. Single-ingredient meals are highly accurate. Mixed dishes involve estimation. MyCalAgent lets you review and correct any result via voice or text before saving, so your log always reflects what you actually ate.",
  },
  {
    question: "Can the AI identify restaurant meals and packaged foods?",
    answer: "Yes. MyCalAgent is trained on a wide variety of cuisines, restaurant dishes, homemade meals, and packaged foods. You can also scan barcodes or search manually for any item the AI doesn't recognize.",
  },
  {
    question: "What nutrients does the analysis cover?",
    answer: "Every meal analysis includes calories, protein, carbohydrates, fat, fiber, sugar, and 11 micronutrients including sodium, calcium, iron, potassium, and vitamins A, C, and D.",
  },
  {
    question: "Does the AI detect allergens?",
    answer: "Yes. After identifying meal ingredients, MyCalAgent cross-references them against your personal allergen and dislike list and flags any potential matches before you log the meal.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "AI Meal Analysis: How MyCalAgent Turns a Photo Into Full Nutrition Data",
      description: "How MyCalAgent's computer vision identifies foods, estimates portions, and delivers complete nutrition breakdowns from meal photos.",
      url: "https://www.mycalagent.com/features/ai-meal-analysis",
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
        { "@type": "ListItem", position: 3, name: "AI Meal Analysis", item: "https://www.mycalagent.com/features/ai-meal-analysis" },
      ],
    },
  ],
};

const steps = [
  { n: "1", title: "Point and snap.", body: "Take a photo of any meal, snack, or drink. No barcodes, no manual search required." },
  { n: "2", title: "AI identifies ingredients.", body: "Computer vision recognizes each food item, even in complex mixed dishes, and maps them to a nutritional database." },
  { n: "3", title: "Portions are estimated.", body: "The model estimates serving sizes using visual depth cues, plate size, and reference objects." },
  { n: "4", title: "Review and correct.", body: "You see the full breakdown and can adjust any item by voice or text before saving." },
  { n: "5", title: "Data feeds your patterns.", body: "Every logged meal contributes to your wellness intelligence — surfacing patterns over time." },
];

const highlights = [
  { emoji: "⚡", title: "Under 6 seconds", body: "Full nutrition analysis delivered in under six seconds from photo capture." },
  { emoji: "🧬", title: "15+ nutrients tracked", body: "Calories, macros, fiber, sugar, and 11 micronutrients on every meal." },
  { emoji: "🌍", title: "All cuisines", body: "Trained across global cuisines — from Japanese ramen to Indian thali to Tex-Mex." },
  { emoji: "🎙️", title: "Voice correction", body: "Correct any result by speaking naturally. \"Add more rice\" adjusts instantly." },
  { emoji: "⚠️", title: "Allergen alerts", body: "Flags your personal allergens before you log, not after." },
  { emoji: "📴", title: "Offline mode", body: "Log meals without a connection. Data syncs automatically when back online." },
];

export default function AIMealAnalysisPage() {
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
              <span className="text-foreground">AI Meal Analysis</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Feature Deep Dive</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                AI Meal Analysis
                <br />
                <span className="gradient-text">Snap a Photo. Know Everything.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-4">
                MyCalAgent's AI analyzes any meal photo — identifying ingredients, estimating portions, and delivering a complete nutrition breakdown in under six seconds.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                No more searching databases, scanning barcodes, or guessing weights. The camera does the work. You review, correct if needed, and move on.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/features/ai-meal-analysis"
                pageTitle="AI Meal Analysis in MyCalAgent"
                pageType="feature"
              />
            </div>

            <section className="mb-16 p-8 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
              <h2 className="text-2xl font-bold mb-6">How It Works</h2>
              <ol className="space-y-4 text-muted-foreground">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{s.n}</span>
                    <div><strong className="text-foreground">{s.title}</strong> {s.body}</div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8">What Makes It Different</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {highlights.map((h, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <div className="text-2xl mb-3">{h.emoji}</div>
                    <h3 className="font-bold text-base mb-1">{h.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{h.body}</p>
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
              <p className="font-semibold mb-2">Ready to log your first meal?</p>
              <p className="text-sm text-muted-foreground mb-5">Download MyCalAgent and start tracking with AI in seconds.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">Explore related features</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/features/food-and-mood" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">Food & Mood</Link>
                <Link href="/features/hydration-tracking" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Hydration Tracking</Link>
                <Link href="/features/wellness-pattern-recognition" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Wellness Patterns</Link>
                <Link href="/how-ai-meal-analysis-works" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">How AI Analysis Works</Link>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
