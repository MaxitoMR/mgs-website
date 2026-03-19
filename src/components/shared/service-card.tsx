"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services-data";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-brand-green/30"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            width={600}
            height={450}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-brand-green transition-colors">
            {service.shortTitle}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {service.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-green">
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
