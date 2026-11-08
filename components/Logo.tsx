export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold tracking-tight ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3 28 10v12L16 29 4 22V10z" fill="#111A2E" stroke="#FF6B2C" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 3v13m0 0 12-6M16 16 4 10" stroke="#FF6B2C" strokeWidth="2" strokeLinejoin="round" fill="none" />
        <path d="M16 16v13" stroke="#9AA5B8" strokeWidth="2" opacity=".5" />
      </svg>
      <span className="text-lg">Ochir</span>
    </span>
  );
}
