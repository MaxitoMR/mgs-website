"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { serviceNav } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#1a1f25] via-[#141920] to-[#0d1117] text-gray-300">
      {/* Subtle green accent glow */}
      <div className="absolute left-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />
      <div className="absolute left-1/3 top-0 h-32 w-1/3 bg-brand-green/3 blur-[80px]" />

      {/* Newsletter section */}
      <div className="relative border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-white">
                Stay Updated
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Get the latest news, tips, and industry insights delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-brand-green/50 focus:outline-none focus:ring-2 focus:ring-brand-green/10"
              />
              <button className="flex-shrink-0 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-green/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand-green/30 hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div>
            <Image
              src="/images/logo.png"
              alt={COMPANY.name}
              width={160}
              height={47}
              className="mb-6 h-10 w-auto brightness-200"
            />
            <p className="mb-8 text-sm leading-relaxed text-gray-400">
              {COMPANY.description}
            </p>
            <div className="space-y-4">
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="group flex items-center gap-3 text-sm transition-colors duration-300 hover:text-brand-lime"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-brand-green transition-all duration-300 group-hover:bg-brand-green/10">
                  <Phone className="h-4 w-4" />
                </div>
                {COMPANY.phone.display}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="group flex items-center gap-3 text-sm transition-colors duration-300 hover:text-brand-lime"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-brand-green transition-all duration-300 group-hover:bg-brand-green/10">
                  <Mail className="h-4 w-4" />
                </div>
                {COMPANY.email}
              </a>
              <a
                href={COMPANY.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm transition-colors duration-300 hover:text-brand-lime"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-brand-green transition-all duration-300 group-hover:bg-brand-green/10">
                  <MapPin className="h-4 w-4" />
                </div>
                {COMPANY.address.full}
              </a>
              <div className="group flex items-center gap-3 text-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-brand-green">
                  <Clock className="h-4 w-4" />
                </div>
                24/7 Emergency Services
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 font-display text-lg font-extrabold tracking-[-0.01em] text-white">
              Our Services
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {serviceNav.map((category) => (
                <div key={category.label} className="mb-5">
                  <h4 className="subtitle mb-2.5 text-brand-green">
                    {category.label}
                  </h4>
                  <ul className="space-y-1.5">
                    {category.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-gray-400 transition-all duration-300 hover:text-brand-lime hover:translate-x-0.5"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-6 font-display text-lg font-extrabold tracking-[-0.01em] text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Careers", href: "/careers" },
                { label: "Get a Quote", href: "/quote" },
                { label: "Employee Application", href: "/employee-application" },
                { label: "Staff Portal", href: "/staff-portal" },
                { label: "Privacy Policy", href: "/privacy-policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-all duration-300 hover:text-brand-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="mt-10">
              <h4 className="mb-4 text-sm font-bold text-white">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: COMPANY.social.facebook },
                  { icon: Instagram, href: COMPANY.social.instagram },
                  { icon: Linkedin, href: COMPANY.social.linkedin },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all duration-300 hover:bg-brand-green hover:text-white hover:shadow-green-glow hover:-translate-y-0.5"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.</p>
          <p>
            AEPA approved vendor &bull; Licensed &amp; Insured
          </p>
        </div>
      </div>
    </footer>
  );
}
