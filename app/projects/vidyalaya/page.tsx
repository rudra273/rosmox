import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd, { productJsonLd } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "Vidyālaya — Offline Textbook Reader",
  description:
    "Vidyālaya is a free offline textbook reader for Indian school students. Download once, read anytime.",
  alternates: { canonical: "/projects/vidyalaya" },
};

export default function VidyalayaPage() {
  return (
    <div className="project-page">
      <JsonLd
        data={productJsonLd({
          name: "Vidyālaya",
          description:
            "Free offline textbook reader for Indian school students — download once, read anytime, no accounts or tracking.",
          path: "/projects/vidyalaya",
          category: "EducationalApplication",
          operatingSystem: "Android",
        })}
      />
      {/* Hero */}
      <div className="project-hero">
        <Link href="/products" className="back-link project-back">
          <span className="back-arrow">←</span> All products
        </Link>
        <Image
          src="/logo/vidyalaya.png"
          alt="Vidyālaya app logo"
          width={96}
          height={96}
          className="project-app-logo"
          priority
        />
        <div className="project-hero-meta">
          <span className="product-badge">Android</span>
          <span className="product-year">2026</span>
        </div>
        <h1 className="project-hero-title">Vidyālaya</h1>
        <p className="project-hero-desc">
          A free, offline textbook reader built for Indian school students.
          Download your books once, read them anytime — no internet required.
          No ads, no tracking, no accounts.
        </p>
        <div className="project-actions">
          <span className="project-status">Coming soon to Play Store</span>
          <Link href="/projects/vidyalaya/privacy-policy" className="project-btn project-btn-secondary">
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Screenshots */}
      <div className="project-section">
        <h2 className="project-section-title">Screenshots</h2>
        <div className="project-screenshots">
          <div className="screenshot-placeholder">Screenshot 1</div>
          <div className="screenshot-placeholder">Screenshot 2</div>
          <div className="screenshot-placeholder">Screenshot 3</div>
        </div>
      </div>

      {/* Features */}
      <div className="project-section">
        <h2 className="project-section-title">Features</h2>
        <div className="project-features-grid">
          <div className="project-feature">
            <h4>Offline Reading</h4>
            <p>Download textbooks once and read anytime without an internet connection.</p>
          </div>
          <div className="project-feature">
            <h4>Zero Data Collection</h4>
            <p>No accounts, no tracking, no analytics. Your data stays on your device.</p>
          </div>
          <div className="project-feature">
            <h4>Light &amp; Dark Mode</h4>
            <p>Switch between light and dark themes for comfortable reading day or night.</p>
          </div>
          <div className="project-feature">
            <h4>Class-Based Organization</h4>
            <p>Books organized by class and subject for quick access to what you need.</p>
          </div>
          <div className="project-feature">
            <h4>Bookmarks</h4>
            <p>Save your reading progress and jump back to where you left off.</p>
          </div>
          <div className="project-feature">
            <h4>Lightweight</h4>
            <p>Minimal app size with efficient PDF rendering for smooth performance.</p>
          </div>
        </div>
      </div>

      {/* Tech */}
      <div className="project-section">
        <h2 className="project-section-title">Built With</h2>
        <div className="project-tech">
          {["Flutter", "Dart", "PDF Renderer", "SharedPreferences", "Material 3"].map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>

    </div>
  );
}
