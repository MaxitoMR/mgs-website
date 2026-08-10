"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { serviceNav, rightNav, portalItems } from "@/lib/navigation";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  ChevronDown, ChevronRight, Facebook, Twitter, Linkedin,
  Phone, Menu, X,
  Building2, Stethoscope, Factory, Wrench, ArrowRight,
} from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { TopBar } from "./top-bar";
import { SearchBar } from "./search-bar";
import { useScrollNav } from "@/components/providers/scroll-nav-provider";

/* ─────── Category metadata for mega menu ─────── */
/* `color` is the decorative fill (accent bar, tinted icon chips) and keeps
   the full-strength brand hues. `textColor` is used where the hue becomes
   text or a meaningful icon, so it holds the AA-compliant, darker set — see
   the brand color seam in globals.css. The two intentionally differ: the
   vibrant hues are 2.71 / 2.96 / 2.29 / 1.82 on white and cannot carry
   lettering. */
const categoryMeta: Record<string, {
  icon: typeof Building2;
  color: string;
  textColor: string;
  description: string;
  image: string;
}> = {
  Commercial: {
    icon: Building2,
    color: "#69AF23",
    textColor: "#54760F",
    description: "Professional cleaning solutions for offices, retail, restaurants, and business environments.",
    image: "/images/office-desk-cleaning.jpg",
  },
  Medical: {
    icon: Stethoscope,
    color: "#19A0DB",
    textColor: "#116D96",
    description: "Infection-control-grade protocols for surgical centers, labs, imaging facilities, and clinics.",
    image: "/images/imaging center image_1752168794610.png",
  },
  Industrial: {
    icon: Factory,
    color: "#FF8F00",
    textColor: "#9A5600",
    description: "Heavy-duty cleaning for factories, petrochemical plants, warehouses, and power facilities.",
    image: "/images/IMG_1741_1751917994935.JPG",
  },
  Specialized: {
    icon: Wrench,
    color: "#9FD01B",
    textColor: "#55700F",
    description: "Advanced solutions for post-construction, concrete, windows, power washing, and more.",
    image: "/images/7_1752264862114.png",
  },
};


