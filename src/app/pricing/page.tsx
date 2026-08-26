import { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing - MyCalAgent | AI Wellness Intelligence Plans",
  description: "Choose the perfect MyCalAgent plan. Free tier available. Pro plans starting at $6.99/month with full AI wellness intelligence, meal analysis, pattern recognition, and premium insights.",
  keywords: ["AI wellness app pricing", "wellness intelligence subscription", "AI meal analysis plans", "MyCalAgent pricing"],
  openGraph: {
    title: "Pricing - MyCalAgent | AI Wellness Intelligence Plans",
    description: "Choose the perfect MyCalAgent plan. Free tier available. Pro plans starting at $6.99/month with full AI wellness intelligence, meal analysis, pattern recognition, and premium insights.",
    url: "https://www.mycalagent.com/pricing",
  },
  alternates: {
    canonical: "https://www.mycalagent.com/pricing",
  },
};

const pricingFAQ = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the start of your next billing cycle."
  },
    {
      question: "Is there a free trial?",
      answer: "All paid plans come with a 3-day free trial."
    },
  {
    question: "What payment methods do you accept?",
    answer: "Payments are handled through Stripe and RevenueCat, supporting the payment methods available through those checkout flows."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 15-day money-back guarantee on all paid plans if you're not satisfied."
  }
];

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.mycalagent.com/pricing#webpage",
      url: "https://www.mycalagent.com/pricing",
      name: "Pricing - MyCalAgent | Affordable AI Calorie Tracking Plans",
      description: "Choose the perfect MyCalAgent plan. Free tier available. Pro plans starting at $6.99/month with AI meal scanning, macro tracking, and premium wellness features.",
      inLanguage: "en",
      isPartOf: { "@id": "https://www.mycalagent.com/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" },
          { "@type": "ListItem", position: 2, name: "Pricing", item: "https://www.mycalagent.com/pricing" },
        ],
      },
    },
    {
      "@type": "Product",
      name: "MyCalAgent Pro",
      description: "AI-powered calorie & wellness tracking with meal photo analysis, macro tracking, hydration, fasting, and personalized wellness insights.",
      url: "https://www.mycalagent.com/pricing",
      brand: { "@type": "Brand", name: "MyCalAgent" },
      image: "https://www.mycalagent.com/favicon.png",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1200",
        bestRating: "5",
        worstRating: "1",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Free Plan",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          description: "Free plan with 15 meal scans per day, 3-day meal log history, AI coaching, hydration, allergen detection, fasting, alcohol tracking, health integration, and custom goals.",
          url: "https://www.mycalagent.com/register",
        },
        {
          "@type": "Offer",
          name: "Pro Monthly",
          price: "6.99",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          description: "Unlimited AI meal scanning, unlimited meal history, advanced nutrition analysis, and 4 Wellness Reports per month. 3-day free trial.",
          billingIncrement: "P1M",
          url: "https://www.mycalagent.com/checkout",
          priceValidUntil: "2027-01-01",
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 15,
          },
        },
        {
          "@type": "Offer",
          name: "Pro Annual",
          price: "69.99",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          description: "Full Pro features billed annually. Best value — save over 16%.",
          billingIncrement: "P1Y",
          url: "https://www.mycalagent.com/checkout",
          priceValidUntil: "2027-01-01",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: pricingFAQ.map(faq => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <PricingPageClient pricingFAQ={pricingFAQ} />
    </>
  );
}
