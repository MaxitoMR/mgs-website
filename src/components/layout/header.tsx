"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { serviceNav, rightNav, portalItems } from "@/lib/navigation";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  ChevronDown, ChevronRight, Search, Facebook, Twitter, Linkedin,
  Phone, Mail, Menu, X,
  Building2, Stethoscope, Factory, Wrench, ArrowRight,
} from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { TopBar } from "./top-bar";

/* ─────── Category metadata for mega menu ─────── */
const categoryMeta: Record<string, {
  icon: typeof Building2;
  color: string;
  description: string;
  image: string;
}> = {
  Commercial: {
    icon: Building2,
    color: "#69AF23",
    description: "Professional cleaning solutions for offices, retail, restaurants, and business environments.",
    image: "/images/1_1751323808589.png",
  },
  Medical: {
    icon: Stethoscope,
    color: "#2196F3",
    description: "Infection-control-grade protocols for surgical centers, labs, imaging facilities, and clinics.",
    image: "/images/imaging center image_1752168794610.png",
  },
  Industrial: {
    icon: Factory,
    color: "#FF8F00",
    description: "Heavy-duty cleaning for factories, petrochemical plants, warehouses, and power facilities.",
    image: "/images/IMG_1741_1751917994935.JPG",
  },
  Specialized: {
    icon: Wrench,
    color: "#9FD01B",
    description: "Advanced solutions for post-construction, concrete, windows, power washing, and more.",
    image: "/images/7_1752264862114.png",
  },
};

/* ─────── Search Data ─────── */
const searchData = [
  { title: "Multi-Tenant Offices", category: "Commercial", href: "/services/multi-tenant-offices" },
  { title: "Retail Facilities", category: "Commercial", href: "/services/retail-facilities" },
  { title: "Restaurants", category: "Commercial", href: "/services/restaurants" },
  { title: "Surgery Centers", category: "Medical", href: "/services/surgery-centers" },
  { title: "Factory Plants", category: "Industrial", href: "/services/factory-plants" },
  { title: "Post-Construction", category: "Services", href: "/services/post-construction" },
  { title: "Window Cleaning", category: "Services", href: "/services/windows" },
  { title: "Power Washing", category: "Services", href: "/services/power-washing" },
  { title: "About Us", category: "Company", href: "/about" },
  { title: "Request a Quote", category: "Services", href: "/quote" },
  { title: "Careers", category: "Careers", href: "/careers" },
  { title: "Concrete Floors", category: "Services", href: "/services/concrete-floors" },
];

const categoryColors: Record<string, string> = {
  Commercial: "bg-blue-100 text-blue-800",
  Medical: "bg-green-100 text-green-800",
  Industrial: "bg-orange-100 text-orange-800",
  Services: "bg-purple-100 text-purple-800",
  Company: "bg-gray-100 text-gray-800",
  Careers: "bg-teal-100 text-teal-800",
};

