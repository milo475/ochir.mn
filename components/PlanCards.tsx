import Link from "next/link";
import { packagesFor, type Package, type ServiceSlug } from "@/data/packages";

/** Багц бүрийн доорх нэг мөр нөхцөл */
const FOOTNOTE: Record<ServiceSlug, string> = {
  delivery: "Бүх багц: бэлэн мөнгө цуглуулахгүй · 7 хоног бүр нэхэмжлэх · зогсоох 7 хоногийн өмнө мэдэгдэнэ",
  web: "Домэйн, хостинг таны нэр дээр",
  automation: "FB/IG админ эрх хэрэгтэй",
};

/** "6 000₮ / хүргэлтээс" → ["6 000₮", "/ хүргэлтээс"] */
function splitPrice(p: Package): { amount: string; unit: string; quote: boolean } {
  if (!p.priceFrom) return { amount: "Үнийн санал", unit: "хүсэлт илгээхэд 24 цагт", quote: true };
  const i = p.priceFrom.indexOf(" / ");
  return i === -1
    ? { amount: p.priceFrom, unit: "", quote: false }
    : { amount: p.priceFrom.slice(0, i), unit: p.priceFrom.slice(i + 1), quote: false };
}

function Check() {
  return (
    <svg className="mt-[3px] h-4 w-4 shrink-0 text-accent" viewBox="0 0 16 16" aria-hidden="true">
      <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Subscription маягийн багцын картууд — data/packages.ts-ээс */
export function PlanCards({ service }: { service: ServiceSlug }) {
  const pkgs = packagesFor(service);
  const two = pkgs.length === 2;
  return (
    <div>
      <ul className={`grid gap-6 ${two ? "mx-auto max-w-3xl md:grid-cols-2" : "md:grid-cols-3"}`}>
        {pkgs.map((p) => {
          const price = splitPrice(p);
          return (
            <li
              key={p.id}
              className={`relative flex flex-col rounded-2xl bg-surface p-7 ${p.highlight ? "border-2 border-ink" : "border border-line"}`}
            >
              {p.highlight && (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-ink bg-surface px-3 py-0.5 text-xs font-medium text-ink">
                  Санал болгож байна
                </span>
              )}
              <h3 className="text-[18px] font-semibold leading-tight text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.tagline}</p>

              <p className="mt-6 flex min-h-[44px] flex-wrap items-baseline gap-x-1.5">
                <span className={`font-bold leading-none tracking-tight text-ink ${price.quote ? "text-[24px]" : "text-[36px]"}`}>{price.amount}</span>
                <span className="text-sm text-muted">{price.unit}</span>
              </p>
              {p.priceNote && <p className="mt-2 text-xs text-muted">{p.priceNote}</p>}

              <Link
                href={`/order?service=${p.service}&plan=${p.id}`}
                className={`${p.highlight ? "btn-primary" : "btn-ghost"} mt-6 w-full`}
                aria-label={`${p.name} багцаар захиалах`}
              >
                Энэ багцаар захиалах
              </Link>

              <hr className="my-6 border-line" />

              <ul className="space-y-3 text-sm text-text">
                {p.includes && <li className="font-semibold text-ink">{p.includes}</li>}
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-center text-sm text-muted">{FOOTNOTE[service]}</p>
    </div>
  );
}
