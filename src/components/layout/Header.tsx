import { useEffect, useState } from 'react';
import MobileNav from './MobileNav';
import { useActiveSectionId } from '../../hooks/useActiveSection';
import { brand, navItems, ui } from '../../data/content';
import type { SectionId } from '../../types/content';
import { cn, PRESS, PRESS_TEXT } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   Material is a literal utility string so Tailwind can analyse it.
   ------------------------------------------------------------------------ */
const MATERIAL_BACKDROP = 'backdrop-blur-[20px] backdrop-saturate-[180%]';
const SCROLL_THRESHOLD_PX = 8;

export interface HeaderProps {
  /** Opens the contact modal. */
  readonly onContact: () => void;
}

interface NavLinkProps {
  readonly id: SectionId;
  readonly label: string;
}

function NavLink({ id, label }: NavLinkProps) {
  const activeId = useActiveSectionId();
  const isActive = activeId === id;

  return (
    <li>
      <a
        href={`#${id}`}
        aria-current={isActive ? 'true' : undefined}
        className={cn(
          'inline-flex min-h-11 items-center px-3 text-label',
          PRESS_TEXT,
          isActive ? 'font-semibold text-ink' : 'text-ink-secondary hover:text-ink',
        )}
      >
        {label}
      </a>
    </li>
  );
}

export default function Header({ onContact }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      data-scrolled={isScrolled}
      className={cn(
        'fixed inset-x-0 top-0 z-40',
        'bg-paper/72 data-[scrolled=true]:bg-paper/88',
        MATERIAL_BACKDROP,
        'transition-[background-color] duration-[var(--duration-calm)] ease-[var(--ease-settle)]',
        'border-b border-transparent data-[scrolled=true]:border-rule',
      )}
    >
      <nav
        aria-label={ui.navLabel}
        className="mx-auto flex h-[var(--header-h)] w-full max-w-shell items-center justify-between gap-4 px-gutter md:px-gutter-md lg:px-gutter-lg"
      >
        <a
          href="#top"
          className={cn(
            'inline-flex min-h-11 items-center text-body font-semibold text-ink',
            PRESS_TEXT,
          )}
        >
          {brand.name}
        </a>

        <ul role="list" className="hidden items-center md:flex">
          {navItems.map((item) => (
            <NavLink key={item.id} id={item.id} label={item.label} />
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onContact}
            className={cn(
              'hidden min-h-10 items-center rounded-full bg-ink px-4 text-label text-paper',
              'hover:bg-ink-secondary',
              PRESS,
              'sm:inline-flex',
            )}
          >
            {ui.contactAction}
          </button>
          <MobileNav onContact={onContact} />
        </div>
      </nav>
    </header>
  );
}
