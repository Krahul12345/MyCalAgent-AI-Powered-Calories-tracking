import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => readFileSync(path.join(root, file), "utf8");

const errors = [];
const warnings = [];

function requireFile(file) {
  if (!existsSync(path.join(root, file))) {
    errors.push(`Missing required visibility file: ${file}`);
    return "";
  }
  return read(file);
}

function requireIncludes(label, content, needles) {
  for (const needle of needles) {
    if (!content.includes(needle)) {
      errors.push(`${label} is missing: ${needle}`);
    }
  }
}

function warnUnlessIncludes(label, content, needles) {
  const normalized = content.toLowerCase();
  for (const needle of needles) {
    if (!normalized.includes(needle.toLowerCase())) {
      warnings.push(`${label} does not mention: ${needle}`);
    }
  }
}

function walk(dir) {
  const full = path.join(root, dir);
  if (!existsSync(full)) return [];

  return readdirSync(full).flatMap((entry) => {
    const absolute = path.join(full, entry);
    const relative = path.relative(root, absolute).replaceAll("\\", "/");
    if (statSync(absolute).isDirectory()) return walk(relative);
    return [relative];
  });
}

const layout = requireFile("src/app/layout.tsx");
const sitemap = requireFile("src/app/sitemap.ts");
const robots = requireFile("src/app/robots.ts");
const llms = requireFile("src/app/llms.txt/route.ts");

requireIncludes("layout metadata", layout, [
  "metadataBase: new URL('https://www.mycalagent.com')",
  "alternates:",
  "canonical:",
  "'@type': 'Organization'",
  "'@type': 'WebSite'",
  "'@type': 'MobileApplication'",
  "application/ld+json",
]);

requireIncludes("robots", robots, [
  "https://www.mycalagent.com/sitemap.xml",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot",
]);

requireIncludes("llms.txt route", llms, [
  "MyCalAgent",
  "AI Wellness Intelligence",
  "/sitemap.xml",
  "App Store",
  "Google Play",
  "Frequently Asked Questions",
]);

const publicSitemapRoutes = [
  "/",
  "/features",
  "/features/upcoming",
  "/download",
  "/pricing",
  "/get-started",
  "/how-mycalagent-works",
  "/macro-calorie-calculator",
  "/blog",
  "/ai-wellness-insights",
  "/faq",
  "/research",
  "/comparisons/mycalagent-vs-myfitnesspal",
  "/comparisons/best-calorie-tracking-apps-2025",
  "/about",
  "/editorial-policy",
  "/ai-disclaimer",
  "/privacy",
  "/terms",
  "/security",
];

for (const route of publicSitemapRoutes) {
  const routeLiteral = route === "/" ? "baseUrl" : route;
  if (!sitemap.includes(routeLiteral)) {
    errors.push(`sitemap.ts is missing public route: ${route}`);
  }
}

const publicPageFiles = walk("src/app")
  .filter((file) => file.endsWith("/page.tsx") || file === "src/app/page.tsx")
  .filter((file) => !file.includes("/api/"))
  .filter((file) => !file.includes("/checkout/"))
  .filter((file) => !file.includes("/login/"))
  .filter((file) => !file.includes("/register/"))
  .filter((file) => !file.includes("/survey/"))
  .filter((file) => !file.includes("/analytics/"));

for (const file of publicPageFiles) {
  const content = read(file);
  const routeDir = path.dirname(file);
  const routeLayout = `${routeDir}/layout.tsx`;
  const routeLayoutContent = existsSync(path.join(root, routeLayout)) ? read(routeLayout) : "";
  const hasMetadata =
    file === "src/app/page.tsx" ||
    /export\s+(const\s+metadata|async\s+function\s+generateMetadata|function\s+generateMetadata)/.test(content) ||
    /export\s+(const\s+metadata|async\s+function\s+generateMetadata|function\s+generateMetadata)/.test(routeLayoutContent);
  const hasJsonLd = content.includes("application/ld+json") || content.includes("@context") || content.includes("FAQPage");
  if (!hasMetadata) warnings.push(`${file} has no page-level metadata export`);
  if (!hasJsonLd) warnings.push(`${file} has no obvious structured-data signal`);
}

warnUnlessIncludes("llms.txt route", llms, [
  "privacy-first",
  "evidence-based",
  "wellness pattern recognition",
]);

console.log("AEO/GEO visibility audit");
console.log(`Checked ${publicPageFiles.length} public page files.`);

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length) {
  console.error(`\nErrors (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("\nVisibility audit passed.");
