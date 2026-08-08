"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Calculator as CalcIcon, 
  Activity, 
  Scale, 
  Target, 
  Droplets, 
  Zap,
  Info,
  ChevronRight,
  Brain,
  Save,
  Loader2
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { QuickFAQ } from "@/components/QuickFAQ";
import { useSession } from "@/lib/auth-client";
import { saveHealthProfile, getHealthProfile } from "@/lib/health-actions";
import { toast } from "sonner";

const calculatorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.mycalagent.com/calculator#webpage",
      url: "https://www.mycalagent.com/calculator",
      name: "Health Calculators - BMI, BMR, TDEE & Macro Calculator | MyCalAgent",
      description: "Free health calculators: BMI, BMR, TDEE, daily macro distribution, and water intake. Powered by the Mifflin-St Jeor equation for accurate wellness estimates.",
      inLanguage: "en",
      isPartOf: { "@id": "https://www.mycalagent.com/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
          { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://www.mycalagent.com/calculator" },
        ],
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "MyCalAgent Health Calculators",
      applicationCategory: "HealthApplication",
      url: "https://www.mycalagent.com/calculator",
      description: "Free online BMI, BMR, TDEE, macro, and hydration calculators for wellness planning.",
      featureList: [
        "BMI (Body Mass Index) Calculator",
        "BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation",
        "TDEE (Total Daily Energy Expenditure) Calculator",
        "Macro Distribution Calculator",
        "Daily Water Intake Calculator",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      operatingSystem: "Web",
    },
  ],
};

