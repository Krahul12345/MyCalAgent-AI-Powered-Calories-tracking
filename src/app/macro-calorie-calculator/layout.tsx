import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Macro & Calorie Calculator — BMR, TDEE, Protein, Carbs, Fats | MyCalAgent",
  description:
    "Calculate your daily calorie needs, macronutrient targets (protein, carbs, fats, fiber), BMI, and hydration using the clinically validated Mifflin-St Jeor equation. Free, no sign-up required.",
  keywords: [
    "macro calculator",
    "calorie calculator",
    "TDEE calculator",
    "BMR calculator",
    "Mifflin-St Jeor calculator",
    "protein calculator",
    "daily calorie needs",
    "macronutrient calculator",
    "free macro calculator",
    "nutrition calculator",
  ],
  openGraph: {
    title: "Free Macro & Calorie Calculator — BMR, TDEE, Macros | MyCalAgent",
    description:
      "Estimate your daily calorie target, macro breakdown, and hydration needs using the Mifflin-St Jeor formula. Evidence-based. Free. No sign-up required.",
    url: "https://www.mycalagent.com/macro-calorie-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://www.mycalagent.com/macro-calorie-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
