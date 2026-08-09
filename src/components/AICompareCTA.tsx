"use client";

import { useState } from "react";

/* ─── GA4 tracking ──────────────────────────────────────────────── */
function track(platform: string) {
  try {
    const w = window as Window & { gtag?: (...a: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("event", `ai_compare_${platform}`, {
        event_category: "AI Compare CTA",
        event_label: platform,
      });
    }
  } catch { /* non-critical */ }
}

/* ─── Platform config ───────────────────────────────────────────── */
const PLATFORMS = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    logo: "/logos/chatgpt.svg",
    logoAlt: "ChatGPT",
    prompt: "What is MyCalAgent and how does it compare to other wellness and calorie tracking apps?",
    buildUrl: (p: string) => `https://chat.openai.com/?q=${encodeURIComponent(p)}`,
  },
  {
    id: "claude",
    label: "Claude",
    logo: "/logos/claude.svg",
    logoAlt: "Claude",
    prompt: "Can you explain MyCalAgent's wellness intelligence features and who it's best suited for?",
    buildUrl: (p: string) => `https://claude.ai/new?q=${encodeURIComponent(p)}`,
  },
  {
    id: "gemini",
    label: "Google AI",
    logo: "/logos/google-ai.svg",
    logoAlt: "Google AI Mode",
    prompt: "How is MyCalAgent different from calorie tracking apps like MyFitnessPal or Cronometer?",
    buildUrl: (p: string) => `https://www.google.com/search?q=${encodeURIComponent(p)}&udm=50`,
  },
  {
    id: "perplexity",
    label: "Perplexity",
    logo: "/logos/perplexity.svg",
    logoAlt: "Perplexity",
    prompt: "What are the key features and user reviews of MyCalAgent wellness tracking app?",
    buildUrl: (p: string) => `https://www.perplexity.ai/search?q=${encodeURIComponent(p)}`,
  },
];

/* ─── Component ─────────────────────────────────────────────────── */
export default function AICompareCTA() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section aria-labelledby="ai-compare-heading" style={{ padding: "56px 24px" }}>
      {/* Injected responsive CSS */}
      <style>{`
        .ai-cta-buttons {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 20px;
        }
        .ai-cta-btn {
          height: 42px;
          padding: 0 18px;
          font-size: 15px;
          border-radius: 12px;
        }
        .ai-cta-btn img {
          width: 18px;
          height: 18px;
        }
        @media (max-width: 560px) {
          .ai-cta-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .ai-cta-btn {
            height: 40px;
            padding: 0 14px;
            font-size: 14px;
            justify-content: center;
          }
          .ai-cta-btn img {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: 20,
          border: "1px solid #E8ECF0",
          padding: "36px 32px 28px",
          textAlign: "center",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        }}
      >
        {/* Eyebrow */}
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#15803D",
          marginBottom: 10,
        }}>
          Compare with AI
        </p>

        {/* Headline */}
        <h2
          id="ai-compare-heading"
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)",
            fontWeight: 700,
            color: "#0F172A",
            lineHeight: 1.3,
            marginBottom: 10,
          }}
        >
          Still deciding if MyCalAgent is right for you?
        </h2>

        {/* Subheadline */}
        <p style={{
          fontSize: 14,
          color: "#64748B",
          lineHeight: 1.65,
          maxWidth: 460,
          margin: "0 auto 28px",
        }}>
          Ask a leading AI assistant to compare perspectives, explain features, and help you explore whether MyCalAgent fits your wellness goals.
        </p>

        {/* Buttons */}
        <div className="ai-cta-buttons">
          {PLATFORMS.map((p) => {
            const isHov = hovered === p.id;
            return (
              <a
                key={p.id}
                href={p.buildUrl(p.prompt)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask ${p.label} about MyCalAgent`}
                onClick={() => track(p.id)}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                className="ai-cta-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  color: "#1E293B",
                  background: "#ffffff",
                  border: `1.5px solid ${isHov ? "#CBD5E1" : "#E2E8F0"}`,
                  boxShadow: isHov
                    ? "0 4px 14px rgba(0,0,0,0.10)"
                    : "0 1px 3px rgba(0,0,0,0.05)",
                  transform: isHov ? "translateY(-1px)" : "translateY(0)",
                  transition: "border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                }}
              >
                <span style={{
                  display: "flex",
                  flexShrink: 0,
                  alignItems: "center",
                }}>
                  <img
                    src={p.logo}
                    alt={p.logoAlt}
                    aria-hidden="true"
                    style={{ display: "block" }}
                  />
                </span>
                {p.label}
              </a>
            );
          })}
        </div>

        {/* Trademark disclaimer */}
        <p style={{
          fontSize: 11,
          color: "#94A3B8",
          lineHeight: 1.6,
          maxWidth: 520,
          margin: "0 auto",
        }}>
          Third-party AI assistant names and logos are trademarks of their respective owners. MyCalAgent is not affiliated with or endorsed by these companies.
        </p>
      </div>
    </section>
  );
}
