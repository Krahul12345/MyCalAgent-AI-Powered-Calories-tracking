"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Globe, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { openCookiePreferences } from "@/components/CookieConsent";

const socialLinks = [
  {
    label: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/shorts/OrdcECgmelU",
    gradient: "from-red-500 via-red-600 to-red-700",
    shadow: "shadow-red-500/50",
    gloss: "from-white/30 to-transparent",
  },
  {
    label: "Facebook",
    icon: Facebook,
    href: "",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    shadow: "shadow-blue-500/50",
    gloss: "from-white/30 to-transparent",
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: "",
    gradient: "from-purple-500 via-pink-500 to-orange-400",
    shadow: "shadow-pink-500/50",
    gloss: "from-white/25 to-transparent",
  },
  {
    label: "X (Twitter)",
    icon: Twitter,
    href: "",
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    shadow: "shadow-slate-700/60",
    gloss: "from-white/20 to-transparent",
  },
  {
    label: "Rediff",
    icon: Globe,
    href: "",
    gradient: "from-orange-400 via-orange-500 to-orange-600",
    shadow: "shadow-orange-400/50",
    gloss: "from-white/30 to-transparent",
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "",
    gradient: "from-sky-500 via-sky-600 to-sky-700",
    shadow: "shadow-sky-500/50",
    gloss: "from-white/30 to-transparent",
  },
];

export const Footer = () => {
  return (
    <footer className="relative z-10 py-12 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mb-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/mycalagent-logo.webp"
                  alt="MyCalAgent Logo"
                  width={44}
                  height={44}
                  className="w-11 h-11 object-contain rounded-lg mix-blend-multiply flex-shrink-0"
                />
                <h3 className="text-lg font-bold leading-none">MyCal<span style={{ color: "#158341" }}>Agent</span></h3>
              </div>
              <p className="text-sm text-muted-foreground">
                AI Wellness Intelligence — understand how meals, hydration &amp; habits affect how you feel.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ label, icon: Icon, href, gradient, shadow, gloss }) =>
                  href ? (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={[
                        "relative inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                        "bg-gradient-to-br",
                        gradient,
                        "shadow-lg",
                        shadow,
                        "transition-all duration-200",
                        "hover:-translate-y-1 hover:scale-110",
                        "active:translate-y-0 active:scale-100",
                        "before:absolute before:inset-x-1 before:bottom-0 before:h-1.5 before:rounded-b-2xl before:bg-black/20",
                      ].join(" ")}
                    >
                      <span className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b ${gloss}`} />
                      <Icon className="h-4 w-4 text-white relative z-10 drop-shadow-sm" />
                    </a>
                  ) : (
                    <span
                      key={label}
                      aria-label={`${label} (coming soon)`}
                      title={`${label} – coming soon`}
                      className={[
                        "relative inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                        "bg-gradient-to-br",
                        gradient,
                        "shadow-lg",
                        shadow,
                        "opacity-40 cursor-not-allowed",
                        "before:absolute before:inset-x-1 before:bottom-0 before:h-1.5 before:rounded-b-2xl before:bg-black/20",
                      ].join(" ")}
                    >
                      <span className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b ${gloss}`} />
                      <Icon className="h-4 w-4 text-white relative z-10 drop-shadow-sm" />
                    </span>
                  )
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/how-mycalagent-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
                <li><Link href="/ai-wellness-insights" className="hover:text-foreground transition-colors">AI Insights</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
                <li><Link href="/how-ai-meal-analysis-works" className="hover:text-foreground transition-colors">How AI Works</Link></li>
                <li><Link href="/why-calorie-tracking-fails" className="hover:text-foreground transition-colors">Why Calorie Counting Fails</Link></li>
                <li><Link href="/macro-calorie-calculator" className="hover:text-foreground transition-colors">Macro Calculator</Link></li>
              </ul>
            </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Compare</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/comparisons/mycalagent-vs-myfitnesspal" className="hover:text-foreground transition-colors">vs MyFitnessPal</Link></li>
              <li><Link href="/comparisons/mycalagent-vs-noom" className="hover:text-foreground transition-colors">vs Noom</Link></li>
              <li><Link href="/comparisons/mycalagent-vs-lose-it" className="hover:text-foreground transition-colors">vs Lose It</Link></li>
              <li><Link href="/comparisons/mycalagent-vs-cronometer" className="hover:text-foreground transition-colors">vs Cronometer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/research" className="hover:text-foreground transition-colors">Research</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link href="/ai-disclaimer" className="hover:text-foreground transition-colors">AI Disclaimer</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-foreground transition-colors">Editorial Policy</Link></li>
              <li><Link href="/security" className="hover:text-foreground transition-colors">Security</Link></li>
              <li><a href="/llms.txt" className="hover:text-foreground transition-colors">AI Site Index</a></li>
              <li>
                <button
                  onClick={openCookiePreferences}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>
        </div>
          <div className="pt-8 border-t border-border/50 text-center space-y-2">
            <p className="text-xs text-muted-foreground italic">
              MyCalAgent is a wellness and lifestyle application and is not intended to provide medical advice, diagnosis, or treatment.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 MyCalAgent. All rights reserved.
            </p>
          </div>

      </div>
    </footer>
  );
};
