"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GeoData {
  countryCode: string;
  countryName: string;
}

export const GeoFlag = () => {
  const [geo, setGeo] = useState<GeoData | null>(null);

  useEffect(() => {
    // Check cookie first (set by middleware)
    const match = document.cookie.match(/(?:^|;\s*)geo_country=([^;]+)/);
    if (match) {
      setGeo({ countryCode: match[1].toLowerCase(), countryName: countryName(match[1]) });
      return;
    }

    // Fallback: detect via ipapi.co with 3s timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    fetch("https://ipapi.co/json/", { cache: "force-cache", signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        if (d?.country_code) {
          setGeo({
            countryCode: d.country_code.toLowerCase(),
            countryName: d.country_name ?? d.country_code,
          });
        }
      })
      .catch(() => {/* silently ignore aborts and errors */})
      .finally(() => clearTimeout(timeoutId));

    return () => controller.abort();
  }, []);

  if (!geo) return null;

  return (
    <div
      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/60 border border-border/40 backdrop-blur-sm select-none"
      title={geo.countryName}
      aria-label={`Your location: ${geo.countryName}`}
    >
      <div className="relative w-5 h-4 rounded-[2px] overflow-hidden flex-shrink-0 shadow-sm">
        <Image
          src={`https://flagcdn.com/w40/${geo.countryCode}.png`}
          alt={geo.countryName}
          fill
          sizes="20px"
          className="object-cover"
          unoptimized
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground hidden sm:inline leading-none">
        {geo.countryCode.toUpperCase()}
      </span>
    </div>
  );
};

// Lightweight country-code → name map for the most common locales
function countryName(code: string): string {
  const map: Record<string, string> = {
    US: "United States", GB: "United Kingdom", IN: "India", AU: "Australia",
    CA: "Canada", SG: "Singapore", AE: "UAE", MY: "Malaysia", PH: "Philippines",
    DE: "Germany", FR: "France", ES: "Spain", IT: "Italy", NL: "Netherlands",
    BR: "Brazil", MX: "Mexico", JP: "Japan", KR: "South Korea", CN: "China",
    ZA: "South Africa", NG: "Nigeria", KE: "Kenya", PK: "Pakistan", BD: "Bangladesh",
    NZ: "New Zealand", IE: "Ireland", SE: "Sweden", NO: "Norway", DK: "Denmark",
    FI: "Finland", CH: "Switzerland", AT: "Austria", BE: "Belgium", PT: "Portugal",
    PL: "Poland", CZ: "Czech Republic", HU: "Hungary", RO: "Romania",
    AR: "Argentina", CL: "Chile", CO: "Colombia", PE: "Peru",
    EG: "Egypt", SA: "Saudi Arabia", QA: "Qatar", KW: "Kuwait",
    TH: "Thailand", VN: "Vietnam", ID: "Indonesia", TR: "Turkey",
  };
  return map[code.toUpperCase()] ?? code.toUpperCase();
}
