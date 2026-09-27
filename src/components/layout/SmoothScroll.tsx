import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

/* ---------------------------------------------------------------------------
   Motion signature 1 of 2: smooth, inertial scrolling.

   Lenis owns the scroll position and drives it with its own rAF loop, so it
   must be told when the page becomes visible again (tab switches) or the
   position can drift.

   Reduced motion is checked BEFORE construction, not tuned down afterwards:
   if the user has asked for less motion we never build a Lenis instance at
   all and the page uses native scrolling.
   ------------------------------------------------------------------------ */
const LERP = 0.1;
const DURATION = 1.2;

export interface SmoothScrollProps {
  readonly children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Checked before construction. Under reduced motion the page keeps
    // native scrolling and no Lenis instance is ever created.
    if (prefersReducedMotion.matches) return;

    const lenis = new Lenis({ lerp: LERP, duration: DURATION });

    let frame = window.requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // Content is always rendered. This wrapper is transparent to layout and to
  // assistive tech, so a delayed mount can never hide the page.
  return <>{children}</>;
}
