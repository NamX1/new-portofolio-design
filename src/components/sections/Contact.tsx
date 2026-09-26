import Button from '../ui/Button';
import { contact } from '../../data/content';

export interface ContactProps {
  /** Opens the contact modal. */
  readonly onContact: () => void;
}

export default function Contact({ onContact }: ContactProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-white py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto flex w-full max-w-shell flex-col items-center px-gutter text-center sm:px-gutter-sm lg:px-gutter-lg">
        <h2
          id="contact-heading"
          className="max-w-3xl text-heading font-semibold tracking-tight text-balance text-ink"
        >
          {contact.heading}
        </h2>
        <p className="mt-5 max-w-prose text-lede text-ink-secondary">{contact.line}</p>
        <div className="mt-9">
          <Button onClick={onContact}>{contact.actionLabel}</Button>
        </div>
      </div>
    </section>
  );
}
