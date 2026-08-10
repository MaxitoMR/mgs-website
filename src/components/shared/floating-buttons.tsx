"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, CalendarCheck, Phone } from "lucide-react";
import { useScrollNav } from "@/components/providers/scroll-nav-provider";
import { useMediaQuery } from "@/hooks/use-media-query";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * True while any form inside <main> is on screen.
 *
 * A persistent "Get a Quote" floating over someone who is already filling in
 * the quote form is not a call to action, it is an obstruction — it covers the
 * bottom ~58px of the field they are typing into, and the action it offers is
 * the one they are in the middle of taking. Once a form is in view the bar
 * stands down and gives the screen back.
 *
 * Scoped to `main` on purpose: the newsletter signup lives in the footer of
 * every single page, and watching that would hide the bar sitewide.
 *
 * The 15% inset on each edge means a form has to be meaningfully on screen,
 * not merely one pixel past the fold, before the bar retreats.
 */
function useFormInView() {
  const pathname = usePathname();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(false);
    const forms = document.querySelectorAll("main form");
    if (forms.length === 0) return;

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setInView(visible.size > 0);
      },
      { rootMargin: "-15% 0px -15% 0px" },
    );
    forms.forEach((form) => io.observe(form));
    return () => io.disconnect();
  }, [pathname]);

  return inView;
}

export function FloatingActionButtons() {
  const pathname = usePathname();
  const onQuote = pathname === "/quote";
  const onWalkthrough = pathname === "/walkthrough";

  const { direction, atTop } = useScrollNav();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  const formInView = useFormInView();

  // Hide on scroll-down, show on scroll-up / at top — and stand down entirely
  // once the visitor has reached a form.
  const hidden = (direction === "down" && !atTop) || formInView;

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

  /* `min-h-[var(--mobile-cta-h)]` rather than a padding that happens to add up:
     the bar's height and the space the footer reserves for it are the same
     token (see globals.css), so neither can drift out from under the other.
     It also clears the 44px touch minimum, which py-3 alone did not. */
  const btn =
    "group flex min-h-[var(--mobile-cta-h)] flex-1 items-center justify-center gap-2 px-4 py-3 transition-all duration-200 sm:flex-none sm:px-5 sm:hover:scale-105";
  const label =
    "font-clinical whitespace-nowrap text-xs font-light uppercase tracking-wide md:text-sm lg:text-base";

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
        // Offset AND safe-area inset in one figure. The bar is a floating pill
        // (inset from both edges), so it should sit above the home indicator
        // rather than paint its fill underneath it.
        bottom: "calc(var(--mobile-cta-inset) + env(safe-area-inset-bottom))",
      }}
      className="fixed left-3 right-3 z-[900] flex items-stretch gap-2 sm:left-auto sm:right-6 sm:gap-3"
    >
      {/* ── Call — phones and tablets only ──────────────────────────────────
          Calling is the highest-intent action a facility manager takes on a
          phone, and it was the one action this bar did not offer. Desktop
          keeps its number in the utility row and the header, where there is
          room for it; here it takes the slot the walkthrough button had. */}
      <a
        href={`tel:${COMPANY.phone.primary}`}
        aria-label={`Call MGS at ${COMPANY.phone.display}`}
        style={{ boxShadow: liftShadow }}
        className={cn(
          btn,
          "lg:hidden",
          "border-2 border-brand-green-deep bg-white text-brand-green-text hover:bg-brand-green-deep hover:text-brand-on-green",
        )}
      >
        <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className={label}>Call</span>
      </a>

      {!onQuote && (
        <Link
          href="/quote"
          aria-label="Get a quote"
          style={{ boxShadow: liftShadow }}
          className={cn(btn, "bg-brand-green-deep text-brand-on-green hover:bg-brand-green-deep-hover")}
        >
          <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className={label}>Get a Quote</span>
        </Link>
      )}

      {/* Walkthrough is a desktop-only slot now. On a phone it was the third
          competing destination in a 336px row; the walkthrough is still one tap
          away from the drawer, the footer and every page's closing CTA. */}
      {!onWalkthrough && (
        <Link
          href="/walkthrough"
          aria-label="Schedule a walkthrough"
          style={{ boxShadow: liftShadow }}
          className={cn(
            btn,
            "hidden lg:flex",
            "border-2 border-brand-green-deep bg-white text-brand-green-text hover:bg-brand-green-deep hover:text-brand-on-green",
          )}
        >
          <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className={label}>Schedule Walkthrough</span>
        </Link>
      )}
    </motion.div>
  );
}
