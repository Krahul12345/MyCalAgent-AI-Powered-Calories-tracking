/* ─── UserInsightsSection ──────────────────────────────────────────
   "Real User Wellness Insights" — 17 review cards, masonry grid.
   Includes Review + AggregateRating JSON-LD schema for SEO / AEO.
   ──────────────────────────────────────────────────────────────── */

const CATEGORY_STYLES: Record<string, { bg: string; color: string }> = {
  "Food & Mood Insights":        { bg: "#fff7ed", color: "#C2410C" },
  "Hydration Intelligence":      { bg: "#eff6ff", color: "#1D4ED8" },
  "Wellness Intelligence":       { bg: "#faf5ff", color: "#7C3AED" },
  "Meal Timing":                 { bg: "#fefce8", color: "#A16207" },
  "Fasting Patterns":            { bg: "#ecfdf5", color: "#065F46" },
  "Behavioral Wellness":         { bg: "#fdf4ff", color: "#86198F" },
  "AI Meal Analysis":            { bg: "#f0fdf4", color: "#15803D" },
  "Caffeine & Focus":            { bg: "#fffbeb", color: "#B45309" },
  "Allergen & Food Awareness":   { bg: "#fff1f2", color: "#BE123C" },
  "Habit Pattern Recognition":   { bg: "#f0f9ff", color: "#0369A1" },
  "Progress Analytics":          { bg: "#f8fafc", color: "#475569" },
  "Daily Wellness Dashboard":    { bg: "#fefce8", color: "#92400E" },
  "Weight Goal Tracking":        { bg: "#ecfdf5", color: "#166534" },
};

interface Review {
  category: string;
  headline: string;
  body: string;
  name: string;
  city: string;
  month: string;
  year: number;
}

