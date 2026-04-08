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
      style={{ minHeight: 'clamp(30rem, 70vh, 45rem)' }}
    >
      {/* Background gradient */}
      <div
        className="absolute top-0 right-0 w-[50%] h-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 80% 50%, #69AF23 0%, transparent 60%)' }}
      />

      <div className="relative z-10 h-full flex items-center" style={{ paddingTop: 'clamp(5rem, 10vw, 8rem)', paddingBottom: 'clamp(5rem, 10vw, 8rem)' }}>
        {/* Left side — constrained to max-w-7xl */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="lg:max-w-[42%] xl:max-w-[38%]">
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
                fontSize: 'clamp(2.25rem, 4.5vw, 4rem)',
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
              className="text-gray-500 mt-5 mb-7"
              style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', fontWeight: 300, lineHeight: 1.7 }}
            >
              Track your facility&apos;s health score, pay invoices, submit feedback, and view
              QA inspection reports — all from one clean, simple portal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-2 gap-x-5 gap-y-2.5 mb-8"
            >
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#69AF23] flex-shrink-0" />
                    <span className="text-[13px] text-gray-700" style={{ fontWeight: 400 }}>{f.label}</span>
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
                href="https://mgs-client-portal.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#69AF23] px-7 py-3.5 text-white font-medium transition-all duration-300 hover:bg-[#5a9a1e] hover:shadow-lg"
                style={{ fontSize: '0.95rem', borderTopLeftRadius: '1.25rem' }}
              >
                Go to Portal
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://mgs-client-portal.vercel.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-gray-200 px-7 py-3.5 text-gray-700 font-light transition-all duration-300 hover:border-[#69AF23] hover:text-[#69AF23]"
                style={{ fontSize: '0.95rem', borderTopLeftRadius: '1.25rem' }}
              >
                Sign In
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right side — screenshot breaks out of container, bleeds to viewport edge */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="absolute top-1/2 -translate-y-1/2 right-0 hidden lg:block"
          style={{
            left: '45%',
            maskImage: 'linear-gradient(to right, black 60%, transparent 98%)',
            WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 98%)',
          }}
        >
          <div
            className="overflow-hidden bg-white"
            style={{
              borderRadius: '16px 0 0 16px',
              boxShadow: '-10px 30px 80px rgba(0,0,0,0.12), -4px 10px 30px rgba(0,0,0,0.06)',
            }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-white border border-gray-200 rounded-md text-[11px] text-gray-400 font-light">
                  portal.mgssupplyandservices.com
                </div>
              </div>
              <div className="w-12" />
            </div>

            <Image
              src="/images/portal-dashboard.png"
              alt="MGS Client Portal Dashboard"
              width={3440}
              height={1440}
              className="w-full h-auto"
              quality={100}
              unoptimized
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Mobile: show screenshot below text */}
      <div className="lg:hidden px-6 sm:px-10 pb-12">
        <div
          className="overflow-hidden bg-white"
          style={{
            borderRadius: '12px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.05)',
          }}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
          </div>
          <Image
            src="/images/portal-dashboard.png"
            alt="MGS Client Portal Dashboard"
            width={3440}
            height={1440}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
