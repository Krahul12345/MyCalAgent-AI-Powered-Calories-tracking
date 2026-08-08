/**
 * Lightweight in-process rate limiter for Next.js API routes.
 * Uses a sliding-window counter per (key, route) pair.
 * In a multi-instance deployment replace the Map with Redis/Upstash.
 */

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateLimitEntry>();

// Prune stale entries every 5 minutes to prevent memory growth
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now - entry.windowStart > 10 * 60 * 1000) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitOptions {
  /** Unique bucket name (e.g. route path) */
  namespace: string;
  /** Maximum requests allowed within the window */
  limit: number;
  /** Window size in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number; // unix ms
}

/**
 * Returns whether the given IP is within rate limits.
 * Call at the top of every public API handler.
 */
export function rateLimit(ip: string, opts: RateLimitOptions): RateLimitResult {
  const key = `${opts.namespace}:${ip}`;
  const now = Date.now();

  const entry = store.get(key);

  if (!entry || now - entry.windowStart >= opts.windowMs) {
    // New window
    store.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: opts.limit - 1, resetAt: now + opts.windowMs };
  }

  entry.count += 1;

  if (entry.count > opts.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.windowStart + opts.windowMs,
    };
  }

  return {
    allowed: true,
    remaining: opts.limit - entry.count,
    resetAt: entry.windowStart + opts.windowMs,
  };
}

/** Extract the best available IP from a Next.js request */
export function getClientIp(request: Request): string {
  const headers = (request as any).headers as Headers;
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
