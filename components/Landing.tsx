"use client";

import { useRef, useState } from "react";
import { registerGsap, gsap, prefersReducedMotion } from "@/lib/gsap";
import { useSmoothScroll } from "./SmoothScroll";
import { birthdayPerson, author } from "@/app/content";

/**
 * The cover. One line, one button. Tapping "Open the surprise" blooms a warm
 * light that wipes away to the letter beneath.
 */
export function Landing({ onOpen }: { onOpen: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const [busy, setBusy] = useState(false);
  const { start } = useSmoothScroll();

  const open = () => {
    if (busy) return;
    setBusy(true);
    registerGsap();

    if (prefersReducedMotion()) {
      start();
      onOpen();
      setGone(true);
      return;
    }

    gsap
      .timeline()
      .to(content.current, { opacity: 0, y: -24, duration: 0.5, ease: "power2.in" })
      .to(
        flash.current,
        { opacity: 1, scale: 1, duration: 0.55, ease: "power2.in" },
        "-=0.15",
      )
      .add(() => {
        start();
        onOpen();
      })
      .to(root.current, { opacity: 0, duration: 0.5, ease: "power2.out" }, "+=0.05")
      .to(flash.current, { opacity: 0, duration: 0.9, ease: "power2.out" }, "<")
      .add(() => setGone(true));
  };

  if (gone) return null;

  return (
    <div ref={root} className="landing">
      <div
        ref={flash}
        className="landing__flash"
        style={{ transform: "scale(1.4)" }}
        aria-hidden
      />

      <div ref={content} className="landing__content grid justify-items-center gap-7">
        <span
          aria-hidden
          style={{
            width: "2.5rem",
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
          }}
        />

        <p className="eyebrow">A birthday surprise, made by hand</p>

        <h1 className="display h2" style={{ maxWidth: "18ch" }}>
          Something is waiting for you, Stranger.
        </h1>

        <p className="body" style={{ maxWidth: "34ch", textAlign: "center" }}>
          Take a quiet minute. Turn the sound on if you like. Then open it.
        </p>

        <button className="btn btn--solid" onClick={open} disabled={busy}>
          {busy ? "Opening…" : "Open the surprise"}
        </button>

        <p
          className="script"
          style={{ fontSize: "1.5rem", color: "var(--muted)" }}
        >
          for {birthdayPerson}, from {author}
        </p>
      </div>
    </div>
  );
}
