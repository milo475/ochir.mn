import type { FaqItem } from "@/data/faq";

/** <details>-д суурилсан accordion — JS шаардахгүй */
export function FaqAccordion({ items, className = "" }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <details key={item.q} className="group rounded-xl border border-line bg-surface px-5 transition-colors open:bg-bg [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-semibold text-ink">
            {item.q}
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-300 group-open:rotate-45 group-open:border-ink group-open:text-ink"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="pb-5 text-[15px] leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
