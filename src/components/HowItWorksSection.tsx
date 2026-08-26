"use client";

import { motion } from "framer-motion";
import { Camera, Brain, TrendingUp, Sparkles } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Camera,
    title: "Snap Your Meal",
    description: "Take a photo of any meal, snack, drink, or packaged product — just point, shoot, review, and save.",
    color: "from-purple-500 to-pink-500",
  },
  {
    step: "02",
    icon: Brain,
    title: "AI Analyzes Nutrition",
    description: "MyCalAgent's AI identifies every ingredient, estimates portions, and breaks down calories, protein, carbs, and fat in seconds.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Wellness Patterns Emerge",
    description: "Over time, the AI connects the dots across your meals, hydration, fasting windows, and daily habits to surface recurring signals.",
    color: "from-emerald-500 to-green-500",
  },
  {
    step: "04",
    icon: Sparkles,
    title: "Personalized Insights",
    description: "Receive AI-powered wellness insights tailored to your patterns — understanding how what you eat affects how you feel.",
    color: "from-orange-500 to-amber-500",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative py-20 px-6" aria-labelledby="how-it-works-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">How It Works</p>
          <h2 id="how-it-works-heading" className="text-4xl md:text-5xl font-bold mb-4">
            From Meal to
            <span className="gradient-text"> Wellness Intelligence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            MyCalAgent transforms a simple photo into deep wellness understanding — in four steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-purple-500/30 via-emerald-500/30 to-orange-500/30" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="flex justify-center mb-5">
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 shadow-lg`}>
                    <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                      <Icon className="w-7 h-7 text-foreground" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-border text-[10px] font-bold flex items-center justify-center text-muted-foreground">
                      {step.step}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