/* ─────── Mega Menu Component ─────── */
function MegaMenu({
  category,
  isOpen,
  onClose,
}: {
  category: typeof serviceNav[0];
  isOpen: boolean;
  onClose: () => void;
}) {
  const meta = categoryMeta[category.label];
  const Icon = meta?.icon || Building2;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-0 right-0 top-full z-50 bg-white shadow-premium-lg"
          style={{ borderBottomLeftRadius: '2rem' }}
        >
          {/* Top accent line */}
          <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${meta?.color || '#69AF23'}, ${meta?.color || '#69AF23'}40)` }} />

          <div className="mx-auto max-w-7xl px-8 lg:px-12">
            <div className="grid grid-cols-12 gap-0">

              {/* Left: Category header + service links */}
              <div className="col-span-8 py-8 pr-10">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="flex h-10 w-10 items-center justify-center"
                    style={{
                      background: `${meta?.color || '#69AF23'}12`,
                      borderTopLeftRadius: '0.75rem',
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: meta?.textColor || '#69AF23' }} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-base">{category.label} Services</h3>
                    <p className="text-gray-500 text-xs mt-0.5" style={{ fontWeight: 300 }}>
                      {meta?.description}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-6" />

                {/* Service links grid */}
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-1">
                  {category.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 transition-all duration-200 hover:bg-[#69AF23]/5 hover:text-brand-green-text"
                      style={{ borderTopLeftRadius: '0.5rem' }}
                    >
                      <ChevronRight
                        className="h-3.5 w-3.5 text-gray-300 transition-all duration-200 group-hover:text-brand-green-text group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                      <span className="font-light">{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <Link
                    href="/quote"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-green-text hover:text-brand-green-deep transition-colors"
                  >
                    Need a custom solution? Get a free assessment
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right: Featured image + quick action */}
              <div className="col-span-4 border-l border-gray-100">
                <div className="py-8 pl-8">
                  {/* Featured image */}
                  <div
                    className="relative overflow-hidden aspect-[3/2] mb-5"
                    style={{ borderTopLeftRadius: '1.5rem' }}
                  >
                    <Image
                      src={meta?.image || ''}
                      alt={category.label}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Quick links */}
                  <p className="eyebrow text-gray-400 mb-3" style={{ fontSize: '0.7rem' }}>Quick Actions</p>
                  <div className="space-y-2">
                    <Link
                      href="/quote"
                      onClick={onClose}
                      className="flex items-center gap-2 px-4 py-2.5 bg-brand-green-deep text-brand-on-green text-sm font-medium transition-all hover:bg-brand-green-deep-hover"
                      style={{ borderTopLeftRadius: '0.75rem' }}
                    >
                      Get a Quote
                      <ArrowRight className="h-3.5 w-3.5 ml-auto" />
                    </Link>
                    <a
                      href={`tel:${COMPANY.phone.primary}`}
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-light transition-all hover:border-brand-green-deep hover:text-brand-green-text"
                      style={{ borderTopLeftRadius: '0.75rem' }}
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {COMPANY.phone.display}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────── Desktop Nav Bar ─────── */
function DesktopNav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleMouseEnter = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 200);
  }, []);

  const handleClose = useCallback(() => {
    setOpenMenu(null);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // The mega menu opens on hover, so keyboard users need an explicit way
  // back out once it has been opened via the toggle button.
  useEffect(() => {
    if (!openMenu && !portalsOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setPortalsOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenu, portalsOpen]);

  return (
    <nav aria-label="Primary" className="bg-brand-green-deep relative z-[1000]" style={{ height: 'clamp(3rem, 3.5vw, 3.5rem)' }}>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Service dropdowns + Diffusers */}
        <div className="flex h-full items-center" style={{ gap: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
          {serviceNav.map((category) => (
            <div
              key={category.label}
              className="relative h-full flex items-center"
              onMouseEnter={() => handleMouseEnter(category.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                aria-expanded={openMenu === category.label}
                aria-haspopup="true"
                onClick={() =>
                  setOpenMenu(openMenu === category.label ? null : category.label)
                }
                /* Deep-forest text on the green bar, not white: white-on-
                   #69AF23 is 2.71:1 and fails AA, this is 5.68:1. Overlays
                   are black tints for the same reason — a white wash barely
                   registers under dark type. Weight is 400, not the 300 used
                   elsewhere, because dark type on a bright ground reads
                   thinner than light type at the same weight. */
                className={cn(
                  "flex items-center gap-1 px-3 h-full text-brand-on-green font-normal transition-all duration-200",
                  openMenu === category.label
                    ? "bg-black/[0.16]"
                    : "hover:bg-black/[0.09]"
                )}
                style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.25rem)' }}
              >
                {category.label}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    openMenu === category.label && "rotate-180"
                  )}
                />
              </button>
            </div>
          ))}
          <Link
            href="/diffusers"
            className="flex items-center px-3 text-brand-on-green hover:bg-black/[0.09] h-full font-normal transition-all duration-200"
            style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.25rem)' }}
          >
            Diffusers
          </Link>
        </div>

        {/* Right: About, Apply Now, Portals */}
        <div className="flex h-full items-center" style={{ gap: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
          {rightNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-3 h-full text-brand-on-green hover:bg-black/[0.09] font-normal transition-all duration-200"
              style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.25rem)' }}
            >
              {item.label}
            </Link>
          ))}
          {/* Portals dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setPortalsOpen(true)}
            onMouseLeave={() => setPortalsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={portalsOpen}
              aria-haspopup="true"
              onClick={() => setPortalsOpen((open) => !open)}
              className="flex items-center gap-1 px-3 py-1 bg-black/10 text-brand-on-green hover:bg-black/[0.17] font-normal transition-all duration-200"
              style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.25rem)' }}
            >
              Portals
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <AnimatePresence>
              {portalsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-50 mt-0 min-w-[200px] bg-white shadow-premium-lg overflow-hidden"
                  style={{ borderBottomLeftRadius: '1rem' }}
                >
                  {portalItems.map((item) => {
                    const isExternal = item.href.startsWith("http");
                    return (
                    <Link
                      key={item.href}
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2 px-5 py-3 text-sm font-light text-gray-700 hover:bg-[#69AF23]/5 hover:text-brand-green-text transition-colors"
                    >
                      <ChevronRight className="h-3 w-3 text-gray-300" aria-hidden="true" />
                      {item.label}
                    </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mega menu panels — rendered here so they span full nav width */}
      {serviceNav.map((category) => (
        <div
          key={category.label}
          onMouseEnter={() => handleMouseEnter(category.label)}
          onMouseLeave={handleMouseLeave}
        >
          <MegaMenu
            category={category}
            isOpen={openMenu === category.label}
            onClose={handleClose}
          />
        </div>
      ))}
    </nav>
  );
}

/* ─────── Main Header Component ─────── */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navStuck, setNavStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const { direction, atTop } = useScrollNav();
  const reduce = useReducedMotion();

  // Return focus to the hamburger when the drawer closes (a11y: focus return).
  useEffect(() => {
    if (wasOpen.current && !mobileOpen) hamburgerRef.current?.focus();
    wasOpen.current = mobileOpen;
  }, [mobileOpen]);

  // At the very top the mobile header is always shown.
  const scrollingDown = direction === "down" && !atTop;
  const mobileHidden = scrollingDown && !mobileOpen;

  // Shadow the sticky green nav only once it's actually stuck to the top.
  // An IntersectionObserver on a sentinel avoids adding a second scroll listener.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setNavStuck(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mobile header: slide up on scroll-down, back on scroll-up. transform +
  // opacity only; reduced motion swaps the slide for a near-instant fade.
  const mobileMotion = reduce
    ? {
        animate: { opacity: mobileHidden ? 0 : 1, y: 0 },
        transition: { duration: 0 },
      }
    : {
        animate: { y: mobileHidden ? "-100%" : "0%" },
        transition: { duration: 0.2, ease: "easeOut" as const },
      };

  // Desktop green nav: same show/hide-on-scroll as the CTAs (0.3s ease-out,
  // same scroll-direction signal). Gated on `navStuck` so it only slides up once
  // it's actually pinned to the top — before that it scrolls away with the
  // header in normal flow.
  const navHidden = scrollingDown && navStuck;
  const navMotion = reduce
    ? {
        animate: { opacity: navHidden ? 0 : 1, y: 0 },
        transition: { duration: 0 },
      }
    : {
        animate: { y: navHidden ? "-100%" : "0%" },
        transition: { duration: 0.3, ease: "easeOut" as const },
      };

  return (
    <>
      {/* ===== DESKTOP HEADER ===== */}
      {/* Rendered as siblings (NOT wrapped in one div) so the sticky nav's
          containing block is the full page, not a short header-height box — a
          sticky element can only stick within its parent's bounds. Top bar +
          logo scroll away in normal flow; only the green nav sticks.
          The <header> below therefore covers ONLY the non-sticky rows; the
          green nav is its own <nav aria-label="Primary"> landmark. */}
      <header>
        {/* 1. Top Bar - Contact info */}
        <TopBar />

        {/* 2. Main Header Row - Logo + Search + Social */}
        <div className="hidden lg:block bg-white py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" style={{ marginLeft: 'clamp(-0.75rem, -0.75vw, -0.5rem)' }}>
              <Image
                src="/attached_assets/MGS LOGOOOOOOO_1750105578653.png"
                alt={COMPANY.name}
                width={320}
                height={100}
                className="w-auto transition-none"
                style={{ height: 'clamp(6rem, 8vw, 8rem)' }}
                priority
              />
            </Link>

            {/* Search + Social */}
            <div className="flex items-center gap-6">
              <SearchBar className="w-[clamp(20rem,30vw,30rem)]" />
              <div className="flex items-center gap-3">
                {/* Icon-only links need an accessible name; the icons
                    themselves are decorative to assistive tech. */}
                <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="MGS on Facebook (opens in a new tab)" className="text-gray-600 transition-colors hover:text-brand-green-text">
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="MGS on X (Twitter) (opens in a new tab)" className="text-gray-600 transition-colors hover:text-brand-green-text">
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href={COMPANY.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="MGS on LinkedIn (opens in a new tab)" className="text-gray-600 transition-colors hover:text-brand-green-text">
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sentinel: marks where the sticky nav engages, for the stuck shadow. */}
      <div ref={sentinelRef} aria-hidden className="hidden lg:block h-px -mb-px" />

      {/* 3. Green Navigation Bar + Mega Menu — sticks to the top, then hides on
             scroll-down / returns on scroll-up (matches the CTA buttons). */}
      <motion.div
        className="hidden lg:block sticky top-0 z-[999] transition-shadow duration-500"
        initial={false}
        animate={navMotion.animate}
        transition={navMotion.transition}
        style={{
          boxShadow: navStuck
            ? '0 10px 40px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.15)'
            : 'none',
          pointerEvents: navHidden ? 'none' : 'auto',
        }}
      >
        <DesktopNav />
      </motion.div>

      {/* ===== MOBILE HEADER ===== */}
      <motion.div
        className="lg:hidden sticky top-0 z-[998]"
        initial={false}
        animate={mobileMotion.animate}
        transition={mobileMotion.transition}
      >
        {/* Mobile main row — safe-area padding keeps it clear of a notch.
            A labelled <nav> rather than a second <header>: only one banner
            landmark is allowed per document, and the desktop rows own it. */}
        <nav
          aria-label="Mobile"
          className="flex items-center justify-between bg-white px-4 py-2 border-b border-gray-100"
          style={{ paddingTop: "calc(0.5rem + env(safe-area-inset-top))" }}
        >
          <Link href="/" aria-label="MGS home" className="flex min-h-11 items-center">
            <Image
              src="/attached_assets/MGS LOGOOOOOOO_1750105578653.png"
              alt={COMPANY.name}
              width={140}
              height={42}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-1">
            <a
              href={`tel:${COMPANY.phone.primary}`}
              aria-label="Call MGS"
              className="flex h-11 w-11 items-center justify-center text-gray-600 hover:text-brand-green-text"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
            {/* The compact "Quote" button that used to sit here is gone. On a
                phone it was on screen at the same moment as the sticky action
                bar's "Get a Quote" — same destination, twice, under two
                different names, competing inside a 390px row that also carries
                the phone icon and the hamburger. The sticky bar is permanent
                and its label is the canonical one, so this was the copy to
                drop. Desktop keeps its own quote button in the utility row,
                where there is room. */}
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-11 w-11 items-center justify-center text-gray-700"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </motion.div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
