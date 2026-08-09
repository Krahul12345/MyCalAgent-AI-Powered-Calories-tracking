import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Security & Data Protection - MyCalAgent",
  description: "MyCalAgent uses industry-standard encryption, Supabase-backed data protection, and privacy-first architecture to protect your wellness data.",
  alternates: { canonical: "https://www.mycalagent.com/security" },
  openGraph: {
    title: "Security & Data Protection - MyCalAgent",
    description: "Learn how MyCalAgent protects your data with encryption, secure authentication, and HIPAA-aligned security practices.",
    url: "https://www.mycalagent.com/security",
  },
};

const securityJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.mycalagent.com/security#webpage",
      url: "https://www.mycalagent.com/security",
      name: "Security & Data Protection - MyCalAgent",
      description: "How MyCalAgent protects your wellness data with encryption, secure authentication, and privacy-first design.",
      inLanguage: "en",
      isPartOf: { "@id": "https://www.mycalagent.com/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
          { "@type": "ListItem", position: 2, name: "Security", item: "https://www.mycalagent.com/security" },
        ],
      },
    },
    {
      "@type": "Article",
      "@id": "https://www.mycalagent.com/security#article",
      headline: "Security & Data Protection at MyCalAgent",
      description: "MyCalAgent uses industry-standard security practices, Supabase encrypted storage, and user-controlled data access.",
      url: "https://www.mycalagent.com/security",
      inLanguage: "en",
      author: { "@type": "Organization", name: "MyCalAgent", url: "https://www.mycalagent.com" },
      publisher: {
        "@type": "Organization",
        name: "MyCalAgent",
        url: "https://www.mycalagent.com",
        logo: { "@type": "ImageObject", url: "https://www.mycalagent.com/favicon.png" },
      },
      mainEntityOfPage: { "@id": "https://www.mycalagent.com/security#webpage" },
      about: [
        { "@type": "Thing", name: "Data Encryption" },
        { "@type": "Thing", name: "Privacy-First Data Controls" },
        { "@type": "Thing", name: "HIPAA-Aligned Security" },
        { "@type": "Thing", name: "User Data Privacy" },
      ],
    },
  ],
};

export default function SecurityPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(securityJsonLd) }}
      />
      <AnimatedBackground />
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto backdrop-blur-md bg-background/50 p-8 md:p-12 rounded-3xl border border-border/50 shadow-2xl">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Security & Data Protection at MyCalAgent</h1>
          <p className="text-xl text-foreground mb-8 font-medium">Built with Security by Design</p>
          
          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <p>
              MyCalAgent uses industry-standard security practices to protect user information across devices and platforms.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Encryption & Data Protection</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Data encrypted at rest and in transit</li>
                <li>Secure authentication and session management</li>
                <li>Encrypted cloud backups</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Account Protection</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Secure sign-in options (Apple, Google, Email)</li>
                <li>Biometric authentication (where supported)</li>
                <li>App lock and session timeout features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. User-Controlled Access</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Health and device integrations are optional</li>
                <li>Permissions can be revoked at any time</li>
                <li>No background data access without user approval</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Secure Architecture</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Offline-first local database with secure sync</li>
                <li>Isolated service layers for sensitive operations</li>
                <li>Regular security updates and monitoring</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Privacy-Focused Design</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>No selling of personal data</li>
                <li>No third-party ad trackers</li>
                <li>Minimal data collection aligned with features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Compliance Approach</h2>
              <p>
                MyCalAgent is designed around privacy-first security principles, focusing on transparency, data minimization, encrypted storage, and user control.
              </p>
              <p className="mt-2 italic">
                Compliance depends on usage context. MyCalAgent does not claim medical certification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Reporting & Support</h2>
              <p>
                Users can report security concerns or suspicious activity through in-app support.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
