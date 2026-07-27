"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/lib/services-data";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="service-category-card group relative block overflow-hidden"
      >
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
            className="h-full w-full relative"
          >
            <Image
              src={service.image}
              /* Decorative: the visible <h3> below already names the card,
                 and the link takes its accessible name from that heading.
                 A duplicate alt would make AT announce the title twice. */
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </motion.div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {/* Green hover overlay */}
          <div className="absolute inset-0 bg-[rgba(105,175,35,0.2)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-clinical font-light text-[#FBFBFE] text-sm lg:text-base text-center">
            {service.shortTitle}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
