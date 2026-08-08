"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const rows = [
  { traditional: "Manual food logging", mycalagent: "AI meal recognition from photos" },
  { traditional: "Generic calorie counting", mycalagent: "Personalized wellness insights" },
  { traditional: "Static dashboards", mycalagent: "AI pattern recognition over time" },
  { traditional: "Macro-focused only", mycalagent: "Whole-person wellness tracking" },
  { traditional: "No behavioral intelligence", mycalagent: "Food, mood & habit awareness" },
  { traditional: "Reactive data entry", mycalagent: "Proactive AI-powered nudges" },
];

export default function WellnessComparisonSection() {
  return (
    <section className="relative py-20 px-6" aria-labelledby="comparison-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Why MyCalAgent Is Different</p>
          <h2 id="comparison-heading" className="text-4xl md:text-5xl font-bold mb-4">
            Beyond Traditional
            <span className="gradient-text"> Calorie Tracking</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Most calorie apps make you do the work. MyCalAgent works with you — using AI to surface the insights that actually change behavior.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl overflow-hidden border border-border/50 shadow-xl"
        >
          {/* Header */}
          <div className="grid grid-cols-2 bg-muted/60">
            <div className="px-6 py-4 text-sm font-semibold text-muted-foreground">Traditional Apps</div>
            <div className="px-6 py-4 text-sm font-semibold text-emerald-600 bg-emerald-500/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              MyCalAgent
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 border-t border-border/30 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
            >
              <div className="px-6 py-4 flex items-start gap-3">
                <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{row.traditional}</span>
              </div>
              <div className="px-6 py-4 flex items-start gap-3 bg-emerald-500/5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-medium">{row.mycalagent}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
