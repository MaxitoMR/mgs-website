"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { PhoneFrame } from "./phone-frame";
import { cn } from "@/lib/utils";

/**
 * App captures — a screenshot or a screen recording, inside a device bezel.
 *
 * Two clip behaviours, and the difference is editorial rather than technical.
 * The short clips (3-8s) are gestures: an app refusing a clock-in, a submit
 * being blocked. They loop silently with no chrome, the way a product page
 * shows an interaction breathing. The long one is a narrative you choose to
 * watch, so it gets a poster and a play button.
 *
 * MOTION CONTRACT (matches app-showcase.tsx — read the note there):
 * nothing in here is parked at `opacity-0` waiting on a tween. Reveal
 * animation is applied by the parent with `gsap.from()`, so a timeline that
 * never advances costs a fade, not the content.
 *
 * PLAYBACK: `preload="none"` on every clip, and looping clips only call play()
 * once they intersect the viewport. Nothing on either page downloads a video
 * until you scroll to it. Under `prefers-reduced-motion: reduce` the loops
 * don't autoplay at all — they fall back to poster + controls, so the content
 * stays reachable without motion.
 */

type Role = "Supervisor" | "Employee" | "Admin" | "Client";

const ROLE_TAG =
  "inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 t-eyebrow text-white/60";

function Caption({
  role,
  title,
  body,
  className,
}: {
  role?: Role;
  title?: string;
  body?: string;
  className?: string;
}) {
  if (!role && !title && !body) return null;
  return (
    <div className={cn("mt-5", className)}>
      {role && <span className={ROLE_TAG}>{role}</span>}
      {title && (
        <p className={cn("text-sm text-white", role && "mt-2.5")}>{title}</p>
      )}
      {body && (
        <p
          className="mt-1.5 text-sm text-gray-400"
          style={{ fontWeight: 300, lineHeight: 1.6 }}
        >
          {body}
        </p>
      )}
    </div>
  );
}

export function CaptureStill({
  src,
  alt,
  role,
  title,
  body,
  size = "md",
  glow = false,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  role?: Role;
  title?: string;
  body?: string;
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("m-0", className)}>
      <PhoneFrame size={size} glow={glow}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-top"
          sizes="(max-width: 640px) 268px, 320px"
        />
      </PhoneFrame>
      <figcaption>
        <Caption role={role} title={title} body={body} />
      </figcaption>
    </figure>
  );
}

export function CaptureClip({
  src,
  poster,
  alt,
  role,
  title,
  body,
  /** `loop` autoplays muted and silently repeats; `click` waits to be asked. */
  mode = "loop",
  size = "md",
  glow = false,
  className,
}: {
  src: string;
  poster: string;
  alt: string;
  role?: Role;
  title?: string;
  body?: string;
  mode?: "loop" | "click";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Looping clips play only while they're on screen. A page with five videos
  // that all decode continuously is a page that heats a laptop for no reason.
  useEffect(() => {
    if (mode !== "loop" || reducedMotion) return;
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay can still be refused (low-power mode, data saver). The
          // poster stays up if it is, which is a fine resting state.
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [mode, reducedMotion]);

  // Under reduced motion, and for the long clip, the visitor drives.
  const wantsControls = mode === "click" || reducedMotion;
  const showPlayButton = wantsControls && !started;

  return (
    <figure className={cn("m-0", className)}>
      <PhoneFrame size={size} glow={glow}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={alt}
          muted
          loop={mode === "loop"}
          playsInline
          preload="none"
          controls={wantsControls && started}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        {showPlayButton && (
          <button
            type="button"
            onClick={() => {
              setStarted(true);
              void videoRef.current?.play().catch(() => {});
            }}
            className="group absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
          >
            <span className="sr-only">Play: {alt}</span>
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform duration-300 group-hover:scale-105">
              <Play
                aria-hidden="true"
                className="ml-1 h-6 w-6 text-[#191919]"
                fill="currentColor"
              />
            </span>
          </button>
        )}
      </PhoneFrame>
      <figcaption>
        <Caption role={role} title={title} body={body} />
      </figcaption>
    </figure>
  );
}
