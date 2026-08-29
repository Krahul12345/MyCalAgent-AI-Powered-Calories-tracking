import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');
const isDev = process.env.NODE_ENV === 'development';

const CSP = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    isDev ? "'unsafe-eval' http://localhost:*" : "",
    "https://www.googletagmanager.com https://js.stripe.com https://slelguoygbfzlpylpxfs.supabase.co https://bzrcdn.openai.com",
  ].filter(Boolean).join(' '),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://slelguoygbfzlpylpxfs.supabase.co https://kxlkulmuhnnnalnzlftn.supabase.co https://flagcdn.com https://www.googletagmanager.com https://www.google-analytics.com",
  "media-src 'self' https://kxlkulmuhnnnalnzlftn.supabase.co https://slelguoygbfzlpylpxfs.supabase.co",
  [
    "connect-src 'self'",
    isDev ? "http://localhost:* ws://localhost:*" : "",
    "https://api.stripe.com https://www.google-analytics.com https://www.googletagmanager.com https://ipapi.co https://slelguoygbfzlpylpxfs.supabase.co https://kxlkulmuhnnnalnzlftn.supabase.co https://bzr.openai.com",
  ].filter(Boolean).join(' '),
  "frame-src https://js.stripe.com https://hooks.stripe.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join('; ');

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Link',
    value: '</.well-known/webmcp.json>; rel="webmcp-manifest", </.well-known/mcp.json>; rel="mcp-manifest", </llms.txt>; rel="describedby"; type="text/markdown"',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(self), microphone=(), geolocation=(self), interest-cohort=()',
  },
  ...(isDev ? [] : [{
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  }]),
  {
    key: 'Content-Security-Policy',
    value: CSP,
  },
  // Prevent browsers sending cookies cross-origin
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'cross-origin',
  },
];

const nextConfig: NextConfig = {
  images: {
    // Whitelist only the trusted image hostnames used by the app
    remotePatterns: [
      { protocol: 'https', hostname: 'slelguoygbfzlpylpxfs.supabase.co' },
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }, // Google avatars
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' }, // GitHub avatars
    ],
    formats: ['image/avif', 'image/webp'],
    // Prevent SSRF via image optimisation endpoint
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Long-lived cache for immutable assets
        source: '/(.*)\\.(png|jpg|jpeg|gif|svg|ico|webp|avif|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(site.webmanifest|robots.txt|sitemap.xml|.well-known/webmcp.json|.well-known/mcp.json)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      {
        // Prevent caching sensitive API responses
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/demo', destination: '/#demo', permanent: false },
      { source: '/compare', destination: '/knowledge-base', permanent: true },
    ];
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'recharts'],
  },
  compress: true,
  poweredByHeader: false,
  outputFileTracingRoot: path.resolve(__dirname),
  serverExternalPackages: ['postgres'],
  turbopack: isDev ? {
    rules: { "*.{jsx,tsx}": { loaders: [LOADER] } },
  } : undefined,
};

export default nextConfig;
// Orchids restart: 1771283335815
