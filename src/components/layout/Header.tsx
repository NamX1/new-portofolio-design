import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import NavPanel from './NavPanel';
import { useActiveSectionId } from '../../hooks/useActiveSection';
import { brand, navItems, ui } from '../../data/content';
import { cn, PRESS, PRESS_TEXT } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   A navigation object, not a bar of links.

   At rest it is a single small island: the name, one trigger, one action. The
   six section links exist only while it is open, so the header is never a row
   of competing words. The island borrows Dynamic Island's principle — compact
   when nothing is asked of it, wider when something is — and nothing else
   about it: this is a warm-neutral editorial object with a hairline edge, not
   an iOS notch.

   The island is inset from the top and centred rather than stretched edge to
   edge, so it occupies as little of the page as it can while staying obvious.
   Its height is budgeted against --header-h rather than chosen: the top gap
   plus the island must not exceed the scroll-margin every section already
   uses, or an anchor jump would land a heading underneath it. Below 1024px
   that is 8 + 48 = 56px, exactly the existing --header-h, so no section had to
   move. From 1024px the island is 44px in a 64px budget. That extra 4px on
   touch is what lets all three controls be full 44px targets on a phone.

   Motion. One critically damped spring, bounce 0, because nothing here was
   thrown. Only transform and opacity are animated: the panel fades and settles
   6px into place from its own top edge, which reads as emerging from the
   island without ever scaling type or reflowing the page. Under reduced motion
   the panel cross-fades with no offset and no stagger, and the scroll response
   is skipped entirely.
   ------------------------------------------------------------------------ */

/** Material is a literal string so Tailwind can analyse it. */
const MATERIAL_BACKDROP = 'backdrop-blur-[20px] backdrop-saturate-[180%]';

/** Below this the page is still at the top, so there is nothing to respond to. */
const SCROLL_THRESHOLD_PX = 8;

/** How long the page must be still before the island comes back to full presence. */
const SETTLE_MS = 160;

const PANEL_SPRING = { type: 'spring', bounce: 0, duration: 0.34 } as const;
const PANEL_FADE = { duration: 0.16, ease: 'linear' } as const;
const PANEL_HIDDEN = { opacity: 0, y: -6 };
const PANEL_VISIBLE = { opacity: 1, y: 0 };

/** Half the panel's own width, so the panel centres on the island. */
const CENTER = '-50%';

/**
 * The panel is wider than the island, so it has to be told how wide: a
 * percentage width would resolve against the island, not the viewport. Set in
 * JS rather than as a class so it can be paired with the x transform above
 * without a second mechanism fighting for the same property.
 */
const PANEL_WIDTH = 416;

export interface HeaderProps {
  /** Opens the contact modal. */
  readonly onContact: () => void;
}

