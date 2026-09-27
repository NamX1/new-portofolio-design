import MobileNav from './MobileNav';
import { useActiveSectionId } from '../../hooks/useActiveSection';
import { brand, navItems, ui } from '../../data/content';
import type { SectionId } from '../../types/content';
import { cn, PRESS_TEXT } from '../../lib/utils';

export interface HeaderProps {
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
          'relative inline-flex min-h-11 items-center px-3 text-small',
          PRESS_TEXT,
          isActive ? 'font-semibold text-ink' : 'text-ink-2 hover:text-ink',
        )}
      >
        {label}
        {/* The active marker is a rule, matching the ledger's language. */}
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-x-3 -bottom-px h-0.5 origin-left bg-vermilion transition-transform duration-[var(--duration-quick)] ease-[var(--ease-settle)]',
            isActive ? 'scale-x-100' : 'scale-x-0',
          )}
        />
      </a>
    </li>
  );
}

export default function Header({ onContact }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-rule bg-paper">
      <nav
        aria-label={ui.navLabel}
        className="mx-auto flex h-[var(--header-h)] w-full max-w-shell items-center justify-between gap-4 px-gutter sm:px-gutter-sm lg:px-gutter-lg"
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

        <ul className="hidden items-center lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.id} id={item.id} label={item.label} />
          ))}
        </ul>

        {/* Contact stays reachable at every width. */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onContact}
            className={cn(
              'hidden min-h-9 items-center rounded-[3px] bg-vermilion-deep px-4 text-small text-paper',
              'transition-colors duration-[var(--duration-instant)] ease-[var(--ease-ink)]',
              'hover:bg-vermilion active:brightness-90',
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
