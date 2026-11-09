import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { demoWork, liveWork, type WorkItem } from "@/data/work";

/**
 * /services/web — жишээ ажлууд 2 хэсэгт:
 *  #live — ажиллаж буй сайтууд (data/work.ts kind: "live")
 *  #demo — бэлэн демо загварууд (kind: "demo"), өөр дэвсгэр дээр
 * Хэсэг бүрийн картууд scroll-д орж ирэхэд тус тусдаа stagger-аар гарна.
 */
export function WorkGrid() {
  return (
    <>
      <section id="live" aria-labelledby="live-title" className="container-page mt-16 scroll-mt-24 sm:mt-24">
        <Reveal className="max-w-2xl">
          <h2 id="live-title" className="text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
            Ажиллаж байгаа сайтууд
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">Бодит харилцагчид, бодит захиалга өдөр бүр.</p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {liveWork.map((w) => (
            <Reveal key={w.slug} className="min-w-0">
              <WorkCard w={w} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="demo" aria-labelledby="demo-title" className="mt-16 scroll-mt-16 border-y border-line bg-surface py-14 sm:mt-24 sm:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <h2 id="demo-title" className="text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
              Демо хувилбарууд
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              Өөрийн брэнд, бараагаар шууд тохируулж өгөх бэлэн загварууд — захиалга бодитоор биелэхгүй.
            </p>
          </Reveal>
          <div className={`mt-10 grid gap-5 md:grid-cols-2 ${demoWork.length >= 3 ? "lg:grid-cols-3" : ""}`}>
            {demoWork.map((w) => (
              <Reveal key={w.slug} className="min-w-0">
                <WorkCard w={w} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" demo />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link href="/order?service=web" className="btn-primary">
              Энэ загвараар захиалах →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function StatusBadge({ status }: { status: NonNullable<WorkItem["status"]> }) {
  const live = status === "live";
  return (
    <span className={`tag ${live ? "border-ink text-ink" : "border-line text-muted"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-accent" : "bg-muted"}`} aria-hidden="true" />
      {live ? "Ажиллаж байна" : "Нээлтэд бэлтгэж байна"}
    </span>
  );
}

function WorkCard({ w, sizes, demo = false }: { w: WorkItem; sizes: string; demo?: boolean }) {
  return (
    <article className={`card flex h-full flex-col overflow-hidden ${demo ? "bg-bg" : ""}`}>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg">
        <Image
          src={w.image}
          alt={`${w.name} — дэлгэцийн зураг`}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {demo ? <span className="tag border-ink text-ink">Демо</span> : <span className="tag border-line text-muted">{w.tag}</span>}
          {w.status && <StatusBadge status={w.status} />}
        </div>
        <h3 className="mt-3 text-lg font-bold">{w.name}</h3>
        <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-muted">{w.summary}</p>
        {w.url && (
          <a
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 self-start text-sm link"
            aria-label={`${w.name} — шинэ табд нээх`}
          >
            Үзэх <span aria-hidden="true">↗</span>
          </a>
        )}
        {w.note && <p className="mt-2 text-xs text-muted">{w.note}</p>}
      </div>
    </article>
  );
}
