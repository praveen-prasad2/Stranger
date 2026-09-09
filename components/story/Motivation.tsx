"use client";

import { motivation } from "@/app/content";
import { Chapter } from "../Chapter";
import { Reveal } from "../Reveal";

export function Motivation() {
  const s = motivation();
  return (
    <Chapter id="motivation" num="05" eyebrow={s.eyebrow}>
      <Reveal as="h2" className="display h2" split="words" stagger={40}>
        {s.headline}
      </Reveal>

      <div style={{ marginTop: "2.25rem" }}>
        {s.lines.map((line, i) => (
          <Reveal
            key={i}
            as="div"
            className="reminder"
            delay={i * 60}
          >
            <span className="reminder__i">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="reminder__t">{line}</span>
          </Reveal>
        ))}
      </div>

      <Reveal
        as="p"
        className="quote"
        delay={140}
        style={{ marginTop: "2.75rem" }}
      >
        {s.quote}
      </Reveal>
    </Chapter>
  );
}
