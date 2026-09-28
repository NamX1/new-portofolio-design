import { useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { XIcon } from '@phosphor-icons/react';
import Button from './Button';
import { contactModal } from '../../data/content';

/* ---------------------------------------------------------------------------
   Named motion values, never inline numbers.

   The entrance is a critically damped spring (bounce 0): the dialog was not
   thrown by a gesture, so it should not overshoot. It materialises by
   arriving from slightly small and slightly low while the scrim dims the
   page behind it, which separates the task and pushes the background back.
   Under reduced motion it becomes a pure cross-fade: no scale, no offset.
   ------------------------------------------------------------------------ */
const SPRING = { type: 'spring', bounce: 0, duration: 0.34 } as const;
const CROSS_FADE = { duration: 0.2, ease: 'linear' } as const;
const SCRIM_FADE = { duration: 0.26, ease: 'linear' } as const;
const SCALE_FROM = 0.96;
const OFFSET_PX = 10;

const MATERIAL = 'bg-paper/88 backdrop-blur-[32px] backdrop-saturate-[180%]';

export interface ContactModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() === true;

  // Escape, focus trap, scroll lock, and focus restored to the trigger.
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

  const hidden = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: SCALE_FROM, y: OFFSET_PX };
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
            transition={SCRIM_FADE}
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
            transition={reduceMotion ? CROSS_FADE : SPRING}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={hidden}
              animate={visible}
              exit={hidden}
              transition={reduceMotion ? CROSS_FADE : SPRING}
              className={`pointer-events-auto w-full max-w-md rounded-3xl border border-material-border p-8 shadow-[0_32px_64px_-32px_rgb(11_13_16/0.4)] ${MATERIAL}`}
            >
              <div className="flex items-start justify-between gap-6">
                <h2 id={titleId} className="text-lede font-semibold text-ink">
                  {contactModal.title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={contactModal.closeLabel}
                  className="-mt-1.5 -mr-1.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-secondary transition-colors duration-[var(--duration-press)] ease-[var(--ease-instant)] hover:bg-paper-alt hover:text-ink"
                >
                  <XIcon aria-hidden="true" />
                </button>
              </div>

              <p className="mt-3 text-body text-ink-secondary">{contactModal.body}</p>

              <div className="mt-8">
                <Button onClick={onClose}>{contactModal.closeLabel}</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
