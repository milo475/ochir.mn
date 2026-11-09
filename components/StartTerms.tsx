import { Reveal } from "@/components/Reveal";

const TERMS = ["Урьдчилгаагүй", "Сарын төлбөргүй", "Зөвхөн хийгдсэн хүргэлтийн төлбөр", "Хэзээ ч зогсоож болно"];

/** Хүргэлтийн нөхцөл — товчгүй жижиг карт; desktop-д нэг мөр, mobile-д 2×2 */
export function StartTerms() {
  return (
    <section aria-label="Хүргэлтийн нөхцөл" className="container-page mt-16 sm:mt-24">
      <Reveal className="rounded-2xl border border-line bg-surface px-5 py-6 text-center sm:px-8">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-[15px] font-semibold leading-snug text-ink sm:flex sm:flex-wrap sm:justify-center sm:gap-y-2">
          {TERMS.map((t) => (
            <li key={t} className="sm:after:mx-3 sm:after:font-normal sm:after:text-muted sm:after:content-['·'] sm:last:after:content-none">
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted">Төлбөр нь баталгаажсан захиалгыг л хүргэнэ.</p>
      </Reveal>
    </section>
  );
}
