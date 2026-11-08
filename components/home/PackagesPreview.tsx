import Link from "next/link";
import { PRICE_PLACEHOLDER, packagesFor, services } from "@/data/packages";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceIcon } from "@/components/ServiceIcon";

export function PackagesPreview() {
  return (
    <section className="container-page py-16 sm:py-24">
      <SectionTitle
        eyebrow="Багцууд"
        title="Хэмжээндээ тохирсон багцаа сонго"
        text="Үнэ таны захиалгын тоо, хэрэгцээнээс хамаарна. Сонгоод илгээхэд бид үнийн санал явуулна."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.08} className="card tilt flex flex-col p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent">
                <ServiceIcon slug={s.slug} className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">{s.title}</h3>
            </div>
            <ul className="mt-5 flex-1 divide-y divide-line">
              {packagesFor(s.slug).map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-3.5">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-semibold">
                      {p.name}
                      {p.highlight && <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold text-accent">Түгээмэл</span>}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-muted">{p.features[0]}</p>
                  </div>
                  <Link
                    href={`/order?service=${s.slug}&package=${p.id}`}
                    className="shrink-0 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                    aria-label={`${s.title}: ${p.name} багц — ${p.priceFrom ?? PRICE_PLACEHOLDER}`}
                  >
                    {p.priceFrom ?? "Үнэ авах"}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/services/${s.slug}`} className="mt-4 text-sm font-semibold text-accent hover:underline">
              Багцуудыг харьцуулах →
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
