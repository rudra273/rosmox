"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { IconArrowRight, IconMobile } from "@/components/icons";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import { PRODUCTS, type Product } from "@/lib/products";
import { usePointerVars } from "@/lib/use-pointer-vars";

/* ──────────────────────────────────────────────────────────
   Products — a calm card grid on the light surface.

   2 × 2 on tablet and up, one column on phones. Every image sits
   in a 16:9 frame (the shape of the product shots), so nothing is
   cropped. No scroll effects — cards rise in once, and on hover
   they lift and a soft light follows the pointer.
   ────────────────────────────────────────────────────────── */

export default function Products() {
  return (
    <section id="products" data-theme="light" className="relative bg-paper text-ink">
      <div className="container-page section-y">
        <Reveal>
          <Eyebrow tone="light">Products</Eyebrow>
        </Reveal>
        <RevealText
          text="Making AI products for everyday work."
          className="mt-5 max-w-3xl font-display text-h2 font-semibold"
        />
        <Reveal as="p" delay={0.1} className="mt-5 max-w-xl text-lead text-ink/60">
          Focused solutions for real businesses, designed and built by ROSMOX.
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:gap-6">
          {PRODUCTS.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 2) * 0.08}>
              <ProductTile product={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProductTile({ product }: { product: Product }) {
  const { n, name, tagline, tag, image, slug, platform } = product;
  const cardRef = useRef<HTMLAnchorElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  usePointerVars(cardRef, spotRef);

  return (
    <Link
      ref={cardRef}
      href={`/products/${slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-ink/10 bg-white p-2.5 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_28px_60px_-32px_rgba(4,6,13,0.4)] md:p-3"
    >
      <div ref={spotRef} aria-hidden className="tile-spot pointer-events-none absolute inset-0" />

      {/* shot — 16:9, the products' native shape */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-ink">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1440px) 620px, (min-width: 768px) 45vw, 90vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="relative flex flex-1 flex-col px-2.5 pb-3 pt-5 md:px-3 md:pt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-baseline gap-3">
            <span className="font-mono text-xs text-ink/55">{n}</span>
            <h3 className="truncate font-display text-xl font-semibold tracking-tight md:text-2xl">
              {name}
            </h3>
          </div>
          <span className="shrink-0 rounded-sm border border-ink/10 px-2 py-1 font-mono text-label text-ink/60">
            {tag}
          </span>
        </div>
        {platform && (
          <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-label text-ink/55">
            <IconMobile className="h-4 w-4" />
            {platform.toUpperCase()} APP
          </p>
        )}
        <p className="mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-ink/65">{tagline}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-ink">
          View product
          <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
