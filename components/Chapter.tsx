"use client";

import { forwardRef, type ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  id: string;
  num?: string;
  eyebrow?: string;
  center?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * One idea per screen. A numbered eyebrow, then the content, in a narrow
 * centred column with generous vertical air.
 */
export const Chapter = forwardRef<HTMLElement, Props>(function Chapter(
  { id, num, eyebrow, center, className = "", children },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      className={`chapter ${center ? "chapter--center" : ""} ${className}`.trim()}
    >
      <div className="chapter__inner">
        {(num || eyebrow) && (
          <Reveal as="div" className="chapter__head">
            {num && <span className="chapter__num">{num}</span>}
            <span className="rule" />
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
});
