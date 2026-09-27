import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * twMerge only knows Tailwind's stock theme. This project defines its own
 * scale in src/index.css, so an unregistered name like `text-data` would be
 * read as a text *colour* and silently deleted on collision. Registering the
 * real scale keeps conflict resolution honest.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['display', 'statement', 'heading', 'sub', 'body', 'small', 'data'] },
      ],
      tracking: [{ tracking: ['display', 'statement', 'heading', 'body', 'data'] }],
    },
  },
});

/** Merge conditional class names, resolving conflicts last-wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Press feedback. Responds on pointer-down: the fill steps darker on the
 * instant of contact. No scale, no bounce — this system does not inflate
 * controls to prove it is alive.
 */
export const PRESS =
  'transition-colors duration-[var(--duration-instant)] ease-[var(--ease-ink)] active:brightness-90';

/** Press feedback for text controls. Opacity only, so it never shifts type. */
export const PRESS_TEXT =
  'transition-[color,background-color,opacity] duration-[var(--duration-instant)] ease-[var(--ease-ink)] active:opacity-60';
