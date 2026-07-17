/**
 * Shared motion timing for the Technical design language: short,
 * near-linear transitions that report a state change rather than
 * perform one. Compose with a `transition-*` property utility, e.g.
 * `` `transition-colors ${EASE_FAST}` ``.
 */
export const EASE_FAST = "duration-[var(--duration-fast)] ease-[var(--ease-technical)]";
export const EASE_NORMAL = "duration-[var(--duration-normal)] ease-[var(--ease-technical)]";
/** Reserved for one-time viewport/entrance reveals — never hover or press feedback. */
export const EASE_SLOW = "duration-[var(--duration-slow)] ease-[var(--ease-technical)]";

/**
 * Shared entrance-reveal classes: opacity + a single small translateY,
 * gated by `visible` (see `useReveal`). Every reveal in the app travels
 * the same distance and takes the same time, so staggering multiple
 * instances (via the `delay` param, in ms) reads as one choreographed
 * sequence rather than independent animations.
 */
export function revealClasses(visible: boolean) {
  // `prefers-reduced-motion` is handled globally in globals.css (it zeroes
  // transition-duration), so this only needs the transition + end states.
  return `transition-[opacity,transform] ${EASE_SLOW} ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[var(--reveal-distance)]"
  }`;
}

export function revealDelayStyle(index: number, stepMs = 60) {
  return index ? { transitionDelay: `${index * stepMs}ms` } : undefined;
}
