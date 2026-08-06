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
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();

  if (onQuote && onWalkthrough) return null;

  // Hide on scroll-down, show on scroll-up / at top. The back-to-top arrow is
  // tied to the exact inverse of this signal, so the two never share the corner.
  const hidden = direction === "down" && !atTop;

  const transition = reduce
    ? { duration: 0 }
    : {
        duration: isDesktop ? 0.3 : 0.2,
        ease: "easeOut" as const,
        // small stagger behind the header on the way out (desktop)
        delay: hidden && isDesktop ? 0.05 : 0,
      };

  const animate = reduce
    ? { opacity: hidden ? 0 : 1, y: 0 }
    : { y: hidden ? "160%" : "0%", opacity: hidden ? 0 : 1 };

  // Same layered lift as the header, so the pair reads as floating above the page.
  const liftShadow = "0 10px 40px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.15)";

  const btn =
    "group flex flex-1 items-center justify-center gap-2 px-4 py-3 transition-all duration-200 sm:flex-none sm:px-5 sm:hover:scale-105";
  const label =
    "font-clinical whitespace-nowrap text-[11px] font-light uppercase tracking-wide md:text-sm lg:text-base";

  return (
    <motion.div
      initial={false}
      animate={animate}
      transition={transition}
      /* A labelled landmark so these persistent CTAs are reachable by
         landmark navigation instead of floating outside the page structure. */
      role="complementary"
      aria-label="Quick actions"
      style={{
        pointerEvents: hidden ? "none" : "auto",
        // safe-area inset so it clears the home indicator on notched phones
        bottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
      className="fixed left-3 right-3 z-[900] flex items-stretch gap-2 sm:left-auto sm:right-6 sm:gap-3"
    >
      {!onQuote && (
        <Link
          href="/quote"
          aria-label="Get a quote"
          style={{ boxShadow: liftShadow }}
          className={cn(btn, "bg-brand-green-deep text-brand-on-green hover:bg-brand-green-deep-hover")}
        >
          <FileText className="h-4 w-4 shrink-0" />
          <span className={label}>Get a Quote</span>
        </Link>
      )}
      {!onWalkthrough && (
        <Link
          href="/walkthrough"
          aria-label="Schedule a walkthrough"
          style={{ boxShadow: liftShadow }}
          className={cn(
            btn,
            "border-2 border-brand-green-deep bg-white text-brand-green-text hover:bg-brand-green-deep hover:text-brand-on-green",
          )}
        >
          <CalendarCheck className="h-4 w-4 shrink-0" />
          <span className={label}>
            <span className="sm:hidden">Walkthrough</span>
            <span className="hidden sm:inline">Schedule Walkthrough</span>
          </span>
        </Link>
      )}
    </motion.div>
  );
}
