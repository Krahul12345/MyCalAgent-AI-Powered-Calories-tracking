"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Sparkles, CheckCircle2, Scale, Apple, Salad, Droplets, Compass, Dumbbell, Clock, Calendar, CalendarDays, CalendarRange, HelpCircle, Brain, Camera, Bell, TrendingUp, Target, MessageSquare, Activity, Frown, BarChart3, UserX, Shuffle, Users, Smartphone, Lock, Bot, Clipboard, Lightbulb, Navigation2, CircleHelp, Mail, User } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";

type Step = "intro" | "email" | "goals" | "timeline" | "pain" | "frustrations" | "ai" | "expectations" | "complete";

interface SurveyData {
  email: string;
  name: string;
  primaryGoals: string[];
  primaryGoalOther: string;
  targetTimeline: string;
  struggles: string[];
  frustrations: string[];
  aiHelpfulnessRatings: Record<string, number>;
  appExpectations: string[];
  earlyAccess: string;
  additionalSuggestions: string;
}

const initialData: SurveyData = {
  email: "",
  name: "",
  primaryGoals: [],
  primaryGoalOther: "",
  targetTimeline: "",
  struggles: [],
  frustrations: [],
  aiHelpfulnessRatings: {
    photoAnalysis: 0,
    smartReminders: 0,
    progressTips: 0,
    goalTimeline: 0,
    actionableAdvice: 0,
    holisticTracking: 0,
  },
  appExpectations: [],
  earlyAccess: "",
  additionalSuggestions: "",
};

const goals = [
  { label: "Lose weight", icon: Scale, color: "bg-teal-100" },
  { label: "Maintain weight", icon: Apple, color: "bg-green-100" },
  { label: "Build healthier eating habits", icon: Salad, color: "bg-emerald-100" },
  { label: "Track calories effortlessly", icon: Clipboard, color: "bg-cyan-100" },
  { label: "Improve hydration & daily routines", icon: Droplets, color: "bg-blue-100" },
  { label: "Just exploring", icon: Compass, color: "bg-slate-100" },
];

const timelines = [
  { label: "Less than 1 month", icon: Clock, color: "bg-amber-100" },
  { label: "1–3 months", icon: Calendar, color: "bg-orange-100" },
  { label: "3–6 months", icon: CalendarDays, color: "bg-rose-100" },
  { label: "No fixed timeline", icon: CalendarRange, color: "bg-purple-100" },
  { label: "Not sure yet", icon: HelpCircle, color: "bg-slate-100" },
];

const struggles = [
  { label: "I don't know how many calories I'm consuming", icon: Brain, color: "bg-violet-100" },
  { label: "Tracking food manually is time-consuming", icon: Clock, color: "bg-amber-100" },
  { label: "I forget meals, hydration, or routines", icon: Bell, color: "bg-rose-100" },
  { label: "I struggle to stay consistent over time", icon: TrendingUp, color: "bg-blue-100" },
  { label: "I don't get actionable guidance", icon: Target, color: "bg-emerald-100" },
  { label: "I'm not sure what to do when progress stalls", icon: HelpCircle, color: "bg-slate-100" },
  { label: "Alcohol intake affects my progress", icon: Droplets, color: "bg-purple-100" },
  { label: "Most apps feel overwhelming", icon: Smartphone, color: "bg-cyan-100" },
  { label: "Privacy concerns with health apps", icon: Lock, color: "bg-red-100" },
];

const frustrations = [
  { label: "Too much manual logging", icon: Clipboard, color: "bg-amber-100" },
  { label: "Hard to understand insights", icon: BarChart3, color: "bg-blue-100" },
  { label: "No personalized guidance", icon: UserX, color: "bg-rose-100" },
  { label: "Feels judgmental or demotivating", icon: Frown, color: "bg-purple-100" },
  { label: "Doesn't adapt to my lifestyle", icon: Shuffle, color: "bg-emerald-100" },
  { label: "No accountability", icon: Users, color: "bg-cyan-100" },
  { label: "I don't use any app today", icon: Smartphone, color: "bg-slate-100" },
];

const aiFeatures = [
  { key: "photoAnalysis", label: "Analyzes meals from photos", icon: Camera, color: "bg-teal-100" },
  { key: "smartReminders", label: "Smart reminders when off-track", icon: Bell, color: "bg-amber-100" },
  { key: "progressTips", label: "Adjusts tips based on progress", icon: TrendingUp, color: "bg-blue-100" },
  { key: "goalTimeline", label: "Keeps me accountable to goals", icon: Target, color: "bg-emerald-100" },
  { key: "actionableAdvice", label: "Simple, actionable advice", icon: MessageSquare, color: "bg-purple-100" },
  { key: "holisticTracking", label: "Tracks habits holistically", icon: Activity, color: "bg-rose-100" },
];

