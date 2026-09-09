"use client";

import { newChapter } from "@/app/content";
import { Chapter } from "../Chapter";
import { Reveal } from "../Reveal";

export function NewChapter() {
  const s = newChapter();
  return (
    <Chapter id="new_chapter" num="04" eyebrow={s.eyebrow}>
      <Reveal as="h2" className="display h2" split="words" stagger={40}>
        {s.headline}
      </Reveal>

      <div style={{ marginTop: "2rem", display: "grid", gap: "1.5rem" }}>
        {s.body.map((para, i) => (
          <Reveal key={i} as="p" className="body" delay={80}>
            {para}
          </Reveal>
        ))}
      </div>

      <Reveal
        as="p"
        className="quote"
        delay={120}
        style={{ marginTop: "2.75rem", maxWidth: "38ch" }}
      >
        {s.highlight}
      </Reveal>
    </Chapter>
  );
}
