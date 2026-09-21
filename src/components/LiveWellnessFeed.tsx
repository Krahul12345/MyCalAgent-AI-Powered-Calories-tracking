"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCookieBanner } from "@/lib/CookieBannerContext";

type FeedCategory =
  | "AI Insight"
  | "Hydration Trend"
  | "Fasting Milestone"
  | "Wellness Signal"
  | "Meal Intelligence"
  | "Apple Health Sync"
  | "Mood Pattern"
  | "Caffeine Trend";

interface FeedMessage {
  category: FeedCategory;
  name: string;
  city: string;
  action: string;
}

const CATEGORY_COLORS: Record<FeedCategory, string> = {
  "AI Insight":        "#10B981",
  "Hydration Trend":   "#3B82F6",
  "Fasting Milestone": "#F97316",
  "Wellness Signal":   "#8B5CF6",
  "Meal Intelligence": "#15803D",
  "Apple Health Sync": "#6366F1",
  "Mood Pattern":      "#EC4899",
  "Caffeine Trend":    "#F59E0B",
};

const MESSAGES: FeedMessage[] = [
  { category: "Hydration Trend",   name: "Megan",       city: "Austin",         action: "discovered a hydration pattern" },
  { category: "Meal Intelligence", name: "Kevin",       city: "Chicago",        action: "logged dinner with AI meal analysis" },
  { category: "Fasting Milestone", name: "Sofia",       city: "Seattle",        action: "activated a 16:8 fasting window" },
  { category: "Caffeine Trend",    name: "Sophia",      city: "Boston",         action: "spotted a caffeine trend" },
  { category: "Wellness Signal",   name: "Daniel",      city: "Miami",          action: "reviewed his weekly wellness insight" },
  { category: "Meal Intelligence", name: "Isabella",    city: "San Jose",       action: "scanned breakfast in seconds" },
  { category: "AI Insight",        name: "Noah",        city: "Denver",         action: "checked his calorie balance" },
  { category: "Mood Pattern",      name: "Priya",       city: "Dallas",         action: "found a late-night snacking pattern" },
  { category: "Apple Health Sync", name: "Emma",        city: "Portland",       action: "connected Apple Health" },
  { category: "Fasting Milestone", name: "Ryan",        city: "Phoenix",        action: "completed a fasting streak" },
  { category: "Hydration Trend",   name: "Ava",         city: "Orlando",        action: "logged hydration after a workout" },
  { category: "Caffeine Trend",    name: "Ethan",       city: "Atlanta",        action: "tracked coffee intake with AI" },
  { category: "AI Insight",        name: "Mia",         city: "San Diego",      action: "discovered an energy dip pattern" },
  { category: "Wellness Signal",   name: "Lucas",       city: "Nashville",      action: "updated his wellness goals" },
  { category: "Meal Intelligence", name: "Charlotte",   city: "Tampa",          action: "scanned lunch with AI nutrition analysis" },
  { category: "AI Insight",        name: "Benjamin",    city: "Houston",        action: "tracked protein intake for the week" },
  { category: "Hydration Trend",   name: "Harper",      city: "Minneapolis",    action: "reviewed her hydration score" },
  { category: "Mood Pattern",      name: "Elijah",      city: "Charlotte",      action: "connected sleep and meal timing" },
  { category: "Meal Intelligence", name: "Amelia",      city: "San Diego",      action: "tracked nutrients for dinner" },
  { category: "Hydration Trend",   name: "James",       city: "Detroit",        action: "activated hydration reminders" },
  { category: "Fasting Milestone", name: "Olivia",      city: "New York",       action: "reviewed fasting consistency" },
  { category: "Meal Intelligence", name: "Liam",        city: "Columbus",       action: "logged a high-protein breakfast" },
  { category: "AI Insight",        name: "Marco",       city: "Las Vegas",      action: "identified a sugar intake trend" },
  { category: "Apple Health Sync", name: "Henry",       city: "Philadelphia",   action: "synced workout data from Apple Health" },
  { category: "Hydration Trend",   name: "Grace",       city: "Sacramento",     action: "spotted a low hydration pattern" },
  { category: "Meal Intelligence", name: "Jack",        city: "Milwaukee",      action: "completed his evening meal log" },
  { category: "Caffeine Trend",    name: "Chloe",       city: "Raleigh",        action: "tracked caffeine before noon" },
  { category: "Mood Pattern",      name: "Michael",     city: "Indianapolis",   action: "discovered a food and mood insight" },
  { category: "Fasting Milestone", name: "Ella",        city: "Kansas City",    action: "updated her fasting schedule" },
  { category: "Meal Intelligence", name: "Alexander",   city: "San Antonio",    action: "scanned a post-workout meal" },
  { category: "Wellness Signal",   name: "Scarlett",    city: "San Francisco",  action: "reviewed her macro balance" },
  { category: "Hydration Trend",   name: "Mateo",       city: "Brooklyn",       action: "logged hydration progress" },
  { category: "AI Insight",        name: "Lily",        city: "Bellevue",       action: "activated smart meal reminders" },
  { category: "Mood Pattern",      name: "David",       city: "Cleveland",      action: "identified a late-night eating habit" },
  { category: "Wellness Signal",   name: "Emily",       city: "Arlington",      action: "tracked calorie balance after cardio" },
  { category: "AI Insight",        name: "Sebastian",   city: "Los Angeles",    action: "reviewed his weekly nutrition trends" },
  { category: "Meal Intelligence", name: "Aria",        city: "Jersey City",    action: "scanned breakfast with AI detection" },
  { category: "Hydration Trend",   name: "Matthew",     city: "Salt Lake City", action: "connected hydration with energy levels" },
  { category: "Fasting Milestone", name: "Avery",       city: "Madison",        action: "completed her fasting goal" },
  { category: "Meal Intelligence", name: "Joseph",      city: "Cincinnati",     action: "tracked micronutrients for lunch" },
  { category: "Caffeine Trend",    name: "Camila",      city: "Irvine",         action: "logged coffee servings automatically" },
  { category: "Wellness Signal",   name: "Samuel",      city: "Pittsburgh",     action: "reviewed wellness signals from the week" },
  { category: "Hydration Trend",   name: "Victoria",    city: "Scottsdale",     action: "found a hydration consistency trend" },
  { category: "AI Insight",        name: "Carter",      city: "Orlando",        action: "updated his calorie target" },
  { category: "Mood Pattern",      name: "Hannah",      city: "Oakland",        action: "tracked meal timing patterns" },
  { category: "Mood Pattern",      name: "Owen",        city: "Tampa",          action: "connected sleep quality with late dinners" },
  { category: "AI Insight",        name: "Riley",       city: "Portland",       action: "discovered an afternoon energy pattern" },
  { category: "Apple Health Sync", name: "Luke",        city: "Seattle",        action: "synced steps and calories from Apple Health" },
  { category: "Meal Intelligence", name: "Mila",        city: "Denver",         action: "scanned a healthy breakfast bowl" },
  { category: "Hydration Trend",   name: "Julian",      city: "Chicago",        action: "tracked hydration throughout the day" },
  { category: "Caffeine Trend",    name: "Layla",       city: "Phoenix",        action: "identified a caffeine balance trend" },
  { category: "Wellness Signal",   name: "Levi",        city: "Miami",          action: "completed his wellness check-in" },
  { category: "Mood Pattern",      name: "Nora",        city: "San Jose",       action: "reviewed food and focus insights" },
  { category: "Meal Intelligence", name: "Isaac",       city: "Dallas",         action: "logged macros after dinner" },
  { category: "Fasting Milestone", name: "Ellie",       city: "Boston",         action: "tracked her fasting streak" },
  { category: "Hydration Trend",   name: "Anthony",     city: "Atlanta",        action: "connected hydration with productivity" },
  { category: "AI Insight",        name: "Hazel",       city: "San Diego",      action: "discovered a consistent sleep pattern" },
  { category: "Meal Intelligence", name: "Dylan",       city: "Charlotte",      action: "scanned lunch in under 5 seconds" },
  { category: "Wellness Signal",   name: "Stella",      city: "New York",       action: "reviewed weekly wellness analytics" },
  { category: "Hydration Trend",   name: "Christopher", city: "Houston",        action: "activated smart hydration goals" },
  { category: "Caffeine Trend",    name: "Aurora",      city: "Minneapolis",    action: "tracked caffeine intake with AI" },
  { category: "AI Insight",        name: "Joshua",      city: "Philadelphia",   action: "discovered a meal timing insight" },
  { category: "Fasting Milestone", name: "Natalie",     city: "Orlando",        action: "completed her hydration target" },
  { category: "Apple Health Sync", name: "Andrew",      city: "San Francisco",  action: "connected workouts with calorie balance" },
  { category: "Meal Intelligence", name: "Savannah",    city: "Brooklyn",       action: "logged a healthy breakfast photo" },
  { category: "Wellness Signal",   name: "Thomas",      city: "Austin",         action: "reviewed his wellness progress report" },
  { category: "Fasting Milestone", name: "Claire",      city: "Denver",         action: "tracked fasting and hydration together" },
  { category: "AI Insight",        name: "Leo",         city: "Seattle",        action: "identified a recurring evening craving" },
  { category: "Meal Intelligence", name: "Violet",      city: "Miami",          action: "scanned dinner with instant AI nutrition" },
  { category: "Wellness Signal",   name: "Nathan",      city: "Portland",       action: "reviewed personalized wellness insights" },
  { category: "Hydration Trend",   name: "Lucy",        city: "Las Vegas",      action: "connected hydration habits with focus" },
  { category: "Meal Intelligence", name: "Eleanor",     city: "Chicago",        action: "discovered a weekly nutrition trend" },
];