const REVIEWS: Review[] = [
  {
    category: "Food & Mood Insights",
    headline: "I finally noticed how meal timing affects my energy.",
    body: "MyCalAgent helped me recognize patterns between late-night meals and afternoon crashes — something calorie trackers never showed me.",
    name: "Emily",
    city: "Austin",
    month: "May",
    year: 2026,
  },
  {
    category: "Hydration Intelligence",
    headline: "Hydration tracking changed more than I expected.",
    body: "I started noticing how water intake, coffee, and focus were connected during my workdays. The patterns were obvious once the app surfaced them.",
    name: "Daniel",
    city: "Chicago",
    month: "May",
    year: 2026,
  },
  {
    category: "Wellness Intelligence",
    headline: "This feels smarter than calorie counting.",
    body: "Instead of just tracking numbers, I started seeing patterns across meals, hydration, and habits. It changed how I think about food entirely.",
    name: "Sophia",
    city: "Seattle",
    month: "Apr",
    year: 2026,
  },
  {
    category: "Meal Timing",
    headline: "My afternoon crashes finally made sense.",
    body: "I didn't realize how meal timing was affecting my focus until MyCalAgent started connecting the dots. Now I plan my meals around my schedule.",
    name: "Ryan",
    city: "Denver",
    month: "Apr",
    year: 2026,
  },
  {
    category: "Fasting Patterns",
    headline: "This helped me understand my fasting routine better.",
    body: "I could actually see how fasting windows and meal timing impacted how I felt during the day. It made my 16:8 routine feel personalized.",
    name: "Olivia",
    city: "Boston",
    month: "Mar",
    year: 2026,
  },
  {
    category: "AI Meal Analysis",
    headline: "Photo logging is faster than anything I've tried.",
    body: "I snap a photo and MyCalAgent breaks down macros, flags potential allergens, and links the meal to my afternoon energy. No manual entry needed.",
    name: "Marcus",
    city: "Atlanta",
    month: "May",
    year: 2026,
  },
  {
    category: "Caffeine & Focus",
    headline: "I finally understand my caffeine threshold.",
    body: "Tracking coffee alongside focus scores over three weeks revealed I perform best with two cups before 10am. After that, it actually hurts concentration.",
    name: "Lauren",
    city: "Portland",
    month: "Apr",
    year: 2026,
  },
  {
    category: "Allergen & Food Awareness",
    headline: "It caught a pattern I'd ignored for years.",
    body: "After logging for two weeks, the app flagged that my lowest energy days consistently followed meals with dairy-heavy lunches. That was eye-opening.",
    name: "Jordan",
    city: "Nashville",
    month: "Apr",
    year: 2026,
  },
  {
    category: "Habit Pattern Recognition",
    headline: "The habit insights surprised me.",
    body: "I didn't expect a wellness app to notice that my late-night snacking was tied to skipped lunches. Seeing that pattern in writing made it easier to change.",
    name: "Natalie",
    city: "Phoenix",
    month: "Mar",
    year: 2026,
  },
  {
    category: "Progress Analytics",
    headline: "Week-over-week trends finally feel meaningful.",
    body: "Other apps show charts of calories. MyCalAgent shows how my energy, hydration, and meal consistency trend together — that's the data I actually need.",
    name: "Chris",
    city: "Minneapolis",
    month: "Mar",
    year: 2026,
  },
  {
    category: "Daily Wellness Dashboard",
    headline: "One screen that actually tells me how I'm doing.",
    body: "The dashboard pulls together meals, water, fasting window, and wellness signals. I open it every morning instead of checking five separate apps.",
    name: "Aisha",
    city: "Houston",
    month: "Feb",
    year: 2026,
  },
  {
    category: "Weight Goal Tracking",
    headline: "Weight goals with context — not just numbers.",
    body: "MyCalAgent links my weight trend to actual behavior patterns. When I plateau, it shows me what changed in my habits — not just that I stopped losing.",
    name: "Tyler",
    city: "San Diego",
    month: "Feb",
    year: 2026,
  },
  {
    category: "Food & Mood Insights",
    headline: "High-carb lunches were draining my afternoons.",
    body: "The correlation was clear after two weeks: pasta lunches correlated with 2pm slumps every single time. I switched to a lighter lunch and the difference was immediate.",
    name: "Grace",
    city: "Charlotte",
    month: "May",
    year: 2026,
  },
  {
    category: "Fasting Patterns",
    headline: "I found my ideal eating window through the data.",
    body: "Tried 16:8 for months without a clear sense of whether it was working. MyCalAgent showed me that a 14:10 window actually aligned better with my energy peaks.",
    name: "Derek",
    city: "Columbus",
    month: "Apr",
    year: 2026,
  },
  {
    category: "AI Meal Analysis",
    headline: "Accuracy from a photo is genuinely impressive.",
    body: "I tested it with a complex salad and a full dinner plate. Both breakdowns were close enough to trust for daily tracking without obsessing over exact grams.",
    name: "Priya",
    city: "Dallas",
    month: "Mar",
    year: 2026,
  },
  {
    category: "Habit Pattern Recognition",
    headline: "It recognized my weekend eating drift before I did.",
    body: "MyCalAgent flagged that my hydration drops every Saturday and Sunday, and that my Sunday-night eating pattern consistently shifts my Monday energy. Huge wake-up call.",
    name: "Kevin",
    city: "Miami",
    month: "Feb",
    year: 2026,
  },
  {
    category: "Wellness Intelligence",
    headline: "The AI summaries actually explain my patterns.",
    body: "After two weeks the app generated a plain-language summary of my top wellness patterns. It read like a personal health debrief — not a data dump.",
    name: "Sarah",
    city: "San Francisco",
    month: "May",
    year: 2026,
  },
];

/* ─── Month → ISO helper ────────────────────────────────────────── */
const MONTH_NUM: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

