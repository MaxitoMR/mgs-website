"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollNav } from "@/components/providers/scroll-nav-provider";
import { useMediaQuery } from "@/hooks/use-media-query";

export function ScrollToTop() {
  const { direction, atTop } = useScrollNav();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();

  /* DESKTOP ONLY. On a phone this was the third thing competing for the
     bottom-right corner, and — because it appears on scroll-DOWN, the exact
     state a reader is in while working through a page — it spent its whole
     life sitting on top of card corners, figcaptions and footer links. Every
     occlusion the mobile audit found came from this button, not from the CTA
     bar. Removing it on mobile leaves that corner with exactly one owner,
     which is what makes the reserved space at the document end deterministic.
     Nothing is lost: the mobile header returns on any upward flick, which is
     both faster than travelling to a corner and already how people scroll back.

     Mutually exclusive with the floating CTAs on desktop, where it stays: they
     hide on scroll-down, so the arrow shows on scroll-down and hides on
     scroll-up. Same signal, same corner, same timing — the two swap. */
  const show = direction === "down" && !atTop && isDesktop;
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
          className="hidden h-12 w-12 items-center justify-center bg-brand-green-deep text-brand-on-green transition-colors hover:bg-brand-green-deep-hover lg:fixed lg:right-6 lg:z-[900] lg:flex"
          style={{
            bottom: "calc(var(--mobile-cta-inset) + env(safe-area-inset-bottom))",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
