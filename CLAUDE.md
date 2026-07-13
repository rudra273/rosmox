# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/portfolio site for **Rosmox**, an AI-native software studio. Pure Next.js App Router frontend — no backend, no database, no API routes. Content is hardcoded in components. The single job of this site is to look crafted and rank well; SEO and motion quality are first-class concerns, not afterthoughts.

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (also the type/lint gate — run before considering work done)
npm run start    # serve the production build
npm run lint     # eslint (next core-web-vitals config)
```

There is no test suite. `npm run build` is the verification step — it type-checks (TS strict) and lints the whole tree.

## Critical: Next.js version

This is **Next.js 16** (`next@16.2.4`, React 19). Per `AGENTS.md`, APIs and conventions differ from older Next.js you may know — **read the relevant guide in `node_modules/next/dist/docs/` before writing framework-level code** (metadata, routing, dynamic imports, etc.). Do not assume Next 13/14 behavior.

## Architecture

- **App Router, everything under `app/`.** Route = directory with `page.tsx`. Route-group metadata for interactive (client) pages lives in a sibling `layout.tsx` (e.g. `app/products/`, `app/contact/`) because a `"use client"` page cannot export `metadata`.
- **Server-first, client where interaction demands it.** `app/layout.tsx` and static project pages are Server Components. Anything animated or stateful is marked `"use client"` (see `app/components/sections/*` and `three/SignalField.tsx`). Prefer keeping new components server-side unless they need hooks/events.
- **Home page = ordered section composition.** `app/page.tsx` renders `components/sections/*` in narrative order (Hero → TrustMarquee → Services → AgentFlow → Products → Work → Process → WhyRosmox → Testimonials → Contact). To change the homepage story, reorder/add sections here.
- **Product/project pages** live under `app/projects/<name>/` with optional `privacy-policy/` and `delete-account/` sub-routes. These are referenced by app-store listings — **keep existing privacy-policy and delete-account routes working** when refactoring.

## Styling system — "Signal & Structure"

- **Tailwind v4** (via `@tailwindcss/postcss`, imported with `@import "tailwindcss"` in `app/globals.css`) **plus hand-written CSS**. Most section styling is bespoke CSS in `app/styles/*.css` (`nav`, `hero`, `home`, `mocks`, `pages`), all imported at the top of `globals.css`.
- **Design tokens are CSS custom properties** defined in `:root` in `globals.css` — surfaces, text tiers, the `--accent` "signal" blue, per-product identity colors, the `--seam` gradient motif, and the **motion manifesto** (`--ease*`, `--dur*`, `--spring`). Use these tokens; do not introduce one-off magic numbers for durations/easings/colors. New animations must reuse the named easing/duration tokens.
- **Fonts** are loaded via `next/font/google` in `app/layout.tsx` (Geist, Geist Mono, Instrument Serif) and exposed as `--font-geist`, `--font-geist-mono`, `--font-serif`.
- Global scaffolding lives in `layout.tsx`: skip link, `.atmos`/`.grain` background layers, `Navbar`, `Footer`. `overflow-x: clip` (not `hidden`) is intentional — `hidden` breaks `position: sticky`.

## Motion & WebGL

The redesign brief (`REDESIGN_BRIEF.md`) is the source of intent — read it before large design work. Key rules it encodes and the code follows:

- **`prefers-reduced-motion` must have a fully-designed fallback** (opacity-only, static, no parallax). Respect it in any new animation.
- **WebGL is vignette, not wallpaper.** `HeroVisual.tsx` lazily mounts `SignalField` (`three`) only when WebGL is available AND motion is allowed, via `dynamic(..., { ssr: false })`. The shader pauses offscreen/hidden and disposes on unmount. Any new 3D must follow this mount-guard + dispose pattern.
- Animation library is `motion` (Framer Motion successor).

## SEO / structured data

SEO is load-bearing. When adding or renaming a route, update **all** of:

- `app/sitemap.ts` (route list + priorities) and `app/robots.ts`
- `metadata` export (title/description/canonical) on the page or its route-group `layout.tsx`
- JSON-LD via `app/components/JsonLd.tsx` — use the `productJsonLd(...)` helper on product pages and `servicesJsonLd()` on home. Org/website JSON-LD is emitted globally in `layout.tsx`.

`SITE_URL` (`https://rosmox.com`) is duplicated across `layout.tsx`, `JsonLd.tsx`, `sitemap.ts`, `robots.ts` — keep them in sync.

## Conventions

- Import alias `@/*` maps to repo root (`tsconfig.json`).
- Product preview "mocks" (the little UI illustrations) are pure-CSS components in `components/sections/productsData.tsx`, styled by `app/styles/mocks.css`.
