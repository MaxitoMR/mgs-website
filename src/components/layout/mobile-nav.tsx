"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { serviceNav } from "@/lib/navigation";
import { COMPANY } from "@/lib/constants";
import { ChevronDown, Phone, Mail, MapPin, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "./search-bar";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Diffusers", href: "/diffusers" },
];

const portalLinks = [
  { label: "MGS Manager", href: "https://mgsmanagement.app/", external: true },
  { label: "Client Portal", href: "https://www.mgsclientportal.app/", external: true },
  { label: "Employee Training", href: "/staff-portal", external: false },
];

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
            className="fixed right-0 top-0 bottom-0 z-[1001] overflow-y-auto bg-white shadow-2xl lg:hidden"
            style={{
              width: "min(320px, 85vw)",
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <div className="p-5">
              {/* Header row: title + close */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold tracking-[2px] text-gray-900">MGS</p>
                  <p className="text-[8px] font-medium tracking-wider text-gray-400">MENU</p>
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
              <p className="mb-2 text-[9px] font-bold uppercase tracking-[1.5px] text-gray-400">
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
                    className="flex min-h-11 w-full items-center justify-between py-3 text-[13px] font-medium text-gray-700"
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
                            className="block border-l-2 border-gray-100 py-2 pl-4 text-[12px] text-gray-500 transition-colors hover:border-[#69AF23] hover:text-[#69AF23]"
                          >
                            {item.label}
                          </Link>
                        ))}
                        <div className="h-2" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Company links */}
              <p className="mb-2 mt-5 text-[9px] font-bold uppercase tracking-[1.5px] text-gray-400">
                Company
              </p>
              {companyLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-11 items-center border-b border-gray-50 text-[13px] font-medium text-gray-700 transition-colors hover:text-[#69AF23]"
                >
                  {item.label}
                </Link>
              ))}

              {/* Portals */}
              <p className="mb-2 mt-5 text-[9px] font-bold uppercase tracking-[1.5px] text-gray-400">
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
                  className="flex min-h-11 items-center justify-between border-b border-gray-50 text-[13px] font-medium text-gray-700 transition-colors hover:text-[#69AF23]"
                >
                  {item.label}
                  {item.external && <ExternalLink className="h-3 w-3 text-gray-400" />}
                </Link>
              ))}

              {/* CTA Buttons */}
              <div className="mt-6 space-y-2.5">
                <Link
                  href="/quote"
                  onClick={onClose}
                  className="flex min-h-11 w-full items-center justify-center bg-[#69AF23] py-3 text-[13px] font-semibold text-white transition-all hover:bg-[#5a9e1d]"
                >
                  Get Free Quote
                </Link>
                <Link
                  href="/walkthrough"
                  onClick={onClose}
                  className="flex min-h-11 w-full items-center justify-center border-2 border-[#69AF23] py-3 text-[13px] font-semibold text-[#69AF23]"
                >
                  Schedule Walkthrough
                </Link>
              </div>

              {/* Contact info */}
              <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
                <a
                  href={`tel:${COMPANY.phone.primary}`}
                  className="flex items-center gap-2.5 text-[12px] text-gray-500 hover:text-[#69AF23]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {COMPANY.phone.display}
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 text-[12px] text-gray-500 hover:text-[#69AF23]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {COMPANY.email}
                </a>
                <div className="flex items-start gap-2.5 text-[12px] text-gray-500">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  {COMPANY.address.full}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