export default function Header({ onContact }: HeaderProps) {
  const activeId = useActiveSectionId();
  const reduceMotion = useReducedMotion() === true;
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSettling, setIsSettling] = useState(false);
  const islandRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const settleTimer = useRef<number | null>(null);

  const close = useCallback(() => setIsOpen(false), []);

  /* Two facts, one listener. isScrolled is the durable state: past the top of
     the page the island earns an edge and a more opaque ground, because content
     now scrolls beneath it. isSettling is the transient one: while the page is
     actually moving the island gets out of the way, and once the page settles
     it returns. The settle timer is what makes the return predictable rather
     than flickering on every frame. */
  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(read);
      if (reduceMotion) return;

      setIsSettling(true);
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(() => {
        settleTimer.current = null;
        setIsSettling(false);
      }, SETTLE_MS);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    };
  }, [reduceMotion]);

  /* Escape closes from anywhere, and returns focus to the trigger that opened
     it. The panel is a disclosure, not a modal: nothing is trapped and the page
     behind it stays scrollable, because a navigation surface you have to
     escape out of is heavier than the one it replaced. */
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      close();
      triggerRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (islandRef.current?.contains(event.target as Node)) return;
      close();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isOpen, close]);

  const activeLabel = navItems.find((item) => item.id === activeId)?.label;
  const panelTransition = reduceMotion ? PANEL_FADE : PANEL_SPRING;

  return (
    /* Height is budgeted, not guessed. The island's top gap plus its height
       must stay within --header-h, which is also the scroll-margin every
       section uses, or an anchor jump would land a heading underneath it.
       8 + 48 = 56 = --header-h below lg; 16 + 44 = 60, inside the 64 that
       --header-h becomes at 1024px. The island is therefore 48px tall on touch
       and 44px with a pointer, which is what lets every control inside it be
       a full 44px target on a phone. */
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-gutter pt-2 lg:pt-4">
      <div ref={islandRef} className="relative pointer-events-auto">
        <nav
          aria-label={ui.navLabel}
          data-scrolled={isScrolled}
          data-settling={isSettling}
          className={cn(
            'flex h-12 items-center gap-1 rounded-[1.75rem] border px-2 lg:h-11',
            'border-material-border bg-paper/72 data-[scrolled=true]:bg-paper/92',
            MATERIAL_BACKDROP,
            'shadow-[0_1px_2px_rgb(11_13_16/0.04),0_8px_24px_-12px_rgb(11_13_16/0.16)]',
            'transition-[background-color,border-color,opacity,padding] duration-[var(--duration-calm)] ease-[var(--ease-settle)]',
            // While the page is moving the island yields; when it settles it
            // returns. Reduced motion skips the response, so the opacity and
            // padding transitions are removed with it.
            reduceMotion
              ? undefined
              : 'data-[settling=true]:opacity-90 data-[settling=true]:py-2.5',
          )}
        >
          <a
            href="#top"
            className={cn(
              'inline-flex h-11 items-center rounded-full px-2.5 text-body font-semibold text-ink lg:h-9',
              PRESS_TEXT,
            )}
          >
            {brand.shortName}
          </a>

          <span aria-hidden="true" className="h-5 w-px bg-rule lg:h-4" />

          <button
            ref={triggerRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls="nav-island-panel"
            aria-label={isOpen ? ui.closeMenu : ui.openMenu}
            onClick={() => setIsOpen((open) => !open)}
            className={cn(
              'inline-flex h-11 items-center gap-1.5 rounded-full px-2.5 text-label lg:h-9',
              PRESS_TEXT,
              isOpen ? 'bg-paper-alt text-ink' : 'text-ink-secondary hover:bg-paper-alt hover:text-ink',
            )}
          >
            {/* The glyph follows real state, the same rule the mobile sheet uses. */}
            {isOpen ? <XIcon weight="fill" aria-hidden="true" /> : <ListIcon aria-hidden="true" />}
            <span>{ui.sectionsTrigger}</span>
          </button>

          <span aria-hidden="true" className="h-5 w-px bg-rule lg:h-4" />

          <button
            type="button"
            onClick={onContact}
            className={cn(
              'inline-flex h-11 items-center rounded-full bg-ink px-3.5 text-label text-paper lg:h-9',
              'hover:bg-ink-secondary',
              PRESS,
            )}
          >
            {ui.contactAction}
          </button>
        </nav>

        {/* Where you are, said once and quietly. Decorative: the same fact is
            carried accessibly by aria-current on the link itself once the
            panel is open, so announcing it twice would only be noise. It is
            hidden until there is a section to name, and it never appears in
            the open state, where the links do the work. */}
        {activeLabel !== undefined && !isOpen && (
          <p
            aria-hidden="true"
            className="pointer-events-none absolute top-full left-1/2 mt-2 flex -translate-x-1/2 items-center gap-1.5 text-label text-ink-tertiary"
          >
            <span className="h-1 w-1 rounded-full bg-accent" />
            {activeLabel}
          </p>
        )}

        {/* The motion element must be the DIRECT child of AnimatePresence and
            must carry the key. AnimatePresence tracks its immediate children:
            wrap it in a plain div and the exit animation plays but the node is
            never unmounted, leaving a transparent panel in the DOM swallowing
            clicks.

            The horizontal centring is a motion `x` value, not a Tailwind
            translate class. Motion owns the inline transform on this element,
            so a class-based translate would be overwritten the moment the
            panel animated — the panel would then jump to the island's left
            edge. Declaring x here keeps both axes in one place motion controls. */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="nav-island-panel"
              key="panel"
              /* inert while closed. During the exit animation the node is
                 still mounted but isOpen is already false, so this is exactly
                 the window where a transparent panel would otherwise be
                 focusable and clickable. inert takes its links out of the tab
                 order and out of hit-testing for that whole window, so the
                 panel cannot swallow a click or offer a keyboard user six
                 links that are on their way out. */
              inert={!isOpen}
              initial={reduceMotion ? { opacity: 0, x: CENTER } : { ...PANEL_HIDDEN, x: CENTER }}
              animate={{ ...PANEL_VISIBLE, x: CENTER }}
              exit={reduceMotion ? { opacity: 0, x: CENTER } : { ...PANEL_HIDDEN, x: CENTER }}
              transition={panelTransition}
              style={{ width: PANEL_WIDTH }}
              className={cn(
                'absolute top-full left-1/2 mt-2 max-w-[calc(100vw-3rem)] origin-top rounded-3xl border border-material-border bg-paper/92 shadow-[0_1px_2px_rgb(11_13_16/0.04),0_24px_48px_-24px_rgb(11_13_16/0.3)] backdrop-blur-[24px] backdrop-saturate-[180%] sm:max-w-[26rem]',
                MATERIAL_BACKDROP,
              )}
            >
              <NavPanel onNavigate={close} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
