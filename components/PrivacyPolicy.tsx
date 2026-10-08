"use client";

import Link from "next/link";
import { m } from "framer-motion";

import Button from "@/components/ui/Button";
import type { PrivacyPolicyContent } from "@/lib/policy";
import { cssDelay, EASE_OUT } from "@/lib/motion";

/* ──────────────────────────────────────────────────────────
   PrivacyPolicy — a reusable, data-driven policy page body.

   Renders any policy from a PrivacyPolicyContent object: the
   company policy at /privacy (no productSlug) and per-product
   app policies at /products/[slug]/privacy-policy.

   Kept as a "use client" component like the rest of the site's
   sections; the server route handles metadata. Styling mirrors
   ProductDetail: bg-ink base, mono eyebrows, font-display
   headings, and the signature glass frame for the document.
   ────────────────────────────────────────────────────────── */

const EASE = EASE_OUT;

const CONTAINER = "container-page";

export default function PrivacyPolicy({
  content,
  productSlug,
  accent = "#4da2ff",
  children,
}: {
  content: PrivacyPolicyContent;
  productSlug?: string;
  accent?: string;
  /** extra content rendered under the document (e.g. a request form) */
  children?: React.ReactNode;
}) {
  const { product, effectiveDate, intro, sections, heading, label } = content;

  return (
    <section data-theme="dark" className="relative overflow-clip bg-ink pb-24 pt-32 md:pb-32 md:pt-40">
      {/* accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(760px 520px at 20% 0%, ${accent}1c, transparent 70%)`,
        }}
      />

      <div className={`relative ${CONTAINER}`}>
        {/* breadcrumb — above-the-fold copy uses CSS first-paint reveals */}
        <nav
          aria-label="Breadcrumb"
          className="reveal-rise mb-8 flex items-center gap-2 font-mono text-label text-white/50"
        >
          {productSlug ? (
            <>
              <Link href="/#products" className="transition-colors hover:text-white">
                PRODUCTS
              </Link>
              <span aria-hidden>/</span>
              <Link
                href={`/products/${productSlug}`}
                className="uppercase transition-colors hover:text-white"
              >
                {product}
              </Link>
            </>
          ) : (
            <Link href="/" className="uppercase transition-colors hover:text-white">
              {product}
            </Link>
          )}
          <span aria-hidden>/</span>
          <span style={{ color: accent }}>{label ?? "PRIVACY"}</span>
        </nav>

        {/* header */}
        <h1 className="max-w-3xl font-display text-display font-semibold text-white">
          <span className="line-mask">
            <span className="line" style={cssDelay(80)}>
              {heading ?? `${product} Privacy Policy`}
            </span>
          </span>
        </h1>
        <p
          className="reveal-rise mt-5 font-mono text-label"
          style={{ color: accent, ...cssDelay(200) }}
        >
          EFFECTIVE {effectiveDate.toUpperCase()}
        </p>
        <p
          className="reveal-rise mt-3 max-w-2xl text-lead text-white/60"
          style={cssDelay(260)}
        >
          {intro}
        </p>

        {/* document — the opening sections sit above the fold (and
            hold the LCP text on phones), so they enter with CSS and
            never wait for JS; later sections reveal as you reach them */}
        <div
          className="reveal-lift mt-12 rounded-lg border border-white/10 bg-white/[0.04] p-7 md:mt-16 md:p-12"
          style={cssDelay(320)}
        >
          <div className="space-y-12">
            {sections.map((s, i) => (
              <m.div
                key={s.title}
                initial={i < 2 ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: EASE }}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-mono text-label"
                    style={{ color: accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {s.title}
                  </h2>
                </div>
                <div className="mt-4 space-y-3 border-l border-white/10 pl-5 md:pl-6">
                  {s.body.map((para, j) => (
                    <p
                      key={j}
                      className="text-[0.9375rem] leading-relaxed text-white/65 md:text-base"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </m.div>
            ))}
          </div>
        </div>

        {children && <div className="mt-8">{children}</div>}

        {/* back link */}
        <m.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {productSlug ? (
            <>
              <Button href={`/products/${productSlug}`}>Back to {product}</Button>
              <Button href="/#products" variant="secondary">
                All products
              </Button>
            </>
          ) : (
            <>
              <Button href="/">Back home</Button>
              <Button href="/contact" variant="secondary">
                Contact us
              </Button>
            </>
          )}
        </m.div>
      </div>
    </section>
  );
}
