"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ScrollNav = {
  /** Direction of the last meaningful scroll movement. */
  direction: "up" | "down";
  /** True when the page is at (or within a few px of) the very top. */
  atTop: boolean;
};

const ScrollNavContext = createContext<ScrollNav>({
  direction: "up",
  atTop: true,
});

/**
 * Single source of truth for scroll-aware chrome (the header + floating CTAs).
 * Both consumers read this context, so there's exactly ONE scroll listener for
 * the whole app instead of one per component.
 *
 * - Passive + requestAnimationFrame-throttled → no scroll jank on low-end phones.
 * - Direction is tracked with an ~10px threshold so trackpad / finger jitter
 *   doesn't flip it. We track direction, not raw position.
 * - scrollY is clamped into [0, maxScroll] so iOS rubber-band (negative) and
 *   past-the-bottom momentum can't toggle the header at the extremes.
 * - SSR-safe: every window/document access lives inside useEffect.
 */
export function ScrollNavProvider({
  children,
  threshold = 10,
}: {
  children: ReactNode;
  threshold?: number;
}) {
  const [state, setState] = useState<ScrollNav>({
    direction: "up",
    atTop: true,
  });
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      ticking.current = false;

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const y = Math.min(Math.max(window.scrollY, 0), maxScroll);
      const atTop = y <= 4;
      const diff = y - lastY.current;

      setState((prev) => {
        let direction = prev.direction;
        if (Math.abs(diff) >= threshold) {
          direction = diff > 0 ? "down" : "up";
          lastY.current = y;
        }
        if (direction === prev.direction && atTop === prev.atTop) return prev;
        return { direction, atTop };
      });
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    update(); // seed atTop correctly on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <ScrollNavContext.Provider value={state}>
      {children}
    </ScrollNavContext.Provider>
  );
}

export function useScrollNav() {
  return useContext(ScrollNavContext);
}
