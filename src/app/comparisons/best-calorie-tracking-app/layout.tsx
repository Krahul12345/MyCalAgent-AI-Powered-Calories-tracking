import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Best Calorie Tracking App for AI Wellness Insights | MyCalAgent",
  description:
    "Compare calorie tracking apps and see why MyCalAgent focuses on AI wellness intelligence, meal photo analysis, hydration, fasting and food mood patterns.",
  keywords: [
    "best calorie tracking app",
    "best AI calorie tracker",
    "AI nutrition app",
    "food mood tracking app",
    "MyCalAgent comparison",
  ],
  openGraph: {
    title: "Best Calorie Tracking App for AI Wellness Insights | MyCalAgent",
    description:
      "A practical guide to choosing a calorie tracking app that goes beyond numbers.",
    url: "https://www.mycalagent.com/comparisons/best-calorie-tracking-app",
    type: "article",
  },
  alternates: {
    canonical: "https://www.mycalagent.com/comparisons/best-calorie-tracking-app",
  },
};

export default function BestCalorieTrackingAppLayout({ children }: { children: ReactNode }) {
  return children;
}
