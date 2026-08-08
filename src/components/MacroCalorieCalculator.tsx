"use client";

import { useState } from "react";

/* ─── JSON-LD schema ────────────────────────────────────────────── */
const calcSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "MyCalAgent Macro & Calorie Calculator",
      description: "Free macro and calorie calculator using Mifflin-St Jeor formula. Calculates BMR, TDEE, target calories, protein, carbs, fats, fiber, and daily hydration.",
      applicationCategory: "HealthApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: ["BMR calculation", "TDEE calculation", "Macro breakdown", "Hydration estimate"],
    },
    {
      "@type": "HowTo",
      name: "How to Calculate Your Daily Macros and Calories",
      step: [
        { "@type": "HowToStep", position: 1, name: "Enter your goal", text: "Select your goal: Weight Loss, Maintain Weight, or Gain Muscle." },
        { "@type": "HowToStep", position: 2, name: "Enter your details", text: "Enter your gender, age, height, and weight." },
        { "@type": "HowToStep", position: 3, name: "Select activity level", text: "Choose your average daily steps and structured exercise frequency." },
        { "@type": "HowToStep", position: 4, name: "Get your results", text: "Click Calculate My Macros to see your personalized BMR, TDEE, calories, macros, and hydration targets." },
      ],
    },
  ],
};

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

/* ─── Input style ───────────────────────────────────────────────── */
const inputStyle: React.CSSProperties = {
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

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#334155",
  marginBottom: 6,
};

const resultRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid #F1F5F9",
  fontSize: 14,
  color: "#475569",
};

