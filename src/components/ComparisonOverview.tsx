"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const comparisons = [
  {
    name: "MyCalAgent",
    bestFor: "AI-powered quick logging",
    price: "$6.99/mo",
    rating: 5,
    highlight: true,
  },
  {
    name: "Cal AI",
    bestFor: "AI-based quick logging",
    price: "$9.99/mo",
    rating: 4,
  },
  {
    name: "MyFitnessPal",
    bestFor: "Extensive food database",
    price: "$19.99/mo",
    rating: 4,
  },
];

export const ComparisonOverview = () => {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-black tracking-tighter uppercase mb-6 border border-emerald-500/20"
          >
            <Check className="w-4 h-4" />
            Recommended
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            Comparison of Popular <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Calorie Tracking Apps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            See how MyCalAgent compares to other top-rated calorie tracking solutions in terms of speed, AI capabilities, and value.
          </p>
        </div>

        <div className="relative group">
          {/* Decorative background glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-background/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
            <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <h3 className="text-2xl font-bold tracking-tight">Comparison Overview</h3>
              <div className="hidden sm:flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-muted-foreground uppercase text-xs font-black tracking-widest">
                    <th className="px-8 py-6">App</th>
                    <th className="px-8 py-6">Best For</th>
                    <th className="px-8 py-6">Premium Price</th>
                    <th className="px-8 py-6 text-center">Feature Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((app) => (
                    <tr 
                      key={app.name} 
                      className={`border-b border-white/5 transition-all duration-300 hover:bg-white/5 ${
                        app.highlight ? "bg-emerald-500/10" : ""
                      }`}
                    >
                      <td className="px-8 py-8">
                        <span className={`text-xl font-black tracking-tight ${app.highlight ? "text-emerald-400" : "text-foreground"}`}>
                          {app.name}
                        </span>
                      </td>
                      <td className="px-8 py-8">
                        <span className={`font-bold ${app.highlight ? "text-emerald-400" : "text-muted-foreground"}`}>
                          {app.bestFor}
                        </span>
                      </td>
                      <td className="px-8 py-8">
                        <span className={`font-black text-lg ${app.highlight ? "text-emerald-400" : "text-muted-foreground"}`}>
                          {app.price}
                        </span>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center justify-center gap-1.5">
                          {[...Array(app.rating)].map((_, i) => (
                            <div key={i} className={`p-1 rounded-md ${app.highlight ? "bg-emerald-500/20" : "bg-white/5"}`}>
                              <Check className={`w-4 h-4 ${app.highlight ? "text-emerald-400" : "text-muted-foreground/50"}`} strokeWidth={3} />
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 bg-white/5 text-center">
              <Link 
                href="/comparisons/best-calorie-tracking-app" 
                className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black font-black rounded-2xl hover:bg-emerald-400 transition-all hover:scale-105 shadow-xl shadow-emerald-500/20"
              >
                View Detailed Comparison
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
