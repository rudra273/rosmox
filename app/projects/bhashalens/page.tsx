import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { productJsonLd } from "../../components/JsonLd";
import {
  ChipList,
  CrumbBar,
  FeatureGrid,
  ProjectHero,
  ProjectSection,
  Screens,
} from "../../components/project/ProjectKit";

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
    <div className="proj-page">
      <JsonLd
        data={productJsonLd({
          name: "BhashaLens",
          description:
            "OCR pipeline for printed and handwritten Indic-language documents — layout-aware, confidence-scored, built for scale.",
          path: "/projects/bhashalens",
          category: "DeveloperApplication",
        })}
      />
      <CrumbBar backHref="/products" backLabel="All products" right="Product 01 / 05" />
      <ProjectHero
        badge="Vision · OCR"
        year="2026"
        title="BhashaLens"
        desc="A smart OCR pipeline for accurate image-to-text conversion across Indian regional language documents. Printed or handwritten, single page or full archive — BhashaLens turns scanned documents into clean, structured, searchable text at scale."
      >
        <Link href="/contact" className="btn btn-grad">
          Get in touch <span className="arr">→</span>
        </Link>
        <a href="#how" className="btn btn-glass">
          See how it works
        </a>
      </ProjectHero>

      <ProjectSection index="01" title="How it works" id="how">
        <div className="ocr-demo" aria-hidden="true">
          <div className="ocr-stage">
            <div className="ocr-doc">
              <span className="ocr-doc-label mono">Scanned document</span>
              <span className="ocr-scanline" />
              <i />
              <i />
              <i />
              <i />
            </div>
            <span className="ocr-flow">
              <span className="ocr-flow-dot" />
            </span>
            <div className="ocr-doc ocr-result">
              <span className="ocr-doc-label mono">Extracted text</span>
              <i className="long" />
              <i />
              <i className="short" />
              <i />
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection index="02" title="Features">
        <FeatureGrid features={features} />
      </ProjectSection>

      <ProjectSection index="03" title="Supported languages">
        <ChipList items={languages} />
      </ProjectSection>

      <ProjectSection index="04" title="In action">
        <Screens labels={["Upload & scan", "Live extraction", "Structured export"]} />
      </ProjectSection>

      <ProjectSection index="05" title="Built with">
        <ChipList items={tech} />
      </ProjectSection>

      <ProjectSection index="06" title="Get started">
        <p className="proj-closing">
          Have a pile of documents to digitize, or a product that needs Indic
          OCR baked in? Tell us about it.
        </p>
        <Link href="/contact" className="btn btn-grad">
          Get in touch <span className="arr">→</span>
        </Link>
      </ProjectSection>
    </div>
  );
}
