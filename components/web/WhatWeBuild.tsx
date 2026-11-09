import { Reveal } from "@/components/Reveal";
import { ShopMock } from "@/components/visuals/ShopMock";

/** "Юу хийж өгдөг вэ" — 3 төрөл тус бүрт юу багтдаг */
const kinds: { name: string; time: string; lead: string; items: string[] }[] = [
  {
    name: "Landing",
    time: "3 ажлын өдөр",
    lead: "Бизнесээ танилцуулж, Messenger руу хөтлөх нэг хуудас.",
    items: ["Домэйн (.mn эсвэл .com)", "Хостинг, SSL", "Гар утсанд тохирсон загвар", "Messenger, утасны товч", "Google-д харагдах SEO тохиргоо"],
  },
  {
    name: "Онлайн дэлгүүр",
    time: "2–3 долоо хоног",
    lead: "Бараагаа зарж, төлбөрөө шууд авна.",
    items: ["Барааны каталог, сагс", "QPay төлбөрийн холболт", "Админ самбар", "Захиалгын SMS мэдэгдэл", "Борлуулалтын тайлан", "Хүргэлттэй холболт"],
  },
  {
    name: "Дотоод систем",
    time: "Хэрэгцээгээр",
    lead: "Excel, дэвтрийн оронд нэг систем.",
    items: ["Захиалгын бүртгэл", "Агуулахын үлдэгдэл", "Ажилтны эрх, дүр", "Өдөр, 7 хоногийн тайлан", "Google Sheets / QPay холболт"],
  },
];

export function WhatWeBuild() {
  return (
    <section aria-labelledby="build-title" className="mt-16 sm:mt-24">
      <div className="container-page">
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <h2 id="build-title" className="text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
              3 төрөл — юу нь багтдаг вэ?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              Нэмэлт төлбөргүйгээр багтдаг зүйлсийг жагсаав. Үүнээс гадна хэрэгтэй зүйлээ хэлбэл тооцоолж өгнө.
            </p>
          </Reveal>
          <Reveal className="card min-w-0 p-5">
            <ShopMock />
          </Reveal>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {kinds.map((k) => (
            <Reveal key={k.name} className="card min-w-0 p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xl font-bold">{k.name}</h3>
                <span className="whitespace-nowrap text-xs text-muted">{k.time}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{k.lead}</p>
              <ul className="mt-5 space-y-2.5 text-[15px]">
                {k.items.map((it) => (
                  <li key={it} className="flex gap-2.5">
                    <svg className="mt-1 h-4 w-4 shrink-0 text-accent" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
