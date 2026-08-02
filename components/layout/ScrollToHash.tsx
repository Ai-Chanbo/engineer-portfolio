"use client";

import { useEffect } from "react";

/**
 * Corrects hash landing after the page has actually settled.
 *
 * On a full document load the browser performs its fragment scroll once, around
 * the `load` event. At that moment React has not yet moved the streamed markup
 * out of its hidden staging container, so `#contact` still measures 0×0 and the
 * scroll is a no-op — the visitor stays at the top. Content above the anchor can
 * also resize afterwards (the live dashboards), which shifts an otherwise correct
 * landing. This re-aligns once the element has a real box, and keeps verifying
 * until the position holds.
 *
 * Same-page anchor clicks (Hero / Header) are deliberately left alone: `hashchange`
 * is not observed, so their smooth scroll is untouched. Only initial load and
 * history traversal — where the browser's own scroll is unreliable — are handled.
 */

/** ~2s of correction budget, enough for streamed content to settle. */
const MAX_ATTEMPTS = 40;
const INTERVAL_MS = 50;
/** Sub-pixel rounding shouldn't count as a miss. */
const TOLERANCE_PX = 2;
/** Consecutive no-op passes that mean the layout stopped moving. */
const STABLE_PASSES = 3;

export function ScrollToHash() {
  useEffect(() => {
    let frame: number | undefined;
    let timer: number | undefined;
    let cancelled = false;

    const clearPending = () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      if (timer !== undefined) window.clearTimeout(timer);
      frame = undefined;
      timer = undefined;
    };

    // A real gesture always wins — never fight a visitor who is already scrolling.
    const cancel = () => {
      cancelled = true;
      clearPending();
    };

    const align = (hash: string) => {
      let attempts = 0;
      let stable = 0;

      const pass = () => {
        if (cancelled) return;
        attempts += 1;

        const el = document.getElementById(hash);
        const rect = el?.getBoundingClientRect();

        // Still inside the hidden staging container: exists, but has no box yet.
        if (!el || !rect || rect.height === 0) {
          if (attempts < MAX_ATTEMPTS) schedule();
          return;
        }

        const offset =
          Number.parseFloat(window.getComputedStyle(el).scrollMarginTop) || 0;
        const target = Math.max(0, Math.round(rect.top + window.scrollY - offset));

        if (Math.abs(target - Math.round(window.scrollY)) > TOLERANCE_PX) {
          window.scrollTo({ top: target, behavior: "instant" });
          stable = 0;
        } else {
          stable += 1;
        }

        if (stable < STABLE_PASSES && attempts < MAX_ATTEMPTS) schedule();
      };

      const schedule = () => {
        frame = window.requestAnimationFrame(() => {
          timer = window.setTimeout(pass, INTERVAL_MS);
        });
      };

      schedule();
    };

    const run = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      clearPending();
      cancelled = false;
      align(decodeURIComponent(hash));
    };

    run();

    // Back/forward, including restores from the bfcache.
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) run();
    };

    window.addEventListener("popstate", run);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);

    return () => {
      cancel();
      window.removeEventListener("popstate", run);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, []);

  return null;
}
