import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import CookieConsent from '@/components/CookieConsent';
import LiveWellnessFeed from '@/components/LiveWellnessFeed';
import OpenAIAdsPixel from '@/components/OpenAIAdsPixel';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import { CookieBannerProvider } from '@/lib/CookieBannerContext';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#10b981' },
    { media: '(prefers-color-scheme: dark)', color: '#059669' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mycalagent.com'),
  title: {
    default: 'MyCalAgent — AI Wellness Intelligence | Understand How Meals & Habits Affect You',
    template: '%s | MyCalAgent',
  },
  description:
    'MyCalAgent uses AI to recognize patterns across meals, hydration, fasting, and daily habits — helping you understand how your body responds. Privacy-first wellness intelligence.',
  keywords: [
    'AI wellness intelligence',
    'food and mood tracking',
    'wellness pattern recognition',
    'AI meal analysis',
    'hydration insights',
    'intermittent fasting app',
    'AI nutrition insights',
    'habit awareness app',
    'MyCalAgent',
    'wellness intelligence platform',
    'meal photo analysis',
    'behavioral wellness tracking',
    'AI health insights',
    'food energy patterns',
  ],
  authors: [{ name: 'MyCalAgent', url: 'https://www.mycalagent.com' }],
  creator: 'MyCalAgent',
  publisher: 'MyCalAgent',
  applicationName: 'MyCalAgent',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_GB', 'en_AU', 'en_IN', 'en_CA', 'en_SG'],
    url: 'https://www.mycalagent.com',
    siteName: 'MyCalAgent',
    title: 'MyCalAgent — AI Wellness Intelligence | Understand How Meals & Habits Affect You',
    description:
      'Understand how your meals, hydration, fasting, and daily habits affect how you feel. MyCalAgent uses AI pattern recognition to surface personalized wellness insights.',
    images: [
      {
        url: '/mycalagent-logo.webp',
        width: 1200,
        height: 630,
        alt: 'MyCalAgent — AI Wellness Intelligence Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyCalAgent — AI Wellness Intelligence',
    description:
      'Understand how your meals and habits affect how you feel. AI-powered wellness pattern recognition — privacy-first.',
    images: ['/mycalagent-logo.webp'],
    creator: '@mycalagent',
    site: '@mycalagent',
  },
  alternates: {
    canonical: 'https://www.mycalagent.com',
    languages: {
      'en-US': 'https://www.mycalagent.com',
      'en-GB': 'https://www.mycalagent.com',
      'en-IN': 'https://www.mycalagent.com',
      'en-AU': 'https://www.mycalagent.com',
      'en-CA': 'https://www.mycalagent.com',
      'en-SG': 'https://www.mycalagent.com',
      'x-default': 'https://www.mycalagent.com',
    },
  },
  category: 'Health & Fitness',
  classification: 'Health & Fitness',
  verification: {
    google: 'google5ac59a7a4a9aba33',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MyCalAgent',
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // ── Organization ────────────────────────────────────────────────────────
    {
      '@type': 'Organization',
      '@id': 'https://www.mycalagent.com/#organization',
      name: 'MyCalAgent',
      url: 'https://www.mycalagent.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mycalagent.com/mycalagent-logo.png',
        width: 512,
        height: 512,
      },
      description:
        'MyCalAgent is an AI wellness intelligence platform that recognizes patterns across meals, hydration, fasting, and habits to help users understand how their body responds.',
      email: 'support@mycalagent.com',
      foundingDate: '2024',
      areaServed: 'Worldwide',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@mycalagent.com',
        contactType: 'customer support',
        availableLanguage: 'English',
      },
      sameAs: [
        'https://apps.apple.com/us/app/mycalagent/id6759270828',
        'https://play.google.com/store/apps/details?id=com.mycalagent.app',
      ],
    },
    // ── WebSite + SiteLinksSearchBox ────────────────────────────────────────
    {
      '@type': 'WebSite',
      '@id': 'https://www.mycalagent.com/#website',
      url: 'https://www.mycalagent.com',
      name: 'MyCalAgent',
      description:
        'AI wellness intelligence platform — understand how meals, hydration, fasting, and habits affect how you feel.',
      inLanguage: 'en',
      publisher: { '@id': 'https://www.mycalagent.com/#organization' },
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.mycalagent.com/ai-wellness-insights?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      ],
    },
    // ── MobileApplication ────────────────────────────────────────────────────
    {
      '@type': 'MobileApplication',
      '@id': 'https://www.mycalagent.com/#app',
      name: 'MyCalAgent',
      url: 'https://www.mycalagent.com',
      description:
        'AI wellness intelligence app for iOS and Android. Recognizes patterns across meals, hydration, fasting, and habits to surface personalized wellness insights.',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'iOS, Android',
      downloadUrl: [
        'https://apps.apple.com/us/app/mycalagent/id6759270828',
        'https://play.google.com/store/apps/details?id=com.mycalagent.app',
      ],
      offers: [
        {
          '@type': 'Offer',
          name: 'Free Plan',
          price: '0',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          name: 'Pro Plan',
          price: '6.99',
          priceCurrency: 'USD',
          billingIncrement: 'P1M',
        },
        {
          '@type': 'Offer',
          name: 'Pro Plan Annual',
          price: '69.99',
          priceCurrency: 'USD',
          billingIncrement: 'P1Y',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1200',
        bestRating: '5',
        worstRating: '1',
      },
      creator: { '@id': 'https://www.mycalagent.com/#organization' },
      featureList: [
        'AI meal photo analysis',
        'Wellness pattern recognition',
        'Food and mood insights',
        'Intermittent fasting tracker',
        'Hydration tracking',
        'Apple Health integration',
        'Macro and calorie calculator',
      ],
    },
    // ── ItemList: Key site sections for AI discovery ─────────────────────────
    {
      '@type': 'ItemList',
      '@id': 'https://www.mycalagent.com/#sitelinks',
      name: 'MyCalAgent Key Pages',
      description: 'Main sections of the MyCalAgent website',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Features', url: 'https://www.mycalagent.com/features' },
        { '@type': 'ListItem', position: 2, name: 'Pricing', url: 'https://www.mycalagent.com/pricing' },
        { '@type': 'ListItem', position: 3, name: 'Macro & Calorie Calculator', url: 'https://www.mycalagent.com/macro-calorie-calculator' },
        { '@type': 'ListItem', position: 4, name: 'Blog', url: 'https://www.mycalagent.com/blog' },
        { '@type': 'ListItem', position: 5, name: 'FAQ', url: 'https://www.mycalagent.com/faq' },
        { '@type': 'ListItem', position: 6, name: 'About', url: 'https://www.mycalagent.com/about' },
      ],
    },
  ],
};

