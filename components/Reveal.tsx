"use client";

import {
  createElement,
  Fragment,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** "words" splits a string headline for a staggered rise; omit for a whole-block reveal */
  split?: "words";
  /** base delay in ms before the (first) element animates */
  delay?: number;
  /** ms between staggered words */
  stagger?: number;
  once?: boolean;
};

/**
 * Scroll-in reveal. Plain IntersectionObserver toggles `.is-in`; the transition
 * lives in CSS. Headlines can be split into words for a gentle staggered rise;
 * everything else fades and lifts as one block.
 */
export function Reveal({
  children,
  as = "p",
  className = "",
  style,
  split,
  delay = 0,
  stagger = 34,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          if (once) io.disconnect();
        } else if (!once) {
          el.classList.remove("is-in");
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  let content: ReactNode = children;
  if (split === "words" && typeof children === "string") {
    const words = children.split(" ");
    content = words.map((w, i) => (
      <Fragment key={i}>
        <span
          className="r-word"
          style={{ ["--d" as string]: `${delay + i * stagger}ms` }}
        >
          {w}
        </span>
        {i < words.length - 1 ? " " : null}
      </Fragment>
    ));
  }

  return createElement(
    as,
    {
      ref,
      className: `${className} ${split ? "" : "is-block"}`.trim(),
      "data-reveal": "",
      style:
        split || delay === 0
          ? style
          : { ...style, ["--d" as string]: `${delay}ms` },
    },
    content,
  );
}
