"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollNav } from "@/components/providers/scroll-nav-provider";
import { useMediaQuery } from "@/hooks/use-media-query";

export function ScrollToTop() {
  const { direction, atTop } = useScrollNav();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();

  // Mutually exclusive with the floating CTAs: they hide on scroll-down, so the
  // arrow shows on scroll-down and hides on scroll-up / at top. Same signal,
  // same corner/baseline, same timing — the two swap, never clash.
  const show = direction === "down" && !atTop;
  const duration = reduce ? 0 : isDesktop ? 0.3 : 0.2;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="scroll-to-top"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: "160%" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: "0%" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: "160%" }}
          transition={{ duration, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          // Same baseline (bottom-3) and right edge (right-3 / sm:right-6) as the
          // CTA row, so it lands exactly where the CTAs were.
          className="fixed right-3 z-40 flex h-12 w-12 items-center justify-center bg-[#69AF23] text-white transition-colors hover:bg-[#9FD01B] sm:right-6"
          style={{
            bottom: "calc(0.75rem + env(safe-area-inset-bottom))",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
