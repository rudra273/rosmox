interface ArrowIconProps {
  size?: number;
}

/**
 * The small right-arrow used across nav, hero, products and CTA in draft1.
 * Path: M3 6h6m0 0L6 3m3 3L6 9
 */
export default function ArrowIcon({ size = 12 }: ArrowIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h6m0 0L6 3m3 3L6 9" />
    </svg>
  );
}
