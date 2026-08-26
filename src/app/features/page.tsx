import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { QuickFAQ } from "@/components/QuickFAQ";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";
import Image from "next/image";
import { Brain, Zap, Shield, TrendingUp, Clock, Camera, BarChart, Globe, Heart, Utensils, Award, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Features - MyCalAgent | AI Wellness Intelligence & Pattern Recognition",
  description: "Explore MyCalAgent's AI wellness features: meal photo analysis, food & mood tracking, hydration insights, fasting intelligence, allergen awareness, and Apple Health integration.",
  keywords: ["AI wellness intelligence", "food and mood tracking", "AI meal analysis", "wellness pattern recognition", "hydration insights", "intermittent fasting app"],
  openGraph: {
    title: "Features - MyCalAgent | AI Wellness Intelligence & Pattern Recognition",
    description: "Explore MyCalAgent's AI wellness features: meal photo analysis, food & mood tracking, hydration insights, fasting intelligence, allergen awareness, and Apple Health integration.",
    url: "https://www.mycalagent.com/features",
  },
  alternates: {
    canonical: "https://www.mycalagent.com/features",
  },
};

const features = [
  
  {
    icon: Shield,
    title: "Privacy First",
    description: "MyCalAgent protects your health data with enterprise-grade security.",
    benefits: ["Encrypted Supabase storage", "Private & Secure Storage", "Export or Delete Your Data Anytime"],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Brain,
    title: "AI-Powered Meal Logging",
    description: "Take a photo of a meal or packaged product and MyCalAgent estimates portions, calories, macros, and micronutrients while checking the result against your profile.",
    benefits: ["Photo-based meal logging", "Packaged product recognition", "Portion size estimation"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Advanced AI Powered Analytics Dashboard",
    description: "View calorie trends, allergen flags, hydration details, beverage logs, fasting schedules, weight journey data, and personalized nutrient goals across daily, weekly, and monthly views.",
    benefits: ["Macro & micronutrient tracking", "Weight journey trends", "AI nutrition analysis"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "Allergen & Dietary Conflict Detection",
    description: "Flag meals that may contain declared allergens or conflict with vegetarian, vegan, pescatarian, halal, kosher, no-beef, no-pork, keto, or other dietary preferences.",
    benefits: ["Declared allergen checks", "Dietary lifestyle warnings", "Personal likes and dislikes"],
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: TrendingUp,
    title: "Hydration, Caffeine & Alcohol Tracking",
    description: "Log water, coffee, tea, juice, and alcohol with quick portion sizes. Water counts toward your hydration goal; other drinks are tracked for calories and habit context.",
    benefits: ["Water goal progress", "Beverage habit tracking", "Hydration reminders"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "Smart Reminders & AI Coaching",
    description: "Receive meal reminders, hydration nudges, weight check-ins, daily nutrition snapshots, and Ask Cali coaching grounded in your logged meals and goals.",
    benefits: ["Ask Cali AI coach", "Daily nutrition snapshot", "Meal and hydration reminders"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Camera,
    title: "Health & Device Integrations",
    description: "Use Apple Health on iOS for steps, sleep, workouts, nutrition, calories, and water sync. MyCalAgent also supports WHOOP for a fuller wellness picture.",
    benefits: ["Apple Health integration", "WHOOP support", "Manual logging anytime"],
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: BarChart,
    title: "Advanced Analytics",
    description: "Deep insights into your eating patterns and nutritional balance.",
    benefits: ["Nutrient breakdown", "Smarter Insights with Less Manual Effort", "Full Control Over Your Data"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Globe,
    title: "Intermittent Fasting Planner",
    description: "MyCalAgent helps you Plan 16:8, 18:6, or 20:4 fasting schedules with visual timelines, calendar syncing, and smart reminders — making fasting simple and sustainable.",
    benefits: ["Custom Fasting Schedules", "Smart Reminders & Alerts", "Progress & Streak Tracking"],
    color: "from-teal-500 to-green-500",
  },
  {
    icon: Heart,
    title: "Complete Nutrition Tracking",
    description: "Track calories, protein, carbs, fat, sugar, fiber, sodium, cholesterol, saturated and trans fat, calcium, iron, potassium, and vitamins A, C, and D.",
    benefits: ["Macro and micronutrient detail", "Personalized goals", "AI coach tips"],
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Utensils,
    title: "Media Library",
    description: "Customized fitness videos with professional thumbnails. Categories: Fitness, Wellness, Nutrition, Meditation",
    benefits: ["Variety of workouts: HIIT, yoga, strength training, meditation", "Modern card design with play buttons", "Progress celebrations"],
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Award,
    title: "User Onboarding",
    description: "8-step guided journey (name, age, gender, height, weight, activity level, goal) based on FDA-Compliant Calculations: BMI, BMR (Mifflin-St Jeor Equation), TDEE.",
    benefits: ["AI-generated health summary with personalized recommendations", "Goal-based calorie targets (±500 cal for weight loss/gain)", "Smooth animations with haptic feedback"],
    color: "from-yellow-500 to-amber-500",
  },
];

const featuresFAQ = [
  {
    question: "What are the core features of MyCalAgent?",
    answer: "AI meal photo analysis, nutrition tracking, hydration and beverage tracking, intermittent fasting planning, analytics dashboards, reminders, and optional health integrations."
  },
  {
    question: "Does MyCalAgent detect food allergens?",
    answer: "Yes. The app can flag common and custom allergens during meal analysis to support informed food choices."
  },
  {
    question: "Can I customize my nutrition goals?",
    answer: "Yes. Users can customize calorie, macro, and micronutrient targets based on personal preferences and goals."
  },
  {
    question: "Does MyCalAgent work offline?",
    answer: "Core logging workflows are designed to remain resilient, with secure sync behavior when network connectivity is available."
  },
  {
    question: "How much water should I drink every day?",
    answer: "Daily water needs depend on body size, activity level, and environment. Tracking hydration helps users stay consistent throughout the day.\n\n👉 MyCalAgent includes hydration tracking and reminders to support daily intake goals."
  },
  {
    question: "Is intermittent fasting effective for weight management?",
    answer: "Intermittent fasting works for some people by creating structured eating windows. Consistency and lifestyle fit are more important than following a specific plan.\n\n👉 MyCalAgent offers optional fasting plans with reminders and visual schedules."
  },
  {
    question: "How can I stay consistent with my health goals?",
    answer: "Consistency improves when tracking is simple and feedback is clear. Seeing progress over time helps users stay motivated.\n\n👉 MyCalAgent brings meals, hydration, activity, and routines into one easy dashboard."
  },
  {
    question: "What is the best app to track calories and daily habits?",
    answer: "The best app is one that fits your lifestyle, reduces manual effort, and keeps data easy to understand.\n\n👉 MyCalAgent combines AI-powered meal tracking with lifestyle habit monitoring in one app."
  }
];

const featuresJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": featuresFAQ.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const featureDeepDives = [
  { title: "AI Meal Analysis", desc: "How photo-based nutrition logging works", href: "/features/ai-meal-analysis" },
  { title: "Food & Mood", desc: "Connecting diet to energy and mood", href: "/features/food-and-mood" },
  { title: "Hydration Tracking", desc: "Water, caffeine & beverage intelligence", href: "/features/hydration-tracking" },
  { title: "Intermittent Fasting", desc: "Smart fasting planner with AI insights", href: "/features/intermittent-fasting" },
  { title: "Apple Health", desc: "Full integration for complete wellness view", href: "/features/apple-health" },
  { title: "Wellness Patterns", desc: "AI pattern recognition across all your data", href: "/features/wellness-pattern-recognition" },
];

export default function FeaturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresJsonLd) }}
      />
      <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Core Features of
              <br />
              MyCal<span className="text-emerald-500">Agent</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Take a photo of your meal and MyCalAgent&apos;s AI automatically identifies foods, calculates calories, macros, and micronutrients, and detects allergens in real time. You can correct results using voice or text and instantly recalculate nutrition.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/features"
                pageTitle="MyCalAgent Features Overview"
                pageType="feature"
              />
            </div>
          </div>

          <section className="mb-20 grid items-center gap-10 border-y border-border py-12 lg:grid-cols-[1fr_0.72fr] lg:gap-16" aria-labelledby="nutrition-intelligence-heading">
            <div className="max-w-xl">
              <p className="mb-3 text-sm font-semibold text-primary">Inside the intelligence layer</p>
              <h2 id="nutrition-intelligence-heading" className="mb-5 text-3xl font-bold sm:text-4xl">Nutrition you can actually read</h2>
              <p className="mb-8 leading-relaxed text-muted-foreground">
                MyCalAgent turns meal logs into a clear view of your macro progress, micronutrient intake, and personalized targets so the useful signal is never buried in a spreadsheet.
              </p>
              <ul className="space-y-5">
                {[
                  "See protein, carbs, fat, and fiber against your daily targets.",
                  "Review key micronutrients such as sodium, calcium, iron, potassium, and vitamins.",
                  "Use AI-generated context to understand what the numbers mean for your routine.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border bg-white">
              <Image
                src="/mycalagent-nutrition-insights.webp"
                alt="MyCalAgent analytics screen showing macro targets and micronutrient intake"
                width={900}
                height={1600}
                sizes="(max-width: 1024px) 90vw, 380px"
                className="h-auto w-full"
              />
            </div>
          </section>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="h-full p-8 rounded-3xl glass-card hover:glass transition-all duration-500 hover:scale-105 glow-hover">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5`}>
                        <div className="w-full h-full rounded-2xl bg-background dark:bg-card flex items-center justify-center">
                          <feature.icon className="w-8 h-8 text-foreground" />
                        </div>
                    </div>
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className={`bg-gradient-to-br ${feature.color} bg-clip-text text-transparent mt-1`}>•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Deep Dive Links */}
          <div className="mt-16 mb-4">
            <h2 className="text-2xl font-bold mb-2 text-center">Explore Features in Depth</h2>
            <p className="text-muted-foreground text-center mb-8 text-sm">Each feature explained in full — how it works, why it matters, and what to expect.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featureDeepDives.map((f) => (
                <Link key={f.href} href={f.href} className="group p-5 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm hover:border-emerald-300/50 hover:shadow-md transition-all duration-200">
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-emerald-600 transition-colors">{f.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{f.desc}</p>
                  <span className="text-xs font-semibold text-emerald-600">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="inline-block p-8 rounded-3xl glass-card">
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-muted-foreground mb-6">Explore the full experience with a 3-day free trial.</p>
              <AppStoreButtons className="justify-center" />
            </div>
          </div>
        </div>
        
        <QuickFAQ items={featuresFAQ} />
      </main>

      <Footer />
      </div>
    </>
  );
}
