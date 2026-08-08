import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getPublishedArticles } from "@/lib/sheets";
import ArticlePageClient from "./ArticlePageClient";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.excerpt,
    keywords: article.tags,
    alternates: { canonical: article.canonical_url || `https://www.mycalagent.com/blog/${slug}` },
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt,
      url: article.canonical_url || `https://www.mycalagent.com/blog/${slug}`,
      type: "article",
      publishedTime: article.publish_date,
      modifiedTime: article.updated_at || article.publish_date,
      authors: [article.author || "MyCalAgent Team"],
      ...(article.featured_image ? { images: [{ url: article.featured_image }] } : {}),
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = (await getPublishedArticles())
    .filter((a) => a.slug !== slug)
    .filter((a) => a.category === article.category || a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3);

  return <ArticlePageClient article={article} related={related} />;
}
