import type { FaqItem } from "@/data/faq";

/** <details>-д суурилсан accordion — JS шаардахгүй */
export function FaqAccordion({ items, className = "" }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={`divide-y divide-line rounded-2xl border border-line bg-card ${className}`}>
      {items.map((item) => (
        <details key={item.q} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-semibold">
            {item.q}
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-300 group-open:rotate-45 group-open:border-accent group-open:text-accent"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="pb-5 text-[15px] leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
