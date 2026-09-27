import Button from '../ui/Button';
import { contact } from '../../data/content';

export interface ContactProps {
  readonly onContact: () => void;
}

export default function Contact({ onContact }: ContactProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-paper-deep py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter sm:px-gutter-sm lg:px-gutter-lg">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2
            id="contact-heading"
            className="text-statement font-semibold tracking-statement text-balance text-ink lg:col-span-8"
          >
            {contact.heading}
          </h2>

          <div className="lg:col-span-4 lg:pt-3">
            <p className="text-body text-ink-2">{contact.line}</p>
            <div className="mt-8">
              <Button onClick={onContact}>{contact.actionLabel}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
