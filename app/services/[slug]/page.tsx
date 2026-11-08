import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, packagesFor, serviceSlugs, services } from "@/data/packages";
import { PackageCard } from "@/components/services/PackageCard";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Cta } from "@/components/home/Cta";
import { TrialOffer } from "@/components/TrialOffer";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  const title = s.slug === "delivery" ? "Хүргэлтийн үйлчилгээ" : s.title;
  return {
    title,
    description: s.seoDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${title} | Ochir`, description: s.seoDescription, url: `/services/${s.slug}` },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();
  const pkgs = packagesFor(service.slug);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" aria-hidden="true" />
        <div className="container-page relative py-12 sm:py-20">
          <nav aria-label="Замын хэлхээ" className="text-sm text-muted">
            <Link href="/" className="hover:text-ink">Нүүр</Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{service.title}</span>
          </nav>
          <Reveal className="mt-6 max-w-3xl">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent">
              <ServiceIcon slug={service.slug} className="h-7 w-7" />
            </span>
            <h1 className="mt-6 text-[32px] font-extrabold leading-tight tracking-tight sm:text-5xl">{service.title}</h1>
            <p className="mt-5 text-[16px] leading-relaxed text-muted sm:text-lg">{service.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/order?service=${service.slug}`} className="btn-primary">Захиалга өгөх</Link>
              <a href="#packages" className="btn-ghost">Багцууд харах</a>
            </div>
          </Reveal>
        </div>
      </section>

      {service.slug === "delivery" && <TrialOffer className="pt-10" />}

      <section className="container-page py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {service.benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} className="card p-6">
              <h2 className="text-base font-semibold">{b.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="packages" className="container-page scroll-mt-20 py-8 sm:py-16">
        <SectionTitle eyebrow="Үнийн багц" title={`${service.title} — багцууд`} text="Үнийн санал авахын тулд багцаа сонгоод захиалга илгээнэ үү." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pkgs.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <SectionTitle eyebrow="Явц" title={service.stepsTitle ?? "Хэрхэн хэрэгжүүлэх вэ"} />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.steps.map((st, i) => (
            <Reveal as="li" key={st} delay={i * 0.06} className="card p-5">
              <span className="text-sm font-bold text-accent">0{i + 1}</span>
              <p className="mt-2 text-[15px] font-medium leading-snug">{st}</p>
            </Reveal>
          ))}
        </ol>
        {service.stepsNote && (
          <p className="mt-5 flex items-start gap-2 text-sm text-muted">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" />
              <path d="M8 7v4M8 4.8v.2" strokeLinecap="round" />
            </svg>
            {service.stepsNote}
          </p>
        )}
      </section>

      <section className="container-page py-8">
        <h2 className="text-lg font-semibold">Бусад үйлчилгээ</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/services/${o.slug}`} className="card tilt flex items-center gap-4 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent">
                <ServiceIcon slug={o.slug} className="h-5 w-5" />
              </span>
              <span className="font-semibold">{o.title}</span>
              <span className="ml-auto text-accent" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <Cta title={`${service.title} — үнийн санал аваарай`} />
    </>
  );
}
