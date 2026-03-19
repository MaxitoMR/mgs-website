"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-[60px] md:py-[80px] lg:py-[120px]">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient-bg" />

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern" />

      {/* Floating decorative shapes */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-brand-lime/5 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-brand-green/5 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/3 top-10 h-40 w-40 rounded-full bg-white/3 blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="subtitle mb-5 text-brand-lime/80"
          >
            Get Started Today
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="max-w-3xl font-display text-4xl font-extrabold leading-[1.1em] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl"
          >
            Ready for a{" "}
            <span className="text-gradient">Cleaner Facility?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg text-gray-300/90"
          >
            Schedule a free walkthrough and get a custom quote tailored to your
            facility&apos;s needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.45 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/quote"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-10 py-5 font-bold text-brand-dark shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get a Free Quote
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-lime/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
            <a
              href={`tel:${COMPANY.phone.primary}`}
              className="glass inline-flex items-center justify-center gap-2 rounded-xl px-10 py-5 font-bold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
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
