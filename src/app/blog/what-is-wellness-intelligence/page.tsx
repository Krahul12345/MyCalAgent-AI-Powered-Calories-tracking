import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Is Wellness Intelligence? Why It Matters More Than Calorie Counting — MyCalAgent Blog",
  description: "Calorie counting tells you what you ate. Wellness intelligence tells you how it affected you. Here's why understanding patterns matters more than tracking numbers.",
  keywords: ["wellness intelligence", "calorie counting alternatives", "AI wellness insights", "beyond calorie tracking", "wellness patterns"],
  openGraph: {
    title: "What Is Wellness Intelligence? And Why It Matters More Than Calorie Counting",
    url: "https://www.mycalagent.com/blog/what-is-wellness-intelligence",
  },
  alternates: { canonical: "https://www.mycalagent.com/blog/what-is-wellness-intelligence" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is Wellness Intelligence? And Why It Matters More Than Calorie Counting",
  url: "https://www.mycalagent.com/blog/what-is-wellness-intelligence",
  datePublished: "2026-05-01",
  author: { "@type": "Organization", name: "MyCalAgent" },
  publisher: { "@type": "Organization", name: "MyCalAgent", url: "https://www.mycalagent.com" },
};

export default function WellnessIntelligenceArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <Navigation />
        <main className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-foreground">Wellness Intelligence</span>
            </nav>

            <div className="mb-10">
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 mb-4">AI Wellness</span>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                What Is Wellness Intelligence? And Why It Matters More Than Calorie Counting
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span>5 min read</span><span>·</span><span>May 2026</span><span>·</span><span>MyCalAgent Team</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Calorie counting tells you what you ate. Wellness intelligence tells you how it affected you. Here&apos;s why understanding patterns matters more than tracking numbers.
              </p>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <h2 className="text-xl font-bold text-foreground">The Problem With Counting Calories</h2>
              <p>Calorie counting is the most common diet strategy — and one of the most abandoned. By week three, most people stop. Not because they lack discipline, but because tracking every meal in a database is tedious, calorie numbers are inaccurate, and the feedback loop is weak. You know what you ate. You still don&apos;t know why you feel tired.</p>

              <h2 className="text-xl font-bold text-foreground">What Wellness Intelligence Actually Means</h2>
              <p>Wellness intelligence is the ability to connect cause and effect across your lifestyle data. Not just "I ate 1,800 calories" — but "on days when I eat a high-carb lunch and under-hydrate, I reliably experience a 2pm energy crash." The difference is actionable understanding versus a number.</p>
              <p>It requires analyzing multiple data streams over time: meals, hydration, fasting, sleep, caffeine, and activity. A single day is noise. Patterns across two weeks are signal.</p>

              <h2 className="text-xl font-bold text-foreground">Why AI Makes This Possible Now</h2>
              <p>The correlation between your lunch and your afternoon focus isn&apos;t visible in real time. It&apos;s only clear when you look at 20 data points showing that the same combination of factors produces the same outcome. Human memory can&apos;t do this reliably. AI can.</p>
              <p>AI pattern recognition can process your full history, identify co-occurrences across multiple variables, and surface them in plain language — without requiring a data science degree.</p>

              <h2 className="text-xl font-bold text-foreground">What Changes When You Have It</h2>
              <p>When wellness intelligence is working, food decisions feel different. You&apos;re not fighting a calorie budget. You&apos;re using information about yourself — your patterns, your responses — to make choices that predictably make you feel better. That&apos;s a fundamentally more sustainable relationship with food.</p>
            </div>

            <div className="mt-10 p-6 rounded-2xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
              <p className="font-semibold mb-1">See wellness intelligence in action</p>
              <p className="text-sm text-muted-foreground mb-4">MyCalAgent surfaces your personal patterns after 7–14 days of consistent logging.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <div className="mt-10 pt-8 border-t border-border/40">
              <p className="text-sm text-muted-foreground mb-4">Related</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/why-calorie-tracking-fails" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">Why Calorie Tracking Fails</Link>
                <Link href="/wellness-pattern-recognition" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Wellness Pattern Recognition</Link>
                <Link href="/blog" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">← Back to Blog</Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
