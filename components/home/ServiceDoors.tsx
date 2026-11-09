import Link from "next/link";
import type { ServiceSlug } from "@/data/packages";
import { Reveal } from "@/components/Reveal";

/** Нүүрний "3 хаалга" — дэлгэрэнгүйг тус тусын хуудас руу */
const doors: { slug: ServiceSlug; label: string; situation: string; text: string; link: string }[] = [
  {
    slug: "delivery",
    label: "Хүргэлт",
    situation: "Өдөрт 15+ захиалгатай, хүргэлтийн жолоочгүй бол",
    text: "Төлбөр нь баталгаажсан захиалгыг тань бид өдөртөө хүргэнэ — барааг дэлгүүрээс тань авна, эсвэл манай агуулахаас шууд гаргана.",
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
        <h2 id="services-title" className="text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
          Танд аль нь хэрэгтэй вэ?
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {doors.map((d) => (
          <Reveal key={d.slug} className="min-w-0">
            <Link href={`/services/${d.slug}`} className="card card-hover flex h-full flex-col p-6">
              <span className="text-sm text-muted">{d.label}</span>
              <span className="mt-2 text-xl font-bold leading-snug tracking-tight text-ink">{d.situation}</span>
              <span className="mt-3 flex-1 text-[15px] leading-relaxed">{d.text}</span>
              <span className="mt-6 self-start text-sm link">
                {d.link} →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
