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
import { serviceNav, portalItems } from "@/lib/navigation";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const MONTH_LABEL = new Date()
  .toLocaleDateString("en-US", { month: "long", year: "numeric" })
  .toUpperCase();

/**
 * The footer's groups mirror the hamburger menu exactly — Services, Company,
 * Portals — because a visitor who opens the menu and then scrolls to the footer
 * was previously shown two different taxonomies of the same site. The footer
 * used to run "Services" (four categories mixed with three individual service
 * pages) and "Resources" (company pages, two CTAs, one portal, and a legal
 * link in one undifferentiated list).
 *
 * `serviceNav` is the shared source the menu and the mega-menu already use, so
 * the category labels here cannot drift from theirs.
 */
const services = serviceNav.map((category) => ({
  label: category.label,
  // The footer needs one destination per category; the menu expands them.
  // First item of each category, which is also its highest-volume page.
  href: category.items[0].href,
}));

const company = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/about#leadership" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Diffusers", href: "/diffusers" },
  // Internal link to the local landing page — sitewide, so every page passes
  // signal to it. Local pages rank on internal linking as much as content.
  { label: "Janitorial Services in Katy", href: "/katy" },
  // Sits above the App Store link on purpose: the tour is the page that
  // explains the app, and it should catch the visitor who isn't ready to
  // leave the site for a store listing yet.
  { label: "The Mobile App", href: "/app" },
  { label: "Download App", href: "https://apps.apple.com/us/app/mgs-management-app/id6760367154" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "FAQ", href: "/faq" },
  // Both legal links live here now. They used to be split: Privacy Policy
  // appeared in this list AND again in the copyright bar, while Terms only
  // appeared in the bar.
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

/** Same three, same order, same labels as the hamburger's Portals group. */
const portals = portalItems;

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
              <Image
                src="/attached_assets/MGS LOGOOOOOOO_1750105578653.png"
                alt={COMPANY.name}
                width={240}
                height={75}
                className="h-12 w-auto sm:h-14"
                priority={false}
              />
            </Link>
            {/* gray-400, not gray-500: #6a7282 is only 3.9:1 on #111111. */}
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Commercial, medical, and industrial janitorial services across
              greater Houston — operating to a documented standard since 2006.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`MGS on ${social.label} (opens in a new tab)`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-brand-green-deep hover:bg-brand-green-deep hover:text-brand-on-green"
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

          {/* Column 3 - Company + Portals. Two groups share this column so the
              footer keeps its four-column grid while using the menu's three
              group names. */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-3">
              {company.map((link) => (
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

            <h3 className="mb-5 mt-8 text-xs font-bold uppercase tracking-wider text-white">
              Portals
            </h3>
            <ul className="space-y-3">
              {portals.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-gray-400 transition-colors hover:text-[#69AF23]"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
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
        {/* Copyright only. Privacy Policy used to appear here AND in the link
            list above it — the same link twice in one footer. Terms of Service
            was here and nowhere else. Both now sit together under Company, so
            each legal link exists in exactly one place. */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">
            &copy; 2026 {COMPANY.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