const openAIAdsPixelId = process.env.NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//ipapi.co" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//bzrcdn.openai.com" />
        <link rel="dns-prefetch" href="//bzr.openai.com" />
      </head>
      <body>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics GA4 */}
        {/*
          GA4 CONSENT GATING — DO NOT REMOVE OR REORDER
          ------------------------------------------------
          Analytics are denied by default until the visitor opts in.
          GA4 only receives data after the user clicks "Accept All" in the
          cookie banner, or re-enables analytics via "Cookie Settings" in footer.

          Consent flow:
            1. This inline script sets analytics_storage: 'denied' BEFORE gtag loads.
            2. It then reads localStorage('mycalagent_cookie_consent') to restore a
               previously stored choice for returning visitors.
            3. On live accept/reject, CookieConsent.tsx calls gtag('consent','update')
               immediately via saveConsent() in src/components/CookieConsent.tsx.
            4. openCookiePreferences() (exported from CookieConsent.tsx) is wired
               to the "Cookie Settings" button in src/components/Footer.tsx.

          To bump policyVersion: update POLICY_VERSION in src/components/CookieConsent.tsx.
          Current version: "2026-04"
        */}
        <Script
          id="ga4-consent-default"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
              gtag('js', new Date());
              // Restore consent from localStorage if user already chose
              try {
                var stored = JSON.parse(localStorage.getItem('mycalagent_cookie_consent') || 'null');
                if (stored) {
                  gtag('consent', 'update', {
                    analytics_storage: stored.analytics ? 'granted' : 'denied'
                  });
                }
              } catch(e) {}
            `,
          }}
        />
        <Script
          id="ga4-loader"
          src="https://www.googletagmanager.com/gtag/js?id=G-X6YGVYDZXQ"
          strategy="afterInteractive"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('config', 'G-X6YGVYDZXQ');
            `,
          }}
        />
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="c30ac0a1-d80d-448c-bb54-e9f289f958e8"
        />
        <OpenAIAdsPixel pixelId={openAIAdsPixelId} />
        <ScrollProgressBar />
        <CookieBannerProvider>
          {children}
          <CookieConsent />
          <LiveWellnessFeed />
        </CookieBannerProvider>
      </body>
    </html>
  );
}
