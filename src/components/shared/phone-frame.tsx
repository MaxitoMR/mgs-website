import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The device bezel the app captures sit inside.
 *
 * Extracted from `app-showcase.tsx`, where it was inline. Two surfaces now
 * render captures — the homepage section and `/app` — and a bezel that exists
 * in two places is a bezel that drifts apart. The values here are the ones
 * that shipped in AppShowcase; nothing was retuned in the move.
 *
 * The aspect ratio is fixed at 9/19.5 to match the source captures
 * (1206x2622). Feeding it anything else will letterbox or crop.
 */

type PhoneFrameSize = "sm" | "md" | "lg";

const WIDTHS: Record<PhoneFrameSize, string> = {
  sm: "w-[200px] sm:w-[216px]",
  md: "w-[248px] sm:w-[272px]",
  lg: "w-[268px] sm:w-[300px] lg:w-[320px]",
};

export function PhoneFrame({
  children,
  size = "md",
  glow = false,
  className,
}: {
  children: ReactNode;
  size?: PhoneFrameSize;
  /** Green radial bloom behind the device. Earns its keep on dark screens,
   *  which otherwise sit flat against the dark field. */
  glow?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {glow && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-brand-green) 0%, transparent 70%)",
          }}
        />
      )}
      <div
        className={cn("relative mx-auto", WIDTHS[size])}
        style={{
          background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
          borderRadius: "36px",
          padding: "10px",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* NO DRAWN NOTCH — deliberately. The frame used to paint a black pill
            across the top, which made sense when the screen was a flat mockup.
            Every capture we now use is a real iPhone 16 Pro screenshot or
            screen recording, so the Dynamic Island is already IN the image,
            complete with the 9:41 status bar around it. Drawing another one
            stacked a fake notch on top of the real one and read as a rendering
            fault. The bezel below is the whole device. */}
        <div
          className="relative overflow-hidden bg-white"
          style={{ borderRadius: "28px", aspectRatio: "9/19.5" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
