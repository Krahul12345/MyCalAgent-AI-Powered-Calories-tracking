import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About - MyCalAgent | AI Wellness Intelligence Platform",
  description: "Learn about MyCalAgent — our mission to help people understand how meals, hydration, fasting, and habits affect how they feel, through AI-powered wellness intelligence.",
  keywords: ["about MyCalAgent", "AI wellness intelligence", "wellness pattern recognition company", "food and mood app story"],
  openGraph: {
    title: "About - MyCalAgent | AI Wellness Intelligence Platform",
    description: "Learn about MyCalAgent — our mission to help people understand how meals, hydration, fasting, and habits affect how they feel, through AI-powered wellness intelligence.",
    url: "https://www.mycalagent.com/about",
  },
  alternates: {
    canonical: "https://www.mycalagent.com/about",
  },
};

const aboutFAQ = [
  {
    question: "What is the mission of MyCalAgent?",
    answer: "MyCalAgent aims to make wellness tracking simpler, more intuitive, and more accessible through AI-powered tools."
  },
  {
    question: "Who is MyCalAgent built for?",
    answer: "Anyone looking for an easier way to track nutrition and daily habits without complex manual logging."
  },
  {
    question: "Does MyCalAgent sell user data?",
    answer: "No. MyCalAgent follows a privacy-first approach and does not sell personal data."
  },
  {
    question: "Where is MyCalAgent available?",
    answer: "MyCalAgent is available on supported mobile platforms, with features varying by region and device."
  }
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": aboutFAQ.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutPageClient aboutFAQ={aboutFAQ} />
    </>
  );
}
