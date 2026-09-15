"use client";

import { FormEvent, useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to subscribe.");
      setStatus("success");
      setMessage("You’re on the list for Weekly Insights.");
      setEmail("");
      setConsent(false);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to subscribe.");
    }
  }

  return (
    <div className="col-span-2 lg:col-span-1">
      <h4 className="text-sm font-semibold mb-3">Weekly Insights</h4>
      <p className="text-sm text-muted-foreground mb-3">Practical wellness ideas from MyCalAgent, once a week.</p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5" />
          <span>I agree to receive Weekly Insights and can unsubscribe at any time.</span>
        </label>
        <button type="submit" disabled={status === "submitting"} className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
          {status === "submitting" ? "Joining…" : "Join Weekly Insights"}
        </button>
      </form>
      {message && <p className={`mt-2 text-xs ${status === "error" ? "text-red-600" : "text-emerald-700"}`} role="status">{message}</p>}
    </div>
  );
}