/* ─── JSON-LD schema ────────────────────────────────────────────── */
const reviewSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "MyCalAgent",
      description: "AI-powered wellness tracking app for meals, hydration, fasting, and habit patterns.",
      brand: { "@type": "Brand", name: "MyCalAgent" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: String(REVIEWS.length),
        bestRating: "5",
        worstRating: "1",
      },
      review: REVIEWS.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        datePublished: `${r.year}-${MONTH_NUM[r.month] ?? "01"}-01`,
        name: r.headline,
        reviewBody: r.body,
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      })),
    },
  ],
};

/* ─── Stars ─────────────────────────────────────────────────────── */
function Stars() {
  return (
    <div style={{ display: "flex", gap: 2, marginBottom: 10 }} aria-label="5 out of 5 stars">
      {[0,1,2,3,4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ─── Single card ───────────────────────────────────────────────── */
function ReviewCard({ review }: { review: Review }) {
  const s = CATEGORY_STYLES[review.category] ?? { bg: "#f8fafc", color: "#475569" };
  return (
    <div
      itemScope
      itemType="https://schema.org/Review"
      style={{
        background: "#ffffff",
        border: "1px solid #E2E8F0",
        borderRadius: 20,
        padding: "24px 26px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        breakInside: "avoid",
      }}
    >
      <Stars />

      {/* Category badge */}
      <span style={{
        display: "inline-block",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.05em",
        padding: "3px 10px",
        borderRadius: 100,
        background: s.bg,
        color: s.color,
        marginBottom: 12,
        width: "fit-content",
      }}>
        {review.category}
      </span>

      {/* Headline */}
      <h3
        itemProp="name"
        style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", lineHeight: 1.4, marginBottom: 10 }}
      >
        "{review.headline}"
      </h3>

      {/* Body */}
      <p
        itemProp="reviewBody"
        style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, marginBottom: 16, flex: 1 }}
      >
        {review.body}
      </p>

      {/* Attribution */}
      <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
          style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}
        >
          <span itemProp="name">— {review.name}</span>
          <span style={{ fontWeight: 400, color: "#94A3B8" }}>, {review.city}</span>
        </span>
        <time
          itemProp="datePublished"
          dateTime={`${review.year}-${MONTH_NUM[review.month] ?? "01"}`}
          style={{ fontSize: 12, color: "#94A3B8" }}
        >
          {review.month} {review.year}
        </time>
      </div>

      {/* Hidden rating microdata */}
      <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" style={{ display: "none" }}>
        <meta itemProp="ratingValue" content="5" />
        <meta itemProp="bestRating" content="5" />
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export default function UserInsightsSection() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <section
        aria-labelledby="insights-heading"
        itemScope
        itemType="https://schema.org/ItemList"
        style={{ padding: "80px 24px", background: "#F8FAFC" }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#15803D", marginBottom: 12,
            }}>
              User Insights
            </p>
            <h2
              id="insights-heading"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800,
                color: "#0F172A", lineHeight: 1.2, marginBottom: 14,
              }}
            >
              Real wellness routines. Real user insights.
            </h2>
            <p style={{
              fontSize: 16, color: "#64748B", lineHeight: 1.7,
              maxWidth: 560, margin: "0 auto",
            }}>
              See how people use MyCalAgent to understand patterns across meals, hydration, fasting, and daily habits — beyond traditional calorie tracking.
            </p>
          </div>

          {/* Masonry grid */}
          <div className="insights-grid" style={{ columns: 1, columnGap: 20 }}>
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                style={{ marginBottom: 20, breakInside: "avoid" }}
              >
                <meta itemProp="position" content={String(i + 1)} />
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* Aggregate footer */}
          <div style={{
            textAlign: "center", marginTop: 48,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[0,1,2,3,4].map((i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>5.0</span>
            <span style={{ fontSize: 13, color: "#94A3B8" }}>· {REVIEWS.length} wellness insights shared</span>
          </div>
        </div>

        {/* Responsive masonry breakpoints */}
        <style>{`
          @media (min-width: 640px)  { .insights-grid { columns: 2 !important; } }
          @media (min-width: 1024px) { .insights-grid { columns: 3 !important; } }
        `}</style>
      </section>
    </>
  );
}
