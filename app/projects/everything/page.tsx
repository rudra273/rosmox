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
  title: "Everything — Local-First Privacy Utility",
  description:
    "Everything is a local-first privacy utility for Android. Your data stays on the device by default, with encrypted backups and granular permission control.",
  alternates: { canonical: "/projects/everything" },
};

const features = [
  {
    title: "Local-First by Default",
    desc: "Your data lives on your device. Nothing is uploaded unless you explicitly create a backup or connect a sync target.",
  },
  {
    title: "Encrypted Backups",
    desc: "Create encrypted local backup files you control, or connect Google Drive for optional encrypted off-device copies.",
  },
  {
    title: "Granular Permissions",
    desc: "Accessibility, usage access, overlay, notifications, and device admin are all opt-in and clearly explained before use.",
  },
  {
    title: "No Tracking, No Selling",
    desc: "Everything does not sell user data and ships without third-party analytics or advertising SDKs.",
  },
  {
    title: "Transparent Storage",
    desc: "See exactly what is stored on-device and what may be placed into a backup file — no hidden collection.",
  },
  {
    title: "You Decide",
    desc: "Delete data, revoke permissions, or remove backups at any time. The controls are yours, end to end.",
  },
];

const tech = ["Kotlin", "Jetpack Compose", "Room DB", "EncryptedFile", "Drive API", "Material 3"];

export default function EverythingPage() {
  return (
    <div className="proj-page">
      <JsonLd
        data={productJsonLd({
          name: "Everything",
          description:
            "Local-first privacy utility for Android — encrypted backups, optional Drive sync, and granular permission control.",
          path: "/projects/everything",
          category: "UtilitiesApplication",
          operatingSystem: "Android",
        })}
      />
      <CrumbBar backHref="/products" backLabel="All products" right="Spec sheet — 05/05" />
      <ProjectHero
        badge="Privacy · Local-First"
        year="2026"
        title="Everything"
        desc="A local-first privacy utility for your whole device. Everything keeps user-created data on the device unless you intentionally create an encrypted local backup or connect Google Drive — with clear, opt-in control over every permission it touches."
      >
        <StatusStamp>Coming soon — Play Store</StatusStamp>
        <Link href="/projects/everything/privacy-policy" className="btn btn-outline">
          Privacy policy
        </Link>
      </ProjectHero>

      <ProjectSection index="Spec 01" title="Features">
        <FeatureGrid features={features} />
      </ProjectSection>

      <ProjectSection index="Spec 02" title="In action">
        <Screens labels={["Dashboard", "Permissions", "Backups"]} />
      </ProjectSection>

      <ProjectSection index="Spec 03" title="Built with">
        <ChipList items={tech} />
      </ProjectSection>
    </div>
  );
}
