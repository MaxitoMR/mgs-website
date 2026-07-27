"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar!.style.width = `${progress}%`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* Purely decorative: scroll position is already conveyed natively. */
    <div aria-hidden="true" className="fixed top-0 left-0 z-[9999] h-[3px] w-full pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-0 transition-[width] duration-150 ease-out"
        style={{
          background: "linear-gradient(90deg, #69AF23, #9FD01B)",
        }}
      />
    </div>
  );
}
