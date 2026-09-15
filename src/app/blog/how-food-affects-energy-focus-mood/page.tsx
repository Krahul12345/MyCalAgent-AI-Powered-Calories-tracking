import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import Image from "next/image";
import Link from "next/link";
import { getBlogImage } from "@/lib/blog-images";

export const metadata: Metadata = {
  title: "How What You Eat Affects Your Energy, Focus, and Mood — MyCalAgent Blog",
  description: "The connection between food and how you feel isn't abstract — it's biochemical. How different meals, timing, and nutrient patterns shape your mental and physical energy.",
  keywords: ["food and energy", "food and mood connection", "diet and focus", "nutrition and mental energy", "meal timing energy"],
  openGraph: {
    title: "How What You Eat Affects Your Energy, Focus, and Mood",
    description: "The biochemical connection between food and how you feel — and how to use it.",
    url: "https://www.mycalagent.com/blog/how-food-affects-energy-focus-mood",
  },
  alternates: { canonical: "https://www.mycalagent.com/blog/how-food-affects-energy-focus-mood" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How What You Eat Affects Your Energy, Focus, and Mood",
  description: "The biochemical connection between food and how you feel.",
  url: "https://www.mycalagent.com/blog/how-food-affects-energy-focus-mood",
  datePublished: "2026-05-01",
  author: { "@type": "Organization", name: "MyCalAgent" },
  publisher: { "@type": "Organization", name: "MyCalAgent", url: "https://www.mycalagent.com" },
};

export default function ArticleFoodEnergyPage() {
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
              <span className="text-foreground">Food, Energy & Mood</span>
            </nav>

            <div className="mb-10">
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 mb-4">Food & Mood</span>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                How What You Eat Affects Your Energy, Focus, and Mood
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span>6 min read</span>
                <span>·</span>
                <span>May 2026</span>
                <span>·</span>
                <span>MyCalAgent Team</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The connection between food and how you feel isn&apos;t abstract — it&apos;s biochemical. Here&apos;s how different meals, meal timing, and nutrient patterns shape your mental and physical energy throughout the day.
              </p>
            </div>

            <Image src={getBlogImage("2.png")} alt="MyCalAgent food and mood insights" width={1600} height={900} className="mb-10 w-full rounded-2xl border border-border/40 object-cover" />

            <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
              <h2 className="text-xl font-bold text-foreground">The Short Version</h2>
              <p>
                Every meal triggers a cascade of biological responses — blood sugar changes, hormonal shifts, neurotransmitter production, and inflammatory signals. How you feel an hour after eating isn&apos;t random. It&apos;s the measurable result of what you ate and when.
              </p>

              <h2 className="text-xl font-bold text-foreground">Blood Sugar: The Energy Rollercoaster</h2>
              <p>
                High-glycemic foods — white bread, sugary drinks, refined snacks — cause rapid spikes in blood glucose. Your body responds with a surge of insulin to bring it back down. This crash is what you feel as the mid-morning or post-lunch slump: fatigue, difficulty concentrating, irritability.
              </p>
              <p>
                Eating protein, healthy fats, and complex carbohydrates together slows digestion and glucose absorption — producing flatter, more sustained energy rather than spikes and crashes.
              </p>

              <h2 className="text-xl font-bold text-foreground">Neurotransmitters: What Food Does to Your Brain Chemistry</h2>
              <p>
                Serotonin — the neurotransmitter most associated with mood stability — is synthesized from tryptophan, an amino acid found in eggs, turkey, nuts, and dairy. Without adequate tryptophan intake, serotonin production falls.
              </p>
              <p>
                Dopamine, which drives motivation and focus, is synthesized from tyrosine — found in chicken, fish, and legumes. Omega-3 fatty acids (salmon, walnuts, flaxseed) support neuronal membrane function and have been linked to reduced depression and anxiety symptoms in multiple studies.
              </p>

              <h2 className="text-xl font-bold text-foreground">Meal Timing and the Afternoon Slump</h2>
              <p>
                The 2–3pm energy dip has two causes: a natural circadian rhythm dip (your body temperature and alertness both naturally drop in early afternoon) and the consequences of a high-carbohydrate, high-calorie lunch.
              </p>
              <p>
                A smaller, protein-forward lunch with vegetables and minimal refined carbs consistently produces a sharper afternoon compared to a heavy carb-based meal. The difference isn&apos;t subtle once you notice it.
              </p>

              <h2 className="text-xl font-bold text-foreground">Inflammation and Brain Fog</h2>
              <p>
                Diets high in ultra-processed foods, refined oils, and added sugars promote systemic inflammation. Chronic low-grade inflammation has been directly linked to cognitive fatigue, brain fog, and impaired working memory. Anti-inflammatory foods — berries, leafy greens, fatty fish, olive oil — support the opposite.
              </p>

              <h2 className="text-xl font-bold text-foreground">What This Means in Practice</h2>
              <p>
                You don&apos;t need to perfectly optimize every meal. But understanding that food affects your cognitive state — not just your weight — changes how you think about food choices. Skipping breakfast or eating a high-sugar lunch isn&apos;t neutral. It&apos;s a choice with predictable, measurable consequences.
              </p>
              <p>
                The most useful thing you can do is track what you eat alongside how you feel — and let patterns emerge. Over 1–2 weeks, specific correlations become visible that no general advice could predict for you specifically.
              </p>
            </div>

            <div className="mt-10 p-6 rounded-2xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
              <p className="font-semibold mb-1">Track your food-energy patterns with MyCalAgent</p>
              <p className="text-sm text-muted-foreground mb-4">Log meals with AI and let the pattern recognition engine surface your personal food-mood connections.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <div className="mt-10 pt-8 border-t border-border/40">
              <p className="text-sm text-muted-foreground mb-4">Related reading</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/how-food-affects-energy" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">How Food Affects Energy</Link>
                <Link href="/features/food-and-mood" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Food & Mood Feature</Link>
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
