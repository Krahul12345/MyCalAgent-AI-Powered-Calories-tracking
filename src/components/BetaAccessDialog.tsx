"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const APP_STORE_URL = "https://apps.apple.com/us/app/mycalagent/id6759270828";

interface BetaAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BetaAccessDialog = ({ open, onOpenChange }: BetaAccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#1a1a2e] border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Download MyCalAgent
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center pt-1">
            Start tracking your nutrition with AI — free to download.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* iOS — Live */}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-emerald-500/40 hover:bg-white/10 hover:border-emerald-400/60 transition-all group"
          >
            <div className="p-3 rounded-full bg-emerald-500/20 flex-shrink-0">
              {/* Apple icon */}
              <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm text-gray-400">iOS — iPhone</p>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ✓ Available Now
                </span>
              </div>
              <p className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                Download on the App Store →
              </p>
            </div>
          </a>

          {/* Android — Google Play live */}
          <a
            href="https://play.google.com/store/apps/details?id=com.mycalagent.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="p-3 rounded-full bg-white/10 flex-shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M3.18 23.76c.3.17.65.19.96.06L15.62 12 11.5 7.88 3.18 23.76z" fill="#EA4335"/>
                <path d="M20.5 10.5l-2.86-1.64-3.53 3.53 3.53 3.54 2.9-1.66c.83-.47.83-1.3-.04-1.77z" fill="#FBBC04"/>
                <path d="M2.01 1.07C1.99 1.2 2 1.32 2 1.5v21c0 .16 0 .3.01.43L13.35 12 2.01 1.07z" fill="#4285F4"/>
                <path d="M15.62 12L4.14.24C3.83.1 3.48.13 3.18.3L11.5 16.12 15.62 12z" fill="#34A853"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Android — Google Play</p>
              <p className="text-base font-bold text-white">Download on the Play Store</p>
            </div>
          </a>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-2 py-3 px-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Scan with iPhone camera</p>
            <div className="bg-white p-2 rounded-xl">
              <Image
                src="/appstore-qr.png"
                alt="Scan to download MyCalAgent on the App Store"
                width={120}
                height={120}
                className="h-auto w-[120px] object-contain"
              />
            </div>
            <p className="text-xs text-gray-500">Points to the App Store listing</p>
          </div>

          {/* Secondary CTA */}
          <Link
            href="/survey"
            onClick={() => onOpenChange(false)}
            className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:from-purple-700 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Take Survey &amp; Download</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => onOpenChange(false)}
            className="w-full py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
