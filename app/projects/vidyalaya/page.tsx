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
  title: "Vidyālaya — Offline Textbook Reader",
  description:
    "Vidyālaya is a free offline textbook reader for Indian school students. Download once, read anytime.",
  alternates: { canonical: "/projects/vidyalaya" },
};

const features = [
  {
    title: "Offline Reading",
    desc: "Download textbooks once and read anytime without an internet connection.",
  },
  {
    title: "Zero Data Collection",
    desc: "No accounts, no tracking, no analytics. Your data stays on your device.",
  },
  {
    title: "Light & Dark Mode",
    desc: "Switch between light and dark themes for comfortable reading day or night.",
  },
  {
    title: "Class-Based Organization",
    desc: "Books organized by class and subject for quick access to what you need.",
  },
  {
    title: "Bookmarks",
    desc: "Save your reading progress and jump back to where you left off.",
  },
  {
    title: "Lightweight",
    desc: "Minimal app size with efficient PDF rendering for smooth performance.",
  },
];

export default function VidyalayaPage() {
  return (
    <div className="proj-page">
      <JsonLd
        data={productJsonLd({
          name: "Vidyālaya",
          description:
            "Free offline textbook reader for Indian school students — download once, read anytime, no accounts or tracking.",
          path: "/projects/vidyalaya",
          category: "EducationalApplication",
          operatingSystem: "Android",
        })}
      />
      <CrumbBar backHref="/products" backLabel="All products" right="Spec sheet — 03/05" />
      <ProjectHero
        badge="Android"
        year="2026"
        title="Vidyālaya"
        desc="A free, offline textbook reader built for Indian school students. Download your books once, read them anytime — no internet required. No ads, no tracking, no accounts."
        logo={{ src: "/logo/vidyalaya.png", alt: "Vidyālaya app logo" }}
      >
        <StatusStamp>Coming soon — Play Store</StatusStamp>
        <Link href="/projects/vidyalaya/privacy-policy" className="btn btn-outline">
          Privacy policy
        </Link>
      </ProjectHero>

      <ProjectSection index="Spec 01" title="Screenshots">
        <Screens labels={["Screenshot 1", "Screenshot 2", "Screenshot 3"]} />
      </ProjectSection>

      <ProjectSection index="Spec 02" title="Features">
        <FeatureGrid features={features} />
      </ProjectSection>

      <ProjectSection index="Spec 03" title="Built with">
        <ChipList
          items={["Flutter", "Dart", "PDF Renderer", "SharedPreferences", "Material 3"]}
        />
      </ProjectSection>
    </div>
  );
}
