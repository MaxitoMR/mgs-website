"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

// `backdrop` must match the background of whatever section sits directly above
// this one, because the green box's curved corner reveals it. Homepage stacks
// it under AppPromo (#191919); the About page stacks it under WhyChooseUs (#111111).
export function CtaBanner({ backdrop = "#191919" }: { backdrop?: string }) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: backdrop }}
    >
      {/* Green inner with curved top-left, sitting on the dark backdrop */}
      <div
        className="relative w-full bg-brand-green-deep"
        style={{ borderTopLeftRadius: 'clamp(2.5rem, 5vw, 8rem)' }}
      >

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 section-padding text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-gothic text-white"
          style={{ fontSize: 'var(--font-h2)', fontWeight: 300 }}
        >
          Request a site assessment.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/90 mt-6 mb-12 max-w-2xl mx-auto"
          style={{ fontSize: 'var(--font-body-large)', fontWeight: 300, lineHeight: 1.7 }}
        >
          We will walk your facility, scope the work against your requirements, and
          return a detailed proposal. No obligation.
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
            className="inline-flex items-center gap-3 bg-white px-8 py-4 font-medium text-brand-green-text transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
            style={{ fontSize: 'var(--font-body-base)', borderTopLeftRadius: '1.5rem' }}
          >
            Schedule Free Assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="tel:+12818295357"
            className="inline-flex items-center gap-3 border-2 border-white/50 px-8 py-4 font-light text-white transition-all duration-300 hover:border-white hover:bg-white/10"
            style={{ fontSize: 'var(--font-body-base)', borderTopLeftRadius: '1.5rem' }}
          >
            <Phone className="h-4 w-4" />
            Call (281) 829-5357
          </a>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
