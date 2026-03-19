"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-green to-brand-lime py-16 md:py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold text-white sm:text-4xl"
            >
              Ready for a Cleaner Facility?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 max-w-md text-lg text-white/90"
            >
              Schedule a free walkthrough and get a custom quote tailored to your
              facility&apos;s needs.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/quote"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-brand-green shadow-xl transition-all hover:bg-gray-50 hover:shadow-2xl"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${COMPANY.phone.primary}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/50 px-8 py-4 font-semibold text-white transition-all hover:border-white hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              {COMPANY.phone.display}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
