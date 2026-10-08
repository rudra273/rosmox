import type { NextConfig } from "next";

/* ──────────────────────────────────────────────────────────
   Security headers (production only — dev needs eval + HMR
   websockets, which a CSP would block).

   CSP notes:
   · script-src keeps 'unsafe-inline' because Next.js streams
     the RSC payload through inline <script> tags. Evaluated and
     declined (Oct 2026, Next 16):
       – per-request nonces (proxy.ts) force every page to render
         on each request — no static HTML, no CDN cache — a real
         speed cost for a site with no user-generated content and
         no third-party scripts;
       – experimental SRI only adds `integrity` to external
         chunks; the inline payload scripts still need
         'unsafe-inline' (or a nonce).
     Revisit if the site ever renders user content or adds
     third-party scripts.
   · Everything else is same-origin: self-hosted fonts
     (next/font), images via /_next/image (blur placeholders
     are data: URIs), Vercel Analytics / Speed Insights served
     from /_vercel/*, and the contact form posts to a Server
     Action on this origin.
   ────────────────────────────────────────────────────────── */

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /* the old per-discipline service pages, folded into the
     four service categories */
  async redirects() {
    return [
      { source: "/services/ai-products", destination: "/services/artificial-intelligence", permanent: true },
      { source: "/services/web", destination: "/services/product-platform-development", permanent: true },
      { source: "/services/mobile", destination: "/services/product-platform-development", permanent: true },
      { source: "/services/ux", destination: "/services/product-platform-development", permanent: true },
      /* the previous site's /projects/* URLs — Google Play listings still
         point at them. Vidya AI's route slug is "vidyakalp"; DayKit was
         called "Everything" and has only a policy page. */
      { source: "/projects/vidyalaya", destination: "/products/vidyakalp", permanent: true },
      { source: "/projects/vidyalaya/privacy-policy", destination: "/products/vidyakalp/privacy-policy", permanent: true },
      { source: "/projects/vidyalaya/delete-account", destination: "/products/vidyakalp/delete-account", permanent: true },
      { source: "/projects/storely", destination: "/products/storely", permanent: true },
      { source: "/projects/storely/privacy-policy", destination: "/products/storely/privacy-policy", permanent: true },
      { source: "/projects/orbitai", destination: "/products/orbit-ai", permanent: true },
      { source: "/projects/everything", destination: "/products/daykit/privacy-policy", permanent: true },
      { source: "/projects/everything/privacy-policy", destination: "/products/daykit/privacy-policy", permanent: true },
      { source: "/projects/bhashalens", destination: "/#products", permanent: true },
      { source: "/products", destination: "/#products", permanent: true },
    ];
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
