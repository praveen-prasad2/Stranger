/**
 * Ivory & Oxblood — the single source of truth for colour, timing and easing.
 * Component logic never hard-codes a hex value or a duration; it reads from here
 * (or from the matching CSS custom properties defined in globals.css).
 */

export const palette = {
  ivory: "#FBF6ED",
  ivoryWarm: "#F7EEDF",
  paperWhite: "#FFFDF8",
  oxblood: "#6E1423",
  oxbloodSoft: "#9C3B49",
  champagneGold: "#C9A24B",
  champagneGoldLight: "#E6D5A8",
  ink: "#2A1418",
  /**
   * The brief's muted_ink (#8C7A78) fails WCAG AA on ivory at body size.
   * We keep a darker working value for text and reserve the brief value for
   * decorative, non-text use only.
   */
  mutedInk: "#6E5A57",
  mutedInkDecorative: "#8C7A78",
} as const;

/** Seconds. Consumed by GSAP timelines and, doubled, by CSS transitions. */
export const timing = {
  micro: 0.35,
  short: 0.6,
  base: 0.9,
  long: 1.4,
  scene: 2.2,
} as const;

/**
 * Custom cubic-beziers — no default ease-in-out anywhere.
 * `curtain` opens the loader; `weighted` is the house ease for type and camera;
 * `settle` is a soft overshoot for interactive elements.
 */
export const ease = {
  weighted: [0.16, 1, 0.3, 1] as const, // expo-out, heavy tail
  curtain: [0.83, 0, 0.17, 1] as const, // expo-in-out, cinematic
  settle: [0.34, 1.56, 0.64, 1] as const, // soft back-out
  drift: [0.4, 0, 0.2, 1] as const, // gentle, for ambient loops
};

/** GSAP string form of the eases above, for `gsap.to(..., { ease })`. */
export const gsapEase = {
  weighted: "power4.out",
  curtain: "power4.inOut",
  settle: "back.out(1.6)",
  drift: "sine.inOut",
} as const;

export const scroll = {
  /** Lenis — smooth but natural, not heavy or sticky. */
  lerp: 0.11,
  wheelMultiplier: 1,
  touchMultiplier: 1.4,
} as const;
