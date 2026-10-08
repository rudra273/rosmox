/* ──────────────────────────────────────────────────────────
   Storely privacy policy content.

   Single source of truth for /products/storely/privacy-policy —
   the hosted public copy of the policy for the Storely Android
   app, linked from the Google Play listing. Migrated from the
   previous site (/projects/storely/privacy-policy).
   ────────────────────────────────────────────────────────── */

import type { PrivacyPolicyContent } from "@/lib/policy";

export const STORELY_PRIVACY: PrivacyPolicyContent = {
  product: "Storely",
  effectiveDate: "April 29, 2026",
  intro: "This policy is written for the Storely Android app.",
  sections: [
    {
      title: "Introduction",
      body: [
        "Storely is designed to help store owners manage inventory and billing. This Privacy Policy explains how the app handles the information you enter.",
      ],
    },
    {
      title: "Data Stored Locally",
      body: [
        "By default, the information you enter is stored locally on your device. Storely does not operate its own server to collect this data. Local data may include:",
        "• Store details, such as shop name and settings.",
        "• Product details, such as name, price, quantity, unit, barcode, category, and supplier.",
        "• Supplier and customer details that you choose to enter, such as names, phone numbers, email addresses, GSTIN, and balances.",
        "• Billing information created in the app, including bill items, totals, payment status, and payment method.",
        "• Imported CSV or Excel product data and exported or shared PDF bills.",
      ],
    },
    {
      title: "Optional User-Configured Cloud Sync",
      body: [
        "Storely can be used completely offline. Cloud Sync is optional and works only when you configure the app with your own Supabase project URL and anon public key.",
        "• Storely does not provide or control the Supabase project used for Cloud Sync.",
        "• Storely does not receive, access, sell, or manage the data synced to your Supabase project.",
        "• If you enable Cloud Sync, the data you choose to sync is sent from your device to the Supabase project configured by you.",
        "• Supabase authentication in your own project may use your email address to create and manage the account used for sync.",
        "• Your use of Supabase is governed by your Supabase project settings and Supabase's privacy policy: https://supabase.com/privacy.",
        "• You are responsible for ensuring you have the legal right to store or sync any store, customer, supplier, product, and billing data that you enter into Storely.",
      ],
    },
    {
      title: "Permissions Used",
      body: [
        "• Camera: Used exclusively for scanning barcodes and QR codes. Camera images are not saved by Storely or uploaded by Storely for this feature.",
        "• Network State & Internet: Used to check connectivity and synchronize data to your configured Supabase project.",
        "• Storage/Files: Used to import or export Excel/CSV files and save or share PDF bills selected or created by you.",
      ],
    },
    {
      title: "Data Sharing",
      body: [
        "Storely does not sell your personal data. Storely does not contain advertising SDKs or third-party trackers. Storely does not share data with third parties by default.",
        "• If you enable Cloud Sync, data is sent to the Supabase project configured by you. Storely does not operate that cloud project and does not collect that data on Storely-owned servers.",
        "• If you export a file or share a bill through another app, the information you share is governed by that app's privacy policy.",
      ],
    },
    {
      title: "Data Security",
      body: [
        "Because data is stored on your device by default, you are responsible for securing access to your device. If using Cloud Sync, you are responsible for securely managing your Supabase project, access rules, authentication settings, and anon public key.",
      ],
    },
    {
      title: "Data Deletion & Retention",
      body: [
        "• Local Data: You can delete all your local data at any time by uninstalling the Storely app or clearing the app data in your device settings.",
        "• Cloud Data: If you enabled Cloud Sync, cloud data is stored in the Supabase project configured by you. You can delete cloud data, users, and authentication records from your Supabase project dashboard.",
        "• Storely Server Data: Storely does not operate a Storely-owned backend for collecting your app data, so Storely does not hold a separate copy of your shop, product, supplier, customer, or bill records.",
        "• Assistance: For privacy questions or help understanding deletion steps, contact rosmoxx@gmail.com.",
      ],
    },
    {
      title: "Children's Privacy",
      body: [
        "Storely is a business tool and is not designed for children under 13.",
      ],
    },
    {
      title: "Policy Updates",
      body: [
        "This Privacy Policy may be updated in future releases. Any changes will be reflected in the latest app version and the Play Store listing.",
      ],
    },
    {
      title: "Contact",
      body: [
        "For any privacy-related questions, data deletion requests, or concerns, contact us at: rosmoxx@gmail.com.",
      ],
    },
  ],
};
