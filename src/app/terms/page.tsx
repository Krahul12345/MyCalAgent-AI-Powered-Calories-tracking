import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service - MyCalAgent",
  description: "Read the MyCalAgent Terms of Service covering usage rules, medical disclaimers, AI accuracy, subscriptions, liability limits, and dispute resolution.",
  alternates: { canonical: "https://www.mycalagent.com/terms" },
  openGraph: {
    title: "Terms of Service - MyCalAgent",
    description: "Terms governing your use of MyCalAgent — the AI-powered calorie and wellness tracking platform.",
    url: "https://www.mycalagent.com/terms",
  },
};

const termsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.mycalagent.com/terms#webpage",
      url: "https://www.mycalagent.com/terms",
      name: "Terms of Service - MyCalAgent",
      description: "Terms of Service for MyCalAgent, covering eligibility, subscriptions, AI disclaimers, liability, and dispute resolution.",
      inLanguage: "en",
      isPartOf: { "@id": "https://www.mycalagent.com/#website" },
      dateModified: "2026-04-01",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
          { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://www.mycalagent.com/terms" },
        ],
      },
    },
    {
      "@type": "DigitalDocument",
      name: "MyCalAgent Terms of Service",
      url: "https://www.mycalagent.com/terms",
      description: "Legal terms of service for the MyCalAgent AI wellness platform. Last updated April 2026.",
      inLanguage: "en",
      dateModified: "2026-04-01",
      publisher: {
        "@type": "Organization",
        name: "MyCalAgent LLC",
        url: "https://www.mycalagent.com",
        email: "support@mycalagent.com",
      },
      about: { "@type": "Thing", name: "Terms of Service" },
    },
  ],
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <section className="rounded-3xl border border-white/10 bg-white text-slate-900 shadow-2xl">
            <div className="px-8 py-10 sm:px-12 sm:py-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Terms of Service
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                <strong>Last Updated:</strong> April 2026
              </p>

              <div className="mt-8 space-y-8 text-base leading-7 text-slate-700">
                <div>
                  <p>
                    These Terms of Service ("Terms") govern your access to and
                    use of the MyCalAgent mobile application, website, and
                    related services (collectively, the "Service") operated by
                    MyCalAgent LLC ("Company", "we", "our", or "us"). By
                    accessing or using the Service, you agree to be bound by
                    these Terms.
                  </p>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    1. Description of Service
                  </h2>
                  <p className="mt-3">
                    MyCalAgent is an AI-powered wellness and calorie tracking
                    platform that enables users to:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Log meals using image recognition and manual input</li>
                    <li>
                      Track nutrition, hydration, fasting, and lifestyle signals
                    </li>
                    <li>
                      Receive AI-generated wellness insights based on user data
                    </li>
                  </ul>
                  <p className="mt-3">
                    The Service is intended for informational and lifestyle
                    purposes only.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    2. Medical Disclaimer
                  </h2>
                  <p className="mt-3">
                    MyCalAgent is not a medical or healthcare provider.
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>
                      The Service does not provide medical advice, diagnosis, or
                      treatment
                    </li>
                    <li>
                      AI-generated insights are non-clinical observations, not
                      recommendations
                    </li>
                    <li>
                      Always consult a licensed healthcare professional before
                      making health decisions
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-slate-600 italic">
                    Use of the Service does not establish any doctor-patient,
                    healthcare provider-patient, or professional-client
                    relationship between you and MyCalAgent LLC.
                  </p>
                  <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
                    <p className="font-semibold mb-1">🚨 Emergency Notice</p>
                    <p className="text-sm">
                      The Service is not intended for use in medical
                      emergencies. If you are experiencing a medical emergency,
                      call 911 (in the United States) or your local emergency
                      number, or seek immediate medical attention.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    3. AI &amp; Accuracy Disclaimer
                  </h2>
                  <p className="mt-3">
                    The Service uses artificial intelligence to generate
                    nutrition estimates and wellness insights. You acknowledge
                    that:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>
                      Results may be inaccurate, incomplete, or approximate
                    </li>
                    <li>
                      AI outputs are based on pattern recognition, not medical
                      science
                    </li>
                    <li>
                      The Service should not be relied upon for critical health
                      decisions
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    4. Assumption of Risk
                  </h2>
                  <p className="mt-3">
                    By using the Service, you acknowledge and agree that:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>You use the Service at your own risk</li>
                    <li>
                      You acknowledge that use of AI-generated insights involves
                      inherent uncertainty
                    </li>
                    <li>
                      You are solely responsible for any decisions or actions
                      taken based on the information provided
                    </li>
                    <li>
                      The Company is not responsible for outcomes resulting from
                      your use of the Service
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    5. User Accounts
                  </h2>
                  <p className="mt-3">
                    To use certain features, you must create an account. You
                    agree to:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>
                      Maintain the confidentiality of your login credentials
                    </li>
                    <li>Be responsible for all activity under your account</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    6. Eligibility
                  </h2>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>You must be at least 18 years old, or</li>
                    <li>Have consent from a parent or legal guardian</li>
                  </ul>
                  <p className="mt-3">
                    The Service is not intended for children under 13.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    7. Subscriptions &amp; Billing
                  </h2>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>The Service may offer paid subscriptions</li>
                    <li>
                      Payments are processed via Apple App Store or Google Play
                    </li>
                    <li>
                      Billing, renewals, and refunds are governed by those
                      platforms
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    8. Acceptable Use
                  </h2>
                  <p className="mt-3">You agree NOT to:</p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Use the Service for medical diagnosis or treatment</li>
                    <li>Upload illegal, harmful, or misleading content</li>
                    <li>Reverse engineer or misuse AI systems</li>
                    <li>
                      Attempt unauthorized access or disrupt the Service
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    9. Intellectual Property
                  </h2>
                  <p className="mt-3">
                    All content, software, branding, AI models, and technology
                    are owned by MyCalAgent LLC. You may not:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>
                      Copy, reproduce, or distribute any part of the Service
                    </li>
                    <li>
                      Use the Service for commercial purposes without permission
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    10. No Warranties
                  </h2>
                  <p className="mt-3">
                    The Service is provided "as is" and "as available," without
                    warranties of any kind. We make no warranties regarding:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Accuracy or reliability of results</li>
                    <li>Availability or uptime</li>
                    <li>Fitness for a particular purpose</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    11. Limitation of Liability
                  </h2>
                  <p className="mt-3">
                    To the fullest extent permitted by law, MyCalAgent LLC shall
                    not be liable for:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Any indirect, incidental, or consequential damages</li>
                    <li>
                      Health-related decisions made using the Service
                    </li>
                    <li>
                      Errors, inaccuracies, or interruptions in the Service
                    </li>
                  </ul>
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                    <p className="font-semibold text-slate-900">
                      Maximum Liability Cap
                    </p>
                    <p className="mt-1 text-sm">
                      In no event shall MyCalAgent LLC&apos;s total liability
                      exceed the amount paid by you (if any) for the Service in
                      the past 12 months.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    12. Indemnification
                  </h2>
                  <p className="mt-3">
                    You agree to indemnify and hold harmless MyCalAgent LLC from
                    any claims, damages, or liabilities arising from:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Your use of the Service</li>
                    <li>Your violation of these Terms</li>
                    <li>Your misuse of AI-generated insights</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    13. Data &amp; Privacy
                  </h2>
                  <p className="mt-3">
                    Your use of the Service is also governed by our Privacy
                    Policy. By using the Service, you consent to:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Collection and processing of your data</li>
                    <li>
                      Use of third-party providers for AI, analytics, and
                      infrastructure
                    </li>
                  </ul>
                  <p className="mt-3">
                    MyCalAgent is not a HIPAA-covered entity.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    14. Service Availability
                  </h2>
                  <p className="mt-3">We do not guarantee:</p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Continuous availability</li>
                    <li>Error-free performance</li>
                    <li>Data retention without loss</li>
                  </ul>
                  <p className="mt-3">
                    We are not responsible for service interruptions, data
                    loss, or system errors. We reserve the right to modify, suspend, or
                    discontinue any part of the Service at any time without
                    liability.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    15. Termination
                  </h2>
                  <p className="mt-3">
                    We may suspend or terminate your access if:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>You violate these Terms</li>
                    <li>You misuse the Service</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    16. Governing Law
                  </h2>
                  <p className="mt-3">These Terms are governed by the laws of:</p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>The United States</li>
                    <li>The State of Wisconsin</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    17. Dispute Resolution (Binding Arbitration)
                  </h2>
                  <p className="mt-3">
                    Any disputes arising from these Terms shall be resolved
                    through:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Binding arbitration, not court proceedings</li>
                    <li>
                      Arbitration shall be conducted in the State of Wisconsin
                      in accordance with applicable arbitration rules
                    </li>
                  </ul>
                  <p className="mt-3">
                    You waive your right to participate in:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Class action lawsuits</li>
                    <li>Jury trials</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    18. Force Majeure
                  </h2>
                  <p className="mt-3">
                    We are not liable for any failure or delay in performance
                    due to events beyond our reasonable control, including but
                    not limited to outages, natural disasters, or third-party
                    service failures.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    19. Severability
                  </h2>
                  <p className="mt-3">
                    If any provision of these Terms is found to be
                    unenforceable, the remaining provisions will remain in full
                    force and effect.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    20. Entire Agreement
                  </h2>
                  <p className="mt-3">
                    These Terms constitute the entire agreement between you and
                    MyCalAgent LLC regarding the Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    21. Changes to Terms
                  </h2>
                  <p className="mt-3">
                    We may update these Terms from time to time. Continued use
                    of the Service after updates constitutes acceptance of the
                    revised Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    22. Contact Information
                  </h2>
                  <p className="mt-3">
                    MyCalAgent LLC
                    <br />
                    Email: support@mycalagent.com
                    <br />
                    Website: https://www.mycalagent.com
                  </p>
                </section>

                <p className="pt-4 text-sm text-slate-500">
                  © 2026 MyCalAgent LLC. All rights reserved.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
