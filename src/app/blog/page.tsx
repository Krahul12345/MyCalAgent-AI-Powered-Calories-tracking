import { Suspense } from "react";
import { Metadata } from "next";
import { getPublishedArticles } from "@/lib/sheets";
import BlogPageClient from "./BlogPageClient";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog | AI Wellness, Food & Mood, Hydration & Fasting Insights — MyCalAgent",
  description:
    "Research-backed articles on AI-powered wellness tracking, meal insights, hydration, fasting, food and mood patterns, and the science of how daily habits shape how you feel.",
  alternates: { canonical: "https://www.mycalagent.com/blog" },
  openGraph: {
    title: "MyCalAgent Blog | AI Wellness Intelligence",
    description: "Insights on AI wellness, food & mood, hydration, fasting, and privacy-first tracking.",
    url: "https://www.mycalagent.com/blog",
  },
};

export default async function BlogPage() {
  const articles = await getPublishedArticles();
  return (
    <Suspense>
      <BlogPageClient articles={articles} />
    </Suspense>
  );
}
