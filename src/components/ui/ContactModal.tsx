import { useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Button from './Button';
import { contactModal } from '../../data/content';
import { cn } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   Named motion values, never inline magic numbers. A critically damped
   spring (bounce 0) for a dialog that was not thrown by a gesture, and an
   opacity-only cross-fade when reduced motion is requested.
   ------------------------------------------------------------------------ */
const SPRING_RESPONSE = 0.32;
const PANEL_SCALE_FROM = 0.96;
const PANEL_OFFSET_PX = 8;
const CROSS_FADE_SECONDS = 0.18;
const SCRIM_FADE_SECONDS = 0.24;

const SPRING_TRANSITION = { type: 'spring', bounce: 0, duration: SPRING_RESPONSE } as const;
const FADE_TRANSITION = { duration: CROSS_FADE_SECONDS, ease: 'linear' } as const;

export interface ContactModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() === true;

  // Escape, focus trap, scroll lock, focus restored to the trigger.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    panel?.querySelector<HTMLElement>('button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || panel === null) return;

      const focusable = panel.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
      const first = focusable.item(0);
      const last = focusable.item(focusable.length - 1);
      if (first === undefined || last === undefined) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  const hidden = reduceMotion ? { opacity: 0 } : { opacity: 0, scale: PANEL_SCALE_FROM, y: PANEL_OFFSET_PX };
  const visible = reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            className="fixed inset-0 z-50 bg-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: SCRIM_FADE_SECONDS, ease: 'linear' }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="layer"
            className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? FADE_TRANSITION : SPRING_TRANSITION}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={hidden}
              animate={visible}
              exit={hidden}
              transition={reduceMotion ? FADE_TRANSITION : SPRING_TRANSITION}
              className={cn(
                'pointer-events-auto w-full max-w-md rounded-2xl bg-white p-7',
                'border border-rule shadow-[0_24px_60px_-20px_rgb(0_0_0/0.35)]',
              )}
            >
              <h2 id={titleId} className="text-card font-semibold tracking-snug text-ink">
                {contactModal.title}
              </h2>
              <p className="mt-3 text-body text-ink-secondary">{contactModal.body}</p>
              <div className="mt-7">
                <Button onClick={onClose}>{contactModal.closeLabel}</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
