import { IconContext, EnvelopeSimpleIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

/* ---------------------------------------------------------------------------
   The single place where icon defaults live.

   Every icon in the app inherits weight "regular", size 18 and
   colour "currentColor" from this provider, so an icon always matches the
   text it sits beside and never needs a colour of its own. An individual
   icon may still override weight, but only where a real state demands it:
   the menu toggle fills while it is open and rests at regular when closed.
   ------------------------------------------------------------------------ */
const DEFAULT_WEIGHT = 'regular';
const DEFAULT_SIZE = 18;
const DEFAULT_COLOR = 'currentColor';

export interface IconDefaultsProps {
  readonly children: ReactNode;
}

export default function IconDefaults({ children }: IconDefaultsProps) {
  return (
    <IconContext.Provider
      value={{ weight: DEFAULT_WEIGHT, size: DEFAULT_SIZE, color: DEFAULT_COLOR }}
    >
      {children}
    </IconContext.Provider>
  );
}

/**
 * The mark for a link that reaches an address. Regular weight: it sits in the
 * quiet footer beside a visible label, competing with nothing.
 */
export function MailIcon() {
  return <EnvelopeSimpleIcon aria-hidden="true" />;
}
