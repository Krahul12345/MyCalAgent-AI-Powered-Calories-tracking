"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AIDiscussButtons from "@/components/AIDiscussButtons";

const comparisonsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.mycalagent.com/comparisons/best-calorie-tracking-apps-2025#webpage",
      url: "https://www.mycalagent.com/comparisons/best-calorie-tracking-apps-2025",
      name: "Best Calorie Tracking Apps 2025 - MyCalAgent vs Cal AI vs Cronometer vs MyFitnessPal",
      description: "In-depth comparison of the best calorie tracking apps in 2025. Compare MyCalAgent, Cal AI, Cronometer, MyFitnessPal, Lose It, Noom, and Yazio on features, pricing, and AI capabilities.",
      inLanguage: "en",
      isPartOf: { "@id": "https://www.mycalagent.com/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
          { "@type": "ListItem", position: 2, name: "Comparisons", item: "https://www.mycalagent.com/comparisons" },
          { "@type": "ListItem", position: 3, name: "Best Calorie Tracking Apps 2025", item: "https://www.mycalagent.com/comparisons/best-calorie-tracking-apps-2025" },
        ],
      },
    },
    {
      "@type": "Article",
      "@id": "https://www.mycalagent.com/comparisons/best-calorie-tracking-apps-2025#article",
      headline: "Best Calorie Tracking Apps in 2025: AI-Powered Comparison Guide",
      description: "We reviewed 7 popular calorie tracking apps — MyCalAgent, Cal AI, Cronometer, MyFitnessPal, Lose It, Noom, and Yazio — comparing AI food scanning, pricing, features, and overall value.",
      url: "https://www.mycalagent.com/comparisons/best-calorie-tracking-apps-2025",
      inLanguage: "en",
      author: { "@type": "Organization", name: "MyCalAgent", url: "https://www.mycalagent.com" },
      publisher: {
        "@type": "Organization",
        name: "MyCalAgent",
        url: "https://www.mycalagent.com",
        logo: { "@type": "ImageObject", url: "https://www.mycalagent.com/favicon.png" },
      },
      mainEntityOfPage: { "@id": "https://www.mycalagent.com/comparisons/best-calorie-tracking-apps-2025#webpage" },
      about: { "@type": "Thing", name: "Calorie Tracking Apps" },
      keywords: "calorie tracking apps, best nutrition app 2025, AI food scanner, MyCalAgent vs MyFitnessPal, Cal AI review",
    },
    {
      "@type": "ItemList",
      name: "Best Calorie Tracking Apps 2025",
      description: "Top calorie tracking apps ranked by features, AI capabilities, pricing, and user experience.",
      numberOfItems: 7,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "MyCalAgent", url: "https://www.mycalagent.com", description: "Best Overall for AI-Powered Wellness Agent — $6.99/month" },
        { "@type": "ListItem", position: 2, name: "Cal AI", description: "Best for AI-Powered Speed — $9.99/month" },
        { "@type": "ListItem", position: 3, name: "Cronometer", description: "Best for Detailed Nutrition Tracking — $9.99/month" },
        { "@type": "ListItem", position: 4, name: "MyFitnessPal", description: "Best for Largest Food Database — $19.99/month" },
        { "@type": "ListItem", position: 5, name: "Lose It", description: "Best Budget-Friendly Option — $39.99/year" },
        { "@type": "ListItem", position: 6, name: "Noom", description: "Best for Weight Loss Coaching — ~$59/month" },
        { "@type": "ListItem", position: 7, name: "Yazio", description: "Best for Meal Planning — $9.99/month" },
      ],
    },
  ],
};
import { Check, X, Star, Zap, Award, BarChart3, Users, DollarSign, Brain, Utensils } from "lucide-react";
import Link from "next/link";
import { QuickFAQ } from "@/components/QuickFAQ";

