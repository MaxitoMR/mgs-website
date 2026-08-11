"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  label: string;
  /** The first pair on the page is above the fold; the rest are not. */
  priority?: boolean;
}

export function BeforeAfterSlider({
  before,
  after,
  label,
  priority = false,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  /**
   * True once the pair has been near the viewport, which is what gates loading
   * the BEFORE image.
   *
   * Six of these render on /gallery and each holds two photographs, so the page
   * was fetching twelve full images. The AFTER image is what the frame shows at
   * rest, so it is the one worth having early; the BEFORE only becomes visible
   * once the divider moves off 50%… except that it starts AT 50%, so half of it
   * is visible immediately. Hence: both load, but the below-the-fold pairs load
   * lazily rather than all twelve competing on first paint.
   */
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  /**
   * POINTER EVENTS WITH CAPTURE, not mouse + touch.
   *
   * The old implementation listened for `onTouchMove` on a surface with
   * `touch-action: auto`, which meant a finger moving across the image was
   * ambiguous: the browser was free to interpret it as a page scroll, and
   * usually did. The result was that trying to move the divider scrolled the
   * gallery instead — on the one control whose entire purpose is dragging.
   *
   * `touch-action: pan-y` resolves the ambiguity in the only way that keeps
   * both gestures: horizontal movement belongs to the divider, vertical
   * movement still scrolls the page. `setPointerCapture` then keeps the drag
   * attached to this element even when the finger leaves it, so a fast swipe
   * doesn't drop the divider halfway.
   */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // Arrow/Home/End give the same control without a pointer.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = position - step;
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") next = position + step;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    setPosition(Math.max(0, Math.min(100, next)));
  };

  const showingBefore = position > 50;

  return (
    <div className="group">
      <div
        ref={containerRef}
        role="slider"
        tabIndex={0}
        aria-label={`${label}: reveal before and after`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% before, ${100 - Math.round(position)}% after`}
        onKeyDown={handleKeyDown}
        className="relative aspect-[4/3] cursor-col-resize select-none overflow-hidden bg-gray-100"
        style={{ borderTopLeftRadius: "1.5rem", touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* After image (full) */}
        <Image
          src={after}
          alt={`${label} — after cleaning`}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Before image (clipped) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={before}
            alt={`${label} — before cleaning`}
            fill
            loading={priority ? undefined : "lazy"}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Slider line */}
        <div
          className="pointer-events-none absolute bottom-0 top-0 z-10 w-[2px] bg-white"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle — 48px, up from 40, and it now looks like something you
              grab. It is `pointer-events-none` on purpose: the whole frame is
              the drag surface, so the handle is a marker rather than a second
              hit target that could swallow the gesture at its edges. */}
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/5">
            <ChevronsLeftRight
              className="h-5 w-5 text-brand-green-text"
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute left-3 top-3 z-10 bg-black/60 px-2.5 py-1 t-eyebrow text-white">
          Before
        </div>
        <div className="absolute right-3 top-3 z-10 bg-brand-green-deep/95 px-2.5 py-1 t-eyebrow text-brand-on-green">
          After
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        {/* This slider only renders inside the dark gallery band, where
            gray-700 sat at 1.83:1. */}
        <p className="text-sm font-medium text-gray-200">{label}</p>

        {/* Tap-to-toggle. Dragging is a fine gesture and a bad requirement:
            it is the one interaction here that a visitor with a tremor, a
            stylus, or one hand on a handrail cannot reliably perform. One tap
            snaps the divider end to end, which is the comparison the drag
            exists to make. Hidden from AT — the slider itself is already
            keyboard-operable and announcing a second control for the same
            value would be noise. */}
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setPosition(showingBefore ? 0 : 100)}
          className="-my-2 shrink-0 py-2 t-eyebrow text-white/60 underline underline-offset-4 transition-colors hover:text-brand-lime"
        >
          {showingBefore ? "Show after" : "Show before"}
        </button>
      </div>
    </div>
  );
}
