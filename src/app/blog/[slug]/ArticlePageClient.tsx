"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AppStoreButtons from "@/components/AppStoreButtons";
import Link from "next/link";
import { CheckCircle2, Zap, Calendar, Clock, User, Tag, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import type { BlogArticle } from "@/lib/sheets";

/* ─── Helpers ───────────────────────────────────────────────────── */

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.slice(0, 10).split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d) return dateStr;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

const CATEGORY_COLORS: Record<string, string> = {
  "AI Wellness": "#A855F7",
  "Food & Mood": "#F97316",
  "Hydration": "#0EA5E9",
  "Intermittent Fasting": "#10B981",
  "Wellness Intelligence": "#6366F1",
  "Productivity & Energy": "#F59E0B",
  "Privacy & Security": "#64748B",
  "App Updates": "#14B8A6",
};

const CATEGORY_BG: Record<string, string> = {
  "AI Wellness": "#faf5ff",
  "Food & Mood": "#fff7ed",
  "Hydration": "#f0f9ff",
  "Intermittent Fasting": "#ecfdf5",
  "Wellness Intelligence": "#eef2ff",
  "Productivity & Energy": "#fffbeb",
  "Privacy & Security": "#f8fafc",
  "App Updates": "#f0fdfa",
};

/* ─── AI Share Buttons ──────────────────────────────────────────── */

function trackAIShare(platform: string) {
  try {
    if (typeof window !== "undefined" && typeof (window as Window & { gtag?: (...args: unknown[]) => void }).gtag === "function") {
      (window as unknown as Window & { gtag: (...args: unknown[]) => void }).gtag("event", `ai_share_${platform}`, {
        event_category: "AI Share",
        event_label: platform,
      });
    }
  } catch { /* analytics not critical */ }
}

interface AIShareConfig {
  id: string;
  label: string;
  color: string;
  hoverBg: string;
  borderColor: string;
  textColor: string;
  logo: string;
  logoAlt: string;
  buildUrl: (prompt: string) => string;
}

const AI_LOGO_SIZE = 18;

const AI_PLATFORMS: AIShareConfig[] = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    color: "#10A37F",
    hoverBg: "#f0fdf9",
    borderColor: "#10A37F",
    textColor: "#065f46",
    logo: "/logos/chatgpt.svg",
    logoAlt: "ChatGPT",
    buildUrl: (p) => `https://chat.openai.com/?q=${encodeURIComponent(p)}`,
  },
  {
    id: "claude",
    label: "Claude",
    color: "#C2692A",
    hoverBg: "#fff8f1",
    borderColor: "#C2692A",
    textColor: "#7c3a0e",
    logo: "/logos/claude.svg",
    logoAlt: "Claude",
    buildUrl: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}`,
  },
  {
    id: "gemini",
    label: "Google AI Mode",
    color: "#4285F4",
    hoverBg: "#eff6ff",
    borderColor: "#4285F4",
    textColor: "#1e3a8a",
    logo: "/logos/google-ai.svg",
    logoAlt: "Google AI",
    buildUrl: (p) => `https://www.google.com/search?q=${encodeURIComponent(p)}&udm=50`,
  },
  {
    id: "perplexity",
    label: "Perplexity",
    color: "#20B2AA",
    hoverBg: "#f0fdfa",
    borderColor: "#20B2AA",
    textColor: "#134e4a",
    logo: "/logos/perplexity.svg",
    logoAlt: "Perplexity",
    buildUrl: (p) => `https://www.perplexity.ai/search?q=${encodeURIComponent(p)}`,
  },
];

function articlePreview(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 900);
}

