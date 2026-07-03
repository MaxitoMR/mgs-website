"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";
import { COMPANY } from "@/lib/constants";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const MONTH_LABEL = new Date()
  .toLocaleDateString("en-US", { month: "long", year: "numeric" })
  .toUpperCase();

const services = [
  { label: "Commercial Cleaning", href: "/services/multi-tenant-offices" },
  { label: "Medical Facilities", href: "/services/surgery-centers" },
  { label: "Industrial Cleaning", href: "/services/factory-plants" },
  { label: "Specialized Services", href: "/services/specialized" },
  { label: "Post-Construction", href: "/services/post-construction" },
  { label: "Window Cleaning", href: "/services/windows" },
  { label: "Concrete Floors", href: "/services/concrete-floors" },
];

const resources = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Schedule Walkthrough", href: "/walkthrough" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Client Portal", href: "https://www.mgsclientportal.app/" },
  { label: "Download App", href: "https://apps.apple.com/us/app/mgs-management-app/id6760367154" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const socialLinks = [
  { icon: Facebook, href: COMPANY.social.facebook, label: "Facebook" },
  { icon: Twitter, href: "#", label: "X (Twitter)" },
  { icon: Linkedin, href: COMPANY.social.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: COMPANY.social.instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Newsletter band — magazine masthead identity, same footer blue */}
      <section className="relative overflow-hidden bg-[#111111]">
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          {/* Top metadata rule — decorative masthead detail, hidden on phones */}
          <div className="hidden sm:flex items-center gap-3 border-y border-[#69AF23]/30 py-2.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#69AF23]">
              MGS Field Brief
            </span>
            <span className="h-1 w-1 rounded-full bg-[#69AF23]/40" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400">
              Monthly Edition
            </span>
            <span className="ml-auto text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400">
              {MONTH_LABEL}
            </span>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 items-center gap-10 py-10 sm:gap-14 sm:py-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-20">
            {/* Left: masthead lockup + pitch */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* MGS News logo lockup — same mark used in the email masthead */}
              <img
                src="/mgs-news-logo.png"
                alt="MGS News — Field Brief"
                className="h-24 w-auto sm:h-28"
              />

              <h3 className="mt-8 max-w-lg font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-[44px]">
                One short issue a month.{" "}
                <span className="text-[#69AF23]">
                  Field-driven. No fluff.
                </span>
              </h3>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-gray-400">
                Notes from our drivers and techs. Real supply pricing. Industry
                call-outs. Written for facility managers who run buildings, not
                marketers chasing inboxes.
              </p>

              {/* "What's inside" pills */}
              <div className="mt-7 flex flex-wrap gap-2">
                {["Field Notes", "Supply Pricing", "Industry Calls", "Stat Drop"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-300"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </motion.div>

            {/* Right: subscribe card — flat surface, matches the rest of the section */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <div className="border border-white/10 bg-white/[0.03] p-7 sm:p-9">
                <div className="flex items-center gap-2">
                  <span className="h-px flex-1 bg-[#69AF23]/30" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#69AF23]">
                    Subscribe Free
                  </span>
                  <span className="h-px flex-1 bg-[#69AF23]/30" />
                </div>
                <p className="mt-5 font-display text-xl font-bold text-white">
                  Get the next issue in your inbox.
                </p>
                <p className="mt-1 text-xs text-white/50">
                  One-click unsubscribe on every email.
                </p>
                <div className="mt-5">
                  <NewsletterForm source="website_footer" variant="compact" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom metadata rule — decorative masthead detail, hidden on phones */}
          <div className="hidden sm:flex items-center gap-3 border-y border-[#69AF23]/30 py-2.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400">
              Total Janitorial Management
            </span>
            <span className="ml-auto text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400">
              mgssupplyandservices.com
            </span>
          </div>
        </div>
      </section>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          {/* Column 1 - Company */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="mb-5 inline-block">
              {/* New logo has dark text meant for light backgrounds; on the dark
                  footer it sits on a clean white card so the full lockup reads. */}
              <span
                className="inline-block bg-white px-4 py-3"
                style={{ borderTopLeftRadius: "1rem" }}
              >
                <Image
                  src="/mgs-logo.png"
                  alt={COMPANY.name}
                  width={253}
                  height={145}
                  className="h-12 w-auto sm:h-14"
                  priority={false}
                />
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              Houston-area janitorial services for offices, clinics, and
              industrial facilities. In business since 2006.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-[#69AF23] hover:bg-[#69AF23] hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Services */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#69AF23]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#69AF23]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">
              Contact
            </h3>
            <div className="space-y-4">
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-[#69AF23]"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#69AF23]" />
                {COMPANY.phone.display}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-[#69AF23]"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#69AF23]" />
                {COMPANY.email}
              </a>
              <a
                href={COMPANY.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-[#69AF23]"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#69AF23]" />
                {COMPANY.address.full}
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#69AF23]" />
                <div>
                  <p>Mon-Fri 9AM-5PM</p>
                  <p>24/7 Emergency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Green accent divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#69AF23] to-transparent" />

      {/* Bottom bar — extra bottom padding (+ safe area) so the fixed CTA bar
          never permanently covers the copyright/links. */}
      <div
        className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
        style={{ paddingBottom: "calc(4rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; 2026 {COMPANY.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/privacy-policy"
              className="text-gray-500 transition-colors hover:text-[#69AF23]"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-700">|</span>
            <Link
              href="/terms"
              className="text-gray-500 transition-colors hover:text-[#69AF23]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
