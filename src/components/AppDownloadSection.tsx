"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const APP_STORE_URL = "https://apps.apple.com/us/app/mycalagent/id6759270828";

export default function AppDownloadSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-transparent to-blue-50/40 dark:from-emerald-950/30 dark:to-blue-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Now Live on App Store &amp; Google Play
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Download <span className="gradient-text">MyCalAgent</span> Free
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Available now on iPhone and Android. Snap a meal, uncover wellness patterns, and understand how your body responds — all with AI wellness intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left — Download CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            {/* App Store badge — live */}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-5 rounded-2xl bg-black text-white hover:bg-zinc-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg"
            >
              <div className="flex-shrink-0">
                <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-300 uppercase tracking-widest mb-0.5">Download on the</p>
                <p className="text-xl font-bold leading-tight">App Store</p>
              </div>
              <span className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500 text-white">
                Download
              </span>
            </a>

            {/* Google Play — live */}
            <a
              href="https://play.google.com/store/apps/details?id=com.mycalagent.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-5 rounded-2xl bg-black text-white hover:bg-zinc-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg"
            >
              <div className="flex-shrink-0">
                {/* Google Play four-color logo */}
                <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.18 23.76c.3.17.65.19.96.06L15.62 12 11.5 7.88 3.18 23.76z" fill="#EA4335"/>
                  <path d="M20.5 10.5l-2.86-1.64-3.53 3.53 3.53 3.54 2.9-1.66c.83-.47.83-1.3-.04-1.77z" fill="#FBBC04"/>
                  <path d="M2.01 1.07C1.99 1.2 2 1.32 2 1.5v21c0 .16 0 .3.01.43L13.35 12 2.01 1.07z" fill="#4285F4"/>
                  <path d="M15.62 12L4.14.24C3.83.1 3.48.13 3.18.3L11.5 16.12 15.62 12z" fill="#34A853"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-300 uppercase tracking-widest mb-0.5">Download on the</p>
                <p className="text-xl font-bold leading-tight">Play Store</p>
              </div>
              <span className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500 text-white">
                Download
              </span>
            </a>

            {/* Star rating */}
            <div className="flex items-center gap-3 px-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">5.0</span> — Rated on the App Store
              </p>
            </div>
          </motion.div>

          {/* Right — QR code card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-slate-100 dark:border-slate-800 max-w-[280px] w-full">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                Scan to Download
              </p>
              <div className="bg-white p-3 rounded-2xl shadow-inner border border-slate-100">
                <Image
                  src="/appstore-qr.png"
                  alt="Scan to download MyCalAgent on the App Store"
                  width={200}
                  height={200}
                  className="h-auto w-[200px] object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Point your iPhone camera at the code above — no app needed.
                </p>
                <div className="mt-2 flex items-center justify-center gap-1.5">
                  <svg className="w-4 h-4 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="text-xs font-semibold text-foreground">iPhone only · iOS 16+</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
