"use client";

import { useState } from "react";
import { finale } from "@/app/content";
import { Chapter } from "../Chapter";
import { Reveal } from "../Reveal";
import { useSmoothScroll } from "../SmoothScroll";

export function Finale() {
  const s = finale();
  const [note, setNote] = useState(false);
  const { scrollTo } = useSmoothScroll();

  return (
    <Chapter id="finale" num="07" eyebrow={s.eyebrow} center>
      <div className="orb-light" aria-hidden style={{ opacity: 0.7 }} />

      <Reveal as="h2" className="display h1" split="words" stagger={50}>
        {s.content.primary}
      </Reveal>
      <Reveal as="p" className="body body--lead" delay={120} style={{ marginTop: "1.5rem" }}>
        {s.content.secondary}
      </Reveal>
      <Reveal as="p" className="quote" delay={220} style={{ marginTop: "1.5rem" }}>
        {s.content.supporting}
      </Reveal>
      <Reveal as="p" className="body" delay={300} style={{ marginInline: "auto", marginTop: "1.25rem" }}>
        {s.content.closing}
      </Reveal>

      <Reveal
        as="div"
        delay={380}
        style={{ marginTop: "2.75rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}
      >
        <button className="btn" onClick={() => setNote((v) => !v)}>
          {s.actions[1].text}
        </button>
        <button
          className="btn btn--ghost"
          onClick={() => {
            const el = document.getElementById("hero");
            if (el) scrollTo(el, {});
          }}
        >
          {s.actions[0].text}
        </button>
      </Reveal>

      {note && (
        <p
          className="quote"
          style={{
            marginInline: "auto",
            marginTop: "2.5rem",
            fontSize: "clamp(1.2rem, 1rem + 1.4vw, 1.9rem)",
            maxWidth: "40ch",
          }}
        >
          {s.final_note}
        </p>
      )}

      <p
        className="script"
        style={{ marginTop: "3rem", fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
      >
        Stay wonderfully strange.
      </p>
    </Chapter>
  );
}