const appExpectations = [
  { value: "track", label: "Just track data — I'll manage the rest", icon: Clipboard, color: "bg-slate-100" },
  { value: "insights", label: "Give me insights and suggestions", icon: Lightbulb, color: "bg-amber-100" },
  { value: "guide", label: "Guide me step-by-step toward my goal", icon: Navigation2, color: "bg-emerald-100" },
  { value: "unsure", label: "I'm not sure yet", icon: CircleHelp, color: "bg-purple-100" },
];

export default function SurveyPage() {
  const [step, setStep] = useState<Step>("intro");
  const [data, setData] = useState<SurveyData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const steps: Step[] = ["intro", "email", "goals", "timeline", "pain", "frustrations", "ai", "expectations", "complete"];
  const currentIndex = steps.indexOf(step);
  const totalSteps = steps.length - 2;
  const progressStep = currentIndex - 1;

  const canProceed = () => {
    switch (step) {
      case "intro":
        return true;
      case "email":
        return data.email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
case "goals":
          return data.primaryGoals.length > 0;
      case "timeline":
        return data.targetTimeline !== "";
      case "pain":
        return data.struggles.length > 0;
case "frustrations":
          return data.frustrations.length > 0;
        case "ai":
          return Object.values(data.aiHelpfulnessRatings).every((v) => v > 0);
        case "expectations":
          return data.appExpectations.length > 0 && data.earlyAccess !== "";
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (step === "expectations") {
      setIsSubmitting(true);
      setError("");
      try {
        const response = await fetch("/api/survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Failed to submit survey");
        }
        setStep("complete");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const nextIndex = currentIndex + 1;
      if (nextIndex < steps.length) {
        setStep(steps[nextIndex]);
      }
    }
  };

  const handleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex]);
    }
  };

  const toggleGoal = (label: string) => {
    setData((prev) => {
      const exists = prev.primaryGoals.includes(label);
      if (exists) {
        return { ...prev, primaryGoals: prev.primaryGoals.filter((g) => g !== label) };
      }
      return { ...prev, primaryGoals: [...prev.primaryGoals, label] };
    });
  };

  const toggleStruggle = (item: string) => {
    setData((prev) => {
      const exists = prev.struggles.includes(item);
      if (exists) {
        return { ...prev, struggles: prev.struggles.filter((s) => s !== item) };
      }
      if (prev.struggles.length >= 3) return prev;
      return { ...prev, struggles: [...prev.struggles, item] };
    });
  };

  const toggleFrustration = (item: string) => {
    setData((prev) => {
      const exists = prev.frustrations.includes(item);
      if (exists) {
        return { ...prev, frustrations: prev.frustrations.filter((f) => f !== item) };
      }
      return { ...prev, frustrations: [...prev.frustrations, item] };
    });
  };

  const toggleExpectation = (value: string) => {
    setData((prev) => {
      const exists = prev.appExpectations.includes(value);
      if (exists) {
        return { ...prev, appExpectations: prev.appExpectations.filter((e) => e !== value) };
      }
      return { ...prev, appExpectations: [...prev.appExpectations, value] };
    });
  };

  const setRating = (key: string, value: number) => {
    setData((prev) => ({
      ...prev,
      aiHelpfulnessRatings: { ...prev.aiHelpfulnessRatings, [key]: value },
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navigation />

      <div
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop')`,
          opacity: 0.08,
        }}
      />

      <main className="relative z-10 pt-24 pb-12 px-4 min-h-screen flex flex-col items-center">
        {step !== "complete" && step !== "intro" && (
          <div className="w-full max-w-md mb-6">
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    i < progressStep ? "bg-teal-500" : i === progressStep ? "bg-teal-500" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Step {progressStep + 1} of {totalSteps}
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
<div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 text-center">
                  <div className="mx-auto mb-6 w-fit">
                    <Image
                      src="/mycalagent-logo.webp"
                      alt="MyCalAgent Logo"
                      width={96}
                      height={96}
                      className="w-24 h-24 object-contain rounded-3xl mix-blend-multiply"
                      priority
                    />
                  </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                  Help us personalize{" "}
                  <span className="text-teal-600">MyCalAgent</span> for you
                </h1>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Share your thoughts and help us create a wellness experience you'll actually enjoy using.
                </p>
                <div className="bg-teal-50 border border-teal-100 p-4 rounded-2xl mb-6">
                  <p className="text-sm text-teal-700">
                    This survey takes <span className="font-semibold">2–3 minutes</span>
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}

          {step === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6">
                <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">
                  Let's get <span className="text-teal-600">started</span>
                </h2>
                <p className="text-slate-500 text-center text-sm mb-6">
                  Help us make MyCalAgent even better for you
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-teal-600" />
                      </div>
                      <label className="text-sm font-medium text-slate-700">
                        Email address <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <label className="text-sm font-medium text-slate-700">Name (optional)</label>
                    </div>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                    <Lock className="w-3.5 h-3.5" />
                    Your email will never be shared or sold
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === "goals" && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6">
<h2 className="text-2xl font-bold text-slate-800 text-center mb-1">
                    What are your wellness goals{" "}
                    <span className="text-teal-600">right now</span>?
                  </h2>
                  <p className="text-slate-500 text-center text-sm mb-5">Select all that apply</p>

                  <div className="space-y-2.5">
                    {goals.map((goal) => {
                      const Icon = goal.icon;
                      const isSelected = data.primaryGoals.includes(goal.label);
                      return (
                        <button
                          key={goal.label}
                          onClick={() => toggleGoal(goal.label)}
                          className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all ${
                            isSelected
                              ? "border-teal-500 bg-teal-50"
                              : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl ${goal.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-slate-700" />
                          </div>
                          <span className={`flex-1 text-left font-medium ${isSelected ? "text-slate-800" : "text-slate-700"}`}>
                            {goal.label}
                          </span>
                          <div
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                              isSelected ? "border-teal-500 bg-teal-500" : "border-slate-300"
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
              </div>
            </motion.div>
          )}

          {step === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6">
                <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">
                  Do you have a <span className="text-teal-600">target timeline</span>?
                </h2>
                <p className="text-slate-500 text-center text-sm mb-5">When do you want to achieve your goal?</p>

                <div className="space-y-2.5">
                  {timelines.map((timeline) => {
                    const Icon = timeline.icon;
                    const isSelected = data.targetTimeline === timeline.label;
                    return (
                      <button
                        key={timeline.label}
                        onClick={() => setData({ ...data, targetTimeline: timeline.label })}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all ${
                          isSelected
                            ? "border-teal-500 bg-teal-50"
                            : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl ${timeline.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-slate-700" />
                        </div>
                        <span className={`flex-1 text-left font-medium ${isSelected ? "text-slate-800" : "text-slate-700"}`}>
                          {timeline.label}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? "border-teal-500 bg-teal-500" : "border-slate-300"
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {step === "pain" && (
            <motion.div
              key="pain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6">
                <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">
                  What are your biggest <span className="text-teal-600">struggles</span>?
                </h2>
                <p className="text-slate-500 text-center text-sm mb-5">Select up to 3 options</p>

                <div className="space-y-2">
                  {struggles.map((item) => {
                    const Icon = item.icon;
                    const isSelected = data.struggles.includes(item.label);
                    const isDisabled = !isSelected && data.struggles.length >= 3;
                    return (
                      <button
                        key={item.label}
                        onClick={() => toggleStruggle(item.label)}
                        disabled={isDisabled}
                        className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                          isSelected
                            ? "border-teal-500 bg-teal-50"
                            : isDisabled
                            ? "border-slate-50 bg-slate-50 opacity-40 cursor-not-allowed"
                            : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-4 h-4 text-slate-700" />
                        </div>
                        <span className={`flex-1 text-left text-sm font-medium ${isSelected ? "text-slate-800" : "text-slate-700"}`}>
                          {item.label}
                        </span>
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                            isSelected ? "border-teal-500 bg-teal-500" : "border-slate-300"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

{step === "frustrations" && (
              <motion.div
                key="frustrations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-md"
              >
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6">
                  <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">
                    What <span className="text-teal-600">frustrates</span> you most?
                  </h2>
                  <p className="text-slate-500 text-center text-sm mb-5">Select all that apply</p>

                  <div className="space-y-2.5">
                    {frustrations.map((item) => {
                      const Icon = item.icon;
                      const isSelected = data.frustrations.includes(item.label);
                      return (
                        <button
                          key={item.label}
                          onClick={() => toggleFrustration(item.label)}
                          className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all ${
                            isSelected
                              ? "border-teal-500 bg-teal-50"
                              : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-slate-700" />
                          </div>
                          <span className={`flex-1 text-left font-medium ${isSelected ? "text-slate-800" : "text-slate-700"}`}>
                            {item.label}
                          </span>
                          <div
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                              isSelected ? "border-teal-500 bg-teal-500" : "border-slate-300"
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

          {step === "ai" && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6">
<div className="flex items-center justify-center gap-2 mb-2">
                    <Bot className="w-6 h-6 text-teal-600" />
                    <h2 className="text-2xl font-bold text-slate-800">
                      AI-Powered Features That <span className="text-teal-600">Matter Most to You</span>
                    </h2>
                  </div>
                <p className="text-slate-500 text-center text-sm mb-5">
                  Rate how helpful these would be (1-5)
                </p>

                <div className="space-y-3">
                  {aiFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <div key={feature.key} className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-lg ${feature.color} flex items-center justify-center`}>
                            <Icon className="w-4 h-4 text-slate-700" />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{feature.label}</span>
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              onClick={() => setRating(feature.key, n)}
                              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                                data.aiHelpfulnessRatings[feature.key] === n
                                  ? "bg-teal-500 text-white shadow-md shadow-teal-200"
                                  : "bg-white border border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50"
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

{step === "expectations" && (
              <motion.div
                key="expectations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-md"
              >
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6">
                  <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">
                    What do you <span className="text-teal-600">expect</span>?
                  </h2>
                  <p className="text-slate-500 text-center text-sm mb-5">Select all that apply</p>

                  <div className="space-y-2.5 mb-6">
                    {appExpectations.map((item) => {
                      const Icon = item.icon;
                      const isSelected = data.appExpectations.includes(item.value);
                      return (
                        <button
                          key={item.value}
                          onClick={() => toggleExpectation(item.value)}
                          className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all ${
                            isSelected
                              ? "border-teal-500 bg-teal-50"
                              : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-slate-700" />
                          </div>
                          <span className={`flex-1 text-left font-medium text-sm ${isSelected ? "text-slate-800" : "text-slate-700"}`}>
                            {item.label}
                          </span>
                          <div
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                              isSelected ? "border-teal-500 bg-teal-500" : "border-slate-300"
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100">
                    <p className="text-sm font-medium text-slate-700 mb-3">
                      Would you like app updates &amp; tips from MyCalAgent?
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Yes", "Maybe", "No"].map((option) => (
                        <button
                          key={option}
                          onClick={() => setData({ ...data, earlyAccess: option })}
                          className={`py-3 rounded-xl font-semibold transition-all ${
                            data.earlyAccess === option
                              ? "bg-teal-500 text-white shadow-md shadow-teal-200"
                              : "bg-white border border-slate-200 text-slate-600 hover:border-teal-300"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Free-text suggestions box */}
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">
                      Anything Else You&apos;d Love MyCalAgent To Help With?{" "}
                      <span className="text-slate-400 font-normal">(Optional)</span>
                    </p>
                    <div className="relative">
                      <textarea
                        value={data.additionalSuggestions}
                        onChange={(e) => {
                          if (e.target.value.length <= 200) {
                            setData({ ...data, additionalSuggestions: e.target.value });
                          }
                        }}
                        rows={3}
                        placeholder="Example: understanding food reactions, tracking gut health, improving sleep, better fasting insights…"
                        className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:outline-none transition-all"
                      />
                      <span className={`absolute bottom-2.5 right-3 text-xs ${
                        data.additionalSuggestions.length >= 180 ? "text-amber-500" : "text-slate-400"
                      }`}>
                        {data.additionalSuggestions.length}/200
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          {step === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-200">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Thank you!</h1>
                <p className="text-slate-600 mb-6">
                  Your responses will help us build a better experience tailored to your needs.
                </p>
                <div className="bg-teal-50 border border-teal-100 p-4 rounded-2xl mb-6">
                  <p className="text-sm text-teal-700">
                    We'll send app updates and wellness tips to <span className="font-semibold">{data.email}</span>.
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all font-medium text-slate-700"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {step !== "intro" && step !== "complete" && (
          <div className="w-full max-w-md mt-6 flex gap-3">
            <button
              onClick={handleBack}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl transition-all font-medium text-slate-700 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold transition-all ${
                canProceed() && !isSubmitting
                  ? "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-200"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : step === "expectations" ? (
                "Submit"
              ) : (
                "Next"
              )}
            </button>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}
      </main>
    </div>
  );
}
