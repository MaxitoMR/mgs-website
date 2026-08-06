import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The device bezel the app captures sit inside — an iPhone 17 Pro.
 *
 * GEOMETRY IS DERIVED, NOT EYEBALLED. The 17 Pro is 71.9 x 150.0 mm with a
 * 2622x1206 display at 460 ppi, which works out to a 66.6 x 144.8 mm screen and
 * therefore a uniform 2.65 mm bezel on all four sides — 3.7% of the body width.
 * Everything below is expressed as a percentage of that width so the frame is
 * correct at any rendered size, from the 200px pair on the homepage to the
 * half-column device in the app beats.
 *
 * `cqw` UNITS, NOT PIXELS. A fixed 36px corner radius is right at 300px wide and
 * visibly wrong at 700px. The width wrapper declares `container-type:
 * inline-size`, so 1cqw is 1% of the device's own width and every radius,
 * padding and button scales with it automatically.
 *
 * NO DRAWN NOTCH — deliberately, and it matters more now than it used to. Every
 * capture is a real iPhone screenshot or screen recording, so the Dynamic Island
 * is already IN the image, complete with the 9:41 status bar around it. Painting
 * a second one on the bezel stacks a fake island on top of the real one and
 * reads as a rendering fault. The bezel below is the whole device.
 *
 * The screen aspect is the exact 1206/2622 rather than the 9/19.5 approximation
 * it used to be. The captures are 1206x2622, so anything else letterboxes them
 * by a fraction of a percent — invisible on its own, but it is free to be right.
 */

type PhoneFrameSize = "sm" | "md" | "lg" | "sequence" | "beat";

const WIDTHS: Record<PhoneFrameSize, string> = {
  sm: "w-[200px] sm:w-[216px]",
  md: "w-[248px] sm:w-[272px]",
  lg: "w-[268px] sm:w-[300px] lg:w-[320px]",
  // For the pinned sequence, where the device is stuck to the top of a phone
  // viewport and has to leave room for the claim beneath it. 196px measured
  // 401px tall — 47% of a 390x844 screen — and the claim headlines were still
  // sliding underneath it. 168px lands around 344px (41%), which clears the
  // settled claim text.
  sequence: "w-[168px] sm:w-[240px] lg:w-[272px]",
  // The app beats set `--phone-w` themselves, because the callout that breaks
  // the device's edge has to be positioned off the SAME number. Hard-coding the
  // width here and the offset there meant two places to keep in step, and they
  // drifted the first time the device was resized.
  beat: "w-[var(--phone-w,66%)]",
};

/** Side hardware, as a fraction of body height. Left rail on the 17 Pro carries
 *  the Action Button above the volume pair; the right carries the side button
 *  and, below it, Camera Control. */
const BUTTONS = [
  { side: "left", top: "14.6%", height: "4.4%" }, // Action Button
  { side: "left", top: "21.2%", height: "6.2%" }, // Volume up
  { side: "left", top: "28.8%", height: "6.2%" }, // Volume down
  { side: "right", top: "19.0%", height: "9.6%" }, // Side button
  { side: "right", top: "32.0%", height: "5.4%" }, // Camera Control
] as const;

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
        style={{ containerType: "inline-size" }}
      >
        <div
          className="relative"
          style={{
            // Aluminium, not the old flat near-black. The 17 Pro's unibody
            // catches light along the rails, and a single dark fill on a dark
            // page left the device with no edge at all.
            background:
              "linear-gradient(145deg, #4a4a4f 0%, #232326 38%, #17171a 72%, #2e2e32 100%)",
            borderRadius: "14cqw",
            padding: "3.7cqw",
            boxShadow:
              "0 4cqw 9cqw rgba(0,0,0,0.55), 0 0 0 0.25cqw rgba(255,255,255,0.10), inset 0 0.2cqw 0 rgba(255,255,255,0.14)",
          }}
        >
          {BUTTONS.map((b, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute"
              style={{
                [b.side]: "-0.55cqw",
                top: b.top,
                height: b.height,
                width: "1.1cqw",
                borderRadius: "0.55cqw",
                background:
                  "linear-gradient(180deg, #5c5c62 0%, #3a3a3f 55%, #2a2a2e 100%)",
              }}
            />
          ))}

          <div
            className="relative overflow-hidden bg-white"
            style={{
              // Concentric with the body: outer radius minus the bezel, so the
              // screen's curve is parallel to the aluminium instead of fighting
              // it. 14 - 3.7 = 10.3.
              borderRadius: "10.3cqw",
              aspectRatio: "1206/2622",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
