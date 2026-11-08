import { faq } from "@/data/faq";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";

export function Faq() {
  return (
    <section id="faq" className="container-page scroll-mt-20 py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <SectionTitle eyebrow="FAQ" title="Түгээмэл асуулт" text="Өөр асуулт байвал захиалгын маягтад бичээрэй — бид залгаж тайлбарлана." />
        <Reveal className="divide-y divide-line rounded-2xl border border-line bg-card">
          {faq.map((item) => (
            <details key={item.q} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-semibold">
                {item.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-300 group-open:rotate-45 group-open:border-accent group-open:text-accent" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="pb-5 text-[15px] leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
