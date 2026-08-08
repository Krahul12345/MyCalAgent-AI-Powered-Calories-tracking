"use client";

import { Navigation } from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQPageClientProps {
  faqs: FAQ[];
}

export default function FAQPageClient({ faqs }: FAQPageClientProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-28 sm:pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gradient">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              Everything you need to know about MyCalAgent — from how the AI works to billing and privacy.
            </p>
          </div>

          <div
            className="space-y-4"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border/50 bg-background/70 backdrop-blur-md p-5 sm:p-6 shadow-sm"
                itemScope
                itemType="https://schema.org/Question"
                itemProp="mainEntity"
              >
                <div className="flex items-start gap-3 mb-3">
                  <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <h2
                    className="font-semibold text-foreground text-base leading-snug"
                    itemProp="name"
                  >
                    {faq.question}
                  </h2>
                </div>
                <div
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-8"
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <span itemProp="text">{faq.answer}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center">
            <h3 className="text-xl font-semibold mb-2 text-foreground">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              We&apos;re here to help you on your wellness journey.
            </p>
            <a
              href="mailto:support@mycalagent.com"
              className="inline-block py-2 px-6 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
