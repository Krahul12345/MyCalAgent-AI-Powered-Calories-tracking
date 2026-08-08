"use client";

import { motion } from "framer-motion";
import { Zap, Droplets, Clock, Activity } from "lucide-react";
import Link from "next/link";

const insights = [
  {
    icon: Zap,
    title: "Energy Patterns",
    description: "Discover which meals fuel sustained energy and which trigger afternoon crashes. AI tracks the connection between what you eat and how alert you feel.",
    color: "from-yellow-400 to-orange-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
  },
  {
    icon: Droplets,
    title: "Hydration Awareness",
    description: "Learn how your daily water intake correlates with focus, mood, and physical performance. Most people underestimate how much hydration affects how they feel.",
    color: "from-blue-400 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    icon: Clock,
    title: "Meal Timing Intelligence",
    description: "Understand how meal timing — not just content — shapes your energy rhythms, sleep quality, and metabolic patterns throughout the day.",
    color: "from-purple-400 to-violet-500",
    bg: "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    icon: Activity,
    title: "Habit Recognition",
    description: "AI identifies recurring behavioral patterns across your logs — like late-night snacking or skipped breakfasts — so you can act on real data, not guesswork.",
    color: "from-emerald-400 to-green-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
  },
];

export default function FoodMoodSection() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" aria-labelledby="food-mood-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Food &amp; Mood Insights</p>
          <h2 id="food-mood-heading" className="text-4xl md:text-5xl font-bold mb-4">
            How Food Affects
            <span className="gradient-text"> Energy, Focus &amp; Mood</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your body responds to every meal, drink, and habit. MyCalAgent&apos;s AI makes those invisible connections visible — helping you understand patterns most people never see.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {insights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group p-7 rounded-3xl ${item.bg} border border-border/30 hover:border-border/60 transition-all duration-300 hover:shadow-lg`}
              >
                <div className={`inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} items-center justify-center mb-4 shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/ai-wellness-insights"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-emerald-500/40 text-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
          >
            Explore AI Wellness Insights →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
