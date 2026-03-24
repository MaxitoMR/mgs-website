"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { serviceNav, rightNav, portalItems } from "@/lib/navigation";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronDown, Search, Facebook, Twitter, Linkedin, Phone, Mail, Menu, X } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { TopBar } from "./top-bar";

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
function MegaMenu({ category, isOpen }: { category: typeof serviceNav[0]; isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-50 border-t-2 border-[#69AF23] bg-white shadow-2xl">
      <div className="mx-auto max-w-7xl p-6" style={{ padding: 'clamp(1rem, 2vw, 2rem)', gap: 'clamp(0.75rem, 1.5vw, 1.5rem)' }}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" style={{ gap: 'clamp(0.5rem, 1vw, 1rem)' }}>
          {category.items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-sm font-light text-gray-600 transition-colors hover:bg-[#69AF23]/5 hover:text-[#69AF23]"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-4 border-t border-gray-200 pt-4">
          <Link href="/quote" className="text-sm font-light text-[#69AF23] hover:text-[#9FD01B]">
            Need a Custom Solution? Contact us for a free assessment &rarr;
          </Link>
        </div>
      </div>
    </div>
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
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
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
              <button className="flex items-center gap-1 px-3 text-white hover:text-green-100 font-light transition-colors" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.25rem)' }}>
                {category.label}
                <ChevronDown className="h-4 w-4" />
              </button>
              <MegaMenu category={category} isOpen={openMenu === category.label} />
            </div>
          ))}
          <Link href="/diffusers" className="flex items-center px-3 text-white hover:text-green-100 font-light transition-colors" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.25rem)' }}>
            Diffusers
          </Link>
        </div>

        {/* Right: About, Apply Now, Portals */}
        <div className="flex h-full items-center" style={{ gap: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
          {rightNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-3 text-white hover:text-green-100 font-light transition-colors"
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
            <button className="flex items-center gap-1 px-3 py-1 bg-white/10 text-white hover:text-green-100 font-light transition-colors" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.25rem)' }}>
              Portals
              <ChevronDown className="h-4 w-4" />
            </button>
            {portalsOpen && (
              <div className="absolute right-0 top-full z-50 mt-0 min-w-[180px] border border-gray-200 bg-white shadow-lg">
                {portalItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm font-light text-gray-700 hover:bg-[#69AF23]/5 hover:text-[#69AF23]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ─────── Main Header Component ─────── */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ===== DESKTOP HEADER ===== */}
      <div className="hidden lg:block">
        {/* 1. Top Bar - Contact info */}
        <TopBar />

        {/* 2. Main Header Row - Logo + Search + Social */}
        <div className="bg-white py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" style={{ marginLeft: 'clamp(-0.75rem, -0.75vw, -0.5rem)' }}>
              <Image
                src="/attached_assets/MGS LOGOOOOOOO_1750105578653.png"
                alt={COMPANY.name}
                width={320}
                height={100}
                className="w-auto"
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

        {/* 3. Green Navigation Bar */}
        <DesktopNav />
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
