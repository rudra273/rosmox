import type { Metadata } from "next";

import PrivacyPolicy from "@/components/PrivacyPolicy";
import { STORELY_PRIVACY } from "@/lib/storely-privacy";

/* Storely privacy policy — /products/storely/privacy-policy
   Hosted public copy of the in-app policy, linked from Google Play. */

export const metadata: Metadata = {
  title: "Storely Privacy Policy",
  description:
    "Privacy policy for the Storely Android app: local inventory and billing data, optional user-configured cloud sync, and permissions.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/products/storely/privacy-policy" },
};

export default function StorelyPrivacyPolicyPage() {
  return <PrivacyPolicy content={STORELY_PRIVACY} productSlug="storely" />;
}
