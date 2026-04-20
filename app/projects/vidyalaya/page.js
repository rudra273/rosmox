import Link from "next/link";

export const metadata = {
  title: "Vidyālaya — Offline Textbook Reader",
  description:
    "Vidyālaya is a free offline textbook reader for Indian school students. Download once, read anytime.",
};

export default function VidyalayaPage() {
  return (
    <div className="project-page">
      <div className="grain-overlay" aria-hidden="true" />

      <nav className="privacy-nav">
        <Link href="/" className="back-link">
          <span className="back-arrow">←</span> ROSMOX
        </Link>
      </nav>

      {/* Hero */}
      <div className="project-hero">
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
          <a href="#" className="project-btn project-btn-primary">
            Download on Play Store →
          </a>
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
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {["Flutter", "Dart", "PDF Renderer", "SharedPreferences", "Material 3"].map((tech) => (
            <span
              key={tech}
              style={{
                padding: "0.375rem 0.875rem",
                borderRadius: "100px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <footer className="site-footer">
        <div className="footer-bottom" style={{ marginTop: 0 }}>
          <span className="footer-copy">© 2026 ROSMOX. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
