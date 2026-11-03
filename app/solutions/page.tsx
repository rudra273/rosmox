import type { Metadata } from "next";

import SolutionsPage from "@/components/SolutionsPage";
import { SITE } from "@/lib/site";
import { SOLUTIONS, SOLUTIONS_HERO } from "@/lib/solutions";

/* ──────────────────────────────────────────────────────────
   Solutions route — /solutions (content: lib/solutions.ts).
   ────────────────────────────────────────────────────────── */

const DESCRIPTION =
  "Practical technology and AI solutions for growing businesses: custom websites, GST billing and inventory systems, Google Workspace email, WhatsApp automation, and custom AI assistants.";

export const metadata: Metadata = {
  title: "Solutions",
  description: DESCRIPTION,
  alternates: { canonical: "/solutions" },
  openGraph: {
    url: "/solutions",
    title: `${SOLUTIONS_HERO.eyebrow} — ${SITE.name}`,
    description: DESCRIPTION,
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} Business Solutions`,
    description: DESCRIPTION,
    url: `${SITE.url}/solutions`,
    itemListElement: SOLUTIONS.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.lead,
        url: `${SITE.url}/solutions#${s.slug}`,
        provider: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SolutionsPage />
    </>
  );
}
