"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  MapPin,
  ClipboardCheck,
  MessageSquare,
  Shield,
  Clock,
  BarChart3,
  Package,
} from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/mgs-management-app/id6760367154";

const features = [
  { icon: MapPin, label: "GPS Clock In/Out" },
  { icon: ClipboardCheck, label: "QA Inspections" },
  { icon: BarChart3, label: "Site Health Scores" },
  { icon: MessageSquare, label: "In-App Messaging" },
  { icon: Clock, label: "Live Shift Tracking" },
  { icon: Package, label: "Supply Requests" },
  { icon: Shield, label: "Role-Based Access" },
  { icon: Smartphone, label: "Real-Time Dashboard" },
];

export function AppPromo() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#2C3E50]"
      style={{
        paddingTop: "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "clamp(5rem, 10vw, 8rem)",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left — Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative">
              {/* Glow behind phone */}
              <div
                className="absolute inset-0 blur-[80px] opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, #69AF23 0%, transparent 70%)",
                }}
              />

              {/* Phone frame */}
              <div
                className="relative w-[260px] sm:w-[280px] mx-auto"
                style={{
                  background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
                  borderRadius: "36px",
                  padding: "12px",
                  boxShadow:
                    "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Notch */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black z-10"
                  style={{ borderRadius: "0 0 18px 18px" }}
                />

                {/* Screen */}
                <div
                  className="relative overflow-hidden bg-[#1a2332]"
                  style={{ borderRadius: "26px", aspectRatio: "9/19.2" }}
                >
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 pt-4 pb-2">
                    <span className="text-[10px] text-white/60 font-medium">
                      9:41
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-2 border border-white/40 rounded-[2px] relative">
                        <div className="absolute inset-[1px] right-[2px] bg-[#69AF23] rounded-[1px]" />
                      </div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="px-5 pt-2 pb-3">
                    <p className="text-[10px] text-[#69AF23] font-medium tracking-wider uppercase">
                      MGS Management
                    </p>
                    <p className="text-white text-[16px] font-semibold mt-0.5">
                      Dashboard
                    </p>
                  </div>

                  {/* Stats cards */}
                  <div className="px-4 grid grid-cols-2 gap-2">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5">
                      <div className="w-5 h-5 rounded-lg bg-[#69AF23]/20 flex items-center justify-center mb-2">
                        <Clock className="w-3 h-3 text-[#69AF23]" />
                      </div>
                      <p className="text-white text-[13px] font-semibold">12</p>
                      <p className="text-white/40 text-[9px]">Active Shifts</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5">
                      <div className="w-5 h-5 rounded-lg bg-[#69AF23]/20 flex items-center justify-center mb-2">
                        <ClipboardCheck className="w-3 h-3 text-[#69AF23]" />
                      </div>
                      <p className="text-white text-[13px] font-semibold">98%</p>
                      <p className="text-white/40 text-[9px]">QA Score</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5">
                      <div className="w-5 h-5 rounded-lg bg-[#69AF23]/20 flex items-center justify-center mb-2">
                        <MapPin className="w-3 h-3 text-[#69AF23]" />
                      </div>
                      <p className="text-white text-[13px] font-semibold">8</p>
                      <p className="text-white/40 text-[9px]">Locations</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5">
                      <div className="w-5 h-5 rounded-lg bg-[#69AF23]/20 flex items-center justify-center mb-2">
                        <BarChart3 className="w-3 h-3 text-[#69AF23]" />
                      </div>
                      <p className="text-white text-[13px] font-semibold">A+</p>
                      <p className="text-white/40 text-[9px]">Health Score</p>
                    </div>
                  </div>

                  {/* Activity feed preview */}
                  <div className="px-4 mt-3">
                    <p className="text-[10px] text-white/30 font-medium uppercase tracking-wider mb-2">
                      Live Activity
                    </p>
                    {[
                      { text: "John clocked in — Site 4", time: "2m ago" },
                      { text: "QA inspection completed", time: "15m ago" },
                      { text: "Supply request approved", time: "1h ago" },
                    ].map((item) => (
                      <div
                        key={item.text}
                        className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
                      >
                        <p className="text-[9px] text-white/60">{item.text}</p>
                        <p className="text-[8px] text-white/25">{item.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Text */}
          <div className="lg:col-span-7 relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow text-[#69AF23] mb-5"
            >
              Mobile App
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-gothic text-white"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              Total janitorial
              <br />
              <span className="text-[#69AF23]">management in hand.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 mt-5 mb-7"
              style={{
                fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: "34rem",
              }}
            >
              From GPS-verified clock-ins to real-time QA inspections, our
              all-in-one workforce app gives admins, supervisors, employees, and
              clients everything they need — right from their phone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 mb-8"
            >
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-[#69AF23] flex-shrink-0" />
                    <span
                      className="text-[13px] text-gray-300"
                      style={{ fontWeight: 400 }}
                    >
                      {f.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Role badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {["Admin", "Supervisor", "Employee", "Client"].map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 text-[11px] font-medium rounded-full border border-white/10 text-white/60 bg-white/5"
                >
                  {role}
                </span>
              ))}
            </motion.div>

            {/* App Store button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white px-6 py-3.5 text-[#2C3E50] transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:shadow-white/10"
                style={{ borderTopLeftRadius: "1rem" }}
              >
                {/* Apple logo */}
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] font-light leading-none">
                    Download on the
                  </span>
                  <span className="text-[16px] font-semibold leading-tight">
                    App Store
                  </span>
                </div>
              </a>

              <p className="text-white/25 text-[11px] mt-3 font-light">
                Free &middot; iOS 15.1+ &middot; iPhone, iPad &amp; Apple Vision
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
