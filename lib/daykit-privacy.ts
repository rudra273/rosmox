/* ──────────────────────────────────────────────────────────
   DayKit privacy policy content.

   Single source of truth for the copy rendered at
   /products/daykit/privacy-policy. This is the hosted, public
   version of the policy that ships inside the DayKit Android app
   (see PrivacyPolicyScreen.kt). Keep the two in sync — Google
   Play fetches this page for the store listing.
   ────────────────────────────────────────────────────────── */

import type { PrivacyPolicyContent } from "@/lib/policy";

export const DAYKIT_PRIVACY: PrivacyPolicyContent = {
  product: "DayKit",
  effectiveDate: "October 20, 2026",
  intro: "This policy is written for the DayKit Android app.",
  sections: [
    {
      title: "Overview",
      body: [
        "DayKit is a local-first privacy utility. The app is designed to keep user-created data on the device unless the user intentionally creates an encrypted local backup or connects Google Drive backup.",
        "This policy explains what data the app accesses, how the data is used, what is stored locally, what may be placed into encrypted backup files, and how optional permissions are used.",
      ],
    },
    {
      title: "Data Stored On The Device",
      body: [
        "Master credential: DayKit is unlocked with a numeric PIN or an alphanumeric password chosen by the user. The app stores only a salted, hardware-bound hash for verifying it. The original PIN or password is not stored.",
        "Key Store: saved key names, labels, and values are stored in the encrypted local database.",
        "Secure Notes: note titles, content, labels, and timestamps are stored in the encrypted local database.",
        "Expenses and Habits: tracker entries, bills, habit definitions, progress logs, and related timestamps are stored locally.",
        "App Lock: selected locked package names and app labels are stored locally so App Lock can continue working after app restart or device reboot.",
        "Settings: tool-lock preferences, backup preferences, selected Google account email for Drive backup, theme preferences, widget preferences, and local app configuration may be stored on the device.",
        "File Vault: selected media files are encrypted with AES-256 and stored in the app's private storage on the device, where other apps and file managers cannot read them. Each file has its own key, and those keys are protected by a key derived from the master PIN or password, so vault files cannot be decrypted without it.",
      ],
    },
    {
      title: "Backup And Google Drive",
      body: [
        "Backups are encrypted on the device before they are saved or uploaded. The backup password is used to derive the backup encryption key, and backup content is encrypted before it leaves the device.",
        "Key Store and Secure Notes are always included in encrypted backup files. Focus is also included. Expenses, Habits, File Vault, Reminders, App Lock selections, Event Light settings, and appearance/widget preferences are optional and off by default in Backup & Restore.",
        "Restoring a backup requires the master PIN or password, because it replaces the data currently on the device.",
        "DNS choices and editor cache are not included. App Lock backups contain selections, not the master PIN or Android permission grants. Restoring preferences does not enable backup options or connect a Google account.",
        "When Google Drive backup is enabled, DayKit requests access to create and manage its own backup files in the user's Google Drive. The app uploads encrypted backup files; it does not upload plain Key Store values, notes, expenses, or habits.",
        "Google account authorization is used only for the backup and restore actions chosen by the user or for automatic backup when the user enables it.",
      ],
    },
    {
      title: "Usage Access, Overlay, Notifications, And Alarms",
      body: [
        "Usage Access is used only on the device, for three features: App Lock (to detect which app is currently open so a lock challenge can be shown for locked apps), Focus (to measure today's time in apps the user put under a daily limit, and to suggest limits from recent usage), and Device Manager (to show the user their most-used and least recently used apps, based on the usage history Android keeps, up to about 90 days).",
        "App usage information is never uploaded, shared, or included in backups. Focus stores only the limits and schedules the user sets.",
        "Overlay permission is used to display a lock challenge over selected locked apps and, for Event Light, a colored border on screen during video calls.",
        "App Lock is a deterrent, not a guarantee. Because Android limits what one app can do to another, a determined person with physical access may bypass App Lock (for example via the recent-apps screen, safe mode, by revoking DayKit's permissions, or during the brief moment an app opens). App Lock does not encrypt the locked apps' own data. For strongest protection, also use your device's screen lock and, where available, per-app protections such as Secure Folder.",
        "Notification permission is used for reminders, habits, and app alerts when the user enables those features.",
        "Exact alarms and full-screen notifications are used only to fire reminders and Focus schedules at the time the user chose. Full-screen reminder alerts can be turned off in DayKit's notification settings.",
      ],
    },
    {
      title: "Network And Third Parties",
      body: [
        "DayKit uses internet access for Google Drive backup and restore when the user connects a Google account.",
        "The app uses Google sign-in/authorization components and Google Drive APIs for Drive backup operations.",
        "The Document Scanner uses Google Play services' ML Kit document scanner. Pages are captured and processed on the device, and DayKit does not upload scanned documents.",
        "The app does not sell user data. The app does not use advertising identifiers for ad targeting. The app does not intentionally share user-created vault data with third parties except when the user stores an encrypted backup in Google Drive.",
      ],
    },
    {
      title: "Security Measures",
      body: [
        "The local database is encrypted with SQLCipher. The database passphrase is randomly generated and protected using Android Keystore.",
        "Key Store entries, Secure Notes, and File Vault keys are additionally encrypted with a key derived from the master PIN or password, which is removed from memory shortly after DayKit is closed or the screen turns off.",
        "Backup files are encrypted with a password chosen by the user. If the backup password is forgotten, the backup cannot be restored.",
        "The app sets secure window flags on the main activity to reduce screenshots of sensitive screens where supported by Android.",
      ],
    },
    {
      title: "Retention And Deletion",
      body: [
        "Data remains on the device until the user deletes it inside the app, clears app data, or uninstalls the app.",
        "Encrypted Google Drive backup files remain in the user's Google Drive until deleted by the user or by backup retention behavior. DayKit keeps only recent backup files when it creates new Drive backups.",
        "Uninstalling the app or clearing app data removes local app data from the device. It does not automatically delete backup files already stored in Google Drive.",
      ],
    },
    {
      title: "User Choices",
      body: [
        "Users can choose whether to enable Usage Access, Overlay permission, notifications, exact alarms, Google Drive backup, automatic backup, and optional backup of Expenses and Habits.",
        "Users can use local encrypted backup without Google Drive by creating a local backup file.",
        "Users can stop future Drive backups by turning automatic backup off or removing the backup password.",
      ],
    },
    {
      title: "Children",
      body: [
        "DayKit is a general utility app and is not directed to children. The app does not knowingly collect children's personal information.",
      ],
    },
    {
      title: "Changes And Contact",
      body: [
        "This privacy policy may be updated as the app changes. The current policy should be available inside the app and through the Google Play listing.",
        "For privacy questions, use the developer contact information provided on the Google Play Store listing for DayKit.",
      ],
    },
  ],
};
