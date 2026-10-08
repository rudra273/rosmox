import type { Metadata } from "next";

import PrivacyPolicy from "@/components/PrivacyPolicy";
import { ROSMOX_PRIVACY } from "@/lib/roxmos-privacy";

/* ROSMOX company privacy policy — /privacy (content: lib/roxmos-privacy.ts) */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the ROSMOX website handles your information: what the contact form collects, who processes it, cookieless analytics, and your rights.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyPolicy content={ROSMOX_PRIVACY} />;
}
