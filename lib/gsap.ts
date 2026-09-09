"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

/**
 * Register GSAP plugins exactly once, client-side. Call from any client
 * component's module scope or effect before using ScrollTrigger / SplitText.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  ScrollTrigger.config({ ignoreMobileResize: true });

  CustomEase.create("weighted", "0.16, 1, 0.3, 1");
  CustomEase.create("curtain", "0.83, 0, 0.17, 1");
  CustomEase.create("settle", "M0,0 C0.34,1.56 0.64,1 1,1");

  gsap.defaults({ ease: "weighted", duration: 0.9 });
  registered = true;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText };
