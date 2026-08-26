"use client";

import AnimatedBackground from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustSignalStrip from "@/components/TrustSignalStrip";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import FoodMoodSection from "@/components/FoodMoodSection";
import WellnessComparisonSection from "@/components/WellnessComparisonSection";
import AppDownloadSection from "@/components/AppDownloadSection";
import VideoSection from "@/components/VideoSection";
import { ComparisonCTA } from "@/components/ComparisonCTA";
import { QuickFAQ } from "@/components/QuickFAQ";
import AICompareCTA from "@/components/AICompareCTA";
import UserInsightsSection from "@/components/UserInsightsSection";
import { Footer } from "@/components/Footer";

const homeFAQ = [
  {
    question: "What is MyCalAgent?",
    answer:
      "MyCalAgent is an AI wellness intelligence platform that helps you understand how your meals, hydration, fasting, and daily habits affect how you feel. Unlike basic calorie trackers, MyCalAgent uses AI pattern recognition to surface personalized wellness insights — connecting food, energy, mood, and behavior over time.",
  },
  {
    question: "How does AI meal analysis work in MyCalAgent?",
    answer:
      "Simply snap a photo of a meal or packaged product. MyCalAgent's AI identifies foods, estimates portion sizes, reads useful label cues, and delivers a nutrition breakdown — calories, macros, and micronutrients — in seconds.",
  },
  {
    question: "Can AI recognize food from photos?",
    answer:
      "Yes. MyCalAgent uses advanced computer vision AI trained on thousands of food types across diverse cuisines. It identifies individual ingredients, estimates portions, and accounts for cooking methods — all from a single photo.",
  },
  {
    question: "How does MyCalAgent track wellness patterns?",
    answer:
      "MyCalAgent tracks meals, water intake, beverage habits, fasting windows, mood, weight, and optional health context over time. Its AI analyzes this data to detect recurring patterns — like which foods give you energy, when you tend to underhydrate, or how meal timing affects your daily rhythm.",
  },
  {
    question: "How does food affect energy and mood?",
    answer:
      "Certain foods, meal timing, and hydration levels directly influence brain chemistry, blood sugar stability, and energy metabolism. MyCalAgent's Food & Mood insights connect your logged meals with observable wellness signals — helping you recognize what fuels you and what drains you.",
  },
  {
    question: "Can MyCalAgent integrate with Apple Health?",
    answer:
      "Yes. MyCalAgent integrates with Apple Health on iOS to read steps, sleep, and workouts, and write nutrition, calories, and water back to Apple Health.",
  },
  {
    question: "How does hydration tracking work?",
    answer:
      "Log water toward your daily hydration goal, and log coffee, tea, juice, and alcohol separately for calorie and habit context. This keeps water-goal progress precise while still showing how beverage habits relate to energy and focus.",
  },
  {
    question: "Is MyCalAgent a medical app?",
    answer:
      "No. MyCalAgent is a wellness and lifestyle intelligence app — not a medical or healthcare provider. It offers personalized insights to support your health goals but does not provide medical advice, diagnosis, or treatment. Always consult a licensed healthcare professional for medical decisions.",
  },
  {
    question: "Can AI detect food habits and behavioral patterns?",
    answer:
      "Yes. Over time, MyCalAgent's AI identifies recurring behavioral patterns — like skipped breakfasts, late-night snacking, or hydration gaps — and surfaces these as actionable wellness insights. This behavioral intelligence is what distinguishes MyCalAgent from simple calorie counters.",
  },
  {
    question: "What makes MyCalAgent different from traditional calorie trackers?",
    answer:
      "Traditional calorie apps record what you eat. MyCalAgent understands how you eat — and how it affects you. It replaces manual logging with AI meal recognition, replaces static dashboards with pattern intelligence, and replaces macro counts with whole-person wellness insights across meals, hydration, fasting, and habits.",
  },
];

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.mycalagent.com/#website",
      url: "https://www.mycalagent.com",
      name: "MyCalAgent",
      description: "AI Wellness Intelligence — understand how your meals, hydration, fasting, and habits affect how you feel.",
      publisher: {
        "@id": "https://www.mycalagent.com/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.mycalagent.com/#organization",
      name: "MyCalAgent",
      url: "https://www.mycalagent.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mycalagent.com/favicon.png",
      },
      description: "MyCalAgent is an AI wellness intelligence platform that helps users recognize patterns across meals, hydration, fasting, sleep, and daily habits.",
      sameAs: [],
    },
    {
      "@type": "MobileApplication",
      "@id": "https://www.mycalagent.com/#app",
      name: "MyCalAgent",
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS, Android",
      description:
        "AI wellness intelligence app that recognizes meal patterns, tracks hydration and fasting, and delivers personalized insights about how food and habits affect energy, mood, and wellbeing.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      installUrl: [
        "https://apps.apple.com/us/app/mycalagent/id6759270828",
        "https://play.google.com/store/apps/details?id=com.mycalagent.app",
      ],
      featureList: [
        "AI meal photo analysis",
        "Packaged product recognition",
        "Macro and micronutrient tracking",
        "Wellness pattern recognition",
        "Food and mood insights",
        "Hydration and beverage tracking",
        "Intermittent fasting planner",
        "Habit awareness tracking",
        "Apple Health integration",
        "Allergen detection",
        "Dietary conflict detection",
        "WHOOP integration",
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://www.mycalagent.com/#features",
      name: "MyCalAgent Core Features",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "AI Meal Photo Analysis", url: "https://www.mycalagent.com/features/ai-meal-analysis" },
        { "@type": "ListItem", position: 2, name: "Wellness Pattern Recognition", url: "https://www.mycalagent.com/features/wellness-pattern-recognition" },
        { "@type": "ListItem", position: 3, name: "Food & Mood Tracking", url: "https://www.mycalagent.com/features/food-and-mood" },
        { "@type": "ListItem", position: 4, name: "Hydration Tracking", url: "https://www.mycalagent.com/features/hydration-tracking" },
        { "@type": "ListItem", position: 5, name: "Intermittent Fasting Tracker", url: "https://www.mycalagent.com/features/intermittent-fasting" },
        { "@type": "ListItem", position: 6, name: "Apple Health Integration", url: "https://www.mycalagent.com/features/apple-health" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.mycalagent.com/#webpage",
      url: "https://www.mycalagent.com/",
      name: "MyCalAgent — AI Wellness Intelligence | Understand How Meals & Habits Affect How You Feel",
      description:
        "MyCalAgent uses AI to recognize patterns across meals, hydration, fasting, and daily habits — helping you understand how your body responds. Privacy-first wellness intelligence.",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.mycalagent.com/favicon.png",
      },
      mainEntity: [
        { "@id": "https://www.mycalagent.com/#faq" },
        { "@id": "https://www.mycalagent.com/#app" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.mycalagent.com/#faq",
      mainEntity: homeFAQ.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <Navigation />
<main className="relative z-10 pt-16">
          <HeroSection />
          <TrustSignalStrip />
          <HowItWorksSection />
          <FeaturesSection />
          <FoodMoodSection />
          <WellnessComparisonSection />
          <AppDownloadSection />
          <VideoSection />
          <ComparisonCTA />
          <AICompareCTA />
          <UserInsightsSection />
          <QuickFAQ items={homeFAQ} />
        </main>

        <Footer />
      </div>
    </>
  );
}
