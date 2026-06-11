const SITE_URL = "https://rosmox.com";

/** Renders a JSON-LD structured-data script tag. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ProductJsonLdArgs {
  name: string;
  description: string;
  path: string;
  category: string;
  operatingSystem?: string;
}

/** SoftwareApplication + BreadcrumbList for a product page. */
export function productJsonLd({
  name,
  description,
  path,
  category,
  operatingSystem,
}: ProductJsonLdArgs) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name,
        description,
        url: `${SITE_URL}${path}`,
        applicationCategory: category,
        ...(operatingSystem ? { operatingSystem } : {}),
        author: { "@type": "Organization", name: "Rosmox", url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
          { "@type": "ListItem", position: 3, name, item: `${SITE_URL}${path}` },
        ],
      },
    ],
  };
}

/** The company's services, for the home page. */
export function servicesJsonLd() {
  const services = [
    ["AI SaaS platform development", "Complete AI products — multi-tenant architecture, model orchestration, billing, and analytics."],
    ["Agentic AI systems", "Autonomous agents with tool use, guardrails, evaluations, and full traces, integrated into existing stacks."],
    ["Android engineering", "Native Kotlin and Jetpack Compose apps with on-device AI — private and offline-capable."],
    ["Web platform development", "High-performance marketing sites, dashboards, and storefronts — accessible and search-ready."],
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Rosmox services",
    itemListElement: services.map(([name, description], i) => ({
      "@type": "Service",
      position: i + 1,
      name,
      description,
      provider: { "@type": "Organization", name: "Rosmox", url: SITE_URL },
    })),
  };
}
