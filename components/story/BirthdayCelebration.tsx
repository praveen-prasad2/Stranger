"use client";

import { useRef, useState } from "react";
import { registerGsap, gsap, prefersReducedMotion } from "@/lib/gsap";
import { birthday } from "@/app/content";
import { Chapter } from "../Chapter";
import { Reveal } from "../Reveal";

const HIDDEN_LINE = "Your wish has officially entered the universe. No refunds.";

export function BirthdayCelebration() {
  const s = birthday();
  const [out, setOut] = useState(false);
  const bloom = useRef<HTMLDivElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const hidden = useRef<HTMLParagraphElement>(null);

  const blowOut = () => {
    if (out) return;
    setOut(true);
    window.dispatchEvent(
      new CustomEvent("ambient-mood", { detail: { detune: 7, cutoff: 900 } }),
    );

    if (prefersReducedMotion()) {
      gsap.set(hidden.current, { opacity: 1, y: 0 });
      return;
    }
    registerGsap();

    gsap
      .timeline()
      .fromTo(
        bloom.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1.3, duration: 0.45, ease: "power2.out" },
      )
      .to(bloom.current, { opacity: 0, duration: 1.5, ease: "power2.out" })
      .fromTo(
        hidden.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=1.1",
      );

    const host = burst.current;
    if (host) {
      for (let i = 0; i < 30; i++) {
        const p = document.createElement("span");
        Object.assign(p.style, {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: `${3 + Math.random() * 5}px`,
          height: `${3 + Math.random() * 5}px`,
          borderRadius: "50%",
          background: i % 3 === 0 ? "var(--gold-light)" : "var(--gold)",
          pointerEvents: "none",
        });
        host.appendChild(p);
        const a = Math.random() * Math.PI * 2;
        const d = 100 + Math.random() * 380;
        gsap.to(p, {
          x: Math.cos(a) * d,
          y: Math.sin(a) * d,
          opacity: 0,
          duration: 1.5 + Math.random() * 1.3,
          ease: "power2.out",
          onComplete: () => p.remove(),
        });
      }
    }
  };

  return (
    <Chapter id="birthday-celebration" num="03" eyebrow={s.eyebrow} center>
      <div
        ref={bloom}
        aria-hidden
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          width: "70vmax",
          height: "70vmax",
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 3,
          background:
            "radial-gradient(circle, rgba(230,213,168,0.85), rgba(193,148,63,0.3) 35%, transparent 70%)",
        }}
      />
      <div
        ref={burst}
        aria-hidden
        style={{ position: "fixed", inset: 0, zIndex: 3, pointerEvents: "none" }}
      />

      <Reveal as="h2" className="display h1" split="words" stagger={44}>
        {s.headline}
      </Reveal>
      <Reveal as="p" className="body body--lead" delay={120} style={{ marginTop: "1.5rem" }}>
        {s.body}
      </Reveal>

      <Reveal
        as="div"
        delay={260}
        style={{ marginTop: "2.5rem", display: "grid", justifyItems: "center", gap: "0.5rem" }}
      >
        <button
          className="candle"
          onClick={blowOut}
          data-out={out}
          aria-label={out ? "The candle is out" : "Blow out the candle"}
          disabled={out}
        >
          <span className="candle__flame" />
        </button>
        <span
          className="eyebrow"
          style={{
            fontSize: "0.66rem",
            opacity: out ? 0 : 0.8,
            transition: "opacity .4s",
          }}
        >
          Make a wish · tap the flame
        </span>
      </Reveal>

      <p
        ref={hidden}
        className="quote"
        style={{ marginInline: "auto", marginTop: "1.75rem", opacity: 0, fontSize: "1.25rem" }}
      >
        {HIDDEN_LINE}
      </p>
    </Chapter>
  );
}
