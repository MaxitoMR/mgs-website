"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard, FileText, Star, ClipboardCheck, ArrowRight } from "lucide-react";

const features = [
  { icon: LayoutDashboard, label: "Location Health", description: "Real-time facility health scores" },
  { icon: FileText, label: "Pay Invoices", description: "View and manage billing" },
  { icon: Star, label: "Send Feedback", description: "Rate your cleaning service" },
  { icon: ClipboardCheck, label: "QA Reports", description: "Inspection scores & details" },
];

export function ClientPortalCta() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#1a252f]"
      style={{
        paddingTop: 'clamp(4rem, 7vw, 7rem)',
        paddingBottom: 'clamp(4rem, 7vw, 7rem)',
        borderTopLeftRadius: 'clamp(2rem, 4vw, 4rem)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text + CTA */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow text-[#9FD01B] mb-4"
            >
              Client Portal
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-gothic text-white mb-5"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1.1 }}
            >
              Manage your facilities{' '}
              <span className="text-[#69AF23]">online.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 mb-8"
              style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', fontWeight: 300, lineHeight: 1.7 }}
            >
              Access your dedicated client portal to track location health scores,
              pay invoices, submit feedback, and view QA inspection reports — all in one place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="https://mgs-client-portal.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#69AF23] px-7 py-3.5 text-white font-medium transition-all duration-300 hover:bg-[#5a9a1e] hover:shadow-lg"
                style={{ fontSize: '0.95rem', borderTopLeftRadius: '1.25rem' }}
              >
                Go to Client Portal
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Right — feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="p-5 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '1.5rem 0.25rem 0.25rem 0.25rem',
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-3"
                    style={{ background: '#69AF2315', borderTopLeftRadius: '0.75rem' }}
                  >
                    <Icon className="h-5 w-5 text-[#69AF23]" />
                  </div>
                  <p className="text-white text-sm font-medium mb-1">{f.label}</p>
                  <p className="text-gray-500 text-xs" style={{ fontWeight: 300 }}>{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
