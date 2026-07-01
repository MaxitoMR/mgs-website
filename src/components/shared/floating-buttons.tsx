"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";

export function FloatingActionButtons() {
  const pathname = usePathname();
  const onQuote = pathname === "/quote";
  const onWalkthrough = pathname === "/walkthrough";
  const hidden = useHideOnScroll(120);

  // Nothing to show if we're on both target pages (can't happen, but tidy).
  if (onQuote && onWalkthrough) return null;

  return (
    <div
      className={[
        // Mobile: full-width row pinned to the bottom, buttons side by side.
        "fixed inset-x-3 bottom-3 z-40 flex items-stretch gap-2",
        // Desktop: shrink to content, tuck into the bottom-right.
        "sm:inset-x-auto sm:right-6 sm:gap-3",
        // Slide down off-screen on scroll-down, back up on scroll-up.
        "transition-transform duration-300 ease-out",
        hidden ? "translate-y-[160%]" : "translate-y-0",
      ].join(" ")}
    >
      {!onQuote && (
        <Link
          href="/quote"
          className="flex flex-1 items-center justify-center bg-[#69AF23] px-4 py-3 text-center text-white shadow-lg transition-all duration-300 hover:bg-[#9FD01B] sm:flex-none sm:px-5 sm:hover:scale-105"
        >
          <span className="font-clinical whitespace-nowrap text-[11px] font-light uppercase tracking-wide md:text-sm lg:text-base">
            Request Quote
          </span>
        </Link>
      )}
      {!onWalkthrough && (
        <Link
          href="/walkthrough"
          className="flex flex-1 items-center justify-center border-2 border-[#69AF23] bg-white px-4 py-3 text-center text-[#69AF23] shadow-lg transition-all duration-300 hover:bg-[#69AF23] hover:text-white sm:flex-none sm:px-5 sm:hover:scale-105"
        >
          <span className="font-clinical whitespace-nowrap text-[11px] font-light uppercase tracking-wide md:text-sm lg:text-base">
            <span className="sm:hidden">Walkthrough</span>
            <span className="hidden sm:inline">Schedule Walkthrough</span>
          </span>
        </Link>
      )}
    </div>
  );
}
