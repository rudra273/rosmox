"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";
import SectionHead from "./SectionHead";
import ArrowIcon from "../ui/ArrowIcon";

/* ---- per-product preview mocks ---- */
function MockOrbit() {
  return (
    <div className="mock-forge">
      <div className="node">
        <span className="ring" /> local.chat
      </div>
      <div className="node b">
        <span className="ring" /> rag.search
      </div>
      <div className="node a">
        <span className="ring" /> bubble.ai
      </div>
      <div className="node r">
        <span className="ring" /> tasks.run
      </div>
    </div>
  );
}

function MockVidyalaya() {
  return (
    <div className="mock-vidyalaya">
      <div className="book-stack" aria-hidden="true">
        <div className="book-cover cover-one" />
        <div className="book-cover cover-two" />
        <div className="book-cover cover-three" />
      </div>
      <div className="reader-panel">
        <div className="reader-toolbar">
          <span />
          <span />
          <span />
        </div>
        <div className="reader-page">
          <div className="page-line long" />
          <div className="page-line" />
          <div className="page-line short" />
          <div className="bookmark-ribbon" />
        </div>
        <div className="reader-progress">
          <span />
        </div>
      </div>
    </div>
  );
}

function MockLens() {
  return <div className="mock-lens" />;
}

function MockStorely() {
  return (
    <div className="mock-storely">
      <div className="inventory-panel">
        <div className="inventory-row">
          <span />
          <strong />
        </div>
        <div className="inventory-row">
          <span />
          <strong />
        </div>
        <div className="inventory-row low">
          <span />
          <strong />
        </div>
      </div>
      <div className="barcode-card" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="bill-card">
        <div className="bill-line" />
        <div className="bill-total" />
      </div>
    </div>
  );
}

interface ProductData {
  mark: string;
  markColor: "blue" | "green" | "amber" | "red";
  logo?: {
    src: string;
    alt: string;
  };
  name: string;
  version: string;
  tag: string;
  headline: string;
  desc: string;
  href: string;
  cta: string;
  mock: ReactNode;
}

const products: ProductData[] = [
  {
    mark: "B",
    markColor: "red",
    name: "BhashaLens",
    version: "OCR · pipeline",
    tag: "VISION · OCR",
    headline: "Indic OCR for printed and handwritten documents.",
    desc: "A smart OCR pipeline for accurate image-to-text conversion across regional language documents, built to handle scale.",
    href: "/contact",
    cta: "Discuss BhashaLens",
    mock: <MockLens />,
  },
  {
    mark: "O",
    markColor: "blue",
    name: "OrbitAI",
    version: "Android · 2026",
    tag: "ON-DEVICE · AI",
    headline: "Private AI chat and productivity on Android.",
    desc: "Local LLM chat, RAG, floating assistant mode, reminders, tasks, and automation tools that run privately on the device.",
    href: "/projects/orbitai",
    cta: "Visit in Play Store",
    mock: <MockOrbit />,
  },
  {
    mark: "V",
    markColor: "amber",
    logo: {
      src: "/logo/vidyalaya.png",
      alt: "Vidyālaya logo",
    },
    name: "Vidyālaya",
    version: "Android · 2026",
    tag: "EDUCATION · OFFLINE",
    headline: "Offline textbooks for Indian school students.",
    desc: "Download textbooks once and read anytime with class-based organization, bookmarks, light and dark mode, and no accounts.",
    href: "/projects/vidyalaya",
    cta: "Visit in Play Store",
    mock: <MockVidyalaya />,
  },
  {
    mark: "S",
    markColor: "green",
    logo: {
      src: "/logo/storely.png",
      alt: "Storely logo",
    },
    name: "Storely",
    version: "Android · 2026",
    tag: "RETAIL · BILLING",
    headline: "Inventory, barcode scanning, and billing for stores.",
    desc: "Manage products, stock, suppliers, barcodes, bills, CSV or Excel imports, and local business records from one app.",
    href: "/projects/storely",
    cta: "Visit in Play Store",
    mock: <MockStorely />,
  },
];

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
        {data.cta}
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
          {products.map((p) => (
            <ProductCard key={p.name} data={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
