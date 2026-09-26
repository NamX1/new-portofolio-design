import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   The one authored motion moment on the page.

   Motion is driven by scroll progress and pointer position rather than an
   autoplaying loop: no animation runs on its own, so there is nothing to
   distract, nothing to pause, and reduced-motion needs no separate branch
   beyond not attaching the listeners at all.

   Pointer parallax is deliberately low amplitude. The instrument should feel
   like it is being tilted by a hand, not swung on a string.
   ------------------------------------------------------------------------ */
const PARALLAX_MAX_DEG = 9;
const SCROLL_SPIN_DEG = 26;
const SETTLE_MS = 520;

export default function SignatureObject({ className }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (stage === null) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let tiltX = 0;
    let tiltY = 0;
    let spin = 0;

    const paint = () => {
      frame = 0;
      stage.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      stage.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      stage.style.setProperty('--spin', `${spin.toFixed(2)}deg`);
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(paint);
    };

    const clamp = (value: number) => Math.max(-1, Math.min(1, value));

    const onPointerMove = (event: PointerEvent) => {
      const box = stage.getBoundingClientRect();
      tiltY = clamp(((event.clientX - (box.left + box.width / 2)) / box.width) * 2) * PARALLAX_MAX_DEG;
      tiltX = clamp(((event.clientY - (box.top + box.height / 2)) / box.height) * 2) * -PARALLAX_MAX_DEG;
      schedule();
    };

    const onScroll = () => {
      const box = stage.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return;
      // How far the object has travelled through the viewport, -1 to 1.
      const travel = (box.top + box.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2 + box.height / 2);
      spin = travel * SCROLL_SPIN_DEG;
      schedule();
    };

    /** Settles back to level when the pointer leaves, as a hand would. */
    const onPointerLeave = () => {
      tiltX = 0;
      tiltY = 0;
      schedule();
    };

    // Bounds the work to the moments the object is actually on screen.
    const visible = new IntersectionObserver(
      ([entry]) => {
        if (entry === undefined) return;
        if (entry.isIntersecting) {
          stage.addEventListener('pointermove', onPointerMove, { passive: true });
          stage.addEventListener('pointerleave', onPointerLeave);
          window.addEventListener('scroll', onScroll, { passive: true });
          onScroll();
        } else {
          stage.removeEventListener('pointermove', onPointerMove);
          stage.removeEventListener('pointerleave', onPointerLeave);
          window.removeEventListener('scroll', onScroll);
        }
      },
      { rootMargin: '20% 0px' },
    );
    visible.observe(stage);

    const onPreferenceChange = () => {
      if (reduceMotion.matches) {
        tiltX = 0;
        tiltY = 0;
        spin = 0;
        schedule();
      }
    };
    reduceMotion.addEventListener('change', onPreferenceChange);

    return () => {
      visible.disconnect();
      reduceMotion.removeEventListener('change', onPreferenceChange);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={cn(
        'relative aspect-square w-full select-none overflow-hidden bg-black',
        'rounded-[1.75rem] sm:rounded-[2.5rem]',
        className,
      )}
      style={{ perspective: '1100px' }}
    >
      <div
        ref={stageRef}
        aria-hidden="true"
        className={cn(
          'absolute inset-0 transition-transform ease-apple [transform-style:preserve-3d]',
          '[transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))_rotateZ(var(--spin,0deg))]',
        )}
        style={{ transitionDuration: `${SETTLE_MS}ms` }}
      >
        {/* Meridian. The outermost, thinnest ring. */}
        <div
          className="absolute inset-[6%] rounded-full border border-white/25 [transform-style:preserve-3d]"
          style={{ transform: 'rotateX(74deg)' }}
        />
        {/* Tilted on the opposite axis, so the two read as a sphere of lines. */}
        <div
          className="absolute inset-[6%] rounded-full border border-white/25 [transform-style:preserve-3d]"
          style={{ transform: 'rotateY(72deg) rotateZ(14deg)' }}
        />
        {/* The machined band. Reads as thickness rather than a drawn circle. */}
        <div
          className="absolute inset-[19%] rounded-full border-[7px] border-white/12 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.22)] [transform-style:preserve-3d]"
          style={{ transform: 'rotateX(26deg) rotateY(-36deg)' }}
        />
        <div
          className="absolute inset-[19%] rounded-full border border-white/18 [transform-style:preserve-3d]"
          style={{ transform: 'rotateY(28deg) rotateX(-22deg)' }}
        />
        {/* Crosshair: the measuring detail that makes it an instrument. */}
        <div className="absolute inset-[31%] rounded-full border border-white/14 [transform-style:preserve-3d]" />
        <div
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/12"
          style={{ transform: 'rotateZ(0deg)' }}
        />
        <div
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/12"
          style={{ transform: 'rotateZ(0deg)' }}
        />
        {/* The one accent in the composition. */}
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-dark" />
      </div>
    </div>
  );
}
