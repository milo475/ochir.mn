/** Ochir брэнд тэмдэг (O-тэмдэг). public/brand/mark-transparent.svg-тэй ижил (цайвар дэвсгэрт). */
export function BrandMark({
  size = 28,
  arc = "#FF6B2C",
  dot = "#0B1220",
  className = "",
  dotClassName = "",
}: {
  size?: number;
  arc?: string;
  dot?: string;
  className?: string;
  dotClassName?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" className={className} aria-hidden="true" focusable="false">
      <path d="M 413.6 228.2 A 160 160 0 1 1 283.8 98.4" fill="none" stroke={arc} strokeWidth="64" />
      <circle cx="372" cy="140" r="34" fill={dot} className={dotClassName} />
    </svg>
  );
}

/** Header: тэмдэг (28px) + "Ochir". Hover-т цэг 1.1 дахин томорч буцна. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`group inline-flex items-center gap-2 tracking-tight ${className}`}>
      <BrandMark
        size={28}
        dotClassName="origin-center transition-transform duration-200 ease-out [transform-box:fill-box] group-hover:scale-110"
      />
      <span className="text-lg font-semibold leading-none text-ink">Ochir</span>
    </span>
  );
}
