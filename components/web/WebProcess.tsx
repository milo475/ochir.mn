import { Reveal } from "@/components/Reveal";

/** "Яаж хийдэг вэ" — 4 үе шат, шат бүрт "Та өгнө / Бид өгнө" */
const stages: { name: string; time: string; you: string; us: string }[] = [
  { name: "Ярилцлага", time: "1 өдөр", you: "Бизнес, хэрэгцээ, таалагддаг сайтуудаа хэлнэ", us: "Хуудасны бүтэц, хугацаа, үнийн санал" },
  { name: "Загвар", time: "2–3 өдөр", you: "Лого, зураг, текст; загварт санал", us: "Гар утас + компьютерийн загвар, 2 удаа засвар" },
  { name: "Хөгжүүлэлт", time: "Багцаас хамаарна", you: "Бараа, үнийн жагсаалт; QPay гэрээ", us: "Ажиллах сайт, туршилтын хаяг дээр явцаа харуулна" },
  { name: "Нээлт, сургалт", time: "1 өдөр", you: "Эцсийн шалгалт, зөвшөөрөл", us: "Домэйнд нээж, админ самбарын сургалт, заавар" },
];

export function WebProcess() {
  return (
    <section aria-labelledby="process-title" className="container-page mt-16 sm:mt-24">
      <Reveal className="max-w-2xl">
        <h2 id="process-title" className="text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
          4 үе шат — хэн юу өгөх вэ
        </h2>
      </Reveal>
      <ol className="mt-10 space-y-3">
        {stages.map((s, i) => (
          <Reveal as="li" key={s.name} className="card grid gap-4 p-5 sm:p-6 md:grid-cols-[220px_1fr_1fr] md:items-center md:gap-8">
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent text-lg font-bold text-accent-ink">{i + 1}</span>
              <span>
                <span className="block text-lg font-bold leading-tight">{s.name}</span>
                <span className="text-xs text-muted">{s.time}</span>
              </span>
            </div>
            <div className="border-line md:border-l md:pl-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Та өгнө</p>
              <p className="mt-1 text-[15px] leading-snug">{s.you}</p>
            </div>
            <div className="border-line md:border-l md:pl-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">Бид өгнө</p>
              <p className="mt-1 text-[15px] leading-snug">{s.us}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
