"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Stethoscope, Factory, Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { services, serviceCategories, getServicesByCategory } from "@/lib/services-data";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, typeof Building2> = {
  commercial: Building2,
  medical: Stethoscope,
  industrial: Factory,
  additional: Sparkles,
};

/* Decorative fills (tinted chips, the active underline, the dark hero). */
const categoryColors: Record<string, string> = {
  commercial: "#69AF23",
  medical: "#19A0DB",
  industrial: "#FF8F00",
  additional: "#9FD01B",
};

/* Used where the hue becomes text or a meaningful icon. These are the
   AA-compliant set, darker than the decorative fills above on purpose — see
   the brand color seam in globals.css. The full-strength hues
   (#69AF23 / #19A0DB / #FF8F00 / #9FD01B) are 2.71 / 2.96 / 2.29 / 1.82 on
   white and belong on surfaces, not in lettering. */
const categoryTextColors: Record<string, string> = {
  commercial: "#54760F",
  medical: "#116D96",
  industrial: "#9A5600",
  additional: "#55700F",
};

export default function ServicesContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  /**
   * Mobile filter. `null` means "all".
   *
   * On a phone this page was 25 cards in one uninterrupted single-column
   * stack — 13,379px, sixteen screens, with no way to narrow it. The four
   * chips at the top looked like filters and were anchor jumps into the same
   * endless page, which is the worst of both: they promise a shorter list and
   * deliver a scroll. Someone who needs medical work should see medical work.
   *
   * Desktop keeps the anchor-jump model untouched: it has the sticky category
   * nav with its active-section underline, three or four cards per row, and
   * enough vertical space that the full catalogue reads as a catalogue rather
   * than as a wall.
   */
  const [filter, setFilter] = useState<string | null>(null);

  /* Honour a deep link. The drawer's "View all Commercial" and the footer both
     point at `/services#cat-<id>`; without this, arriving on mobile would
     land on the unfiltered list and scroll, which is the behaviour being
     replaced. */
  useEffect(() => {
    const id = window.location.hash.replace("#cat-", "");
    if (id && serviceCategories.some((c) => c.id === id)) setFilter(id);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    serviceCategories.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveCategory(cat.id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [filter]);

  const visibleCount = filter
    ? getServicesByCategory(filter).length
    : services.length;

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#111111]" style={{ paddingTop: 'clamp(3rem, 12vw, 10rem)', paddingBottom: 'clamp(2rem, 8vw, 7rem)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-white/70 lg:mb-6">
            <Link href="/" className="-mx-2 -my-3 px-2 py-3 transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">Services</span>
          </nav>
          {/* Plain elements, not `motion.h1` / `motion.p`. framer serialises
              `initial={{ opacity: 0 }}` into the server-rendered HTML, so this
              heading shipped as `opacity: 0` and was revealed only once
              hydration ran — the same failure PageHeader had, on the page that
              lists everything the company sells. With JavaScript disabled or a
              hydration error, "Our Services" never appeared at all.
              Above-the-fold content does not get animated in. */}
          <h1 className="t-h1 font-gothic text-white">
            Our <span className="text-brand-green-text">Services</span>
          </h1>
          <p
            className="t-lead text-gray-300 mt-4 max-w-xl"
          >
            {services.length} defined cleaning programs across the commercial, medical, industrial, and specialized sectors — each scoped to the standards of its environment.
          </p>

          {/* ── Desktop: anchor jumps into the full catalogue ─────────────── */}
          <div className="hidden lg:flex flex-wrap gap-3 mt-8">
            {serviceCategories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Sparkles;
              const color = categoryColors[cat.id];
              return (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="group flex min-h-11 items-center gap-2 px-4 py-2.5 text-sm font-medium text-white/70 border border-white/10 hover:border-white/30 hover:text-white transition-all"
                  style={{ borderTopLeftRadius: '1rem' }}
                >
                  <Icon className="h-4 w-4" style={{ color }} aria-hidden="true" />
                  {cat.name.replace(" Services", "")}
                </a>
              );
            })}
          </div>

          {/* ── Mobile: the same four categories, as an actual filter ─────── */}
          <div
            role="group"
            aria-label="Filter services by category"
            className="mt-6 flex flex-wrap gap-2 lg:hidden"
          >
            {[{ id: null as string | null, name: "All" }, ...serviceCategories].map((cat) => {
              const Icon = cat.id ? categoryIcons[cat.id] || Sparkles : null;
              const color = cat.id ? categoryColors[cat.id] : undefined;
              const isOn = filter === cat.id;
              return (
                <button
                  key={cat.id ?? "all"}
                  type="button"
                  onClick={() => setFilter(cat.id)}
                  aria-pressed={isOn}
                  className={cn(
                    "flex min-h-11 items-center gap-2 border px-4 text-sm font-medium transition-all",
                    isOn
                      ? "border-brand-green-deep bg-brand-green-deep text-brand-on-green"
                      : "border-white/15 text-white/75 hover:border-white/30 hover:text-white",
                  )}
                  style={{ borderTopLeftRadius: '1rem' }}
                >
                  {Icon && (
                    <Icon
                      className="h-4 w-4"
                      style={{ color: isOn ? undefined : color }}
                      aria-hidden="true"
                    />
                  )}
                  {cat.name.replace(" Services", "")}
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="mt-3 text-sm text-gray-400 lg:hidden">
            Showing {visibleCount} of {services.length} services
          </p>
        </div>
      </div>

      {/* Sticky category nav (desktop) */}
      <div className="hidden lg:block sticky top-[clamp(3rem,3.5vw,3.5rem)] z-[500] bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-1 py-2">
            {serviceCategories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Sparkles;
              const color = categoryColors[cat.id];
              const textColor = categoryTextColors[cat.id];
              const isActive = activeCategory === cat.id;
              return (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all",
                    /* gray-600, not gray-400: #99a1af is 2.6:1 on this white bar. */
                    isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-4 w-4" style={{ color: isActive ? textColor : undefined }} aria-hidden="true" />
                  {cat.name.replace(" Services", "")}
                  {isActive && (
                    <motion.div
                      layoutId="cat-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2px]"
                      style={{ backgroundColor: color }}
                    />
                  )}
                </a>
              );
            })}
            <Link
              href="/quote"
              className="ml-auto flex items-center gap-1.5 px-4 py-2 bg-brand-green-deep text-brand-on-green text-sm font-medium hover:bg-brand-green-deep-hover transition-colors"
              style={{ borderTopLeftRadius: '0.75rem' }}
            >
              Get a Quote
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      {serviceCategories.map((category, catIndex) => {
        const categoryServices = getServicesByCategory(category.id);
        const Icon = categoryIcons[category.id] || Sparkles;
        const color = categoryColors[category.id];
        const textColor = categoryTextColors[category.id];
        const bgColor = catIndex % 2 === 0 ? "bg-white" : "bg-paper";
        /* `hidden lg:block`, not an unmounted branch: keeping every section in
           the DOM is what lets the desktop anchor links, the sticky nav's
           IntersectionObservers and the `#cat-` deep links all keep working
           regardless of what the mobile filter happens to be set to. */
        const filteredOut = filter !== null && filter !== category.id;

        return (
          <section
            key={category.id}
            id={`cat-${category.id}`}
            className={cn(
              "relative w-full scroll-mt-24",
              bgColor,
              filteredOut && "hidden lg:block",
            )}
            style={{ paddingTop: 'clamp(1.75rem, 5vw, 5rem)', paddingBottom: 'clamp(1.75rem, 5vw, 5rem)' }}
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
              <div className="flex items-start gap-4 mb-6 lg:mb-10">
                <div
                  className="flex h-12 w-12 items-center justify-center flex-shrink-0"
                  style={{ background: `${color}12`, borderTopLeftRadius: '0.75rem' }}
                >
                  <Icon className="h-6 w-6" style={{ color: textColor }} aria-hidden="true" />
                </div>
                <div>
                  <p className="eyebrow mb-1" style={{ color: textColor }}>{category.name.toUpperCase()}</p>
                  <h2
                    className="font-gothic text-gray-900"
                    style={{ fontSize: 'var(--font-h3)', fontWeight: 400 }}
                  >
                    {category.description}
                  </h2>
                </div>
              </div>

              {/* ── The card ─────────────────────────────────────────────────
                  Two shapes from one markup. On a phone it is a list row:
                  80×80 thumbnail, title, one line of description, chevron —
                  about 96px against the 370px the 16:10 hero card was taking.
                  The big image was not earning its space at this width; it was
                  the reason twenty-five services needed sixteen screens.

                  At `lg:` it unfolds back into the rich card the desktop design
                  calls for, with the image on top and the hover reveal. */}
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {categoryServices.map((service, i) => (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="mgs-card group flex items-center gap-3 overflow-hidden rounded-tl-2xl p-2 sm:block sm:rounded-tl-[1.5rem] sm:p-0"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden sm:aspect-[16/10] sm:h-auto sm:w-full">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 80px, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div
                          className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: color }}
                        />
                      </div>

                      <div className="min-w-0 flex-1 sm:p-5">
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-brand-green-text transition-colors">
                          {service.shortTitle}
                        </h3>
                        {/* 14px, up from 12. This is the only sentence a
                            visitor gets before deciding whether to open the
                            page, and it was set two steps below body size. */}
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2 sm:mt-1.5" style={{ fontWeight: 300, lineHeight: 1.55 }}>
                          {service.description}
                        </p>
                        <div className="hidden sm:flex items-center gap-1 mt-3 text-xs font-medium text-brand-green-text opacity-0 group-hover:opacity-100 transition-opacity">
                          Learn more <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </div>
                      </div>

                      <ChevronRight
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-gray-300 sm:hidden"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="bg-[#111111]" style={{ paddingTop: 'clamp(1.75rem, 5vw, 5rem)', paddingBottom: 'clamp(1.75rem, 5vw, 5rem)' }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-gothic text-white mb-4" style={{ fontSize: 'var(--font-h2)', fontWeight: 300 }}>
            Don&apos;t see what you need?
          </h2>
          <p className="text-gray-400 mb-8 text-sm" style={{ fontWeight: 300, lineHeight: 1.7 }}>
            Tell us about the space and we scope a program against it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 bg-brand-green-deep px-7 py-3.5 text-brand-on-green font-medium hover:bg-brand-green-deep-hover transition-all"
              style={{ borderTopLeftRadius: '1.25rem' }}
            >
              Get a Custom Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/walkthrough"
              className="inline-flex items-center justify-center gap-2 border border-white/20 px-7 py-3.5 text-white font-light hover:border-white/40 hover:bg-white/5 transition-all"
              style={{ borderTopLeftRadius: '1.25rem' }}
            >
              Schedule Walkthrough
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
