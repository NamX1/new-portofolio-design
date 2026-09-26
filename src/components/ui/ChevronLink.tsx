import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn, PRESS_TEXT } from '../../lib/utils';

/**
 * Apple's characteristic text link: the label in accent blue with a chevron
 * that nudges on hover. Used for in-page navigation only, so it never points
 * at a destination that does not exist.
 */
export interface ChevronLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly children: ReactNode;
  readonly className?: string;
}

export default function ChevronLink({ children, className, ...rest }: ChevronLinkProps) {
  return (
    <a
      {...rest}
      className={cn(
        'group inline-flex min-h-11 items-center gap-0.5 text-body text-accent',
        PRESS_TEXT,
        className,
      )}
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 8 14"
        className="h-3.5 w-2 shrink-0 transition-transform duration-[var(--duration-snap)] ease-apple group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        fill="none"
      >
        <path
          d="M1.5 1.5 6.5 7l-5 5.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
