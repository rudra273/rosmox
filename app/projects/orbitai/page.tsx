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
  title: "OrbitAI — On-Device AI Assistant",
  description:
    "OrbitAI is an advanced on-device AI chat and productivity assistant for Android. Private, fast, and offline-capable.",
  alternates: { canonical: "/projects/orbitai" },
};

const features = [
  {
    title: "On-Device LLM Chat",
    desc: "Private, fast, and offline-capable AI chat using MediaPipe and LiteRtLm engines. No cloud dependency.",
  },
  {
    title: "Retrieval-Augmented Generation",
    desc: "Enhanced responses by embedding and searching your own data locally. Your knowledge, your device.",
  },
  {
    title: "Floating Bubble Assistant",
    desc: "A floating overlay assistant accessible from any app. Get AI help without switching context.",
  },
  {
    title: "Multiple Modes",
    desc: "Switch between chat, spaces (knowledge bases), and custom modes for different workflows.",
  },
  {
    title: "Productivity Tools",
    desc: "Built-in reminders, task management, and automation tools powered by local AI.",
  },
  {
    title: "Complete Privacy",
    desc: "Everything runs on-device. No data leaves your phone. No accounts required.",
  },
];

export default function OrbitAIPage() {
  return (
    <div className="proj-page">
      <JsonLd
        data={productJsonLd({
          name: "OrbitAI",
          description:
            "On-device AI chat and productivity assistant for Android with local LLM inference, RAG, and automation tools.",
          path: "/projects/orbitai",
          category: "ProductivityApplication",
          operatingSystem: "Android",
        })}
      />
      <CrumbBar backHref="/products" backLabel="All products" right="Product 02 / 05" />
      <ProjectHero
        badge="Android"
        year="2026"
        title="OrbitAI"
        desc="An advanced on-device AI chat and productivity assistant for Android. Built with Jetpack Compose and modern Kotlin — leveraging local LLM inference, RAG, and a suite of productivity tools, all running privately on your device."
      >
        <StatusStamp>Coming soon — Play Store</StatusStamp>
        <Link href="/contact" className="btn btn-glass">
          Get notified
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
          items={["Kotlin", "Jetpack Compose", "MediaPipe", "LiteRT", "Room DB", "Material 3"]}
        />
      </ProjectSection>
    </div>
  );
}
