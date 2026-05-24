import type { ReactNode } from "react";

/* ---- per-product preview mocks ---- */
export function MockOrbit() {
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

export function MockVidyalaya() {
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

export function MockLens() {
  return <div className="mock-lens" />;
}

export function MockStorely() {
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

export function MockEverything() {
  return (
    <div className="mock-everything">
      <div className="vault-shield" aria-hidden="true">
        <span className="vault-lock" />
      </div>
      <div className="vault-rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export interface ProductData {
  mark: string;
  markColor: "blue" | "green" | "amber" | "red" | "violet";
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
  mock: ReactNode;
  /** Shown in the homepage featured Products section. */
  featured: boolean;
}

export const products: ProductData[] = [
  {
    mark: "B",
    markColor: "red",
    name: "BhashaLens",
    version: "OCR · pipeline",
    tag: "VISION · OCR",
    headline: "Indic OCR for printed and handwritten documents.",
    desc: "A smart OCR pipeline for accurate image-to-text conversion across regional language documents, built to handle scale.",
    href: "/projects/bhashalens",
    mock: <MockLens />,
    featured: true,
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
    mock: <MockOrbit />,
    featured: true,
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
    tag: "EDUCATION",
    headline: "Offline textbooks for Indian school students.",
    desc: "Download textbooks once and read anytime with class-based organization, bookmarks, light and dark mode, and no accounts.",
    href: "/projects/vidyalaya",
    mock: <MockVidyalaya />,
    featured: true,
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
    mock: <MockStorely />,
    featured: true,
  },
  {
    mark: "E",
    markColor: "violet",
    name: "Everything",
    version: "Android · 2026",
    tag: "PRIVACY · LOCAL-FIRST",
    headline: "A local-first privacy utility for your whole device.",
    desc: "Keep your data on-device by default. Encrypted local backups, optional Google Drive sync, and granular control over every permission.",
    href: "/projects/everything",
    mock: <MockEverything />,
    featured: false,
  },
];
