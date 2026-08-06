"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  /**
   * Mobile browsers change viewport height constantly while you scroll — iOS
   * Safari collapses and re-expands the URL bar the whole way down a swipe.
   * Left alone, ScrollTrigger treats each of those as a resize and refreshes,
   * recomputing every trigger's start/end mid-gesture. On a section whose
   * scroll budget is a multiple of the viewport that is violent: the pinned app
   * sequence's spacer measured a 420px height swing from a single 100px URL-bar
   * change, which reads as the page shaking under your finger.
   *
   * This tells ScrollTrigger to ignore height-only resizes on touch devices.
   * Width changes and orientation changes still refresh normally.
   */
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
