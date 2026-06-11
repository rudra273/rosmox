"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The hero centerpiece: a particle "intelligence core".
 *
 * ~2400 GPU particles arranged on a fibonacci sphere, breathing and slowly
 * rotating. The cursor steers the core (eased parallax); scrolling past the
 * hero disperses the sphere into a starfield (uScatter 0→1). One draw call
 * for the points plus a faint inner wireframe icosahedron.
 *
 * Performance contract: lazy-mounted by HeroVisual, pauses when offscreen or
 * tab-hidden, full dispose on unmount, manual performance.now() clock
 * (THREE.Clock is deprecated in three 0.184).
 */

const COUNT = 2400;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScatter;
  uniform vec2 uPointer;
  uniform float uPixelRatio;

  attribute vec3 aSphere;
  attribute vec3 aScatter;
  attribute float aSeed;

  varying float vSeed;
  varying float vDepth;

  mat3 rotY(float a) {
    float c = cos(a); float s = sin(a);
    return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
  }
  mat3 rotX(float a) {
    float c = cos(a); float s = sin(a);
    return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
  }

  void main() {
    // sphere → starfield along each particle's own ray
    vec3 pos = mix(aSphere, aScatter, uScatter);

    // breathing
    pos *= 1.0 + 0.045 * sin(uTime * 0.8 + aSeed * 6.2831);

    // slow spin + pointer steering
    pos = rotY(uTime * 0.14 + uPointer.x * 0.55) * rotX(uPointer.y * 0.35) * pos;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = (5.0 + aSeed * 7.0) * uPixelRatio;
    gl_PointSize = size * (1.0 / max(0.001, -mv.z));

    vSeed = aSeed;
    vDepth = clamp((-mv.z - 1.6) / 3.4, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vSeed;
  varying float vDepth;

  void main() {
    // soft disc
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float disc = smoothstep(0.5, 0.12, d);
    if (disc < 0.01) discard;

    vec3 indigo = vec3(0.506, 0.549, 0.973); // #818cf8
    vec3 cyan   = vec3(0.404, 0.910, 0.976); // #67e8f9
    vec3 col = mix(indigo, cyan, clamp(vSeed * 0.7 + vDepth * 0.5, 0.0, 1.0));

    float alpha = disc * (0.35 + 0.65 * (1.0 - vDepth));
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function NeuralCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // context creation failed — the CSS poster stays
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 30);
    camera.position.set(0, 0, 3.4);

    /* ---- particle attributes ---- */
    const spherePos = new Float32Array(COUNT * 3);
    const scatterPos = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);

    const GA = Math.PI * (3 - Math.sqrt(5)); // golden angle
    for (let i = 0; i < COUNT; i++) {
      // fibonacci sphere
      const t = i / (COUNT - 1);
      const y = 1 - t * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = GA * i;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      const R = 1.12;
      spherePos[i * 3] = x * R;
      spherePos[i * 3 + 1] = y * R;
      spherePos[i * 3 + 2] = z * R;

      // scatter target: same ray, pushed far out with jitter
      const out = 2.4 + Math.random() * 1.8;
      scatterPos[i * 3] = x * out + (Math.random() - 0.5) * 0.7;
      scatterPos[i * 3 + 1] = y * out + (Math.random() - 0.5) * 0.7;
      scatterPos[i * 3 + 2] = z * out + (Math.random() - 0.5) * 0.7;

      seeds[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    // position attribute is required by three even though the shader ignores it
    geometry.setAttribute("position", new THREE.BufferAttribute(spherePos, 3));
    geometry.setAttribute("aSphere", new THREE.BufferAttribute(spherePos, 3));
    geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatterPos, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScatter: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: 1 },
      },
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    /* ---- inner wireframe lattice ---- */
    const icoGeo = new THREE.IcosahedronGeometry(0.6, 1);
    const wireGeo = new THREE.WireframeGeometry(icoGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.16,
    });
    const wire = new THREE.LineSegments(wireGeo, wireMat);
    scene.add(wire);

    /* ---- state ---- */
    let raf = 0;
    let visible = true;
    let elapsed = 0;
    let last = performance.now();

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let scatterTarget = 0;
    let scatterCurrent = 0;

    const resize = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      material.uniforms.uPixelRatio.value = dpr;
    };

    const tick = () => {
      const now = performance.now();
      elapsed += (now - last) / 1000;
      last = now;

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      scatterCurrent += (scatterTarget - scatterCurrent) * 0.07;

      material.uniforms.uTime.value = elapsed;
      material.uniforms.uScatter.value = scatterCurrent;
      material.uniforms.uPointer.value.set(pointer.x, pointer.y);

      wire.rotation.y = -elapsed * 0.2 - pointer.x * 0.3;
      wire.rotation.x = elapsed * 0.08 + pointer.y * 0.2;
      wireMat.opacity = 0.16 * (1 - scatterCurrent);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      // disperse over roughly one viewport of scrolling
      const vh = window.innerHeight || 1;
      scatterTarget = Math.min(1, Math.max(0, window.scrollY / (vh * 0.9)));
    };

    resize();
    onScroll();
    start();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      icoGeo.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="core-canvas" aria-hidden="true" />;
}
