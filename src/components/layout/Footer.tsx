import { footer, ui } from '../../data/content';
import { cn, PRESS_TEXT } from '../../lib/utils';

const COPYRIGHT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-paper-alt">
      <div className="mx-auto w-full max-w-shell px-gutter py-14 md:px-gutter-md lg:px-gutter-lg">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-body font-semibold text-ink">© {COPYRIGHT_YEAR}</p>
            <p className="mt-2 max-w-measure text-label text-ink-secondary">{footer.legal}</p>
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

        <div className="mt-12 border-t border-rule pt-6">
          <a
            href="#top"
            className={cn(
              'inline-flex min-h-10 items-center text-label text-ink-secondary hover:text-ink',
              PRESS_TEXT,
            )}
          >
            {ui.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
