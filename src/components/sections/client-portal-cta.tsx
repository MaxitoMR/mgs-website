"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, FileText, Star, ClipboardCheck } from "lucide-react";

const features = [
  { icon: LayoutDashboard, label: "Location Health Scores" },
  { icon: FileText, label: "Pay Invoices Online" },
  { icon: Star, label: "Submit Service Feedback" },
  { icon: ClipboardCheck, label: "View QA Reports" },
];

export function ClientPortalCta() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#f0f5e8]"
      /* clamp minimum halved. Below ~800px the vw term is smaller than the
         floor, so the floor is what phones actually get — 80px top and bottom
         was a sixth of a 715px screen spent on nothing. The max is untouched,
         and the ramp between them is continuous, so desktop is unchanged. */
      style={{ paddingTop: 'clamp(2.5rem, 10vw, 8rem)', paddingBottom: 'clamp(2.5rem, 10vw, 8rem)' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left — text (5 cols on desktop) */}
          <div className="lg:col-span-5 relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow text-brand-green-text mb-5"
            >
              Client Portal
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-gothic text-gray-900"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              Your facility,
              <br />
              <span className="text-brand-green-text">in full view.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 mt-4 mb-5 lg:mt-5 lg:mb-7"
              style={{ fontSize: 'clamp(1rem, 1.1vw, 1rem)', fontWeight: 300, lineHeight: 1.7 }}
            >
              A dedicated client portal: review QA inspection reports, settle invoices,
              and log service requests — a complete record of the work at your site,
              without a phone call.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 lg:mb-8"
            >
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-brand-green-text flex-shrink-0" />
                    <span className="text-sm text-gray-700 lg:text-[13px] lg:leading-[1.6]" style={{ fontWeight: 400 }}>{f.label}</span>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://www.mgsclientportal.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-brand-green-deep px-6 py-3 text-brand-on-green text-sm font-medium transition-all duration-300 hover:bg-brand-green-deep-hover hover:shadow-lg"
                style={{ borderTopLeftRadius: '1rem' }}
              >
                Go to Portal
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://www.mgsclientportal.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-gray-300 px-6 py-3 text-gray-700 text-sm font-light transition-all duration-300 hover:border-[#69AF23] hover:text-brand-green-text"
                style={{ borderTopLeftRadius: '1rem' }}
              >
                Sign In
              </a>
            </motion.div>
          </div>

          {/* Right — screenshot (7 cols, breaks out right) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="hidden lg:block lg:col-span-7 relative"
          >
            {/* Container that overflows right with fade */}
            <div
              className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0"
              style={{
                right: 'clamp(-12rem, -15vw, -20rem)',
                maskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
              }}
            >
              <div
                className="overflow-hidden bg-white"
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.05), 0 0 0 0px transparent',
                }}
              >
                {/* Browser chrome — small */}
                <div className="flex items-center gap-1.5 px-4 py-2 bg-[#f8f8f8] border-b border-gray-100/50">
                  <div className="flex gap-1">
                    <div className="w-[7px] h-[7px] rounded-full bg-[#ff5f57]" />
                    <div className="w-[7px] h-[7px] rounded-full bg-[#febc2e]" />
                    <div className="w-[7px] h-[7px] rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="hidden sm:block px-8 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-400 font-light lg:text-[10px] lg:leading-[1.6]">
                      mgsclientportal.app
                    </div>
                  </div>
                  <div className="w-8" />
                </div>

                {/* Not `priority`: this sits well below the fold behind a
                    `lg:` gate, so eager-loading it only ever competed with the
                    hero for the first bytes on the wire. */}
                <Image
                  src="/images/portal-dashboard.png"
                  alt="The MGS client portal dashboard, showing location health scores and recent QA reports"
                  width={3440}
                  height={1440}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="w-full h-auto block"
                  quality={100}
                  unoptimized
                />
              </div>
            </div>

            {/* Spacer for layout flow on desktop (since the image is absolute) */}
            <div className="hidden lg:block" style={{ paddingBottom: '42%' }} />
          </motion.div>
        </div>
      </div>

      {/* Mobile screenshot fallback */}
      <div className="lg:hidden mt-6 px-4 sm:px-8">
        <div
          className="overflow-hidden bg-white"
          style={{
            borderRadius: '10px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.08), 0 5px 15px rgba(0,0,0,0.04)',
          }}
        >
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#f8f8f8] border-b border-gray-100/50">
            <div className="flex gap-1">
              <div className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
              <div className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
              <div className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
            </div>
          </div>
          {/* Optimized, unlike its desktop twin. `unoptimized` was shipping a
              3440px-wide PNG into a ~360px box — roughly ten times the pixels
              the phone can render, on the slowest connection of the two. */}
          <Image
            src="/images/portal-dashboard.png"
            alt="The MGS client portal dashboard, showing location health scores and recent QA reports"
            width={3440}
            height={1440}
            sizes="100vw"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
}
