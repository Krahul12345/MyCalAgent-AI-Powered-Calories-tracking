"use client";

import { useEffect } from "react";

export default function DeviceRedirect({ iosUrl, androidUrl }: { iosUrl: string; androidUrl: string }) {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || "";
    const isAndroid = /android/i.test(userAgent);
    const isAppleMobile = /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isAppleMobile) {
      window.location.replace(iosUrl);
    } else if (isAndroid) {
      window.location.replace(androidUrl);
    }
  }, [androidUrl, iosUrl]);

  return null;
}
