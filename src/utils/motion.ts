/**
 * Shared motion timing for the Technical design language: short,
 * near-linear transitions that report a state change rather than
 * perform one. Compose with a `transition-*` property utility, e.g.
 * `` `transition-colors ${EASE_FAST}` ``.
 */
export const EASE_FAST = "duration-[var(--duration-fast)] ease-[var(--ease-technical)]";
export const EASE_NORMAL = "duration-[var(--duration-normal)] ease-[var(--ease-technical)]";
