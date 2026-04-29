import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Storely",
  description:
    "Privacy Policy for the Storely app by ROSMOX — local inventory, billing, and optional user-configured cloud sync.",
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
          <h1 className="privacy-title">Storely Privacy Policy</h1>
          <p className="privacy-date">Effective Date: April 29, 2026</p>
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
              By default, the information you enter is stored locally on your
              device. Storely does not operate its own server to collect this
              data. Local data may include:
            </p>
            <ul>
              <li>Store details, such as shop name and settings.</li>
              <li>
                Product details, such as name, price, quantity, unit, barcode,
                category, and supplier.
              </li>
              <li>
                Supplier and customer details that you choose to enter, such as
                names, phone numbers, email addresses, GSTIN, and balances.
              </li>
              <li>
                Billing information created in the app, including bill items,
                totals, payment status, and payment method.
              </li>
              <li>
                Imported CSV or Excel product data and exported or shared PDF
                bills.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Optional User-Configured Cloud Sync</h2>
            <p>
              Storely can be used completely offline. Cloud Sync is optional
              and works only when you configure the app with your own Supabase
              project URL and anon public key.
            </p>
            <ul>
              <li>
                Storely does not provide or control the Supabase project used
                for Cloud Sync.
              </li>
              <li>
                Storely does not receive, access, sell, or manage the data
                synced to your Supabase project.
              </li>
              <li>
                If you enable Cloud Sync, the data you choose to sync is sent
                from your device to the Supabase project configured by you.
              </li>
              <li>
                Supabase authentication in your own project may use your email
                address to create and manage the account used for sync.
              </li>
              <li>
                Your use of Supabase is governed by your Supabase project
                settings and Supabase&apos;s privacy policy:{" "}
                <a
                  href="https://supabase.com/privacy"
                  className="privacy-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://supabase.com/privacy
                </a>
                .
              </li>
              <li>
                You are responsible for ensuring you have the legal right to
                store or sync any store, customer, supplier, product, and
                billing data that you enter into Storely.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Permissions Used</h2>
            <ul>
              <li>
                <strong>Camera:</strong> Used exclusively for scanning barcodes
                and QR codes. Camera images are not saved by Storely or uploaded
                by Storely for this feature.
              </li>
              <li>
                <strong>Network State &amp; Internet:</strong> Used to check
                connectivity and synchronize data to your configured Supabase
                project.
              </li>
              <li>
                <strong>Storage/Files:</strong> Used to import or export
                Excel/CSV files and save or share PDF bills selected or created
                by you.
              </li>
            </ul>
          </section>

          <section>
            <h2>5. Data Sharing</h2>
            <p>
              Storely does not sell your personal data. Storely does not
              contain advertising SDKs or third-party trackers. Storely does not
              share data with third parties by default.
            </p>
            <ul>
              <li>
                If you enable Cloud Sync, data is sent to the Supabase project
                configured by you. Storely does not operate that cloud project
                and does not collect that data on Storely-owned servers.
              </li>
              <li>
                If you export a file or share a bill through another app, the
                information you share is governed by that app&apos;s privacy
                policy.
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Data Security</h2>
            <p>
              Because data is stored on your device by default, you are
              responsible for securing access to your device. If using Cloud
              Sync, you are responsible for securely managing your Supabase
              project, access rules, authentication settings, and anon public
              key.
            </p>
          </section>

          <section>
            <h2>7. Data Deletion &amp; Retention</h2>
            <ul>
              <li>
                <strong>Local Data:</strong> You can delete all your local data
                at any time by uninstalling the Storely app or clearing the app
                data in your device settings.
              </li>
              <li>
                <strong>Cloud Data:</strong> If you enabled Cloud Sync, cloud
                data is stored in the Supabase project configured by you. You
                can delete cloud data, users, and authentication records from
                your Supabase project dashboard.
              </li>
              <li>
                <strong>Storely Server Data:</strong> Storely does not operate
                a Storely-owned backend for collecting your app data, so Storely
                does not hold a separate copy of your shop, product, supplier,
                customer, or bill records.
              </li>
              <li>
                <strong>Assistance:</strong> For privacy questions or help
                understanding deletion steps, contact{" "}
                <a href="mailto:rosmoxx@gmail.com" className="privacy-link">
                  rosmoxx@gmail.com
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2>8. Children&apos;s Privacy</h2>
            <p>
              Storely is a business tool and is not designed for children under
              13.
            </p>
          </section>

          <section>
            <h2>9. Policy Updates</h2>
            <p>
              This Privacy Policy may be updated in future releases. Any changes
              will be reflected in the latest app version and the Play Store
              listing.
            </p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>
              For any privacy-related questions, data deletion requests, or
              concerns, contact us at:{" "}
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
