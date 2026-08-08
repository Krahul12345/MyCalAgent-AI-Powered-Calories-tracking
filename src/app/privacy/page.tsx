import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import { QuickFAQ } from "@/components/QuickFAQ";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - MyCalAgent",
  description: "MyCalAgent Privacy Policy: how we collect, use, and protect your data. GDPR-compliant, no data selling, GA4 analytics opt-in only.",
  alternates: { canonical: "https://www.mycalagent.com/privacy" },
  openGraph: {
    title: "Privacy Policy - MyCalAgent",
    description: "How MyCalAgent handles your personal and wellness data — transparent, GDPR-aware, and privacy-first.",
    url: "https://www.mycalagent.com/privacy",
  },
};

const privacyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.mycalagent.com/privacy#webpage",
      url: "https://www.mycalagent.com/privacy",
      name: "Privacy Policy - MyCalAgent",
      description: "MyCalAgent Privacy Policy covering data collection, AI processing, GDPR legal basis, cookies, user rights, and data security.",
      inLanguage: "en",
      isPartOf: { "@id": "https://www.mycalagent.com/#website" },
      dateModified: "2026-04-01",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
          { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://www.mycalagent.com/privacy" },
        ],
      },
    },
    {
      "@type": "DigitalDocument",
      name: "MyCalAgent Privacy Policy",
      url: "https://www.mycalagent.com/privacy",
      description: "Privacy Policy for the MyCalAgent AI wellness platform. GDPR-compliant, last updated April 2026.",
      inLanguage: "en",
      dateModified: "2026-04-01",
      publisher: {
        "@type": "Organization",
        name: "MyCalAgent LLC",
        url: "https://www.mycalagent.com",
        email: "support@mycalagent.com",
      },
      about: [
        { "@type": "Thing", name: "Privacy Policy" },
        { "@type": "Thing", name: "GDPR Compliance" },
        { "@type": "Thing", name: "Data Protection" },
      ],
    },
  ],
};