const apps = [
  {
    name: "MyCalAgent",
    bestFor: "Best Overall for AI-Powered Wellness Agent",
    description: "MyCalAgent is an AI-powered wellness agent that actively works with you to improve your health. Using advanced food photo analysis and habit intelligence, it tracks meals, hydration, caffeine, alcohol, and intermittent fasting—then delivers personalized insights and guidance without the friction of manual logging.",
    keyFeatures: [
      "Multi-Input AI Logging: Snap, speak, or type meals instantly.",
      "All-in-One Wellness Tracking: Meals, hydration, caffeine, alcohol, and fasting.",
      "Smart Portion Analysis: AI estimates portion size for better accuracy.",
      "Instant Safety Alerts: Real-time allergen and ingredient detection.",
      "Privacy-First by Design: Your data stays private and under your control.",
      "Advanced AI Food Scanning: Fast, high-accuracy meal recognition from photos",
      "Modern, Intuitive Interface: Clean, iOS-inspired design",
      "Lightning-Fast Logging: Capture meals in seconds with minimal effort"
    ],
    pricing: {
      free: "Free plan available with limited AI scans",
      premium: "$6.99/month"
    },
    pros: ["Most comprehensive AI-powered feature set", "Fast, low-friction logging experience", "Strong value for premium pricing", "Truly holistic wellness approach"],
    cons: ["Newer platform with frequent updates"],
    recommendation: "Best suited for users who want an AI-driven wellness app that goes beyond basic tracking and provides ongoing guidance with minimal effort.",
    rating: 5,
    isEditorChoice: true,
    accent: "emerald"
  },
  {
    name: "Cal AI",
    bestFor: "Best for AI-Powered Speed",
    description: "Revolutionary AI food scanning makes tracking 3x faster than traditional apps. Perfect for busy people who want results without the tedious manual entry.",
    keyFeatures: [
      "Advanced AI Food Scanning: 95%+ accuracy with instant recognition",
      "Modern Interface: iOS-inspired design, beautifully minimal",
      "Lightning Fast: Log meals in 10 seconds vs 30-60 seconds with competitors",
      "Smart Insights: AI identifies eating patterns and suggests improvements",
      "Meal Planning: AI-generated personalized meal plans (Premium)"
    ],
    pricing: {
      free: "Unlimited AI scanning, basic tracking",
      premium: "$9.99/month"
    },
    pros: ["Best AI technology", "Fastest logging", "Beautiful design"],
    cons: ["Smaller database", "Newer app", "Limited micronutrients"],
    recommendation: "Choose Cal AI if you want the fastest, most effortless tracking experience and modern design appeal.",
    rating: 4.5,
    accent: "blue"
  },
  {
    name: "Cronometer",
    bestFor: "Best for Detailed Nutrition Tracking",
    description: "Cronometer is the gold standard for data accuracy and micronutrient tracking. If you care about optimizing every aspect of your nutrition, this is your app.",
    keyFeatures: [
      "Validated Data: Every food entry is checked for accuracy",
      "Micronutrient Focus: Tracks 82+ micronutrients",
      "Gold Subscription: Professional reports and trend analysis",
      "Health Integration: Syncs with most wearables and medical devices"
    ],
    pricing: {
      free: "Ad-supported, basic tracking",
      premium: "$9.99/month"
    },
    pros: ["Highest data accuracy", "Comprehensive micronutrient logs", "Professional-grade reports"],
    cons: ["Steeper learning curve", "UI can feel cluttered", "Slower manual entry"],
    recommendation: "Choose Cronometer if you need comprehensive micronutrient tracking and data accuracy is your top priority.",
    rating: 4,
    accent: "orange"
  },
  {
    name: "MyFitnessPal",
    bestFor: "Best for Largest Food Database",
    description: "MyFitnessPal is the industry veteran with the largest food database and strongest brand recognition. It's a solid, reliable choice with extensive features.",
    keyFeatures: [
      "14M+ Foods: Largest database in the industry",
      "Community Features: Friend feed, challenges, forums",
      "Exercise Database: Comprehensive workout tracking",
      "Recipe Import: Analyze nutrition from website URLs"
    ],
    pricing: {
      free: "Basic tracking with ads",
      premium: "$19.99/month or $79.99/year"
    },
    pros: ["Massive food database", "Strong community", "Well-established", "Extensive features"],
    cons: ["Expensive premium", "Dated interface", "Slower logging", "Database errors"],
    recommendation: "Choose MyFitnessPal if you need the absolute largest food database and value social/community features.",
    rating: 4,
    accent: "blue"
  },
  {
    name: "Lose It",
    bestFor: "Best Budget-Friendly Option",
    description: "Lose It offers solid features at the most affordable annual price. It's a reliable, user-friendly app that won't break the bank.",
    keyFeatures: [
      "Snap It: Photo-based food recognition",
      "7M+ Foods: Substantial food database",
      "Challenges: Weekly weight loss challenges",
      "Macro Tracking: Available in Premium",
      "Friendly UI: Colorful, approachable design"
    ],
    pricing: {
      free: "Basic tracking, Snap It, barcode scanner",
      premium: "$39.99/year or $19.99/month"
    },
    pros: ["Best annual pricing", "User-friendly", "Fun challenges", "Good features"],
    cons: ["AI less advanced", "Less modern design", "Slower than Cal AI/MyCalAgent"],
    recommendation: "Choose Lose It if budget is your primary concern and you want solid tracking without all the bells and whistles.",
    rating: 4,
    accent: "orange"
  },
  {
    name: "Noom",
    bestFor: "Best for Weight Loss Coaching",
    description: "Noom is more than a calorie tracker - it's a weight loss program with psychology-based coaching and education.",
    keyFeatures: [
      "Personal Coaching: 1-on-1 coach and group support",
      "Psychology Focus: Address emotional eating and habits",
      "Daily Lessons: Educational articles on behavior change",
      "Color System: Green/yellow/red food categorization",
      "Accountability: Check-ins with coach"
    ],
    pricing: {
      free: "No free version",
      premium: "~$59/month (varies by plan length)"
    },
    pros: ["Personal coaching", "Behavior change focus", "Educational content", "Accountability"],
    cons: ["Very expensive", "No free option", "Basic tracking features", "Not for everyone"],
    recommendation: "Choose Noom if you need coaching, accountability, and help addressing emotional eating habits.",
    rating: 3.5,
    accent: "red"
  },
  {
    name: "Yazio",
    bestFor: "Best for Meal Planning",
    description: "Yazio combines calorie tracking with extensive meal planning features and recipe libraries.",
    keyFeatures: [
      "Meal Plans: Pre-built plans for various diets",
      "Recipe Library: 1000+ healthy recipes with nutrition info",
      "Barcode Scanner: Quick packaged food logging",
      "Fasting Timer: Built-in intermittent fasting support",
      "Water Tracking: Hydration reminders and tracking"
    ],
    pricing: {
      free: "Basic tracking and recipes",
      premium: "$9.99/month or $59.99/year"
    },
    pros: ["Great meal plans", "Recipe variety", "Fasting support", "Clean interface"],
    cons: ["No AI scanning", "Smaller database", "Less accurate data"],
    recommendation: "Choose Yazio if you need meal planning help, recipe ideas, and are an intermittent faster.",
    rating: 4,
    accent: "blue"
  },
  {
    name: "Lifesum",
    bestFor: "Best for Lifestyle Diet Plans",
    description: "Lifesum offers tailored diet plans for specific lifestyles (keto, paleo, Mediterranean, etc.) with beautiful design.",
    keyFeatures: [
      "Diet Plans: 16+ lifestyle-specific plans",
      "Life Score: Daily rating of diet quality",
      "Meal Ratings: How foods align with your chosen diet",
      "Beautiful Design: Scandinavian-inspired aesthetics",
      "Recipes: Diet-specific healthy recipes"
    ],
    pricing: {
      free: "Basic tracking",
      premium: "$44.99/year or $9.99/month"
    },
    pros: ["Beautiful design", "Diet-specific plans", "Good recipes", "Reasonable pricing"],
    cons: ["No AI scanning", "Limited database", "Less features overall"],
    recommendation: "Choose Lifesum if you follow a specific diet (keto, paleo, etc.) and appreciate high-quality design.",
    rating: 4,
    accent: "emerald"
  }
];

