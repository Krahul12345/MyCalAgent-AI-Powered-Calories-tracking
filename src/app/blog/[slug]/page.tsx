import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getPublishedArticles } from "@/lib/sheets";
import ArticlePageClient from "./ArticlePageClient";
import JsonLd from "@/components/JsonLd";

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

  const url = article.canonical_url || `https://www.mycalagent.com/blog/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        name: article.title,
        description: article.excerpt,
        url,
        isPartOf: { "@id": "https://www.mycalagent.com/#website" },
        publisher: { "@id": "https://www.mycalagent.com/#organization" },
        primaryImageOfPage: article.featured_image ? { "@type": "ImageObject", url: article.featured_image } : undefined,
        about: [article.category, ...article.tags],
        mainEntity: { "@id": `${url}#article` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.mycalagent.com/blog" },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ArticlePageClient article={article} related={related} />
    </>
  );
}
