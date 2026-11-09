"use client";

import { useEffect, useMemo, useState } from "react";
import { faqCategories } from "@/data/faq";
import { FaqAccordion } from "@/components/FaqAccordion";

/** Монгол кирилл/латин жижиг үсгээр, илүү зайгүйгээр харьцуулна */
const norm = (s: string) => s.toLocaleLowerCase("mn").replace(/\s+/g, " ").trim();

export function FaqBrowser() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>(faqCategories[0]!.id);

  const filtered = useMemo(() => {
    const q = norm(query);
    if (!q) return faqCategories;
    return faqCategories.map((c) => ({ ...c, items: c.items.filter((it) => norm(it.q).includes(q)) })).filter((c) => c.items.length > 0);
  }, [query]);
  const total = filtered.reduce((n, c) => n + c.items.length, 0);

  // Scroll-spy: одоо харагдаж буй ангиллыг цэсэнд тодруулна
  useEffect(() => {
    const els = filtered.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-96px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filtered]);

  return (
    <>
      <div className="mx-auto mt-8 max-w-xl">
        <label htmlFor="faq-search" className="sr-only">
          Асуултаас хайх
        </label>
        <div className="relative">
          <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Жишээ нь: хүргэлт, домэйн, гэрээ…"
            className="field h-14 pl-12 text-[16px]"
            autoComplete="off"
          />
        </div>
        <p className="mt-2 text-center text-xs text-muted" aria-live="polite">
          {query ? `${total} асуулт олдлоо` : `Нийт ${total} асуулт`}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        <nav aria-label="Асуултын ангилал" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
            {faqCategories.map((c) => {
              const count = filtered.find((f) => f.id === c.id)?.items.length ?? 0;
              const on = active === c.id && count > 0;
              return (
                <li key={c.id} className="shrink-0">
                  <a
                    href={`#${c.id}`}
                    aria-current={on ? "true" : undefined}
                    className={`flex items-center justify-between gap-3 whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-sm transition-colors lg:border-0 lg:border-l-2 lg:rounded-none ${
                      on ? "border-ink bg-surface text-ink lg:border-accent" : "border-line text-muted hover:text-ink"
                    } ${count === 0 ? "pointer-events-none opacity-40" : ""}`}
                  >
                    {c.title}
                    <span className="text-xs text-muted">{count}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-0 space-y-12">
          {filtered.map((c) => (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-24">
              <h2 id={`${c.id}-title`} className="text-xl font-bold tracking-tight sm:text-2xl">
                {c.title}
              </h2>
              <FaqAccordion items={c.items} className="mt-4" />
            </section>
          ))}
          {filtered.length === 0 && (
            <p className="rounded-xl border border-dashed border-line p-8 text-center text-muted">
              &ldquo;{query}&rdquo; гэсэн асуулт олдсонгүй. Доорх товчоор бидэнд шууд бичээрэй.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
