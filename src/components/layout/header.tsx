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
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-[100] transition-all duration-300",
          isScrolled
            ? "bg-white/95 shadow-lg backdrop-blur-md"
            : "bg-white",
          isHidden ? "-translate-y-full" : "translate-y-0"
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
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-brand-green/10 hover:text-brand-green"
            >
              Home
            </Link>

            {/* Services Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-brand-green/10 hover:text-brand-green">
                Services
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    servicesOpen && "rotate-180"
                  )}
                />
              </button>

              {servicesOpen && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                  <div className="w-[800px] rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
                    <div className="grid grid-cols-4 gap-6">
                      {serviceNav.map((category) => (
                        <div key={category.label}>
                          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-green">
                            {category.label}
                          </h3>
                          <ul className="space-y-1">
                            {category.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={() => setServicesOpen(false)}
                                  className="block rounded-md px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-brand-green/10 hover:text-brand-green"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 border-t border-gray-100 pt-4">
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="text-sm font-medium text-brand-green hover:text-brand-lime"
                      >
                        View All Services →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {mainNav
              .filter((item) => item.label !== "Home")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-brand-green/10 hover:text-brand-green"
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          {/* CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${COMPANY.phone.primary}`}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-brand-green"
            >
              <Phone className="h-4 w-4" />
              {COMPANY.phone.display}
            </a>
            <Link
              href="/quote"
              className="rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-lime hover:shadow-lg"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-gray-700 lg:hidden"
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
