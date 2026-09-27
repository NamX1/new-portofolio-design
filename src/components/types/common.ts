import type { ReactNode } from 'react';

export interface WithChildren {
  readonly children: ReactNode;
}

export interface WithContact {
  /** Opens the contact modal. */
  readonly onContact: () => void;
}

export interface ContactModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}
