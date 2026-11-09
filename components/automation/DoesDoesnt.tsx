import { Reveal } from "@/components/Reveal";

/** "Робот юу хийж, юу хийдэггүй вэ" — шударга жагсаалт */
const does = ["Барааны асуултад хариулна (размер, өнгө, үлдэгдэл)", "Үнэ хэлнэ", "Хүргэлтийн нөхцөл тайлбарлана", "Захиалга бүртгэнэ (нэр, утас, хаяг)", "Ажлын цаг, хаяг хэлнэ"];
const doesnt = ["Хямдрал тохиролцохгүй", "Гомдол шийдэхгүй", "Мэдэхгүй зүйлээ таамаглахгүй", "Эдгээр үед шууд танд (хүн рүү) шилжүүлнэ"];

export function DoesDoesnt() {
  return (
    <section aria-labelledby="dd-title" className="mt-16 sm:mt-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <h2 id="dd-title" className="text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
            Робот юу хийж, юу хийдэггүй вэ
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal className="card p-6 sm:p-8">
            <h3 className="text-lg font-bold">Хийдэг</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {does.map((d) => (
                <li key={d} className="flex gap-2.5">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-accent" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="card p-6 sm:p-8">
            <h3 className="text-lg font-bold">Хийдэггүй</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {doesnt.map((d, i) => (
                <li key={d} className={`flex gap-2.5 ${i === doesnt.length - 1 ? "font-semibold text-ink" : ""}`}>
                  <svg className="mt-1 h-4 w-4 shrink-0 text-tertiary" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="m4 4 8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
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
