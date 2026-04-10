"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { serviceNav } from "@/lib/navigation";
import { COMPANY } from "@/lib/constants";
import { ChevronDown, Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[997] lg:hidden"
            onClick={onClose}
          />

          {/* Panel — slides in from right */}
          <motion.div
            initial={{ opacity: 0, x: 280 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 280 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[280px] z-[999] bg-white overflow-y-auto lg:hidden shadow-2xl"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[13px] font-bold tracking-[2px] text-gray-900">MGS</p>
                  <p className="text-[8px] font-medium text-gray-400 tracking-wider">MENU</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xs font-medium uppercase tracking-wider">
                  Close
                </button>
              </div>

              {/* Services */}
              <p className="mb-2 text-[9px] font-bold uppercase tracking-[1.5px] text-gray-400">
                Services
              </p>
              {serviceNav.map((category) => (
                <div key={category.label} className="border-b border-gray-50">
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category.label ? null : category.label
                      )
                    }
                    className="flex w-full items-center justify-between py-3 text-[13px] font-medium text-gray-700"
                  >
                    {category.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 text-gray-400 transition-transform",
                        expandedCategory === category.label && "rotate-180"
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
                            className="block py-2 pl-4 text-[12px] text-gray-500 hover:text-[#69AF23] border-l-2 border-gray-100 hover:border-[#69AF23] transition-colors"
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
              <p className="mt-5 mb-2 text-[9px] font-bold uppercase tracking-[1.5px] text-gray-400">
                Company
              </p>
              {[
                { label: "About Us", href: "/about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Careers", href: "/careers" },
                { label: "Diffusers", href: "/diffusers" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="block border-b border-gray-50 py-3 text-[13px] font-medium text-gray-700 hover:text-[#69AF23] transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* Portals */}
              <p className="mt-5 mb-2 text-[9px] font-bold uppercase tracking-[1.5px] text-gray-400">
                Portals
              </p>
              {[
                { label: "MGS Manager", href: "https://mgsmanagement.app/", external: true },
                { label: "Client Portal", href: "https://mgsclientportal.app/", external: true },
                { label: "Staff Portal", href: "/staff-portal", external: false },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={onClose}
                  className="flex items-center justify-between border-b border-gray-50 py-3 text-[13px] font-medium text-gray-700 hover:text-[#69AF23] transition-colors"
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
                  className="flex items-center justify-center w-full bg-[#69AF23] py-3 text-[13px] font-semibold text-white transition-all hover:bg-[#5a9e1d]"
                >
                  Get Free Quote
                </Link>
                <Link
                  href="/walkthrough"
                  onClick={onClose}
                  className="flex items-center justify-center w-full border-2 border-[#69AF23] py-3 text-[13px] font-semibold text-[#69AF23]"
                >
                  Schedule Walkthrough
                </Link>
              </div>

              {/* Contact info */}
              <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
                <a href={`tel:${COMPANY.phone.primary}`} className="flex items-center gap-2.5 text-[12px] text-gray-500 hover:text-[#69AF23]">
                  <Phone className="h-3.5 w-3.5" />
                  {COMPANY.phone.display}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 text-[12px] text-gray-500 hover:text-[#69AF23]">
                  <Mail className="h-3.5 w-3.5" />
                  {COMPANY.email}
                </a>
                <div className="flex items-start gap-2.5 text-[12px] text-gray-500">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
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
