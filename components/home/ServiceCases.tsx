import Link from "next/link";
import type { ServiceSlug } from "@/data/packages";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";

/** Үйлчилгээ — 3 ижил карт биш, ээлжилсэн "хэрэг" (зураг / текст) */

const cases: { slug: ServiceSlug; label: string; situation: string; gets: [string, string] }[] = [
  {
    slug: "delivery",
    label: "Хүргэлт",
    situation: "Өдөрт 15 захиалгатай, 2 жолоочгүй бол",
    gets: ["Хот дотор өдөрт нь хүргэж, статус бүрийг шинэчилнэ", "Өдөр, долоо хоног бүр хүргэлтийн тайлан авна"],
  },
  {
    slug: "web",
    label: "Вэб сайт & систем",
    situation: "Instagram-аас гадуур ч захиалга авмаар бол",
    gets: ["QPay-тэй онлайн дэлгүүр эсвэл 3 хоногт landing", "Бараа, захиалгаа өөрөө удирдана"],
  },
  {
    slug: "automation",
    label: "AI автоматжуулалт",
    situation: "Шөнийн 2 цагт ч чатад хариулмаар бол",
    gets: ["FB/IG чатад 24/7 автомат хариулт", "Чатаас ирсэн захиалгыг автоматаар бүртгэнэ"],
  },
];

export function ServiceCases() {
  return (
    <section id="services" aria-labelledby="services-title" className="container-page mt-16 scroll-mt-24 sm:mt-24">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Үйлчилгээ</p>
        <h2 id="services-title" className="mt-3 text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
          Онлайн бизнест хэрэгтэй 3 үндсэн зүйл
        </h2>
      </Reveal>

      <div className="mt-12 space-y-14 sm:space-y-20">
        {cases.map((c, i) => (
          <div key={c.slug} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <Reveal className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="rounded-2xl border border-line bg-card p-5 sm:p-6">
                {c.slug === "delivery" && <WeeklyReport />}
                {c.slug === "web" && <ShopMock />}
                {c.slug === "automation" && <NightChat />}
              </div>
            </Reveal>
            <Reveal delay={0.08} className={i % 2 === 1 ? "md:order-1" : ""}>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                <ServiceIcon slug={c.slug} className="h-4 w-4" />
                {c.label}
              </p>
              <h3 className="mt-3 text-2xl font-bold leading-snug tracking-tight sm:text-[28px]">{c.situation}</h3>
              <ul className="mt-5 space-y-2.5 text-[15px] text-ink/90">
                {c.gets.map((g) => (
                  <li key={g} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {g}
                  </li>
                ))}
              </ul>
              <Link href={`/services/${c.slug}`} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Дэлгэрэнгүй
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --- Дүрслэлүүд (бүгд inline, брэндийн өнгө) --- */

const week = [
  { d: "Да", v: 12 },
  { d: "Мя", v: 15 },
  { d: "Лх", v: 9 },
  { d: "Пү", v: 18 },
  { d: "Ба", v: 22 },
  { d: "Бя", v: 26 },
  { d: "Ня", v: 14 },
];

function WeeklyReport() {
  const max = Math.max(...week.map((w) => w.v));
  const total = week.reduce((a, w) => a + w.v, 0);
  const W = 320;
  const H = 150;
  const bw = 28;
  const gap = (W - bw * week.length) / (week.length - 1);
  return (
    <figure>
      <figcaption className="flex items-start justify-between gap-3">
        <span>
          <span className="block text-sm font-semibold">7 хоногийн хүргэлт</span>
          <span className="mt-0.5 block text-2xl font-bold">{total}</span>
        </span>
        <span className="rounded-full border border-muted/40 px-2 py-0.5 text-[11px] text-muted">жишээ</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H + 22}`} className="mt-4 h-auto w-full" role="img" aria-label={`Жишээ: долоо хоногт ${total} хүргэлт, хамгийн их нь Бямба гарагт ${max}`}>
        {week.map((w, i) => {
          const h = (w.v / max) * (H - 18);
          const x = i * (bw + gap);
          return (
            <g key={w.d}>
              <rect x={x} y={H - h} width={bw} height={h} rx="5" fill="#FF6B2C" opacity={w.v === max ? 1 : 0.55} />
              <text x={x + bw / 2} y={H - h - 5} textAnchor="middle" fontSize="11" fill="#F5F7FA" fontWeight="600">
                {w.v}
              </text>
              <text x={x + bw / 2} y={H + 16} textAnchor="middle" fontSize="11" fill="#9AA5B8">
                {w.d}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function ShopMock() {
  return (
    <div aria-hidden="true">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 flex-1 truncate rounded-md bg-bg px-3 py-1 text-xs text-muted">таны-дэлгүүр.mn</span>
        <span className="relative ml-2 grid h-7 w-7 place-items-center rounded-md bg-bg text-ink">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4h2l2.4 11h11L21 8H6.2M9 20h.01M18 20h.01" />
          </svg>
          <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-accent text-[9px] font-bold text-bg">2</span>
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {["39,000₮", "52,000₮", "45,000₮"].map((p, i) => (
          <div key={p} className="rounded-xl bg-bg p-2">
            <div className={`aspect-square rounded-lg ${i === 1 ? "bg-accent/25" : "bg-line"}`} />
            <div className="mt-2 h-1.5 w-3/4 rounded-full bg-line" />
            <div className="mt-1.5 text-[11px] font-semibold">{p}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-bg px-3 py-2.5">
        <span className="text-xs text-muted">Нийт: 91,000₮</span>
        <span className="rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-bg">QPay-ээр төлөх</span>
      </div>
    </div>
  );
}

function NightChat() {
  return (
    <div aria-hidden="true">
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink" fill="currentColor">
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
          </svg>
          Messenger
        </span>
        <span className="font-semibold text-ink">02:14</span>
      </div>
      <div className="mt-4 space-y-2.5">
        <div className="flex">
          <span className="max-w-[80%] rounded-2xl rounded-bl-md bg-line px-3.5 py-2 text-sm">Энэ цамц M размер байгаа юу?</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-sm font-medium text-bg">
            Байгаа! 45,000₮. Хаягаа бичвэл захиалгыг тань бүртгэе 🙌
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Автомат хариулт · 3 секундэд
          </span>
        </div>
        <div className="flex">
          <span className="max-w-[80%] rounded-2xl rounded-bl-md bg-line px-3.5 py-2 text-sm">БЗД, 3-р хороо, 15-р байр</span>
        </div>
        <div className="flex justify-end">
          <span className="rounded-xl border border-accent/40 px-3 py-1.5 text-[11px] font-semibold text-accent">✓ Захиалга бүртгэгдлээ</span>
        </div>
      </div>
    </div>
  );
}
