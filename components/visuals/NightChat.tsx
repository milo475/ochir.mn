/** Шөнийн 02:14-ийн автомат хариултын дүрслэл */
export function NightChat() {
  return (
    <div aria-hidden="true">
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink" fill="currentColor">
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
          </svg>
          Messenger
        </span>
        <span className="font-semibold text-ink">02:14</span>
      </div>
      <div className="mt-4 space-y-2.5">
        <div className="flex">
          <span className="max-w-[80%] rounded-2xl rounded-bl-md bg-line px-3.5 py-2 text-sm">Энэ цамц M размер байгаа юу?</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-sm font-medium text-bg">
            Байгаа! 45,000₮. Хаягаа бичвэл захиалгыг тань бүртгэе 🙌
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Автомат хариулт · 3 секундэд
          </span>
        </div>
        <div className="flex">
          <span className="max-w-[80%] rounded-2xl rounded-bl-md bg-line px-3.5 py-2 text-sm">БЗД, 3-р хороо, 15-р байр</span>
        </div>
        <div className="flex justify-end">
          <span className="rounded-xl border border-accent/40 px-3 py-1.5 text-[11px] font-semibold text-accent">✓ Захиалга бүртгэгдлээ</span>
        </div>
      </div>
    </div>
  );
}
