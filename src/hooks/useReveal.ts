"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element first crosses into the viewport, then
 * disconnects — reveals in this app play a single time, not on every
 * scroll back into view. Falls back to already-visible when
 * `IntersectionObserver` isn't available (very old browsers, or a
 * non-DOM test environment) so content is never stuck hidden.
 */
export function useReveal<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T>(null);
  // Must start `false` on both server and client — `typeof
  // IntersectionObserver` is "undefined" during SSR (no DOM globals) but
  // defined in the browser, so seeding this from that check would render
  // opacity-100 on the server and opacity-0 on the client, a hydration
  // mismatch that briefly flashes content visible-then-hidden on load.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Client-only fallback for browsers without the API — deferred a
      // tick so this isn't a synchronous setState-in-effect call.
      queueMicrotask(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, visible } as const;
}
