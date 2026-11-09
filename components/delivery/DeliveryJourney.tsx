import { Reveal } from "@/components/Reveal";

/** "Нэг захиалгын аялал" — desktop-д хэвтээ, mobile-д босоо timeline */

const ic = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const steps: { title: string; text: React.ReactNode; who: string; icon: React.ReactNode }[] = [
  {
    title: "Харилцагч төлнө",
    text: "QPay, дансаар — танд шууд.",
    who: "Харилцагч",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <rect x="9" y="3" width="14" height="26" rx="3" {...ic} />
        <path d="m12.5 16 2.5 2.5 4.5-5" {...ic} />
      </svg>
    ),
  },
  {
    title: "Та системд оруулна",
    text: "Ochir системээр эсвэл чатаар илгээнэ.",
    who: "Та",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <rect x="4" y="6" width="24" height="16" rx="2" {...ic} />
        <path d="M2 26h28M9 11h9M9 15h14" {...ic} />
      </svg>
    ),
  },
  {
    title: "Хүргэгч авна",
    text: (
      <>
        Plus: дэлгүүрээс тань
        <br />
        Pro: манай агуулахаас
      </>
    ),
    who: "Ochir",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <path d="M5 11 16 5l11 6v12l-11 6-11-6z" {...ic} />
        <path d="M5 11l11 6 11-6M16 17v12" {...ic} />
      </svg>
    ),
  },
  {
    title: "Хүргэнэ, статус шинэчилнэ",
    text: "Замд → Хүргэгдсэн, Ochir системд шууд.",
    who: "Ochir",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <circle cx="8" cy="23" r="4" {...ic} />
        <circle cx="25" cy="23" r="4" {...ic} />
        <path d="M8 23h8l4-8h-5M20 15l5 8M22 10h4" {...ic} />
        <rect x="3" y="8" width="8" height="7" rx="1" {...ic} />
      </svg>
    ),
  },
  {
    title: "Тайланд орно",
    text: "Өдөр эсвэл 7 хоногоор нэгтгэнэ.",
    who: "Та",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <path d="M5 27V5M5 27h22" {...ic} />
        <path d="M11 22v-6M17 22V11M23 22v-9" {...ic} strokeWidth={3} />
      </svg>
    ),
  },
];

export function DeliveryJourney() {
  return (
    <section aria-labelledby="journey-title" className="container-page mt-16 sm:mt-24">
      <Reveal className="max-w-2xl">
        <h2 id="journey-title" className="text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
          Нэг захиалгын аялал
        </h2>
      </Reveal>

      <ol className="relative mt-12 grid gap-8 md:grid-cols-5 md:gap-4">
        {/* холбох шугам */}
        <span className="absolute bottom-6 left-7 top-6 w-px bg-line md:bottom-auto md:left-[10%] md:right-[10%] md:top-7 md:h-px md:w-auto" aria-hidden="true" />
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} className="relative flex gap-5 md:flex-col md:items-center md:gap-4 md:text-center">
            <span
              className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-xl border ${
                "border-line bg-surface text-ink"
              }`}
            >
              {s.icon}
              <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-bg text-[11px] font-bold text-ink ring-1 ring-line">{i + 1}</span>
            </span>
            <span className="pt-1 md:pt-0">
              <span className="block text-[15px] font-bold leading-snug">{s.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{s.text}</span>
              <span className="mt-2 inline-block rounded-full border border-line px-2 py-0.5 text-[11px] text-muted">{s.who}</span>
            </span>
          </Reveal>
        ))}
      </ol>

      <p className="mt-10 flex items-start gap-2 text-sm text-muted">
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-ink" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M8 7v4M8 4.8v.2" strokeLinecap="round" />
        </svg>
        Бид бэлэн мөнгө цуглуулдаггүй — төлбөр таны болон харилцагчийн хооронд шууд явагдана.
      </p>
    </section>
  );
}
