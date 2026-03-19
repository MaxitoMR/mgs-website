"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-brand-dark py-24 md:py-32 lg:py-40",
        className
      )}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#1a2a3a] to-brand-dark" />
      <div className="absolute inset-0 grid-pattern" />

      {/* Decorative green glows */}
      <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-green/5 blur-[100px]" />
      <div className="absolute -right-32 bottom-0 h-48 w-48 rounded-full bg-brand-lime/5 blur-[80px]" />

      {/* Diagonal accent */}
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-brand-green/3 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-2 text-sm text-gray-400"
          >
            {breadcrumbs.map((crumb, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-2"
              >
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-500" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-300 hover:text-brand-lime"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-brand-lime">{crumb.label}</span>
                )}
              </motion.span>
            ))}
          </motion.nav>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-extrabold leading-[1em] tracking-[-0.02em] text-white md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300/90"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-brand-green to-brand-lime"
        />
      </div>
    </div>
  );
}
