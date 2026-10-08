"use client";

import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";

import Button from "@/components/ui/Button";
import GooglePlayDownload from "@/components/ui/GooglePlayDownload";
import { IconMobile } from "@/components/icons";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import { cssDelay, DURATION, EASE_OUT, STAGGER, VIEWPORT } from "@/lib/motion";
import type { Product } from "@/lib/products";
import { PRIMARY_CTA } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   ProductDetail — the animated body of a /products/[slug] page.

   Kept as a "use client" component (like the rest of the site's
   sections) so the server page.tsx can stay a plain server
   component that handles params + metadata. Everything here is
   driven by the `product` prop from @/lib/products.

   Styling mirrors the homepage: bg-ink/bg-paper alternating
   sections, mono eyebrows, font-display headings, the per-product
   `accent` for badges/washes, and a framed showcase image.
   ────────────────────────────────────────────────────────── */

const EASE = EASE_OUT;

const CONTAINER = "container-page";

export default function ProductDetail({ product }: { product: Product }) {
  const {
    n,
    name,
    tagline,
    tag,
    image,
    imageAlt,
    accent,
    overview,
    features,
    highlights,
    gallery,
    privacyPolicyPath,
    platform,
    playStoreUrl,
  } = product;

  return (
    <>
      {/* ── 1. Hero (dark) ── */}
      <section data-theme="dark" className="relative overflow-clip bg-ink pb-20 pt-32 md:pb-28 md:pt-40">
        {/* accent glow, tinted per product */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(760px 520px at 20% 0%, color-mix(in srgb, ${accent} 13%, transparent), transparent 70%)`,
          }}
        />

        <div className={`relative ${CONTAINER}`}>
          {/* Above-the-fold copy uses the CSS first-paint reveals
              (globals.css) so it never waits for hydration. */}
          {/* breadcrumb / back */}
          <nav
            aria-label="Breadcrumb"
            className="reveal-rise mb-8 flex items-center gap-2 font-mono text-label text-white/50"
          >
            <Link
              href="/#products"
              className="transition-colors hover:text-white"
            >
              PRODUCTS
            </Link>
            <span aria-hidden>/</span>
            <span style={{ color: accent }}>{tag}</span>
          </nav>

          <div className="flex items-start gap-4 md:gap-6">
            {/* numbered accent badge */}
            <span
              className="reveal-fade mt-2 hidden h-11 w-11 shrink-0 items-center justify-center rounded-sm border font-mono text-sm sm:flex"
              style={{ borderColor: `color-mix(in srgb, ${accent} 33%, transparent)`, color: accent, ...cssDelay(60) }}
            >
              {n}
            </span>

            <div className="min-w-0">
              <h1 className="max-w-3xl font-display text-display font-semibold text-white">
                <span className="line-mask">
                  <span className="line" style={cssDelay(80)}>
                    {name}
                  </span>
                </span>
              </h1>
              {platform && (
                <p className="reveal-rise mt-4 inline-flex items-center gap-2 font-mono text-label text-white/60" style={cssDelay(140)}>
                  <IconMobile className="h-4 w-4" />
                  {platform.toUpperCase()} APP
                </p>
              )}
              <p
                className="reveal-rise mt-5 max-w-2xl text-lead text-white/60"
                style={cssDelay(200)}
              >
                {tagline}
              </p>

              {/* CTAs */}
              <div
                className="reveal-rise mt-8 flex flex-wrap items-start gap-3"
                style={cssDelay(300)}
              >
                {platform === "Android" ? (
                  <GooglePlayDownload name={name} href={playStoreUrl} />
                ) : (
                  <Button href={PRIMARY_CTA.href} arrow="right">
                    {PRIMARY_CTA.label}
                  </Button>
                )}
                <Button href="/#products" variant="secondary">
                  All products
                </Button>
                {privacyPolicyPath && (
                  <Link
                    href={privacyPolicyPath}
                    className="inline-flex h-11 items-center px-2 text-sm font-medium text-white/60 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
                  >
                    Privacy policy
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Showcase image (dark) ── */}
      <section data-theme="dark" className="bg-ink pb-20 md:pb-28">
        <div className={CONTAINER}>
          {/* CSS reveal, like the hero copy: this shot is often the
              LCP element, so it must not wait for JS to appear. */}
          <div
            className="reveal-lift relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]"
            style={cssDelay(380)}
          >
            <Image
              src={image}
              alt={imageAlt ?? `${name} product screenshot`}
              fill
              sizes="(min-width: 1440px) 1312px, 90vw"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background: `linear-gradient(to top, color-mix(in srgb, ${accent} 13%, transparent), transparent)`,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── 3. Overview (light) ── */}
      <section data-theme="light" className="section-y bg-paper text-ink">
        <div className={CONTAINER}>
          <div className="grid gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
            <div>
              <Eyebrow tone="light">Overview</Eyebrow>
              <RevealText
                text={`What ${name} is.`}
                className="mt-5 font-display text-h3 font-semibold"
              />
            </div>

            <div className="space-y-5">
              {overview.map((para, i) => (
                <m.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.08 + i * 0.06, ease: EASE }}
                  className="text-lg leading-relaxed text-ink/70"
                >
                  {para}
                </m.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Features grid (dark) ── */}
      <section data-theme="dark" className="section-y bg-ink">
        <div className={CONTAINER}>
          <Eyebrow>Features</Eyebrow>
          <RevealText
            text="Everything you get."
            className="mt-5 max-w-2xl font-display text-h2 font-semibold text-white"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <m.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: EASE }}
                className="group relative overflow-hidden rounded-md border border-white/10 bg-elevated/50 p-6 transition-colors duration-300 hover:border-white/20"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-sm border"
                  style={{ borderColor: `color-mix(in srgb, ${accent} 27%, transparent)`, color: accent }}
                >
                  <IconSpark />
                </span>
                <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {f.desc}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Highlights / stats band — only with real numbers ── */}
      {highlights.length > 0 && (
      <section data-theme="dark" className="bg-surface py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="grid gap-8 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <m.div
                key={h.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                className="text-center sm:text-left"
              >
                <div
                  className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
                  style={{ color: accent }}
                >
                  {h.value}
                </div>
                <div className="mt-2 font-mono text-label uppercase text-white/50">
                  {h.label}
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Full mobile screenshots, with their original proportions. */}
      {gallery.length > 0 && (
        <section data-theme="dark" className="bg-ink py-20 lg:py-28">
          <div className={CONTAINER}>
            <Eyebrow>Inside the app</Eyebrow>
            <RevealText
              text={`A closer look at ${name}.`}
              className="mt-5 max-w-3xl font-display text-h2 font-semibold text-white"
            />
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {gallery.map((shot, i) => (
                <m.figure
                  key={shot.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: DURATION.reveal, delay: i * STAGGER, ease: EASE }}
                  className="mx-auto w-full max-w-sm"
                >
                  <div className="overflow-hidden rounded-lg border border-white/10 bg-surface p-2">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 1440px) 300px, (min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
                      className="h-auto w-full rounded-md"
                    />
                  </div>
                  <figcaption className="mt-5">
                    <h3 className="font-display text-h3 font-medium text-white">{shot.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{shot.description}</p>
                  </figcaption>
                </m.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. CTA band (dark) ── */}
      <section data-theme="dark" className="section-y relative overflow-clip bg-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(700px 400px at 50% 100%, color-mix(in srgb, ${accent} 12%, transparent), transparent 70%)`,
          }}
        />
        <div className={`relative ${CONTAINER} text-center`}>
          <RevealText
            text={`Ready to try ${name}?`}
            className="mx-auto max-w-2xl font-display text-h2 font-semibold text-white"
          />
          <m.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="mt-8 flex flex-wrap items-start justify-center gap-3"
          >
            {platform === "Android" ? (
              <GooglePlayDownload name={name} href={playStoreUrl} />
            ) : (
              <Button href={PRIMARY_CTA.href} arrow="right">
                {PRIMARY_CTA.label}
              </Button>
            )}
            <Button href="/#products" variant="secondary">
              Explore other products
            </Button>
          </m.div>
        </div>
      </section>
    </>
  );
}

/* ── Icon — minimal spark mark, matches the site's inline-svg style ── */
function IconSpark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M8 1.5 9.6 6.4 14.5 8 9.6 9.6 8 14.5 6.4 9.6 1.5 8 6.4 6.4 8 1.5Z" />
    </svg>
  );
}
