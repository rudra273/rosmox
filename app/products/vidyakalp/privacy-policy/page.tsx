import type { Metadata } from "next";

import PrivacyPolicy from "@/components/PrivacyPolicy";
import { VIDYA_PRIVACY } from "@/lib/vidya-privacy";

/* Vidya AI privacy policy — /products/vidyakalp/privacy-policy
   Hosted public copy of the in-app policy, linked from Google Play. */

export const metadata: Metadata = {
  title: "Vidya AI Privacy Policy",
  description:
    "Privacy policy for the Vidya AI Android app: what stays on your device, what Google sign-in and AI features collect, and how to delete your account.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/products/vidyakalp/privacy-policy" },
};

export default function VidyaPrivacyPolicyPage() {
  return <PrivacyPolicy content={VIDYA_PRIVACY} productSlug="vidyakalp" />;
}
