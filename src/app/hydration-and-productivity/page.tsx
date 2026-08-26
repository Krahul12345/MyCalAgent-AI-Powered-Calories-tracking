import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hydration and Productivity — How Water Intake Affects Focus & Performance",
  description: "Discover how hydration affects cognitive performance, focus, mood, and physical output — and how tracking water intake can help you stay sharp throughout the day.",
  keywords: ["hydration and productivity", "water and focus", "dehydration and cognitive performance", "hydration and brain function", "does drinking water improve focus"],
  openGraph: {
    title: "Hydration and Productivity — How Water Affects Focus & Brain Performance",
    description: "The science behind hydration and cognitive performance — and how MyCalAgent helps you track the connection.",
    url: "https://www.mycalagent.com/hydration-and-productivity",
  },
  alternates: { canonical: "https://www.mycalagent.com/hydration-and-productivity" },
};

const faqItems = [
  {
    question: "Does drinking more water improve focus?",
    answer: "Yes — up to optimal hydration. Research consistently shows that dehydration as mild as 1–2% below optimal impairs short-term memory, attention, reaction time, and problem-solving ability. Rehydrating to optimal levels restores these functions. Drinking beyond what your body needs has no additional cognitive benefit.",
  },
  {
    question: "How much water do you need for optimal cognitive performance?",
    answer: "Daily needs vary by body size, activity level, temperature, and diet. General guidelines range from 2 liters (women) to 3.7 liters (men) total fluid daily, including food-based water. Many people operate chronically below this, contributing to persistent mild fatigue and focus impairment.",
  },
  {
    question: "What are the signs of dehydration that affect work performance?",
    answer: "Early signs include increased thirst, slightly darker urine, and mild headache. Cognitive signs appear at just 1–2% dehydration: difficulty concentrating, short-term memory lapses, increased irritability, and slower reaction times — all of which directly impact work output.",
  },
  {
    question: "Can caffeine substitute for water?",
    answer: "Coffee and tea can be useful beverage logs, but they should not replace water-goal tracking. In MyCalAgent, water counts toward the hydration goal while coffee and tea are tracked separately for habit and calorie context.",
  },
  {
    question: "How does MyCalAgent help with hydration tracking?",
    answer: "MyCalAgent tracks water, all beverage types, and caffeine throughout the day. It calculates your personalized hydration target, shows real-time progress, sends reminders, and — over time — surfaces patterns between your hydration habits and energy and focus signals.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.mycalagent.com/hydration-and-productivity#article",
      headline: "Hydration and Productivity: The Science of Water, Focus, and Cognitive Performance",
      url: "https://www.mycalagent.com/hydration-and-productivity",
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

const effects = [
  { pct: "1–2%", label: "dehydration", impact: "Short-term memory impairment, reduced attention and concentration" },
  { pct: "2–3%", label: "dehydration", impact: "Significant cognitive decline, mood deterioration, headache onset" },
  { pct: "3–4%", label: "dehydration", impact: "Reduced physical endurance, impaired motor skills, marked fatigue" },
  { pct: "5%+", label: "dehydration", impact: "Severe performance reduction, health risk — requires medical attention" },
];

export default function HydrationAndProductivityPage() {
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
              <span className="text-foreground">Hydration & Productivity</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Wellness Intelligence</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                Hydration & Productivity
                <br />
                <span className="gradient-text">How Water Shapes Your Focus</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-4">
                Dehydration as mild as 1–2% below optimal measurably reduces cognitive performance. Most people experience this daily without realizing it. Here's the science — and what to do about it.
              </p>
            </div>

            <section className="mb-16 p-8 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
              <h2 className="text-2xl font-bold mb-5">The Short Answer</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Water is essential for nearly every cognitive process — including the electrochemical signals neurons use to communicate. When fluid levels drop, even slightly, the brain has to work harder to perform the same tasks. The result is measurable: slower reaction times, reduced working memory, impaired attention, and increased perception of effort and fatigue.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Cognitive Impact by Dehydration Level</h2>
              <div className="space-y-3">
                {effects.map((e, i) => (
                  <div key={i} className="flex items-start gap-5 p-5 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <div className="text-center flex-shrink-0 w-16">
                      <div className="text-2xl font-bold text-emerald-600">{e.pct}</div>
                      <div className="text-xs text-muted-foreground">{e.label}</div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-1">{e.impact}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Why Most People Are Mildly Dehydrated Most of the Time</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Thirst is a lagging indicator — by the time you feel thirsty, you're already 1–2% dehydrated. This is the threshold where cognitive performance begins to decline. Many people who sit at desks for hours, drink mostly coffee, or skip water in favor of other beverages, chronically operate in this mild deficit.</p>
                <p>Climate, physical activity, body size, and dietary water content all affect daily needs. Someone running in hot weather needs dramatically more water than someone in an air-conditioned office. There's no universal optimal — only personal optimal.</p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-5">Practical Hydration Habits That Support Focus</h2>
              <ol className="space-y-4 text-muted-foreground">
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <div><strong className="text-foreground">Start with water before coffee.</strong> Rehydrate first thing in the morning before adding caffeine. Overnight fluid loss means you wake up mildly dehydrated.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <div><strong className="text-foreground">Keep a large water container at your desk.</strong> Proximity dramatically increases passive water consumption.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <div><strong className="text-foreground">Drink proactively, not reactively.</strong> Sip throughout the day rather than drinking large amounts infrequently.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  <div><strong className="text-foreground">Track and set reminders.</strong> Awareness of current intake and automated nudges dramatically improve consistency for most people.</div>
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
              <p className="font-semibold mb-2">Track your hydration and see the patterns</p>
              <p className="text-sm text-muted-foreground mb-5">MyCalAgent connects your water intake to your daily energy and focus signals.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">Related</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/features/hydration-tracking" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">Hydration Tracking Feature</Link>
                <Link href="/how-food-affects-energy" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">How Food Affects Energy</Link>
                <Link href="/features/food-and-mood" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Food & Mood</Link>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
