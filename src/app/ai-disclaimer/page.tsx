import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Disclaimer — MyCalAgent",
  description: "How MyCalAgent's AI works, its limitations, accuracy considerations, and why AI wellness insights are not a substitute for professional medical advice.",
  openGraph: {
    title: "AI Disclaimer — MyCalAgent",
    description: "How MyCalAgent's AI works, its limitations, accuracy considerations, and why AI wellness insights are not a substitute for professional medical advice.",
    url: "https://www.mycalagent.com/ai-disclaimer",
  },
  alternates: { canonical: "https://www.mycalagent.com/ai-disclaimer" },
};

export default function AIDisclaimerPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">

          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">AI Disclaimer</span>
          </nav>

          <section className="rounded-3xl border border-white/10 bg-white text-slate-900 shadow-2xl">
            <div className="px-8 py-10 sm:px-12 sm:py-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">AI Disclaimer</h1>
              <p className="mt-2 text-sm text-slate-600"><strong>Last Updated:</strong> May 2026</p>

              <div className="mt-8 space-y-8 text-base leading-7 text-slate-700">

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
                  <p className="font-semibold mb-1">⚠️ Important</p>
                  <p className="text-sm">
                    MyCalAgent is not a medical device, healthcare provider, or clinical diagnostic tool. AI-generated insights are for informational and lifestyle purposes only.
                  </p>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">How the AI Works</h2>
                  <p className="mt-3">
                    MyCalAgent uses computer vision and machine learning models to:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Identify foods and ingredients from photos</li>
                    <li>Recognize some packaged product and nutrition label cues</li>
                    <li>Estimate portion sizes based on visual cues</li>
                    <li>Calculate approximate nutritional values</li>
                    <li>Flag potential allergens or dietary conflicts based on the profile you provide</li>
                    <li>Detect patterns across meals, hydration, and habits over time</li>
                    <li>Surface personalized wellness insights based on your logged data</li>
                  </ul>
                  <p className="mt-3">
                    These models are trained on large datasets but are not infallible. Results are estimates — not precise measurements.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">AI Accuracy Limitations</h2>
                  <p className="mt-3">You acknowledge and understand that:</p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Nutritional estimates from photos may differ from actual values due to portion variation, cooking methods, and ingredient substitutions</li>
                    <li>AI pattern recognition is probabilistic — it identifies likely trends, not certainties</li>
                    <li>Allergen and dietary conflict warnings are safety aids, not guarantees that a meal is free of allergens or preference conflicts</li>
                    <li>Food recognition accuracy varies by cuisine, presentation, and image quality</li>
                    <li>AI insights do not account for individual medical conditions, medications, or clinical health factors</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">Not a Substitute for Professional Advice</h2>
                  <p className="mt-3">
                    AI-generated wellness insights from MyCalAgent are <strong>not</strong> a substitute for:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Advice from a licensed healthcare professional, doctor, or registered dietitian</li>
                    <li>Clinical diagnosis of any health condition</li>
                    <li>Medical nutrition therapy or prescribed dietary treatment</li>
                    <li>Mental health counseling or eating disorder treatment</li>
                  </ul>
                  <p className="mt-3">
                    Always consult a qualified healthcare professional before making significant changes to your diet or wellness routine, especially if you have a diagnosed condition.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">How We Improve AI Accuracy</h2>
                  <p className="mt-3">
                    MyCalAgent continuously improves its AI models through:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>User feedback and manual corrections</li>
                    <li>Expanded training datasets across cuisines and meal types</li>
                    <li>Server-side validation checks that reject or clamp physiologically impossible nutrition values</li>
                    <li>Regular model updates and accuracy benchmarking</li>
                  </ul>
                  <p className="mt-3">
                    We do not use your personal data to train public AI models without your explicit consent.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900">Contact Us</h2>
                  <p className="mt-3">
                    For questions about how AI is used in MyCalAgent, contact: <a href="mailto:support@mycalagent.com" className="text-emerald-600 hover:underline">support@mycalagent.com</a>
                  </p>
                </section>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/editorial-policy" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 transition-colors">Editorial Policy</Link>
                  <Link href="/research" className="px-4 py-2 rounded-xl text-sm font-medium border border-border text-slate-600 hover:bg-slate-50 transition-colors">Research</Link>
                  <Link href="/privacy" className="px-4 py-2 rounded-xl text-sm font-medium border border-border text-slate-600 hover:bg-slate-50 transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="px-4 py-2 rounded-xl text-sm font-medium border border-border text-slate-600 hover:bg-slate-50 transition-colors">Terms of Service</Link>
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
