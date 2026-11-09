/** QPay-тэй онлайн дэлгүүрийн жижиг дүрслэл */
export function ShopMock() {
  return (
    <div aria-hidden="true">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 flex-1 truncate rounded-md bg-bg px-3 py-1 text-xs text-muted">таны-дэлгүүр.mn</span>
        <span className="relative ml-2 grid h-7 w-7 place-items-center rounded-md bg-bg text-ink">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4h2l2.4 11h11L21 8H6.2M9 20h.01M18 20h.01" />
          </svg>
          <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-accent text-[9px] font-bold text-accent-ink">2</span>
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {["39,000₮", "52,000₮", "45,000₮"].map((p, i) => (
          <div key={p} className="rounded-xl bg-bg p-2">
            <div className={`aspect-square rounded-lg ${i === 1 ? "bg-accent" : "bg-line"}`} />
            <div className="mt-2 h-1.5 w-3/4 rounded-full bg-line" />
            <div className="mt-1.5 text-[11px] font-semibold">{p}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-bg px-3 py-2.5">
        <span className="text-xs text-muted">Нийт: 91,000₮</span>
        <span className="rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-accent-ink">QPay-ээр төлөх</span>
      </div>
    </div>
  );
}
