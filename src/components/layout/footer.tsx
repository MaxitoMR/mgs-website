"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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

/**
 * Every navigational link in this footer, on one shared class.
 *
 * These rows were 19–20px tall — the height of the text and nothing else. That
 * is roughly two fifths of the 44px minimum, repeated 26 times per column, on
 * every page of the site: the single largest source of undersized tap targets
 * anywhere in the product (~435 of the 478 the audit counted). It is also the
 * worst place for it, because footer links are what someone reaches for once
 * they have given up finding something in the nav.
 *
 * The fix is vertical padding, not type size — the 14px body size is correct
 * and raising it would rebuild the footer's proportions. `min-h-11` (44px) with
 * the label centred inside gives each row a real target while leaving the
 * rendered text exactly where it was. `-my-1.5` claws back some of the height
 * the `space-y-3` list gaps were already providing, so the columns grow by far
 * less than 24px × n.
 *
 * `lg:` resets it: on desktop these are pointer targets, the columns are side
 * by side rather than stacked, and 44px rows would stretch the footer well past
 * where the design puts it.
 */
const FOOTER_LINK =
  "-my-1.5 flex min-h-11 items-center text-sm text-gray-400 transition-colors hover:text-[#69AF23] lg:my-0 lg:inline lg:min-h-0";

/**
 * A collapsible footer column — closed on mobile, always open at `lg:`.
 *
 * The footer measured 2,406px on a phone, which is 2.85 screens, on every one
 * of the fifteen routes. Nineteen navigation links at a proper 44px each is
 * most of that, and it is a genuine conflict: the rows have to be that tall to
 * be tappable, and there are too many of them to leave open. Collapsing is what
 * resolves it — the group headings stay visible, so the footer still says what
 * is in it, and a tap opens the one column the visitor wants.
 *
 * Desktop never consults the state at all: the toggle is `lg:hidden` and the
 * list is `lg:block` unconditionally. Same construction as the quote form's
 * services disclosure, and for the same reason — no mount-time flash from a
 * media query, no extra click for a pointer user, no desktop change.
 */
function FooterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = `footer-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div>
      <h3 className="t-eyebrow text-white lg:mb-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="flex min-h-11 w-full items-center justify-between gap-2 text-left t-eyebrow lg:pointer-events-none lg:min-h-0 lg:justify-start"
        >
          {title}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-4 w-4 shrink-0 text-gray-500 transition-transform lg:hidden",
              open && "rotate-180",
            )}
          />
        </button>
      </h3>
      <ul
        id={id}
        className={cn("space-y-1 pb-2 lg:block lg:space-y-3 lg:pb-0", open ? "block" : "hidden")}
      >
        {children}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Newsletter band — magazine masthead identity, same footer blue */}
      <section className="relative overflow-hidden bg-[#111111]">
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-20 lg:px-8">
          {/* Top metadata rule — decorative masthead detail, hidden on phones */}
          <div className="hidden sm:flex items-center gap-3 border-y border-[#69AF23]/30 py-2.5">
            <span className="t-eyebrow text-[#69AF23]">
              MGS Field Brief
            </span>
            <span className="h-1 w-1 rounded-full bg-[#69AF23]/40" />
            <span className="t-eyebrow text-gray-400">
              Monthly Edition
            </span>
            <span className="ml-auto t-eyebrow text-gray-400">
              {MONTH_LABEL}
            </span>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 items-center gap-7 py-6 sm:gap-14 sm:py-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-20">
            {/* Left: masthead lockup + pitch */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* MGS News logo lockup — same mark used in the email masthead.
                  next/image, not a bare <img>: the source is 1932px wide and
                  was being shipped whole into a ~197px box, which is 2.4MB of
                  the footer's weight on every page of the site for an image
                  nobody sees at more than a tenth of its resolution. */}
              <Image
                src="/mgs-news-logo.png"
                alt="MGS News — Field Brief"
                width={1932}
                height={943}
                sizes="(max-width: 640px) 200px, 240px"
                className="h-16 w-auto sm:h-28"
              />

              {/* `t-h2` is size-for-size identical to what this was — 28px on a
                  phone, 44px from lg — so the regression this heading suffered
                  once before (44px silently becoming 30px) cannot recur here.
                  What changes is the weight: 700 to the 300 every other
                  heading at this size uses. Two voices at one size was the
                  problem, not the size. */}
              <h3 className="t-h2 mt-5 max-w-lg font-display text-white sm:mt-8">
                One short issue a month.{" "}
                <span className="text-[#69AF23]">
                  Field-driven. No fluff.
                </span>
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-gray-300 sm:mt-5">
                Notes from our drivers and techs, real supply pricing, and honest
                industry call-outs. Written for people who run buildings.
              </p>

              {/* "What's inside" pills */}
              <div className="mt-5 flex flex-wrap gap-2 sm:mt-7">
                {["Field Notes", "Supply Pricing", "Industry Calls", "Stat Drop"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="border border-white/10 bg-white/[0.03] px-3 py-1 t-eyebrow text-gray-300"
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
              <div className="border border-white/10 bg-white/[0.03] p-5 sm:p-9">
                <div className="flex items-center gap-2">
                  <span className="h-px flex-1 bg-[#69AF23]/30" />
                  <span className="t-eyebrow text-[#69AF23]">
                    Subscribe Free
                  </span>
                  <span className="h-px flex-1 bg-[#69AF23]/30" />
                </div>
                {/* The supporting line under the newsletter heading, so the lede
                  rung — not `text-xl font-bold`, which set body copy at 700 and
                  made it read as a second heading competing with the one
                  directly above it. */}
              <p className="t-lead mt-4 font-display text-white sm:mt-5">
                  Get the next issue in your inbox.
                </p>
                {/* 14px: a sentence, not a label. white/50 on #111 is also
                    lifted to white/70 — /50 measured 4.2:1 and this is the
                    line that answers "will subscribing cost me anything". */}
                <p className="mt-1 text-sm text-white/70">
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
            <span className="t-eyebrow text-gray-400">
              Total Janitorial Management
            </span>
            <span className="ml-auto t-eyebrow text-gray-400">
              mgssupplyandservices.com
            </span>
          </div>
        </div>
      </section>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          {/* Column 1 - Company */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 inline-block sm:mb-5">
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
            <p className="mb-5 text-sm leading-relaxed text-gray-400 sm:mb-6">
              Commercial, medical, and industrial janitorial services across
              greater Houston — operating to a documented standard since 2006.
            </p>
            {/* 44×44 on touch, back to the designed 36×36 ring on desktop. */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`MGS on ${social.label} (opens in a new tab)`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-brand-green-deep hover:bg-brand-green-deep hover:text-brand-on-green lg:h-9 lg:w-9"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Services */}
          <FooterGroup title="Services">
            {services.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className={FOOTER_LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterGroup>

          {/* Column 3 - Company + Portals. Two groups share this column so the
              footer keeps its four-column grid while using the menu's three
              group names. */}
          <div className="space-y-0 lg:space-y-8">
            <FooterGroup title="Company">
              {company.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className={FOOTER_LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </FooterGroup>

            <FooterGroup title="Portals">
              {portals.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={FOOTER_LINK}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </FooterGroup>
          </div>

          {/* Column 4 — Contact. NOT collapsible: the phone number is the
              highest-intent element in the whole footer and the reason a
              visitor scrolls this far. */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-3 t-eyebrow text-white lg:mb-5">
              Contact
            </h3>
            {/* Same 44px treatment as the link columns — these three are the
                highest-intent rows in the footer and were the smallest. */}
            <div className="space-y-2 lg:space-y-4">
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="flex min-h-11 items-center gap-3 text-sm text-gray-400 transition-colors hover:text-[#69AF23] lg:min-h-0 lg:items-start"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#69AF23] lg:mt-0.5" aria-hidden="true" />
                {COMPANY.phone.display}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex min-h-11 items-center gap-3 text-sm text-gray-400 transition-colors hover:text-[#69AF23] lg:min-h-0 lg:items-start"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#69AF23] lg:mt-0.5" aria-hidden="true" />
                {COMPANY.email}
              </a>
              <a
                href={COMPANY.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3 text-sm text-gray-400 transition-colors hover:text-[#69AF23] lg:min-h-0 lg:items-start"
              >
                <MapPin className="h-4 w-4 shrink-0 text-[#69AF23] lg:mt-0.5" aria-hidden="true" />
                {COMPANY.address.full}
              </a>
              <div className="flex items-start gap-3 pt-1 text-sm text-gray-400 lg:pt-0">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#69AF23]" aria-hidden="true" />
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

      {/* Bottom bar — and the whole document's reserve for the fixed action bar.
          <main> is the wrong place for this: the footer is what sits under the
          bar when the page is scrolled to the end, so padding main would only
          open a gap between the last section and the footer while leaving the
          actual collision untouched. The figure comes from the same token the
          bar sizes itself with (globals.css), so the two cannot drift; it used
          to be a hand-tuned 4rem that no longer matched the bar. */}
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-[calc(var(--mobile-cta-reserve)+0.5rem)] sm:px-6 lg:px-8 lg:pb-16">
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
