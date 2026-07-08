"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, CheckCircle2 } from "lucide-react";
import { COMPANY, CLOUDFLARE_STREAM_CUSTOMER } from "@/lib/constants";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────
// TRAINING MODULES
// `uid` is the Cloudflare Stream video ID. The four below are PLACEHOLDER ids
// (reused from the marketing streams) so the player works out of the box —
// replace each `uid` with the real training video's Cloudflare Stream ID.
// Add or remove modules freely; the list drives the UI.
// ─────────────────────────────────────────────────────────────────────────
const modules = [
  {
    uid: "02c5b18d6e2c920bbfffd01c32135743",
    title: "Onboarding & Company Standards",
    description:
      "Conduct on client sites, uniform and PPE requirements, and the documented protocol every MGS crew is held to.",
  },
  {
    uid: "6042b005bc6af23d33c3b8b597b50410",
    title: "Bloodborne Pathogens & Biohazard Response",
    description:
      "OSHA-aligned handling of blood, bodily fluids, and biohazard events — personal protection, containment, and disposal.",
  },
  {
    uid: "7f0073dfe00c438eed908cf07b8313e2",
    title: "Chemical Safety & Safety Data Sheets",
    description:
      "Safe handling, dilution, and storage of cleaning chemistry, and how to read a Safety Data Sheet before use.",
  },
  {
    uid: "9d80faec3133ed23b6feb956439fd4cc",
    title: "Restroom & High-Touch Disinfection",
    description:
      "The step sequence for restroom servicing and high-touch disinfection, including required disinfectant dwell times.",
  },
];

export function TrainingHub() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = modules[activeIndex];

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Top bar */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo.png"
              alt={COMPANY.name}
              width={160}
              height={47}
              className="h-9 w-auto brightness-0 invert"
            />
            <span className="hidden h-5 w-px bg-white/15 sm:block" />
            <span className="hidden text-sm font-medium tracking-wide text-white/70 sm:block">
              Employee Training
            </span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to website</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9FD01B]">
            Field Training
          </p>
          <h1 className="mt-2 font-gothic text-2xl font-light sm:text-3xl">
            Standards, safety, and protocol — on demand.
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          {/* Player + active detail */}
          <div>
            <div
              className="relative w-full overflow-hidden bg-black"
              style={{ aspectRatio: "16 / 9", borderTopLeftRadius: "1.25rem" }}
            >
              <iframe
                key={active.uid}
                src={`https://${CLOUDFLARE_STREAM_CUSTOMER}/${active.uid}/iframe`}
                title={active.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
              />
            </div>
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Module {String(activeIndex + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-1.5 font-gothic text-xl font-light sm:text-2xl">
                {active.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
                {active.description}
              </p>
            </div>
          </div>

          {/* Module list */}
          <aside>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              {modules.length} Modules
            </p>
            <ul className="space-y-2">
              {modules.map((m, i) => {
                const isActive = i === activeIndex;
                return (
                  <li key={m.uid}>
                    <button
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        "flex w-full items-start gap-3 border p-4 text-left transition-all",
                        isActive
                          ? "border-[#69AF23] bg-[#69AF23]/10"
                          : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]",
                      )}
                      style={{ borderTopLeftRadius: "0.75rem" }}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full",
                          isActive ? "bg-[#69AF23] text-white" : "bg-white/10 text-white/60",
                        )}
                      >
                        {isActive ? <Play className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-4 w-4" />}
                      </span>
                      <span>
                        <span className="block text-[11px] font-semibold uppercase tracking-widest text-white/40">
                          Module {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={cn("mt-0.5 block text-sm font-medium", isActive ? "text-white" : "text-white/80")}>
                          {m.title}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 text-xs leading-relaxed text-white/35">
              Questions on a procedure? Contact your supervisor or MGS management
              at {COMPANY.phone.display}.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
