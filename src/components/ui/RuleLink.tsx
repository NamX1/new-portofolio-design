import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn, PRESS_TEXT } from '../../lib/utils';

/**
 * The quiet action: a label with a rule that draws out from beneath it on
 * hover. Used wherever a solid button would be too loud.
 */
export interface RuleLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly children: ReactNode;
  readonly className?: string;
}

export default function RuleLink({ children, className, ...rest }: RuleLinkProps) {
  return (
    <a {...rest} className={cn('group inline-flex flex-col gap-1.5', PRESS_TEXT, className)}>
      <span className="text-body text-ink transition-colors duration-[var(--duration-quick)] ease-[var(--ease-settle)] group-hover:text-vermilion">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="block h-px w-full origin-left scale-x-[0.28] bg-vermilion transition-transform duration-[var(--duration-slow)] ease-[var(--ease-settle)] group-hover:scale-x-100 motion-reduce:scale-x-100 motion-reduce:transition-none"
      />
    </a>
  );
}
