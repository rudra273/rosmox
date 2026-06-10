import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { productJsonLd } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "BhashaLens — Indic OCR Pipeline",
  description:
    "BhashaLens is a smart OCR pipeline for accurate image-to-text conversion across Indian regional language documents — printed and handwritten, built to handle scale.",
  alternates: { canonical: "/projects/bhashalens" },
};

const features = [
  {
    title: "Multilingual Recognition",
    desc: "Reads printed and handwritten text across major Indic scripts, with layout-aware segmentation for mixed-language pages.",
  },
  {
    title: "Handwriting Support",
    desc: "Trained on diverse handwriting styles so forms, notes, and ledgers convert cleanly — not just clean print.",
  },
  {
    title: "Layout Preservation",
    desc: "Detects columns, tables, and reading order, so the extracted text keeps the structure of the original document.",
  },
  {
    title: "Confidence Scoring",
    desc: "Every block returns a confidence score, so low-certainty regions can be flagged for review instead of failing silently.",
  },
  {
    title: "Batch Pipeline",
    desc: "Built to process thousands of pages — queue scanned archives and stream results to your store of choice.",
  },
  {
    title: "Export Anywhere",
    desc: "Output to plain text, searchable PDF, or structured JSON with bounding boxes ready for downstream systems.",
  },
];

const languages = [
  "Hindi",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Odia",
  "Punjabi",
  "Assamese",
  "English",
];

const tech = ["Python", "PyTorch", "ONNX Runtime", "OpenCV", "FastAPI", "Docker"];

export default function BhashaLensPage() {
  return (
    <div className="project-page">
      <JsonLd
        data={productJsonLd({
          name: "BhashaLens",
          description:
            "OCR pipeline for printed and handwritten Indic-language documents — layout-aware, confidence-scored, built for scale.",
          path: "/projects/bhashalens",
          category: "DeveloperApplication",
        })}
      />
      {/* Hero */}
      <div className="project-hero">
        <Link href="/products" className="back-link project-back">
          <span className="back-arrow">←</span> All products
        </Link>
        <div className="project-hero-meta">
          <span className="product-badge">Vision · OCR</span>
          <span className="product-year">2026</span>
        </div>
        <h1 className="project-hero-title">BhashaLens</h1>
        <p className="project-hero-desc">
          A smart OCR pipeline for accurate image-to-text conversion across
          Indian regional language documents. Printed or handwritten,
          single page or full archive — BhashaLens turns scanned documents
          into clean, structured, searchable text at scale.
        </p>
        <div className="project-actions">
          <Link href="/contact" className="project-btn project-btn-primary">
            Get in touch →
          </Link>
          <a href="#how" className="project-btn project-btn-secondary">
            See how it works
          </a>
        </div>
      </div>

      {/* How it works — OCR demo mock */}
      <div className="project-section" id="how">
        <h2 className="project-section-title">How it works</h2>
        <div className="ocr-demo">
          <div className="ocr-panel">
            <div className="ocr-panel-label">Scanned document</div>
            <div className="ocr-scan" aria-hidden="true" />
          </div>
          <div className="ocr-arrow" aria-hidden="true">
            →
          </div>
          <div className="ocr-panel">
            <div className="ocr-panel-label">Extracted text</div>
            <div className="ocr-text-line" />
            <div className="ocr-text-line" />
            <div className="ocr-text-line" />
            <div className="ocr-text-line" />
            <div className="ocr-text-line" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="project-section">
        <h2 className="project-section-title">Features</h2>
        <div className="project-features-grid">
          {features.map((f) => (
            <div className="project-feature" key={f.title}>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="project-section">
        <h2 className="project-section-title">Supported languages</h2>
        <div className="project-langs">
          {languages.map((lang) => (
            <span key={lang}>{lang}</span>
          ))}
        </div>
      </div>

      {/* Screenshots */}
      <div className="project-section">
        <h2 className="project-section-title">In action</h2>
        <div className="project-screenshots">
          <div className="screenshot-placeholder">Upload &amp; scan</div>
          <div className="screenshot-placeholder">Live extraction</div>
          <div className="screenshot-placeholder">Structured export</div>
        </div>
      </div>

      {/* Tech */}
      <div className="project-section">
        <h2 className="project-section-title">Built with</h2>
        <div className="project-tech">
          {tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <div className="project-section">
        <h2 className="project-section-title">Get started</h2>
        <p className="project-hero-desc">
          Have a pile of documents to digitize, or a product that needs Indic
          OCR baked in? Tell us about it.
        </p>
        <div className="project-actions">
          <Link href="/contact" className="project-btn project-btn-primary">
            Get in touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
