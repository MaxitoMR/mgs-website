"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const areas = [
  "Katy", "Houston", "Sugar Land", "Cypress", "Richmond",
  "Rosenberg", "Fulshear", "Brookshire", "Missouri City", "Stafford",
  "Bellaire", "West University Place", "Spring", "The Woodlands", "Pearland",
  "League City", "Pasadena", "Baytown", "Conroe", "Galveston",
];

export function ServiceAreas() {
  return (
    <SectionWrapper>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-bold uppercase tracking-widest text-brand-green"
          >
            Service Coverage
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            Serving the Greater Houston Area
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-600"
          >
            Based in Katy, TX, we provide professional janitorial services
            across the entire Greater Houston metropolitan area. Our teams are
            strategically positioned for rapid response and consistent service
            delivery.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        >
          {areas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700"
            >
              <MapPin className="h-3 w-3 text-brand-green" />
              {area}
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
