import { Suspense } from "react";
import { Metadata } from "next";
import { getPublishedArticles } from "@/lib/sheets";
import BlogPageClient from "./BlogPageClient";
import JsonLd from "@/components/JsonLd";

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.mycalagent.com/blog#collection",
        name: "MyCalAgent Blog",
        url: "https://www.mycalagent.com/blog",
        description: metadata.description,
        isPartOf: { "@id": "https://www.mycalagent.com/#website" },
        publisher: { "@id": "https://www.mycalagent.com/#organization" },
        about: [
          "AI wellness intelligence",
          "AI meal analysis",
          "hydration tracking",
          "intermittent fasting",
          "food and mood patterns",
          "privacy-first wellness tracking",
        ],
      },
      {
        "@type": "ItemList",
        "@id": "https://www.mycalagent.com/blog#articles",
        name: "MyCalAgent Blog Articles",
        itemListElement: articles.map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: article.title,
          url: article.canonical_url || `https://www.mycalagent.com/blog/${article.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.mycalagent.com/blog" },
        ],
      },
    ],
  };

  return (
    <Suspense>
      <JsonLd data={jsonLd} />
      <BlogPageClient articles={articles} />
    </Suspense>
  );
}
