"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { QuickFAQ } from "@/components/QuickFAQ";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import JsonLd from "@/components/JsonLd";

const comparisons = [
  {
    name: "MyCalAgent",
    bestFor: "AI Powered - Wellness Partner",
    subBestFor: "AI-powered calorie and wellness tracking simplified.",
    price: "$6.99/mo",
    rating: 5,
    highlight: true,
  },
  {
    name: "Cal AI",
    bestFor: "AI-based quick logging",
    price: "$9.99/mo",
    rating: 4,
  },
  {
    name: "MyFitnessPal",
    bestFor: "Extensive food database",
    price: "$19.99/mo",
    rating: 4,
  },
  {
    name: "Lose It",
    bestFor: "Cost-conscious calorie tracking",
    price: "$39.99/yr",
    rating: 4,
  },
  {
    name: "Cronometer",
    bestFor: "Detailed micronutrient tracking",
    price: "$9.99/mo",
    rating: 4,
  },
  {
    name: "Noom",
    bestFor: "Coaching-focused approach",
    price: "$59/mo",
    rating: 4,
  },
  {
    name: "Yazio",
    bestFor: "Meal plan–based tracking",
    price: "$9.99/mo",
    rating: 4,
  },
  {
    name: "Lifesum",
    bestFor: "Diet-style focused tracking",
    price: "$44.99/yr",
    rating: 4,
  },
];

const faqItems = [
  {
    question: "What does this comparison show?",
    answer: "This comparison highlights differences in features, pricing, and focus areas across popular calorie tracking apps."
  },
  {
    question: "How is MyCalAgent different from other apps?",
    answer: "MyCalAgent focuses on AI-powered meal recognition, multi-habit tracking, and a privacy-first experience rather than manual-only food logging."
  },
  {
    question: "Are the ratings shown official app store ratings?",
    answer: "Ratings and comparisons are based on publicly available information and feature analysis, not endorsements."
  },
  {
    question: "Is MyCalAgent suitable for beginners?",
    answer: "Yes. MyCalAgent is designed to be simple for beginners while offering advanced insights for experienced users."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.mycalagent.com/comparisons/best-calorie-tracking-app#webpage",
      name: "Compare Popular Calorie Tracking Apps",
      url: "https://www.mycalagent.com/comparisons/best-calorie-tracking-app",
      description: "A comparison of popular calorie tracking apps by feature focus, pricing, and AI wellness capabilities.",
      isPartOf: { "@id": "https://www.mycalagent.com/#website" },
      publisher: { "@id": "https://www.mycalagent.com/#organization" },
      about: ["calorie tracking apps", "AI nutrition tracking", "wellness tracking apps"],
    },
    {
      "@type": "ItemList",
      "@id": "https://www.mycalagent.com/comparisons/best-calorie-tracking-app#comparison",
      name: "Popular Calorie Tracking Apps Compared",
      itemListElement: comparisons.map((app, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: app.name,
        description: app.subBestFor || app.bestFor,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.mycalagent.com/comparisons/best-calorie-tracking-app#faq",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
        { "@type": "ListItem", position: 2, name: "Comparisons", item: "https://www.mycalagent.com/comparisons/best-calorie-tracking-app" },
        { "@type": "ListItem", position: 3, name: "Best Calorie Tracking App", item: "https://www.mycalagent.com/comparisons/best-calorie-tracking-app" },
      ],
    },
  ],
};

