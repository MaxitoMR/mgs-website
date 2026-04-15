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

const categoryColors: Record<string, string> = {
  commercial: "#69AF23",
  medical: "#2196F3",
  industrial: "#FF8F00",
  additional: "#9FD01B",
};

export default function ServicesContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
  }, []);

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#1a252f]" style={{ paddingTop: 'clamp(6rem, 12vw, 10rem)', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/90">Services</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-gothic text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, lineHeight: 1.1 }}
          >
            Our <span className="text-[#69AF23]">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 mt-4 max-w-xl"
            style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', fontWeight: 300, lineHeight: 1.7 }}
          >
            {services.length}+ specialized cleaning solutions across commercial, medical, industrial, and specialized sectors.
          </motion.p>

          <div className="flex flex-wrap gap-3 mt-8">
            {serviceCategories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Sparkles;
              const color = categoryColors[cat.id];
              return (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="group flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white/70 border border-white/10 hover:border-white/30 hover:text-white transition-all"
                  style={{ borderTopLeftRadius: '1rem' }}
                >
                  <Icon className="h-4 w-4" style={{ color }} />
                  {cat.name.replace(" Services", "")}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky category nav (desktop) */}
      <div className="hidden lg:block sticky top-[clamp(3rem,3.5vw,3.5rem)] z-[500] bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-1 py-2">
            {serviceCategories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Sparkles;
              const color = categoryColors[cat.id];
              const isActive = activeCategory === cat.id;
              return (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all",
                    isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-700"
                  )}
                >
                  <Icon className="h-4 w-4" style={{ color: isActive ? color : undefined }} />
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
              className="ml-auto flex items-center gap-1.5 px-4 py-2 bg-[#69AF23] text-white text-sm font-medium hover:bg-[#5a9a1e] transition-colors"
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
        const bgColor = catIndex % 2 === 0 ? "bg-white" : "bg-[#FBFBFE]";

        return (
          <section
            key={category.id}
            id={`cat-${category.id}`}
            className={`relative w-full ${bgColor} scroll-mt-24`}
            style={{ paddingTop: 'clamp(3rem, 5vw, 5rem)', paddingBottom: 'clamp(3rem, 5vw, 5rem)' }}
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
              <div className="flex items-start gap-4 mb-10">
                <div
                  className="flex h-12 w-12 items-center justify-center flex-shrink-0"
                  style={{ background: `${color}12`, borderTopLeftRadius: '0.75rem' }}
                >
                  <Icon className="h-6 w-6" style={{ color }} />
                </div>
                <div>
                  <p className="eyebrow mb-1" style={{ color }}>{category.name.toUpperCase()}</p>
                  <h2
                    className="font-gothic text-gray-900"
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 300 }}
                  >
                    {category.description}
                  </h2>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                      className="group block bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      style={{ borderTopLeftRadius: '1.5rem' }}
                    >
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div
                          className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: color }}
                        />
                      </div>

                      <div className="p-5">
                        <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-[#69AF23] transition-colors">
                          {service.shortTitle}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2" style={{ fontWeight: 300, lineHeight: 1.6 }}>
                          {service.description}
                        </p>
                        <div className="flex items-center gap-1 mt-3 text-xs font-medium text-[#69AF23] opacity-0 group-hover:opacity-100 transition-opacity">
                          Learn more <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="bg-[#1a252f]" style={{ paddingTop: 'clamp(3rem, 5vw, 5rem)', paddingBottom: 'clamp(3rem, 5vw, 5rem)' }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-gothic text-white mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300 }}>
            Don&apos;t see what you need?
          </h2>
          <p className="text-gray-400 mb-8 text-sm" style={{ fontWeight: 300, lineHeight: 1.7 }}>
            We offer custom cleaning solutions for unique facility requirements. Tell us about your space and we&apos;ll build a plan that fits.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 bg-[#69AF23] px-7 py-3.5 text-white font-medium hover:bg-[#5a9a1e] transition-all"
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
