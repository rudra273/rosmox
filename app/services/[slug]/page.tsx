import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServiceDetail from "@/components/ServiceDetail";
import { getService, SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

/* ──────────────────────────────────────────────────────────
   Service detail route — /services/[slug]

   Server component: resolves the slug, sets metadata + Service
   JSON-LD, and prerenders one static page per service. The
   animated body lives in the ServiceDetail client component.
   ────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  const path = `/services/${service.slug}`;
  return {
    title: service.title, // "%s — ROSMOX" template comes from the root layout
    description: service.desc,
    alternates: { canonical: path },
    openGraph: { url: path, title: service.title, description: service.desc },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.desc,
    url: `${SITE.url}/services/${service.slug}`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetail service={service} />
    </>
  );
}
