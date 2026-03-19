"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { serviceNav, mainNav } from "@/lib/navigation";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronDown, Phone, Menu, X } from "lucide-react";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isScrolled = scrollY > 0;
  const isHidden = scrollDirection === "down" && scrollY > 200;

  return (
    <>
      {/* Green accent line at top */}
      <div className="fixed left-0 right-0 top-0 z-[101] h-[3px] bg-gradient-to-r from-brand-green via-brand-lime to-brand-green" />

      <header
        className={cn(
          "fixed left-0 right-0 top-[3px] z-[100] transition-all duration-500",
          isScrolled
            ? "bg-white/80 shadow-premium backdrop-blur-xl"
            : "bg-white/95 backdrop-blur-sm",
          isHidden ? "-translate-y-[calc(100%+3px)]" : "translate-y-0"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt={COMPANY.name}
              width={180}
              height={53}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-brand-green/5 hover:text-brand-green"
            >
              Home
            </Link>

            {/* Services Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-brand-green/5 hover:text-brand-green">
                Services
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    servicesOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Mega menu with backdrop blur */}
              <div
                className={cn(
                  "absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-300",
                  servicesOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                )}
              >
                <div className="w-[800px] rounded-2xl border border-gray-200/80 bg-white/95 p-8 shadow-premium-lg backdrop-blur-xl">
                  <div className="grid grid-cols-4 gap-8">
                    {serviceNav.map((category) => (
                      <div key={category.label}>
                        <h3 className="subtitle mb-3 text-brand-green">
                          {category.label}
                        </h3>
                        <ul className="space-y-1">
                          {category.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setServicesOpen(false)}
                                className="block rounded-lg px-2.5 py-1.5 text-sm text-gray-600 transition-all duration-200 hover:bg-brand-green/5 hover:text-brand-green"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-gray-100 pt-5">
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="inline-flex items-center gap-1 text-sm font-bold text-brand-green transition-all duration-300 hover:gap-2"
                    >
                      View All Services &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {mainNav
              .filter((item) => item.label !== "Home")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-brand-green/5 hover:text-brand-green"
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          {/* CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`tel:${COMPANY.phone.primary}`}
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-brand-green"
            >
              <Phone className="h-4 w-4" />
              {COMPANY.phone.display}
            </a>
            <Link
              href="/quote"
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-green to-brand-lime px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-green/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/30 hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
