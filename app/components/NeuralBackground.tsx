"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Neural-mesh background — 1:1 port of draft1's Three.js script.
 * Morphs a Fibonacci-sphere of points/lines through grid -> explode states
 * driven by page scroll, with a camera "dive" during the pinned interlude.
 * Reads the #interlude element + writes #interludePct / the .bar --p var,
 * exactly as draft1 did.
 */
export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const NODE_COUNT = isMobile ? 90 : 180;
    const radius = 2.4;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const basePositions: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      basePositions.push(
        new THREE.Vector3(
          Math.cos(theta) * r * radius,
          y * radius,
          Math.sin(theta) * r * radius
        )
      );
    }
    const gridPositions = basePositions.map((_, i) => {
      const cols = isMobile ? 9 : 14;
      const rows = Math.ceil(NODE_COUNT / cols);
      const col = i % cols;
      const row = Math.floor(i / cols);
      return new THREE.Vector3(
        (col - (cols - 1) / 2) * 0.5,
        (row - (rows - 1) / 2) * 0.5,
        (Math.random() - 0.5) * 0.4
      );
    });
    const explodePositions = basePositions.map((v) =>
      v
        .clone()
        .multiplyScalar(1.7)
        .add(
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.8
          )
        )
    );
    const currentPositions = basePositions.map((v) => v.clone());

    const pointsGeo = new THREE.BufferGeometry();
    const pointsArr = new Float32Array(NODE_COUNT * 3);
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(pointsArr, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: isMobile ? 0.045 : 0.05,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    const connections: [number, number][] = [];
    const maxDist = 1.05;
    for (let i = 0; i < NODE_COUNT; i++)
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (basePositions[i].distanceTo(basePositions[j]) < maxDist)
          connections.push([i, j]);
      }
    const lineGeo = new THREE.BufferGeometry();
    const linePosArr = new Float32Array(connections.length * 6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePosArr, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4f8dff,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Interlude tracking
    const interludeEl = document.getElementById("interlude");
    const interludePctEl = document.getElementById("interludePct");
    let interludeProgress = 0; // 0..1 while interlude is in viewport
    let scrollProgress = 0;
    let targetMorph = 0;
    let currentMorph = 0;
    let zoomBoost = 0; // for the pinned interlude

    function updateScroll() {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / max));

      if (interludeEl) {
        const rect = interludeEl.getBoundingClientRect();
        const total = interludeEl.offsetHeight - window.innerHeight;
        let p = -rect.top / total;
        p = Math.max(0, Math.min(1, p));
        interludeProgress = p;
        if (interludePctEl)
          interludePctEl.textContent = String(Math.floor(p * 100)).padStart(2, "0");
        const bar = document.querySelector<HTMLElement>(".interlude-progress .bar");
        if (bar) bar.style.setProperty("--p", p * 100 + "%");
      }

      if (scrollProgress < 0.2) targetMorph = 0;
      else if (scrollProgress < 0.45) targetMorph = (scrollProgress - 0.2) / 0.25;
      else if (scrollProgress < 0.75) targetMorph = 1 + (scrollProgress - 0.45) / 0.3;
      else targetMorph = 2 - ((scrollProgress - 0.75) / 0.25) * 2;

      const z =
        interludeProgress < 0.5 ? interludeProgress * 2 : (1 - interludeProgress) * 2;
      zoomBoost = z; // 0..1
    }
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    let mx = 0,
      my = 0,
      tmx = 0,
      tmy = 0;
    const onMouseMove = (e: MouseEvent) => {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
    };
    if (!isMobile) window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let rafId = 0;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      currentMorph += (targetMorph - currentMorph) * 0.04;
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;

      const phase = currentMorph;
      for (let i = 0; i < NODE_COUNT; i++) {
        let target: THREE.Vector3;
        if (phase <= 1) target = basePositions[i].clone().lerp(gridPositions[i], phase);
        else target = gridPositions[i].clone().lerp(explodePositions[i], phase - 1);
        target.x += Math.sin(t * 0.4 + i) * 0.03;
        target.y += Math.cos(t * 0.35 + i * 0.7) * 0.03;
        currentPositions[i].lerp(target, 0.06);
        pointsArr[i * 3] = currentPositions[i].x;
        pointsArr[i * 3 + 1] = currentPositions[i].y;
        pointsArr[i * 3 + 2] = currentPositions[i].z;
      }
      pointsGeo.attributes.position.needsUpdate = true;

      for (let k = 0; k < connections.length; k++) {
        const [a, b] = connections[k];
        linePosArr[k * 6] = currentPositions[a].x;
        linePosArr[k * 6 + 1] = currentPositions[a].y;
        linePosArr[k * 6 + 2] = currentPositions[a].z;
        linePosArr[k * 6 + 3] = currentPositions[b].x;
        linePosArr[k * 6 + 4] = currentPositions[b].y;
        linePosArr[k * 6 + 5] = currentPositions[b].z;
      }
      lineGeo.attributes.position.needsUpdate = true;

      const rotY = t * 0.05 + scrollProgress * Math.PI * 0.6 + mx * 0.4;
      const rotX = scrollProgress * 0.3 + my * 0.25;
      points.rotation.y = rotY;
      points.rotation.x = rotX;
      lines.rotation.y = rotY;
      lines.rotation.x = rotX;

      const baseZ = 7 + scrollProgress * 1.5 - Math.sin(t * 0.3) * 0.1;
      camera.position.z = baseZ - zoomBoost * 4.5;

      lineMat.opacity = 0.1 + zoomBoost * 0.25 + 0.04 * Math.sin(t * 0.8);
      pointsMat.opacity = 0.85 + zoomBoost * 0.15;
      lineMat.color.setHSL(0.6 - zoomBoost * 0.1, 1 - zoomBoost * 0.7, 0.6 + zoomBoost * 0.2);

      renderer.render(scene, camera);
    }
    const readyTimer = window.setTimeout(() => canvas.classList.add("ready"), 200);
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(readyTimer);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      pointsGeo.dispose();
      pointsMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="neural" ref={canvasRef} />;
}
