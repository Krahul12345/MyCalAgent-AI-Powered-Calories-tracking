import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Health Calculators for Calories, BMI, BMR and TDEE | MyCalAgent",
  description:
    "Use MyCalAgent health calculators to estimate calories, BMI, BMR, TDEE, macros and hydration targets, then connect the numbers to AI wellness pattern insights.",
  keywords: [
    "health calculator",
    "calorie calculator",
    "BMI calculator",
    "BMR calculator",
    "TDEE calculator",
    "AI wellness calculator",
    "MyCalAgent calculator",
  ],
  openGraph: {
    title: "Health Calculators for Calories, BMI, BMR and TDEE | MyCalAgent",
    description:
      "Estimate calories, macros and wellness targets with MyCalAgent calculators.",
    url: "https://www.mycalagent.com/calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://www.mycalagent.com/calculator",
  },
};

export default function CalculatorLayout({ children }: { children: ReactNode }) {
  return children;
}
