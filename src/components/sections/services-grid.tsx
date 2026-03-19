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

export function ServicesGrid() {
  return (
    <SectionWrapper id="services">
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm font-bold uppercase tracking-widest text-brand-green"
        >
          What We Do
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl"
        >
          Our Service Sectors
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
        >
          Comprehensive cleaning solutions across commercial, medical, and
          industrial facilities.
        </motion.p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {serviceCategories.map((category, index) => {
          const Icon = iconMap[category.icon];
          const categoryServices = getServicesByCategory(category.id);

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-brand-green/30 hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900">
                {category.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {category.description}
              </p>
              <ul className="mt-4 space-y-1">
                {categoryServices.slice(0, 4).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block text-sm text-gray-500 transition-colors hover:text-brand-green"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
                {categoryServices.length > 4 && (
                  <li className="text-xs text-gray-400">
                    +{categoryServices.length - 4} more
                  </li>
                )}
              </ul>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand-green transition-colors hover:text-brand-lime"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
