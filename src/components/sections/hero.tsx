"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { COMPANY, CLOUDFLARE_STREAMS } from "@/lib/constants";
import { VideoPlayer } from "@/components/shared/video-player";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <VideoPlayer
          src={CLOUDFLARE_STREAMS.hero}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 inline-block rounded-full bg-brand-green/20 px-4 py-1.5 text-sm font-medium text-brand-lime backdrop-blur-sm">
              Enterprise-Grade Facility Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Professional
            <br />
            <span className="text-brand-lime">Janitorial</span> Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-gray-300 md:text-xl"
          >
            Commercial, medical, and industrial cleaning solutions trusted by
            leading facilities across Texas. Certified teams. Proven results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/quote"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:bg-brand-lime hover:shadow-2xl"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${COMPANY.phone.primary}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-brand-lime hover:text-brand-lime"
            >
              <Phone className="h-5 w-5" />
              Call {COMPANY.phone.display}
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-6 text-sm text-gray-400"
          >
            {[
              "Licensed & Insured",
              "24/7 Emergency Services",
              "AEPA Approved Vendor",
              "Certified Teams",
            ].map((badge) => (
              <span key={badge} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
