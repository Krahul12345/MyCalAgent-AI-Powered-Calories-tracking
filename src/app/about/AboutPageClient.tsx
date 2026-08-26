"use client";

import { Navigation } from "@/components/Navigation";
import { QuickFAQ } from "@/components/QuickFAQ";
import { Footer } from "@/components/Footer";
import { Target, Users, Zap, Heart, Sparkles } from "lucide-react";
import AppStoreButtons from "@/components/AppStoreButtons";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

interface AboutPageClientProps {
  aboutFAQ: FAQ[];
}

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "We're committed to providing the most accurate nutritional data using cutting-edge AI technology.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Healthy eating should be simple for everyone. We make nutrition tracking effortless and intuitive.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Security & Innovation",
    description: "Your data stays yours. Wellness data is protected with encrypted Supabase storage and secure processing. We continuously push the boundaries of what's possible with computer vision and AI.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Heart,
    title: "Wellness",
    description: "Your health and wellbeing are at the center of everything we build.",
    color: "from-orange-500 to-red-500",
  }
];

export default function AboutPageClient({ aboutFAQ }: AboutPageClientProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AI That Helps You
              <br />
              <span className="gradient-text">Understand Your Body</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We&apos;re building AI wellness intelligence — helping people understand how meals, hydration, fasting, and daily habits affect how they actually feel.
            </p>
          </div>

          <div className="mb-20">
            <div className="max-w-4xl mx-auto p-10 rounded-3xl glass-card">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  MyCalAgent is built with a clear commitment: to become the most trusted AI wellness companion for everyday health — shaped continuously with the people who use it.
                </p>
                <p>
                  Our mission began with a simple belief: <b>your body leaves clues about how food and habits affect how you feel — but most people never see them. We wanted to change that.</b>
                </p>
                <p>
                  In 2026, a small team of AI engineers and wellness researchers came together with one clear vision: <b>to build an AI that doesn&apos;t just log what you eat — but helps you understand how it affects you.</b>
                </p>
                <p>
                  Today, we&apos;re working closely with customers, wellness experts, and researchers to keep bringing the latest and greatest product features into MyCalAgent — shaping it into the most insightful, privacy-respecting, and genuinely useful AI wellness intelligence platform available.
                </p>
                <p>
                  We&apos;re not building another calorie counter — we&apos;re building the future of personal wellness intelligence, together.
                </p>
              </div>
            </div>
            
<div className="text-center mt-8">
                <Link
                  href="/survey"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl gradient-primary text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)] glow-hover"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Take Survey &amp; Download</span>
                </Link>
              </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="group relative">
                    <div className="h-full p-6 rounded-3xl glass-card hover:glass text-center transition-all duration-500 hover:scale-105 glow-hover">
                      <div className="relative mb-4 mx-auto w-14 h-14">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} p-0.5`}>
                          <div className="w-full h-full rounded-xl bg-background dark:bg-card flex items-center justify-center">
                            <Icon className="w-7 h-7 text-foreground" />
                          </div>
                        </div>
                        <div className={`absolute inset-0 w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                      </div>

                      <h3 className="font-bold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>

                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-10 rounded-3xl glass-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">500K+</div>
                <div className="text-sm text-muted-foreground">Foods Recognized</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">10M+</div>
                <div className="text-sm text-muted-foreground">Scans Processed</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">150+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Join us on our mission</h2>
            <p className="text-muted-foreground mb-6">Help us make healthy eating simple for everyone.</p>
            <AppStoreButtons className="justify-center" />
          </div>
        </div>

        <QuickFAQ items={aboutFAQ} />
      </main>

      <Footer />
    </div>
  );
}
