"use client";

import { useState, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Link from "next/link";

/* ─── App store URLs ─────────────────────────────────────────────── */
const APP_STORE  = "https://apps.apple.com/us/app/mycalagent/id6759270828";
const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.mycalagent.app";

function getStoreUrl(): string {
  if (typeof navigator === "undefined") return APP_STORE;
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return PLAY_STORE;
  if (/iphone|ipad|ipod/i.test(ua)) return APP_STORE;
  // Desktop / unknown — open App Store as default (primary platform)
  return APP_STORE;
}

/* ─── Types ─────────────────────────────────────────────────────── */
type Goal = "loss" | "maintain" | "gain";
type Gender = "male" | "female";
type HeightUnit = "cm" | "ft";
type WeightUnit = "kg" | "lbs";

interface Results {
  bmr: number;
  tdee: number;
  target: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  water: number;
  bmi: number;
  bmiCategory: string;
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
}

/* ─── Activity multipliers ──────────────────────────────────────── */
const STEPS_MULT: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};
const EXERCISE_MULT: Record<string, number> = {
  none: 1.2,
  light: 1.375,
  moderate: 1.55,
  heavy: 1.725,
  athlete: 1.9,
};

function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25.0) return "Normal weight";
  if (bmi < 30.0) return "Overweight";
  return "Obese";
}

function getBmiColor(bmi: number): string {
  if (bmi < 18.5) return "#3B82F6";
  if (bmi < 25.0) return "#15803D";
  if (bmi < 30.0) return "#F59E0B";
  return "#EF4444";
}

/* ─── JSON-LD schema ────────────────────────────────────────────── */
const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.mycalagent.com/macro-calorie-calculator#webpage",
      url: "https://www.mycalagent.com/macro-calorie-calculator",
      name: "Free Macro & Calorie Calculator — BMR, TDEE, Protein, Carbs, Fats | MyCalAgent",
      description:
        "Calculate your daily calorie needs, macro breakdown (protein, carbs, fats, fiber), and hydration target using the Mifflin-St Jeor equation. Free tool by MyCalAgent.",
      inLanguage: "en",
      isPartOf: { "@id": "https://www.mycalagent.com/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
          {
            "@type": "ListItem",
            position: 2,
            name: "Macro & Calorie Calculator",
            item: "https://www.mycalagent.com/macro-calorie-calculator",
          },
        ],
      },
    },
    {
      "@type": "WebApplication",
      name: "MyCalAgent Macro & Calorie Calculator",
      applicationCategory: "HealthApplication",
      url: "https://www.mycalagent.com/macro-calorie-calculator",
      description:
        "Free macro and calorie calculator using the Mifflin-St Jeor formula. Calculates BMR, TDEE, target calories, protein, carbs, fats, fiber, and daily hydration.",
      featureList: [
        "BMR calculation (Mifflin-St Jeor equation)",
        "TDEE calculation",
        "BMI classification",
        "Macro breakdown (protein, carbs, fats)",
        "Fiber recommendation",
        "Daily hydration estimate",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "HowTo",
      name: "How to Calculate Your Daily Macros and Calories",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Select your wellness goal",
          text: "Choose Weight Loss, Maintain Weight, or Gain Muscle to set your caloric target.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Enter your biometric details",
          text: "Enter your gender, age, height, and weight in your preferred units.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Set your activity level",
          text: "Choose your average daily steps and structured exercise frequency.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "View your results",
          text: "Click Calculate My Macros to see your BMR, TDEE, target calories, macronutrient breakdown, and daily hydration goal.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the Mifflin-St Jeor equation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Mifflin-St Jeor equation is a validated formula for estimating Basal Metabolic Rate (BMR). Published in 1990, it is considered more accurate than the older Harris-Benedict equation. It uses weight, height, age, and sex as inputs.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between BMR and TDEE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest to maintain basic physiological functions. TDEE (Total Daily Energy Expenditure) multiplies BMR by an activity factor to account for movement, exercise, and daily activities.",
          },
        },
        {
          "@type": "Question",
          name: "How are macros calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Macros are calculated as a percentage of your target daily calories. This calculator uses a standard distribution: 30% protein (4 kcal/g), 40% carbohydrates (4 kcal/g), and 30% fat (9 kcal/g). Fiber is estimated at 14g per 1,000 kcal consumed.",
          },
        },
        {
          "@type": "Question",
          name: "How much protein do I need per day?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Protein needs vary by goal and body weight. General guidelines recommend 0.8g/kg for sedentary adults (WHO/RDA), 1.2–1.6g/kg for active adults, and up to 1.6–2.2g/kg for those building muscle (ISSN position stand). This calculator uses 30% of target calories from protein.",
          },
        },
        {
          "@type": "Question",
          name: "How much water should I drink per day?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This calculator uses the commonly cited estimate of 33ml per kg of body weight per day. The National Academies of Medicine recommends approximately 3.7L/day for men and 2.7L/day for women from all sources (food and beverages). Individual needs vary based on climate, activity, and health status.",
          },
        },
        {
          "@type": "Question",
          name: "Is this calculator accurate for everyone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Mifflin-St Jeor equation provides estimates with approximately ±10% accuracy for most adults aged 18–80. It may be less accurate for very muscular individuals, people with metabolic conditions, or extreme body compositions. Always consult a registered dietitian for personalized nutrition guidance.",
          },
        },
      ],
    },
  ],
};

