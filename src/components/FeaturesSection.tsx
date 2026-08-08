"use client";

import { Brain, Zap, Shield, TrendingUp, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI Meal Recognition",
    description: "Snap a photo of any meal and MyCalAgent's AI identifies every ingredient and estimates portions automatically — no manual logging, no searching.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Instant Nutrition Analysis",
    description: "Get calories, protein, carbs, and fat in seconds — the raw signals your body is working with right now, delivered before you take your next bite.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Wellness Pattern Recognition",
    description: "AI connects the dots across days and weeks — surfacing recurring patterns in your meals, energy levels, hydration, and habits that you'd never spot manually.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Privacy-First Design",
    description: "Your health data stays yours. MyCalAgent is built with end-to-end encryption and gives you full control over what you share — always.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Clock,
    title: "Food & Habit Awareness",
    description: "Understand how meal timing, fasting windows, and daily habits shape your energy, focus, and mood — connecting behavior to outcomes over time.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Users,
    title: "Holistic Wellness Tracking",
    description: "Track hydration, caffeine, alcohol, fasting, and nutrition together — building a complete picture of your wellness, not just your macros.",
    color: "from-pink-500 to-rose-500",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-20 px-6" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">AI Wellness Intelligence</p>
          <h2 id="features-heading" className="text-4xl md:text-5xl font-bold mb-4">
            How MyCalAgent Reads
            <br />
            <span className="gradient-text">Your Body&apos;s Signals</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Most apps just log. MyCalAgent connects the dots — between what you eat, how you feel, and how your body responds — revealing patterns you&apos;d never spot alone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-3xl glass-card hover:glass transition-all duration-500 hover:scale-105 glow-hover">
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5`}>
                    <div className="w-full h-full rounded-2xl bg-background dark:bg-card flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-foreground" />
                    </div>
                  </div>
                  <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                </div>

                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card">
            <span className="text-sm text-muted-foreground">
              Designed for people who want real wellness intelligence, not just numbers
            </span>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-background"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-background flex items-center justify-center text-xs font-bold text-white">
                +2K
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
