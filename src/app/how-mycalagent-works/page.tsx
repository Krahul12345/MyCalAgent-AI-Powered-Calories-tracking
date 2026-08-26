import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Camera,
  Check,
  ChevronDown,
  CircleDot,
  Droplets,
  HeartPulse,
  LockKeyhole,
  ScanSearch,
  ShieldAlert,
  Sparkles,
  TimerReset,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How MyCalAgent Works — AI Wellness Intelligence Explained",
  description: "Learn exactly how MyCalAgent works: AI photo meal logging, wellness pattern recognition, hydration analysis, fasting tracking, allergen detection, and privacy-first architecture.",
  keywords: [
    "how MyCalAgent works",
    "AI wellness app",
    "AI meal insights",
    "AI habit tracking",
    "food pattern recognition",
    "wellness intelligence",
    "hydration tracking app",
    "fasting insights",
    "AI calorie tracking",
    "AI nutrition guidance",
    "privacy-first wellness tracking",
    "HealthKit integration",
  ],
  openGraph: {
    title: "How MyCalAgent Works — AI Wellness Intelligence Explained",
    description: "A complete guide to how MyCalAgent's AI wellness intelligence works — from photo meal logging to pattern recognition to privacy-first data architecture.",
    url: "https://www.mycalagent.com/how-mycalagent-works",
  },
  alternates: { canonical: "https://www.mycalagent.com/how-mycalagent-works" },
};

const faqItems = [
  {
    question: "What is MyCalAgent?",
    answer: "MyCalAgent is an AI wellness intelligence platform that uses computer vision to log meals from photos, tracks hydration and fasting, and analyzes patterns across your lifestyle data to surface personalized insights about how your habits affect your energy, mood, and wellbeing.",
  },
  {
    question: "How does MyCalAgent use AI?",
    answer: "MyCalAgent uses AI in three main ways: (1) computer vision for meal photo analysis — identifying ingredients, estimating portions, and calculating nutrition; (2) pattern recognition — analyzing data across meals, hydration, fasting, and habits over time to surface behavioral wellness insights; and (3) personalized recommendations based on your accumulated data.",
  },
  {
    question: "How does AI meal photo logging work in MyCalAgent?",
    answer: "You take a photo of any meal, snack, or drink. MyCalAgent's AI identifies every ingredient, estimates portion sizes, and delivers a complete nutrition breakdown — calories, macros, and micronutrients — in under 6 seconds. You can review and correct results by voice or text before saving.",
  },
  {
    question: "What is wellness pattern recognition?",
    answer: "Wellness pattern recognition is the AI's ability to analyze your logged data over time and identify recurring correlations — like which foods consistently precede energy crashes, or when hydration gaps coincide with focus dips. These patterns are invisible on a single day but emerge clearly across weeks of data.",
  },
  {
    question: "Does MyCalAgent share my health data?",
    answer: "No. MyCalAgent uses a privacy-first architecture: your health data is encrypted in transit and at rest, never sold to third parties, and you can export or delete it at any time. The app collects only what's needed to provide wellness insights.",
  },
  {
    question: "Does MyCalAgent integrate with Apple Health / HealthKit?",
    answer: "Yes. MyCalAgent integrates with Apple Health to read steps, sleep, and workouts, and write nutrition, calories, and water back to Apple Health.",
  },
  {
    question: "How is MyCalAgent different from a regular calorie counter?",
    answer: "A calorie counter tracks one number. MyCalAgent tracks the full picture: what you eat, how much you drink, when you fast, and how all these habits connect to how you actually feel. The goal isn't to hit a calorie target — it's to understand which lifestyle patterns support your energy and wellbeing.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.mycalagent.com/how-mycalagent-works#article",
      headline: "How MyCalAgent Works: AI Wellness Intelligence from Photo to Pattern",
      description: "A complete explanation of how MyCalAgent's AI wellness platform works — photo meal analysis, hydration tracking, fasting intelligence, pattern recognition, allergen detection, and privacy-first architecture.",
      url: "https://www.mycalagent.com/how-mycalagent-works",
      publisher: {
        "@type": "Organization",
        name: "MyCalAgent",
        url: "https://www.mycalagent.com",
        logo: { "@type": "ImageObject", url: "https://www.mycalagent.com/mycalagent-logo.webp" },
      },
      about: [
        { "@type": "Thing", name: "AI wellness app" },
        { "@type": "Thing", name: "AI meal insights" },
        { "@type": "Thing", name: "food pattern recognition" },
        { "@type": "Thing", name: "wellness intelligence" },
        { "@type": "Thing", name: "hydration tracking" },
        { "@type": "Thing", name: "fasting insights" },
        { "@type": "Thing", name: "AI calorie tracking" },
        { "@type": "Thing", name: "privacy-first wellness tracking" },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.mycalagent.com#app",
      name: "MyCalAgent",
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS, Android, Web",
      description: "AI wellness intelligence platform — AI photo meal logging, hydration tracking, fasting planner, and wellness pattern recognition.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free tier available" },
      url: "https://www.mycalagent.com",
    },
    {
      "@type": "Organization",
      "@id": "https://www.mycalagent.com#org",
      name: "MyCalAgent",
      url: "https://www.mycalagent.com",
      description: "AI Wellness Intelligence — understand how meals, hydration & habits affect how you feel.",
      knowsAbout: [
        "AI wellness intelligence",
        "AI meal photo analysis",
        "food and mood tracking",
        "wellness pattern recognition",
        "hydration intelligence",
        "intermittent fasting",
        "allergen detection",
        "HealthKit integration",
        "privacy-first health data",
      ],
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
        { "@type": "ListItem", position: 2, name: "How MyCalAgent Works", item: "https://www.mycalagent.com/how-mycalagent-works" },
      ],
    },
  ],
};

