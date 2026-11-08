import Link from "next/link";
import { PRICE_PLACEHOLDER, type Package } from "@/data/packages";

export function PackageCard({ pkg, compact = false }: { pkg: Package; compact?: boolean }) {
  return (
    <article
      className={`card tilt relative flex h-full flex-col p-6 ${pkg.highlight ? "border-accent/50 bg-gradient-to-b from-accent/[0.08] to-card" : ""}`}
    >
      {pkg.highlight && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-bg">Санал болгох</span>
      )}
      <h3 className="text-xl font-bold">{pkg.name}</h3>
      <p className="mt-1 text-sm text-muted">{pkg.tagline}</p>
      <p className="mt-5 text-lg font-semibold text-accent">{pkg.price ?? PRICE_PLACEHOLDER}</p>
      {!compact && (
        <ul className="mt-5 flex-1 space-y-2.5 text-[15px]">
          {pkg.features.map((feat) => (
            <li key={feat} className="flex gap-2.5">
              <svg className="mt-1 h-4 w-4 shrink-0 text-accent" viewBox="0 0 16 16" aria-hidden="true">
                <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`/order?service=${pkg.service}&package=${pkg.id}`}
        className={`${pkg.highlight ? "btn-primary" : "btn-ghost"} mt-6 w-full`}
        aria-label={`${pkg.name} багцаар захиалах`}
      >
        Энэ багцаар захиалах
      </Link>
    </article>
  );
}
