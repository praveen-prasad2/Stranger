"use client";

import { introduction } from "@/app/content";
import { Chapter } from "../Chapter";
import { Reveal } from "../Reveal";

export function Introduction() {
  const s = introduction();
  return (
    <Chapter id="introduction" num="01" eyebrow={s.eyebrow}>
      <Reveal as="h2" className="display h2" split="words" stagger={44}>
        {s.headline}
      </Reveal>
      <Reveal as="p" className="body body--lead" delay={120} style={{ marginTop: "1.75rem" }}>
        {s.body}
      </Reveal>
    </Chapter>
  );
}
