import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Food Affects Energy Levels — MyCalAgent",
  description: "Understand how different foods, nutrients, meal timing, and dietary patterns affect your daily energy levels — and how to use this knowledge to feel better every day.",
  keywords: ["how food affects energy", "food and energy levels", "diet and energy", "what foods give you energy", "meal timing energy", "food energy crash"],
  openGraph: {
    title: "How Food Affects Energy Levels — MyCalAgent",
    description: "The science of how what you eat shapes your daily energy — and how AI can help you find the patterns that work for your body.",
    url: "https://www.mycalagent.com/how-food-affects-energy",
  },
  alternates: { canonical: "https://www.mycalagent.com/how-food-affects-energy" },
};

const faqItems = [
  {
    question: "Why does food affect energy levels?",
    answer: "Food affects energy through several biological pathways: blood sugar regulation, neurotransmitter production, cellular energy production (ATP via mitochondria), and inflammatory responses. What you eat, how much, and when all influence how much energy is available to your brain and body at any given time.",
  },
  {
    question: "What foods cause energy crashes?",
    answer: "High-glycemic foods — refined sugars, white bread, sugary drinks, and heavily processed snacks — cause rapid blood sugar spikes followed by sharp drops. These crashes cause fatigue, poor focus, and cravings. The severity depends on the glycemic index of the food and what else was eaten with it.",
  },
  {
    question: "What foods give sustained energy?",
    answer: "Complex carbohydrates (oats, legumes, whole grains), protein sources (eggs, fish, chicken, Greek yogurt), and healthy fats (avocado, nuts, olive oil) provide slower-digesting fuel that supports more stable blood sugar and sustained energy throughout the day.",
  },
  {
    question: "How does meal timing affect energy?",
    answer: "Meal timing interacts with circadian rhythms to influence how efficiently food is metabolized. Eating earlier in the day when insulin sensitivity is highest supports better energy. Large meals trigger a digestive response that draws blood to the GI tract and can cause post-meal fatigue.",
  },
  {
    question: "Why do I always feel tired after lunch?",
    answer: "Post-lunch fatigue (sometimes called the 'afternoon slump') is influenced by circadian rhythms, the size and composition of the meal, and blood sugar responses. High-carbohydrate, high-calorie lunches tend to cause more post-meal fatigue. Smaller, protein-rich lunches with vegetables tend to minimize it.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.mycalagent.com/how-food-affects-energy#article",
      headline: "How Food Affects Energy Levels: The Science of Diet and Daily Energy",
      url: "https://www.mycalagent.com/how-food-affects-energy",
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

const mechanisms = [
  { emoji: "🩸", title: "Blood sugar regulation", body: "Every meal triggers an insulin response. High-glycemic foods spike blood sugar rapidly, leading to an equally rapid drop — the energy crash. Low-glycemic foods release energy slowly, supporting more stable alertness." },
  { emoji: "🧠", title: "Neurotransmitter synthesis", body: "Amino acids from protein are precursors to dopamine, serotonin, and norepinephrine — neurotransmitters that regulate motivation, mood, and alertness. What you eat directly affects their production." },
  { emoji: "⚡", title: "Cellular energy production", body: "Carbohydrates, fats, and proteins all feed into the Krebs cycle to produce ATP — the cell's energy currency. B vitamins, magnesium, and iron are cofactors in this process. Deficiencies in any of them impair energy production." },
  { emoji: "🔥", title: "Inflammation", body: "Diets high in ultra-processed foods, refined oils, and added sugars promote chronic low-grade inflammation — which is linked to fatigue, brain fog, and reduced physical performance." },
  { emoji: "🕐", title: "Circadian timing", body: "Metabolism follows a daily rhythm. Insulin sensitivity is highest in the morning and lower at night. Eating in sync with this rhythm supports better energy metabolism and more restful sleep." },
  { emoji: "🦠", title: "Gut microbiome", body: "The gut-brain axis means gut bacteria directly influence mood, energy, and cognitive function. Fiber, fermented foods, and diverse plant foods support a microbiome that signals positively to the brain." },
];

export default function HowFoodAffectsEnergyPage() {
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
              <span className="text-foreground">How Food Affects Energy</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Wellness Intelligence</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                How Food Affects
                <br />
                <span className="gradient-text">Your Daily Energy Levels</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Your energy throughout the day isn't random. It's the sum of hundreds of food decisions — what you ate, when you ate it, how much, and with what else. Understanding these mechanisms lets you eat in a way that supports how you want to feel.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/how-food-affects-energy"
                pageTitle="How Food Affects Energy Levels"
                pageType="pillar"
              />
            </div>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Six Ways Food Shapes Your Energy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {mechanisms.map((m, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <div className="text-2xl mb-3">{m.emoji}</div>
                    <h3 className="font-bold text-base mb-2">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16 p-8 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
              <h2 className="text-2xl font-bold mb-5">The Practical Takeaways</h2>
              <ol className="space-y-4 text-muted-foreground">
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <div><strong className="text-foreground">Eat protein at every meal.</strong> Protein slows gastric emptying, blunts blood sugar spikes, and supplies amino acids for neurotransmitter production.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <div><strong className="text-foreground">Prefer complex carbohydrates over refined ones.</strong> Oats, sweet potatoes, legumes, and whole grains provide slower, steadier energy than white bread and sugary snacks.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <div><strong className="text-foreground">Stay hydrated.</strong> Even mild dehydration (1–2%) impairs cognitive performance and increases perceived fatigue.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  <div><strong className="text-foreground">Don't skip meals.</strong> Prolonged fasting without intention causes blood sugar dips that impair focus and mood.</div>
                </li>
                <li className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                  <div><strong className="text-foreground">Watch meal size at lunch.</strong> Large midday meals redirect blood flow to digestion and trigger post-meal fatigue. Smaller, balanced lunches tend to support sharper afternoon energy.</div>
                </li>
              </ol>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-5">How MyCalAgent Connects Food to Your Energy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Knowing the general science is useful. Knowing what works for your body specifically is powerful. MyCalAgent logs your meals with AI photo analysis and tracks patterns over time — surfacing correlations between your food choices, meal timing, and how you feel.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Over 7–14 days of consistent tracking, the AI begins to reveal your personal energy patterns — which meals precede crashes, which breakfast combinations lead to sharper mornings, which days your hydration gaps align with afternoon fatigue.
              </p>
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
              <p className="font-semibold mb-2">Discover your personal food-energy patterns</p>
              <p className="text-sm text-muted-foreground mb-5">Start logging with MyCalAgent and let the AI surface what your data reveals.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">Related</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/features/food-and-mood" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">Food & Mood Tracking</Link>
                <Link href="/hydration-and-productivity" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Hydration & Productivity</Link>
                <Link href="/wellness-pattern-recognition" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Wellness Pattern Recognition</Link>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
