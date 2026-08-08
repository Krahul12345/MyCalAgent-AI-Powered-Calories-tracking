"use client";

import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ChevronDown, ChevronUp, Search, CheckCircle2, TrendingUp, Zap } from "lucide-react";
import type { BlogArticle } from "@/lib/sheets";

/* ─── Static data ───────────────────────────────────────────────── */

const CATEGORIES = [
  "All",
  "Food & Mood",
  "AI Wellness",
  "Hydration",
  "Intermittent Fasting",
  "Productivity & Energy",
  "Privacy & Security",
  "App Updates",
];

const TRENDING_TOPICS = [
  "AI meal analysis",
  "food and mood",
  "hydration patterns",
  "fasting windows",
  "wellness intelligence",
  "energy crashes",
  "behavioral patterns",
  "caffeine tracking",
];

const CATEGORY_COLORS: Record<string, { pill: string; dot: string; bg: string }> = {
  "AI Wellness":           { pill: "bg-purple-50 text-purple-700 border-purple-200",     dot: "#A855F7", bg: "#faf5ff" },
  "Food & Mood":           { pill: "bg-orange-50 text-orange-700 border-orange-200",     dot: "#F97316", bg: "#fff7ed" },
  "Hydration":             { pill: "bg-sky-50 text-sky-700 border-sky-200",              dot: "#0EA5E9", bg: "#f0f9ff" },
  "Intermittent Fasting":  { pill: "bg-emerald-50 text-emerald-700 border-emerald-200",  dot: "#10B981", bg: "#ecfdf5" },
  "Wellness Intelligence": { pill: "bg-indigo-50 text-indigo-700 border-indigo-200",     dot: "#6366F1", bg: "#eef2ff" },
  "Productivity & Energy": { pill: "bg-amber-50 text-amber-700 border-amber-200",        dot: "#F59E0B", bg: "#fffbeb" },
  "Privacy & Security":    { pill: "bg-slate-50 text-slate-700 border-slate-200",        dot: "#64748B", bg: "#f8fafc" },
  "App Updates":           { pill: "bg-teal-50 text-teal-700 border-teal-200",           dot: "#14B8A6", bg: "#f0fdfa" },
};

const FAQS = [
  {
    q: "What is wellness intelligence?",
    a: "Wellness intelligence is the ability to observe patterns across meals, hydration, fasting, and daily habits over time. Rather than tracking a single number like calories, it helps surface recurring connections between lifestyle choices and how you feel — such as energy levels, focus, and general wellbeing.",
  },
  {
    q: "How do AI meal and habit insight apps work?",
    a: "AI meal and habit apps use computer vision to identify foods from photos, estimate portions, and calculate nutritional content. Over time, they analyze logged data across multiple lifestyle signals to surface recurring patterns. MyCalAgent uses this approach to help users observe connections between their habits and how they feel.",
  },
  {
    q: "Can AI help me understand how food affects my body?",
    a: "AI can help surface patterns in your logged data — for example, showing that certain meal compositions or timings frequently appear before periods of low energy. These observations are informational and educational, not medical diagnoses.",
  },
  {
    q: "How does MyCalAgent protect privacy?",
    a: "MyCalAgent uses a privacy-first architecture: your health and wellness data is encrypted in transit and at rest, never sold to advertisers or third parties, and you retain full control to export or delete it at any time.",
  },
  {
    q: "Can I get weekly MyCalAgent blog updates?",
    a: "Yes. You can subscribe to the weekly wellness intelligence email below — one practical article per week covering AI wellness, food patterns, hydration, fasting, and privacy-first wellness tracking.",
  },
];

/* ─── Helpers ───────────────────────────────────────────────────── */

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  // Parse as UTC to avoid locale/timezone mismatch between server and client
  const parts = dateStr.slice(0, 10).split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d) return dateStr;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function CategoryPill({ category, small }: { category: string; small?: boolean }) {
  const c = CATEGORY_COLORS[category];
  if (!c) return null;
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: small ? 4 : 5,
      fontSize: small ? 10 : 11,
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      padding: small ? "2px 8px" : "3px 10px",
      borderRadius: 100,
      background: c.bg,
      border: `1px solid ${c.dot}33`,
      color: c.dot,
    }}>
      <span style={{ width: small ? 4 : 5, height: small ? 4 : 5, borderRadius: "50%", background: c.dot, flexShrink: 0, display: "inline-block" }} />
      {category}
    </span>
  );
}

