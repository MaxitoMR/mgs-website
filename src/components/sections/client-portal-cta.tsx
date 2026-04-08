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
    <section className="relative w-full overflow-hidden bg-[#FBFBFE]">
      {/* Top section: text + features */}
      <div
        className="relative z-10"
        style={{ paddingTop: 'clamp(5rem, 10vw, 10rem)', paddingBottom: 'clamp(3rem, 5vw, 5rem)' }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow text-[#69AF23] mb-5"
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
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              Meet your new
              <br />
              <span className="text-[#69AF23]">facility dashboard.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 mt-6 mb-8"
              style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', fontWeight: 300, lineHeight: 1.7 }}
            >
              Track your facility&apos;s health score, pay invoices, submit feedback, and view
              QA inspection reports — all from one clean, simple portal built for you.
            </motion.p>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-x-8 gap-y-3 mb-8"
            >
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-[#69AF23] flex-shrink-0" />
                    <span className="text-sm text-gray-700" style={{ fontWeight: 400 }}>{f.label}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://mgs-client-portal.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#69AF23] px-8 py-4 text-white font-medium transition-all duration-300 hover:bg-[#5a9a1e] hover:shadow-lg"
                style={{ fontSize: '1rem', borderTopLeftRadius: '1.25rem' }}
              >
                Go to Portal
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://mgs-client-portal.vercel.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-gray-200 px-8 py-4 text-gray-700 font-light transition-all duration-300 hover:border-[#69AF23] hover:text-[#69AF23]"
                style={{ fontSize: '1rem', borderTopLeftRadius: '1.25rem' }}
              >
                Sign In
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full-width dashboard screenshot — hero-style, centered, with fade on edges */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="relative w-full px-6 sm:px-10 lg:px-16"
        style={{ paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="relative overflow-hidden bg-white"
            style={{
              borderRadius: '16px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.12), 0 10px 30px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
            }}
          >
            {/* Browser-style top bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-white border border-gray-200 rounded-md text-xs text-gray-400 font-light">
                  portal.mgssupplyandservices.com
                </div>
              </div>
              <div className="w-12" />
            </div>

            {/* Screenshot */}
            <Image
              src="/images/portal-dashboard.png"
              alt="MGS Client Portal — Dashboard showing location health score, service history, and invoices"
              width={3440}
              height={1440}
              className="w-full h-auto"
              quality={100}
              unoptimized
              priority
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
