import Link from "next/link";
import Image from "next/image";
import StorelySchemaSection from "../../components/storely/StorelySchemaSection";

export const metadata = {
  title: "Storely — Inventory and Billing",
  description:
    "Storely helps store owners manage inventory, products, billing, barcode scanning, and local records.",
};

export default function StorelyPage() {
  return (
    <div className="project-page">
      <nav className="privacy-nav">
        <Link href="/" className="back-link">
          <span className="back-arrow">←</span> ROSMOX
        </Link>
      </nav>

      <div className="project-hero">
        <Image
          src="/project/storely.png"
          alt="Storely app logo"
          width={96}
          height={96}
          className="project-app-logo"
          priority
        />
        <div className="project-hero-meta">
          <span className="product-badge">Android</span>
          <span className="product-year">2026</span>
        </div>
        <h1 className="project-hero-title">Storely</h1>
        <p className="project-hero-desc">
          Inventory and billing management for store owners. Track products,
          scan barcodes, create bills, and keep business records locally on the
          device.
        </p>
        <div className="project-actions">
          <a href="#" className="project-btn project-btn-primary">
            Download on Play Store →
          </a>
          <Link
            href="/projects/storely/privacy-policy"
            className="project-btn project-btn-secondary"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="project-section">
        <h2 className="project-section-title">Features</h2>
        <div className="project-features-grid">
          <div className="project-feature">
            <h4>Inventory Management</h4>
            <p>Manage product names, prices, quantities, categories, suppliers, and barcodes.</p>
          </div>
          <div className="project-feature">
            <h4>Billing</h4>
            <p>Create bills inside the app and keep billing records on the device.</p>
          </div>
          <div className="project-feature">
            <h4>Barcode and QR Scanning</h4>
            <p>Use the camera only when scanning product barcodes and QR codes.</p>
          </div>
          <div className="project-feature">
            <h4>Import and Export</h4>
            <p>Work with invoices, CSV or Excel files, and QR sheets through file access.</p>
          </div>
          <div className="project-feature">
            <h4>Local Storage</h4>
            <p>No account, cloud sync, or server storage is required in version 1.0.0.</p>
          </div>
          <div className="project-feature">
            <h4>No Advertising SDK</h4>
            <p>Version 1.0.0 does not include an advertising SDK or default third-party sharing.</p>
          </div>
        </div>
      </div>

      <StorelySchemaSection />

      <div className="project-section">
        <h2 className="project-section-title">Screenshots</h2>
        <div className="project-screenshots">
          <div className="screenshot-placeholder">Screenshot 1</div>
          <div className="screenshot-placeholder">Screenshot 2</div>
          <div className="screenshot-placeholder">Screenshot 3</div>
        </div>
      </div>

      <div className="project-section">
        <h2 className="project-section-title">Built With</h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {["Flutter", "Dart", "Local Database", "Barcode Scanner", "File Export"].map((tech) => (
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

    </div>
  );
}
