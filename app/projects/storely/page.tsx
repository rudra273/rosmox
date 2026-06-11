import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { productJsonLd } from "../../components/JsonLd";
import {
  ChipList,
  CrumbBar,
  FeatureGrid,
  ProjectHero,
  ProjectSection,
  Screens,
  StatusStamp,
} from "../../components/project/ProjectKit";

export const metadata: Metadata = {
  title: "Storely — Inventory and Billing",
  description:
    "Storely helps store owners manage inventory, products, billing, barcode scanning, and local records.",
  alternates: { canonical: "/projects/storely" },
};

const features = [
  {
    title: "Inventory Management",
    desc: "Manage product names, prices, quantities, categories, suppliers, and barcodes.",
  },
  {
    title: "Billing",
    desc: "Create bills inside the app and keep billing records on the device.",
  },
  {
    title: "Barcode and QR Scanning",
    desc: "Use the camera only when scanning product barcodes and QR codes.",
  },
  {
    title: "Import and Export",
    desc: "Work with invoices, CSV or Excel files, and QR sheets through file access.",
  },
  {
    title: "Local Storage",
    desc: "No account, cloud sync, or server storage is required in version 1.0.0.",
  },
  {
    title: "No Advertising SDK",
    desc: "Version 1.0.0 does not include an advertising SDK or default third-party sharing.",
  },
];

export default function StorelyPage() {
  return (
    <div className="proj-page">
      <JsonLd
        data={productJsonLd({
          name: "Storely",
          description:
            "Inventory and billing management for store owners — products, stock, barcodes, bills, and local business records.",
          path: "/projects/storely",
          category: "BusinessApplication",
          operatingSystem: "Android",
        })}
      />
      <CrumbBar backHref="/products" backLabel="All products" right="Product 04 / 05" />
      <ProjectHero
        badge="Android"
        year="2026"
        title="Storely"
        desc="Inventory and billing management for store owners. Track products, scan barcodes, create bills, and keep business records locally on the device."
        logo={{ src: "/logo/storely.png", alt: "Storely app logo" }}
      >
        <StatusStamp>Coming soon — Play Store</StatusStamp>
        <Link href="/projects/storely/privacy-policy" className="btn btn-glass">
          Privacy policy
        </Link>
      </ProjectHero>

      <ProjectSection index="01" title="Features">
        <FeatureGrid features={features} />
      </ProjectSection>

      <ProjectSection index="02" title="Screenshots">
        <Screens labels={["Screenshot 1", "Screenshot 2", "Screenshot 3"]} />
      </ProjectSection>

      <ProjectSection index="03" title="Built with">
        <ChipList
          items={["Flutter", "Dart", "Local Database", "Barcode Scanner", "File Export"]}
        />
      </ProjectSection>
    </div>
  );
}
