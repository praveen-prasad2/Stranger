"use client";

import { personalMessage } from "@/app/content";
import { Chapter } from "../Chapter";
import { Reveal } from "../Reveal";

export function PersonalMessage() {
  const s = personalMessage();
  const [salutation, signOff] = s.signature.split("\n");

  return (
    <Chapter id="personal_message" num="06" eyebrow={s.eyebrow}>
      <Reveal
        as="div"
        className="card"
        style={{ padding: "clamp(1.75rem, 5vw, 3.5rem)" }}
      >
        <h2 className="display h3">{s.headline}</h2>

        <div style={{ marginTop: "1.5rem", display: "grid", gap: "1.15rem" }}>
          {s.body.map((para, i) => (
            <p key={i} className="body">
              {para}
            </p>
          ))}
        </div>

        <p className="quote" style={{ marginTop: "1.75rem", fontSize: "1.3rem" }}>
          {s.highlight}
        </p>

        <div style={{ marginTop: "2.25rem" }}>
          <p className="body" style={{ fontStyle: "italic", marginBottom: "0.25rem" }}>
            {salutation}
          </p>
          <p className="script" style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}>
            {signOff}
          </p>
        </div>
      </Reveal>
    </Chapter>
  );
}
