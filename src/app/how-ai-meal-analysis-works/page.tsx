import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppStoreButtons from "@/components/AppStoreButtons";
import AIDiscussButtons from "@/components/AIDiscussButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How AI Meal Analysis Works — MyCalAgent",
  description: "A plain-language explanation of how AI meal analysis uses computer vision to identify food, estimate portions, and calculate nutrition from a single photo.",
  keywords: ["how AI meal analysis works", "AI food recognition", "computer vision nutrition", "how photo meal logging works", "AI calorie counting technology"],
  openGraph: {
    title: "How AI Meal Analysis Works — MyCalAgent",
    description: "How computer vision identifies foods, estimates portions, and delivers full nutrition breakdowns from a meal photo in seconds.",
    url: "https://www.mycalagent.com/how-ai-meal-analysis-works",
  },
  alternates: { canonical: "https://www.mycalagent.com/how-ai-meal-analysis-works" },
};

const faqItems = [
  {
    question: "How does AI identify food from a photo?",
    answer: "AI meal analysis uses convolutional neural networks (CNNs) trained on millions of labeled food images. When you take a photo, the model classifies each detected region of the image against its training data to identify the most likely food items present.",
  },
  {
    question: "How does the AI estimate portion sizes?",
    answer: "Portion estimation uses depth estimation, reference objects (like plates, utensils, or hands), and known average serving sizes by food type. The AI calculates a best-estimate volume and converts it to grams using density data from nutritional databases.",
  },
  {
    question: "What happens if the AI gets the food wrong?",
    answer: "MyCalAgent lets you review every identification before logging. You can correct any item by typing or speaking — e.g., 'change chicken to salmon' or 'add extra rice' — and the nutrition recalculates instantly.",
  },
  {
    question: "How accurate is AI meal analysis?",
    answer: "Accuracy varies by meal complexity. Single-ingredient and simple meals (salads, sandwiches, single proteins) are highly accurate. Complex mixed dishes involve more estimation. Research shows AI meal analysis can achieve within 10–15% accuracy for calories on most common meals — comparable to manual logging by non-dietitians.",
  },
  {
    question: "Does AI meal analysis work for all cuisines?",
    answer: "Modern AI meal analysis models are trained on diverse international food datasets, covering cuisines from Japanese and Indian to Mexican and Mediterranean. Recognition accuracy is highest for the cuisines most represented in training data.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.mycalagent.com/how-ai-meal-analysis-works#article",
      headline: "How AI Meal Analysis Works: Computer Vision, Portion Estimation, and Nutrition in Seconds",
      description: "A plain-language explanation of the technology behind AI meal analysis — from photo capture to full nutrition breakdown.",
      url: "https://www.mycalagent.com/how-ai-meal-analysis-works",
      publisher: { "@type": "Organization", name: "MyCalAgent", url: "https://www.mycalagent.com" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
        { "@type": "ListItem", position: 2, name: "How AI Meal Analysis Works", item: "https://www.mycalagent.com/how-ai-meal-analysis-works" },
      ],
    },
  ],
};

const steps = [
  {
    n: "1",
    title: "Image capture",
    body: "You photograph your meal. The image is processed locally or sent securely to the AI model. Quality, lighting, and angle all affect recognition accuracy.",
  },
  {
    n: "2",
    title: "Object detection",
    body: "A detection model identifies distinct food regions within the image — separating the chicken from the rice, the salad from the dressing, the bread from the filling.",
  },
  {
    n: "3",
    title: "Food classification",
    body: "Each detected region is classified against a food taxonomy. The model outputs the most probable food category with a confidence score.",
  },
  {
    n: "4",
    title: "Portion estimation",
    body: "3D depth models and reference objects estimate volume. Density data converts volume to grams. Serving size heuristics calibrate the estimate.",
  },
  {
    n: "5",
    title: "Nutrition lookup",
    body: "Identified foods are matched to a nutritional database. Calories, macros, and micronutrients are calculated based on estimated portion weights.",
  },
  {
    n: "6",
    title: "User review & correction",
    body: "The full breakdown is displayed for your review. You can correct any item by voice or text before saving. The model learns from corrections over time.",
  },
];

export default function HowAIMealAnalysisWorksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <Navigation />

        <main className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">

            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">How AI Meal Analysis Works</span>
            </nav>

            <div className="mb-14">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">AI Wellness Intelligence</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                How AI Meal Analysis Works
                <br />
                <span className="gradient-text">From Photo to Full Nutrition in Seconds</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                AI meal analysis uses computer vision to identify food items, estimate portion sizes, and calculate complete nutrition data from a single photo. Here's exactly how it works.
              </p>
              <AIDiscussButtons
                pageUrl="https://www.mycalagent.com/how-ai-meal-analysis-works"
                pageTitle="How AI Meal Analysis Works"
                pageType="pillar"
              />
            </div>

            <section className="mb-16 p-8 rounded-3xl border border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800/30">
              <h2 className="text-2xl font-bold mb-6">The Six-Step Process</h2>
              <ol className="space-y-5">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{s.n}</span>
                    <div>
                      <strong className="text-foreground">{s.title}.</strong>{" "}
                      <span className="text-muted-foreground">{s.body}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-5">The Technology Behind It</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Modern AI meal analysis relies on deep learning architectures — primarily convolutional neural networks (CNNs) fine-tuned on food-specific datasets. Models like EfficientNet and Vision Transformers have been adapted to food classification tasks, achieving high accuracy on standard benchmark datasets like Food-101 and UECFood.
                </p>
                <p>
                  Portion estimation is the harder problem. Flat photos lack depth information by default, so models use learned priors about serving sizes, plate geometry, and common food volumes. Some systems use multi-image capture or depth sensors for higher accuracy.
                </p>
                <p>
                  Nutritional lookup maps identified foods to a reference database (USDA FoodData Central, NCCDB, or proprietary datasets). Portion weight multiplied by nutrient density yields the final nutrition breakdown.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-5">Accuracy and Limitations</h2>
              <div className="p-6 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm text-muted-foreground text-sm leading-relaxed space-y-3">
                <p>AI meal analysis is more accurate than most users expect for simple meals, and less accurate than a dietitian's manual assessment for complex ones.</p>
                <p>Strongest accuracy: single-ingredient foods, standard cuisines, well-lit photos with visible portion cues.</p>
                <p>Lower accuracy: heavily processed mixed dishes, unclear photos, non-standard plating, very small portions.</p>
                <p>MyCalAgent's approach of showing results for user review — rather than silently logging — addresses this by making corrections fast and incorporating user feedback.</p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqItems.map((f, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-border/40 bg-white/60 dark:bg-card/60 backdrop-blur-sm">
                    <h3 className="font-semibold mb-2">{f.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mb-10 p-8 rounded-3xl border border-border/40 bg-white/50 dark:bg-card/50 text-center">
              <p className="font-semibold mb-2">See AI meal analysis in action</p>
              <p className="text-sm text-muted-foreground mb-5">Try MyCalAgent and log your first meal with a photo.</p>
              <AppStoreButtons className="justify-center" />
            </div>

            <section className="p-6 rounded-2xl border border-border/40 bg-white/50 dark:bg-card/50">
              <p className="text-sm text-muted-foreground mb-3">Related</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/features/ai-meal-analysis" className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">AI Meal Analysis Feature</Link>
                <Link href="/wellness-pattern-recognition" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Wellness Pattern Recognition</Link>
                <Link href="/ai-wellness-insights" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">AI Wellness Insights</Link>
                <Link href="/research" className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors">Research</Link>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
