/**
 * Google Sheets CMS — MyCalAgent Blog
 *
 * Reads the `blog_articles` sheet using a service account.
 * Only rows with status="published" are returned publicly.
 *
 * Environment variables required:
 *   GOOGLE_SHEETS_ID             — the spreadsheet ID from the URL
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL — service account client_email
 *   GOOGLE_SERVICE_ACCOUNT_KEY   — service account private_key (newlines as \n)
 *
 * The system falls back to the static seed articles when Sheets credentials
 * are not configured so local dev works without a Google Cloud project.
 */

import { google } from "googleapis";

/* ─── Types ─────────────────────────────────────────────────────── */

export interface BlogArticle {
  id: string;
  status: string;            // "published" | "draft" | "archived"
  title: string;
  slug: string;              // e.g. "what-is-wellness-intelligence"
  excerpt: string;
  content: string;           // HTML or Markdown — rendered server-side
  category: string;
  tags: string[];
  source_name: string;
  source_url: string;
  author: string;
  ai_generated: boolean;
  reviewed_by: string;
  publish_date: string;      // ISO-8601 date string
  meta_title: string;
  meta_description: string;
  featured_image: string;
  faq_json: FaqItem[];
  canonical_url: string;
  created_at: string;
  updated_at: string;
  // Derived/computed
  read_time?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/* ─── Column index map (0-based, matches sheet column order) ─── */

const COL = {
  id: 0,
  status: 1,
  title: 2,
  slug: 3,
  excerpt: 4,
  content: 5,
  category: 6,
  tags: 7,
  source_name: 8,
  source_url: 9,
  author: 10,
  ai_generated: 11,
  reviewed_by: 12,
  publish_date: 13,
  meta_title: 14,
  meta_description: 15,
  featured_image: 16,
  faq_json: 17,
  canonical_url: 18,
  created_at: 19,
  updated_at: 20,
} as const;

/* ─── Helpers ───────────────────────────────────────────────────── */

function estimateReadTime(text: string): string {
  const words = text.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

function parseRow(row: string[]): BlogArticle | null {
  try {
    const get = (i: number) => (row[i] ?? "").trim();

    const status = get(COL.status).toLowerCase();
    const title = get(COL.title);
    const slug = get(COL.slug);

    // Reject rows missing the minimum required fields
    if (!title || !slug) return null;

    let faq_json: FaqItem[] = [];
    try { faq_json = JSON.parse(get(COL.faq_json)); } catch { /* empty */ }

    const tags = get(COL.tags)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const content = get(COL.content);

    return {
      id: get(COL.id),
      status,
      title,
      slug,
      excerpt: get(COL.excerpt),
      content,
      category: get(COL.category),
      tags,
      source_name: get(COL.source_name),
      source_url: get(COL.source_url),
      author: get(COL.author) || "MyCalAgent Team",
      ai_generated: get(COL.ai_generated).toLowerCase() === "true",
      reviewed_by: get(COL.reviewed_by),
      publish_date: get(COL.publish_date),
      meta_title: get(COL.meta_title) || title,
      meta_description: get(COL.meta_description) || get(COL.excerpt),
      featured_image: get(COL.featured_image),
      faq_json,
      canonical_url: get(COL.canonical_url) || `https://www.mycalagent.com/blog/${slug}`,
      created_at: get(COL.created_at),
      updated_at: get(COL.updated_at),
      read_time: estimateReadTime(content || get(COL.excerpt)),
    };
  } catch {
    return null;
  }
}

/* ─── Google Sheets client ──────────────────────────────────────── */

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!email || !key || !spreadsheetId) return null;

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: key },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

/* ─── In-process cache (survives across Next.js requests in prod) ─ */

