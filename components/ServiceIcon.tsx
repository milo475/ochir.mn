import type { ServiceSlug } from "@/data/packages";

export function ServiceIcon({ slug, className = "h-6 w-6" }: { slug: ServiceSlug; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (slug === "delivery")
    return (
      <svg {...common}>
        <circle cx="6" cy="17" r="3" />
        <circle cx="18" cy="17" r="3" />
        <path d="M9 17h6l-2-6H8M13 11l2-4h3M3 9h5v4H3z" />
      </svg>
    );
  if (slug === "web")
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 8h18M8 21h8M7 12h4M7 15h7" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 3v3M8 21h8" />
      <rect x="4" y="6" width="16" height="12" rx="3" />
      <circle cx="9" cy="12" r="1.3" />
      <circle cx="15" cy="12" r="1.3" />
      <path d="M1.5 11v3M22.5 11v3" />
    </svg>
  );
}
