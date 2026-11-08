import Link from "next/link";
import { services } from "@/data/packages";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceIcon } from "@/components/ServiceIcon";

export function ServicesOverview() {
  return (
    <section id="services" className="container-page scroll-mt-20 pb-16 pt-10 sm:pb-24 sm:pt-12">
      <SectionTitle
        eyebrow="Үйлчилгээ"
        title="Онлайн бизнест хэрэгтэй 3 үндсэн зүйл"
        text="Нэгийг нь ч, гурвыг нь ч хамт сонгож болно. Бүгд нэг багт, нэг гэрээнд."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.08}>
            <Link href={`/services/${s.slug}`} className="card tilt group flex h-full flex-col p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent">
                <ServiceIcon slug={s.slug} />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{s.short}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Дэлгэрэнгүй
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