/* ─── Input style helpers ───────────────────────────────────────── */
const inp: React.CSSProperties = {
  width: "100%",
  border: "1px solid #CBD5E1",
  borderRadius: 10,
  padding: "10px 14px",
  fontSize: 15,
  color: "#0F172A",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
  appearance: "none" as const,
  WebkitAppearance: "none" as const,
};

const lbl: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#334155",
  marginBottom: 6,
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "11px 0",
  borderBottom: "1px solid #F1F5F9",
  fontSize: 14,
  color: "#475569",
};

/* ─── Macro bar ─────────────────────────────────────────────────── */
function MacroBar({ label, grams, pct, color, emoji }: { label: string; grams: number; pct: number; color: string; emoji: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 14, color: "#334155", fontWeight: 500 }}>{emoji} {label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{grams}g <span style={{ fontSize: 12, fontWeight: 400, color: "#94A3B8" }}>({pct}%)</span></span>
      </div>
      <div style={{ height: 8, background: "#F1F5F9", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}

/* ─── BMI gauge ─────────────────────────────────────────────────── */
function BmiGauge({ bmi, category }: { bmi: number; category: string }) {
  const clampedBmi = Math.min(Math.max(bmi, 15), 40);
  const pct = ((clampedBmi - 15) / 25) * 100;
  const color = getBmiColor(bmi);
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ height: 10, background: "linear-gradient(to right, #3B82F6 0%, #22C55E 30%, #F59E0B 65%, #EF4444 100%)", borderRadius: 99, position: "relative", marginBottom: 6 }}>
        <div style={{ position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%,-50%)", width: 16, height: 16, borderRadius: "50%", background: color, border: "2.5px solid #fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94A3B8", marginBottom: 4 }}>
        <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
      </div>
      <p style={{ textAlign: "center", fontSize: 13, color, fontWeight: 700, marginTop: 6 }}>{bmi.toFixed(1)} — {category}</p>
    </div>
  );
}

/* ─── Section: How to use your results ─────────────────────────── */
const HOW_TO_CARDS = [
  {
    icon: "🔥",
    title: "Use BMR as your floor",
    body: "Your BMR is the minimum calories needed to sustain life at rest. Never eat below your BMR for extended periods — it triggers metabolic adaptation and muscle loss.",
  },
  {
    icon: "⚡",
    title: "TDEE is your maintenance",
    body: "Eating at TDEE keeps your weight stable. A 500 kcal daily deficit from TDEE yields roughly 0.5 kg/week of fat loss — the scientifically recommended rate for preserving lean mass.",
  },
  {
    icon: "🥚",
    title: "Prioritise protein",
    body: "Protein preserves muscle during a deficit, supports satiety, and has the highest thermic effect of any macro (~25–30%). Aim to hit your protein target first, then fill carbs and fat around it.",
  },
  {
    icon: "💧",
    title: "Hydration shifts everything",
    body: "Even mild dehydration (1–2% body weight) impairs cognitive performance and increases perceived hunger. Your water target is a minimum — add ~500ml per hour of exercise.",
  },
];

