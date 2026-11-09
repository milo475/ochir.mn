import { Reveal } from "@/components/Reveal";

/** "Өдөр бүр ийм байдаг уу?" — Instagram DM маягийн чат дүрслэл */

const incoming = [
  { text: "Байна уу, захиалга өгье", time: "14:02" },
  { text: "Хэзээ хүргэх вэ?", time: "14:26" },
  { text: "Хаана байна одоо?", time: "15:47" },
];

const checks = [
  { text: "Хүргэлтийг бид", strong: false },
  { text: "Чатын хариултыг робот", strong: false },
  { text: "Та зөвхөн зарна", strong: true },
];

export function Familiar() {
  return (
    <section aria-labelledby="familiar-title" className="container-page mt-16 sm:mt-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <h2 id="familiar-title" className="text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
            Өдөр бүр ийм байдаг уу?
          </h2>

          {/* Чат цонх */}
          <Reveal className="card mt-8 max-w-md overflow-hidden">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-bg text-sm font-bold text-ink" aria-hidden="true">
                С
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight text-ink">Сараа</p>
                <p className="text-xs text-muted">Instagram · Direct</p>
              </div>
              <span className="tag border-ink text-ink">30 уншаагүй</span>
            </div>

            <ul className="space-y-2.5 px-4 py-5" aria-label="Харилцагчийн мессежүүд">
              {incoming.map((msg) => (
                <li key={msg.text} className="flex items-end gap-2">
                  <span className="max-w-[80%] rounded-xl rounded-bl-md bg-bg px-3.5 py-2 text-[15px] leading-snug">{msg.text}</span>
                  <span className="pb-1 text-[10px] text-muted">{msg.time}</span>
                </li>
              ))}
              <li className="flex flex-col items-end gap-1 pt-1">
                <span className="flex items-center gap-1 rounded-xl rounded-br-md border border-line px-4 py-3" role="img" aria-label="Та бичиж байна…">
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent [animation-delay:150ms]" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent [animation-delay:300ms]" />
                </span>
                <span className="text-[10px] text-muted">Та бичиж байна…</span>
              </li>
            </ul>
          </Reveal>

          <p className="mt-6 max-w-md text-[17px] leading-relaxed">
            Нэг гараараа бараа багцалж, нөгөө гараараа 30 чатад хариулж, хүргэлтээ өөрөө гүйж байна уу?
          </p>
        </div>

        <div className="lg:pl-10">
          <p className="text-[26px] font-bold leading-tight tracking-tight text-ink sm:text-[34px]">Бид тэр 3 ажлын хоёрыг нь авна.</p>
          <ul className="mt-8 space-y-4">
            {checks.map((c) => (
              <li key={c.text} className="flex items-center gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-ink" aria-hidden="true">
                  <svg viewBox="0 0 16 16" className="h-4 w-4">
                    <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={`text-lg ${c.strong ? "font-bold text-ink" : ""}`}>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
