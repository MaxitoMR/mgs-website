"use client";

import { useEffect, useRef } from "react";

/**
 * Moves focus to a form's success/error panel the moment it appears.
 *
 * Every form on the site already swaps itself for a confirmation card on
 * success, but nothing moved the user to it. On a phone that is a real failure
 * mode rather than a nicety: the submit button sits at the bottom of a form
 * that may be several screens tall, the card that replaces it is shorter than
 * what it replaced, and the page therefore ends up scrolled somewhere in the
 * middle of a footer with no visible evidence that anything happened. The tap
 * reads as ignored, and the honest next move is to tap it again.
 *
 * Focus rather than a bare `scrollIntoView`: it brings the scroll with it, it
 * moves the screen reader's cursor to the confirmation instead of leaving it
 * pointing at a button that no longer exists, and it puts the keyboard user's
 * next Tab at the right place in the document.
 *
 * Attach the returned ref to a container carrying `tabIndex={-1}` and a
 * `role` of `status` or `alert`.
 */
export function useStatusPanel<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;
    // `preventScroll` then an explicit scroll: focus()'s own scrolling puts the
    // element hard against the viewport edge, which on mobile parks it under
    // the sticky header.
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: "center", behavior: "auto" });
  }, [active]);

  return ref;
}
