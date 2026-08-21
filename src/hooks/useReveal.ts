"use client";

import { useRef } from "react";

/**
 * Shared progressive-enhancement boundary for reveal surfaces.
 * Content is authoritative and visible in server output, without JavaScript,
 * and under reduced motion. Motion must never be required to expose it.
 */
export function useReveal<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T>(null);
  void rootMargin;
  return { ref, visible: true } as const;
}
