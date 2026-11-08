import Link from "next/link";
import { PRICE_PLACEHOLDER, packagesFor, type ServiceSlug } from "@/data/packages";
import { Reveal } from "./Reveal";

/** Үйлчилгээний хуудсан дээрх багцын товч картууд → /pricing?tab= */
export function PackageMini({ service, title = "Багцууд" }: { service: ServiceSlug; title?: string }) {
  const pkgs = packagesFor(service);
  return (
    <section aria-labelledby={`pkgs-${service}`} className="container-page mt-16 sm:mt-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Багц</p>
          <h2 id={`pkgs-${service}`} className="mt-3 text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>
        <Link href={`/pricing?tab=${service}`} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Харьцуулах
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </Reveal>
      <div className={`mt-8 grid gap-4 ${pkgs.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {pkgs.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06} className="min-w-0">
            <Link
              href={`/order?service=${p.service}&package=${p.id}`}
              className={`card tilt flex h-full flex-col p-5 ${p.highlight ? "border-accent/50" : ""}`}
              aria-label={`${p.name} багцаар захиалах`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-lg font-bold">{p.name}</span>
                {p.highlight && <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-bg">Санал болгох</span>}
              </span>
              <span className="mt-1 text-sm text-muted">{p.tagline}</span>
              <span className="mt-4 text-[15px] font-semibold text-accent">{p.priceFrom ?? PRICE_PLACEHOLDER}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
