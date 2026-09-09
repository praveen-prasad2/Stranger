"use client";

import { useRef, useState } from "react";
import { registerGsap, gsap, prefersReducedMotion } from "@/lib/gsap";
import { teasing } from "@/app/content";
import { Chapter } from "../Chapter";
import { Reveal } from "../Reveal";

export function Teasing() {
  const s = teasing();
  const headline = useRef<HTMLDivElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const [confirmed, setConfirmed] = useState(false);

  const react = () => {
    setConfirmed(true);
    if (prefersReducedMotion()) return;
    registerGsap();

    gsap.fromTo(
      headline.current,
      { x: -12, rotate: -1 },
      { x: 0, rotate: 0, duration: 1.1, ease: "elastic.out(1, 0.3)" },
    );

    const host = burst.current;
    if (!host) return;
    for (let i = 0; i < 22; i++) {
      const p = document.createElement("span");
      Object.assign(p.style, {
        position: "absolute",
        left: "0",
        top: "0",
        width: `${3 + Math.random() * 5}px`,
        height: `${2 + Math.random() * 3}px`,
        borderRadius: "1px",
        background: i % 3 === 0 ? "var(--gold-light)" : "var(--gold)",
        pointerEvents: "none",
      });
      host.appendChild(p);
      const a = Math.random() * Math.PI * 2;
      const d = 40 + Math.random() * 150;
      gsap.to(p, {
        x: Math.cos(a) * d,
        y: Math.sin(a) * d + 30,
        rotation: Math.random() * 540,
        opacity: 0,
        duration: 1 + Math.random() * 0.9,
        ease: "power2.out",
        onComplete: () => p.remove(),
      });
    }
  };

  return (
    <Chapter id="teasing" num="02" eyebrow={s.eyebrow}>
      <div ref={headline} style={{ display: "inline-block", position: "relative" }}>
        <div
          ref={burst}
          aria-hidden
          style={{ position: "absolute", left: "1.5rem", top: "50%" }}
        />
        <Reveal as="h2" className="display h2" split="words" stagger={50}>
          {s.headline}
        </Reveal>
      </div>

      <Reveal as="p" className="body body--lead" delay={120} style={{ marginTop: "1.75rem" }}>
        {s.body}
      </Reveal>

      <Reveal as="div" delay={220} style={{ marginTop: "2.25rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.25rem" }}>
        <button className="btn btn--ghost" onClick={react}>
          {s.interaction.button_text}
        </button>
        {confirmed && (
          <span className="quote" style={{ fontSize: "1.15rem" }}>
            Evidence confirmed.
          </span>
        )}
      </Reveal>
    </Chapter>
  );
}
