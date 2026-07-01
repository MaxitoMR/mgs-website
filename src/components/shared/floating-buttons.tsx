"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, CalendarCheck } from "lucide-react";
import { useScrollNav } from "@/components/providers/scroll-nav-provider";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export function FloatingActionButtons() {
  const pathname = usePathname();
  const onQuote = pathname === "/quote";
  const onWalkthrough = pathname === "/walkthrough";

  const { direction, atTop } = useScrollNav();
  // Match the project's Tailwind `lg` breakpoint (where the header itself flips
  // between its mobile and desktop implementations).
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();

  if (onQuote && onWalkthrough) return null;

  const scrollingDown = direction === "down" && !atTop;

  // DESKTOP: hide fully, in sync with the header — the page has other CTAs and a
  // roomy viewport, so the floating pair can leave entirely.
  const desktopHidden = isDesktop && scrollingDown;
  // MOBILE: never fully hide. On a phone the floating CTA is often the only
  // conversion path in view, so instead of removing it we collapse the labeled
  // full-width row into two compact icon pills that stay one tap away.
  const collapsed = !isDesktop && scrollingDown;

  // Only the DESKTOP variant translates/fades. Mobile stays put (y:0) and morphs
  // via the class swap below. The ~50ms delay staggers the CTAs behind the
  // header so the two don't feel welded into one moving block.
  const transition = reduce
    ? { duration: 0 }
    : {
        duration: isDesktop ? 0.3 : 0.2,
        ease: "easeOut" as const,
        delay: isDesktop && desktopHidden ? 0.05 : 0,
      };

  const animate = reduce
    ? { opacity: desktopHidden ? 0 : 1, y: 0 }
    : { y: desktopHidden ? "160%" : "0%", opacity: desktopHidden ? 0 : 1 };

  // Label collapse is a size change (not the header slide), so max-width/opacity
  // is fine here and stays cheap on a tiny element. `motion-reduce` turns the
  // morph instant when the user prefers reduced motion.
  const label =
    "font-clinical whitespace-nowrap overflow-hidden text-[11px] font-light uppercase tracking-wide transition-[max-width,opacity] duration-200 motion-reduce:transition-none md:text-sm lg:text-base";

  const shape = collapsed
    ? "h-12 w-12 rounded-full"
    : "flex-1 gap-2 px-4 py-3 sm:flex-none sm:px-5 sm:hover:scale-105";

  return (
    <motion.div
      initial={false}
      animate={animate}
      transition={transition}
      style={{ pointerEvents: desktopHidden ? "none" : "auto" }}
      className={cn(
        "fixed bottom-3 z-40 flex items-stretch gap-2 sm:gap-3",
        // Collapsed (mobile scroll-down) tucks to the right; expanded is a
        // full-width bottom row. Desktop is always right-anchored.
        collapsed ? "left-auto right-3" : "left-3 right-3",
        "sm:left-auto sm:right-6",
      )}
    >
      {!onQuote && (
        <Link
          href="/quote"
          aria-label="Request a quote"
          className={cn(
            "group flex items-center justify-center bg-[#69AF23] text-white shadow-lg transition-all duration-200 hover:bg-[#9FD01B]",
            shape,
          )}
        >
          <FileText className="h-4 w-4 shrink-0" />
          <span className={cn(label, collapsed ? "max-w-0 opacity-0" : "max-w-[220px] opacity-100")}>
            Request Quote
          </span>
        </Link>
      )}
      {!onWalkthrough && (
        <Link
          href="/walkthrough"
          aria-label="Schedule a walkthrough"
          className={cn(
            "group flex items-center justify-center border-2 border-[#69AF23] bg-white text-[#69AF23] shadow-lg transition-all duration-200 hover:bg-[#69AF23] hover:text-white",
            shape,
          )}
        >
          <CalendarCheck className="h-4 w-4 shrink-0" />
          <span className={cn(label, collapsed ? "max-w-0 opacity-0" : "max-w-[220px] opacity-100")}>
            <span className="sm:hidden">Walkthrough</span>
            <span className="hidden sm:inline">Schedule Walkthrough</span>
          </span>
        </Link>
      )}
    </motion.div>
  );
}
