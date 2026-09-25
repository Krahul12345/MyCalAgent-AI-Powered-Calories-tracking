"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const ComparisonCTA = () => {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight leading-tight">
            How Does <span className="text-[#0F5C39]">MyCalAgent</span> Compare <br className="hidden md:block" />
            to Other Calorie Tracking Apps?
          </h2>
          
          <Link 
            href="/comparisons/best-calorie-tracking-apps-2025" 
            className="group/btn inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 text-black font-black rounded-2xl hover:bg-emerald-400 transition-all hover:scale-105 shadow-2xl shadow-emerald-500/20 text-lg"
          >
            View Detailed Comparison
            <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
