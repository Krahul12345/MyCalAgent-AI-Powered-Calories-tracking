"use client";

/**
 * CookieConsent — privacy-first cookie banner with GA4 Consent Mode v2
 *
 * Storage key : "mycalagent_cookie_consent" (localStorage)
 * Categories  : essential (always-on) | analytics (GA4 + ads measurement, opt-in)
 * Default     : analytics DENIED — GA4 only fires after explicit accept
 *
 * Key exports:
 *   openCookiePreferences() — call from anywhere (e.g. Footer) to reopen the panel
 *   getStoredConsent()      — read current consent payload server/client-side
 *
 * To update policy version (e.g. after adding a new analytics provider):
 *   bump POLICY_VERSION below — this invalidates old stored consent on next visit.
 *
 * GA4 wiring: src/app/layout.tsx → ga4-consent-default script block
 */

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useCookieBanner } from "@/lib/CookieBannerContext";

const STORAGE_KEY = "mycalagent_cookie_consent";
const POLICY_VERSION = "2026-04";

type ConsentPayload = {
  essential: true;
  analytics: boolean;
  timestamp: string;
  policyVersion: string;
  consentMethod: "accept_all" | "reject_all" | "custom";
  userAgent: string;
  acceptedBeforeEffective?: boolean;
};

function saveConsent(
  analytics: boolean,
  method: "accept_all" | "reject_all" | "custom",
  acceptedBeforeEffective = false
): ConsentPayload {
  const payload: ConsentPayload = {
    essential: true,
    analytics,
    timestamp: new Date().toISOString(),
    policyVersion: POLICY_VERSION,
    consentMethod: method,
    userAgent: navigator.userAgent.slice(0, 120),
    ...(acceptedBeforeEffective && { acceptedBeforeEffective: true }),
  };
  // Primary store — works on all browsers including iOS Private mode (iOS 11+)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  // Secondary store: try/catch for iOS ITP (7-day cap) and Android OEM btoa edge cases
  try {
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    document.cookie = `mycalagent_consent=${encoded}; max-age=31536000; path=/; SameSite=Lax; Secure`;
  } catch { /* Cookie write failed — localStorage is sufficient */ }

  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
    });
  }
  window.dispatchEvent(new CustomEvent("mycalagent:cookie-consent", { detail: payload }));
  return payload;
}

export function getStoredConsent(): ConsentPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Global hook so Footer / settings page can open preferences panel
let _reopenHandler: (() => void) | null = null;
export function openCookiePreferences() {
  _reopenHandler?.();
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);
  const { setCookieBannerVisible } = useCookieBanner();

  // Sync visibility state to context so LiveWellnessFeed can pause
  useEffect(() => {
    setCookieBannerVisible(visible);
  }, [visible, setCookieBannerVisible]);

  // On mount: show banner if no stored consent, else honour stored choice
  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
    // Honour previously stored consent for GA4
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("consent", "update", {
        analytics_storage: stored.analytics ? "granted" : "denied",
      });
    }
  }, []);

  // Register reopen handler
  const openPrefs = useCallback(() => {
    setShowPreferences(true);
    setVisible(true);
  }, []);
  useEffect(() => {
    _reopenHandler = openPrefs;
    return () => { _reopenHandler = null; };
  }, [openPrefs]);

  function acceptAll() {
    saveConsent(true, "accept_all");
    setVisible(false);
    setShowPreferences(false);
  }

  function rejectNonEssential() {
    saveConsent(false, "reject_all");
    setVisible(false);
    setShowPreferences(false);
  }

  function savePreferences() {
    saveConsent(analyticsOn, "custom");
    setVisible(false);
    setShowPreferences(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] px-4 sm:px-6"
      style={{ animation: "cookieFadeUp 0.4s ease both", paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <style>{`
        @keyframes cookieFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="mx-auto max-w-3xl rounded-2xl border border-white/20 bg-white/85 backdrop-blur-xl shadow-2xl shadow-black/10 px-5 py-4 sm:px-6 sm:py-5">
        {!showPreferences ? (
          /* ── Main banner ── */
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <span className="mt-0.5 text-xl shrink-0">🍪</span>
              <p className="text-sm text-slate-700 leading-relaxed">
                We use cookies to enhance your experience and understand how
                you use MyCalAgent. You can choose what you allow.{" "}
                <Link
                  href="/privacy"
                  className="text-emerald-600 hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              <button
                onClick={() => setShowPreferences(true)}
                className="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2 transition-colors px-1"
              >
                Manage Preferences
              </button>
              <button
                onClick={rejectNonEssential}
                className="text-sm font-medium px-4 py-2 rounded-xl border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={acceptAll}
                className="text-sm font-semibold px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-sm shadow-emerald-200"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          /* ── Preferences panel ── */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 text-sm">
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {/* Essential — always on */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-800">Essential</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Required for the Service to function. Cannot be disabled.
                  </p>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg shrink-0">
                  Always on
                </span>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-800">Analytics</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Helps us understand site usage and ad performance (Google Analytics and OpenAI Ads Measurement). Off by default.
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={analyticsOn}
                  onClick={() => setAnalyticsOn((v) => !v)}
                  className={`relative shrink-0 inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    analyticsOn ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      analyticsOn ? "translate-x-4" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              See our{" "}
              <Link href="/privacy" className="text-emerald-600 hover:underline">
                Privacy Policy
              </Link>{" "}
              for details on how we use cookies.
            </p>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={rejectNonEssential}
                className="text-sm px-4 py-2 rounded-xl border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={savePreferences}
                className="text-sm font-semibold px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
