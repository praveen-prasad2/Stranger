"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { registerGsap, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { scroll } from "@/app/theme";

type ScrollTarget = string | number | HTMLElement;

type SmoothScrollApi = {
  lenis: Lenis | null;
  scrollTo: (target: ScrollTarget, opts?: { offset?: number; immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollApi>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScroll({
  children,
  startLocked = false,
}: {
  children: ReactNode;
  startLocked?: boolean;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const lockedRef = useRef(startLocked);
  const [, force] = useState(0);

  useEffect(() => {
    registerGsap();
    const reduced = prefersReducedMotion();

    const lenis = new Lenis({
      lerp: reduced ? 1 : scroll.lerp,
      wheelMultiplier: scroll.wheelMultiplier,
      touchMultiplier: scroll.touchMultiplier,
      smoothWheel: !reduced,
      syncTouch: false,
    });
    lenisRef.current = lenis;
    if (lockedRef.current && !reduced) {
      lenis.stop();
      document.documentElement.classList.add("is-locked");
    }
    force((n) => n + 1);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Lenis drives native window scroll, so ScrollTrigger reads it directly;
    // we just keep both on one clock and refresh once wired.
    const refresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", refresh);

    // Sections register their own triggers and pins as they mount (and lazy 3D
    // canvases change layout as they load). Recompute positions once things
    // settle, and again after webfonts swap in.
    const kick = () => ScrollTrigger.refresh();
    const rafId = requestAnimationFrame(kick);
    const timers = [
      window.setTimeout(kick, 400),
      window.setTimeout(kick, 1500),
    ];
    if (document.fonts?.ready) document.fonts.ready.then(kick).catch(() => {});
    window.addEventListener("load", kick);

    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", kick);
      gsap.ticker.remove(raf);
      ScrollTrigger.removeEventListener("refresh", refresh);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const api = useMemo<SmoothScrollApi>(
    () => ({
      get lenis() {
        return lenisRef.current;
      },
      scrollTo: (target, opts) =>
        lenisRef.current?.scrollTo(target, {
          offset: opts?.offset ?? 0,
          immediate: opts?.immediate ?? false,
          duration: opts?.immediate ? 0 : 1.8,
        }),
      stop: () => {
        lenisRef.current?.stop();
        document.documentElement.classList.add("is-locked");
      },
      start: () => {
        lenisRef.current?.start();
        document.documentElement.classList.remove("is-locked");
      },
    }),
    [],
  );

  return (
    <SmoothScrollContext.Provider value={api}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
