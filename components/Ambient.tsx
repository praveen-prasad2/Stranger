"use client";

import { useEffect, useRef } from "react";

/**
 * The single unifying visual: one soft light that travels — and warms — as she
 * reads, from a dusk glow in the upper corner down to a sunrise low on the
 * screen. Also draws the hair-thin scroll-progress rule. One rAF loop.
 */
const STOPS: { x: number; y: number; c: [number, number, number, number] }[] = [
  { x: 74, y: 16, c: [230, 192, 90, 0.3] }, // dusk gold
  { x: 62, y: 26, c: [206, 156, 74, 0.26] }, // warm teasing
  { x: 52, y: 34, c: [230, 200, 120, 0.32] }, // celebration
  { x: 38, y: 46, c: [140, 40, 55, 0.2] }, // the honest chapter — deeper
  { x: 50, y: 58, c: [210, 170, 92, 0.26] }, // reassurance, lifting
  { x: 50, y: 74, c: [232, 202, 112, 0.34] }, // personal note
  { x: 50, y: 88, c: [240, 214, 128, 0.4] }, // sunrise finale
];

function sample(p: number) {
  const seg = Math.min(STOPS.length - 2, Math.floor(p * (STOPS.length - 1)));
  const t = p * (STOPS.length - 1) - seg;
  const a = STOPS[seg];
  const b = STOPS[seg + 1];
  const lerp = (u: number, v: number) => u + (v - u) * t;
  return {
    x: lerp(a.x, b.x),
    y: lerp(a.y, b.y),
    c: [
      lerp(a.c[0], b.c[0]),
      lerp(a.c[1], b.c[1]),
      lerp(a.c[2], b.c[2]),
      lerp(a.c[3], b.c[3]),
    ],
  };
}

export function Ambient() {
  const aura = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = { x: 74, y: 16, c: [230, 192, 90, 0.3] };
    let raf = 0;

    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const target = sample(p);

      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      for (let i = 0; i < 4; i++) cur.c[i] += (target.c[i] - cur.c[i]) * 0.06;

      if (aura.current) {
        aura.current.style.setProperty("--aura-x", `${cur.x.toFixed(2)}%`);
        aura.current.style.setProperty("--aura-y", `${cur.y.toFixed(2)}%`);
        aura.current.style.setProperty(
          "--aura-color",
          `rgba(${cur.c[0].toFixed(0)}, ${cur.c[1].toFixed(0)}, ${cur.c[2].toFixed(0)}, ${cur.c[3].toFixed(3)})`,
        );
      }
      if (bar.current) bar.current.style.setProperty("--sx", p.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div ref={aura} className="aura" aria-hidden />
      <div ref={bar} className="progress" aria-hidden />
    </>
  );
}
