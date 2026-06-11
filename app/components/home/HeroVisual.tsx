"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// the three.js chunk is split out and only fetched when we decide to mount it
const NeuralCore = dynamic(() => import("../three/NeuralCore"), {
  ssr: false,
});

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * Hero visual layer. A CSS "core poster" (glow + rings) is always present —
 * it doubles as the loading state, the reduced-motion experience, and the
 * no-WebGL fallback. The live particle core mounts on top when allowed.
 */
export default function HeroVisual() {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !webglAvailable()) return;
    // defer one frame: keeps the first paint cheap and the LCP text-first
    const raf = requestAnimationFrame(() => setShowCanvas(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="core-glow" />
      <div className="core-poster">
        <span />
        <span />
        <span />
      </div>
      {showCanvas && <NeuralCore />}
    </div>
  );
}
