"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaRedditAlien, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { openCookiePreferences } from "@/components/CookieConsent";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const socialLinks = [
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "#",
    color: "#E4405F",
  },
  {
    label: "Facebook",
    icon: FaFacebookF,
    href: "#",
    color: "#1877F2",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    href: "#",
    color: "#0A66C2",
  },
  {
    label: "X",
    icon: FaXTwitter,
    href: "#",
    color: "#111111",
  },
  {
    label: "Reddit",
    icon: FaRedditAlien,
    href: "#",
    color: "#FF4500",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    href: "https://youtube.com/shorts/OrdcECgmelU",
    color: "#FF0000",
  },
];

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border bg-white/60 px-6 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 mb-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/mycalagent-logo.webp"
                  alt="MyCalAgent Logo"
                  width={44}
                  height={44}
                  className="w-11 h-11 object-contain flex-shrink-0"
                />
                <h3 className="text-lg font-bold leading-none">MyCal<span style={{ color: "#158341" }}>Agent</span></h3>
              </div>
              <p className="text-sm text-muted-foreground">
                AI Wellness Intelligence — understand how meals, hydration &amp; habits affect how you feel.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ label, icon: Icon, href, color }) =>
                    <a
                      key={label}
                      href={href}
                      target={href === "#" ? undefined : "_blank"}
                      rel={href === "#" ? undefined : "noopener noreferrer"}
                      aria-label={href === "#" ? `${label} link coming soon` : label}
                      onClick={href === "#" ? event => event.preventDefault() : undefined}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white transition-colors hover:border-primary/30"
                      style={{ color }}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
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
            <NewsletterSignup />

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
              <li>
                <a href="mailto:support@mycalagent.com" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  Contact
                </a>
              </li>
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
              © {new Date().getFullYear()} MyCalAgent. All rights reserved.
            </p>
          </div>

      </div>
    </footer>
  );
};