const calculatorsFAQ = [
  {
    question: "What are these health calculators used for?",
    answer: "These calculators provide general estimates to help users understand daily calorie needs, body measurements, and hydration goals for wellness and lifestyle planning."
  },
  {
    question: "Are BMI, BMR, and TDEE calculators accurate?",
    answer: "These calculators use widely accepted formulas to provide estimates. Results may vary based on individual factors and should be used as general guidance rather than precise values."
  },
  {
    question: "How is my daily calorie goal calculated?",
    answer: "Calorie goals are estimated using inputs such as age, height, weight, gender, and activity level to approximate daily energy needs."
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer: "BMR estimates the calories your body uses at rest, while TDEE estimates total daily calories based on activity level."
  },
  {
    question: "How much water should I drink per day?",
    answer: "Daily water needs vary by body size, activity, and environment. The water goal calculator provides a personalized estimate to support consistent hydration habits."
  },
  {
    question: "Can I use these calculators without signing up?",
    answer: "Yes. The calculators are available on the website, with optional app features for ongoing tracking and insights."
  },
  {
    question: "Do these calculators provide medical advice?",
    answer: "No. These calculators are designed for general wellness awareness and do not provide medical advice, diagnosis, or treatment."
  },
  {
    question: "How does MyCalAgent use these calculations?",
    answer: "MyCalAgent uses these estimates as a starting point to help users set goals and track daily habits over time."
  }
];

  export default function CalculatorPage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("tdee");
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    
    // Form States
    const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
    const [gender, setGender] = useState("male");
    const [age, setAge] = useState(25);
    const [weight, setWeight] = useState(70); // stored as kg
    const [height, setHeight] = useState(175); // stored as cm
    
    // Imperial specific states
    const [lbs, setLbs] = useState(154);
    const [ft, setFt] = useState(5);
    const [inches, setInches] = useState(9);

    const [activity, setActivity] = useState(1.2); // Activity multiplier
    const [goal, setGoal] = useState("maintain");
    
    // Results
    const [results, setResults] = useState({
      tdee: 0,
      bmi: 0,
      bmr: 0,
      macros: { protein: 0, fat: 0, carbs: 0 },
      water: 0
    });

    // Load profile if user is logged in
    useEffect(() => {
      if (session?.user) {
        setIsLoadingProfile(true);
        getHealthProfile()
          .then(async (profile) => {
            if (profile) {
              setGender(profile.gender);
              setAge(profile.age);
              setWeight(profile.weight);
              setHeight(profile.height);
              setActivity(parseFloat(profile.activity));
              setGoal(profile.goal);
              setUnitSystem(profile.unitSystem as "metric" | "imperial");
              
              if (profile.unitSystem === "imperial") {
                setLbs(Math.round(profile.weight * 2.20462));
                const totalInches = profile.height * 0.393701;
                setFt(Math.floor(totalInches / 12));
                setInches(Math.round(totalInches % 12));
              }
            } else if (session.user.email) {
              // If no profile, try to pre-fill from survey
              const survey = await import("@/lib/health-actions").then(m => m.getSurveyResponseByEmail(session.user.email));
              if (survey && survey.primaryGoal) {
                try {
                  const goals = JSON.parse(survey.primaryGoal) as string[];
                  if (goals.includes("Lose weight")) setGoal("lose");
                  else if (goals.includes("Maintain weight")) setGoal("maintain");
                  // Add more mappings if needed
                } catch (e) {
                  console.error("Failed to parse survey goals", e);
                }
              }
            }
          })
          .finally(() => setIsLoadingProfile(false));
      }
    }, [session?.user, session?.user.email]);

    // Update weight and height based on imperial inputs
    useEffect(() => {
      if (unitSystem === "imperial") {
        setWeight(Math.round(lbs * 0.453592));
        setHeight(Math.round((ft * 12 + inches) * 2.54));
      }
    }, [lbs, ft, inches, unitSystem]);

    // Update imperial inputs based on weight/height if switching TO imperial
    const handleUnitSystemChange = (system: "metric" | "imperial") => {
      if (system === "imperial" && unitSystem === "metric") {
        setLbs(Math.round(weight * 2.20462));
        const totalInches = height * 0.393701;
        setFt(Math.floor(totalInches / 12));
        setInches(Math.round(totalInches % 12));
      }
      setUnitSystem(system);
    };

    const handleSave = async () => {
      setIsSaving(true);
      try {
        await saveHealthProfile({
          gender,
          age,
          weight,
          height,
          activity: activity.toString(),
          goal,
          unitSystem
        });
        toast.success("Health profile saved successfully!");
      } catch (error) {
        toast.error("Failed to save health profile.");
      } finally {
        setIsSaving(false);
      }
    };


  const activityLevels = [
    { label: "Sedentary (Office job)", value: 1.2 },
    { label: "Lightly Active (1-2 days/week)", value: 1.375 },
    { label: "Moderately Active (3-5 days/week)", value: 1.55 },
    { label: "Very Active (6-7 days/week)", value: 1.725 },
    { label: "Extra Active (Athlete)", value: 1.9 }
  ];

  const calculateResults = () => {
    // BMR Calculation (Mifflin-St Jeor Equation)
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = Math.round(bmr * activity);
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    
    // Target Calories based on goal
    let targetCalories = tdee;
    if (goal === "lose") targetCalories -= 500;
    if (goal === "gain") targetCalories += 500;

    // Macro Calculation (Typical breakdown)
    // Protein: 2g per kg
    // Fat: 25% of calories
    // Carbs: Remainder
    const protein = Math.round(weight * 2);
    const fat = Math.round((targetCalories * 0.25) / 9);
    const carbs = Math.round((targetCalories - (protein * 4) - (fat * 9)) / 4);

    // Water Intake (35ml per kg)
    const water = (weight * 0.035).toFixed(1);

    setResults({
      tdee,
      bmi: parseFloat(bmi),
      bmr: Math.round(bmr),
      macros: { protein, fat, carbs },
      water: parseFloat(water)
    });
  };

  useEffect(() => {
    calculateResults();
  }, [gender, age, weight, height, activity, goal]);

  return (
    <div className="relative min-h-screen bg-background">
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass-card text-sm font-medium"
            >
              <Brain className="w-4 h-4 text-primary" />
              <span className="gradient-text">AI-Powered Health Analysis</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Health & Nutrition <span className="gradient-text">Calculators</span>
            </h1>
            <p className="text-2xl md:text-3xl font-medium mb-8 text-muted-foreground">
              BMI, BMR, TDEE & Water Intake
            </p>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Use MyCalAgent’s free health and nutrition calculators to estimate BMI, BMR, TDEE, and daily water goals. These tools are designed for general wellness awareness and lifestyle planning.
              </p>
              <p className="text-sm text-muted-foreground/60 italic">
                These calculators provide general estimates and are not intended for medical diagnosis.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card p-8 rounded-3xl space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <CalcIcon className="w-5 h-5 text-primary" />
                    {session?.user?.name || "Your Profile"}
                  </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Gender</label>
                    <div className="flex gap-2 p-1 bg-muted/50 rounded-xl">
                      {["male", "female"].map((g) => (
                        <button
                          key={g}
                          onClick={() => setGender(g)}
                          className={`flex-1 py-2 rounded-lg capitalize transition-all ${
                            gender === g ? "bg-background shadow-sm font-semibold" : "text-muted-foreground"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value))}
                        className="w-full bg-muted/50 border-none rounded-xl px-4 py-2 focus:ring-2 ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Weight (kg)</label>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(parseInt(e.target.value))}
                        className="w-full bg-muted/50 border-none rounded-xl px-4 py-2 focus:ring-2 ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                      className="w-full bg-muted/50 border-none rounded-xl px-4 py-2 focus:ring-2 ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Activity Level</label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(parseFloat(e.target.value))}
                      className="w-full bg-muted/50 border-none rounded-xl px-4 py-2 focus:ring-2 ring-primary transition-all"
                    >
                      {activityLevels.map((lvl) => (
                        <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Goal</label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full bg-muted/50 border-none rounded-xl px-4 py-2 focus:ring-2 ring-primary transition-all"
                    >
                      <option value="lose">Weight Loss (-500 kcal)</option>
                      <option value="maintain">Maintain Weight</option>
                      <option value="gain">Muscle Gain (+500 kcal)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* AI Insight Box */}
              <div className="glass p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
                <h3 className="font-bold flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-primary" />
                  AI Suggestion
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  "Based on your profile, we recommend a balanced macro distribution with a focus on high protein to support your {goal} goals while maintaining metabolic health."
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Primary Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-8 rounded-3xl flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium mb-1">TDEE (Daily Burn)</div>
                  <div className="text-4xl font-bold gradient-text">{results.tdee}</div>
                  <div className="text-xs text-muted-foreground mt-2">calories / day</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-8 rounded-3xl flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Scale className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium mb-1">Body Mass Index</div>
                  <div className="text-4xl font-bold text-blue-500">{results.bmi}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {results.bmi < 18.5 ? "Underweight" : results.bmi < 25 ? "Normal weight" : "Overweight"}
                  </div>
                </motion.div>
              </div>

              {/* Detailed Breakdown */}
              <div className="glass-card p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Macro Distribution
                </h3>
                
                <div className="space-y-8">
                  {/* Macro Bars */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Protein</span>
                        <span className="text-muted-foreground">{results.macros.protein}g</span>
                      </div>
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "30%" }}
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Carbohydrates</span>
                        <span className="text-muted-foreground">{results.macros.carbs}g</span>
                      </div>
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "45%" }}
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" 
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Fats</span>
                        <span className="text-muted-foreground">{results.macros.fat}g</span>
                      </div>
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "25%" }}
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border/50 grid grid-cols-2 gap-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                        <Droplets className="w-5 h-5 text-cyan-500" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Water Goal</div>
                        <div className="font-bold">{results.water}L / day</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">BMR</div>
                        <div className="font-bold">{results.bmr} kcal</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-secondary/30 border border-border/50">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    How it works
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our calculator uses the Mifflin-St Jeor equation, widely regarded as the most accurate way to calculate energy expenditure.
                  </p>
                </div>
                <div className="p-6 rounded-3xl bg-secondary/30 border border-border/50">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Accuracy Note
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    While these calculations are accurate for most, individual metabolism can vary. Use these as a starting point.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <QuickFAQ items={calculatorsFAQ} />
        </div>
      </main>

      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...calculatorJsonLd,
            "@graph": [
              calculatorJsonLd["@graph"][0],
              calculatorJsonLd["@graph"][1],
              {
                "@type": "FAQPage",
                mainEntity: calculatorsFAQ.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer },
                })),
              },
            ],
          }),
        }}
      />
    </div>
  );
}
