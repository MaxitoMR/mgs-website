"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { serviceNav, portalItems } from "@/lib/navigation";
import { COMPANY } from "@/lib/constants";
import { ArrowRight, ChevronDown, Phone, Mail, MapPin, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "./search-bar";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Diffusers", href: "/diffusers" },
];

/**
 * Derived from the shared `portalItems`, not a second hand-kept copy. This list
 * used to be declared here with its own order (Manager, Client, Training) while
 * `portalItems` had another (Manager, Training, Client) — so the menu and the
 * footer showed the same three portals in different sequences. `external` is
 * computed rather than stored, which is one fewer field to get wrong.
 */
const portalLinks = portalItems.map((item) => ({
  ...item,
  external: item.href.startsWith("http"),
}));

/**
 * `serviceNav` labels → the section ids `/services` renders.
 *
 * The two vocabularies differ by one: the nav calls the fourth group
 * "Specialized", `services-data` calls it "additional". Mapping it here rather
 * than lowercasing the label means the odd one out is visible instead of
 * producing a link to `#cat-specialized`, which exists on no page.
 */
const categoryAnchors: Record<string, string> = {
  Commercial: "commercial",
  Medical: "medical",
  Industrial: "industrial",
  Specialized: "additional",
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Body scroll-lock while open. The document element is the scroller, so
  // toggling its overflow freezes the background AND preserves scroll position
  // (no jump) — restored to its previous value on close.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [open]);

  // Focus management: move focus into the drawer, trap Tab/Shift+Tab, Esc closes.
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop / scrim — fades with the drawer, closes on tap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-[1000] bg-black/40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            ref={panelRef}
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            /* A column, not a scroll box: the scrolling now belongs to the
               nav list in the middle, so the CTA footer below it can stay put
               instead of living 1023px down a 715px viewport. */
            className="fixed right-0 top-0 bottom-0 z-[1001] flex flex-col bg-white shadow-2xl lg:hidden"
            style={{
              /* 88vw / 380px, up from 85vw / 320px. At 320 the portal labels
                 and "Janitorial Services in Katy" were wrapping inside a panel
                 that had ~40px of unused screen beside it. */
              width: "min(88vw, 380px)",
              paddingTop: "env(safe-area-inset-top)",
            }}
          >
            <div className="flex-1 overflow-y-auto overscroll-contain p-5">
              {/* Header row: title + close */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="t-eyebrow text-gray-900">MGS</p>
                  <p className="t-eyebrow text-gray-500">MENU</p>
                </div>
                <button
                  ref={closeBtnRef}
                  onClick={onClose}
                  aria-label="Close menu"
                  className="-mr-2 flex h-11 w-11 items-center justify-center text-gray-500 hover:text-gray-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search — same behavior/data as the desktop header search */}
              <div className="mb-6">
                <SearchBar className="w-full" onNavigate={onClose} />
              </div>

              {/* Services (accordion) */}
              <p className="mb-2 t-eyebrow text-gray-500">
                Services
              </p>
              {serviceNav.map((category) => (
                <div key={category.label} className="border-b border-gray-50">
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category.label ? null : category.label,
                      )
                    }
                    aria-expanded={expandedCategory === category.label}
                    className="flex min-h-11 w-full items-center justify-between py-3 text-sm font-medium text-gray-700"
                  >
                    {category.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 text-gray-400 transition-transform",
                        expandedCategory === category.label && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedCategory === category.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        {category.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="flex min-h-11 items-center border-l-2 border-gray-100 pl-4 text-sm text-gray-600 transition-colors hover:border-[#69AF23] hover:text-brand-green-text"
                          >
                            {item.label}
                          </Link>
                        ))}
                        {/* The category row itself is a toggle, not a link, so
                            without this there was no route from the drawer to
                            a category landing page at all — expanding
                            "Commercial" gave you five leaf services and no way
                            to see the category. */}
                        <Link
                          href={`/services#cat-${categoryAnchors[category.label] ?? ""}`}
                          onClick={onClose}
                          className="flex min-h-11 items-center gap-1.5 border-l-2 border-gray-100 pl-4 text-sm font-semibold text-brand-green-text transition-colors hover:border-[#69AF23]"
                        >
                          View all {category.label}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                        <div className="h-2" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Company links */}
              <p className="mb-2 mt-5 t-eyebrow text-gray-500">
                Company
              </p>
              {companyLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-11 items-center border-b border-gray-50 text-sm font-medium text-gray-700 transition-colors hover:text-brand-green-text"
                >
                  {item.label}
                </Link>
              ))}

              {/* Portals */}
              <p className="mb-2 mt-5 t-eyebrow text-gray-500">
                Portals
              </p>
              {portalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={
                    item.external ? `${item.label} (opens in new tab)` : undefined
                  }
                  onClick={onClose}
                  className="flex min-h-11 items-center justify-between border-b border-gray-50 text-sm font-medium text-gray-700 transition-colors hover:text-brand-green-text"
                >
                  {item.label}
                  {item.external && <ExternalLink className="h-3 w-3 text-gray-400" />}
                </Link>
              ))}

              {/* Secondary CTA + the rest of the contact block stay in the
                  scrolling region; the two things worth reaching without
                  scrolling are pinned below. */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                <Link
                  href="/walkthrough"
                  onClick={onClose}
                  className="flex min-h-11 w-full items-center justify-center border-2 border-brand-green-deep py-3 text-sm font-semibold text-brand-green-text"
                >
                  Schedule Walkthrough
                </Link>
              </div>

              {/* Contact info */}
              <div className="mt-5 space-y-1">
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex min-h-11 items-center gap-2.5 break-all text-sm text-gray-600 hover:text-brand-green-text"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {COMPANY.email}
                </a>
                <a
                  href={COMPANY.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2.5 text-sm text-gray-600 hover:text-brand-green-text"
                >
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                  {COMPANY.address.full}
                </a>
              </div>
            </div>

            {/* ── Pinned action footer ──────────────────────────────────────
                The drawer's content runs to ~1023px against a 715px screen, so
                both CTAs and the phone number sat below the fold — the two
                highest-intent controls in the menu were reachable only by
                scrolling a menu, which is not what a menu is for. Outside the
                scrolling region they are always on screen, at the bottom of
                the panel where a thumb already rests.

                It carries the safe-area inset that used to be on the panel:
                on the panel it padded the bottom of a scroll container, which
                does nothing when the content overflows. */}
            <div
              className="shrink-0 border-t border-gray-200 bg-white p-4 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]"
              style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
            >
              <div className="flex gap-2">
                <a
                  href={`tel:${COMPANY.phone.primary}`}
                  aria-label={`Call MGS at ${COMPANY.phone.display}`}
                  className="flex min-h-12 flex-1 items-center justify-center gap-2 border-2 border-brand-green-deep text-sm font-semibold text-brand-green-text transition-colors hover:bg-brand-green-deep hover:text-brand-on-green"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call
                </a>
                <Link
                  href="/quote"
                  onClick={onClose}
                  className="flex min-h-12 flex-[1.4] items-center justify-center bg-brand-green-deep text-sm font-semibold text-brand-on-green transition-all hover:bg-brand-green-deep-hover"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
