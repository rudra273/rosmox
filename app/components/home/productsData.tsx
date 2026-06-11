export interface ProductData {
  num: string;
  name: string;
  tag: string;
  platform: string;
  year: string;
  headline: string;
  desc: string;
  href: string;
  /** identity hue token, e.g. var(--hue-orbit) */
  hue: string;
  glyph: string;
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
    hue: "var(--hue-lens)",
    glyph: "B",
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
    hue: "var(--hue-orbit)",
    glyph: "O",
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
    hue: "var(--hue-vid)",
    glyph: "V",
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
    hue: "var(--hue-store)",
    glyph: "S",
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
    hue: "var(--hue-every)",
    glyph: "E",
  },
];
