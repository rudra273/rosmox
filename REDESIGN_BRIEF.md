# Rosmox Website Redesign — Master Brief

> Paste this whole brief as context, then run the Phase prompts (bottom of file) one at a time.
> Do NOT ask the AI to "build the whole site" in one prompt — quality collapses. Phase it.

---

## 1. Who we are

Rosmox is an AI-native software studio with two arms:

1. **Products** — our own AI SaaS products (OrbitAI, BhashaLens, Vidyalaya, Storely, Everything).
2. **Services** — client work: agentic AI systems, web platforms, Android apps, end-to-end product builds.

**Audience:** founders, CTOs, and product leads evaluating a build partner; secondarily, end users discovering our products. They are technical, skeptical, and have seen a hundred "AI agency" sites. The site must earn trust through craft and proof, not adjectives.

**Brand personality:** precision-engineered, quietly confident, "a research lab that ships." Serious but not cold. Never hype-y, never generic-startup.

## 2. The job

A complete redesign — new concept, new information architecture, new motion language. Not a reskin of the current site.

**Failure modes of the current site (do not repeat):**
- One 3D object (a neural mesh sphere) persists behind the page from top to bottom, morphing on scroll. It reads as a screensaver, not design.
- Scroll animations are generic fade-up-on-enter, identical across all sections.
- Sections feel like a prototype: thin copy, placeholder-level depth, no real case-study content.

**Explicit anti-goals:**
- Do not clone Apple, Linear, Vercel, or Stripe layouts. Take their *standards* (craft, restraint, performance), invent our own *language*.
- No persistent full-page WebGL background.
- No animation for animation's sake — every motion must communicate something (state, hierarchy, causality, or delight at a key moment).

## 3. Art direction (define BEFORE building)

Deliver an art-direction spec first, as design tokens:

- **Color system** — pick a stance (dark-primary, light-primary, or adaptive) and commit. Full token scale: backgrounds, surfaces, borders, text tiers, one signature accent. All combinations must pass WCAG contrast (see §8).
- **Typography** — current fonts are Geist + Geist Mono + Instrument Serif; keep or argue for a replacement. Define a full type scale (display → caption) with fluid `clamp()` sizing, line-height and letter-spacing rules per tier. Max 3 families.
- **A signature visual motif** — one ownable graphic idea (a geometry, a grid behavior, a light treatment) that recurs across the site and becomes "the Rosmox look." This is the innovation requirement: invent it, don't borrow it.
- **Texture & depth rules** — when do we use grain, glow, blur, borders, elevation. Write it down so every section obeys the same physics.
- **Spacing & layout grid** — column grid, section rhythm, max-widths, breakpoint behavior.

## 4. Motion & 3D system (the heart of this redesign)

Write a **motion manifesto** before animating anything:

- **Tokens:** 2–3 duration tiers, 2–3 easing curves (named, reused everywhere), stagger rules, spring configs for interactive elements. No one-off magic numbers.
- **Choreography per section:** each section gets its own designed scroll moment — different mechanics (pinning, horizontal travel, mask reveals, sequenced text, parallax layers, counters) chosen to fit that section's *content*, not rotated for variety's sake. Transitions BETWEEN sections are designed too (how one hands off to the next).
- **3D as vignettes, not wallpaper:** 2–3 distinct, purposeful WebGL moments maximum. Examples of the *kind* of thing (invent the actual concepts):
  - A hero signature piece — interactive, reacts to pointer/scroll, establishes the motif.
  - One mid-page set piece — e.g., a spatial visualization of how an agentic system orchestrates tools, used to *explain* our work, not decorate it.
  - Each canvas is lazily mounted (dynamic import + IntersectionObserver), unmounted and disposed when offscreen, DPR-capped, with a static poster-image fallback for reduced-motion / low-power / WebGL-unavailable.
- **Micro-interactions:** hover, press, focus, and drag states with spring physics on buttons, cards, links, nav. Cursor-aware effects only where they add meaning.
- **`prefers-reduced-motion`:** a fully designed alternative — opacity-only transitions, static imagery, zero parallax/pinning. The site must be 100% usable and still look intentional with motion off.

## 5. Information architecture

- **Home** — narrative arc: who we are → what we build (services) → proof (products + case studies) → how we work (process) → why us → social proof → contact. Each section earns its place; cut anything that's filler.
- **Services** — agentic AI systems, web development, Android development, AI SaaS builds. Each service needs real depth: what it is, how we approach it, representative deliverables, tech we use.
- **Products** — index page + the existing product pages (OrbitAI, BhashaLens, Vidyalaya, Storely, Everything) redesigned to match the new system. Keep existing privacy-policy routes working.
- **Work / case studies** — the trust engine. Each case study: problem → constraints → approach → architecture/stack → outcome with concrete metrics → visuals. Written like an engineering blog post, not a portfolio caption.
- **About / process** — who's behind Rosmox, how an engagement runs (timeline, communication, handoff).
- **Contact** — form + direct email; state our response-time promise.
- **System pages** — designed 404, designed form success/error states, legal pages.
- **Navigation** — sticky nav with designed scroll behavior; mobile menu as a first-class designed experience (not a hamburger afterthought); footer as a real sitemap with secondary CTA.

## 6. Content & copy

- Write real copy in the brand voice — confident, concrete, zero buzzword filler. Every claim backed by a specific (a metric, a project, a capability).
- Headlines do work (communicate positioning), not vibes ("Empowering innovation" is banned).
- Microcopy is designed: button labels, form hints, validation messages, empty states, the 404 page.
- Each case study and service page is detailed enough to be independently linkable/shareable.