function buildPrompt(article: BlogArticle, url: string, platformId: string): string {
  const basePrompt = `Summarize the key insights from ${url} and explain what this means for wellness tracking, hydration, food habits, and behavioral wellness. The article is titled: "${article.title}"`;

  if (platformId !== "gemini") {
    return basePrompt;
  }

  const tags = article.tags.length ? article.tags.join(", ") : "wellness tracking";
  const sources = article.source_name || "MyCalAgent editorial sources";
  const preview = articlePreview(article.content);

  return [
    `Summarize this MyCalAgent article and explain what it means for wellness tracking, hydration, food habits, and behavioral wellness.`,
    `Public URL: ${url}`,
    `Title: ${article.title}`,
    `Category: ${article.category}`,
    `Tags: ${tags}`,
    `Excerpt: ${article.excerpt}`,
    `Sources cited: ${sources}`,
    `If Google AI Mode has not indexed the URL yet, use this article preview as context instead of saying the article is unavailable: ${preview}`,
  ].join("\n");
}

function AIShareButtons({
  article,
  variant = "inline",
}: {
  article: BlogArticle;
  variant?: "inline" | "sticky" | "cta";
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const url = article.canonical_url || `https://www.mycalagent.com/blog/${article.slug}`;

  const isSticky = variant === "sticky";
  const isCta = variant === "cta";

  return (
    <div style={{
      display: "flex",
      flexDirection: isSticky ? "column" : "row",
      gap: isSticky ? 8 : 8,
      flexWrap: isSticky ? undefined : "wrap",
      alignItems: isSticky ? "stretch" : "center",
    }}>
      {!isSticky && (
        <div style={{ display: "flex", flexDirection: "column", gap: 1, flexShrink: 0, alignSelf: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>
            Explore with AI
          </span>
          <span style={{ fontSize: 11, color: "#94A3B8" }}>
            Compare perspectives across leading AI assistants.
          </span>
        </div>
      )}
      {AI_PLATFORMS.map((p) => {
        const isHovered = hoveredId === p.id;
        return (
          <a
            key={p.id}
            href={p.buildUrl(buildPrompt(article, url, p.id))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAIShare(p.id)}
            onMouseEnter={() => setHoveredId(p.id)}
            onMouseLeave={() => setHoveredId(null)}
            aria-label={`Discuss with ${p.label}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: isSticky ? "9px 14px" : "7px 14px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              border: `1.5px solid ${isHovered ? p.borderColor : "#E2E8F0"}`,
              background: isHovered ? p.hoverBg : "#fff",
              color: isHovered ? p.textColor : "#334155",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap",
              cursor: "pointer",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              boxShadow: isHovered ? `0 2px 12px ${p.color}22` : "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", filter: isHovered ? "brightness(1.1)" : "none", transition: "filter 0.15s ease" }}>
              <img src={p.logo} alt={p.logoAlt} width={AI_LOGO_SIZE} height={AI_LOGO_SIZE} style={{ display: "block", width: AI_LOGO_SIZE, height: AI_LOGO_SIZE }} aria-hidden="true" />
            </span>
            {p.label}
          </a>
        );
      })}
    </div>
  );
}

function StickyAISidebar({ article }: { article: BlogArticle }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: 24,
        transform: `translateY(-50%) translateX(${visible ? "0" : "120px"})`,
        transition: "transform 0.3s ease",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        padding: "14px 12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(21,128,61,0.08)",
        minWidth: 140,
      }}
      className="ai-sidebar"
    >
      <div style={{ marginBottom: 10, textAlign: "center" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#334155", marginBottom: 2 }}>
          Explore with AI
        </p>
        <p style={{ fontSize: 10, color: "#94A3B8", margin: 0, lineHeight: 1.4 }}>
          Compare across AI assistants.
        </p>
      </div>
      <AIShareButtons article={article} variant="sticky" />
    </div>
  );
}

/* ─── Other Subcomponents ───────────────────────────────────────── */

function KeyTakeawayBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: "32px 0", padding: "24px 28px", background: "linear-gradient(135deg, #ecfdf5, #d1fae5)", border: "1px solid #bbf7d0", borderRadius: 12, borderLeft: "4px solid #15803D" }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#15803D", marginBottom: 8 }}>Key Takeaway</p>
      <p style={{ fontSize: 15, color: "#0F172A", lineHeight: 1.7, margin: 0 }}>{children}</p>
    </div>
  );
}

function MyCalAgentSection({ article }: { article: BlogArticle }) {
  return (
    <div style={{ margin: "40px 0", padding: "28px 32px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#15803D", marginBottom: 8 }}>What This Means For MyCalAgent Users</p>
      <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, marginBottom: 20 }}>
        {article.category === "Hydration" && "Track your daily water intake alongside energy levels in MyCalAgent. Over 7–14 days, patterns connecting hydration and focus become visible — helping you build smarter hydration habits tailored to how your body responds."}
        {article.category === "Food & Mood" && "Log your meals with MyCalAgent and connect them to how you feel throughout the day. The AI surfaces correlations between meal composition, timing, and your energy or mood — giving you data-driven insight into your personal food patterns."}
        {article.category === "AI Wellness" && "MyCalAgent's AI pattern recognition analyzes your logged data across meals, hydration, sleep, and habits. After 7–14 days of consistent tracking, it surfaces the recurring patterns most relevant to your daily wellbeing."}
        {article.category === "Intermittent Fasting" && "MyCalAgent tracks your eating windows and correlates them with your energy and wellness signals. Over time, you'll see which fasting schedule aligns best with your personal habits and how your body responds."}
        {article.category === "Productivity & Energy" && "Log your meals, caffeine, and hydration in MyCalAgent alongside your energy levels. The AI connects the dots between your nutrition habits and your productive hours — revealing the patterns behind your best and worst days."}
        {article.category === "Privacy & Security" && "MyCalAgent is built on a privacy-first architecture. Your wellness data is encrypted, never sold, and always under your control. You can export or delete your data at any time from within the app."}
        {!["Hydration","Food & Mood","AI Wellness","Intermittent Fasting","Productivity & Energy","Privacy & Security"].includes(article.category) && "Use MyCalAgent to apply these insights to your own wellness data. The AI surfaces personal patterns after 7–14 days of consistent tracking — helping you understand what works for your body specifically."}
      </p>
      <AppStoreButtons className="justify-start" />
    </div>
  );
}

function DisclaimerSection() {
  return (
    <div style={{ margin: "32px 0", padding: "16px 20px", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8 }}>
      <p style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
        <strong style={{ color: "#64748B" }}>Disclaimer:</strong> This article is for informational purposes only. MyCalAgent does not provide medical advice, diagnosis, or treatment. The content reflects general wellness observations and research summaries. Always consult a qualified healthcare professional before making changes to your diet, health routine, or medical care.
      </p>
    </div>
  );
}

function FaqAccordion({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const [open, setOpen] = useState<number | null>(null);
  if (!faqs.length) return null;

  return (
    <section style={{ marginTop: 48 }}>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 20 }}>Frequently Asked Questions</h2>
      <div style={{ border: "1px solid #E2E8F0", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: i < faqs.length - 1 ? "1px solid #F1F5F9" : "none" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left" }}
              aria-expanded={open === i}
            >
              <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", lineHeight: 1.4 }}>{faq.question}</span>
              <span style={{ flexShrink: 0, color: "#64748B" }}>
                {open === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>
            {open === i && (
              <div style={{ padding: "0 24px 18px", fontSize: 14, color: "#64748B", lineHeight: 1.75 }}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

export default function ArticlePageClient({ article, related }: { article: BlogArticle; related: BlogArticle[] }) {
  const catColor = CATEGORY_COLORS[article.category] ?? "#15803D";
  const catBg = CATEGORY_BG[article.category] ?? "#ecfdf5";

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${article.canonical_url}#article`,
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publish_date,
        dateModified: article.updated_at || article.publish_date,
        author: { "@type": "Person", name: article.author || "MyCalAgent Team" },
        publisher: { "@type": "Organization", name: "MyCalAgent", url: "https://www.mycalagent.com", logo: { "@type": "ImageObject", url: "https://www.mycalagent.com/favicon.png" } },
        url: article.canonical_url,
        ...(article.featured_image ? { image: article.featured_image } : {}),
        keywords: article.tags.join(", "),
        articleSection: article.category,
        ...(article.source_name ? { citation: { "@type": "CreativeWork", name: article.source_name, url: article.source_url } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.mycalagent.com/blog" },
          { "@type": "ListItem", position: 3, name: article.title, item: article.canonical_url },
        ],
      },
      ...(article.faq_json?.length
        ? [{
            "@type": "FAQPage",
            "@id": `${article.canonical_url}#faq`,
            mainEntity: article.faq_json.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Sticky sidebar — desktop only */}
      <StickyAISidebar article={article} />

      <div style={{ background: "#F8FAFC", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Navigation />

        <main style={{ paddingTop: "80px" }}>
          {/* ── ARTICLE HEADER ── */}
          <header style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "48px 24px 40px" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              {/* Breadcrumb */}
              <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#94A3B8", marginBottom: 24 }} aria-label="Breadcrumb">
                <Link href="/" style={{ color: "#94A3B8", textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#15803D")} onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}>Home</Link>
                <span>/</span>
                <Link href="/blog" style={{ color: "#94A3B8", textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#15803D")} onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}>Blog</Link>
                <span>/</span>
                <span style={{ color: "#0F172A", fontWeight: 500 }}>{article.category}</span>
              </nav>

              {/* Category pill */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 100, background: catBg, color: catColor, border: `1px solid ${catColor}33`, marginBottom: 20 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: catColor, display: "inline-block" }} />
                {article.category}
              </span>

              {/* Title */}
              <h1 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.2, marginBottom: 16 }}>
                {article.title}
              </h1>

              {/* Excerpt */}
              <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.7, marginBottom: 24 }}>
                {article.excerpt}
              </p>

              {/* Meta row */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, color: "#64748B" }}>
                  <User size={13} />
                  {article.author || "MyCalAgent Team"}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, color: "#64748B" }}>
                  <Calendar size={13} />
                  {formatDate(article.publish_date)}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, color: "#64748B" }}>
                  <Clock size={13} />
                  {article.read_time}
                </span>
                {article.updated_at && article.updated_at !== article.publish_date && (
                  <span style={{ fontSize: 12, color: "#94A3B8" }}>Last Updated: {formatDate(article.updated_at)}</span>
                )}
              </div>

              {/* Editorial badges */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
                {article.reviewed_by && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: "#ecfdf5", color: "#15803D", border: "1px solid #bbf7d0" }}>
                    <CheckCircle2 size={11} />
                    Editorially Reviewed{article.reviewed_by !== "MyCalAgent Editorial" ? ` by ${article.reviewed_by}` : ""}
                  </span>
                )}
                {article.ai_generated && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: "#ede9fe", color: "#7C3AED", border: "1px solid #ddd6fe" }}>
                    <Zap size={11} />
                    AI-Assisted
                  </span>
                )}
                {article.source_name && (
                  <a href={article.source_url} target="_blank" rel="noopener noreferrer nofollow" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: "#F1F5F9", color: "#64748B", border: "1px solid #E2E8F0", textDecoration: "none" }}>
                    <ExternalLink size={11} />
                    Source: {article.source_name}
                  </a>
                )}
              </div>

              {/* ── AI SHARE BUTTONS — top of article ── */}
              <div style={{ padding: "16px 20px", background: "#F8FAFC", border: "1px solid #F1F5F9", borderRadius: 12 }}>
                <AIShareButtons article={article} variant="inline" />
              </div>
            </div>
          </header>

          {/* ── ARTICLE BODY ── */}
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>

            {/* Featured image */}
            {article.featured_image && (
              <div style={{ marginBottom: 36, display: "flex", justifyContent: "center" }}>
                <div style={{ maxWidth: 520, width: "100%", borderRadius: 12, overflow: "hidden", border: "1px solid #E2E8F0", background: "#fff" }}>
                  <img src={article.featured_image} alt={article.title} style={{ width: "100%", height: "auto", maxHeight: 540, objectFit: "contain", display: "block" }} />
                </div>
              </div>
            )}

            {/* Main content */}
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Key takeaway */}
            <KeyTakeawayBox>
              {article.excerpt}
            </KeyTakeawayBox>

            {/* What this means for users */}
            <MyCalAgentSection article={article} />

            {/* FAQ */}
            <FaqAccordion faqs={article.faq_json ?? []} />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #F1F5F9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <Tag size={13} color="#94A3B8" />
                  {article.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 100, background: "#F1F5F9", color: "#64748B", border: "1px solid #E2E8F0" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <DisclaimerSection />

            {/* ── AI SHARE CTA — bottom of article ── */}
            <div style={{ margin: "40px 0 32px", padding: "28px 32px", background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", border: "1px solid #E2E8F0", borderRadius: 16, borderTop: "3px solid #E2E8F0" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 6 }}>Continue the Conversation</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>Explore with AI</p>
              <p style={{ fontSize: 13, color: "#64748B", marginBottom: 20 }}>
                Compare perspectives across leading AI assistants — ChatGPT, Claude, Google AI, and Perplexity.
              </p>
              <AIShareButtons article={article} variant="cta" />
            </div>

            {/* Source attribution */}
            {article.source_name && (
              <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 16 }}>
                Original source: <a href={article.source_url} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "#64748B" }}>{article.source_name}</a>. Content independently reviewed and adapted by MyCalAgent editorial team.
              </p>
            )}
          </div>

          {/* ── RELATED ARTICLES ── */}
          {related.length > 0 && (
            <section style={{ background: "#fff", borderTop: "1px solid #E2E8F0", padding: "48px 24px" }}>
              <div style={{ maxWidth: 1180, margin: "0 auto" }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 28 }}>Related Articles</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="related-grid">
                  {related.map((a, i) => {
                    const rc = CATEGORY_COLORS[a.category];
                    return (
                      <Link key={i} href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "block" }}>
                        <article
                          style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "20px", cursor: "pointer", transition: "all 0.2s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)"; e.currentTarget.style.borderColor = "#bbf7d0"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#E2E8F0"; }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                            {rc && <span style={{ width: 5, height: 5, borderRadius: "50%", background: rc, display: "inline-block" }} />}
                            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#64748B" }}>{a.category}</span>
                            <span style={{ marginLeft: "auto", fontSize: 11, color: "#94A3B8" }}>{a.read_time}</span>
                          </div>
                          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", lineHeight: 1.4, marginBottom: 8 }}>{a.title}</h3>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#15803D" }}>Read →</span>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ── BACK TO BLOG ── */}
          <div style={{ textAlign: "center", padding: "32px 24px" }}>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "#15803D", textDecoration: "none" }}>
              ← Back to Blog
            </Link>
          </div>
        </main>

        <Footer />
      </div>

      <style>{`
        .article-prose {
          font-size: 16px;
          line-height: 1.8;
          color: #334155;
        }
        .article-prose h2 {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F172A;
          margin-top: 40px;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        .article-prose h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0F172A;
          margin-top: 28px;
          margin-bottom: 10px;
        }
        .article-prose p { margin-bottom: 18px; }
        .article-prose ul, .article-prose ol { padding-left: 24px; margin-bottom: 18px; }
        .article-prose li { margin-bottom: 6px; }
        .article-prose strong { color: #0F172A; font-weight: 700; }
        .article-prose a { color: #15803D; text-decoration: underline; }
        .article-prose blockquote {
          border-left: 3px solid #15803D;
          padding-left: 20px;
          margin: 24px 0;
          color: #475569;
          font-style: italic;
        }
        @media (max-width: 700px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
        /* Hide sticky sidebar unless there's enough room to avoid overlapping the 760px article column */
        @media (max-width: 1100px) {
          .ai-sidebar { display: none !important; }
        }
        button:focus-visible, a:focus-visible {
          outline: 2px solid #15803D;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}
