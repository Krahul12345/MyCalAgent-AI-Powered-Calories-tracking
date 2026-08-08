import { Metadata } from "next";
import FAQPageClient from "./FAQPageClient";

export const metadata: Metadata = {
  title: "FAQ - MyCalAgent | Frequently Asked Questions",
  description: "Find answers to common questions about MyCalAgent - AI-powered calorie tracking, meal logging, nutrition analysis, hydration tracking, and intermittent fasting features.",
  keywords: ["calorie tracking FAQ", "AI meal logging help", "nutrition app questions", "MyCalAgent support"],
  openGraph: {
    title: "FAQ - MyCalAgent | Frequently Asked Questions",
    description: "Find answers to common questions about MyCalAgent - AI-powered calorie tracking, meal logging, nutrition analysis, hydration tracking, and intermittent fasting features.",
    url: "https://www.mycalagent.com/faq",
  },
  alternates: {
    canonical: "https://www.mycalagent.com/faq",
  },
};

const faqs = [
  {
    question: "What is MyCalAgent?",
    answer: "MyCalAgent is an AI-powered wellness and calorie tracking app that helps users log meals, track nutrition, hydration, caffeine, alcohol, fasting schedules, and activity in one place."
  },
  {
    question: "How does AI meal logging work?",
    answer: "Users can take a photo of their meal or use voice/text input. MyCalAgent's AI identifies foods, estimates calories, and breaks down macros and micronutrients. Users can edit and correct results anytime."
  },
  {
    question: "Does MyCalAgent detect food allergens?",
    answer: "Yes. MyCalAgent can flag common and custom allergens during meal analysis to help users make informed food choices."
  },
  {
    question: "Does MyCalAgent provide medical advice?",
    answer: "No. MyCalAgent is a wellness and lifestyle application and does not provide medical advice, diagnosis, or treatment."
  },
  {
    question: "Can I track hydration, caffeine, and alcohol?",
    answer: "Yes. MyCalAgent supports water, juice, coffee, tea, and alcohol tracking, with calorie syncing and smart portion sizing."
  },
  {
    question: "Does MyCalAgent support intermittent fasting?",
    answer: "Yes. Users can plan 16:8, 18:6, or 20:4 fasting schedules with reminders and calendar syncing."
  },
  {
    question: "Can I connect Apple Health or wearables?",
    answer: "Yes. Users can optionally connect supported platforms (such as Apple Health) with explicit permission. All integrations are user-controlled."
  },
  {
    question: "Is my data private and secure?",
    answer: "Yes. MyCalAgent uses encryption and privacy-first design principles. Users remain in control of their data at all times."
  },
  {
    question: "Is MyCalAgent free?",
    answer: "MyCalAgent offers a free plan with optional premium features available through subscription."
  },
  {
    question: "Can I delete my account?",
    answer: "Yes. Users can request account deletion directly from the app."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQPageClient faqs={faqs} />
    </>
  );
}