/* ─────── Search Bar Component ─────── */
function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof searchData>([]);
  const [showResults, setShowResults] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        const filtered = searchData.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setShowResults(true);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={ref} className="relative" style={{ width: 'clamp(28rem, 35vw, 35rem)' }}>
      <div className="flex items-center border border-gray-300 bg-gray-50">
        <Search className="ml-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search services..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowResults(true)}
          className="w-full bg-transparent px-3 py-2 text-sm font-light text-gray-700 placeholder:text-gray-400 focus:outline-none"
        />
      </div>
      {showResults && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-96 overflow-y-auto border border-gray-200 bg-white shadow-lg">
          {results.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => { setShowResults(false); setQuery(""); }}
              className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              <span>{item.title}</span>
              <span className={cn("rounded-sm px-2 py-0.5 text-xs", categoryColors[item.category] || "bg-gray-100 text-gray-800")}>
                {item.category}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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
                    <Icon className="h-5 w-5" style={{ color: meta?.color || '#69AF23' }} />
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
                      className="group flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 transition-all duration-200 hover:bg-[#69AF23]/5 hover:text-[#69AF23]"
                      style={{ borderTopLeftRadius: '0.5rem' }}
                    >
                      <ChevronRight
                        className="h-3.5 w-3.5 text-gray-300 transition-all duration-200 group-hover:text-[#69AF23] group-hover:translate-x-0.5"
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
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#69AF23] hover:text-[#5a9a1e] transition-colors"
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
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#69AF23] text-white text-sm font-medium transition-all hover:bg-[#5a9a1e]"
                      style={{ borderTopLeftRadius: '0.75rem' }}
                    >
                      Request Quote
                      <ArrowRight className="h-3.5 w-3.5 ml-auto" />
                    </Link>
                    <a
                      href={`tel:${COMPANY.phone.primary}`}
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-light transition-all hover:border-[#69AF23] hover:text-[#69AF23]"
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

  return (
    <nav className="bg-[#69AF23] relative z-[1000]" style={{ height: 'clamp(3rem, 3.5vw, 3.5rem)' }}>
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
                className={cn(
                  "flex items-center gap-1 px-3 h-full text-white font-light transition-all duration-200",
                  openMenu === category.label
                    ? "bg-white/15"
                    : "hover:bg-white/10"
                )}
                style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.25rem)' }}
              >
                {category.label}
                <ChevronDown
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
            className="flex items-center px-3 text-white hover:bg-white/10 h-full font-light transition-all duration-200"
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
              className="flex items-center px-3 h-full text-white hover:bg-white/10 font-light transition-all duration-200"
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
              className="flex items-center gap-1 px-3 py-1 bg-white/10 text-white hover:bg-white/15 font-light transition-all duration-200"
              style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.25rem)' }}
            >
              Portals
              <ChevronDown className="h-3.5 w-3.5" />
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
                      className="flex items-center gap-2 px-5 py-3 text-sm font-light text-gray-700 hover:bg-[#69AF23]/5 hover:text-[#69AF23] transition-colors"
                    >
                      <ChevronRight className="h-3 w-3 text-gray-300" />
                      {item.label}
                    </Link>
                    );}
                  ))}
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
  const desktopRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const logoRowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);

  const [stickyOffset, setStickyOffset] = useState(-999);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let topH = 0;
    let logoH = 0;

    const measure = () => {
      topH = topBarRef.current?.offsetHeight || 0;
      logoH = logoRowRef.current?.offsetHeight || 0;
      setStickyOffset(-(topH + logoH));
    };
    measure();

    const onScroll = () => {
      setIsScrolled(window.scrollY > topH + logoH);
    };

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* ===== DESKTOP HEADER ===== */}
      <div ref={desktopRef} className="hidden lg:block" style={{ position: 'sticky', top: `${stickyOffset}px`, zIndex: 999 }}>
        {/* 1. Top Bar - Contact info */}
        <div ref={topBarRef}>
          <TopBar />
        </div>

        {/* 2. Main Header Row - Logo + Search + Social */}
        <div ref={logoRowRef} className="bg-white py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" style={{ marginLeft: 'clamp(-0.75rem, -0.75vw, -0.5rem)' }}>
              <Image
                ref={logoRef}
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
              <SearchBar />
              <div className="flex items-center gap-3">
                <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-[#69AF23]">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-[#69AF23]">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href={COMPANY.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-[#69AF23]">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Green Navigation Bar + Mega Menu */}
        <div
          ref={navBarRef}
          className="transition-shadow duration-300"
          style={{
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.1)' : 'none',
          }}
        >
          <DesktopNav />
        </div>
      </div>

      {/* ===== MOBILE HEADER ===== */}
      <div className="lg:hidden">
        {/* Mobile top contact bar */}
        <div className="flex h-8 items-center justify-center gap-4 bg-white text-xs text-gray-600">
          <a href={`tel:${COMPANY.phone.primary}`} className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {COMPANY.phone.display}
          </a>
          <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {COMPANY.email}
          </a>
        </div>

        {/* Mobile main row */}
        <div className="flex items-center justify-between bg-white px-4 py-2">
          <Link href="/">
            <Image
              src="/attached_assets/MGS LOGOOOOOOO_1750105578653.png"
              alt={COMPANY.name}
              width={160}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile green nav bar */}
        <div className="bg-[#69AF23] px-4 py-2">
          <div className="flex items-center justify-center gap-4 text-sm text-white font-light">
            <Link href="/services" className="hover:text-green-100">Services</Link>
            <Link href="/about" className="hover:text-green-100">About</Link>
            <Link href="/quote" className="hover:text-green-100">Quote</Link>
          </div>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
