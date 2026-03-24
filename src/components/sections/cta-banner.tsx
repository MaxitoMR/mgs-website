"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="full-screen-section relative overflow-hidden radius-large bg-[#69AF23]">
      {/* Decorative shapes — AbbVie-style layered elements */}
      <div
        className="absolute top-0 right-0 w-[40%] h-full opacity-10"
        style={{
          background: 'radial-gradient(circle at 70% 30%, #ffffff 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[30%] h-[60%] opacity-5"
        style={{
          background: 'radial-gradient(circle at 30% 70%, #000000 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 section-padding text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-gothic text-white"
          style={{ fontSize: 'var(--font-h2)', fontWeight: 300 }}
        >
          Ready to transform your facility?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/90 mt-6 mb-12 max-w-2xl mx-auto"
          style={{ fontSize: 'var(--font-body-large)', fontWeight: 300, lineHeight: 1.7 }}
        >
          Experience the MGS difference with a complimentary facility assessment
          and customized cleaning proposal tailored to your needs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/quote"
            className="inline-flex items-center gap-3 bg-white px-8 py-4 font-medium text-[#69AF23] transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
            style={{ fontSize: 'var(--font-body-base)', borderTopLeftRadius: '1.5rem' }}
          >
            Schedule Free Assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="tel:+12818295358"
            className="inline-flex items-center gap-3 border-2 border-white/50 px-8 py-4 font-light text-white transition-all duration-300 hover:border-white hover:bg-white/10"
            style={{ fontSize: 'var(--font-body-base)', borderTopLeftRadius: '1.5rem' }}
          >
            <Phone className="h-4 w-4" />
            Call (281) 829-5358
          </a>
        </motion.div>
      </div>
    </section>
  );
}
