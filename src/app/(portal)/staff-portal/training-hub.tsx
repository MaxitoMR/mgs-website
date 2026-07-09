"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, CheckCircle2, Lock } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Training videos hosted on Supabase Storage (public `training` bucket).
const VIDEO_BASE =
  "https://ejivobojvlxrngsdcjjk.supabase.co/storage/v1/object/public/training";

// Simple team access code. Note: this is a client-side gate for casual
// gating of an internal, noindexed page — it is not hard security.
const ACCESS_CODE = "5602";

const modules = [
  {
    file: "protective-equipment.mp4",
    title: "Selecting & Using Protective Equipment",
    description:
      "How to select, don, and doff gloves, gowns, eye protection, and respirators for the task and hazard level in front of you.",
  },
  {
    file: "bloodborne-pathogens.mp4",
    title: "Exposure to Bloodborne Pathogens",
    description:
      "OSHA-aligned exposure control: recognizing bloodborne-pathogen risk, handling it safely, and following post-exposure procedure.",
  },
  {
    file: "terminal-cleaning-or.mp4",
    title: "Terminal Cleaning — Operating Room",
    description:
      "The step-by-step protocol for terminal cleaning of an operating room between cases, executed to AORN standards.",
  },
  {
    file: "terminal-cleaning-or-es.mp4",
    title: "Limpieza Terminal — Quirófano (Español)",
    description:
      "Limpieza terminal del quirófano entre casos, paso a paso — la misma norma, en español.",
  },
];

export function TrainingHub() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = modules[activeIndex];

  // Access gate
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("mgs-training-ok") === "1") setUnlocked(true);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === ACCESS_CODE) {
      setUnlocked(true);
      sessionStorage.setItem("mgs-training-ok", "1");
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111111] px-4 text-white">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <Image
              src="/images/logo.png"
              alt={COMPANY.name}
              width={180}
              height={53}
              className="mx-auto mb-6 h-10 w-auto brightness-0 invert"
            />
            <h1 className="font-gothic text-2xl font-light">Employee Training</h1>
            <p className="mt-2 text-sm text-white/50">
              Enter the access code to continue.
            </p>
          </div>
          <form
            onSubmit={submit}
            className="border border-white/10 bg-white/[0.03] p-6"
            style={{ borderTopLeftRadius: "1rem" }}
          >
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                inputMode="numeric"
                autoFocus
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(false);
                }}
                placeholder="Access code"
                aria-label="Access code"
                className="w-full border border-white/15 bg-white/[0.04] py-3 pl-10 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#69AF23]"
              />
            </div>
            {error && (
              <p className="mt-3 text-sm text-red-400">Incorrect code. Try again.</p>
            )}
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center bg-[#69AF23] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5a9a1e]"
            >
              Enter
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              <video
                key={active.file}
                src={`${VIDEO_BASE}/${active.file}`}
                controls
                controlsList="nodownload"
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full"
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
                  <li key={m.file}>
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
