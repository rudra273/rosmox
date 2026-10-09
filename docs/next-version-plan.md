# ROSMOX v2 — Next Version Plan

Audit done on 2026-10-02 against `localhost:3000`. I checked it at 375 / 1024 / 1440 / 1920 widths, read the source, and probed the SEO routes.

---

## Status — branch `v2-polish` (Oct 2026)

| Phase | State |
|---|---|
| 0 · Foundations | ✅ tokens, motion lib, ui kit, shared data, landmarks, ESLint |
| 1 · Critical fixes | ✅ C1–C12 |
| 2 · Section redesigns | ✅ navbar, hero, about, services (unfold animation), products, approach, work (real clients), contact form, footer |
| 3 · New pages | ✅ `/services/[slug]` ×4, `/privacy` · ⏳ case studies, about/team, careers, blog, testimonials, FAQ — waiting on real content |
| 4 · Motion polish | ✅ Lenis, masked heading reveals, route transitions, micro-interactions, offscreen pausing |
| 5 · QA & launch | ✅ security headers, Next 16.3 (Turbopack, 0 audit vulns), favicon/OG, analytics (Vercel), link crawl clean, Chrome QA at desktop + phone sizes, Lighthouse mobile 90–94 perf · 100 a11y/BP/SEO on every page, desktop 100 · ⏳ Resend key, legal review of `/privacy` |

Engineering follow-ups, done Oct 2026:

- **Next 16.3** (from 15.5): Turbopack builds, React 19.2, ESLint flat config, version-matched docs in `node_modules/next/dist/docs` (see `AGENTS.md`). Its runtime is ~27 KB gz heavier, so the next two items pay that back.
- **LazyMotion:** components render Framer's slim `m`; the feature bundle (17 KB gz) loads after hydration. ESLint blocks `motion` imports.
- **Lenis loads after hydration** (`components/SmoothScroll.tsx`).
- Net startup JS on the homepage: 199 → 211 KB gz. Above-the-fold blocks on product and policy pages moved to CSS entrances (`.reveal-lift`) so they paint without JS.
- **Nonce-based CSP: decided against.** It forces per-request rendering of every page (no static HTML or CDN cache) for little gain on a site with no user content or third-party scripts. Reasoning is in `next.config.ts`.
- **Browser QA is Chrome-only** (desktop + phone sizes) by decision; the Safari/Firefox device pass is dropped.

---

## 0. Verdict

**The foundations are good.** The ink and blue palette, the Space Grotesk + Inter + JetBrains Mono type trio, the dark/light section rhythm, the blueprint hero idea, the sticky product deck and the pinned work showcase are all real design ideas. They don't need replacing.

**Why it still reads as junior work:**

1. **Inconsistency.** There are 3 logo variants, 2 easing curves, 11 corner-radius values, 10 hand-picked font sizes and 3 container widths.
2. **Content that looks like placeholder, and sometimes is.** One product page literally says *"This is placeholder copy for the demo template."*
3. **Interactions that look broken.** Scrambled text, dead arrow buttons, links to nowhere.
4. **The trust layer every serious company site has is missing.** No client logos, testimonials, case studies, contact form, legal pages or SEO basics.

v2 doesn't need a new look. It needs **one system, real content and better motion**, applied consistently everywhere.

---

## 1. Audit findings

### 1.1 Critical: broken or visibly wrong (fix first)

