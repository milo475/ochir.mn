import Link from "next/link";
import type { ServiceSlug } from "@/data/packages";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";

/** Нүүрний "3 хаалга" — дэлгэрэнгүйг тус тусын хуудас руу */
const doors: { slug: ServiceSlug; label: string; situation: string; text: string; link: string }[] = [
  {
    slug: "delivery",
    label: "Хүргэлт",
    situation: "Өдөрт 15 захиалгатай, 2 жолоочгүй бол",
    text: "Төлбөр нь баталгаажсан захиалгыг тань өдөрт нь хүргэж, тайлан өгнө.",
    link: "Хүргэлтийн хуудас",
  },
  {
    slug: "web",
    label: "Вэб & систем",
    situation: "Instagram-аас гадуур ч захиалга авмаар бол",
    text: "QPay-тэй онлайн дэлгүүр эсвэл 3 хоногт бэлэн landing хуудас.",
    link: "Вэб & системийн хуудас",
  },
  {
    slug: "automation",
    label: "AI автоматжуулалт",
    situation: "Шөнийн 2 цагт ч чатад хариулмаар бол",
    text: "FB/IG чатад 24/7 хариулж, захиалгыг автоматаар бүртгэнэ.",
    link: "Автоматжуулалтын хуудас",
  },
];

export function ServiceDoors() {
  return (
    <section id="services" aria-labelledby="services-title" className="container-page mt-16 scroll-mt-24 sm:mt-24">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Үйлчилгээ</p>
        <h2 id="services-title" className="mt-3 text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
          Танд аль нь хэрэгтэй вэ?
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {doors.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.06} className="min-w-0">
            <Link href={`/services/${d.slug}`} className="card tilt group flex h-full flex-col p-6">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                <ServiceIcon slug={d.slug} className="h-4 w-4" />
                {d.label}
              </span>
              <span className="mt-4 text-xl font-bold leading-snug tracking-tight">{d.situation}</span>
              <span className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{d.text}</span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
                {d.link}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
