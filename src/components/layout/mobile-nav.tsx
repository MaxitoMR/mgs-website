"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { serviceNav } from "@/lib/navigation";
import { COMPANY } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed inset-x-0 top-0 z-[1000] max-h-screen overflow-y-auto bg-white lg:hidden"
          style={{ top: '120px' }}
        >
          <div className="p-6">
            {/* Services */}
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
              Services
            </p>
            {serviceNav.map((category) => (
              <div key={category.label} className="border-b border-gray-100">
                <button
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category.label ? null : category.label
                    )
                  }
                  className="flex w-full items-center justify-between py-3 text-sm font-light text-gray-700"
                >
                  {category.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
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
                          className="block py-2 pl-4 text-sm font-light text-gray-600 hover:text-[#69AF23]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Quick Actions */}
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                Quick Actions
              </p>
              <Link href="/about" onClick={onClose} className="block border-b border-gray-100 py-3 text-sm font-light text-gray-700 hover:text-[#69AF23]">
                About Us
              </Link>
              <Link href="/careers" onClick={onClose} className="block border-b border-gray-100 py-3 text-sm font-light text-gray-700 hover:text-[#69AF23]">
                Apply Now
              </Link>
              <Link href="/staff-portal" onClick={onClose} className="block border-b border-gray-100 py-3 text-sm font-light text-gray-700 hover:text-[#69AF23]">
                Staff Portal
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 space-y-3">
              <Link
                href="/quote"
                onClick={onClose}
                className="block w-full bg-[#69AF23] py-3 text-center font-light text-white shadow-md transition-all hover:bg-[#5a9e1d]"
              >
                Get Free Quote
              </Link>
              <Link
                href="/quote"
                onClick={onClose}
                className="block w-full border-2 border-[#69AF23] bg-white py-3 text-center font-light text-[#69AF23]"
              >
                Schedule Walkthrough
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
