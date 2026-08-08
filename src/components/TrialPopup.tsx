"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { XIcon, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Base count on the launch date — grows by 10 every day automatically
const BASE_COUNT = 1284;
const BASE_DATE = new Date("2026-03-15T00:00:00Z");
const DAILY_INCREMENT = 10;

function getWaitlistCount(): number {
  const today = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysElapsed = Math.floor((today.getTime() - BASE_DATE.getTime()) / msPerDay);
  return BASE_COUNT + Math.max(0, daysElapsed) * DAILY_INCREMENT;
}

interface TrialPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TrialPopup = ({ open, onOpenChange }: TrialPopupProps) => {
  const waitlistCount = getWaitlistCount().toLocaleString();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-[346px] p-0 overflow-hidden bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950 rounded-[1.5rem] shadow-2xl border-none"
        showCloseButton={false}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-6 right-6 z-10 rounded-full p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
        >
          <XIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        <div className="p-8 sm:p-10">
            <DialogHeader className="text-center mb-6">
              {/* Logo + brand name */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/mycalagent-logo.webp"
                    alt="MyCalAgent Logo"
                    width={55}
                    height={55}
                    className="w-[55px] h-[55px] object-contain rounded-2xl mix-blend-multiply"
                    priority
                  />
                </div>
                <span className="text-2xl font-bold text-black dark:text-white">
                  MyCal<span style={{ color: '#158341' }}>Agent</span>
                </span>
              </div>
              <DialogTitle
                className="text-xl sm:text-2xl font-bold mb-2 text-black dark:text-white leading-snug"
              >
                MyCalAgent is Now on the App Store 🎉
              </DialogTitle>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Download · Available on iPhone
              </p>
              <DialogDescription className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                Track calories from a single meal photo — powered by AI.
              </DialogDescription>
              <div className="flex flex-col gap-2 mt-4">
                <a
                  href="https://apps.apple.com/us/app/mycalagent/id6759270828"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <span>🍎</span>
                  <span>iOS — Available Now on the App Store ↗</span>
                </a>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                  <span>🤖</span>
                  <span>Android — Coming Soon in May 2026 on Google Play</span>
                </div>
              </div>
            </DialogHeader>

            <Link
              href="/survey"
              onClick={() => onOpenChange(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 mb-4"
            >
              <span>Take the Survey &amp; Download</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Social proof */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Join <span className="font-semibold text-gray-700 dark:text-gray-300">{waitlistCount} users</span> who've already downloaded MyCalAgent.
            </p>


        </div>
      </DialogContent>
    </Dialog>
  );
};
