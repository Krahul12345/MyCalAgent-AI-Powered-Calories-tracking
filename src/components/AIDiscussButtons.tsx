"use client";

import { useState } from "react";

type PageType = "comparison" | "feature" | "pillar";

interface Props {
  pageUrl: string;
  pageTitle: string;
  pageType?: PageType;
  label?: string;
  className?: string;
}

function track(platform: string) {
  try {
    const w = window as Window & { gtag?: (...a: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("event", `ai_share_${platform}`, {
        event_category: "AI Share",
        event_label: platform,
      });
    }
  } catch { /* non-critical */ }
}

/* ─── Platform definitions ──────────────────────────────────────── */
const ALL_PLATFORMS = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    logo: "/logos/chatgpt.svg",
    logoAlt: "ChatGPT",
    buildUrl: (p: string) => `https://chat.openai.com/?q=${encodeURIComponent(p)}`,
  },
  {
    id: "claude",
    label: "Claude",
    logo: "/logos/claude.svg",
    logoAlt: "Claude",
    buildUrl: (p: string) => `https://claude.ai/new?q=${encodeURIComponent(p)}`,
  },
  {
    id: "gemini",
    label: "Google AI",
    logo: "/logos/google-ai.svg",
    logoAlt: "Google AI",
    buildUrl: (p: string) => `https://www.google.com/search?q=${encodeURIComponent(p)}&udm=50`,
  },
  {
    id: "perplexity",
    label: "Perplexity",
    logo: "/logos/perplexity.svg",
    logoAlt: "Perplexity",
    buildUrl: (p: string) => `https://www.perplexity.ai/search?q=${encodeURIComponent(p)}`,
  },
];

/* comparison gets all 4; feature/pillar gets first 3 */
function getPlatforms(pageType: PageType) {
  return pageType === "comparison" ? ALL_PLATFORMS : ALL_PLATFORMS.slice(0, 3);
}

/* ─── Dynamic prompt builder ────────────────────────────────────── */
function buildPrompt(pageTitle: string, pageUrl: string, pageType: PageType): string {
  if (pageType === "comparison") {
    return `Compare ${pageTitle} — what are the key differences, which app is better for different user goals, and what should someone consider when choosing? Reference: ${pageUrl}`;
  }
  if (pageType === "feature") {
    return `Explain ${pageTitle} — how does this feature work, what are its benefits, and how does it help with wellness tracking? Reference: ${pageUrl}`;
  }
  // pillar / educational
  return `Summarize the key insights from "${pageTitle}" and explain what this means for wellness, nutrition, and healthy habits. Reference: ${pageUrl}`;
}

/* ─── Default label per page type ───────────────────────────────── */
function defaultLabel(pageType: PageType): string {
  if (pageType === "comparison") return "Compare with AI:";
  return "Summarize with AI:";
}

/* ─── Component ─────────────────────────────────────────────────── */
export default function AIDiscussButtons({
  pageUrl,
  pageTitle,
  pageType = "pillar",
  label,
  className = "",
}: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const platforms = getPlatforms(pageType);
  const prompt = buildPrompt(pageTitle, pageUrl, pageType);
  const heading = label ?? defaultLabel(pageType);

  return (
    <div className={className}>
      <style>{`
        .ai-discuss-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
        .ai-discuss-btn {
          display: inline-flex; align-items: center; gap: 7px;
          height: 38px; padding: 0 16px; border-radius: 10px;
          font-size: 13.5px; font-weight: 600; text-decoration: none;
          white-space: nowrap; color: #1E293B; background: #ffffff;
          cursor: pointer; letter-spacing: -0.01em;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
        }
        .ai-discuss-btn img { display: block; width: 16px; height: 16px; }
        @media (max-width: 480px) {
          .ai-discuss-btn { height: 36px; padding: 0 13px; font-size: 13px; }
        }
      `}</style>

      {/* Label */}
      <p style={{ fontSize: 11.5, fontWeight: 700, color: "#64748B", marginBottom: 10, letterSpacing: "0.03em", textTransform: "uppercase" }}>
        {heading}
      </p>

      {/* Buttons */}
      <div className="ai-discuss-row">
        {platforms.map((p) => {
          const isHov = hovered === p.id;
          return (
            <a
              key={p.id}
              href={p.buildUrl(prompt)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${heading.replace(":", "")} — ${p.label}`}
              onClick={() => track(p.id)}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              className="ai-discuss-btn"
              style={{
                border: `1.5px solid ${isHov ? "#CBD5E1" : "#E2E8F0"}`,
                boxShadow: isHov ? "0 4px 14px rgba(0,0,0,0.09)" : "0 1px 3px rgba(0,0,0,0.05)",
                transform: isHov ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              <span style={{ display: "flex", flexShrink: 0, filter: isHov ? "brightness(1.1)" : "none", transition: "filter 0.15s ease" }}>
                <img src={p.logo} alt={p.logoAlt} aria-hidden="true" />
              </span>
              {p.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