const privacyFAQ = [
  {
    question: "What data does MyCalAgent collect?",
    answer:
      "Only data necessary to provide wellness tracking features, such as meals, preferences, and optional health integrations.",
  },
  {
    question: "Can I control my data?",
    answer: "Yes. Users can view, export, and delete their data at any time.",
  },
  {
    question: "Is health data required?",
    answer:
      "No. Health and device integrations are optional and require explicit permission.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <section className="rounded-3xl border border-white/10 bg-white text-slate-900 shadow-2xl">
            <div className="px-8 py-10 sm:px-12 sm:py-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Privacy Policy
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                <strong>Last Updated:</strong> April 2026
              </p>

              <div className="mt-8 space-y-8 text-base leading-7 text-slate-700">
                <div>
                  <p>
                    MyCalAgent LLC ("Company", "we", "our", or "us") respects your
                    privacy. This Privacy Policy explains how we collect, use,
                    disclose, and protect your information when you use the MyCalAgent
                    mobile app and website (the "Service").
                  </p>
                  <p className="mt-3">
                    By using the Service and providing your information, you consent
                    to the collection and use of your data as described in this
                    Privacy Policy.
                  </p>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    1. Information We Collect
                  </h2>

                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    A. Information You Provide
                  </h3>
                  <p className="mt-2">We may collect:</p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Name and email address</li>
                    <li>Age, gender, height, weight</li>
                    <li>Activity level, wellness goals</li>
                    <li>Meal photos uploaded for analysis</li>
                    <li>
                      Food logs, hydration, caffeine, alcohol, fasting inputs
                    </li>
                    <li>
                      Optional health and lifestyle data (e.g., mood, symptoms)
                    </li>
                  </ul>

                  <h3 className="mt-6 text-lg font-semibold text-slate-900">
                    B. Automatically Collected Information
                  </h3>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Device type, OS, and app version</li>
                    <li>Usage data and interaction logs</li>
                    <li>Crash diagnostics and performance data</li>
                    <li>IP address (for security and fraud prevention)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    2. How We Use Your Information
                  </h2>
                  <p className="mt-3">We use your data to:</p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Provide AI-powered calorie and wellness tracking</li>
                    <li>Generate personalized insights and pattern observations</li>
                    <li>Improve AI accuracy and product performance</li>
                    <li>Manage subscriptions and billing</li>
                    <li>Ensure security, prevent fraud, and debug issues</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    3. AI Processing &amp; Meal Images
                  </h2>
                  <p className="mt-3">When you upload meal photos:</p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>
                      Images are processed by AI models to estimate nutrition
                    </li>
                    <li>
                      Processing may involve trusted third-party providers (e.g., AI
                      APIs, cloud infrastructure)
                    </li>
                    <li>
                      Images may be temporarily processed and stored to generate
                      results
                    </li>
                  </ul>
                  <p className="mt-3 text-sm text-slate-600 italic">
                    AI-generated results are based on automated processing and
                    may not always be accurate or complete.
                  </p>
                  <p className="mt-4 font-medium text-slate-900">
                    We do NOT:
                  </p>
                  <ul className="mt-2 list-disc pl-6 space-y-2">
                    <li>Sell your images</li>
                    <li>Use your images for advertising</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    4. Legal Basis for Processing (GDPR)
                  </h2>
                  <p className="mt-3">
                    If you are located in regions such as the EU/UK, we process your
                    data based on:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>
                      <strong>Consent</strong> – when you provide personal or
                      health-related data
                    </li>
                    <li>
                      <strong>Legitimate interests</strong> – improving product
                      performance and security
                    </li>
                    <li>
                      <strong>Contractual necessity</strong> – providing the Service
                      you requested
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    5. Health &amp; Medical Disclaimer
                  </h2>
                  <p className="mt-3">
                    MyCalAgent is a wellness and lifestyle application, not a
                    healthcare provider.
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>
                      We do not provide medical advice, diagnosis, or treatment
                    </li>
                    <li>
                      Data is used for informational and personal tracking purposes
                      only
                    </li>
                  </ul>
                  <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
                    <p className="font-semibold text-sm">
                      ⚠️ MyCalAgent is not a HIPAA-covered entity
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    6. Data Sharing &amp; Third-Party Services
                  </h2>
                  <p className="mt-3">
                    We may share data with trusted third-party providers strictly to
                    operate the Service. Examples include:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>AI processing providers (e.g., image analysis services)</li>
                    <li>
                      Cloud infrastructure (e.g., database and storage providers)
                    </li>
                    <li>
                      Analytics tools (for usage insights and performance monitoring)
                    </li>
                    <li>
                      Payment processors (e.g., Apple App Store, Google Play,
                      RevenueCat)
                    </li>
                  </ul>
                  <p className="mt-3">
                    These providers only process data on our behalf and under strict
                    confidentiality obligations. We do not control how third-party
                    providers use data once processed under their respective privacy
                    policies.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    7. Data Retention
                  </h2>
                  <p className="mt-3">We retain your data:</p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>While your account is active</li>
                    <li>As necessary to provide the Service</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                  <p className="mt-3">
                    Upon account deletion, your personal data will be permanently
                    deleted or anonymized within 30 days, unless retention is
                    required by law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    8. Your Privacy Rights
                  </h2>
                  <p className="mt-3">
                    Depending on your location, you may have the right to:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your account and data</li>
                    <li>Export your wellness tracking data</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                  <p className="mt-3">
                    To exercise these rights, contact:{" "}
                    <a
                      href="mailto:support@mycalagent.com"
                      className="text-emerald-600 hover:underline"
                    >
                      support@mycalagent.com
                    </a>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    9. Data Security
                  </h2>
                  <p className="mt-3">
                    We implement industry-standard safeguards including:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Encryption (e.g., AES-256 or equivalent)</li>
                    <li>Secure cloud infrastructure</li>
                    <li>Access controls and monitoring</li>
                  </ul>
                  <p className="mt-3 text-slate-500 text-sm">
                    However, no system can guarantee 100% security.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    10. Cookies &amp; Tracking
                  </h2>
                  <p className="mt-3">
                    We may use cookies or similar technologies on our website to
                    improve functionality and analyze usage. Specifically, we use
                    Google Analytics (GA4) to understand how visitors interact with
                    our site.
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>
                      <strong>Essential cookies</strong> are always active and
                      required for the Service to function
                    </li>
                    <li>
                      <strong>Analytics cookies</strong> (e.g., Google Analytics)
                      are only activated after you give explicit consent
                    </li>
                    <li>
                      Analytics are <strong>denied by default</strong> — no tracking
                      occurs until you click "Accept All" or enable analytics in
                      preferences
                    </li>
                  </ul>
                  <p className="mt-3">
                    You can manage or withdraw your cookie preferences at any time
                    using the <strong>Cookie Settings</strong> link in the footer of
                    every page.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    11. International Data Transfers
                  </h2>
                  <p className="mt-3">Your data may be processed in:</p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>The United States</li>
                    <li>
                      Other countries where our service providers operate
                    </li>
                  </ul>
                  <p className="mt-3">
                    We ensure appropriate safeguards are in place for cross-border
                    data transfers.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    12. Children&apos;s Privacy
                  </h2>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>The Service is not intended for children under 13</li>
                    <li>We do not knowingly collect data from children</li>
                  </ul>
                  <p className="mt-3">
                    If discovered, such data will be deleted promptly.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    13. Changes to This Privacy Policy
                  </h2>
                  <p className="mt-3">
                    We may update this Privacy Policy periodically. Updates will be
                    posted with a revised "Last Updated" date. Continued use of the
                    Service constitutes acceptance.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    14. Data Sales and Advertising
                  </h2>
                  <p className="mt-3">
                    We do not sell, rent, or share your personal data with third
                    parties for advertising purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    15. Sensitive Data
                  </h2>
                  <p className="mt-3">
                    Some data we collect may be considered sensitive (such as
                    health-related inputs and meal images). We process this data only
                    with your explicit consent and solely to provide the Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    16. AI Data Usage
                  </h2>
                  <p className="mt-3">
                    We do not use your personal data to train public AI models without
                    your consent.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    17. Data Breach Notification
                  </h2>
                  <p className="mt-3">
                    In the event of a data breach affecting your personal data, we
                    will notify users as required by applicable law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    18. Contact Us
                  </h2>
                  <p className="mt-3">
                    MyCalAgent LLC
                    <br />
                    Email:{" "}
                    <a
                      href="mailto:support@mycalagent.com"
                      className="text-emerald-600 hover:underline"
                    >
                      support@mycalagent.com
                    </a>
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

          <QuickFAQ items={privacyFAQ} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
