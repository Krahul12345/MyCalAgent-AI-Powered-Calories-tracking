import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Apple, ArrowUpRight, Check, Play, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import DeviceRedirect from "./DeviceRedirect";

export const metadata: Metadata = {
  title: "Download MyCalAgent | Your Wellness, Amplified",
  description:
    "Download MyCalAgent for iPhone or Android and turn everyday meals and habits into clearer wellness insight.",
  alternates: {
    canonical: "https://www.mycalagent.com/download",
  },
  openGraph: {
    title: "Download MyCalAgent | Your Wellness, Amplified",
    description: "One app for meals, hydration, habits, and the patterns that connect them.",
    url: "https://www.mycalagent.com/download",
    type: "website",
  },
};

const appStoreUrl = "https://apps.apple.com/us/app/mycalagent-calorie-tracker/id6759270828";
const playStoreUrl = "https://play.google.com/store/apps/details?id=com.mycalagent.app&pcampaignid=web_share";

const storeLinks = [
  { label: "iPhone & iPad", store: "App Store", href: appStoreUrl, icon: "apple" },
  { label: "Android phones", store: "Google Play", href: playStoreUrl, icon: "play" },
];

export default function DownloadPage() {
  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#f3f8f5] text-[#10231b]">
      <DeviceRedirect iosUrl={appStoreUrl} androidUrl={playStoreUrl} />
      <div className="relative isolate mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col px-5 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute -right-40 -top-44 -z-10 h-[620px] w-[620px] rounded-full bg-[#bfead2]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-52 -left-52 -z-10 h-[560px] w-[560px] rounded-full bg-[#dce7e1] blur-3xl" />

        <header className="flex items-center justify-between py-5 sm:py-7">
          <Link href="/" className="flex items-center gap-2.5" aria-label="MyCalAgent home">
            <Image src="/mycalagent-logo.webp" alt="" width={42} height={42} className="h-10 w-10 object-contain" priority />
            <span className="text-lg font-bold tracking-[-0.03em] sm:text-xl">MyCal<span className="text-[#146c43]">Agent</span></span>
          </Link>
          <Link href="/" className="hidden items-center gap-1 text-sm font-semibold text-[#52665c] transition-colors hover:text-[#146c43] sm:flex">
            Back to mycalagent.com <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-20 lg:py-16" aria-labelledby="download-heading">
          <div className="max-w-2xl animate-slide-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b7d8c6] bg-white/60 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#146c43]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Wellness intelligence, in your pocket
            </div>
            <h1 id="download-heading" className="max-w-xl text-5xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Your wellness.<br /><span className="text-[#146c43]">Amplified.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#52665c] sm:text-xl">
              Snap meals, track the habits that matter, and understand the patterns behind how you feel.
            </p>

            <div className="mt-9 grid max-w-xl gap-3 sm:grid-cols-2">
              {storeLinks.map((link) => (
                <a key={link.store} href={link.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-[76px] items-center gap-3 rounded-xl bg-[#10231b] px-4 py-3 text-white shadow-[0_16px_34px_rgba(16,35,27,0.16)] transition-transform hover:-translate-y-1 active:translate-y-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10" aria-hidden="true">
                    {link.icon === "apple" ? <Apple className="h-6 w-6" /> : <Play className="h-5 w-5 fill-current" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-white/60">Download for {link.label}</span>
                    <span className="block truncate text-lg font-bold">{link.store}</span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-[#8ce0ad] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#52665c]">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#146c43]" aria-hidden="true" />Free to get started</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#146c43]" aria-hidden="true" />Privacy-first by design</span>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] rounded-[28px] bg-[#10231b] p-5 shadow-[0_28px_70px_rgba(16,35,27,0.22)] sm:p-7">
              <div className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8ce0ad] text-[#10231b] shadow-lg rotate-6">
                <ScanLine className="h-7 w-7" aria-hidden="true" />
              </div>
              <div className="rounded-[20px] bg-white p-5 sm:p-7">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#146c43]">One scan</p>
                    <p className="mt-1 text-2xl font-bold tracking-[-0.04em] text-[#10231b]">Two ways to feel better.</p>
                  </div>
                  <span className="hidden text-right text-xs font-semibold leading-tight text-[#52665c] sm:block">iOS<br />Android</span>
                </div>
                <div className="rounded-2xl bg-white p-2 ring-1 ring-[#d7e2dc]">
                  <Image src="/mycalagent-website-qr.png" alt="QR code to download MyCalAgent" width={640} height={640} className="h-auto w-full" priority />
                </div>
                <p className="mt-5 text-center text-sm font-semibold text-[#52665c]">Point your Phone camera at the code above</p>
              </div>
              <p className="mt-5 text-center text-xs font-medium tracking-wide text-white/55">mycalagent.com/download</p>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-[#cbdcd2] py-5 text-xs text-[#6b7c73] sm:flex-row sm:items-center sm:justify-between">
          <span>MyCalAgent is a wellness and lifestyle app.</span>
          <div className="flex gap-4"><Link href="/privacy" className="hover:text-[#146c43]">Privacy</Link><Link href="/terms" className="hover:text-[#146c43]">Terms</Link></div>
        </footer>
      </div>
    </main>
  );
}
