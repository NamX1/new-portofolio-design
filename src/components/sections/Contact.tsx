import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
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
      className="bg-paper py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter md:px-gutter-md lg:px-gutter-lg">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
          <Reveal>
            <h2
              id="contact-heading"
              className="max-w-[16ch] text-heading font-semibold text-balance text-ink"
            >
              {contact.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="max-w-prose text-body text-ink-secondary">{contact.line}</p>
              <div className="mt-8">
                <Button onClick={onContact}>{contact.actionLabel}</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
