"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_STORAGE_KEY = "mycalagent_cookie_consent";
const CONSENT_EVENT = "mycalagent:cookie-consent";

type StoredConsent = {
  analytics?: boolean;
};

export default function OpenAIAdsPixel({ pixelId }: { pixelId?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!pixelId) return;

    const syncConsent = () => {
      try {
        const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
        const consent = stored ? (JSON.parse(stored) as StoredConsent) : null;
        setEnabled(Boolean(consent?.analytics));
      } catch {
        setEnabled(false);
      }
    };

    syncConsent();
    window.addEventListener(CONSENT_EVENT, syncConsent);
    window.addEventListener("storage", syncConsent);

    return () => {
      window.removeEventListener(CONSENT_EVENT, syncConsent);
      window.removeEventListener("storage", syncConsent);
    };
  }, [pixelId]);

  if (!pixelId || !enabled) return null;

  return (
    <Script
      id="openai-ads-measurement-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function (w, d, s, u) {
            if (w.oaiq) return;
            var q = function () {
              q.q.push(arguments);
            };
            q.q = [];
            w.oaiq = q;
            var js = d.createElement(s);
            js.async = true;
            js.src = u;
            var f = d.getElementsByTagName(s)[0];
            f.parentNode.insertBefore(js, f);
          })(window, document, "script", "https://bzrcdn.openai.com/sdk/oaiq.min.js");

          oaiq("init", {
            pixelId: ${JSON.stringify(pixelId)}
          });
        `,
      }}
    />
  );
}
