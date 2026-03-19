"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Heart,
  Factory,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { getServicesByCategory, serviceCategories } from "@/lib/services-data";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Heart,
  Factory,
  Sparkles,
};

const categoryImages: Record<string, string> = {
  commercial: "/attached_assets/Official_About_Us_Background_1__1752010002961.png",
  medical: "/attached_assets/Official_About_Us_Background_1__1752010002961.png",
  industrial: "/attached_assets/Official_About_Us_Background_1__1752010002961.png",
  additional: "/attached_assets/Official_About_Us_Background_1__1752010002961.png",
};

export function ServicesGrid() {
  return (
    <SectionWrapper id="services">
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="subtitle inline-block text-brand-green"
        >
          What We Do
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="mt-4 font-display text-4xl font-extrabold tracking-[-0.02em] text-gray-900 sm:text-5xl md:text-6xl"
        >
          Our Service Sectors
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.3 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-gray-500"
        >
          Comprehensive cleaning solutions across commercial, medical, and
          industrial facilities.
        </motion.p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {serviceCategories.map((category, index) => {
          const Icon = iconMap[category.icon];
          const categoryServices = getServicesByCategory(category.id);

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15 + index * 0.125 }}
              className="group relative overflow-hidden rounded-none bg-white shadow-premium transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-2"
            >
              {/* Gradient top accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-green to-brand-lime opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="p-8">
                {/* Icon with glow */}
                <div className="relative mb-6 inline-flex">
                  <div className="flex h-16 w-16 items-center justify-center rounded-none bg-gradient-to-br from-brand-green/10 to-brand-lime/10 text-brand-green transition-all duration-500 group-hover:from-brand-green group-hover:to-brand-lime group-hover:text-white group-hover:shadow-green-glow">
                    <Icon className="h-8 w-8" />
                  </div>
                </div>

                {/* Category badge with count */}
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="font-display text-xl font-extrabold tracking-[-0.01em] text-gray-900">
                    {category.name}
                  </h3>
                  <span className="inline-flex h-6 items-center rounded-none bg-brand-green/10 px-2.5 text-xs font-bold text-brand-green">
                    {categoryServices.length}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-gray-500">
                  {category.description}
                </p>

                <ul className="mt-5 space-y-1.5">
                  {categoryServices.slice(0, 4).map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group/link flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-brand-green"
                      >
                        <span className="h-1 w-1 rounded-none bg-gray-300 transition-colors group-hover/link:bg-brand-green" />
                        {service.shortTitle}
                      </Link>
                    </li>
                  ))}
                  {categoryServices.length > 4 && (
                    <li className="text-xs font-medium text-gray-400">
                      +{categoryServices.length - 4} more services
                    </li>
                  )}
                </ul>

                <Link
                  href="/services"
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-brand-green transition-all duration-300 hover:gap-3"
                >
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
