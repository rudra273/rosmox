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

/** The studio's services, for the home page. */
export function servicesJsonLd() {
  const services = [
    ["AI SaaS product development", "Multi-tenant SaaS platforms with AI built into the product core."],
    ["Agentic AI systems", "Tool-using AI agents with guardrails, evals, and traces, integrated into existing stacks."],
    ["Android app development", "Native Kotlin and Jetpack Compose apps, including on-device AI."],
    ["Web platform development", "Marketing sites, dashboards, and storefronts — fast, semantic, accessible."],
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
