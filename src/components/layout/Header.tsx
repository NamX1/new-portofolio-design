import { useEffect, useState } from 'react';
import MobileNav from './MobileNav';
import { useActiveSectionId } from '../../hooks/useActiveSection';
import { brand, navItems, ui } from '../../data/content';
import type { SectionId } from '../../types/content';
import { cn, PRESS_TEXT } from '../../lib/utils';

/* The material is a literal utility string so Tailwind can analyse it. */
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

/** Active state comes from the observer, never from local state. */
function NavLink({ id, label }: NavLinkProps) {
  const activeId = useActiveSectionId();
  const isActive = activeId === id;

  return (
    <li>
      <a
        href={`#${id}`}
        aria-current={isActive ? 'true' : undefined}
        className={cn(
          'inline-flex min-h-11 items-center rounded-full px-3 text-small tracking-normal',
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
        'bg-white/72 data-[scrolled=true]:bg-white/88',
        MATERIAL_BACKDROP,
        'transition-[background-color] duration-[var(--duration-calm)] ease-apple',
        'border-b border-transparent data-[scrolled=true]:border-rule',
      )}
    >
      <nav
        aria-label={ui.navLabel}
        className="mx-auto flex h-14 w-full max-w-shell items-center justify-between gap-4 px-gutter sm:px-gutter-sm lg:h-16 lg:px-gutter-lg"
      >
        <a
          href="#top"
          className={cn(
            'inline-flex min-h-11 items-center text-body font-semibold tracking-snug text-ink',
            PRESS_TEXT,
          )}
        >
          {brand.short}
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.id} id={item.id} label={item.label} />
          ))}
        </ul>

        {/* Contact stays reachable at every width. */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onContact}
            className={cn(
              'hidden min-h-9 items-center rounded-full bg-accent px-4 text-small text-on-accent',
              'transition-[transform,background-color] duration-[var(--duration-press)] ease-apple',
              'hover:bg-accent-hover active:scale-[0.985] motion-reduce:active:scale-100',
              'md:inline-flex',
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