/* ─── Source citations ──────────────────────────────────────────── */
const SOURCES = [
  {
    id: 1,
    title: "Mifflin MD et al. (1990). A new predictive equation for resting energy expenditure.",
    journal: "American Journal of Clinical Nutrition, 51(2), 241–247.",
    url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
  },
  {
    id: 2,
    title: "Harris JA, Benedict FG (1918). A biometric study of human basal metabolism.",
    journal: "Proceedings of the National Academy of Sciences, 4(12), 370–373.",
    url: "https://pubmed.ncbi.nlm.nih.gov/16576330/",
  },
  {
    id: 3,
    title: "Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids.",
    journal: "National Academies of Sciences (2005). Institute of Medicine.",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK56068/",
  },
  {
    id: 4,
    title: "Stokes T et al. (2018). Recent perspectives regarding the role of dietary protein for the promotion of muscle hypertrophy.",
    journal: "Nutrients, 10(2), 180. MDPI.",
    url: "https://pubmed.ncbi.nlm.nih.gov/29414855/",
  },
  {
    id: 5,
    title: "Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate.",
    journal: "National Academies of Sciences (2005). Institute of Medicine.",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK56168/",
  },
  {
    id: 6,
    title: "Kreider RB et al. (2017). ISSN exercise & sports nutrition review update: research & recommendations.",
    journal: "Journal of the International Society of Sports Nutrition, 14, 33.",
    url: "https://pubmed.ncbi.nlm.nih.gov/28919842/",
  },
  {
    id: 7,
    title: "WHO/FAO/UNU Expert Consultation (2004). Human energy requirements.",
    journal: "FAO Food and Nutrition Technical Report Series 1. Rome: FAO.",
    url: "https://www.fao.org/3/y5686e/y5686e00.htm",
  },
];

