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
      className="relative w-full overflow-hidden bg-[#FBFBFE]"
      style={{
        paddingTop: 'clamp(4rem, 8vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
      }}
    >
      {/* Subtle background gradient blob */}
      <div
        className="absolute top-0 right-0 w-[60%] h-full opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 40%, #69AF23 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left — text content */}
          <div className="relative z-10">
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
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
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
              className="text-gray-500 mt-5 mb-8 max-w-md"
              style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', fontWeight: 300, lineHeight: 1.7 }}
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
              className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8"
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

          {/* Right — floating app screenshots */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Dashboard screenshot — main */}
            <div
              className="relative z-10 overflow-hidden border border-gray-200/60 bg-white"
              style={{
                borderRadius: '12px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.06)',
                transform: 'perspective(1200px) rotateY(-4deg) rotateX(2deg)',
              }}
            >
              <Image
                src="/images/portal-dashboard.png"
                alt="MGS Client Portal — Dashboard showing location health score, service history, and invoices"
                width={3439}
                height={1269}
                className="w-full h-auto"
                quality={100}
                unoptimized
                priority
              />
            </div>

            {/* Invoice screenshot — floating behind/below */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-8 -left-8 w-[55%] z-20 hidden lg:block"
              style={{
                borderRadius: '10px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.15), 0 6px 16px rgba(0,0,0,0.08)',
                border: '1px solid rgba(255,255,255,0.8)',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/images/portal-invoice.png"
                alt="MGS Client Portal — Invoice detail with payment timeline"
                width={3439}
                height={1269}
                className="w-full h-auto"
                quality={100}
                unoptimized
              />
            </motion.div>

            {/* Decorative green accent */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 opacity-10 pointer-events-none hidden lg:block"
              style={{
                background: '#69AF23',
                borderRadius: '50%',
                filter: 'blur(30px)',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
