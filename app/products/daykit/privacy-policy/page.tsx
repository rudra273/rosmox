import type { Metadata } from "next";

import PrivacyPolicy from "@/components/PrivacyPolicy";
import { DAYKIT_PRIVACY } from "@/lib/daykit-privacy";

/* ──────────────────────────────────────────────────────────
   DayKit privacy policy — /products/daykit/privacy-policy

   Hosted public copy of the policy that ships inside the DayKit
   Android app, linked from the Google Play listing. DayKit no
   longer has a product page, so the policy stands alone (no
   productSlug → breadcrumb/back links point home). Server
   component: sets metadata; the policy body renders via the
   reusable PrivacyPolicy client component.
   ────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "DayKit Privacy Policy",
  description:
    "Privacy policy for the DayKit Android app: what data stays on your device, how encrypted backups and Google Drive work, and how optional permissions are used.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/products/daykit/privacy-policy" },
};

export default function DayKitPrivacyPolicyPage() {
  return <PrivacyPolicy content={DAYKIT_PRIVACY} accent="#fbbf24" />;
}