export default function ComparisonPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <JsonLd data={jsonLd} />
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
              Compare Popular Calorie Tracking Apps
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We compared the top-rated nutrition and wellness apps to help you find the perfect partner for your health journey.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/comparisons/best-calorie-tracking-app"
                pageTitle="Best Calorie Tracking Apps Compared"
                pageType="comparison"
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How to Use This Comparison</h2>
            <p className="text-muted-foreground">
              This table compares popular calorie tracking apps based on feature focus, pricing, and overall coverage to help users find the best fit for their lifestyle.
            </p>
          </div>

          {/* Quick Comparison Table */}
          <div className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-2xl mb-6">
            <div className="p-8 border-b border-border/50 bg-muted/30">
              <h2 className="text-2xl font-bold">Calories Tracking Apps: Comparison Overview</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/50 text-muted-foreground uppercase text-sm tracking-wider">
                    <th className="px-8 py-6 font-semibold">App</th>
                    <th className="px-8 py-6 font-semibold">Best For</th>
                    <th className="px-8 py-6 font-semibold">Premium Price</th>
                    <th className="px-8 py-6 font-semibold text-center">Feature Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((app) => (
                    <tr 
                      key={app.name} 
                      className={`border-b border-border/50 transition-colors hover:bg-muted/20 ${
                        app.highlight ? "bg-emerald-500/5" : ""
                      }`}
                    >
                      <td className="px-8 py-6">
                        <span className={`text-lg font-bold ${app.highlight ? "text-primary" : "text-foreground"}`}>
                          {app.name === "MyCalAgent" ? (
                            <span className="flex items-center gap-1">
                            <span className="text-primary">MyCalAgent</span>
                            </span>
                          ) : (
                            app.name
                          )}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className={`font-semibold ${app.highlight ? "text-primary" : "text-foreground"}`}>
                            {app.bestFor}
                          </span>
                          {app.subBestFor && (
                            <span className="text-sm text-primary/80">{app.subBestFor}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`font-medium ${app.highlight ? "text-primary text-xl" : "text-muted-foreground"}`}>
                          {app.price}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-1">
                          {[...Array(app.rating)].map((_, i) => (
                            <Check key={i} className={`w-5 h-5 ${app.highlight ? "text-primary" : "text-muted-foreground"}`} strokeWidth={3} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-20 space-y-4">
            <p className="text-sm text-muted-foreground italic">
              Checkmarks represent relative feature coverage based on publicly available information.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Prices shown reflect publicly listed premium plans at the time of comparison and may vary by region.
            </p>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Which App Is Right for You?</h2>
              <p className="text-muted-foreground">
                MyCalAgent is designed for users who want AI-powered meal tracking, multi-habit insights, and a privacy-first experience without manual logging.
              </p>
            </div>
          </div>

          {/* Detailed Features Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why MyCalAgent Wins</h2>
            <p className="text-muted-foreground">Beyond simple logging, we provide a holistic AI health experience.</p>
          </div>

          {/* Detailed Feature Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-xl border-l-4 border-l-primary">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-primary/20 p-2 rounded-lg text-primary">MyCalAgent</span> Exclusive Features
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/20 p-1 rounded-full mt-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Real-time Allergen Detection</p>
                    <p className="text-sm text-muted-foreground italic">Instant safety checks for gluten, peanuts, and more through your camera.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/20 p-1 rounded-full mt-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Advanced Liquid Tracking</p>
                    <p className="text-sm text-muted-foreground italic">Separate logs for water, caffeine, and alcohol to monitor hydration and sleep quality.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/20 p-1 rounded-full mt-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">AI-Powered Portion Analysis</p>
                    <p className="text-sm text-muted-foreground italic">Our AI doesn't just guess ingredients; it calculates volume and weight for precision.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-muted-foreground">Standard Tracking Apps</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-muted p-1 rounded-full mt-1">
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">Manual Database Entry</p>
                    <p className="text-sm text-muted-foreground italic">Requires searching and weighing every single meal component manually.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-muted p-1 rounded-full mt-1">
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">Limited Multi-Channel Tracking</p>
                    <p className="text-sm text-muted-foreground italic">Often lacks integrated tracking for caffeine or alcohol impact.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-muted p-1 rounded-full mt-1">
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">Subscription Fatgue</p>
                    <p className="text-sm text-muted-foreground italic">Prices ranging from $10 to $60/month for basic features.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <QuickFAQ items={faqItems} />

          {/* CTA Section */}
          <div className="text-center bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-[2.5rem] p-12 relative overflow-hidden mt-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the AI Advantage?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of users who have simplified their health tracking with MyCalAgent. Get accurate results in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/register" 
                className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/20"
              >
                Start Your Free Trial
              </Link>
              <Link 
                href="/pricing" 
                className="px-10 py-4 bg-background border border-border rounded-2xl font-bold text-lg hover:bg-muted transition-all"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
