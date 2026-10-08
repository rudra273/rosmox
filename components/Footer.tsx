"use client";

import Link from "next/link";
import { m } from "framer-motion";

import { IconArrowRight } from "@/components/icons";
import Logo from "@/components/ui/Logo";
import Reveal from "@/components/ui/Reveal";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";
import { PRODUCTS } from "@/lib/products";
import { SERVICES } from "@/lib/services";
import { NAV_LINKS, PRIMARY_CTA, SITE, SOCIAL_LINKS, type NavLink } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   Footer
   1. Upper · brand blurb + nav-link columns (real links only —
             Social appears once SOCIAL_LINKS has entries)
   2. Lower · legal bar + full-width ROSMOX wordmark whose
             letters rise in as the footer arrives.
   ────────────────────────────────────────────────────────── */

const COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [...NAV_LINKS, { label: "Contact", href: "/contact" }],
  },
  {
    title: "Services",
    links: SERVICES.map((s) => ({ label: s.title, href: s.href })),
  },
  {
    title: "Products",
    links: PRODUCTS.map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
  },
  ...(SOCIAL_LINKS.length ? [{ title: "Social", links: SOCIAL_LINKS }] : []),
];

const WORDMARK = "ROSMOX".split("");

export default function Footer() {
  return (
    <footer
      id="footer"
      data-theme="dark"
      className="relative w-full overflow-hidden border-t border-white/10 bg-ink"
    >
      {/* blue ambience */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 50% 100%, rgba(77,162,255,0.10), transparent 70%)",
        }}
      />

      {/* ── Upper: brand + link columns ── */}
      <div className="container-page relative py-16 md:py-24">
        <div
          className={`grid grid-cols-2 gap-x-8 gap-y-12 ${
            COLUMNS.length === 4
              ? "md:grid-cols-[1.4fr_repeat(4,1fr)]"
              : "md:grid-cols-[1.6fr_repeat(3,1fr)]"
          }`}
        >
          {/* Brand blurb */}
          <Reveal className="col-span-2 md:col-span-1">
            <Logo className="text-2xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              We design and build AI-native products, platforms and the
              experiences around them.
            </p>
            <Link
              href={PRIMARY_CTA.href}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-200 hover:text-glow"
            >
              {PRIMARY_CTA.label}
              <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          {/* Link columns */}
          {COLUMNS.map((col, i) => (
            <Reveal key={col.title} delay={0.05 + i * STAGGER}>
              <h2 className="font-mono text-label uppercase text-white/50">
                {col.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="link-underline text-sm text-white/65 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Lower: legal bar + wordmark ── */}
      <div className="relative w-full border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p
            suppressHydrationWarning
            className="font-mono text-label uppercase text-white/55"
          >
            © {new Date().getFullYear()} {SITE.name} — All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="link-underline text-sm text-white/55 hover:text-white">
              Privacy
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="link-underline text-sm text-white/55 hover:text-white"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        {/* full-width ROSMOX — letters spread edge to edge */}
        <div
          aria-hidden
          className="flex w-full items-end justify-between overflow-hidden px-4 pb-2 md:px-8 md:pb-4"
        >
          {WORDMARK.map((letter, i) => (
            <m.span
              key={i}
              initial={{ y: "60%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{
                duration: DURATION.reveal + 0.3,
                ease: EASE_OUT,
                delay: i * STAGGER,
              }}
              className="select-none bg-gradient-to-b from-white/[0.10] to-white/[0.02] bg-clip-text font-display font-bold leading-[0.8] tracking-tight text-transparent"
              style={{ fontSize: "clamp(3rem, 17vw, 16rem)" }}
            >
              {letter}
            </m.span>
          ))}
        </div>
      </div>
    </footer>
  );
}