const pillars = [
  {
    id: "01",
    icon: Camera,
    title: "AI Photo Meal Logging",
    tagline: "Snap. Identify. Log.",
    body: "Point your camera at a meal, snack, drink, or packaged product. MyCalAgent's computer vision identifies foods, reads useful label cues, estimates portions, and delivers calories, macros, and micronutrients in seconds.",
    detail: "You review the result, correct anything by voice or text, and save. Each logged meal feeds the pattern recognition engine that gets smarter over time.",
    href: "/features/ai-meal-analysis",
    linkLabel: "Learn about AI meal analysis →",
  },
  {
    id: "02",
    icon: ScanSearch,
    title: "Wellness Pattern Recognition",
    tagline: "Single days are noise. Patterns are signal.",
    body: "MyCalAgent analyzes your meals, hydration, fasting, and habits across days and weeks to surface the recurring correlations that explain how you feel. Which meals precede energy crashes? When do hydration gaps align with focus dips? Which fasting windows fit your natural rhythm?",
    detail: "These patterns are impossible to spot in real time but become clear across 7–14 days of consistent data. The AI surfaces them as plain-language insights — no data science degree required.",
    href: "/features/wellness-pattern-recognition",
    linkLabel: "Learn about wellness patterns →",
  },
  {
    id: "03",
    icon: Droplets,
    title: "Hydration Intelligence",
    tagline: "Water goals stay precise. Beverage habits stay visible.",
    body: "Log water, coffee, tea, juice, and alcohol throughout the day with quick portion sizes. Water counts toward your hydration goal; other drinks are tracked for calories and habit context.",
    detail: "Hydration data is connected to your broader wellness patterns — revealing days when reduced water intake correlates with lower energy or concentration without treating every beverage as water.",
    href: "/features/hydration-tracking",
    linkLabel: "Learn about hydration tracking →",
  },
  {
    id: "04",
    icon: BrainCircuit,
    title: "Food & Mood — Habit Insights",
    tagline: "What you eat shapes how you feel.",
    body: "The connection between food and mood isn't abstract — it's biochemical. Neurotransmitter production, blood sugar regulation, inflammation, and gut-brain signaling all depend on what and when you eat. MyCalAgent surfaces the specific connections in your own data.",
    detail: "Over time, the AI identifies your personal energy, focus, and mood patterns relative to your meal choices — showing you which foods and habits support how you want to feel.",
    href: "/features/food-and-mood",
    linkLabel: "Learn about food & mood tracking →",
  },
  {
    id: "05",
    icon: TimerReset,
    title: "Fasting Tracking",
    tagline: "Smart fasting, personalized to your rhythm.",
    body: "Plan and track 16:8, 18:6, 20:4, OMAD, 5:2, or a fully custom fasting window. A real-time timer tracks your fast in progress. Smart reminders notify you when your eating window opens or closes. Streak tracking and a fasting calendar show your consistency over time.",
    detail: "MyCalAgent's AI connects fasting data to meal quality, hydration, and energy signals — revealing which fasting patterns align best with how you naturally feel.",
    href: "/features/intermittent-fasting",
    linkLabel: "Learn about fasting tracking →",
  },
  {
    id: "06",
    icon: ShieldAlert,
    title: "Allergen Detection",
    tagline: "Know when a meal may conflict with your profile.",
    body: "After identifying a meal's ingredients, MyCalAgent cross-references them against your declared allergens, dislikes, dietary lifestyle, and preferences such as vegetarian, vegan, pescatarian, no-beef, no-pork, halal, kosher, low-carb, or keto.",
    detail: "Allergen and dietary conflict detection are built into the AI analysis pipeline, with confidence gates for meat, fish, and dairy identification.",
    href: "/features/ai-meal-analysis",
    linkLabel: "Learn about meal analysis →",
  },
  {
    id: "07",
    icon: LockKeyhole,
    title: "Privacy-First Architecture",
    tagline: "Your health data belongs to you.",
    body: "MyCalAgent is built with privacy as a core design principle, not an afterthought. Your health data is encrypted in transit and at rest. It is never sold to advertisers or third parties. You have full visibility into what data is stored and can export or delete it at any time.",
    detail: "Data collection is minimal — only what's needed to power your wellness insights. The app does not use health data for advertising profiling or share it with data brokers.",
    href: "/ai-disclaimer",
    linkLabel: "Read our AI disclaimer →",
  },
  {
    id: "08",
    icon: HeartPulse,
    title: "HealthKit Integration",
    tagline: "One complete wellness view.",
    body: "MyCalAgent integrates with Apple Health on iOS — reading steps, sleep, and workouts to enrich your wellness patterns, and writing nutrition, calories, and water back to the Health app.",
    detail: "Integration is optional. MyCalAgent works fully as a standalone app. Apple Health adds context — connecting movement, sleep, and recovery data to your nutrition and habit patterns for a more complete wellness picture.",
    href: "/features/apple-health",
    linkLabel: "Learn about Apple Health integration →",
  },
];

