import Link from "next/link";
import { Reveal } from "@/components/Reveal";

/** "Дараа нь юу болох вэ" — сарын хариуцлагын үйлчилгээ */
const items = [
  { t: "Хостинг, домэйн, SSL", d: "Сунгалт, нөөц хуулбар, аюулгүй байдлын шинэчлэлт" },
  { t: "Засвар", d: "Текст, зураг, үнэ солих — сард тогтсон цагийн хүрээнд" },
  { t: "Шинэчлэл", d: "Хурд, Google-ийн үзүүлэлт, жижиг шинэ боломжууд" },
  { t: "Хяналт", d: "Сайт унтарвал бид эхэлж мэдэж, засна" },
];

export function CareCard() {
  return (
    <section aria-labelledby="care-title" className="container-page mt-16 sm:mt-24">
      <Reveal className="relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/[0.12] via-card to-card p-6 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          <div>
            <p className="eyebrow">Дараа нь юу болох вэ</p>
            <h2 id="care-title" className="mt-3 text-[26px] font-bold leading-tight tracking-tight sm:text-[34px]">
              Нээсний дараа ч бид хариуцна
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
              Сарын хариуцлагын үйлчилгээ — сайт тань үргэлж ажиллаж, шинэ хэвээр байна. Та зөвхөн бизнестээ анхаарна.
            </p>
            <p className="mt-6 inline-flex items-baseline gap-2 rounded-xl bg-bg/60 px-4 py-2.5">
              <span className="text-sm text-muted">Сар бүр ·</span>
              <span className="font-semibold text-accent">Үнийн санал</span>
            </p>
            <div className="mt-6">
              <Link href="/order?service=web" className="btn-primary">
                Хариуцлагын үйлчилгээ асуух
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((it) => (
              <li key={it.t} className="rounded-2xl border border-line bg-bg/70 p-5">
                <p className="font-semibold">{it.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{it.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
