import { brand, footer, ui } from '../../data/content';
import { cn, PRESS_TEXT } from '../../lib/utils';

export default function Footer() {
  return (
    <footer className="bg-canvas py-12">
      <div className="mx-auto w-full max-w-shell px-gutter sm:px-gutter-sm lg:px-gutter-lg">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <p className="text-small font-semibold tracking-snug text-ink">{brand.name}</p>
            <p className="mt-2 text-small leading-relaxed text-ink-secondary">{footer.legal}</p>
          </div>

          <nav aria-label="Footer" className="flex gap-14 sm:gap-20">
            {footer.columns.map((column) => (
              <div key={column.heading}>
                <h2 className="text-micro font-semibold tracking-eyebrow text-ink-secondary uppercase">
                  {column.heading}
                </h2>
                <ul className="mt-3 space-y-1.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={cn(
                          'inline-flex min-h-9 items-center text-small text-ink-secondary hover:text-ink hover:underline hover:underline-offset-4',
                          PRESS_TEXT,
                        )}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-micro text-ink-secondary">{footer.copyright}</p>
          <a
            href="#top"
            className={cn(
              'inline-flex min-h-9 items-center text-small text-ink-secondary hover:text-ink',
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
