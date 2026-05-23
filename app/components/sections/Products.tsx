"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";
import SectionHead from "./SectionHead";
import ArrowIcon from "../ui/ArrowIcon";

/* ---- per-product preview mocks ---- */
function MockPulse() {
  return (
    <div className="mock-pulse">
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
      <div className="grid-mini">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none">
          <path
            d="M0,30 L15,24 L30,28 L45,16 L60,18 L75,10 L100,4"
            fill="none"
            stroke="#4F8DFF"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}
function MockForge() {
  return (
    <div className="mock-forge">
      <div className="node">
        <span className="ring" /> input.ingest
      </div>
      <div className="node b">
        <span className="ring" /> llm.reason
      </div>
      <div className="node a">
        <span className="ring" /> tool.search
      </div>
      <div className="node r">
        <span className="ring" /> output.dispatch
      </div>
    </div>
  );
}
function MockRelay() {
  return (
    <div className="mock-relay">
      <div className="row">
        <span className="pill">inbound</span>
        <span className="arrow">→</span>
        <span className="pill">classify</span>
        <span className="arrow">→</span>
        <span className="pill">draft</span>
      </div>
      <div className="row">
        <span className="pill">sent</span>
        <span className="arrow">→</span>
        <span className="ok">94% resolved</span>
      </div>
    </div>
  );
}
function MockLens() {
  return <div className="mock-lens" />;
}

interface ProductData {
  mark: string;
  markColor: "blue" | "green" | "amber" | "red";
  name: string;
  version: string;
  tag: string;
  headline: string;
  desc: string;
  link: string;
  mock: ReactNode;
}

const products: ProductData[] = [
  {
    mark: "P",
    markColor: "blue",
    name: "Rosmox Pulse",
    version: "v2.4 · live",
    tag: "AI · ANALYTICS",
    headline: "Product analytics with an analyst built in.",
    desc: "Ask in plain English. Pulse drafts the query, runs it, and explains the chart. Built for product teams who can't wait on data.",
    link: "pulse.rosmox.com",
    mock: <MockPulse />,
  },
  {
    mark: "F",
    markColor: "green",
    name: "Rosmox Forge",
    version: "v1.1 · live",
    tag: "AGENT · BUILDER",
    headline: "Compose production agents without the boilerplate.",
    desc: "Drag tools, wire conditions, deploy as an API. Forge handles retries, memory, and traces so you can focus on the workflow.",
    link: "forge.rosmox.com",
    mock: <MockForge />,
  },
  {
    mark: "R",
    markColor: "amber",
    name: "Rosmox Relay",
    version: "v0.9 · beta",
    tag: "CUSTOMER · AI",
    headline: "An inbox that triages, drafts, and resolves.",
    desc: "Trained on your tone and product. Relay handles tier-1 in seconds and escalates the rest with full context.",
    link: "relay.rosmox.com",
    mock: <MockRelay />,
  },
  {
    mark: "L",
    markColor: "red",
    name: "Rosmox Lens",
    version: "v1.0 · live",
    tag: "VISION · API",
    headline: "Vision API for documents, IDs, and receipts.",
    desc: "Field-level extraction with confidence scores. Drop-in REST, SDKs for Node, Python, and Kotlin.",
    link: "lens.rosmox.com",
    mock: <MockLens />,
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
          <div className={`product-mark ${data.markColor}`}>{data.mark}</div>
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
      <a href="#" className="product-link">
        Visit {data.link}
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