function EditorialBadge({ article }: { article: BlogArticle }) {
  const isReviewed = !!article.reviewed_by;
  const isAI = article.ai_generated;
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
      {isReviewed && (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: "#ecfdf5", color: "#15803D", border: "1px solid #bbf7d0" }}>
          <CheckCircle2 size={10} />
          Editorially Reviewed
        </span>
      )}
      {isAI && (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: "#ede9fe", color: "#7C3AED", border: "1px solid #ddd6fe" }}>
          <Zap size={10} />
          AI-Assisted
        </span>
      )}
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

export default function BlogPageClient({ articles }: { articles: BlogArticle[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState("All topics");
  const [agreed, setAgreed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Derive available categories from fetched articles
  const availableCategories = useMemo(() => {
    const cats = new Set(articles.map((a) => a.category));
    return CATEGORIES.filter((c) => c === "All" || cats.has(c));
  }, [articles]);

  const filtered = useMemo(() => {
    let result = articles;
    if (activeCategory !== "All") {
      result = result.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [articles, activeCategory, searchQuery]);

  const featured = articles.find((a) => a.category === "AI Wellness") ?? articles[0];
  const gridArticles = filtered.slice(0, 9);

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.mycalagent.com/blog#page",
        name: "MyCalAgent Blog | AI Wellness, Food & Mood, Hydration & Fasting Insights",
        description: "Research-backed articles on AI wellness, meal insights, hydration, fasting, and daily habit patterns.",
        url: "https://www.mycalagent.com/blog",
        publisher: { "@type": "Organization", name: "MyCalAgent", url: "https://www.mycalagent.com" },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      ...articles.map((a) => ({
        "@type": "BlogPosting",
        headline: a.title,
        description: a.excerpt,
        datePublished: a.publish_date,
        dateModified: a.updated_at || a.publish_date,
        url: `https://www.mycalagent.com/blog/${a.slug}`,
        author: { "@type": "Person", name: a.author || "MyCalAgent Team" },
        publisher: { "@type": "Organization", name: "MyCalAgent", url: "https://www.mycalagent.com" },
      })),
    ],
  };

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !agreed) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/trial-signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (res.ok || res.status === 409) {
        setSubscribed(true);
      } else {
        setSubmitError(data?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ background: "#F8FAFC", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Navigation />

        <main style={{ paddingTop: "80px" }}>

          {/* ══ HERO ══ */}
          <section style={{ background: "#fff", borderBottom: "1px solid #E2E8F0" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="blog-hero-grid">
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#15803D", marginBottom: 16 }}>
                  Wellness Intelligence Blog
                </p>
                <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.15, marginBottom: 20 }}>
                  Insights That Help You<br />Understand Your Body
                </h1>
                <p style={{ fontSize: 17, color: "#64748B", lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
                  Research-backed articles on food &amp; mood, AI wellness, hydration, fasting, privacy, and the science of how daily habits shape how you feel.
                </p>

                {/* Search bar */}
                <div style={{ position: "relative", marginBottom: 24 }}>
                  <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }} />
                  <input
                    type="search"
                    placeholder="Search articles…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: "100%", paddingLeft: 40, paddingRight: 14, paddingTop: 11, paddingBottom: 11, border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: 14, color: "#0F172A", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {featured && (
                    <Link href={`/blog/${featured.slug}`} style={{ display: "inline-block", padding: "12px 24px", background: "#15803D", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                      Read Latest Article
                    </Link>
                  )}
                  <a href="#newsletter" style={{ display: "inline-block", padding: "12px 24px", background: "#fff", color: "#0F172A", border: "1.5px solid #E2E8F0", borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                    Get Weekly Insights
                  </a>
                </div>
              </div>

              {/* Right — latest insight card */}
              <div style={{ background: "linear-gradient(135deg, #ECFDF5 0%, #d1fae5 60%, #a7f3d0 100%)", borderRadius: 20, padding: 32, minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 24, right: 24, width: 80, height: 80, background: "rgba(21,128,61,0.12)", borderRadius: "50%" }} />
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 72, lineHeight: 1 }}>🧠</div>
                  <div style={{ marginTop: 8, display: "flex", justifyContent: "center", gap: 6 }}>
                    {["💧", "📊", "🌿", "⏱️", "✨"].map((e, i) => (
                      <span key={i} style={{ fontSize: 20, opacity: 0.7 + i * 0.06 }}>{e}</span>
                    ))}
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", borderRadius: 12, padding: "16px 20px" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#15803D", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Latest Insight</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", lineHeight: 1.4 }}>
                    {featured?.title?.slice(0, 55)}…
                  </p>
                  <p style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>{featured?.read_time} · {formatDate(featured?.publish_date ?? "")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ══ TRENDING TOPICS ══ */}
          <section style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "14px 0" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 12, overflowX: "auto" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: "#15803D", textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0 }}>
                <TrendingUp size={12} />
                Trending
              </span>
              {TRENDING_TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSearchQuery(topic)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    border: "1px solid #E2E8F0",
                    background: searchQuery === topic ? "#15803D" : "#F8FAFC",
                    color: searchQuery === topic ? "#fff" : "#64748B",
                    transition: "all 0.15s",
                    flexShrink: 0,
                  }}
                >
                  {topic}
                </button>
              ))}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{ padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid #fecaca", background: "#fef2f2", color: "#dc2626", flexShrink: 0 }}
                >
                  Clear ✕
                </button>
              )}
            </div>
          </section>

          {/* ══ CATEGORY FILTER PILLS ══ */}
          <section style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", position: "sticky", top: 64, zIndex: 30 }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", overflowX: "auto", display: "flex", gap: 8, paddingTop: 14, paddingBottom: 14 }}>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "6px 18px",
                    borderRadius: 100,
                    fontSize: 13,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    border: activeCategory === cat ? "1.5px solid #15803D" : "1.5px solid #E2E8F0",
                    background: activeCategory === cat ? "#15803D" : "#fff",
                    color: activeCategory === cat ? "#fff" : "#64748B",
                    transition: "all 0.15s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px" }}>

            {/* ══ FEATURED ARTICLE ══ */}
            {featured && (activeCategory === "All" || activeCategory === featured.category) && !searchQuery && (
              <section style={{ marginBottom: 56 }}>
                <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <article
                    style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: "40px 48px", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "start", cursor: "pointer", transition: "box-shadow 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748B" }}>Featured Article</span>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#CBD5E1", display: "inline-block" }} />
                        <CategoryPill category={featured.category} />
                      </div>
                      <h2 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: 12 }}>
                        {featured.title}
                      </h2>
                      <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, marginBottom: 16, maxWidth: 620 }}>
                        {featured.excerpt}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12, color: "#94A3B8" }}>Published: {formatDate(featured.publish_date)}</span>
                        <span style={{ fontSize: 12, color: "#94A3B8" }}>·</span>
                        <span style={{ fontSize: 12, color: "#94A3B8" }}>{featured.read_time}</span>
                        <span style={{ fontSize: 12, color: "#94A3B8" }}>·</span>
                        <span style={{ fontSize: 12, color: "#94A3B8" }}>{featured.author}</span>
                      </div>
                      <EditorialBadge article={featured} />
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#15803D", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 16 }}>
                        Read featured article →
                      </span>
                    </div>
                    <div style={{ background: "linear-gradient(135deg, #ECFDF5, #d1fae5)", borderRadius: 12, padding: "24px 28px", textAlign: "center", minWidth: 140, flexShrink: 0 }} className="featured-right-hide">
                      <div style={{ fontSize: 40, marginBottom: 8 }}>🧠</div>
                      <p style={{ fontSize: 11, fontWeight: 600, color: "#15803D", lineHeight: 1.4 }}>Wellness<br />Intelligence</p>
                    </div>
                  </article>
                </Link>
              </section>
            )}

            {/* ══ LATEST INSIGHTS GRID ══ */}
            <section style={{ marginBottom: 72 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A" }}>
                  {searchQuery ? `Search results for "${searchQuery}"` : activeCategory === "All" ? "Latest Insights" : activeCategory}
                </h2>
                <span style={{ fontSize: 13, color: "#94A3B8" }}>{filtered.length} article{filtered.length !== 1 ? "s" : ""}</span>
              </div>

              {gridArticles.length === 0 ? (
                <div style={{ textAlign: "center", padding: "64px 0" }}>
                  <p style={{ fontSize: 40, marginBottom: 12 }}>🔍</p>
                  <p style={{ color: "#64748B", fontWeight: 600, marginBottom: 8 }}>No articles found.</p>
                  <p style={{ color: "#94A3B8", fontSize: 13 }}>Try a different search term or category.</p>
                  <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} style={{ marginTop: 16, padding: "8px 20px", background: "#15803D", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                    Clear filters
                  </button>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="blog-grid">
                  {gridArticles.map((article, i) => {
                    const color = CATEGORY_COLORS[article.category];
                    return (
                      <Link key={i} href={`/blog/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
                        <article
                          style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "24px 24px 20px", height: "100%", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s, border-color 0.2s", cursor: "pointer" }}
                          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)"; e.currentTarget.style.borderColor = "#bbf7d0"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#E2E8F0"; }}
                        >
                          {/* Category + read time */}
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                            {color && <span style={{ width: 6, height: 6, borderRadius: "50%", background: color.dot, flexShrink: 0, display: "inline-block" }} />}
                            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#64748B" }}>
                              {article.category}
                            </span>
                            <span style={{ marginLeft: "auto", fontSize: 11, color: "#94A3B8", whiteSpace: "nowrap" }}>{article.read_time}</span>
                          </div>

                          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", lineHeight: 1.4, marginBottom: 10, flex: 1 }}>
                            {article.title}
                          </h3>

                          <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.65, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {article.excerpt}
                          </p>

                          {/* Editorial badges */}
                          {(article.reviewed_by || article.ai_generated) && (
                            <div style={{ marginBottom: 12 }}>
                              <EditorialBadge article={article} />
                            </div>
                          )}

                          {/* Tags */}
                          {article.tags.length > 0 && (
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
                              {article.tags.slice(0, 3).map((tag) => (
                                <span key={tag} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 100, background: "#F1F5F9", color: "#64748B", border: "1px solid #E2E8F0" }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F1F5F9", paddingTop: 14, marginTop: "auto" }}>
                            <span style={{ fontSize: 11, color: "#94A3B8" }}>{formatDate(article.publish_date)}</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#15803D" }}>Read →</span>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>

            {/* ══ BLOG HISTORY TABLE ══ */}
            <section style={{ marginBottom: 72 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>All Articles</h2>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 24 }}>
                Complete MyCalAgent article archive — AI wellness, food patterns, hydration, fasting, and privacy insights.
              </p>
              <div className="blog-table-wrap" style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                      {["Article", "Category", "Author", "Published", "Read Time", "Editorial"].map((h) => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748B", letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((a, i) => (
                      <tr
                        key={i}
                        style={{ borderBottom: "1px solid #F1F5F9", transition: "background 0.15s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAFA")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={{ padding: "14px 16px", maxWidth: 300 }}>
                          <Link href={`/blog/${a.slug}`} style={{ color: "#0F172A", fontWeight: 600, textDecoration: "none", lineHeight: 1.4, display: "block" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#15803D")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#0F172A")}
                          >
                            {a.title}
                          </Link>
                        </td>
                        <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                          <CategoryPill category={a.category} small />
                        </td>
                        <td style={{ padding: "14px 16px", color: "#64748B", whiteSpace: "nowrap", fontSize: 12 }}>{a.author}</td>
                        <td style={{ padding: "14px 16px", color: "#64748B", whiteSpace: "nowrap" }}>{formatDate(a.publish_date)}</td>
                        <td style={{ padding: "14px 16px", color: "#64748B", whiteSpace: "nowrap" }}>{a.read_time}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {a.reviewed_by ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: "#ecfdf5", color: "#15803D", border: "1px solid #bbf7d0" }}>
                              <CheckCircle2 size={10} />
                              Reviewed
                            </span>
                          ) : (
                            <span style={{ fontSize: 11, color: "#94A3B8" }}>—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ══ NEWSLETTER ══ */}
            <section id="newsletter" style={{ marginBottom: 72 }}>
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="newsletter-grid">
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#15803D", marginBottom: 12 }}>Weekly Insights</p>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", lineHeight: 1.2, marginBottom: 12 }}>
                    Get Weekly Wellness Intelligence
                  </h2>
                  <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, marginBottom: 16 }}>
                    One practical article per week on AI wellness, food patterns, hydration, fasting, and privacy-first wellness tracking. New articles from our Google Sheets editorial pipeline.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {["No spam — one article per week", "Editorially reviewed content", "Unsubscribe at any time"].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748B" }}>
                        <CheckCircle2 size={14} color="#15803D" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {subscribed ? (
                    <div style={{ background: "#ECFDF5", border: "1px solid #bbf7d0", borderRadius: 12, padding: "24px", textAlign: "center" }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                      <p style={{ fontWeight: 700, color: "#15803D", fontSize: 15 }}>You&apos;re subscribed.</p>
                      <p style={{ color: "#64748B", fontSize: 13, marginTop: 4 }}>We&apos;ll send one weekly article update.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: "11px 14px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: 14, color: "#0F172A", outline: "none", background: "#F8FAFC" }}
                      />
                      <select
                        value={focus}
                        onChange={(e) => setFocus(e.target.value)}
                        style={{ padding: "11px 14px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: 14, color: "#0F172A", background: "#F8FAFC", outline: "none" }}
                      >
                        {["All topics", "AI Wellness", "Food & Mood", "Hydration", "Fasting", "Privacy & Security"].map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#64748B", cursor: "pointer", lineHeight: 1.5 }}>
                        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ marginTop: 2, flexShrink: 0, accentColor: "#15803D" }} />
                        I agree to receive weekly MyCalAgent blog updates. I can unsubscribe anytime.
                      </label>
                      {submitError && <p style={{ fontSize: 13, color: "#dc2626", margin: 0 }}>{submitError}</p>}
                      <button
                        type="submit"
                        disabled={!agreed || submitting}
                        style={{ padding: "12px 20px", background: agreed && !submitting ? "#15803D" : "#CBD5E1", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: agreed && !submitting ? "pointer" : "not-allowed", transition: "background 0.15s" }}
                      >
                        {submitting ? "Subscribing…" : "Send Me Weekly Insights"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>

            {/* ══ FAQ ACCORDION ══ */}
            <section style={{ marginBottom: 72 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", marginBottom: 24 }}>AI Wellness Blog FAQs</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid #E2E8F0", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
                {FAQS.map((faq, i) => (
                  <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ width: "100%", padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left" }}
                      aria-expanded={openFaq === i}
                    >
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", lineHeight: 1.4 }}>{faq.q}</span>
                      <span style={{ flexShrink: 0, color: "#64748B" }}>
                        {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: "0 24px 20px", fontSize: 14, color: "#64748B", lineHeight: 1.75 }}>{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ══ DISCLAIMER ══ */}
            <div style={{ padding: "20px 24px", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: "#64748B" }}>Disclaimer:</strong> MyCalAgent provides wellness insights for informational purposes only. It does not diagnose, treat, or replace professional medical advice. Always consult a qualified healthcare professional for medical decisions.
              </p>
            </div>

          </div>
        </main>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .blog-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .newsletter-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .featured-right-hide { display: none !important; }
        }
        @media (max-width: 600px) {
          .blog-grid { grid-template-columns: 1fr !important; }
          .blog-table-wrap table { display: none; }
        }
        button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible {
          outline: 2px solid #15803D;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}
