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
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group relative block overflow-hidden rounded-none shadow-premium transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-2"
      >
        {/* Full image background */}
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            width={600}
            height={450}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/90" />
        </div>

        {/* Content at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] text-white transition-colors">
            {service.shortTitle}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-300 line-clamp-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
            {service.description}
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm font-bold text-brand-lime opacity-0 transition-all duration-500 group-hover:opacity-100">
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-green to-brand-lime opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>
    </motion.div>
  );
}