const featureComparison = [
  { feature: "AI Food Scanning", mycalagent: "excellent", calai: "excellent", cronometer: "poor", mfp: "average", loseit: "good" },
  { feature: "Micronutrient Tracking", mycalagent: "excellent", calai: "average", cronometer: "excellent", mfp: "good", loseit: "good" },
  { feature: "Modern UI", mycalagent: "excellent", calai: "excellent", cronometer: "poor", mfp: "average", loseit: "good" },
  { feature: "Logging Speed", mycalagent: "excellent", calai: "excellent", cronometer: "poor", mfp: "average", loseit: "good" },
  { feature: "Data Accuracy", mycalagent: "excellent", calai: "good", cronometer: "excellent", mfp: "average", loseit: "good" },
  { feature: "Value for Money", mycalagent: "excellent", calai: "excellent", cronometer: "excellent", mfp: "average", loseit: "excellent" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "excellent": return <div className="flex justify-center gap-0.5"><Check className="w-5 h-5 text-emerald-500" /><Check className="w-5 h-5 text-emerald-500" /></div>;
    case "good": return <div className="flex justify-center"><Check className="w-5 h-5 text-emerald-500" /></div>;
    case "average": return <div className="flex justify-center text-orange-500 text-xl font-bold">!</div>;
    case "poor": return <div className="flex justify-center"><X className="w-5 h-5 text-red-500" /></div>;
    default: return null;
  }
};

