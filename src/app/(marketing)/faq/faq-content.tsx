"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { faqCategories } from "@/lib/faq-data";
import { cn } from "@/lib/utils";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-[15px] font-medium text-gray-900 pr-4">{q}</span>
        <ChevronDown
          className={cn("h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-600 leading-relaxed pl-0">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQContent() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#111111]" style={{ paddingTop: 'clamp(6rem, 12vw, 10rem)', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/90">FAQ</span>
          </nav>
          <h1
            className="font-gothic text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, lineHeight: 1.1 }}
          >
            Frequently Asked <span className="text-[#69AF23]">Questions</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', fontWeight: 300, lineHeight: 1.7 }}>
Coverage, compliance, scheduling, and pricing — the details procurement and facility teams ask before engaging MGS Supply &amp; Services.
          </p>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16" style={{ paddingTop: 'clamp(3rem, 5vw, 5rem)', paddingBottom: 'clamp(3rem, 5vw, 5rem)' }}>
        {faqCategories.map((cat) => (
          <div key={cat.name} className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-[3px] h-5 bg-[#69AF23]" />
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">{cat.name}</h2>
            </div>
            <div className="bg-white border border-rgray-4 shadow-premium">
              {cat.faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="bg-[#f0f5e8]" style={{ paddingTop: 'clamp(3rem, 5vw, 4rem)', paddingBottom: 'clamp(3rem, 5vw, 4rem)' }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-gothic text-gray-900 mb-3" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 400 }}>
            Still have questions?
          </h2>
          <p className="text-sm text-gray-600 mb-6" style={{ fontWeight: 300 }}>
            We&apos;re happy to help. Reach out directly or request a quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${COMPANY.phone.primary}`}
              className="inline-flex items-center justify-center gap-2 bg-[#69AF23] px-6 py-3 text-white text-sm font-medium hover:bg-[#5a9a1e] transition-all"
              style={{ borderTopLeftRadius: '1rem' }}
            >
              <Phone className="h-4 w-4" />
              Call {COMPANY.phone.display}
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 px-6 py-3 text-gray-700 text-sm font-medium hover:border-[#69AF23] hover:text-[#69AF23] transition-all"
              style={{ borderTopLeftRadius: '1rem' }}
            >
              Get a Quote <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
