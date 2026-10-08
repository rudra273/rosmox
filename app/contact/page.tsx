import type { Metadata } from "next";

import ContactPage from "@/components/ContactPage";

/* Contact — /contact. The navbar's "Let's talk" and every
   PRIMARY_CTA land here (lib/site.ts). */

const DESCRIPTION =
  "Talk to ROSMOX about your product, platform or business problem. Tell us what you want to build, improve or change — we reply within a day.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact ROSMOX", description: DESCRIPTION },
};

export default function Page() {
  return <ContactPage />;
}
