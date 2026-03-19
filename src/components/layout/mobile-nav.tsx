"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { serviceNav, mainNav } from "@/lib/navigation";
import { COMPANY } from "@/lib/constants";
import { ChevronDown, Phone, Mail } from "lucide-react";
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/50 lg:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-[95] h-full w-80 overflow-y-auto bg-white shadow-2xl lg:hidden"
          >
            <div className="p-6 pt-20">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="block border-b border-gray-100 py-3 text-base font-medium text-gray-800 transition-colors hover:text-brand-green"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Services
                </p>
                {serviceNav.map((category) => (
                  <div key={category.label} className="border-b border-gray-100">
                    <button
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === category.label
                            ? null
                            : category.label
                        )
                      }
                      className="flex w-full items-center justify-between py-3 text-sm font-medium text-gray-700"
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
                              className="block py-2 pl-4 text-sm text-gray-600 hover:text-brand-green"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/quote"
                  onClick={onClose}
                  className="block w-full rounded-none bg-brand-green py-3 text-center font-semibold text-white shadow-md transition-all hover:bg-brand-lime"
                >
                  Get a Quote
                </Link>
                <a
                  href={`tel:${COMPANY.phone.primary}`}
                  className="flex items-center justify-center gap-2 rounded-none border border-brand-green py-3 font-medium text-brand-green"
                >
                  <Phone className="h-4 w-4" />
                  {COMPANY.phone.display}
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center justify-center gap-2 text-sm text-gray-600"
                >
                  <Mail className="h-4 w-4" />
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
