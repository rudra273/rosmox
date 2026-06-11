import type { ReactNode } from "react";

/* ---- per-product diagrams — CSS line-art in the ink/orange system ---- */
export function DgLens() {
  return (
    <div className="dg dg-lens" aria-hidden="true">
      <div className="dg-doc">
        <span className="dg-scan" />
        <i />
        <i />
        <i />
        <i />
      </div>
      <span className="dg-arrow">→</span>
      <div className="dg-out">
        <i className="long" />
        <i />
        <i className="short" />
        <i />
      </div>
    </div>
  );
}

export function DgOrbit() {
  return (
    <div className="dg dg-orbit" aria-hidden="true">
      <span className="dg-ring">
        <span className="dg-sat" />
      </span>
      <span className="dg-core" />
      <div className="dg-bubble a">local.chat</div>
      <div className="dg-bubble b">rag.search</div>
    </div>
  );
}

export function DgVidyalaya() {
  return (
    <div className="dg dg-vid" aria-hidden="true">
      <span className="dg-book one" />
      <span className="dg-book two" />
      <span className="dg-book three" />
      <span className="dg-ribbon" />
    </div>
  );
}

export function DgStorely() {
  return (
    <div className="dg dg-store" aria-hidden="true">
      <div className="dg-barcode">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="dg-receipt">
        <i />
        <i />
        <i className="total" />
      </div>
    </div>
  );
}

export function DgEverything() {
  return (
    <div className="dg dg-every" aria-hidden="true">
      <span className="dg-vault">
        <span className="dg-lock" />
      </span>
      <span className="dg-orbit-ring r1" />
      <span className="dg-orbit-ring r2" />
    </div>
  );
}

export interface ProductData {
  num: string;
  name: string;
  tag: string;
  platform: string;
  year: string;
  headline: string;
  desc: string;
  href: string;
  diagram: ReactNode;
  /** ink = the inverted card in the deck */
  tone: "paper" | "paper-2" | "paper-3" | "ink";
}

export const products: ProductData[] = [
  {
    num: "01",
    name: "BhashaLens",
    tag: "Vision · OCR",
    platform: "Pipeline",
    year: "2026",
    headline: "Indic OCR for printed and handwritten documents.",
    desc: "A smart OCR pipeline for accurate image-to-text conversion across regional language documents, built to handle scale.",
    href: "/projects/bhashalens",
    diagram: <DgLens />,
    tone: "paper",
  },
  {
    num: "02",
    name: "OrbitAI",
    tag: "On-device · AI",
    platform: "Android",
    year: "2026",
    headline: "Private AI chat and productivity on Android.",
    desc: "Local LLM chat, RAG, floating assistant mode, reminders, tasks, and automation tools that run privately on the device.",
    href: "/projects/orbitai",
    diagram: <DgOrbit />,
    tone: "paper-2",
  },
  {
    num: "03",
    name: "Vidyālaya",
    tag: "Education",
    platform: "Android",
    year: "2026",
    headline: "Offline textbooks for Indian school students.",
    desc: "Download textbooks once and read anytime with class-based organization, bookmarks, light and dark mode, and no accounts.",
    href: "/projects/vidyalaya",
    diagram: <DgVidyalaya />,
    tone: "paper-3",
  },
  {
    num: "04",
    name: "Storely",
    tag: "Retail · Billing",
    platform: "Android",
    year: "2026",
    headline: "Inventory, barcode scanning, and billing for stores.",
    desc: "Manage products, stock, suppliers, barcodes, bills, CSV or Excel imports, and local business records from one app.",
    href: "/projects/storely",
    diagram: <DgStorely />,
    tone: "paper-2",
  },
  {
    num: "05",
    name: "Everything",
    tag: "Privacy · Local-first",
    platform: "Android",
    year: "2026",
    headline: "A local-first privacy utility for your whole device.",
    desc: "Keep your data on-device by default. Encrypted local backups, optional Google Drive sync, and granular control over every permission.",
    href: "/projects/everything",
    diagram: <DgEverything />,
    tone: "ink",
  },
];