const faqItems = [
  {
    question: "Why should I choose an AI tracker over a traditional one?",
    answer: "Traditional trackers like MyFitnessPal require manual searching and entry, which takes 30-60 seconds per meal. AI trackers like MyCalAgent allow you to log in under 10 seconds with a photo or voice, making it much more sustainable long-term."
  },
  {
    question: "How accurate is AI food scanning?",
    answer: "Modern AI (like in MyCalAgent and Cal AI) is typically 90-95% accurate for most common meals. While not perfect, it's often more accurate than manual estimation where users frequently miscalculate portion sizes."
  },
  {
    question: "Is MyCalAgent better than Cal AI?",
    answer: "Cal AI is excellent for pure food logging. MyCalAgent goes further by integrating hydration, caffeine, alcohol, allow user to plan intermittent fast planning and Generate AI-Powered Advaced Wellness Summary dashboards, offering a more holistic view, simple to use of your health for a more competitive price."
  }
];

export default function BestCalorieTrackingApps2025() {
  const fullJsonLd = {
    ...comparisonsJsonLd,
    "@graph": [
      ...comparisonsJsonLd["@graph"],
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fullJsonLd) }}
      />
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 border border-sky-200 rounded-full text-sky-600 text-sm font-bold mb-6">
                <Zap className="w-4 h-4" /> Comparison Guide
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-700 via-sky-500 to-slate-700 bg-clip-text text-transparent leading-tight">
                Some of the Best Calorie <br />Tracking Apps in Market
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                We've reviewed popular nutrition apps on the market. From AI-powered scanners to detailed micronutrient logs, here's how they compare.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <AIDiscussButtons
                  pageUrl="https://www.mycalagent.com/comparisons/best-calorie-tracking-apps-2025"
                  pageTitle="Best Calorie Tracking Apps 2025"
                  pageType="comparison"
                />
              </div>
            </div>

          {/* Quick Nav */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 mb-16 overflow-x-auto shadow-sm">
            <div className="flex items-center justify-between gap-4 min-w-[600px]">
              {apps.map((app, i) => (
                <a key={app.name} href={`#${app.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors">
                  {i + 1}. {app.name}
                </a>
              ))}
            </div>
          </div>

          {/* App Reviews */}
          <div className="space-y-20 mb-20">
            {apps.map((app, index) => (
              <section key={app.name} id={app.name.toLowerCase().replace(/\s+/g, '-')} className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-black text-slate-300">{index + 1}.</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{app.name} - {app.bestFor}</h2>
                </div>

                <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-lg">
                  {app.isEditorChoice && (
                    <div className="bg-gradient-to-r from-sky-500 to-cyan-500 py-6 px-8 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white font-black text-xl uppercase tracking-widest">
                        <Award className="w-6 h-6" /> Editor's Choice
                      </div>
                      <div className="hidden md:flex items-center gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-white text-white" />)}
                      </div>
                    </div>
                  )}

                  <div className="p-8 md:p-12">
                    {/* Why it stands out */}
                    <div className={`p-8 rounded-3xl mb-12 ${
                      app.accent === "emerald" ? "bg-emerald-50 border border-emerald-200" :
                      app.accent === "blue" ? "bg-sky-50 border border-sky-200" :
                      app.accent === "orange" ? "bg-amber-50 border border-amber-200" :
                      "bg-rose-50 border border-rose-200"
                    }`}>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                        <Zap className="w-5 h-5 text-sky-500" /> Why {app.name} {app.isEditorChoice ? "Wins" : index === 2 ? "Excels" : "Stands Out"}
                      </h3>
                      <p className="text-lg leading-relaxed text-slate-600 italic">
                        "{app.description}"
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      {/* Left: Key Features */}
                      <div>
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                          <BarChart3 className="w-5 h-5 text-sky-500" /> Key Features
                        </h4>
                        <ul className="space-y-4">
                          {app.keyFeatures.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="bg-sky-100 p-1 rounded-full mt-1 shrink-0">
                                <Check className="w-3 h-3 text-sky-600" />
                              </div>
                              <span className="text-slate-600">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8 pt-8 border-t border-slate-200">
                          <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                            <DollarSign className="w-5 h-5 text-sky-500" /> Pricing
                          </h4>
                          <ul className="space-y-2 text-slate-600">
                            <li><span className="font-bold text-slate-800">Free:</span> {app.pricing.free}</li>
                            <li><span className="font-bold text-slate-800">Premium:</span> {app.pricing.premium}</li>
                          </ul>
                        </div>
                      </div>

                      {/* Right: Pros & Cons */}
                      <div>
                        <div className="grid grid-cols-1 gap-6">
                          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                            <h4 className="text-emerald-600 font-bold mb-4 flex items-center gap-2">
                              Pros <Check className="w-4 h-4" />
                            </h4>
                            <ul className="space-y-2">
                              {app.pros.map((pro, i) => (
                                <li key={i} className="text-sm flex items-center gap-2 text-slate-600">
                                  <div className="w-1 h-1 bg-emerald-500 rounded-full" /> {pro}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
                            <h4 className="text-rose-600 font-bold mb-4 flex items-center gap-2">
                              Cons <X className="w-4 h-4" />
                            </h4>
                            <ul className="space-y-2">
                              {app.cons.map((con, i) => (
                                <li key={i} className="text-sm flex items-center gap-2 text-slate-600">
                                  <div className="w-1 h-1 bg-rose-500 rounded-full" /> {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                          <p className="text-sm font-bold mb-1 text-slate-800">Best for:</p>
                          <p className="text-sm text-slate-600">{app.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Feature-by-Feature Comparison</h2>
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase text-xs tracking-widest bg-slate-50">
                      <th className="px-8 py-6 font-bold">Feature</th>
                      <th className="px-8 py-6 font-bold text-sky-600">MyCalAgent</th>
                      <th className="px-8 py-6 font-bold">Cal AI</th>
                      <th className="px-8 py-6 font-bold">Cronometer</th>
                      <th className="px-8 py-6 font-bold">MyFitnessPal</th>
                      <th className="px-8 py-6 font-bold">Lose It</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureComparison.map((row) => (
                      <tr key={row.feature} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-5 font-semibold text-slate-700">{row.feature}</td>
                        <td className="px-8 py-5">{getStatusIcon(row.mycalagent)}</td>
                        <td className="px-8 py-5">{getStatusIcon(row.calai)}</td>
                        <td className="px-8 py-5">{getStatusIcon(row.cronometer)}</td>
                        <td className="px-8 py-5">{getStatusIcon(row.mfp)}</td>
                        <td className="px-8 py-5">{getStatusIcon(row.loseit)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-slate-50 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1"><div className="flex"><Check className="w-3 h-3 text-emerald-500" /><Check className="w-3 h-3 text-emerald-500" /></div> = Excellent</div>
                <div className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> = Good</div>
                <div className="flex items-center gap-1"><div className="text-amber-500 font-bold">!</div> = Average</div>
                <div className="flex items-center gap-1"><X className="w-3 h-3 text-rose-500" /> = Poor/None</div>
              </div>
            </div>
          </div>

          {/* Final Recommendation */}
          <div className="bg-gradient-to-br from-sky-50 to-cyan-50 border-2 border-sky-200 rounded-[3rem] p-12 mb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-slate-800">Our Recommendation</h2>
              <div className="space-y-6 text-lg text-slate-600">
                <p>
                  For <strong className="text-slate-800">most people</strong>, we recommend starting with <strong className="text-slate-800">MyCalAgent</strong>. Its combination of AI-powered speed, holistic health tracking (caffeine, water, alcohol), and reasonable pricing makes it a great choice for sustainable, long-term health management. The faster and easier an app is to use, the more likely you are to stick with it - and consistency is everything.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div className="space-y-4">
                    <p className="font-bold flex items-center gap-2 text-sky-600"><Brain className="w-5 h-5" /> Choose MyCalAgent if:</p>
                    <ul className="text-sm space-y-2 text-slate-600">
                      <li>• You want a fast, effortless tracking experience</li>
                      <li>• You want to track more than just calories (water, caffeine, fasting)</li>
                      <li>• AI technology and modern design appeal to you</li>
                      <li>• You value your time and want to minimize logging friction</li>
                    </ul>
                  </div>
                  <div className="space-y-4 text-slate-500">
                    <p className="font-bold flex items-center gap-2"><Utensils className="w-5 h-5" /> Consider others if:</p>
                    <ul className="text-sm space-y-2">
                      <li>• <strong className="text-slate-700">Micronutrient tracking:</strong> Go with Cronometer</li>
                      <li>• <strong className="text-slate-700">Maximum budget savings:</strong> Choose Lose It</li>
                      <li>• <strong className="text-slate-700">Coaching and accountability:</strong> Try Noom</li>
                      <li>• <strong className="text-slate-700">Meal planning focus:</strong> Consider Yazio</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <QuickFAQ items={faqItems} />

          {/* CTA */}
          <div className="text-center mt-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-800">Ready to Experience the AI Advantage?</h2>
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
              Stop guessing and start tracking with precision. Join thousands of users who have simplified their health journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/register" 
                className="px-12 py-5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-2xl font-bold text-xl hover:opacity-90 transition-all hover:scale-105 shadow-xl shadow-sky-500/20"
              >
                Start Your Free Trial
              </Link>
              <Link 
                href="/pricing" 
                className="px-12 py-5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all shadow-sm"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
