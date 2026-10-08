# ROSMOX — Website

Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind v4 + Framer Motion + Lenis. Node 20.9+.

## Run

```bash
npm install
npm run dev        # http://localhost:3000 (dev output goes to .next/dev)
npm run build      # production build (Turbopack)
npm run lint       # ESLint flat config (next/core-web-vitals + typescript)
npm run typecheck  # tsc --noEmit
```

Open http://localhost:3000

## Environment

Copy `.env.example` to `.env.local`. The contact form sends through [Resend](https://resend.com):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (defaults to `https://rosmox.com`) |
| `RESEND_API_KEY` | Required in production. Without it the form logs enquiries in dev and shows an "email us instead" error in prod. |
| `CONTACT_TO_EMAIL` | Inbox for enquiries (defaults to `hello@rosmox.com`) |
| `CONTACT_FROM_EMAIL` | Verified Resend sender, e.g. `ROSMOX Website <website@rosmox.com>` |

**Analytics:** Vercel Web Analytics + Speed Insights render only on Vercel builds (`process.env.VERCEL`). Turn both on in the Vercel dashboard (Project → Analytics / Speed Insights), or their scripts 404.

**Security headers** (CSP, HSTS, nosniff, frame-ancestors, referrer + permissions policy) are set in `next.config.ts` for production builds only. The CSP keeps `'unsafe-inline'` for scripts on purpose — see the note in `next.config.ts`.

## Structure

| Path | What |
|---|---|
| `app/layout.tsx` | Root layout: skip link, `<Navbar>`, `<main>`, `<Footer>`, site metadata, Organization JSON-LD |
| `app/page.tsx` | Homepage section order (Hero → About → Services → Products → Work → Contact, with the FAQ inside Contact) |
| `app/products/[slug]` | Product detail pages (data in `lib/products.ts`) |
| `app/{robots,sitemap,manifest}.ts`, `icon.svg`, `apple-icon.tsx`, `opengraph-image.tsx` | SEO + share assets |
| `app/not-found.tsx` | Branded 404 |
| `lib/site.ts` | Nav links, primary CTA, email, social links, site URL |
| `lib/contact.ts`, `app/actions/contact.ts`, `components/ContactForm.tsx` | Contact form: shared validation, server action (Resend), UI |
| `lib/services.ts`, `lib/products.ts` | Shared content — used by sections, navbar, footer, sitemap. Products show as a card grid on the homepage. |
| `lib/work.ts` | Client work (Work section — a scroll-stacked deck; Contact slides over it). Screenshots: ~2400px WebP in `public/work/`, statically imported for `next/image` blur placeholders. Array order = deck order. |
| `lib/motion.ts` | The only easings, durations and springs the site uses |
| `components/Providers.tsx` | `LazyMotion` (Framer features load after hydration), `MotionConfig`, smooth scroll |
| `components/SmoothScroll.tsx` | Lenis, loaded after hydration; `useLenis()` returns it or `null` |
| `components/ui/` | `Button`, `Eyebrow`, `Logo`, `Reveal`, `RevealText` primitives |
| `components/icons.tsx` | One icon set (24px grid, 1.6 stroke) |
| `docs/next-version-plan.md` | v2 audit + roadmap |

## Design system (`app/globals.css`)

- **Colors:** `ink`, `surface`, `elevated` (dark) · `paper`, `paper-2` (light) · `primary`, `accent`, `glow`, `primary-ink` (blue text on light).
- **Radius:** `rounded-sm` 6px (controls) · `rounded-md` 12px (cards) · `rounded-lg` 20px (panels). Nothing else.
- **Type:** `text-hero` (homepage h1 only), `text-display`, `text-statement`, `text-h2`, `text-h3`, `text-lead`, `text-label` (mono, ≥12px). No `text-[..px]`.
- **Layout:** `container-page` (the one container) and `section-y` (section padding).
- **First-paint motion:** `.line-mask > .line`, `.reveal-rise`, `.reveal-fade` and `.reveal-lift` are CSS, so above-the-fold content animates without waiting for JS. Use them for anything visible on load — Framer's features arrive after hydration. `.reveal-lift` never starts at opacity 0, so a large image or text block still counts for LCP at first paint. Delay them with `cssDelay(ms)` from `lib/motion.ts`.
- **Scroll motion:** `<Reveal>` / `<RevealText>` for in-view entrances. Animate `transform` and `opacity` only.
- **Framer:** import `m`, never `motion` (ESLint enforces it) — `<LazyMotion>` supplies the features.

## Conventions

- Every `<section>` sets `data-theme="dark" | "light"`. The navbar reads it to switch its glass style.
- Links are root-relative (`/#work`, not `#work`) so they work from any route.
- `prefers-reduced-motion` is handled globally (`<MotionConfig reducedMotion="user">`, plus CSS fallbacks).
- Product `highlights` (stats) stay empty until there are real numbers; the stats band hides itself.
- The Blog link and Social links are hidden until real content and profile URLs exist (`lib/site.ts`).
