import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Everything — Local-First Privacy Utility",
  description:
    "Everything is a local-first privacy utility for Android. Your data stays on the device by default, with encrypted backups and granular permission control.",
};

const features = [
  {
    title: "Local-First by Default",
    desc: "Your data lives on your device. Nothing is uploaded unless you explicitly create a backup or connect a sync target.",
  },
  {
    title: "Encrypted Backups",
    desc: "Create encrypted local backup files you control, or connect Google Drive for optional encrypted off-device copies.",
  },
  {
    title: "Granular Permissions",
    desc: "Accessibility, usage access, overlay, notifications, and device admin are all opt-in and clearly explained before use.",
  },
  {
    title: "No Tracking, No Selling",
    desc: "Everything does not sell user data and ships without third-party analytics or advertising SDKs.",
  },
  {
    title: "Transparent Storage",
    desc: "See exactly what is stored on-device and what may be placed into a backup file — no hidden collection.",
  },
  {
    title: "You Decide",
    desc: "Delete data, revoke permissions, or remove backups at any time. The controls are yours, end to end.",
  },
];

const tech = ["Kotlin", "Jetpack Compose", "Room DB", "EncryptedFile", "Drive API", "Material 3"];

export default function EverythingPage() {
  return (
    <div className="project-page">
      {/* Hero */}
      <div className="project-hero">
        <div className="project-hero-meta">
          <span className="product-badge">Privacy · Local-First</span>
          <span className="product-year">2026</span>
        </div>
        <h1 className="project-hero-title">Everything</h1>
        <p className="project-hero-desc">
          A local-first privacy utility for your whole device. Everything keeps
          user-created data on the device unless you intentionally create an
          encrypted local backup or connect Google Drive — with clear, opt-in
          control over every permission it touches.
        </p>
        <div className="project-actions">
          <a href="#" className="project-btn project-btn-primary">
            Coming Soon →
          </a>
          <Link
            href="/projects/everything/privacy-policy"
            className="project-btn project-btn-secondary"
          >
            Privacy Policy
          </Link>
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

      {/* Screenshots */}
      <div className="project-section">
        <h2 className="project-section-title">In action</h2>
        <div className="project-screenshots">
          <div className="screenshot-placeholder">Dashboard</div>
          <div className="screenshot-placeholder">Permissions</div>
          <div className="screenshot-placeholder">Backups</div>
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
    </div>
  );
}
