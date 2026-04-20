import Link from "next/link";

export const metadata = {
  title: "OrbitAI — On-Device AI Assistant",
  description:
    "OrbitAI is an advanced on-device AI chat and productivity assistant for Android. Private, fast, and offline-capable.",
};

export default function OrbitAIPage() {
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
        <h1 className="project-hero-title">OrbitAI</h1>
        <p className="project-hero-desc">
          An advanced on-device AI chat and productivity assistant for Android.
          Built with Jetpack Compose and modern Kotlin — leveraging local LLM
          inference, RAG, and a suite of productivity tools, all running
          privately on your device.
        </p>
        <div className="project-actions">
          <a href="#" className="project-btn project-btn-primary">
            Coming Soon →
          </a>
          <a href="#" className="project-btn project-btn-secondary">
            GitHub
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="project-section">
        <h2 className="project-section-title">Features</h2>
        <div className="project-features-grid">
          <div className="project-feature">
            <h4>On-Device LLM Chat</h4>
            <p>Private, fast, and offline-capable AI chat using MediaPipe and LiteRtLm engines. No cloud dependency.</p>
          </div>
          <div className="project-feature">
            <h4>Retrieval-Augmented Generation</h4>
            <p>Enhanced responses by embedding and searching your own data locally. Your knowledge, your device.</p>
          </div>
          <div className="project-feature">
            <h4>Floating Bubble Assistant</h4>
            <p>A floating overlay assistant accessible from any app. Get AI help without switching context.</p>
          </div>
          <div className="project-feature">
            <h4>Multiple Modes</h4>
            <p>Switch between chat, spaces (knowledge bases), and custom modes for different workflows.</p>
          </div>
          <div className="project-feature">
            <h4>Productivity Tools</h4>
            <p>Built-in reminders, task management, and automation tools powered by local AI.</p>
          </div>
          <div className="project-feature">
            <h4>Complete Privacy</h4>
            <p>Everything runs on-device. No data leaves your phone. No accounts required.</p>
          </div>
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

      {/* Tech Stack */}
      <div className="project-section">
        <h2 className="project-section-title">Built With</h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {["Kotlin", "Jetpack Compose", "MediaPipe", "LiteRT", "Room DB", "Material 3"].map((tech) => (
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
