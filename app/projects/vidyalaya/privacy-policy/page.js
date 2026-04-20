import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Vidyālaya",
  description:
    "Privacy Policy for the Vidyālaya app by ROSMOX — an offline textbook reader for Indian school students.",
};

export default function PrivacyPolicyPage() {
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
          <span className="privacy-badge">Vidyālaya</span>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-date">Effective Date: April 20, 2026</p>
        </header>

        <div className="privacy-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to <strong>Vidyālaya</strong> (&ldquo;we,&rdquo;
              &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to
              protecting your privacy and ensuring you have a positive experience
              on our mobile application. Vidyālaya is designed as a book reading
              tool for Indian school students, providing offline access to
              educational materials.
            </p>
            <p>
              This Privacy Policy explains our practices regarding the
              collection, use, and disclosure of information when you use the
              Vidyālaya app.
            </p>
          </section>

          <section>
            <h2>2. No Data Collection</h2>
            <p>
              Our core principle is simple:{" "}
              <strong>
                We do not collect, transmit, or store your personal data on any
                external servers.
              </strong>
            </p>
            <ul>
              <li>
                <strong>No Account Required:</strong> You can use Vidyālaya
                without creating an account or providing any identifying
                information (such as name, email, or phone number).
              </li>
              <li>
                <strong>Local Storage:</strong> Any customization you make within
                the app (such as providing a nickname, selecting your class,
                choosing light/dark mode themes, or saving bookmarks) is stored
                entirely locally on your device.
              </li>
              <li>
                <strong>Downloaded Books:</strong> The textbooks and study
                materials you download are saved directly onto your
                device&apos;s internal storage for offline viewing.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Permissions We Request</h2>
            <p>
              To function properly, Vidyālaya requires minimal device
              permissions. These are strictly used for the app&apos;s
              functionality and not for data tracking:
            </p>
            <ul>
              <li>
                <strong>Internet Connectivity:</strong> Used solely to download
                educational PDFs from our servers so you can read them offline.
                We do not use the internet connection to send your personal usage
                data anywhere.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Third-Party Services and Analytics</h2>
            <p>
              Vidyālaya does <strong>not</strong> integrate with any third-party
              analytics trackers, advertising networks, or data brokers. The app
              is completely ad-free and tracking-free.
            </p>
          </section>

          <section>
            <h2>5. Children&apos;s Privacy (COPPA)</h2>
            <p>
              Vidyālaya is designed for school students, including children under
              the age of 13. We are fully compliant with the Children&apos;s
              Online Privacy Protection Act (COPPA). Because we do not collect
              any personal information from any of our users, we inherently do
              not collect personal information from children.
            </p>
          </section>

          <section>
            <h2>6. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. If we decide to
              introduce new features in the future that require data collection
              (such as cloud synchronization or AI-assisted learning), we will
              update this Privacy Policy and obtain the necessary user (and
              parental) consent before collecting any data. You are advised to
              review this page periodically for any changes.
            </p>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy,
              do not hesitate to contact the developer team.
            </p>
          </section>
        </div>
      </article>

      <footer className="site-footer">
        <div className="footer-inner" style={{ justifyContent: "center" }}>
          <span className="footer-copy">
            © 2026 Vidyālaya. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
