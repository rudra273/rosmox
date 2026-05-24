"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "motion/react";
import SectionHead from "./SectionHead";
import ArrowIcon from "../ui/ArrowIcon";
import { products, type ProductData } from "./productsData";

const featured = products.filter((p) => p.featured);

/** Single product card. Adds `.live` (mock animations) when scrolled into view. */
function ProductCard({ data }: { data: ProductData }) {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} className={`product${live ? " live" : ""}`}>
      <div className="product-head">
        <div className="product-meta">
          <div className={`product-mark ${data.markColor}`}>
            {data.logo ? (
              <Image src={data.logo.src} alt={data.logo.alt} width={24} height={24} />
            ) : (
              data.mark
            )}
          </div>
          <div>
            <div className="product-name">{data.name}</div>
            <div className="product-version">{data.version}</div>
          </div>
        </div>
        <span className="product-tag">{data.tag}</span>
      </div>
      <h3>{data.headline}</h3>
      <p>{data.desc}</p>
      <div className="product-preview">{data.mock}</div>
      <a href={data.href} className="product-link">
        Learn more
        <ArrowIcon size={12} />
      </a>
    </div>
  );
}

export default function Products() {
  // diagonal stagger: parent gets `in` when scrolled into view
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.15, margin: "0px 0px -60px 0px" });

  return (
    <section id="products">
      <div className="container">
        <SectionHead label="Our products" title="Software we build for ourselves.">
          Each product solves a problem we encountered while shipping client
          work — then refined until it stood on its own.
        </SectionHead>

        <div ref={gridRef} className={`products${gridInView ? " in" : ""}`}>
          {featured.map((p) => (
            <ProductCard key={p.name} data={p} />
          ))}
        </div>

        <div className="products-all-link">
          <Link href="/products" className="product-link">
            View all products
            <ArrowIcon size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
