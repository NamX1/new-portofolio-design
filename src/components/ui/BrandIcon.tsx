import type { SimpleIcon } from 'simple-icons';
import { cn } from '../../lib/utils';

export interface BrandIconProps {
  /** A simple-icons icon object, e.g. siPython. */
  readonly icon: SimpleIcon;
  readonly size?: number;
  /**
   * Force the fill instead of the brand colour. Used where the brand colour
   * would vanish: GitHub's hex is near-black, which disappears on a dark
   * ground, so the footer GitHub mark inherits currentColor instead.
   */
  readonly inheritColor?: boolean;
  /**
   * An explicit fill, for the marks whose brand colour is too light to read on
   * the ground they sit on. Takes precedence over inheritColor.
   */
  readonly fill?: string;
  readonly className?: string;
}

const DEFAULT_SIZE = 16;

/**
 * Renders a brand mark as inline geometry: an <svg> with a single path rather
 * than an <img>, so it costs no request and scales with the text beside it.
 * Always decorative, so assistive technology skips it and the visible label
 * carries the meaning on its own.
 */
export default function BrandIcon({
  icon,
  size = DEFAULT_SIZE,
  inheritColor = false,
  fill,
  className,
}: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
      fill={fill ?? (inheritColor ? 'currentColor' : `#${icon.hex}`)}
    >
      <path d={icon.path} />
    </svg>
  );
}
