import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Get Started with MyCalAgent | AI Wellness Intelligence App",
  description:
    "Start using MyCalAgent to understand how meals, hydration, fasting and daily habits affect your energy, focus and mood with AI wellness pattern recognition.",
  keywords: [
    "get started with MyCalAgent",
    "AI wellness app",
    "AI calorie tracker",
    "wellness intelligence app",
    "food mood tracker",
    "nutrition tracking app",
  ],
  openGraph: {
    title: "Get Started with MyCalAgent",
    description:
      "Begin tracking meals, hydration and habits with AI wellness intelligence.",
    url: "https://www.mycalagent.com/get-started",
    type: "website",
  },
  alternates: {
    canonical: "https://www.mycalagent.com/get-started",
  },
};

export default function GetStartedLayout({ children }: { children: ReactNode }) {
  return children;
}