interface CacheEntry {
  articles: BlogArticle[];
  ts: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
let _cache: CacheEntry | null = null;

async function fetchFromSheets(): Promise<BlogArticle[]> {
  const client = getSheetsClient();
  if (!client) return SEED_ARTICLES;

  // Serve from cache if fresh
  if (_cache && Date.now() - _cache.ts < CACHE_TTL_MS) {
    return _cache.articles;
  }

  try {
    const response = await client.sheets.spreadsheets.values.get({
      spreadsheetId: client.spreadsheetId,
      range: "Sheet1!A2:U",
    });

    const rows = response.data.values ?? [];
    const articles = rows
      .map((row) => parseRow(row as string[]))
      .filter((a): a is BlogArticle => a !== null);

    _cache = { articles, ts: Date.now() };
    return articles;
  } catch (err) {
    console.error("[sheets] fetch error:", err);
    // Return stale cache on error rather than failing
    if (_cache) return _cache.articles;
    return SEED_ARTICLES;
  }
}

/* ─── Public API ────────────────────────────────────────────────── */

export async function getPublishedArticles(): Promise<BlogArticle[]> {
  const all = await fetchFromSheets();
  return all
    .filter((a) => a.status === "published")
    .sort((a, b) => (b.publish_date > a.publish_date ? 1 : -1));
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | null> {
  const all = await fetchFromSheets();
  return all.find((a) => a.slug === slug && a.status === "published") ?? null;
}

export async function getFeaturedArticles(limit = 3): Promise<BlogArticle[]> {
  const published = await getPublishedArticles();
  return published.slice(0, limit);
}

export async function getAllArticles(): Promise<BlogArticle[]> {
  return fetchFromSheets();
}

/* ─── Seed articles (used when Sheets is not configured) ────────── */

const SEED_ARTICLES: BlogArticle[] = [
  {
    id: "1",
    status: "published",
    title: "What Is Wellness Intelligence? And Why It Matters More Than Calorie Counting",
    slug: "what-is-wellness-intelligence",
    excerpt: "Calorie counting tracks numbers. Wellness intelligence helps identify meaningful patterns across food, hydration, fasting, and daily habits.",
    content: `<h2>The Problem With Counting Calories</h2>
<p>Calorie counting is the most common diet strategy — and one of the most abandoned. By week three, most people stop. Not because they lack discipline, but because tracking every meal in a database is tedious, calorie numbers are inaccurate, and the feedback loop is weak. You know what you ate. You still don't know why you feel tired.</p>
<h2>What Wellness Intelligence Actually Means</h2>
<p>Wellness intelligence is the ability to connect cause and effect across your lifestyle data. Not just "I ate 1,800 calories" — but "on days when I eat a high-carb lunch and under-hydrate, I reliably experience a 2pm energy crash." The difference is actionable understanding versus a number.</p>
<h2>Why AI Makes This Possible Now</h2>
<p>The correlation between your lunch and your afternoon focus isn't visible in real time. It's only clear when you look at 20 data points. AI pattern recognition can process your full history, identify co-occurrences across multiple variables, and surface them in plain language.</p>
<h2>What Changes When You Have It</h2>
<p>When wellness intelligence is working, food decisions feel different. You're not fighting a calorie budget. You're using information about yourself — your patterns, your responses — to make choices that predictably make you feel better.</p>`,
    category: "AI Wellness",
    tags: ["wellness intelligence", "AI", "calorie counting", "patterns"],
    source_name: "MyCalAgent",
    source_url: "",
    author: "MyCalAgent Team",
    ai_generated: false,
    reviewed_by: "MyCalAgent Editorial",
    publish_date: "2026-05-08",
    meta_title: "What Is Wellness Intelligence? Why It Matters More Than Calorie Counting",
    meta_description: "Calorie counting tracks what you ate. Wellness intelligence reveals how it affected you. Discover why pattern recognition beats numbers.",
    featured_image: "",
    faq_json: [
      { question: "What is wellness intelligence?", answer: "Wellness intelligence is the ability to observe patterns across meals, hydration, fasting, and daily habits over time to understand how lifestyle choices affect how you feel." },
      { question: "How is wellness intelligence different from calorie counting?", answer: "Calorie counting tracks a single number. Wellness intelligence connects multiple data points — food, hydration, sleep, caffeine — to surface meaningful patterns about your energy, mood, and wellbeing." },
    ],
    canonical_url: "https://www.mycalagent.com/blog/what-is-wellness-intelligence",
    created_at: "2026-05-08",
    updated_at: "2026-05-08",
    read_time: "5 min read",
  },
  {
    id: "2",
    status: "published",
    title: "How What You Eat Affects Your Energy, Focus, and Mood",
    slug: "how-food-affects-energy-focus-mood",
    excerpt: "The connection between food and how you feel is not abstract — it is biochemical. Learn how meals, timing, and nutrients may shape energy and focus.",
    content: `<h2>Food Is Information</h2>
<p>Every meal you eat sends a cascade of signals through your body — hormones, neurotransmitters, blood sugar fluctuations. These biological responses directly shape your energy, concentration, and mood over the following hours.</p>
<h2>The Blood Sugar Connection</h2>
<p>High-glycemic meals cause rapid blood sugar spikes followed by crashes. These crashes — felt as fatigue, irritability, difficulty concentrating — are among the most common complaints of knowledge workers. Meal composition matters as much as meal size.</p>
<h2>Protein, Fat, and Cognitive Stability</h2>
<p>Meals higher in protein and healthy fats produce a more gradual glucose response, sustaining energy and focus over longer periods. The difference between a croissant breakfast and an egg breakfast becomes measurable within two hours.</p>
<h2>How MyCalAgent Surfaces These Patterns</h2>
<p>MyCalAgent tracks meals alongside self-reported wellness signals. Over 7–14 days, patterns become visible: which meal compositions correlate with afternoon energy, which hydration levels correlate with focus scores, which timing patterns align with your best days.</p>`,
    category: "Food & Mood",
    tags: ["food and mood", "energy", "focus", "nutrition patterns"],
    source_name: "MyCalAgent",
    source_url: "",
    author: "MyCalAgent Team",
    ai_generated: false,
    reviewed_by: "MyCalAgent Editorial",
    publish_date: "2026-05-10",
    meta_title: "How Food Affects Energy, Focus & Mood — MyCalAgent Blog",
    meta_description: "Discover the biochemical connection between what you eat and how you feel. Learn how meal timing, composition, and hydration shape daily energy.",
    featured_image: "",
    faq_json: [
      { question: "Can food affect my mood?", answer: "Yes. Meal composition influences blood sugar, neurotransmitter levels, and inflammatory markers — all of which affect mood, focus, and energy within hours of eating." },
      { question: "What foods improve focus?", answer: "Foods with a low glycemic index — including eggs, nuts, legumes, and most vegetables — tend to support more sustained mental energy compared to high-sugar or refined-carbohydrate meals." },
    ],
    canonical_url: "https://www.mycalagent.com/blog/how-food-affects-energy-focus-mood",
    created_at: "2026-05-10",
    updated_at: "2026-05-10",
    read_time: "6 min read",
  },
  {
    id: "3",
    status: "published",
    title: "The Hydration-Productivity Link: What Science Says About Water and Focus",
    slug: "hydration-productivity-science",
    excerpt: "Even mild dehydration can affect how you feel. Learn how hydration tracking may help reveal patterns in focus and daily energy.",
    content: `<h2>The Dehydration Threshold Is Lower Than You Think</h2>
<p>Research suggests that even 1–2% body water loss — too small to feel as thirst in many people — can measurably impair working memory, concentration, and reaction time. Most people are mildly dehydrated by mid-morning without realizing it.</p>
<h2>Water and Brain Function</h2>
<p>The brain is approximately 73% water. Cerebrospinal fluid, which cushions and nourishes brain tissue, depends on adequate hydration. When water intake drops, cognitive performance follows with a lag that makes the connection hard to notice in daily life.</p>
<h2>Tracking the Pattern</h2>
<p>The challenge with hydration is that its effects are delayed and subtle. You rarely feel the cognitive impact of under-hydration at the moment it begins. MyCalAgent tracks hydration logs alongside energy and mood signals, making the correlation visible over time.</p>`,
    category: "Hydration",
    tags: ["hydration", "productivity", "water", "focus", "cognitive performance"],
    source_name: "MyCalAgent",
    source_url: "",
    author: "MyCalAgent Team",
    ai_generated: false,
    reviewed_by: "MyCalAgent Editorial",
    publish_date: "2026-04-28",
    meta_title: "Hydration and Productivity: Science Behind Water and Focus — MyCalAgent",
    meta_description: "Even mild dehydration impairs focus and working memory. Learn how tracking hydration patterns with MyCalAgent reveals connections to daily energy.",
    featured_image: "",
    faq_json: [
      { question: "How much water should I drink for optimal focus?", answer: "General guidance is 8 cups (2L) per day, but individual needs vary based on body weight, activity level, and climate. MyCalAgent helps you track your intake relative to your wellness signals." },
    ],
    canonical_url: "https://www.mycalagent.com/blog/hydration-productivity-science",
    created_at: "2026-04-28",
    updated_at: "2026-04-28",
    read_time: "4 min read",
  },
  {
    id: "4",
    status: "published",
    title: "Intermittent Fasting Patterns: What AI Can Reveal About Your Fasting Windows",
    slug: "intermittent-fasting-ai-patterns",
    excerpt: "Not all fasting schedules work the same for everyone. AI pattern recognition can help surface how fasting windows align with your habits.",
    content: `<h2>The Problem With Generic Fasting Protocols</h2>
<p>16:8, 18:6, 5:2 — these protocols are averages. They describe what works for the median study participant, not for you specifically. Your schedule, stress load, sleep patterns, and metabolic individuality mean the "best" fasting window is personal data — not a generic recommendation.</p>
<h2>What AI Pattern Recognition Adds</h2>
<p>MyCalAgent tracks when you start and end your eating window, alongside energy, mood, and hunger signals. Over two to four weeks, patterns emerge: which window duration aligns with your best energy days, which breakfast timing correlates with sustained afternoon performance.</p>
<h2>Common Patterns Users Discover</h2>
<p>Some users find their optimal window is narrower than they expected. Others discover that their self-reported "16:8" is actually inconsistent — varying by two to three hours day to day — and that consistency, rather than duration, is the key variable.</p>`,
    category: "Intermittent Fasting",
    tags: ["intermittent fasting", "fasting windows", "AI patterns", "16:8", "metabolic health"],
    source_name: "MyCalAgent",
    source_url: "",
    author: "MyCalAgent Team",
    ai_generated: false,
    reviewed_by: "MyCalAgent Editorial",
    publish_date: "2026-04-21",
    meta_title: "Intermittent Fasting Patterns: What AI Reveals About Your Fasting Windows",
    meta_description: "Not all fasting schedules work the same. AI pattern recognition surfaces how your specific fasting windows align with energy and habit data.",
    featured_image: "",
    faq_json: [
      { question: "What is the best intermittent fasting schedule?", answer: "There is no universal best schedule. MyCalAgent uses AI to help surface which fasting window aligns best with your individual energy, hunger, and habit patterns." },
    ],
    canonical_url: "https://www.mycalagent.com/blog/intermittent-fasting-ai-patterns",
    created_at: "2026-04-21",
    updated_at: "2026-04-21",
    read_time: "7 min read",
  },
  {
    id: "5",
    status: "published",
    title: "How AI Detects Behavioral Patterns in Your Wellness Data",
    slug: "ai-behavioral-wellness-patterns",
    excerpt: "Behavioral wellness tracking goes beyond logging. It identifies recurring signals in how you eat, hydrate, rest, and feel.",
    content: `<h2>What Behavioral Pattern Detection Actually Does</h2>
<p>Behavioral pattern detection isn't magic — it's correlation at scale. An AI system reviews your logged data across many variables simultaneously, looking for combinations that appear repeatedly before the same outcomes. A single instance is noise. Fifteen instances across six weeks is a signal.</p>
<h2>Examples of Behavioral Patterns</h2>
<p>Common patterns MyCalAgent surfaces: late-night snacking that correlates with the following morning's low energy; high-caffeine days that correlate with poor sleep quality; skipped breakfast that correlates with higher afternoon calorie intake. These aren't predictions — they're observations from your own data.</p>
<h2>The Privacy Architecture</h2>
<p>Behavioral data is sensitive. MyCalAgent processes pattern detection on-device where possible, and any server-side processing uses encrypted, anonymized data. You own your wellness data, and you can export or delete it at any time.</p>`,
    category: "AI Wellness",
    tags: ["AI", "behavioral patterns", "wellness tracking", "privacy", "pattern recognition"],
    source_name: "MyCalAgent",
    source_url: "",
    author: "MyCalAgent Team",
    ai_generated: false,
    reviewed_by: "MyCalAgent Editorial",
    publish_date: "2026-04-14",
    meta_title: "How AI Detects Behavioral Wellness Patterns — MyCalAgent Blog",
    meta_description: "Learn how AI identifies recurring patterns in your wellness data — connecting meals, hydration, sleep, and habits to observable outcomes.",
    featured_image: "",
    faq_json: [
      { question: "How does AI detect wellness patterns?", answer: "AI reviews your logged data across multiple variables — meals, hydration, sleep, caffeine — looking for combinations that repeatedly appear before the same outcomes, such as energy crashes or productive mornings." },
    ],
    canonical_url: "https://www.mycalagent.com/blog/ai-behavioral-wellness-patterns",
    created_at: "2026-04-14",
    updated_at: "2026-04-14",
    read_time: "5 min read",
  },
  {
    id: "6",
    status: "published",
    title: "Meal Timing and Afternoon Energy Crashes: What Your Data Reveals",
    slug: "meal-timing-afternoon-energy",
    excerpt: "That afternoon slump is not always random. Meal timing, hydration, caffeine, and sleep patterns may all play a role.",
    content: `<h2>The 2pm Crash Is Not Inevitable</h2>
<p>The post-lunch energy dip is so common it's been naturalized as a biological inevitability. But research suggests it's not universal — and that its severity is significantly influenced by lunch composition, meal timing, hydration levels, and the previous night's sleep.</p>
<h2>Meal Timing and Circadian Alignment</h2>
<p>Your body's circadian system governs not just sleep but metabolic function, hormone secretion, and digestive enzyme activity. Meals eaten in alignment with this rhythm — larger meals earlier, smaller meals later — tend to produce less pronounced post-meal fatigue.</p>
<h2>What MyCalAgent Shows You</h2>
<p>By logging meals alongside energy levels, users typically see their afternoon crash patterns within two weeks. Some discover the crash appears after carbohydrate-heavy lunches. Others find it's primarily a hydration issue. Most find it's a combination of two or three factors that vary day to day.</p>`,
    category: "Productivity & Energy",
    tags: ["meal timing", "afternoon energy", "energy crash", "productivity", "circadian rhythm"],
    source_name: "MyCalAgent",
    source_url: "",
    author: "MyCalAgent Team",
    ai_generated: false,
    reviewed_by: "MyCalAgent Editorial",
    publish_date: "2026-03-30",
    meta_title: "Meal Timing and Afternoon Energy Crashes: What Your Data Reveals",
    meta_description: "The afternoon energy crash isn't inevitable. Discover how meal timing, composition, and hydration patterns affect your daily energy using MyCalAgent.",
    featured_image: "",
    faq_json: [
      { question: "Why do I feel tired after lunch?", answer: "Post-lunch fatigue can result from blood sugar fluctuations, circadian dips, meal composition, dehydration, or sleep debt. MyCalAgent helps identify which factors are most relevant to your personal patterns." },
    ],
    canonical_url: "https://www.mycalagent.com/blog/meal-timing-afternoon-energy",
    created_at: "2026-03-30",
    updated_at: "2026-03-30",
    read_time: "5 min read",
  },
];
