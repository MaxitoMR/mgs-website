"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

interface Breadcrumb {
  label: string;
  href?: string;
}

/**
 * BreadcrumbList JSON-LD, derived from the SAME array that draws the visible
 * trail below. Emitting it here rather than per-page means every page using
 * PageHeader gets valid breadcrumb markup automatically, and the structured
 * data can never drift out of sync with what the user actually sees — which
 * is exactly what Google penalises.
 *
 * `item` is absolute (schema.org requires it) and omitted on the final crumb,
 * which represents the current page and has no href.
 */
function breadcrumbSchema(crumbs: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href
        ? { item: `${COMPANY.url}${crumb.href === "/" ? "" : crumb.href}` }
        : {}),
    })),
  };
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
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema(breadcrumbs)),
          }}
        />
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* /90 is the floor for 4.5:1 on this green — see the on-green token
            note in globals.css. The chevron may sit lower because it is
            decorative and only owes the 3:1 non-text threshold. */}
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-brand-on-green/90">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-brand-on-green/70" aria-hidden="true" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-300 hover:text-brand-on-green"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-light text-brand-on-green">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-gothic font-ultra-light text-5xl leading-tight text-brand-on-green md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl font-clinical font-thin text-lg leading-relaxed text-brand-on-green/90"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
