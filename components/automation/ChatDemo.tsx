"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Интерактив чатбот демо — бүх хариулт бэлэн (client-side, API-гүй).
 * Бодит бот таны барааны мэдээлэл, нөхцөлөөр хариулна.
 */
type Msg = { id: number; from: "user" | "bot" | "order"; text: string };

const QUICK: { key: string; label: string; user: string; bot: string; order?: string }[] = [
  {
    key: "stock",
    label: "Энэ бараа байгаа юу?",
    user: "Энэ бараа байгаа юу?",
    bot: "Байгаа! Хар, цагаан өнгөөр M, L размер үлдсэн — 45,000₮ 🙂",
  },
  {
    key: "delivery",
    label: "Хүргэлт хэд вэ?",
    user: "Хүргэлт хэд вэ?",
    bot: "Хот дотор 5,000₮. 18:00-с өмнө захиалбал маргааш хүргэнэ 🛵",
  },
  {
    key: "address",
    label: "Хаягаа өгье",
    user: "Хаягаа өгье: БЗД, 3-р хороо, 15-р байр, 99112233",
    bot: "Баярлалаа! Хар цамц, M размер — захиалгыг тань бүртгэлээ.",
    order: "#1053",
  },
  {
    key: "hours",
    label: "Ажлын цаг?",
    user: "Ажлын цаг хэд вэ?",
    bot: "Чат 24/7 нээлттэй 🌙 Дэлгүүр өдөр бүр 10:00–20:00.",
  },
];

const INITIAL: Msg[] = [
  { id: 1, from: "user", text: "Энэ цамц M размер байгаа юу?" },
  { id: 2, from: "bot", text: "Сайн байна уу! Байгаа 🙌 Доорх асуултуудаас сонгоод туршаад үзээрэй." },
];

export function ChatDemo() {
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL);
  const [typing, setTyping] = useState(false);
  const [used, setUsed] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>();
  const nextId = useRef(10);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const ask = (q: (typeof QUICK)[number]) => {
    if (typing) return;
    setUsed((u) => (u.includes(q.key) ? u : [...u, q.key]));
    setMsgs((m) => [...m, { id: nextId.current++, from: "user", text: q.user }]);
    setTyping(true);
    timer.current = window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [
        ...m,
        { id: nextId.current++, from: "bot", text: q.bot },
        ...(q.order ? [{ id: nextId.current++, from: "order" as const, text: q.order }] : []),
      ]);
    }, 1000);
  };

  const reset = () => {
    window.clearTimeout(timer.current);
    setTyping(false);
    setUsed([]);
    setMsgs(INITIAL);
  };

  return (
    <div className="mx-auto w-full max-w-[460px]">
      <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
        {/* толгой */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-accent text-sm font-black text-bg" aria-hidden="true">
            Д
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-[#3DDC84]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight">Таны дэлгүүр</p>
            <p className="text-xs text-muted">Messenger · автомат хариулт идэвхтэй</p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
            </svg>
            02:14
          </span>
        </div>

        {/* мессежүүд */}
        <div ref={listRef} className="h-[320px] space-y-2.5 overflow-y-auto px-4 py-5 sm:h-[340px]" aria-live="polite" aria-label="Чатын мессежүүд">
          {msgs.map((m) =>
            m.from === "order" ? (
              <div key={m.id} className="flex justify-end">
                <div className="animate-[pop_.35s_ease-out] rounded-2xl border border-accent/50 bg-accent/10 px-4 py-3 text-sm">
                  <p className="font-bold text-accent">✓ Захиалга бүртгэгдлээ · {m.text}</p>
                  <p className="mt-0.5 text-xs text-muted">Google Sheets → Хүргэлт рүү дамжлаа</p>
                </div>
              </div>
            ) : m.from === "user" ? (
              <div key={m.id} className="flex">
                <span className="max-w-[82%] rounded-2xl rounded-bl-md bg-line px-3.5 py-2 text-[15px] leading-snug">{m.text}</span>
              </div>
            ) : (
              <div key={m.id} className="flex flex-col items-end gap-1">
                <span className="max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-[15px] font-medium leading-snug text-bg">{m.text}</span>
                <span className="text-[10px] text-muted">Автомат хариулт</span>
              </div>
            ),
          )}
          {typing && (
            <div className="flex justify-end">
              <span className="flex items-center gap-1 rounded-2xl rounded-br-md bg-accent/15 px-4 py-3" role="status" aria-label="Бот бичиж байна…">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent [animation-delay:150ms]" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent [animation-delay:300ms]" />
              </span>
            </div>
          )}
        </div>

        {/* бэлэн асуултууд */}
        <div className="border-t border-line p-3">
          <p className="px-1 pb-2 text-xs text-muted">Харилцагчийн оронд асуугаад үзээрэй:</p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK.map((q) => (
              <button
                key={q.key}
                type="button"
                onClick={() => ask(q)}
                disabled={typing}
                className={`min-h-[44px] rounded-xl border px-3 text-left text-[13px] font-medium transition-colors disabled:opacity-50 sm:text-sm ${
                  used.includes(q.key) ? "border-line text-muted" : "border-accent/50 text-ink hover:bg-accent/10"
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 px-1 text-xs text-muted">
        <span>Жишээ демо — бодит бот таны бараа, нөхцөлөөр хариулна.</span>
        {msgs.length > INITIAL.length && (
          <button type="button" onClick={reset} className="shrink-0 font-semibold text-accent hover:underline">
            Дахин эхлэх
          </button>
        )}
      </div>
    </div>
  );
}
