/** 7 хоногийн хүргэлтийн жишээ bar chart (inline SVG) */
const week = [
  { d: "Да", v: 12 },
  { d: "Мя", v: 15 },
  { d: "Лх", v: 9 },
  { d: "Пү", v: 18 },
  { d: "Ба", v: 22 },
  { d: "Бя", v: 26 },
  { d: "Ня", v: 14 },
];

export function WeeklyReport() {
  const max = Math.max(...week.map((w) => w.v));
  const total = week.reduce((a, w) => a + w.v, 0);
  const W = 320;
  const H = 150;
  const bw = 28;
  const gap = (W - bw * week.length) / (week.length - 1);
  return (
    <figure>
      <figcaption className="flex items-start justify-between gap-3">
        <span>
          <span className="block text-sm font-semibold">7 хоногийн хүргэлт</span>
          <span className="mt-0.5 block text-2xl font-bold">{total}</span>
        </span>
        <span className="rounded-full border border-muted/40 px-2 py-0.5 text-[11px] text-muted">жишээ</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H + 22}`} className="mt-4 h-auto w-full" role="img" aria-label={`Жишээ: долоо хоногт ${total} хүргэлт, хамгийн их нь Бямба гарагт ${max}`}>
        {week.map((w, i) => {
          const h = (w.v / max) * (H - 18);
          const x = i * (bw + gap);
          return (
            <g key={w.d}>
              <rect x={x} y={H - h} width={bw} height={h} rx="5" fill="#FF6B2C" opacity={w.v === max ? 1 : 0.55} />
              <text x={x + bw / 2} y={H - h - 5} textAnchor="middle" fontSize="11" fill="#F5F7FA" fontWeight="600">
                {w.v}
              </text>
              <text x={x + bw / 2} y={H + 16} textAnchor="middle" fontSize="11" fill="#9AA5B8">
                {w.d}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