/* ─── FAQ items ─────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: "What is the Mifflin-St Jeor equation?",
    a: "Published by Mifflin et al. in 1990, the Mifflin-St Jeor equation is consistently ranked the most accurate validated formula for estimating Basal Metabolic Rate in the general adult population. It uses weight (kg), height (cm), age (years), and biological sex as inputs.",
  },
  {
    q: "How accurate is this calculator?",
    a: "The Mifflin-St Jeor equation has a ±10% standard error in most adults aged 18–80. It performs best for average body compositions and may underestimate BMR in highly muscular individuals or overestimate it in those with obesity.",
  },
  {
    q: "What does TDEE mean and how is it different from BMR?",
    a: "BMR is the energy needed to sustain life at complete rest — breathing, circulation, cell repair. TDEE multiplies BMR by an activity factor to account for daily movement and structured exercise. Your TDEE is the number of calories you need to eat to maintain your current weight.",
  },
  {
    q: "How many grams of protein do I need per day?",
    a: "The general RDA is 0.8g of protein per kg of body weight. Research (ISSN, 2017) suggests 1.4–2.0g/kg for active adults and 1.6–2.4g/kg when in a caloric deficit to preserve muscle mass. This calculator uses 30% of target calories from protein as a baseline.",
  },
  {
    q: "Should I eat at my TDEE or my target calories?",
    a: "Eat at your target calories — not TDEE — to move toward your goal. If your goal is weight loss, your target is TDEE minus 500 kcal. If your goal is muscle gain, your target is TDEE plus 300 kcal. Eating at TDEE maintains current weight.",
  },
  {
    q: "How is daily water intake calculated?",
    a: "This calculator estimates hydration at 33ml per kg of body weight per day — a widely cited general guideline. The National Academies of Medicine AI for total water is 3.7L/day for men and 2.7L/day for women from all sources. Add ~500ml per hour of moderate exercise.",
  },
  {
    q: "What is BMI and how is it classified?",
    a: "Body Mass Index (BMI) is weight (kg) divided by height² (m²). WHO classification: <18.5 = Underweight, 18.5–24.9 = Normal weight, 25–29.9 = Overweight, ≥30 = Obese. BMI is a population-level screening tool and does not account for muscle mass, bone density, or fat distribution.",
  },
  {
    q: "Is this calculator a substitute for medical advice?",
    a: "No. This calculator provides general estimates for wellness awareness. Results vary based on individual physiology, health conditions, and goals. Always consult a registered dietitian or licensed healthcare provider before making significant changes to your diet.",
  },
];

/* ─── Component ─────────────────────────────────────────────────── */
export default function MacroCalorieCalculatorPage() {
  const [goal, setGoal] = useState<Goal>("loss");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<string>("30");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [heightCm, setHeightCm] = useState<string>("170");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("7");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [weightVal, setWeightVal] = useState<string>("70");
  const [steps, setSteps] = useState<string>("sedentary");
  const [exercise, setExercise] = useState<string>("none");
  const [results, setResults] = useState<Results | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleStoreRedirect = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(getStoreUrl(), "_blank", "noopener,noreferrer");
  }, []);

  function calculate() {
    const ageNum = Math.max(18, Math.min(80, Number(age) || 30));

    let hcm: number;
    if (heightUnit === "cm") {
      hcm = Number(heightCm) || 170;
    } else {
      hcm = (Number(heightFt) || 5) * 30.48 + (Number(heightIn) || 7) * 2.54;
    }

    const wkg =
      weightUnit === "kg"
        ? Number(weightVal) || 70
        : (Number(weightVal) || 154) * 0.453592;

    const bmr = Math.round(
      gender === "male"
        ? 10 * wkg + 6.25 * hcm - 5 * ageNum + 5
        : 10 * wkg + 6.25 * hcm - 5 * ageNum - 161
    );

    const mult = Math.max(
      STEPS_MULT[steps] ?? 1.2,
      EXERCISE_MULT[exercise] ?? 1.2
    );
    const tdee = Math.round(bmr * mult);

    const target =
      goal === "loss"
        ? tdee - 500
        : goal === "gain"
        ? tdee + 300
        : tdee;

    const protein = Math.round((target * 0.30) / 4);
    const carbs = Math.round((target * 0.40) / 4);
    const fat = Math.round((target * 0.30) / 9);
    const fiber = Math.round(wkg * 0.29);
    const water = Math.round(wkg * 0.033 * 100) / 100;

    const bmi = Math.round((wkg / ((hcm / 100) ** 2)) * 10) / 10;
    const bmiCategory = getBmiCategory(bmi);

    const totalMacroCals = protein * 4 + carbs * 4 + fat * 9;
    const proteinPct = Math.round((protein * 4 / totalMacroCals) * 100);
    const carbsPct = Math.round((carbs * 4 / totalMacroCals) * 100);
    const fatPct = Math.round((fat * 9 / totalMacroCals) * 100);

    setResults({ bmr, tdee, target, protein, carbs, fat, fiber, water, bmi, bmiCategory, proteinPct, carbsPct, fatPct });
  }

  const goalLabel = goal === "loss" ? "Weight Loss" : goal === "gain" ? "Muscle Gain" : "Maintenance";
  const goalColor = goal === "loss" ? "#3B82F6" : goal === "gain" ? "#15803D" : "#F59E0B";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <div className="relative min-h-screen bg-[#F8FAFC]">
        <Navigation />

        <main style={{ paddingTop: 80 }}>

          {/* ── HERO ── */}
          <section style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "56px 24px 48px" }}>
            <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "#94A3B8", marginBottom: 20 }}>
                <Link href="/" style={{ color: "#94A3B8", textDecoration: "none" }}>Home</Link>
                <span style={{ margin: "0 6px" }}>›</span>
                <span style={{ color: "#334155" }}>Macro &amp; Calorie Calculator</span>
              </nav>

              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#15803D", marginBottom: 14 }}>
                Free Tool · Evidence-Based
              </p>
              <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.15, marginBottom: 16 }}>
                Macro &amp; Calorie Calculator
              </h1>
              <p style={{ fontSize: 17, color: "#64748B", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 28px" }}>
                Calculate your daily calorie needs, macronutrient targets, BMI, and hydration goal using the clinically validated <strong style={{ color: "#334155" }}>Mifflin-St Jeor equation</strong> — the gold standard for BMR estimation since 1990.
              </p>

              {/* Trust badges */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
                {[
                  "📐 Mifflin-St Jeor Formula",
                  "🔬 Evidence-Based",
                  "🔒 No Sign-Up Required",
                  "📱 Works on All Devices",
                ].map((badge) => (
                  <span key={badge} style={{ fontSize: 12, fontWeight: 600, color: "#334155", background: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: 100, padding: "5px 14px" }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── CALCULATOR ── */}
          <section
            id="calculator"
            aria-labelledby="calc-heading"
            style={{ padding: "52px 24px" }}
          >
            <div style={{ maxWidth: 1020, margin: "0 auto" }}>

              <div className="calc-main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

                {/* ─ LEFT: Inputs ─ */}
                <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 20, padding: "28px 28px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                  <h2 id="calc-heading" style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 20 }}>Your Details</h2>

                  {/* Goal */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={lbl}>Goal</label>
                    <div style={{ position: "relative" }}>
                      <select value={goal} onChange={e => setGoal(e.target.value as Goal)} style={inp}>
                        <option value="loss">🏃 Weight Loss (−500 kcal/day)</option>
                        <option value="maintain">⚖️ Maintain Weight</option>
                        <option value="gain">💪 Gain Muscle (+300 kcal/day)</option>
                      </select>
                      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748B", fontSize: 12 }}>▼</span>
                    </div>
                  </div>

                  {/* Gender */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={lbl}>Biological Sex</label>
                    <div style={{ display: "flex", gap: 24 }}>
                      {(["male", "female"] as Gender[]).map(g => (
                        <label key={g} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#334155", fontWeight: 500 }}>
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={gender === g}
                            onChange={() => setGender(g)}
                            style={{ accentColor: "#15803D", width: 16, height: 16, cursor: "pointer" }}
                          />
                          {g.charAt(0).toUpperCase() + g.slice(1)}
                        </label>
                      ))}
                    </div>
                    <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 5 }}>Used for Mifflin-St Jeor BMR formula (sex-specific constant).</p>
                  </div>

                  {/* Age */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={lbl}>Age (years)</label>
                    <input type="number" min={18} max={80} value={age} onChange={e => setAge(e.target.value)} style={inp} placeholder="30" />
                    <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 5 }}>Formula validated for ages 18–80.</p>
                  </div>

                  {/* Height */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <label style={lbl}>Height Unit</label>
                        <div style={{ position: "relative" }}>
                          <select value={heightUnit} onChange={e => setHeightUnit(e.target.value as HeightUnit)} style={inp}>
                            <option value="cm">Centimeters</option>
                            <option value="ft">Feet &amp; Inches</option>
                          </select>
                          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748B", fontSize: 12 }}>▼</span>
                        </div>
                      </div>
                      <div>
                        <label style={lbl}>{heightUnit === "cm" ? "Height (cm)" : "Feet"}</label>
                        <input
                          type="number"
                          value={heightUnit === "cm" ? heightCm : heightFt}
                          onChange={e => heightUnit === "cm" ? setHeightCm(e.target.value) : setHeightFt(e.target.value)}
                          style={inp}
                          placeholder={heightUnit === "cm" ? "170" : "5"}
                        />
                      </div>
                    </div>
                    {heightUnit === "ft" && (
                      <div style={{ marginTop: 10 }}>
                        <label style={lbl}>Inches</label>
                        <input type="number" min={0} max={11} value={heightIn} onChange={e => setHeightIn(e.target.value)} style={inp} placeholder="7" />
                      </div>
                    )}
                  </div>

                  {/* Weight */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <label style={lbl}>Weight Unit</label>
                        <div style={{ position: "relative" }}>
                          <select value={weightUnit} onChange={e => setWeightUnit(e.target.value as WeightUnit)} style={inp}>
                            <option value="kg">Kilograms (kg)</option>
                            <option value="lbs">Pounds (lbs)</option>
                          </select>
                          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748B", fontSize: 12 }}>▼</span>
                        </div>
                      </div>
                      <div>
                        <label style={lbl}>Weight ({weightUnit})</label>
                        <input type="number" value={weightVal} onChange={e => setWeightVal(e.target.value)} style={inp} placeholder={weightUnit === "kg" ? "70" : "154"} />
                      </div>
                    </div>
                  </div>

                  {/* Steps */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={lbl}>Daily Steps (Average)</label>
                    <div style={{ position: "relative" }}>
                      <select value={steps} onChange={e => setSteps(e.target.value)} style={inp}>
                        <option value="sedentary">🚶 Under 5,000 steps — Sedentary (×1.2)</option>
                        <option value="light">🚶 5,000–7,500 steps — Lightly Active (×1.375)</option>
                        <option value="moderate">🚶 7,500–10,000 steps — Moderate (×1.55)</option>
                        <option value="active">🏃 10,000–12,500 steps — Active (×1.725)</option>
                        <option value="veryActive">🏃 12,500+ steps — Very Active (×1.9)</option>
                      </select>
                      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748B", fontSize: 12 }}>▼</span>
                    </div>
                  </div>

                  {/* Exercise */}
                  <div style={{ marginBottom: 24 }}>
                    <label style={lbl}>Structured Exercise Frequency</label>
                    <div style={{ position: "relative" }}>
                      <select value={exercise} onChange={e => setExercise(e.target.value)} style={inp}>
                        <option value="none">🏋️ No structured exercise (×1.2)</option>
                        <option value="light">🏋️ 1–2 days/week — Light (×1.375)</option>
                        <option value="moderate">🏋️ 3–4 days/week — Moderate (×1.55)</option>
                        <option value="heavy">🏋️ 5–6 days/week — Heavy (×1.725)</option>
                        <option value="athlete">🏋️ Daily training — Athlete (×1.9)</option>
                      </select>
                      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748B", fontSize: 12 }}>▼</span>
                    </div>
                    <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 5 }}>Activity multiplier takes the higher of steps vs. exercise to avoid double-counting.</p>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={calculate}
                    style={{ width: "100%", height: 50, background: "#15803D", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#166534"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#15803D"; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                      <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
                    </svg>
                    Calculate My Macros
                  </button>
                </div>

                {/* ─ RIGHT: Results ─ */}
                <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 20, padding: "28px 28px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 4 }}>Your Results</h2>
                  <p style={{ fontSize: 13, color: "#64748B", marginBottom: 20 }}>Your personalised daily nutrition and hydration recommendations</p>

                  {!results ? (
                    <div style={{ textAlign: "center", padding: "48px 20px", color: "#94A3B8" }}>
                      <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.5 }}>📊</div>
                      <p style={{ fontSize: 14, fontWeight: 500 }}>Fill in your details and click<br /><strong style={{ color: "#15803D" }}>Calculate My Macros</strong></p>
                      <p style={{ fontSize: 12, color: "#CBD5E1", marginTop: 8 }}>Results appear here instantly</p>
                    </div>
                  ) : (
                    <>
                      {/* Goal banner */}
                      <div style={{ background: "#F8FAFC", border: `1.5px solid ${goalColor}20`, borderRadius: 10, padding: "10px 14px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "#64748B" }}>Current goal</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: goalColor }}>{goalLabel}</span>
                      </div>

                      {/* Caloric Breakdown */}
                      <h3 style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Caloric Breakdown</h3>
                      <div style={rowStyle}>
                        <span>🔥 BMR <span style={{ fontSize: 11, color: "#CBD5E1" }}>(at rest)</span></span>
                        <strong style={{ color: "#0F172A" }}>{results.bmr.toLocaleString()} kcal</strong>
                      </div>
                      <div style={rowStyle}>
                        <span>⚡ TDEE <span style={{ fontSize: 11, color: "#CBD5E1" }}>(with activity)</span></span>
                        <strong style={{ color: "#0F172A" }}>{results.tdee.toLocaleString()} kcal</strong>
                      </div>
                      <div style={{ ...rowStyle, borderBottom: "none", marginBottom: 20 }}>
                        <span style={{ fontWeight: 700, color: "#0F172A", fontSize: 15 }}>🎯 Daily Target</span>
                        <strong style={{ fontSize: 18, color: "#15803D" }}>{results.target.toLocaleString()} kcal</strong>
                      </div>

                      <hr style={{ border: "none", borderTop: "1px solid #F1F5F9", margin: "4px 0 18px" }} />

                      {/* Macros with bars */}
                      <h3 style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Macronutrients</h3>
                      <MacroBar label="Protein" grams={results.protein} pct={results.proteinPct} color="#8B5CF6" emoji="🥚" />
                      <MacroBar label="Carbohydrates" grams={results.carbs} pct={results.carbsPct} color="#3B82F6" emoji="🍎" />
                      <MacroBar label="Fats" grams={results.fat} pct={results.fatPct} color="#F59E0B" emoji="🥑" />

                      <div style={{ ...rowStyle, borderBottom: "none", marginTop: 4, marginBottom: 20 }}>
                        <span>🥦 Fiber <span style={{ fontSize: 11, color: "#CBD5E1" }}>(~14g/1,000 kcal)</span></span>
                        <strong style={{ color: "#0F172A" }}>{results.fiber} g</strong>
                      </div>

                      <hr style={{ border: "none", borderTop: "1px solid #F1F5F9", margin: "4px 0 18px" }} />

                      {/* Hydration */}
                      <h3 style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Hydration</h3>
                      <div style={{ ...rowStyle, borderBottom: "none", marginBottom: 20 }}>
                        <span>💧 Daily Water Intake</span>
                        <strong style={{ color: "#0F172A" }}>{results.water} L+</strong>
                      </div>

                      <hr style={{ border: "none", borderTop: "1px solid #F1F5F9", margin: "4px 0 18px" }} />

                      {/* BMI */}
                      <h3 style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Body Mass Index</h3>
                      <BmiGauge bmi={results.bmi} category={results.bmiCategory} />

                      <div style={{ marginTop: 20 }} />

                      {/* CTA strip */}
                      <div style={{ background: "linear-gradient(135deg, #ecfdf5, #d1fae5)", border: "1px solid #bbf7d0", borderRadius: 12, padding: "16px 18px" }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#15803D", marginBottom: 2 }}>Want AI-powered insights beyond macros?</p>
                        <p style={{ fontSize: 12, color: "#047857", marginBottom: 12 }}>Track patterns across meals, hydration &amp; habits — personalised to you.</p>
                        <a
                          href={APP_STORE}
                          onClick={handleStoreRedirect}
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#15803D", color: "#fff", fontSize: 13, fontWeight: 700, padding: "9px 18px", borderRadius: 8, textDecoration: "none", cursor: "pointer" }}
                        >
                          Track with MyCalAgent →
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Disclaimer */}
              <p style={{ fontSize: 11, color: "#94A3B8", textAlign: "center", marginTop: 20, lineHeight: 1.6 }}>
                Results are estimates based on the Mifflin-St Jeor equation (1990). Individual results vary. Consult a registered dietitian or healthcare professional before making changes to your diet or exercise regimen.
              </p>
            </div>
          </section>

          {/* ── HOW TO USE YOUR RESULTS ── */}
          <section style={{ background: "#fff", padding: "64px 24px", borderTop: "1px solid #E2E8F0" }}>
            <div style={{ maxWidth: 1020, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#15803D", marginBottom: 12 }}>
                  Using Your Results
                </p>
                <h2 style={{ fontSize: "clamp(1.35rem, 3vw, 1.75rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.2, marginBottom: 12 }}>
                  How to apply your macro targets
                </h2>
                <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
                  Understanding your numbers is only the first step. Here's how to put them to use effectively.
                </p>
              </div>

              <div className="howto-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                {HOW_TO_CARDS.map(({ icon, title, body }) => (
                  <div key={title} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px 26px" }}>
                    <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{title}</h3>
                    <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SCIENCE BEHIND THE FORMULAS ── */}
          <section style={{ padding: "64px 24px", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
            <div style={{ maxWidth: 1020, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#15803D", marginBottom: 12 }}>
                  Methodology
                </p>
                <h2 style={{ fontSize: "clamp(1.35rem, 3vw, 1.75rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.2, marginBottom: 12 }}>
                  The science behind the formulas
                </h2>
                <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
                  Every value this calculator returns is grounded in peer-reviewed research and widely accepted clinical guidelines.
                </p>
              </div>

              <div className="science-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

                {/* BMR / Mifflin-St Jeor */}
                <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px 26px" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>Basal Metabolic Rate (BMR)</h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, marginBottom: 16 }}>
                    This calculator uses the <strong>Mifflin-St Jeor equation</strong> — validated in 1990 and recognized as the most accurate predictive equation for the general adult population by the Academy of Nutrition and Dietetics.
                  </p>
                  <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 16px", fontFamily: "monospace", fontSize: 13, color: "#334155", lineHeight: 1.8 }}>
                    <div><strong>Men:</strong> BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) + 5</div>
                    <div style={{ marginTop: 8 }}><strong>Women:</strong> BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) − 161</div>
                  </div>
                  <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 10 }}>Source: Mifflin et al., Am J Clin Nutr, 1990 [1]</p>
                </div>

                {/* TDEE */}
                <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px 26px" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>Total Daily Energy Expenditure (TDEE)</h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, marginBottom: 16 }}>
                    TDEE is calculated by multiplying BMR by an <strong>activity factor</strong> adapted from the original Harris-Benedict activity multipliers and the WHO/FAO/UNU (2004) expert consultation on human energy requirements.
                  </p>
                  <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#334155", lineHeight: 1.8 }}>
                    <div>Sedentary: BMR × 1.2</div>
                    <div>Lightly Active: BMR × 1.375</div>
                    <div>Moderately Active: BMR × 1.55</div>
                    <div>Very Active: BMR × 1.725</div>
                    <div>Athlete: BMR × 1.9</div>
                  </div>
                  <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 10 }}>Source: WHO/FAO/UNU, FAO Food &amp; Nutrition Technical Report Series 1, 2004 [7]</p>
                </div>

                {/* Macros */}
                <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px 26px" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>Macronutrient Distribution</h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, marginBottom: 16 }}>
                    Macro targets are calculated as a percentage of your daily calorie target, consistent with the Dietary Reference Intakes (DRI) Acceptable Macronutrient Distribution Ranges (AMDR) established by the National Academies of Sciences.
                  </p>
                  <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#334155", lineHeight: 1.9 }}>
                    <div>🥚 Protein: 30% of target calories ÷ 4 kcal/g</div>
                    <div>🍎 Carbohydrates: 40% of target calories ÷ 4 kcal/g</div>
                    <div>🥑 Fats: 30% of target calories ÷ 9 kcal/g</div>
                    <div>🥦 Fiber: ~14g per 1,000 kcal consumed</div>
                  </div>
                  <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 10 }}>Source: National Academies DRI (2005) [3]; ISSN Position Stand (2017) [6]</p>
                </div>

                {/* Hydration */}
                <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px 26px" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>Daily Hydration Estimate</h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, marginBottom: 16 }}>
                    Water target is estimated at <strong>33ml per kg of body weight</strong> — a commonly referenced guideline aligned with the WHO and National Academies Adequate Intake (AI) for total daily water.
                  </p>
                  <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#334155", lineHeight: 1.8 }}>
                    <div>Formula: weight (kg) × 0.033 = litres/day</div>
                    <div style={{ marginTop: 6, fontSize: 12, color: "#94A3B8" }}>+500ml per hour of moderate exercise</div>
                  </div>
                  <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 10 }}>Source: National Academies DRI for Water (2005) [5]; WHO guidelines</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section style={{ background: "#fff", padding: "64px 24px", borderTop: "1px solid #E2E8F0" }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#15803D", marginBottom: 12 }}>
                  FAQs
                </p>
                <h2 style={{ fontSize: "clamp(1.35rem, 3vw, 1.75rem)", fontWeight: 800, color: "#0F172A", marginBottom: 12 }}>
                  Common questions about macros &amp; calories
                </h2>
              </div>

              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #E2E8F0" }}>
                {FAQ_ITEMS.map(({ q, a }, i) => (
                  <div key={i} style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ width: "100%", background: "none", border: "none", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left" }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", lineHeight: 1.4 }}>{q}</span>
                      <span style={{ fontSize: 18, color: "#94A3B8", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s ease" }}>+</span>
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: "0 22px 18px", fontSize: 14, color: "#64748B", lineHeight: 1.75 }}>{a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SOURCES ── */}
          <section style={{ background: "#F8FAFC", padding: "52px 24px 64px", borderTop: "1px solid #E2E8F0" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#334155", marginBottom: 20 }}>
                📚 Sources &amp; References
              </h2>
              <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 24 }}>
                All formulas and recommendations in this calculator are based on peer-reviewed research and clinical guidelines from recognized institutions.
              </p>
              <ol style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                {SOURCES.map(({ id, title, journal, url }) => (
                  <li key={id} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#15803D", background: "#ecfdf5", borderRadius: 6, padding: "2px 8px", flexShrink: 0, marginTop: 1 }}>[{id}]</span>
                    <div>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 13, color: "#0F172A", fontWeight: 500, textDecoration: "none", lineHeight: 1.5 }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#15803D"; (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#0F172A"; (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none"; }}
                      >
                        {title}
                      </a>
                      <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{journal}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 28, lineHeight: 1.6, borderTop: "1px solid #E2E8F0", paddingTop: 20 }}>
                <strong>Disclaimer:</strong> This calculator provides general estimates for wellness awareness purposes only. Results are not a substitute for professional medical advice, diagnosis, or treatment. Individual metabolic rates vary. Always consult a registered dietitian or licensed healthcare provider for personalised nutrition guidance.
              </p>
            </div>
          </section>

          {/* ── CTA ── */}
          <section style={{ background: "#fff", padding: "64px 24px", borderTop: "1px solid #E2E8F0", textAlign: "center" }}>
            <div style={{ maxWidth: 540, margin: "0 auto" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#15803D", marginBottom: 14 }}>
                Beyond Macros
              </p>
              <h2 style={{ fontSize: "clamp(1.35rem, 3vw, 1.75rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, marginBottom: 14 }}>
                Understand how your meals actually make you feel
              </h2>
              <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, marginBottom: 28 }}>
                MyCalAgent goes beyond calorie counting — it tracks patterns across meals, hydration, fasting, and habits to reveal your personal wellness story.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href={APP_STORE}
                  onClick={handleStoreRedirect}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 24px", background: "#15803D", color: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", cursor: "pointer" }}
                >
                  Download MyCalAgent →
                </a>
                <Link
                  href="/features"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 24px", background: "#fff", color: "#334155", border: "1.5px solid #E2E8F0", borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: "none" }}
                >
                  See Features
                </Link>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 720px) {
          .calc-main-grid { grid-template-columns: 1fr !important; }
          .howto-grid { grid-template-columns: 1fr !important; }
          .science-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
