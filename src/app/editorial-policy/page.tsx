import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Editorial Policy — MyCalAgent",
  description: "MyCalAgent's editorial standards, content review process, and commitment to accuracy in AI wellness intelligence content.",
  openGraph: {
    title: "Editorial Policy — MyCalAgent",
    description: "MyCalAgent's editorial standards, content review process, and commitment to accuracy in AI wellness intelligence content.",
    url: "https://www.mycalagent.com/editorial-policy",
  },
  alternates: { canonical: "https://www.mycalagent.com/editorial-policy" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.mycalagent.com/editorial-policy#webpage",
      name: "Editorial Policy",
      url: "https://www.mycalagent.com/editorial-policy",
      description: metadata.description,
      isPartOf: { "@id": "https://www.mycalagent.com/#website" },
      publisher: { "@id": "https://www.mycalagent.com/#organization" },
      about: [
        "editorial standards",
        "AI-assisted content review",
        "wellness content accuracy",
        "medical disclaimer",
        "source citation policy",
      ],
    },
    {
      "@type": "CreativeWork",
      "@id": "https://www.mycalagent.com/editorial-policy#policy",
      name: "MyCalAgent Editorial Policy",
      url: "https://www.mycalagent.com/editorial-policy",
      dateModified: "2026-05-01",
      publisher: { "@id": "https://www.mycalagent.com/#organization" },
      audience: { "@type": "Audience", audienceType: "MyCalAgent readers and users" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
        { "@type": "ListItem", position: 2, name: "Editorial Policy", item: "https://www.mycalagent.com/editorial-policy" },
      ],
    },
  ],
};

export default function EditorialPolicyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <JsonLd data={jsonLd} />
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">

          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Editorial Policy</span>
          </nav>

          <section className="rounded-3xl border border-white/10 bg-white text-slate-900 shadow-2xl">
            <div className="px-8 py-10 sm:px-12 sm:py-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Editorial Policy</h1>
              <p className="mt-2 text-sm text-slate-600"><strong>Last Updated:</strong> May 2026</p>

              <div className="mt-8 space-y-8 text-base leading-7 text-slate-700">

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">Our Editorial Standards</h2>
                  <p className="mt-3">
                    MyCalAgent is committed to producing accurate, transparent, and useful wellness content. All articles, guides, and insights published on our platform are written or reviewed to meet the following standards.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">1. Accuracy First</h2>
                  <p className="mt-3">
                    We prioritize factual accuracy above all else. Wellness and nutrition claims are grounded in available scientific literature, peer-reviewed research, or well-established expert consensus. Where evidence is limited or contested, we say so explicitly.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">2. Expert Review</h2>
                  <p className="mt-3">
                    Health-related content undergoes review by our internal team, which includes professionals with backgrounds in nutrition science, behavioral health, and AI research. We do not publish unreviewed medical claims.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">3. AI-Generated Content Policy</h2>
                  <p className="mt-3">
                    Some content on this platform is assisted by AI tools. All AI-assisted content is:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Reviewed by a human editor before publication</li>
                    <li>Fact-checked against primary sources where applicable</li>
                    <li>Labeled where appropriate so readers can understand how it was produced</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">4. Not Medical Advice</h2>
                  <p className="mt-3">
                    All content on MyCalAgent — including blog articles, AI insights, and wellness guidance — is for informational and educational purposes only. It does not constitute medical advice, diagnosis, or treatment.
                  </p>
                  <p className="mt-3">
                    We encourage readers to consult a qualified healthcare professional before making any significant changes to their diet, exercise, or wellness routine.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">5. Corrections Policy</h2>
                  <p className="mt-3">
                    If we publish inaccurate content, we correct it promptly and transparently. Significant corrections are noted in the article with the date of correction.
                  </p>
                  <p className="mt-3">
                    To report an inaccuracy, contact: <a href="mailto:support@mycalagent.com" className="text-emerald-600 hover:underline">support@mycalagent.com</a>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">6. Independence & Conflicts of Interest</h2>
                  <p className="mt-3">
                    MyCalAgent editorial content is independent of advertising or commercial relationships. We do not allow sponsors or partners to influence the content of articles, guides, or wellness insights.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">7. Sources & Citations</h2>
                  <p className="mt-3">
                    Where we reference specific research or data, we link to or cite the original source. We prefer primary literature, government health databases, and recognized academic institutions.
                  </p>
                </section>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/ai-disclaimer" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 transition-colors">AI Disclaimer</Link>
                  <Link href="/research" className="px-4 py-2 rounded-xl text-sm font-medium border border-border text-slate-600 hover:bg-slate-50 transition-colors">Research</Link>
                  <Link href="/privacy" className="px-4 py-2 rounded-xl text-sm font-medium border border-border text-slate-600 hover:bg-slate-50 transition-colors">Privacy Policy</Link>
                </div>

              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
