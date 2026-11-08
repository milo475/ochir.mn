"use client";

import { m } from "framer-motion";

/** "Өдөр бүр ийм байдаг уу?" — Instagram DM маягийн чат дүрслэл */

const incoming = [
  { text: "Байна уу, захиалга өгье", time: "14:02" },
  { text: "Хэзээ хүргэх вэ?", time: "14:26" },
  { text: "Хаана байна одоо?", time: "15:47" },
];

const list = { hidden: {}, show: { transition: { staggerChildren: 0.3, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.2, 0.7, 0.2, 1] } },
};

const checks = [
  { text: "Хүргэлтийг бид", strong: false },
  { text: "Чатын хариултыг робот", strong: false },
  { text: "Та зөвхөн зарна", strong: true },
];

export function Familiar() {
  return (
    <section aria-labelledby="familiar-title" className="mt-12 bg-card sm:mt-16">
      <div className="container-page grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <h2 id="familiar-title" className="text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
            Өдөр бүр ийм байдаг уу?
          </h2>

          {/* Чат цонх */}
          <div className="mt-8 max-w-md overflow-hidden rounded-2xl border border-line bg-bg shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-line text-sm font-bold text-ink" aria-hidden="true">
                С
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">Сараа</p>
                <p className="text-xs text-muted">Instagram · Direct</p>
              </div>
              <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-bg">30 уншаагүй</span>
            </div>

            <m.ul
              className="space-y-2.5 px-4 py-5"
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              aria-label="Харилцагчийн мессежүүд"
            >
              {incoming.map((msg) => (
                <m.li key={msg.text} variants={item} className="flex items-end gap-2">
                  <span className="max-w-[80%] rounded-2xl rounded-bl-md bg-line px-3.5 py-2 text-[15px] leading-snug">{msg.text}</span>
                  <span className="pb-1 text-[10px] text-muted">{msg.time}</span>
                </m.li>
              ))}
              <m.li variants={item} className="flex flex-col items-end gap-1 pt-1">
                <span
                  className="flex items-center gap-1 rounded-2xl rounded-br-md bg-accent/15 px-4 py-3"
                  role="img"
                  aria-label="Та бичиж байна…"
                >
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent [animation-delay:150ms]" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent [animation-delay:300ms]" />
                </span>
                <span className="text-[10px] text-muted">Та бичиж байна…</span>
              </m.li>
            </m.ul>
          </div>

          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink/90">
            Нэг гараараа бараа багцалж, нөгөө гараараа 30 чатад хариулж, хүргэлтээ өөрөө гүйж байна уу?
          </p>
        </div>

        <div className="lg:pl-10">
          <p className="text-[26px] font-extrabold leading-tight tracking-tight sm:text-[34px]">
            Бид тэр 3 ажлын <span className="text-accent">хоёрыг нь</span> авна.
          </p>
          <ul className="mt-8 space-y-4">
            {checks.map((c) => (
              <li key={c.text} className="flex items-center gap-4">
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${c.strong ? "bg-accent text-bg" : "border border-accent/50 text-accent"}`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4">
                    <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={`text-lg ${c.strong ? "font-bold text-ink" : "text-ink/90"}`}>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