const journey = [
  {
    icon: Camera,
    title: "Capture",
    description: "Log meals, hydration, fasting, mood, and daily context with minimal friction.",
  },
  {
    icon: BrainCircuit,
    title: "Connect",
    description: "AI looks across days and weeks to identify recurring relationships in your data.",
  },
  {
    icon: Sparkles,
    title: "Understand",
    description: "Receive plain-language insights that help you make more informed wellness choices.",
  },
];

export default function HowMyCalAgentWorksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <Navigation />

        <main className="relative z-10 px-5 pb-24 pt-28 sm:px-6 lg:pt-32">
          <div className="mx-auto max-w-5xl">

            {/* Breadcrumb */}
            <nav className="mb-10 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-foreground">How MyCalAgent Works</span>
            </nav>

            <div className="mb-16 max-w-4xl">
              <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                From a photo to a pattern you can act on
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
                How MyCalAgent Works
                <br />
                <span className="text-primary">AI wellness intelligence, explained.</span>
              </h1>
              <p className="mb-5 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                MyCalAgent is an AI wellness intelligence platform. It uses computer vision to log meals from photos, tracks hydration and fasting, and analyzes patterns across your lifestyle data — surfacing personalized insights about how your habits affect how you feel.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/how-mycalagent-works"
                pageTitle="How MyCalAgent Works"
                pageType="pillar"
              />
            </div>

            <section className="mb-20 border-y border-border py-8" aria-labelledby="journey-heading">
              <h2 id="journey-heading" className="sr-only">The MyCalAgent intelligence journey</h2>
              <ol className="grid gap-8 md:grid-cols-3 md:gap-0">
                {journey.map(({ icon: Icon, title, description }, index) => (
                  <li key={title} className="relative md:px-7 md:first:pl-0 md:last:pr-0 md:not-last:border-r md:not-last:border-border">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-bold text-primary">0{index + 1}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mb-20" aria-labelledby="pillars-heading">
              <div className="mb-10 max-w-2xl">
                <h2 id="pillars-heading" className="mb-3 text-3xl font-bold sm:text-4xl">One connected wellness picture</h2>
                <p className="text-muted-foreground">Each capability adds context. Together, they help the AI distinguish a one-off moment from a meaningful pattern.</p>
              </div>

              <div className="border-t border-border">
                {pillars.map((p) => {
                  const Icon = p.icon;
                  return (
                    <article key={p.id} className="grid gap-5 border-b border-border py-8 sm:grid-cols-[4rem_1fr] sm:gap-7 lg:grid-cols-[4rem_15rem_1fr]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="mb-2 block text-xs font-bold text-primary">{p.id}</span>
                        <h3 className="text-xl font-bold">{p.title}</h3>
                        <p className="mt-1 text-sm font-semibold text-primary">{p.tagline}</p>
                      </div>
                      <div>
                        <p className="mb-3 leading-relaxed text-muted-foreground">{p.body}</p>
                        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                        <Link href={p.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline hover:underline-offset-4">
                          {p.linkLabel.replace(" →", "")}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="mb-20 overflow-hidden rounded-2xl border border-border bg-white" aria-labelledby="comparison-heading">
              <div className="border-b border-border px-5 py-6 sm:px-8">
                <h2 id="comparison-heading" className="text-2xl font-bold">More context than a calorie counter</h2>
                <p className="mt-2 text-sm text-muted-foreground">A practical view of what changes when tracking becomes connected and AI-assisted.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="p-4 text-left font-semibold text-muted-foreground sm:px-8">Capability</th>
                      <th className="p-4 text-left font-semibold text-primary">MyCalAgent</th>
                      <th className="p-4 text-left font-semibold text-muted-foreground">Typical calorie app</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Meal logging method", "AI photo analysis", "Manual database search"],
                      ["Wellness pattern recognition", "Included", "Usually not included"],
                      ["Food & mood tracking", "Connected to meal data", "Usually separate or absent"],
                      ["Hydration + beverage tracking", "Water goal plus drink context", "Basic or absent"],
                      ["Fasting intelligence", "AI-assisted planner", "Basic timer or absent"],
                      ["Allergen detection", "Built into AI analysis", "Rarely included"],
                      ["Apple Health / HealthKit", "Read and write support", "Varies"],
                      ["Privacy architecture", "Encrypted, no data selling", "Varies"],
                    ].map(([feature, mca, other]) => (
                      <tr key={feature} className="border-b border-border last:border-b-0">
                        <td className="p-4 font-medium sm:px-8">{feature}</td>
                        <td className="p-4 text-muted-foreground">
                          <span className="inline-flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{mca}</span>
                        </td>
                        <td className="p-4 text-muted-foreground">{other}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-20 grid gap-10 lg:grid-cols-[18rem_1fr]" aria-labelledby="faq-heading">
              <div>
                <h2 id="faq-heading" className="text-3xl font-bold">Questions, answered clearly</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">The essentials about our AI, your data, and how the experience fits together.</p>
              </div>
              <div className="border-t border-border">
                {faqItems.map((f) => (
                  <details key={f.question} className="group border-b border-border py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
                      {f.question}
                      <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="max-w-2xl pt-3 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <div className="mb-16 overflow-hidden rounded-2xl bg-[#123d2d] px-6 py-10 text-center text-white sm:px-10 sm:py-12">
              <CircleDot className="mx-auto mb-5 h-7 w-7 text-[#78d7a5]" aria-hidden="true" />
              <p className="mb-2 text-2xl font-bold">See what your routine has been telling you.</p>
              <p className="mx-auto mb-7 max-w-xl text-sm leading-relaxed text-[#c9e6d7]">Start logging with AI and give your patterns 7–14 days to emerge. Your 3-day free trial lets you explore the full experience.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="border-t border-border pt-8" aria-labelledby="explore-heading">
              <h2 id="explore-heading" className="mb-4 text-lg font-bold">Continue exploring</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                  ["All features", "/features"],
                  ["AI wellness insights", "/ai-wellness-insights"],
                  ["Wellness pattern recognition", "/wellness-pattern-recognition"],
                  ["Why calorie tracking fails", "/why-calorie-tracking-fails"],
                  ["Research", "/research"],
                  ["About", "/about"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline hover:underline-offset-4">
                    {label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
