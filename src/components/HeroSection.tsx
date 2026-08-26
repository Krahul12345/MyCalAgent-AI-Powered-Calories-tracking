"use client";

import { Sparkles, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import AppStoreButtons from "@/components/AppStoreButtons";

export default function HeroSection() {
  return (
    <section className="relative md:min-h-screen flex flex-col items-start md:items-center justify-center px-6 pt-20 pb-12 md:py-20 overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-5 md:mb-6 rounded-full glass-card text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="gradient-text">
                Intelligence, not just counting
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 leading-tight"
            >
              Feel how your body
              <br />
              <span className="gradient-text text-[0.8em]">really works</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-xl md:text-2xl mb-7 md:mb-8 space-y-4"
            >
              <p className="text-muted-foreground text-[0.9em]">
                Your body is constantly sending signals. Unlike traditional calorie counters,
                <strong className="text-foreground"> MyCalAgent is an AI-native wellness intelligence platform that </strong> connects the patterns behind meals, hydration, sleep, and fasting -
                surfacing how your lifestyle actually affects your daily energy, mood, and focus.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center lg:items-start gap-3"
            >
              <AppStoreButtons />
              <Link
                href="/survey"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ClipboardList className="w-4 h-4 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                Take the survey to personalize your experience
                <span className="text-emerald-500 group-hover:translate-x-0.5 transition-transform inline-block">→</span>
              </Link>
            </motion.div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-gray-500 justify-center lg:justify-start">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Privacy-First
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Apple Health Connected
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                100% Ad-Free
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 mt-10 lg:mt-16"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1">&lt;6s</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Average AI Meal Analysis</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1">AI</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Pattern Intelligence</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1">24/7</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Body Signal Tracking</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center items-center relative order-first lg:order-none mt-4 lg:mt-0"
          >
            <div className="relative w-full max-w-[22rem] sm:max-w-md lg:max-w-2xl min-h-[18rem] sm:min-h-[24rem] lg:min-h-[32rem]">
              <motion.div
                initial={{ opacity: 0, x: -30, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: -8 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute left-[6%] sm:left-0 top-1/2 -translate-y-1/2 w-[46%] z-10 animate-float"
              >
                <img
                  src="/hero-meal-scanner.webp"
                  alt="MyCalAgent AI meal scanner detecting food and nutrition patterns"
                  className="w-full h-auto rounded-[1.75rem] sm:rounded-[2rem] lg:rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(16,185,129,0.4)] transition-all duration-500 hover:scale-105"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 8 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="ml-auto w-[58%] sm:w-[55%] relative z-20 animate-float"
                style={{ animationDelay: "2s" }}
              >
                <img
                  src="/hero-progress-dashboard.webp"
                  alt="MyCalAgent wellness intelligence dashboard showing nutrition and habit patterns"
                  className="w-full h-auto rounded-[1.75rem] sm:rounded-[2rem] lg:rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(16,185,129,0.4)] transition-all duration-500 hover:scale-105"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
