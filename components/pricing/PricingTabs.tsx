"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  PRICE_PLACEHOLDER,
  compareRows,
  packagesFor,
  pickerQuestions,
  services,
  type CompareCell,
  type ServiceSlug,
} from "@/data/packages";
import { ServiceIcon } from "@/components/ServiceIcon";

const TAB_LABEL: Record<ServiceSlug, string> = { delivery: "Хүргэлт", web: "Вэб & систем", automation: "Автоматжуулалт" };

function Cell({ v }: { v: CompareCell }) {
  if (v === true)
    return (
      <svg className="mx-auto h-5 w-5 text-accent" viewBox="0 0 16 16" role="img" aria-label="Багтсан">
        <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (v === false)
    return (
      <span className="text-muted/60" role="img" aria-label="Багтаагүй">
        —
      </span>
    );
  return <span className="text-[13px] font-medium sm:text-sm">{v}</span>;
}

export function PricingTabs({ initial }: { initial: ServiceSlug }) {
  const [tab, setTab] = useState<ServiceSlug>(initial);
  const [answers, setAnswers] = useState<number[]>([]);
  const pkgs = packagesFor(tab);
  const rows = compareRows[tab];
  const questions = pickerQuestions[tab];

  const select = (t: ServiceSlug) => {
    setTab(t);
    setAnswers([]);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", t);
    window.history.replaceState(null, "", url);
  };

  // Сонгогчийн үр дүн: бүх асуултад хариулсны дараа хамгийн өндөр оноотой багц
  const pick = useMemo(() => {
    if (answers.length < questions.length) return null;
    const score: Record<string, number> = {};
    answers.forEach((a, qi) => {
      const opt = questions[qi]?.options[a];
      if (opt) for (const [id, n] of Object.entries(opt.scores)) score[id] = (score[id] ?? 0) + n;
    });
    let best = pkgs[0]?.id ?? null;
    for (const p of pkgs) if ((score[p.id] ?? 0) > (score[best ?? ""] ?? 0)) best = p.id;
    return best;
  }, [answers, questions, pkgs]);

  const answer = (qi: number, oi: number) => setAnswers((prev) => [...prev.slice(0, qi), oi]);
  const picked = pkgs.find((p) => p.id === pick);
  const colOn = (id: string, highlight?: boolean) => (pick ? id === pick : !!highlight);

  return (
    <>
      <div role="tablist" aria-label="Үйлчилгээ" className="mx-auto mt-8 flex w-full max-w-xl rounded-2xl border border-line bg-card p-1">
        {services.map((s) => {
          const on = s.slug === tab;
          return (
            <button
              key={s.slug}
              type="button"
              role="tab"
              id={`tab-${s.slug}`}
              aria-selected={on}
              aria-controls="pricing-panel"
              onClick={() => select(s.slug)}
              className={`flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl px-2 text-[13px] font-semibold transition-colors sm:text-sm ${
                on ? "bg-accent text-bg" : "text-muted hover:text-ink"
              }`}
            >
              <ServiceIcon slug={s.slug} className="hidden h-4 w-4 sm:block" />
              {TAB_LABEL[s.slug]}
            </button>
          );
        })}
      </div>

      <div id="pricing-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-10">
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[500px] border-separate border-spacing-0 text-left">
            <caption className="sr-only">{TAB_LABEL[tab]} — багцуудын харьцуулалт</caption>
            <thead>
              <tr>
                <th scope="col" className="sticky left-0 z-10 w-[34%] bg-bg pb-4 pr-2 align-bottom text-sm font-medium text-muted">
                  Боломж
                </th>
                {pkgs.map((p) => (
                  <th
                    key={p.id}
                    scope="col"
                    className={`rounded-t-2xl border-x border-t px-3 pb-4 pt-5 text-center align-bottom ${
                      colOn(p.id, p.highlight) ? "border-accent/50 bg-accent/[0.07]" : "border-transparent"
                    }`}
                  >
                    {colOn(p.id, p.highlight) && (
                      <span className="mb-2 inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-bg">
                        {pick ? "Танд тохирно" : "Санал болгох"}
                      </span>
                    )}
                    <span className="block text-base font-bold sm:text-lg">{p.name}</span>
                    <span className="mt-1 block text-[13px] font-semibold text-accent">{p.priceFrom ?? PRICE_PLACEHOLDER}</span>
                    {p.priceNote && <span className="mx-auto mt-1 block max-w-[16ch] text-[11px] font-normal leading-snug text-muted">{p.priceNote}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="sticky left-0 z-10 border-t border-line bg-bg py-3.5 pr-3 text-[13px] font-medium text-ink/90 sm:text-[15px]">
                    {r.label}
                  </th>
                  {r.values.map((v, i) => {
                    const p = pkgs[i];
                    return (
                      <td
                        key={i}
                        className={`border-t border-line px-3 py-3.5 text-center ${
                          p && colOn(p.id, p.highlight) ? "border-x border-x-accent/50 bg-accent/[0.07]" : ""
                        }`}
                      >
                        <Cell v={v} />
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="sticky left-0 z-10 bg-bg" />
                {pkgs.map((p) => (
                  <td
                    key={p.id}
                    className={`rounded-b-2xl px-3 pb-4 pt-3 text-center ${colOn(p.id, p.highlight) ? "border-x border-b border-accent/50 bg-accent/[0.07]" : ""}`}
                  >
                    <Link
                      href={`/order?service=${p.service}&package=${p.id}`}
                      className={`${colOn(p.id, p.highlight) ? "btn-primary" : "btn-ghost"} min-h-[44px] w-full px-3 text-[13px] sm:text-sm`}
                      aria-label={`${p.name} багцаар захиалах`}
                    >
                      Захиалах
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Аль нь надад тохирох вэ? */}
        <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-line bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Аль нь надад тохирох вэ?</h2>
          <p className="mt-1 text-sm text-muted">3 асуултад хариулбал хүснэгтэд тохирох багцыг тодруулна.</p>
          <ol className="mt-6 space-y-5">
            {questions.map((q, qi) =>
              qi <= answers.length ? (
                <li key={`${tab}-${qi}`}>
                  <p className="text-[15px] font-semibold">
                    <span className="mr-2 text-accent">{qi + 1}.</span>
                    {q.q}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label={q.q}>
                    {q.options.map((o, oi) => {
                      const on = answers[qi] === oi;
                      return (
                        <button
                          key={o.label}
                          type="button"
                          aria-pressed={on}
                          onClick={() => answer(qi, oi)}
                          className={`min-h-[44px] rounded-xl border px-4 text-sm transition-colors ${
                            on ? "border-accent bg-accent/15 font-semibold text-ink" : "border-line text-muted hover:border-muted hover:text-ink"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </li>
              ) : null,
            )}
          </ol>
          <div aria-live="polite">
            {picked && (
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-accent/40 bg-accent/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[15px]">
                  Танд <span className="font-bold text-accent">{picked.name}</span> багц тохирох байх — {picked.tagline.toLowerCase()}.
                </p>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => setAnswers([])} className="btn-ghost min-h-[44px] px-4 text-sm">
                    Дахин
                  </button>
                  <Link href={`/order?service=${picked.service}&package=${picked.id}`} className="btn-primary min-h-[44px] px-4 text-sm">
                    Захиалах
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
