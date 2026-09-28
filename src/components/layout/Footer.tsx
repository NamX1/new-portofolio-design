import { siGithub } from 'simple-icons';
import BrandIcon from '../ui/BrandIcon';
import { MailIcon } from '../ui/icons';
import { brand, contact, footer, ui } from '../../data/content';
import { cn, PRESS_TEXT } from '../../lib/utils';

const COPYRIGHT_YEAR = 2026;

/**
 * Direct channels, built from data rather than hardcoded. A channel renders
 * only when its value is non-empty, so adding one to data/content.ts is the
 * only step needed to surface it. Nothing is invented here: there is no
 * LinkedIn, X, or Instagram, because none was provided.
 */
function ContactChannels() {
  const hasEmail = contact.email !== '';
  const hasGithub = contact.github !== '';

  if (!hasEmail && !hasGithub) return null;

  return (
    <ul role="list" className="mt-6 space-y-1">
      {hasEmail && (
        <li>
          <a
            href={`mailto:${contact.email}`}
            className={cn(
              'inline-flex min-h-10 items-center gap-2.5 text-label text-ink-secondary hover:text-ink hover:underline hover:underline-offset-4',
              PRESS_TEXT,
            )}
          >
            <MailIcon />
            <span>Email</span>
          </a>
        </li>
      )}
      {hasGithub && (
        <li>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex min-h-10 items-center gap-2.5 text-label text-ink-secondary hover:text-ink hover:underline hover:underline-offset-4',
              PRESS_TEXT,
            )}
          >
            {/* currentColor, not the brand hex: GitHub's mark is near-black
                and would vanish on a dark ground. */}
            <BrandIcon icon={siGithub} inheritColor />
            <span>GitHub</span>
          </a>
        </li>
      )}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-paper-alt">
      <div className="mx-auto w-full max-w-shell px-gutter py-14 md:px-gutter-md lg:px-gutter-lg">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-body font-semibold text-ink">© {COPYRIGHT_YEAR}</p>
            <p className="mt-2 max-w-measure text-label text-ink-secondary">{footer.legal}</p>
            <ContactChannels />
          </div>

          {footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              {/* A list label, not document structure, so it is not a heading. */}
              <p className="text-label font-semibold tracking-label text-ink-tertiary uppercase">
                {column.heading}
              </p>
              <ul role="list" className="mt-4 space-y-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        'inline-flex min-h-10 items-center text-label text-ink-secondary hover:text-ink hover:underline hover:underline-offset-4',
                        PRESS_TEXT,
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rule pt-6">
          <a
            href="#top"
            className={cn(
              'inline-flex min-h-10 items-center text-label text-ink-secondary hover:text-ink',
              PRESS_TEXT,
            )}
          >
            {ui.backToTop}
          </a>
          <p className="text-label text-ink-tertiary">{brand.name}</p>
        </div>
      </div>
    </footer>
  );
}
