import { Reveal } from "@/components/Reveal";

/** "Робот юу хийж, юу хийдэггүй вэ" — шударга жагсаалт */
const does = ["Барааны асуултад хариулна (размер, өнгө, үлдэгдэл)", "Үнэ хэлнэ", "Хүргэлтийн нөхцөл тайлбарлана", "Захиалга бүртгэнэ (нэр, утас, хаяг)", "Ажлын цаг, хаяг хэлнэ"];
const doesnt = ["Хямдрал тохиролцохгүй", "Гомдол шийдэхгүй", "Мэдэхгүй зүйлээ таамаглахгүй", "Эдгээр үед шууд танд (хүн рүү) шилжүүлнэ"];

export function DoesDoesnt() {
  return (
    <section aria-labelledby="dd-title" className="mt-16 bg-card py-16 sm:mt-24 sm:py-20">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Шударгаар</p>
          <h2 id="dd-title" className="mt-3 text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
            Робот юу хийж, юу хийдэггүй вэ
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-accent/40 bg-bg p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-bg" aria-hidden="true">
                ✓
              </span>
              Хийдэг
            </h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {does.map((d) => (
                <li key={d} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06} className="rounded-2xl border border-line bg-bg p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-muted/50 text-muted" aria-hidden="true">
                ✕
              </span>
              Хийдэггүй
            </h3>
            <ul className="mt-5 space-y-3 text-[15px] text-ink/90">
              {doesnt.map((d, i) => (
                <li key={d} className={`flex gap-2.5 ${i === doesnt.length - 1 ? "font-semibold text-ink" : ""}`}>
                  <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${i === doesnt.length - 1 ? "bg-accent" : "bg-muted"}`} aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
