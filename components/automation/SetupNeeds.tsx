import { Reveal } from "@/components/Reveal";

/** "Тохируулахад юу хэрэгтэй" — 3 зүйл */
const needs = [
  { n: "1", t: "FB хуудасны админ эрх", d: "Ботыг хуудастай тань холбоход. Хүссэн үедээ эрхийг хасаж болно." },
  { n: "2", t: "Барааны жагсаалт", d: "Нэр, үнэ, размер, өнгө — Excel, Sheets эсвэл зургаар ч болно." },
  { n: "20", t: "Түгээмэл асуулт-хариулт", d: "Харилцагчид хамгийн их асуудаг 20 орчим асуулт, таны хариулт." },
];

export function SetupNeeds() {
  return (
    <section aria-labelledby="setup-title" className="container-page mt-16 sm:mt-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
        <Reveal>
          <p className="eyebrow">Эхлэхэд</p>
          <h2 id="setup-title" className="mt-3 text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
            Тохируулахад юу хэрэгтэй вэ?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">Ердөө 3 зүйл. Үлдсэнийг — тохиргоо, туршилт, сургалтыг бид хийнэ.</p>
        </Reveal>
        <ol className="grid gap-3 sm:grid-cols-3">
          {needs.map((x, i) => (
            <Reveal as="li" key={x.t} delay={i * 0.06} className="card p-6">
              <span className="text-4xl font-black tracking-tight text-accent">{x.n}</span>
              <p className="mt-3 font-semibold leading-snug">{x.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{x.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
