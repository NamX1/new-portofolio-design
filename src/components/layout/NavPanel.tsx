import { motion, useReducedMotion } from 'motion/react';
import { useActiveSectionId } from '../../hooks/useActiveSection';
import { navItems } from '../../data/content';
import type { SectionId } from '../../types/content';
import { cn, PRESS_TEXT } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   The expanded half of the navigation island.

   Split out so the island shell and the link list each stay readable. The list
   is the same at both widths; only its arrangement changes. One column and tall
   rows on touch, two columns and shorter rows with a pointer, because six
   stacked links on a phone is a long thumb-walk and two columns is not.

   Every link keeps its real href, so the section anchors work with or without
   this island, and each click collapses it so the reader lands on the section
   rather than behind an open panel.
   ------------------------------------------------------------------------ */

/** Sibling stagger, within the 80-120ms band. */
const ITEM_STAGGER = 0.045;

const HIDDEN = { opacity: 0, y: -6 };
const VISIBLE = { opacity: 1, y: 0 };
const SPRING = { type: 'spring', bounce: 0, duration: 0.34 } as const;
const FADE = { duration: 0.12, ease: 'linear' } as const;

export interface NavPanelProps {
  /** Called after a link is chosen, so the island can collapse. */
  readonly onNavigate: () => void;
}

interface NavPanelLinkProps {
  readonly id: SectionId;
  readonly label: string;
  readonly isActive: boolean;
  readonly index: number;
  readonly onNavigate: () => void;
}

export default function NavPanel({ onNavigate }: NavPanelProps) {
  const activeId = useActiveSectionId();

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-0.5 border-t border-rule px-2 py-2 sm:grid-cols-2 sm:px-1.5"
    >
      {navItems.map((item, index) => (
        <NavPanelLink
          key={item.id}
          id={item.id}
          label={item.label}
          isActive={activeId === item.id}
          index={index}
          onNavigate={onNavigate}
        />
      ))}
    </ul>
  );
}

function NavPanelLink({ id, label, isActive, index, onNavigate }: NavPanelLinkProps) {
  const reduceMotion = useReducedMotion() === true;

  // Reduced motion drops the offset and the stagger, keeping only the fade, so
  // the links still appear in order rather than all at once.
  const transition =
    reduceMotion && index > 0 ? FADE : reduceMotion ? FADE : { ...SPRING, delay: index * ITEM_STAGGER };

  return (
    <motion.li
      initial={reduceMotion ? { opacity: 0 } : HIDDEN}
      animate={VISIBLE}
      transition={transition}
    >
      <a
        href={`#${id}`}
        aria-current={isActive ? 'true' : undefined}
        onClick={onNavigate}
        className={cn(
          // 48px on touch, 44px with a pointer: both clear the 44px guidance,
          // and the row grows rather than the type shrinking.
          'flex min-h-12 items-center gap-2.5 rounded-full px-3 text-body sm:min-h-11',
          PRESS_TEXT,
          isActive ? 'font-semibold text-ink' : 'text-ink-secondary hover:bg-paper-alt hover:text-ink',
        )}
      >
        {/* The single warm accent in the chrome, doing one job: saying where
            you are. A dot, not a filled tile, so it stays quiet. */}
        <span
          aria-hidden="true"
          className={cn(
            'h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-[var(--duration-snap)] ease-[var(--ease-settle)]',
            isActive ? 'bg-accent' : 'bg-transparent',
          )}
        />
        {label}
      </a>
    </motion.li>
  );
}
