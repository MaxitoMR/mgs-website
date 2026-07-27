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
        "relative overflow-hidden bg-brand-green-deep py-24 md:py-32 lg:py-40",
        className
      )}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && (
          /* white/90 is the lowest opacity that clears 4.5:1 on the deep
             green (white/80 lands at 4.15 and fails for 14px text). */
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-white/90">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/70" aria-hidden="true" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-300 hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-light text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-gothic font-ultra-light text-5xl leading-tight text-white md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl font-clinical font-thin text-lg leading-relaxed text-white/90"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
