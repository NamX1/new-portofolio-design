import { brand, footer, ui } from '../../data/content';
import { cn, PRESS_TEXT } from '../../lib/utils';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-paper-deep py-14">
      <div className="mx-auto w-full max-w-shell px-gutter sm:px-gutter-sm lg:px-gutter-lg">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-heading font-semibold tracking-heading text-ink">{brand.name}</p>
            <p className="mt-1 text-body text-ink-2">{brand.tagline}</p>
            <p className="mt-6 max-w-measure text-small text-ink-3">{footer.legal}</p>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-mono text-data tracking-data text-ink-3 uppercase">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        'inline-flex min-h-9 items-center text-small text-ink-2 hover:text-vermilion hover:underline hover:underline-offset-4',
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

        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-data tracking-data text-ink-3 uppercase">
            © {year} {footer.copyright}
          </p>
          <a
            href="#top"
            className={cn(
              'inline-flex min-h-9 items-center text-small text-ink-2 hover:text-ink',
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
