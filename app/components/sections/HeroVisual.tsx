"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// the WebGL chunk is split out and only fetched when we decide to mount it
const SignalField = dynamic(() => import("../three/SignalField"), {
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
 * Hero visual layer: a static CSS "field" poster is always present (it doubles
 * as the loading state, the reduced-motion experience, and the no-WebGL
 * fallback). The live SignalField canvas mounts on top only when the device
 * allows it, then fades in over the poster.
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
      <div className="hero-fallback" />
      <div className="hero-horizon" />
      {showCanvas && <SignalField />}
    </div>
  );
}