## 7. Conversion & UX details

- One primary CTA per viewport; clear visual hierarchy between primary/secondary actions.
- A contact path within 2 interactions from anywhere on the site.
- Contact form: inline validation with helpful messages, loading state on submit, designed success state, graceful error state. Never a dead-end.
- All interactive elements have visible hover, focus, active, and disabled states.
- Skeletons/placeholders for anything that loads async; no layout shift when content arrives.

## 8. Accessibility — WCAG 2.2 AA, non-negotiable

- Semantic landmarks (`header`, `nav`, `main`, `footer`), correct heading hierarchy (one `h1` per page, no skipped levels), skip-to-content link.
- Full keyboard operability: every interactive element reachable and operable; custom focus rings that are *designed* (never removed, never default blue).
- Contrast: ≥ 4.5:1 body text, ≥ 3:1 large text and UI components — including text over 3D/animated backgrounds (use scrims if needed).
- Meaningful alt text on images; decorative visuals marked `aria-hidden`; ARIA only where native semantics are insufficient.
- Forms: real `<label>`s, errors announced to screen readers (`aria-describedby` / live regions).
- No flashing content; honor `prefers-reduced-motion` everywhere (see §4).
- Touch targets ≥ 44×44px on mobile.

## 9. Performance budget — measured, not vibes

Targets on a mid-range Android over 4G (not just desktop Chrome):

- **Core Web Vitals:** LCP < 2.0s, INP < 200ms, CLS < 0.1 on every page.
- **Lighthouse ≥ 95** in Performance, Accessibility, Best Practices, and SEO on every page.
- three.js never in the initial bundle: dynamic import per vignette, mount on intersection, dispose on unmount, `requestAnimationFrame` paused when offscreen or tab hidden.
- Initial JS for the home route ≤ ~200 KB gzipped excluding lazily-loaded 3D chunks.
- Fonts subset + `display: swap`; images via `next/image` with explicit dimensions; hero LCP element is never a canvas.
- React Server Components by default; `"use client"` only at interactive leaves.

## 10. SEO

- **Per-page metadata** via the Next.js Metadata API: unique title + description, canonical URL, Open Graph + Twitter cards with generated OG images (per page, on-brand).
- **Structured data (JSON-LD):** `Organization`, `WebSite`, `Service` per service, `Product`/`SoftwareApplication` per product, `BreadcrumbList` on nested pages.
- `sitemap.ts` + `robots.ts`; clean URL structure; internal linking between services ↔ case studies ↔ products.
- Copy targets real queries ("agentic AI development company", "AI SaaS development studio", "android app development agency") naturally, not stuffed.
- All meaningful content server-rendered (no client-only text); descriptive link text (no bare "Learn more").

## 11. Tech constraints

- **Keep the stack:** Next.js 16 App Router, Tailwind CSS v4, Motion (Framer Motion), raw three.js, TypeScript. Styling strategy stays consistent with the codebase.
- Mobile-first; verified at 360, 768, 1024, 1440, 1920px. No hover-dependent meaning on touch devices.
- Browser support: last 2 versions of evergreen browsers + current iOS Safari. WebGL feature-detected with graceful fallback.
- Light analytics hook point (privacy-respecting) so we can measure CTA clicks and form submits later.

## 12. Definition of done (verify, don't assume)

- [ ] Lighthouse ≥ 95 × 4 categories on every page (mobile emulation)
- [ ] axe DevTools: zero critical/serious issues on every page
- [ ] Full keyboard-only walkthrough passes (visible focus everywhere)
- [ ] `prefers-reduced-motion` walkthrough passes and still looks intentional
- [ ] 360px-width walkthrough passes with no overflow/clipping
- [ ] Every page has unique title, description, OG image, canonical
- [ ] JSON-LD validates in Google's Rich Results test
- [ ] No placeholder copy anywhere ("Lorem", "Coming soon", vague filler)
- [ ] 3D vignettes: verified lazy-load, dispose, and static fallback

---

## Phase prompts — run these one at a time

**Phase 0 — Concept.**
"Read REDESIGN_BRIEF.md. Before writing any code, propose 2–3 distinct creative concepts for the Rosmox redesign. For each: the signature visual motif, art direction (color/type stance), the motion manifesto (named easings/durations/choreography ideas per home section), and the 2–3 WebGL vignette concepts with what each one *communicates*. Argue for one. Do not build yet."

**Phase 1 — Foundation.**
"Implement the chosen concept's foundation: design tokens (color, type scale, spacing, motion tokens), base layout (nav, footer, page shell), the reduced-motion strategy, and global a11y scaffolding (skip link, landmarks, focus rings). No sections yet. Show me the system on a bare page."

**Phase 2 — Hero + signature 3D vignette.**
"Build the home hero with the signature WebGL piece per the brief: lazy-mounted, disposed offscreen, poster fallback, pointer/scroll reactive, LCP not the canvas. Then I'll review before we continue."

**Phase 3 — Home sections.**
"Build the remaining home sections one or two at a time, each with its own choreographed scroll moment per the motion manifesto, real copy, and section-to-section transitions. Stop after each pair for review."

**Phase 4 — Subpages.**
"Build services, products index + product pages (preserving existing privacy-policy routes), case studies, about/process, contact (with full form states), and the designed 404 — all on the established system."

**Phase 5 — Audit pass.**
"Run the Definition of Done checklist from REDESIGN_BRIEF.md §12. Measure (Lighthouse, axe, keyboard pass, reduced-motion pass, 360px pass), report results honestly, and fix what fails."
