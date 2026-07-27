"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

type SearchBarProps = {
  /** Width/spacing overrides for the outer wrapper (desktop constrains, mobile is full width). */
  className?: string;
  /** Called after a result is chosen — used to close the mobile drawer. */
  onNavigate?: () => void;
};

export function SearchBar({ className, onNavigate }: SearchBarProps) {
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

  const hasQuery = query.trim().length > 0;

  const choose = () => {
    setShowResults(false);
    setQuery("");
    onNavigate?.();
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className={cn(
        "flex items-center gap-2 px-4 py-2.5 border transition-all duration-200",
        hasQuery
          ? "border-[#69AF23] bg-white shadow-sm"
          : "border-gray-200 bg-gray-50/80 hover:border-gray-300"
      )} style={{ borderTopLeftRadius: '0.75rem' }}>
        <Search className={cn("h-4 w-4 flex-shrink-0 transition-colors", hasQuery ? "text-brand-green-text" : "text-gray-400")} />
        <input
          type="text"
          placeholder="Search services..."
          aria-label="Search services"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowResults(true)}
          className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
        />
        {hasQuery && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => { setQuery(""); setShowResults(false); }}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div
          className="absolute left-0 right-0 top-full z-[2000] mt-2 max-h-80 overflow-y-auto bg-white shadow-premium-lg border border-gray-100"
          style={{ borderBottomLeftRadius: '1rem' }}
        >
          <div className="px-4 py-2 border-b border-gray-50">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{results.length} result{results.length !== 1 ? 's' : ''}</span>
          </div>
          {results.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={choose}
              className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-[#69AF23]/5 hover:text-brand-green-text border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-2.5">
                <ChevronRight className="h-3 w-3 text-gray-300" />
                <span className="font-light">{item.title}</span>
              </div>
              <span className={cn("px-2 py-0.5 text-[10px] font-semibold", categoryColors[item.category] || "bg-gray-100 text-gray-800")}>
                {item.category}
              </span>
            </Link>
          ))}
        </div>
      )}

      {showResults && hasQuery && results.length === 0 && (
        <div
          className="absolute left-0 right-0 top-full z-[2000] mt-2 bg-white shadow-premium-lg border border-gray-100 px-4 py-6 text-center"
          style={{ borderBottomLeftRadius: '1rem' }}
        >
          <p className="text-sm text-gray-400">No services found for &ldquo;{query}&rdquo;</p>
          <Link href="/quote" onClick={choose} className="text-xs text-brand-green-text font-medium mt-1 inline-block hover:underline">
            Request a custom quote instead
          </Link>
        </div>
      )}
    </div>
  );
}