const TIMESTAMPS = ["just now", "1 min ago", "2 mins ago", "3 mins ago", "4 mins ago"];

export default function LiveWellnessFeed() {
  const [index, setIndex] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState("just now");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReduced = useRef(false);
  const { isCookieBannerVisible } = useCookieBanner();
  const pathname = usePathname();

  const shouldHide = pathname !== "/";

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Client-only init avoids hydration mismatch from random values
  useEffect(() => {
    setIndex(Math.floor(Math.random() * MESSAGES.length));
    setTimestamp(TIMESTAMPS[Math.floor(Math.random() * TIMESTAMPS.length)]);
  }, []);

  function startInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => ((prev ?? 0) + 1) % MESSAGES.length);
      setTimestamp(TIMESTAMPS[Math.floor(Math.random() * TIMESTAMPS.length)]);
    }, 8000);
  }

  // Single effect: start interval when index is ready and cookie is dismissed
  // pause/resume when cookie banner visibility changes
  useEffect(() => {
    if (index === null || isCookieBannerVisible) {
      // Clean up interval when cookie banner is visible or before index is ready
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [index, isCookieBannerVisible]);

  if (index === null || isCookieBannerVisible || shouldHide) return null;

  const msg = MESSAGES[index];
  const color = CATEGORY_COLORS[msg.category];

  return (
    <div
      className="fixed left-6 z-50 hidden select-none md:block"
      style={{
        maxWidth: 420,
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
      }}
      onMouseEnter={() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }}
      onMouseLeave={startInterval}
    >
      {/* Pill card */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm"
        style={{
          background: "rgba(255,255,255,0.93)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(226,232,240,0.9)",
          boxShadow: `0 2px 20px rgba(0,0,0,0.07), 0 0 0 1.5px ${color}44`,
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Pulsing dot */}
        <span className="relative flex-shrink-0" style={{ width: 10, height: 10 }}>
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: color, opacity: 0.45 }}
          />
          <span
            className="absolute inset-[1px] rounded-full"
            style={{ background: color }}
          />
        </span>

        {/* Animated message */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={prefersReduced.current ? false : { opacity: 0, y: 8, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={prefersReduced.current ? {} : { opacity: 0, y: -8, filter: "blur(2px)" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="leading-snug"
              style={{ color: "#0F172A" }}
            >
              <span className="font-bold">{msg.name}</span>
              <span style={{ color: "#64748B" }}> from {msg.city} </span>
              <span style={{ color: "#334155" }}>{msg.action}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Timestamp */}
        <span className="flex-shrink-0 text-[11px] whitespace-nowrap" style={{ color: "#94A3B8" }}>
          {timestamp}
        </span>
      </div>

    </div>
  );
}
