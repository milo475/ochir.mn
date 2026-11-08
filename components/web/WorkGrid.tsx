import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { work } from "@/data/work";

/** "Жишээ ажлууд" — data/work.ts. url байхгүй үед "Удахгүй" гэж харагдана. */
export function WorkGrid() {
  return (
    <section aria-labelledby="work-title" className="container-page mt-16 sm:mt-24">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Жишээ ажлууд</p>
        <h2 id="work-title" className="mt-3 text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
          Бидний хийдэг сайтууд
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {work.map((w, i) => (
          <Reveal key={w.slug} delay={(i % 2) * 0.06} className="min-w-0">
            <article className="card group flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg">
                <Image
                  src={w.image}
                  alt={`${w.name} — дэлгэцийн зураг`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-bg/85 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur">{w.kind}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold">{w.name}</h3>
                <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-muted">{w.summary}</p>
                {w.url ? (
                  <a href={w.url} target="_blank" rel="noopener noreferrer" className="group/l mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-accent">
                    Үзэх
                    <span className="transition-transform group-hover/l:translate-x-1" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : (
                  <span className="mt-4 self-start rounded-full border border-line px-2.5 py-1 text-xs text-muted">Үзэх · удахгүй</span>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
