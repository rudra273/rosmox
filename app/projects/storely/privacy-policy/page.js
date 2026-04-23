import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Storely",
  description:
    "Privacy Policy for the Storely app by ROSMOX — local inventory and billing management for store owners.",
};

export default function StorelyPrivacyPolicyPage() {
  return (
    <div className="privacy-page">
      <div className="grain-overlay" aria-hidden="true" />

      <nav className="privacy-nav">
        <Link href="/" className="back-link">
          <span className="back-arrow">←</span> ROSMOX
        </Link>
      </nav>

      <article className="privacy-container">
        <header className="privacy-header">
          <span className="privacy-badge">Storely</span>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-date">Effective Date: April 23, 2026</p>
        </header>

        <div className="privacy-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              <strong>Storely</strong> is designed to help store owners manage
              inventory and billing. This Privacy Policy explains how the app
              handles the information you enter.
            </p>
          </section>

          <section>
            <h2>2. Data Stored Locally</h2>
            <p>
              Storely does not collect, upload, or store your data on any
              server in version 1.0.0. The information you enter is stored
              locally on your device, including:
            </p>
            <ul>
              <li>Store details, such as shop name and settings.</li>
              <li>
                Product details, including name, price, quantity, barcode,
                category, and supplier.
              </li>
              <li>Billing information created in the app.</li>
            </ul>
          </section>

          <section>
            <h2>3. How Data Is Stored</h2>
            <p>
              In version 1.0.0, your data is stored in a local database on your
              device. Storely does not require an account login, cloud sync, or
              server storage in this version.
            </p>
          </section>

          <section>
            <h2>4. Permissions Used</h2>
            <ul>
              <li>
                <strong>Camera:</strong> used only for barcode and QR scanning.
              </li>
              <li>
                <strong>File access:</strong> used for importing and exporting
                files such as invoices, CSV or Excel files, and QR sheets.
              </li>
            </ul>
          </section>

          <section>
            <h2>5. Data Sharing</h2>
            <p>
              Storely does not sell your personal data. No advertising SDK is
              included in version 1.0.0. Storely does not share data with third
              parties by default. If you choose to export a file, print a bill,
              or send a bill through another app such as WhatsApp, the
              information you share may be handled by that selected app or
              service.
            </p>
          </section>

          <section>
            <h2>6. Data Security</h2>
            <p>
              Storely follows standard mobile app development practices.
              Because data is stored on your device, you are responsible for
              securing access to your device.
            </p>
          </section>

          <section>
            <h2>7. Your Control</h2>
            <p>
              You can modify or delete store, product, and billing records from
              within the app. Uninstalling the app may remove local app data,
              depending on your device settings.
            </p>
          </section>

          <section>
            <h2>8. Children&apos;s Privacy</h2>
            <p>
              Storely is not designed for children under 13, and it is intended
              for business use.
            </p>
          </section>

          <section>
            <h2>9. Policy Updates</h2>
            <p>
              This Privacy Policy may be updated in future releases. Any changes
              should be reflected in the latest app version and the Play Store
              listing.
            </p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>
              For any privacy-related questions or concerns, contact us at{" "}
              <a href="mailto:rosmoxx@gmail.com" className="privacy-link">
                rosmoxx@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </article>

      <footer className="site-footer">
        <div className="footer-inner" style={{ justifyContent: "center" }}>
          <span className="footer-copy">
            © 2026 Storely. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