| # | Issue | Where | Impact |
|---|---|---|---|
| C1 | **Hero is blank for the first 1–4 s.** All hero text is server-rendered at `opacity:0` and waits for JS to hydrate. The blueprint draw-in takes 3.2 s. | `Hero.tsx:40`, `SystemBlueprint.tsx` | The first impression is an empty dark screen, and it hurts LCP (load speed). |
| C2 | **Hero text overlaps the blueprint between 1024 and 1279 px.** Both are absolutely positioned. | `Hero.tsx:38, 65` | It looks broken on most laptops. |
| C3 | **Nav and footer links are bare hashes** (`#products`). On `/products/*` they go nowhere. The logo is `href="#"`, so it can't take you home from a product page. | `Navbar.tsx:13-20, 60`, `Footer.tsx` | Navigation is broken off the homepage. |
| C4 | **Dead links:** Blog (`#blog` doesn't exist). Footer "Platform", "Pricing" and "Changelog" all go to `#products`. Privacy, Terms and Cookies go to `#`. Social links go to the root of twitter.com, linkedin.com and so on. | `Navbar.tsx`, `Footer.tsx` | Clear "unfinished site" signal. |
| C5 | **Placeholder copy is live** on every product page: "This is placeholder copy for the demo template…". | `lib/products.ts` | Very visible credibility hit. |
| C6 | **Services cards show scrambled gibberish at rest** (`XT~ X?A#&@N`). On mobile all 4 cards look corrupted at once. | `Services.tsx:141` (inView margin −35%) | Looks like a rendering bug. |
| C7 | **Services cards animate `height` 0→200 px as you scroll.** The page height changes under the user's thumb, so the scroll jumps. | `Services.tsx:205-211` | Jank and layout shift. |
| C8 | **Navbar pill turns muddy grey over white sections**, with low-contrast white text on it. | `Navbar.tsx:82` | About, Products and Approach all look off. |
| C9 | **The homepage has no `<h1>`.** The hero statement is a `<p>`. | `Hero.tsx:39` | SEO and screen readers. |
| C10 | **No favicon, OG/Twitter image, `robots.txt`, `sitemap.xml` or manifest.** All of them return 404. | `app/` | Shared links show no preview, and the browser tab shows a default icon. |
| C11 | **Zero `focus-visible` styles and no skip link.** The Services dropdown opens on hover only, and its links stay tabbable while the dropdown is hidden, because it's only clipped. | `Navbar.tsx:86-134` | Keyboard users can't use the site. |
| C12 | **The 404 page is the default Next.js one.** | `app/not-found.tsx` (missing) | Off-brand. |

### 1.2 Brand and visual consistency

- **The logo is drawn 3 ways.** The navbar shows `ROX` blue + `MOS` white. The mobile menu and footer show `ROX` white + `MOS` blue. It **flips when you open the mobile menu**. There's no actual logo asset, just styled text.
- **The logo sits in a solid `#04060d` box.** Over white sections and over mobile product cards it becomes a floating black block.
- **Two easing curves.** Navbar and the floating CTA use `[0.4,0,0.2,1]`; everything else uses `[0.22,1,0.36,1]`. `const EASE` is defined **12 times**.
- **11 radius variants** (`tight`, `sm`, `md`, `lg`, `xl`, `2xl`, `[28px]`, `loose`, …). The hero button is `rounded-sm`, the nav button `rounded-tight` and the product buttons `rounded-md`.
- **10 hand-picked font sizes**, from 9 px to 15 px. Mono labels at 9–11 px with 30–40 % opacity **fail WCAG AA contrast**. Examples: "SCROLL" and "03 PROJECTS".
- **3 container widths:**
  - most sections are 1440 px
  - Services is 1200 px
  - Approach is 80 % width and left-aligned

  Left edges don't line up from section to section, and Approach has an empty 20 % gutter on the right that reads as a bug.
- **4 unrelated light surfaces** (`#f6f8fc`, `#e8ebf1`, `#f1f3f8` and the blue gradient) with no rule for when to use which.
- **Glass cards on a light background turn grey.** The blur picks up the background, so the first product card has a different tone from the rest.
- **Inconsistent heading case.** "How We Turn an Ambiguous Problem into a Shipped System" is Title Case; everything else is sentence case.
- **Low-contrast accent text.** "Questions We Work Through Together" uses `#62adff` on `#f1f3f8`, which is about 2.3:1.

### 1.3 Content that looks like a template

- **Product and work images are flat SVG wireframes with grey bars.** This is the single biggest "template" tell.
- **Repeated visuals:**
  - all 4 services share the same isometric graphic
  - all 6 product features share the same sparkle icon
  - all 4 About principles share the same blue square icon
- **Services show only a title and tags.** There's no line saying what you actually do, deliver or achieve.
- **Approach questions have arrow buttons that do nothing.** They look clickable but aren't.
- **Work has no "Read case study" link, no result metrics and no client quote.**
- **Contact is one `mailto:` link.** There's no form, no booking link, no location and no team.
- **The hero headline is too small.** It maxes out at about 30 px, so it reads as a paragraph rather than a statement, and there's only one CTA.
- **Product stats** (60k users, 4.9/5, 500+ stores): **if these aren't real, remove them.** They're a trust and legal risk.

### 1.4 Interaction and motion

- **One action has three labels:**
  - "Get Started" in the navbar
  - "Discuss a project" in the hero
  - "Discuss a Project" on the floating button

  The floating pill also **covers content** on mobile, over product images and the work frame.
- **The README says the navbar hides on scroll down, but that isn't implemented.**
- **Layout properties are animated:**
  - `height:auto` (nav dropdown, Services cards)
  - `height` and `top` on every scroll frame (Services progress line `fillH` and `markerTop`)

  This forces layout recalculation every frame and causes jank.
- **Pinned sections use native scrolling.** Products is about 4000 px and Work about 3600 px. On a mouse wheel they feel steppy, and nothing smooths them.
- **6 `backdrop-blur` layers**, including a 44 px blur on the nav and 4 stacked blurred sticky cards. Expect dropped frames on mid-range Android and iOS Safari.
- **Infinite loops run off-screen.** The hero's SMIL/CSS loops and the Services iso float keep running after you scroll past them.
- **Work transitions:**
  - 400vh of scroll for 3 projects is long
  - `AnimatePresence mode="wait"` leaves a blank gap between text swaps
  - mobile pins a desktop layout
- **Contact rises as an empty dark sheet,** and its text fades in only after the sheet covers the screen.
- **`vh` and `svh` are mixed in the scroll handoffs.** Work uses `400vh` and `h-svh`, while Contact uses `-mt-[100vh]`. On iOS the address bar makes these differ by about 80 px, which causes a gap or jump.
- **No page transitions.** Going from home to a product page is a hard cut.
- **Most hover states change colour only.** There are no press (active) states.

### 1.5 Engineering hygiene

- The services list is duplicated 3 times (Navbar, Services, Footer), and so are the icons.
- `Products` and `Approach` are linked by a fragile `100svh` / `-mt-[100svh]` contract, and `Work` and `Contact` by a `-mt-[100vh]` one.
- Landmarks are wrong: there's no `<header>`, and `<footer>` sits inside `<main>`.
- No `next/image`. That's fine for today's SVGs, but it's required once real screenshots arrive.
- ESLint isn't installed, so `npm run lint` won't run.
- Stray `rosmox-preview.html` in the root. The README is stale: it mentions React Three Fiber and hide-on-scroll, neither of which exists.
- No security headers, analytics or error monitoring. The footer year is hard-coded as `{2026}`.

---

## 2. Design direction for v2

**Theme: engineering precision.** The blueprint hero *is* the brand idea: hairlines, grids, mono annotations, measured and purposeful motion. Carry that language through every section instead of mixing glassmorphism, isometrics and generic SaaS cards.

- **Keep:**
  - the palette
  - the type trio
  - the dark/light rhythm
  - the blueprint hero
  - the sticky product deck
  - the pinned work section on desktop
  - the word-by-word About reveal
- **Replace:**
  - scramble-at-rest
  - repeated isometric graphics
  - glass on light backgrounds
  - the floating logo box
  - placeholder images
  - fake arrow buttons

### 2.1 Design tokens: one source of truth (`app/globals.css` `@theme`)

| Group | v2 spec |
|---|---|
| **Color: dark** | `ink`, `surface`, `elevated`, `line` (white/8), `line-strong` (white/14), `fg` / `fg-muted` / `fg-subtle`. Every text token is checked for AA contrast. |
| **Color: light** | `paper` and one `paper-2` only, plus `ink`-based fg tokens and `line-light`. |
| **Brand** | `primary`, `primary-hover`, `primary-pressed`, `primary-subtle` (a tinted background). One accent per surface. |
| **Section theme** | `data-theme="dark\|light"` on each `<section>`. The navbar reads the theme under it and restyles itself. |
| **Type scale** | Fluid `clamp()` sizes for `display-xl`, `display`, `h1`–`h4`, `body-lg`, `body`, `body-sm`, and `label` (mono, **12 px minimum**, 0.14em tracking). **No hand-picked `text-[..px]` values.** |
| **Layout** | One `Container` (max 1440, gutters 24/48/64). Section padding is a token: `clamp(96px, 12vw, 160px)`. |
| **Radius** | **3 values only:** `sm` 6 px (buttons, chips, inputs), `md` 12 px (cards), `lg` 20 px (panels, sheets). |
| **Elevation** | 3 shadow levels, with a separate set tuned for light surfaces. |
| **Motion** | `lib/motion.ts`: durations `fast 150` / `base 250` / `slow 450` / `reveal 700` ms. Easings `out [0.22,1,0.36,1]` and `inOut [0.65,0,0.35,1]`. A UI spring of `{stiffness: 400, damping: 32}`. |

### 2.2 Component kit (`components/ui/`)

- `Button`: primary, secondary, ghost and link variants in sm/md/lg. It has an arrow that slides 3 px on hover, `scale(0.98)` on press, a focus ring and a loading state.
- Layout and text: `Container`, `Section` (theme, eyebrow, title, lead), `Eyebrow`, `Heading` (with a line-mask reveal built in).
- `Logo`: a real SVG wordmark plus a monogram mark. **One version everywhere.**
- `Icon` set: one stroke weight (1.5) on a 24 px grid. Either a curated subset of Lucide, or a custom set drawn in the blueprint style.
- `Reveal`: one in-view primitive, so `initial` / `whileInView` / `viewport` aren't copy-pasted 40 times.
- Interactive: `Accordion`, `Marquee`, `Tabs`.
- Forms and feedback: `Input`, `Textarea`, `ChipSelect`, `Toast`.

---

## 3. Section-by-section redesign

### Navbar

- **One cohesive bar** with three regions, Logo | links | CTA, all 40 px tall with matching radius and blur. On mobile that becomes one strip with the logo on the left and the burger on the right.
- **Theme-aware.** A dark pill over dark sections and a light pill with ink text over light sections, crossfaded over 250 ms.
- **Hide on scroll down, reveal on scroll up,** driven by a spring. The bar compacts after 80 px of scroll.
- **Scrollspy** with a sliding active-pill indicator (Framer `layoutId`).
- **Services mega-menu:**
  - opens on click or hover, with hover-intent delays (80 ms to open, 200 ms to close)
  - full keyboard support and correct `aria-expanded` / `aria-controls`
  - links aren't tabbable while closed
  - each item has a one-line description and links to `/services/[slug]`
- **Fewer links:** Services ▾, Products, Work, About, Blog (only once it exists), plus the CTA **"Book a call"**. Approach and Contact are homepage sections, not pages, so they come out of the nav.
- **Mobile menu:**
  - the logo stays identical when the menu opens
  - large staggered links
  - email address and social links at the bottom
  - closes on route change

### Hero

- **A real `<h1>` at display size,** `clamp(44px, 6vw, 88px)`, with "AI that ships, not slideware." as the headline. The partner sentence becomes a separate lead paragraph.
- **Two CTAs:** **Book a call** (primary) and **See our work →** (secondary).
- **A proof row under the CTAs:** "Trusted by teams at [4–5 logos]" or 3 micro-stats.
- **Visible on first paint.** Text renders server-side and visible, and enters with CSS keyframes that start before hydration. The blueprint draw-in shrinks to about 1.4 s, with pulses starting right after.
- **Layout moves from absolute positioning to CSS grid** (5/7 columns), stacking below 1100 px. That fixes C2.
- **Blueprint loops pause** when the hero is off-screen or the tab is hidden (`IntersectionObserver` + `svg.pauseAnimations()`).
- **Blueprint labels get bigger:** from 11 px at 28 % opacity to 12 px at 45 %.

### Social-proof strip (new, right after the hero)

- **Client logos in a slow marquee.** Grayscale, turning to colour on hover. It pauses on hover and is static under reduced motion.

### About

- **Keep the word-by-word reveal.** Its highlight chips move to the `sm` radius.
- **Principles become a 4-column grid,** each with a number, title and a one-line explanation. No more 4 identical blue squares.
- **New stats row with count-up numbers:** years in business, products shipped, models in production, countries served. **Real numbers only.**
- **Backgrounds:** the grey band is replaced by one paper tone with hairline dividers.

### Services

- **Text is always readable.** The scramble plays once, on first reveal, for 300 ms, on desktop only, and never sits at rest.
- **Fixed card height, no height animation.** Activation becomes border glow, node colour and the graphic drawing in, all using transform and opacity only.
- **Each card adds** a one-sentence value line, 3–4 deliverables, the tech used, and **"Explore service →"** linking to `/services/[slug]`.
- **One unique blueprint-style graphic per service:**
  - AI: a model/graph pipeline
  - Web: a browser frame with a layout grid
  - Mobile: stacked device frames
  - UX: a wireframe turning into UI
- **The progress line uses `scaleY` and the marker uses `translateY`** instead of `height` and `top`.
- **Aligned to the 1440 container.** On mobile the timeline sits on the left with every card expanded.

### Products

- **Solid dark surface with a top highlight border instead of glass.** Tone stays consistent and the blur cost disappears.
- **One clear action per card:** "View product →". "Visit site ↗" appears only when there's a real external URL. The duplicate "Details" button goes.
- **Status badge** (Live, Beta) and a platform badge (Web, Android, iOS).
- **Real screenshots** in device frames via `next/image` (AVIF).
- **Products and Approach move into one wrapper component,** so the `100svh` handoff lives in one file.

### Approach

- **Full container width with balanced columns.** Sentence-case heading and an AA-contrast accent.
- **The fake arrow rows become a real interaction,** one of:
  - **an accordion** where each question opens to show *how* you answer it, with deliverable and duration
  - **a 5-step process:** Discover (1–2 wks) → Prototype (2–4 wks) → Evaluate → Ship → Operate
- **The grey placeholder graphic is redrawn in the blueprint style** to match the hero.

### Work (case studies)

- **Each project gets:**
  - client logo
  - challenge → solution → **result metrics** (for example "−70 % reporting time")
  - a client quote
  - **"Read case study →"** linking to `/work/[slug]`
- **The scroll track shrinks to about 100vh per project plus a hold.** Text crossfades with overlap (`popLayout`) so there's no blank gap.
- **Clickable progress ticks** (01 · 02 · 03) let people jump between projects.
- **Mobile drops the pinning** for a swipe carousel or a stacked list.
- **Real screenshots** replace the wireframes.

### Testimonials (new)

- **1–3 large quotes,** each with a photo, name, role and company logo, and auto-advance that pauses on hover.

### Engagement models and FAQ (new)

- **Engagement models:** Fixed-scope project, Dedicated team, or Retainer, each with what's included and a typical duration.
- **FAQ accordion** covering:
  - IP ownership
  - NDA
  - timezone and overlap
  - team size
  - how pricing works
  - what happens after launch

### Contact

- **A real form:**
  - fields for name, email, company, budget range (chips), interest (chips) and message
  - `zod` validation
  - a Next.js server action sends the email via Resend and a Slack webhook
  - spam protection from a honeypot plus Cloudflare Turnstile
  - an animated success state
- **Side panel:**
  - email address
  - **"Book a 30-min call"** (Cal.com embed)
  - location and timezone
  - "We reply within 1 business day"
- **Content arrives with the sheet** instead of after it.

### Footer

- **Real links only,** with real legal pages and real social URLs.
- **Also adds:**
  - address
  - newsletter signup
  - "Back to top"
  - a dynamic year
  - an availability badge, e.g. **"Booking projects for Q1 2027"**
- **Signature moment:** the giant ROSMOX wordmark rises letter by letter with a stagger as the footer enters, behind a gradient mask.

### Floating CTA

- **Same label as the primary CTA.**
- **Hidden while Contact is in view,** not just the footer.
- **On mobile it's hidden during pinned sections,** so it never covers content.

### Product detail pages

- **Content:**
  - placeholder copy removed
  - one unique icon per feature
  - real gallery with a lightbox
  - store badges for DayKit (Play Store)
- **Extra sections:** per-product FAQ, related products, and a fixed breadcrumb.

### 404 / error pages

- **Branded 404:** "Route not found" drawn as a broken pipe in the blueprint style, with links back to useful pages.
- **Also add `error.tsx` and `loading.tsx`.**

---

## 4. Motion system: making every animation smooth

1. **Animate only `transform` and `opacity`,** plus `clip-path` sparingly. Never `height`, `width`, `top` or `left`. Expand/collapse uses `grid-template-rows: 0fr → 1fr`.
2. **Three motion types, no others:**
   - **Reveal:** y 24→0 plus opacity, 700 ms, `out` easing, 60 ms stagger.
   - **UI:** spring for menus, toggles, hover and press.
   - **Scrub:** scroll-linked with no easing, smoothed only by Lenis.
3. **Lenis smooth scroll** (lerp about 0.1) feeding Framer's `useScroll`. It's off on touch devices (native scroll) and under reduced motion. Remove `scroll-behavior: smooth` from `html` when Lenis is on.
4. **Line-mask heading reveals:** split headings into lines and slide each one up from 100 % inside an `overflow:hidden` mask. This is the most noticeable "senior" upgrade.
5. **`<MotionConfig reducedMotion="user">` at the root,** and every effect has a designed static fallback.
6. **Pause any loop that isn't visible,** using `IntersectionObserver` plus `visibilitychange`.
7. **`backdrop-filter` on the navbar only.** Fake glass everywhere else with layered gradients.
8. **Micro-interactions:**
   - buttons: arrow slides, background shifts over 150 ms, press `scale(0.98)`
   - cards: lift −2 px and the border brightens
   - links: underline draws from the left
   - focus rings animate in
9. **Page transitions** via the View Transitions API (`experimental.viewTransition` in Next 15) or a Framer `template.tsx`: a 300 ms fade with an 8 px slide. Shared-element morph from a product card to its product page hero.
10. **Count-up numbers** for stats, eased and run once.
11. **Performance budget:**
    - 60 fps at 4× CPU throttle in Chrome DevTools
    - no long tasks over 50 ms during scroll
    - CLS under 0.05
    - INP under 200 ms

---

## 5. What big company sites have that this one is missing

### Pages

| Page | Status |
|---|---|
| `/services/[slug]` ×4: problem, approach, deliverables, tech, related work, FAQ, CTA | Missing |
| `/work` index and `/work/[slug]` case studies | Missing |
| `/about`: story, team with faces, values, locations | Missing |
| `/careers` with open roles (even "always hiring" plus a form) | Missing |
| `/blog` (Insights) on MDX: list, article, tags, reading time, OG image per post | Linked but missing |
| `/contact` as a full page (the homepage section stays) | Missing |
| `/privacy`, `/terms`, `/cookies` for the **company** (DayKit's policy exists, the company's doesn't) | Missing |
| Branded `not-found`, `error` and `loading` pages | Missing |

### Trust and social proof

- Client logo wall and testimonials with real names and faces
- Case studies with measurable results
- Team photos and founder note
- Partner badges if they apply (AWS, Google Cloud, OpenAI or Anthropic partner programs)
- Review-platform badge (Clutch, GoodFirms)
- Certifications if any (ISO 27001, SOC 2)

### Conversion

- Contact form and booking calendar
- A primary CTA in every section's natural exit point
- Lead magnet, e.g. an "AI readiness checklist" PDF
- Newsletter
- Availability badge

### SEO

- `metadataBase` and title templates (`%s — ROSMOX`)
- Per-page descriptions and canonicals
- **Dynamic OG images** (`next/og`) and Twitter cards
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`
- `app/icon.svg` and `apple-icon.png`
- **JSON-LD:** Organization, WebSite, Service, Product, Article, BreadcrumbList
- Exactly one `<h1>` per page

### Performance

- Lighthouse ≥ 95 in all 4 categories
- LCP under 2.0 s on 4G
- `next/image` with AVIF
- Preload the hero font
- Server components wherever there's no interactivity
- Keep the JS bundle lean (Framer Motion's `LazyMotion` + `m`)

### Accessibility (WCAG 2.2 AA)

- Skip link and `focus-visible` rings
- Keyboard-operable menus
- Correct landmarks (`header`, `nav`, `main`, `footer`)
- Contrast at least 4.5:1
- Alt text everywhere
- Reduced-motion paths
- Run `axe` in CI

### Analytics and operations

- Vercel Analytics + Speed Insights, or Plausible or PostHog
- Conversion events: CTA clicks, form start and submit, booking
- Sentry for errors
- Uptime monitoring

### Security and legal

- `headers()` in `next.config.ts`: CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors`
- Cookie consent only if you add non-essential cookies
- DPDP (India) / GDPR wording in the privacy policy

### Content workflow

- MDX in the repo for blog posts and case studies (simplest)
- Or a headless CMS (Sanity or Payload) if non-developers will edit content

### Quality

- ESLint and Prettier
- Playwright smoke tests plus visual regression screenshots
- Lighthouse CI and a link checker in GitHub Actions
- Preview deploys per pull request

---

## 6. Roadmap

| Phase | Scope | Est. |
|---|---|---|
| **0: Foundations** | Tokens, `lib/motion.ts`, `components/ui` kit, SVG logo, shared data (`lib/services.ts`), route-safe links (`/#section`), landmarks, focus styles, skip link, ESLint/Prettier, delete stray files, update README | 2–3 days |
| **1: Fix what's broken** | C1–C12: hero first paint and grid, Services scramble and height, theme-aware nav, remove placeholder copy and fake stats, kill dead links, SEO files, branded 404 | 2 days |
| **2: Section redesigns** | Navbar → Hero → About → Services → Products → Approach → Work → Contact (with form) → Footer → floating CTA | 7–9 days |
| **3: New sections and pages** | Logo strip, testimonials, engagement models, FAQ. Pages: `/services/[slug]`, `/work/[slug]`, `/about`, `/careers`, `/blog` (MDX), legal pages | 7–10 days |
| **4: Motion polish** | Lenis, line-mask headings, page transitions, micro-interactions, offscreen pausing, blur reduction, performance pass against the budget | 3–4 days |
| **5: QA and launch** | Device matrix (iOS Safari, Android Chrome, Firefox, 320→2560 px), axe and Lighthouse CI, analytics events, security headers, redirects, deploy | 2–3 days |

Content production (screenshots, case-study write-ups, logos, team photos, testimonials) runs **in parallel from day 1**. It's the longest pole, and it matters most for looking senior.

---

## 7. "Senior polish" definition of done

- [ ] Every interactive element has hover, active, focus-visible and disabled states
- [ ] No hand-picked values in class names (`text-[..]`, `rounded-[..]`, hex colours). Tokens only.
- [ ] Every section's left edge lines up with the same container
- [ ] Text contrast ≥ 4.5:1 (≥ 3:1 for large text), including mono labels
- [ ] No animated layout properties. CLS < 0.05. Nothing pops in after first paint.
- [ ] Verified at 320 / 375 / 768 / 1024 / 1280 / 1440 / 1920 / 2560 px
- [ ] Every animation has a reduced-motion fallback, and nothing loops off-screen
- [ ] Every link resolves (link checker in CI). No `href="#"`.
- [ ] Every image is AVIF/WebP with explicit size and real alt text
- [ ] Copy is proofread, consistently sentence case, and uses one verb per CTA
- [ ] One logo, one easing family, three radii, one container

---

## 8. Decisions needed from you

1. **Real content:**
   - Can we use client names and logos?
   - Are there case-study metrics, product screenshots, team photos and testimonials?

   *This is the biggest factor in whether the site looks senior.*
2. **Product stats** (60k users, 4.9/5 rating and so on): are they real? If not, they come out.
3. **Primary CTA:** "Book a call" (Cal.com) or "Discuss a project" (form)? Pick one verb sitewide.
4. **Blog:** launch with 3 posts, or hide the link until it's ready?
5. **Content source:** MDX in the repo, or a headless CMS?
6. **Infrastructure:** hosting (Vercel?), email provider (Resend?), and analytics tool.
7. **Company details for the footer and legal pages:** legal entity name, address, contact email and phone.
