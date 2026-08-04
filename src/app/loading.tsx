import Image from "next/image";
import { COMPANY } from "@/lib/constants";

/**
 * Route-level loader. The mark sits still and a single green line sweeps under
 * it — no spinner. Every other loading state on the site is a lucide `Loader2`
 * inside a button; a full-screen spinner competing with those read as a
 * different product, and a square one read as a bug.
 *
 * Under `prefers-reduced-motion` globals.css collapses animation to 0.01ms, so
 * the sweep lands on its final frame and the rail rests as a plain grey line.
 * Nothing here depends on a tween running to become visible.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-white px-6"
    >
      <div className="flex flex-col items-center">
        <Image
          src="/images/logo.png"
          alt={COMPANY.name}
          width={180}
          height={53}
          priority
          className="h-10 w-auto"
        />
        {/* Narrower than the mark on purpose — a rail wider than the logo
            overhangs it on both sides and reads as a misalignment. */}
        <div className="mt-7 h-px w-20 overflow-hidden rounded-full bg-gray-200/90">
          <div
            className="animate-shimmer h-full w-full [animation-duration:1.6s]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent 0%, var(--color-brand-green) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
