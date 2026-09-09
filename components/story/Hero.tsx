"use client";

import { Fragment, useEffect, useRef } from "react";
import { hero } from "@/app/content";
import { useSmoothScroll } from "../SmoothScroll";

/**
 * Chapter one. The exact phrase "HelLo, Stranger..." is the first line of the
 * letter; its entrance is held until the surprise is opened.
 */
export function Hero({ opened }: { opened: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();
  const lines = hero().type_sequence;

  useEffect(() => {
    if (opened) {
      const t = setTimeout(() => stage.current?.classList.add("is-in"), 120);
      return () => clearTimeout(t);
    }
  }, [opened]);

  return (
    <section
      id="hero"
      className="chapter chapter--center"
      style={{ minHeight: "100svh" }}
    >
      <div className="orb-light" aria-hidden />

      <div ref={stage} data-reveal className="chapter__inner" style={{ zIndex: 2 }}>
        <h1 className="display h1">
          {lines[0].text.split(" ").map((w, i, arr) => (
            <Fragment key={i}>
              <span
                className="r-word"
                style={{ ["--d" as string]: `${i * 90}ms` }}
              >
                {w}
              </span>
              {i < arr.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h1>

        <p
          className="body body--lead r-rise"
          style={{
            marginInline: "auto",
            marginTop: "1.6rem",
            maxWidth: "32ch",
            ["--d" as string]: "520ms",
          }}
        >
          {lines[1].text}
        </p>
        <p
          className="quote r-rise"
          style={{
            marginInline: "auto",
            marginTop: "0.5rem",
            ["--d" as string]: "760ms",
          }}
        >
          {lines[2].text}
        </p>

        <div
          className="r-rise"
          style={{ marginTop: "2.6rem", ["--d" as string]: "1020ms" }}
        >
          <button
            className="btn"
            onClick={() => {
              const el = document.getElementById("introduction");
              if (el) scrollTo(el, { offset: -20 });
            }}
          >
            Begin the story <span aria-hidden>↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
