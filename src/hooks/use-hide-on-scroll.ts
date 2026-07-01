"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns true when the page is being scrolled DOWN (past `threshold` px),
 * false when scrolling UP. Use it to slide sticky/floating UI off-screen on
 * scroll-down and bring it back on scroll-up.
 *
 * rAF-throttled and ignores tiny jitter so it doesn't flicker.
 */
export function useHideOnScroll(threshold = 80): boolean {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const diff = y - lastY.current;
        // Ignore sub-pixel/rubber-band jitter.
        if (Math.abs(diff) > 6) {
          if (diff > 0 && y > threshold) {
            setHidden(true); // scrolling down, past the threshold
          } else if (diff < 0) {
            setHidden(false); // scrolling up
          }
          lastY.current = y;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}
