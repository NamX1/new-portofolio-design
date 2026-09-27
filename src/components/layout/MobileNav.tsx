import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../ui/Button';
import { useActiveSectionId } from '../../hooks/useActiveSection';
import { navItems, ui } from '../../data/content';
import type { SectionId } from '../../types/content';
import { cn, PRESS_TEXT } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   Plain CSS transitions. The sheet is not gesture-driven, and the easing is
   symmetric so the return path matches the arrival path.
   ------------------------------------------------------------------------ */
const SHEET_PANEL = cn(
  'transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-ink)]',
  'data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0 data-[open=true]:opacity-100',
  'data-[open=false]:pointer-events-none data-[open=false]:translate-y-2 data-[open=false]:opacity-0',
  'motion-reduce:transition-opacity motion-reduce:data-[open=false]:translate-y-0',
);

const SHEET_SCRIM = cn(
  'transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-ink)]',
  'data-[open=true]:opacity-100 data-[open=false]:pointer-events-none data-[open=false]:opacity-0',
);

export interface MobileNavProps {
  readonly onContact: () => void;
}

export default function MobileNav({ onContact }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  // Escape, focus trap, scroll lock, focus restored to the trigger.
  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel?.querySelector<HTMLElement>('button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || panel === null) return;

      const focusable = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
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
    };
  }, [isOpen, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        aria-label={isOpen ? ui.closeMenu : ui.openMenu}
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          'inline-flex h-11 w-11 items-center justify-center text-ink hover:bg-paper-deep lg:hidden',
          PRESS_TEXT,
        )}
      >
        <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
        </span>
      </button>

      {createPortal(
        <div
          data-open={isOpen}
          onClick={close}
          className={cn('fixed inset-0 z-50 bg-scrim lg:hidden', SHEET_SCRIM)}
        >
          <div
            id="mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={ui.navLabel}
            data-open={isOpen}
            data-motion="transform"
            inert={!isOpen}
            onClick={(event) => event.stopPropagation()}
            className={cn(
              'absolute inset-x-0 top-0 border-b border-rule bg-paper px-gutter pt-2 pb-8',
              SHEET_PANEL,
            )}
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={close}
                aria-label={ui.closeMenu}
                className={cn(
                  'inline-flex h-11 w-11 items-center justify-center text-ink hover:bg-paper-deep',
                  PRESS_TEXT,
                )}
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <ul className="mt-2 border-t border-rule">
              {navItems.map((item) => (
                <MobileNavLink key={item.id} id={item.id} label={item.label} onSelect={close} />
              ))}
            </ul>

            <Button
              className="mt-8 w-full"
              onClick={() => {
                close();
                onContact();
              }}
            >
              {ui.contactAction}
            </Button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

interface MobileNavLinkProps {
  readonly id: SectionId;
  readonly label: string;
  readonly onSelect: () => void;
}

function MobileNavLink({ id, label, onSelect }: MobileNavLinkProps) {
  const activeId = useActiveSectionId();
  const isActive = activeId === id;

  return (
    <li className="border-b border-rule">
      <a
        href={`#${id}`}
        aria-current={isActive ? 'true' : undefined}
        onClick={onSelect}
        className={cn(
          'flex min-h-14 items-center text-sub hover:text-ink',
          PRESS_TEXT,
          isActive ? 'font-semibold text-ink' : 'text-ink-2',
        )}
      >
        {label}
      </a>
    </li>
  );
}
