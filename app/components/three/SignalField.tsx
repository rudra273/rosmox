"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The Rosmox signal field — the hero's signature WebGL vignette.
 *
 * A plane of points displaced entirely in the vertex shader (layered waves +
 * a traveling "signal" ridge + a pointer ripple). One draw call, zero
 * per-frame CPU attribute writes. Pauses when offscreen or the tab is hidden,
 * and disposes everything on unmount. The wrapper (HeroVisual) only mounts
 * this when WebGL is available and the user allows motion.
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;       // world-space x/z of the pointer on the field
  uniform float uPointerForce; // eases toward 1 while the pointer is active
  uniform float uPixelRatio;

  varying float vGlow;
  varying float vFade;

  void main() {
    vec3 p = position;

    // layered travelling waves — the ambient "thinking" of the field
    float h = 0.0;
    h += 0.42 * sin(p.x * 0.45 + uTime * 0.55) * sin(p.z * 0.35 + uTime * 0.38);
    h += 0.18 * sin(p.x * 1.25 - uTime * 0.72 + p.z * 0.5);
    h += 0.10 * sin(p.z * 2.10 + uTime * 0.9);

    // the signal — a luminous ridge sweeping across the field
    float signalX = mod(uTime * 1.6, 36.0) - 18.0;
    float signal = exp(-pow(p.x - signalX, 2.0) * 0.22);
    h += signal * 0.55;

    // pointer ripple — the field answers the cursor
    float pd = distance(p.xz, uPointer);
    float ripple = exp(-pd * 0.55) * sin(pd * 2.6 - uTime * 3.2);
    h += ripple * 0.34 * uPointerForce;

    p.y += h;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // brightness follows elevation + the signal ridge + pointer energy
    vGlow = clamp(h * 0.45 + signal * 0.6 + exp(-pd * 0.8) * 0.4 * uPointerForce, 0.0, 0.85);

    // fade toward the horizon and the side edges
    float edgeX = smoothstep(18.0, 10.0, abs(position.x));
    float edgeZ = smoothstep(-20.0, -14.0, position.z) * smoothstep(3.0, -1.0, position.z);
    vFade = edgeX * edgeZ;

    gl_PointSize = min((1.2 + vGlow * 2.4) * uPixelRatio * (110.0 / -mv.z), 26.0);
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;

  varying float vGlow;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.12, d);

    // quiet steel-blue base -> electric signal accent
    vec3 base = vec3(0.32, 0.40, 0.55);
    vec3 accent = vec3(0.42, 0.66, 1.0);
    vec3 color = mix(base, accent, vGlow);

    float alpha = disc * vFade * (0.11 + vGlow * 0.5);
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const host = canvas.parentElement as HTMLElement;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 1.75);

    // the canvas is CSS-sized (bottom band of the hero) — measure it, not the host
    const cw = () => canvas.clientWidth || host.clientWidth;
    const ch = () => canvas.clientHeight || host.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, cw() / ch(), 0.1, 80);
    const baseCamY = isMobile ? 2.0 : 1.7;
    camera.position.set(0, baseCamY, 7.5);
    camera.lookAt(0, 0.2, -7);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return; // context creation failed — the CSS fallback stays visible
    }
    renderer.setPixelRatio(dpr);
    renderer.setSize(cw(), ch(), false);
    renderer.setClearColor(0x000000, 0);

    // point grid: x across the viewport, z receding to the horizon
    const COLS = isMobile ? 90 : 150;
    const ROWS = isMobile ? 60 : 90;
    const W = 36;
    const D = 24;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions[i++] = (c / (COLS - 1) - 0.5) * W;        // x: -18..18
        positions[i++] = 0;
        positions[i++] = (r / (ROWS - 1)) * -D + 3;          // z: 3..-21
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, -30) },
      uPointerForce: { value: 0 },
      uPixelRatio: { value: dpr },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // — pointer: project the cursor onto the field plane (y = 0) —
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const ndc = new THREE.Vector2();
    const hit = new THREE.Vector3();
    const targetPointer = new THREE.Vector2(0, -30);
    let pointerActive = false;
    let camTargetX = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) {
        pointerActive = false;
        return;
      }
      ndc.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      );
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        targetPointer.set(hit.x, hit.z);
        pointerActive = true;
        camTargetX = ndc.x * 0.45;
      }
    };
    const onPointerLeave = () => {
      pointerActive = false;
      camTargetX = 0;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    // — render loop with offscreen/hidden pause —
    let raf = 0;
    let running = false;
    let inView = true;
    // manual clock (THREE.Clock is deprecated) — pauses while stopped
    let elapsed = 0;
    let last = 0;

    const tick = () => {
      const now = performance.now() / 1000;
      elapsed += now - last;
      last = now;
      uniforms.uTime.value = elapsed;

      // ease the pointer + its force, sway the camera
      uniforms.uPointer.value.lerp(targetPointer, 0.08);
      uniforms.uPointerForce.value +=
        ((pointerActive ? 1 : 0) - uniforms.uPointerForce.value) * 0.05;
      camera.position.x += (camTargetX - camera.position.x) * 0.04;

      // gentle parallax against the page scroll
      const sc = Math.min(window.scrollY, 900);
      camera.position.y = baseCamY + sc * 0.0012;
      camera.lookAt(0, 0.2, -7);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!running && inView && !document.hidden) {
        running = true;
        last = performance.now() / 1000;
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 }
    );
    observer.observe(host);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      camera.aspect = cw() / ch();
      camera.updateProjectionMatrix();
      renderer.setSize(cw(), ch(), false);
    };
    window.addEventListener("resize", onResize);

    // fade the canvas in once the first frame is committed
    renderer.render(scene, camera);
    canvas.classList.add("ready");
    start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
