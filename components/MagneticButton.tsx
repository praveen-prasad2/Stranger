"use client";

import {
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { registerGsap, gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  /** pull strength in px at the edge of the hit area */
  strength?: number;
};

/**
 * Magnetic hover with a soft gold glow — the button eases toward the cursor
 * with a slight lag and springs back on leave. Every interactive element on the
 * site gets a bespoke micro-animation; this is the shared one for CTAs.
 */
export function MagneticButton({
  children,
  strength = 16,
  className = "btn",
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return;
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * strength * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * strength * 2;
    gsap.to(el, { x, y, duration: 0.6, ease: "weighted" });
    gsap.to(label.current, { x: x * 0.35, y: y * 0.35, duration: 0.6, ease: "weighted" });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to([el, label.current], {
      x: 0,
      y: 0,
      duration: 1,
      ease: "settle",
    });
  };

  return (
    <button
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-hot="true"
      {...rest}
    >
      <span ref={label} style={{ display: "inline-flex", alignItems: "center", gap: "0.7em" }}>
        {children}
      </span>
    </button>
  );
}
