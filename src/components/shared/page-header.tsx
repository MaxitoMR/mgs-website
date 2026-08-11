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
        /* Mobile padding is roughly half what it was. This block holds a
           breadcrumb, an h1 and one sentence; at py-24 it ran to 57–68vh on a
           phone, so a visitor who tapped through from a service card landed on
           a flat colour field and had to scroll before seeing any of the page
           they asked for. py-14 lands the whole header near 45vh, which leaves
           real content above the fold. `md:` and `lg:` are untouched — the
           desktop proportions were never the problem. */
        "relative overflow-hidden bg-brand-green-deep py-14 sm:py-20 md:py-32 lg:py-40",
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
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-x-2 text-sm text-brand-on-green/90 md:mb-8">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-brand-on-green/70" aria-hidden="true" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    /* `py-3 -my-3` buys a 44px tall tap target out of a 20px
                       line without moving anything: the padding grows the hit
                       box, the equal negative margin gives the row back the
                       height it would otherwise gain. A crumb is one of the
                       smallest links on the page and sits directly under the
                       thumb's travel path from the header. */
                    className="-mx-2 -my-3 px-2 py-3 transition-colors duration-300 hover:text-brand-on-green"
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
        {/* No entry animation, deliberately. These two elements were
            `motion.h1` / `motion.p` starting at `opacity: 0` and revealed by
            framer on mount — so until hydration ran, every page using this
            header painted as a bare colour field with a breadcrumb on it, and
            any hydration hiccup left the h1 permanently invisible. Above-the-
            fold content has nothing to gain from being animated in: it is
            already the first thing seen. Below-the-fold reveals stay. */}
        {/* `t-h1`, replacing `text-[2.125rem] md:text-6xl lg:text-7xl`. That
            ran to 72px on desktop — larger than the homepage hero's 58px — so
            an interior page announced itself more loudly than the front door.
            The h1 rung tops out at 52px, deliberately just under the hero. */}
        <h1 className="t-h1 font-gothic text-brand-on-green">
          {title}
        </h1>
        {subtitle && (
          /* Was `text-xl … lg:text-lg`: 20px on a phone and 18px on a desktop.
             The lede got smaller as the screen got bigger, on all 14 pages
             this header serves. `t-lead` runs the other way, 18 → 20. */
          <p className="t-lead mt-5 max-w-2xl font-clinical text-brand-on-green/90">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
