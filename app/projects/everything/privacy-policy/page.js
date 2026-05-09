import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Everything",
  description:
    "Privacy Policy for the Everything app — a local-first privacy utility app.",
};

export default function EverythingPrivacyPolicyPage() {
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
          <span className="privacy-badge">Everything</span>
          <h1 className="privacy-title">Everything Privacy Policy</h1>
          <p className="privacy-date">Effective Date: May 9, 2026</p>
        </header>

        <div className="privacy-content">
          <p>
            Everything is a local-first privacy utility app. The app is designed
            to keep user-created data on the device unless the user intentionally
            creates an encrypted local backup or connects Google Drive backup.
          </p>

          <p>
            This Privacy Policy explains what data Everything accesses, how the
            data is used, what is stored locally, what may be placed into
            encrypted backup files, and how optional permissions such as
            Accessibility are used.
          </p>

          <section>
            <h2>1. Data Stored On The Device</h2>
            <p>
              Everything may store the following data locally on the user&apos;s
              device:
            </p>
            <ul>
              <li>
                <strong>Master PIN credential:</strong> Everything stores a salted
                password hash for verifying the master PIN. The original PIN is
                not stored.
              </li>
              <li>
                <strong>Key Store:</strong> saved key names, labels, and values
                are stored in the encrypted local database.
              </li>
              <li>
                <strong>Secure Notes:</strong> note titles, content, labels, and
                timestamps are stored in the encrypted local database.
              </li>
              <li>
                <strong>Expenses and Habits:</strong> tracker entries, bills,
                habit definitions, progress logs, and related timestamps are
                stored locally.
              </li>
              <li>
                <strong>App Lock:</strong> selected locked package names and app
                labels are stored locally so App Lock can continue working after
                app restart or device reboot.
              </li>
              <li>
                <strong>Settings:</strong> tool-lock preferences, backup
                preferences, selected Google account email for Drive backup, theme
                preferences, widget preferences, and local app configuration may
                be stored on the device.
              </li>
              <li>
                <strong>File Vault:</strong> selected media files are copied to a
                local Documents/EverythingFileLocker folder. File Vault media is
                not encrypted by Everything and is not stored in the app database.
              </li>
            </ul>
          </section>

          <section>
            <h2>2. Backup And Google Drive</h2>
            <p>
              Backups are encrypted on the device before they are saved or
              uploaded. The backup password is used to derive the backup
              encryption key, and backup content is encrypted before it leaves the
              device.
            </p>
            <p>
              Key Store and Secure Notes are always included in encrypted backup
              files. Expenses and Habits are optional and can be enabled or
              disabled in Backup &amp; Restore settings.
            </p>
            <p>
              App Lock package selections, theme preferences, widget settings, DNS
              choices, reminder schedules, editor cache, and File Vault media are
              not included in app backup files.
            </p>
            <p>
              When Google Drive backup is enabled, Everything requests access to
              create and manage its own backup files in the user&apos;s Google
              Drive. Everything uploads encrypted backup files; it does not upload
              plain Key Store values, notes, expenses, or habits.
            </p>
            <p>
              Google account authorization is used only for backup and restore
              actions chosen by the user or for automatic backup when the user
              enables it.
            </p>
          </section>

          <section>
            <h2>3. Accessibility Permission</h2>
            <p>
              Accessibility access is optional. Everything can function without
              it, but App Lock detection may be less reliable.
            </p>
            <p>
              If the user enables Accessibility for Everything, the app uses
              Accessibility window events to detect when the user opens an app
              selected for locking, then shows the Everything lock screen.
            </p>
            <p>
              Everything does not use Accessibility to read screen text, collect
              passwords, collect typed content, make purchases, send messages,
              perform clicks on behalf of the user, or transmit screen content.
            </p>
            <p>
              Accessibility data is used only on the device for App Lock behavior
              and is not included in cloud backup.
            </p>
          </section>

          <section>
            <h2>4. Usage Access, Overlay, Notifications, And Device Admin</h2>
            <p>
              <strong>Usage Access</strong> may be used to identify the foreground
              app for App Lock behavior when Accessibility is not enabled.
            </p>
            <p>
              <strong>Overlay permission</strong> may be used to display a lock
              challenge over selected locked apps in the fallback App Lock flow.
            </p>
            <p>
              <strong>Notification permission</strong> is used for reminders,
              habits, and app alerts when the user enables those features.
            </p>
            <p>
              <strong>Device Admin</strong> is optional and is used only for
              uninstall protection. It does not give Everything access to personal
              files or messages.
            </p>
          </section>

          <section>
            <h2>5. Network And Third Parties</h2>
            <p>
              Everything uses internet access for Google Drive backup and restore
              when the user connects a Google account.
            </p>
            <p>
              The app uses Google sign-in/authorization components and Google
              Drive APIs for Drive backup operations.
            </p>
            <p>
              Everything does not sell user data. Everything does not use
              advertising identifiers for ad targeting. Everything does not
              intentionally share user-created vault data with third parties
              except when the user stores an encrypted backup in Google Drive.
            </p>
          </section>

          <section>
            <h2>6. Security Measures</h2>
            <p>
              The local database is encrypted with SQLCipher. The database
              passphrase is randomly generated and protected using Android
              Keystore.
            </p>
            <p>
              Sensitive Key Store and Secure Notes fields are encrypted before
              storage.
            </p>
            <p>
              Backup files are encrypted with a password chosen by the user. If
              the backup password is forgotten, the backup cannot be restored.
            </p>
            <p>
              The app sets secure window flags on the main activity to reduce
              screenshots of sensitive screens where supported by Android.
            </p>
          </section>

          <section>
            <h2>7. Retention And Deletion</h2>
            <p>
              Data remains on the device until the user deletes it inside the app,
              clears app data, or uninstalls the app.
            </p>
            <p>
              Encrypted Google Drive backup files remain in the user&apos;s Google
              Drive until deleted by the user or by backup retention behavior.
              Everything keeps only recent backup files when it creates new Drive
              backups.
            </p>
            <p>
              Uninstalling Everything or clearing app data removes local app data
              from the device. It does not automatically delete backup files
              already stored in Google Drive.
            </p>
          </section>

          <section>
            <h2>8. User Choices</h2>
            <ul>
              <li>
                Users can choose whether to enable Accessibility, Usage Access,
                Overlay permission, notifications, Device Admin, Google Drive
                backup, automatic backup, and optional backup of Expenses and
                Habits.
              </li>
              <li>
                Users can use local encrypted backup without Google Drive by
                creating a local backup file.
              </li>
              <li>
                Users can stop future Drive backups by turning automatic backup
                off or removing the backup password.
              </li>
            </ul>
          </section>

          <section>
            <h2>9. Children</h2>
            <p>
              Everything is a general utility app and is not directed to children.
              The app does not knowingly collect children&apos;s personal
              information.
            </p>
          </section>

          <section>
            <h2>10. Changes And Contact</h2>
            <p>
              This Privacy Policy may be updated as the app changes. The current
              policy should be available inside the app and through the Google
              Play listing.
            </p>
            <p>
              For privacy questions, use the developer contact information
              provided on the Google Play Store listing for Everything.
            </p>
          </section>
        </div>
      </article>

      <footer className="site-footer">
        <div className="footer-inner" style={{ justifyContent: "center" }}>
          <span className="footer-copy">
            © 2026 Everything. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