/* ─── Component ─────────────────────────────────────────────────── */
export default function MacroCalorieCalculator() {
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

  function calculate() {
    const ageNum = Math.max(18, Math.min(80, Number(age) || 30));

    // height → cm
    let hcm: number;
    if (heightUnit === "cm") {
      hcm = Number(heightCm) || 170;
    } else {
      hcm = (Number(heightFt) || 5) * 30.48 + (Number(heightIn) || 7) * 2.54;
    }

    // weight → kg
    const wkg = weightUnit === "kg"
      ? Number(weightVal) || 70
      : (Number(weightVal) || 154) * 0.453592;

    // BMR (Mifflin-St Jeor)
    const bmr = Math.round(
      gender === "male"
        ? 10 * wkg + 6.25 * hcm - 5 * ageNum + 5
        : 10 * wkg + 6.25 * hcm - 5 * ageNum - 161
    );

    // Activity multiplier — take the higher of steps vs exercise
    const mult = Math.max(
      STEPS_MULT[steps] ?? 1.2,
      EXERCISE_MULT[exercise] ?? 1.2
    );
    const tdee = Math.round(bmr * mult);

    // Goal adjustment
    const target =
      goal === "loss" ? tdee - 500 :
      goal === "gain" ? tdee + 300 :
      tdee;

    // Macros
    const protein = Math.round((target * 0.30) / 4);
    const carbs   = Math.round((target * 0.40) / 4);
    const fat     = Math.round((target * 0.30) / 9);
    const fiber   = Math.round(wkg * 0.29);
    const water   = Math.round(wkg * 0.033 * 100) / 100;

    setResults({ bmr, tdee, target, protein, carbs, fat, fiber, water });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }}
      />

      <section
        id="macro-calculator"
        aria-labelledby="calc-heading"
        style={{ background: "#F8FAFC", padding: "80px 24px" }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#15803D", marginBottom: 12,
            }}>
              Free Tool
            </p>
            <h2
              id="calc-heading"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800,
                color: "#0F172A", lineHeight: 1.2, marginBottom: 12,
              }}
            >
              Macro &amp; Calorie Calculator
            </h2>
            <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
              Estimate your daily calorie target, macronutrient breakdown, and hydration needs — personalized to your goals.
            </p>
          </div>

          {/* Two-column card layout */}
          <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

            {/* ── LEFT: Input form ── */}
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: "28px 28px 24px" }}>

              {/* Goal */}
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Goal</label>
                <div style={{ position: "relative" }}>
                  <select
                    value={goal}
                    onChange={e => setGoal(e.target.value as Goal)}
                    style={inputStyle}
                  >
                    <option value="loss">🏃 Weight Loss</option>
                    <option value="maintain">⚖️ Maintain Weight</option>
                    <option value="gain">💪 Gain Muscle</option>
                  </select>
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748B", fontSize: 12 }}>▼</span>
                </div>
              </div>

              {/* Gender */}
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Gender</label>
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
              </div>

              {/* Age */}
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Age (years)</label>
                <input
                  type="number"
                  min={18}
                  max={80}
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  style={inputStyle}
                  placeholder="30"
                />
              </div>

              {/* Height */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Height Unit</label>
                    <div style={{ position: "relative" }}>
                      <select value={heightUnit} onChange={e => setHeightUnit(e.target.value as HeightUnit)} style={inputStyle}>
                        <option value="cm">Centimeters</option>
                        <option value="ft">Feet &amp; Inches</option>
                      </select>
                      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748B", fontSize: 12 }}>▼</span>
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>
                      {heightUnit === "cm" ? "Height (cm)" : "Feet"}
                    </label>
                    <input
                      type="number"
                      value={heightUnit === "cm" ? heightCm : heightFt}
                      onChange={e => heightUnit === "cm" ? setHeightCm(e.target.value) : setHeightFt(e.target.value)}
                      style={inputStyle}
                      placeholder={heightUnit === "cm" ? "170" : "5"}
                    />
                  </div>
                </div>
                {heightUnit === "ft" && (
                  <div style={{ marginTop: 10 }}>
                    <label style={labelStyle}>Inches</label>
                    <input
                      type="number"
                      min={0}
                      max={11}
                      value={heightIn}
                      onChange={e => setHeightIn(e.target.value)}
                      style={inputStyle}
                      placeholder="7"
                    />
                  </div>
                )}
              </div>

              {/* Weight */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Weight Unit</label>
                    <div style={{ position: "relative" }}>
                      <select value={weightUnit} onChange={e => setWeightUnit(e.target.value as WeightUnit)} style={inputStyle}>
                        <option value="kg">Kilograms</option>
                        <option value="lbs">Pounds</option>
                      </select>
                      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748B", fontSize: 12 }}>▼</span>
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Weight ({weightUnit})</label>
                    <input
                      type="number"
                      value={weightVal}
                      onChange={e => setWeightVal(e.target.value)}
                      style={inputStyle}
                      placeholder={weightUnit === "kg" ? "70" : "154"}
                    />
                  </div>
                </div>
              </div>

              {/* Daily Steps */}
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Daily Steps (Average)</label>
                <div style={{ position: "relative" }}>
                  <select value={steps} onChange={e => setSteps(e.target.value)} style={inputStyle}>
                    <option value="sedentary">🚶 Under 5,000 steps (Sedentary)</option>
                    <option value="light">🚶 5,000–7,500 steps (Lightly Active)</option>
                    <option value="moderate">🚶 7,500–10,000 steps (Moderate)</option>
                    <option value="active">🏃 10,000–12,500 steps (Active)</option>
                    <option value="veryActive">🏃 12,500+ steps (Very Active)</option>
                  </select>
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748B", fontSize: 12 }}>▼</span>
                </div>
              </div>

              {/* Structured Exercise */}
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Structured Exercise Frequency</label>
                <div style={{ position: "relative" }}>
                  <select value={exercise} onChange={e => setExercise(e.target.value)} style={inputStyle}>
                    <option value="none">🏋️ No structured exercise</option>
                    <option value="light">🏋️ 1–2 days/week (Light)</option>
                    <option value="moderate">🏋️ 3–4 days/week (Moderate)</option>
                    <option value="heavy">🏋️ 5–6 days/week (Heavy)</option>
                    <option value="athlete">🏋️ Daily (Athlete)</option>
                  </select>
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748B", fontSize: 12 }}>▼</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={calculate}
                style={{
                  width: "100%",
                  height: 48,
                  background: "#15803D",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "background 0.15s ease, transform 0.15s ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#166534"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#15803D"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
                </svg>
                Calculate My Macros
              </button>
            </div>

            {/* ── RIGHT: Results panel ── */}
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: "28px 28px 24px" }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 4 }}>Your Results</h3>
              <p style={{ fontSize: 13, color: "#64748B", marginBottom: 24, lineHeight: 1.5 }}>
                Your personalized daily nutrition and hydration recommendations
              </p>

              {!results ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#94A3B8" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }} aria-hidden="true">
                    <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
                  </svg>
                  <p style={{ fontSize: 14, fontWeight: 500 }}>Fill in your details and click<br/><strong style={{ color: "#15803D" }}>Calculate My Macros</strong> to see results</p>
                </div>
              ) : (
                <>
                  {/* Caloric Breakdown */}
                  <div style={{ marginBottom: 8 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>Caloric Breakdown</h4>
                    <div style={resultRowStyle}>
                      <span>BMR (Basal Metabolic Rate)</span>
                      <strong style={{ color: "#0F172A" }}>{results.bmr.toLocaleString()} kcal</strong>
                    </div>
                    <div style={resultRowStyle}>
                      <span>TDEE (Total Daily Energy)</span>
                      <strong style={{ color: "#0F172A" }}>{results.tdee.toLocaleString()} kcal</strong>
                    </div>
                    <div style={{ ...resultRowStyle, borderBottom: "none", paddingBottom: 0 }}>
                      <span style={{ fontWeight: 600, color: "#0F172A" }}>Target Daily Calories</span>
                      <strong style={{ fontSize: 17, color: "#15803D" }}>{results.target.toLocaleString()} kcal</strong>
                    </div>
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid #E2E8F0", margin: "16px 0" }} />

                  {/* Macronutrients */}
                  <div style={{ marginBottom: 8 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>Macronutrients</h4>
                    {[
                      { emoji: "🥚", label: "Protein", val: results.protein, unit: "g" },
                      { emoji: "🍎", label: "Carbohydrates", val: results.carbs, unit: "g" },
                      { emoji: "🥑", label: "Fats", val: results.fat, unit: "g" },
                      { emoji: "🥦", label: "Fiber", val: results.fiber, unit: "g" },
                    ].map(({ emoji, label, val, unit }) => (
                      <div key={label} style={resultRowStyle}>
                        <span>{emoji} {label}</span>
                        <strong style={{ color: "#0F172A" }}>{val} {unit}</strong>
                      </div>
                    ))}
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid #E2E8F0", margin: "16px 0" }} />

                  {/* Hydration */}
                  <div style={{ marginBottom: 24 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>Hydration</h4>
                    <div style={{ ...resultRowStyle, borderBottom: "none" }}>
                      <span>💧 Daily Water Intake</span>
                      <strong style={{ color: "#0F172A" }}>{results.water} L+</strong>
                    </div>
                  </div>

                  {/* MyCalAgent CTA */}
                  <div style={{
                    background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
                    border: "1px solid #bbf7d0",
                    borderRadius: 12,
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                  }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#15803D", marginBottom: 2 }}>Want AI-powered insights beyond macros?</p>
                      <p style={{ fontSize: 12, color: "#047857" }}>Track patterns across meals, hydration &amp; habits.</p>
                    </div>
                    <a
                      href="#download"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        background: "#15803D", color: "#fff",
                        fontSize: 13, fontWeight: 700,
                        padding: "8px 16px", borderRadius: 8,
                        textDecoration: "none", whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      Track with MyCalAgent →
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <p style={{ fontSize: 11, color: "#94A3B8", textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
            Results are estimates based on the Mifflin-St Jeor equation. Individual needs vary. Consult a healthcare professional before making changes to your diet.
          </p>
        </div>

        {/* Responsive: stack on mobile */}
        <style>{`
          @media (max-width: 720px) {
            .calc-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
