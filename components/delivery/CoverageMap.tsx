import { coverageNote, districts, type District } from "@/data/coverage";
import { Reveal } from "@/components/Reveal";

/**
 * Улаанбаатарын 9 дүүргийн ОЙРОЛЦОО схем (газрын зураг биш).
 * Хэлбэрүүд энд, хүргэлтийн бүс (zone) data/coverage.ts-д.
 */
const SHAPES: Record<string, { pts: [number, number][]; label?: [number, number] }> = {
  shd: { pts: [[40, 120], [150, 66], [222, 84], [226, 172], [188, 214], [98, 228], [40, 192]] },
  chd: { pts: [[232, 82], [276, 44], [316, 58], [314, 138], [234, 150]] },
  sbd: { pts: [[322, 58], [372, 36], [414, 62], [410, 140], [320, 138]] },
  bzd: { pts: [[420, 62], [506, 72], [566, 122], [550, 202], [474, 216], [416, 188], [416, 146]] },
  bgd: { pts: [[232, 158], [314, 146], [322, 200], [270, 226], [196, 220]] },
  hud: { pts: [[196, 228], [272, 234], [328, 208], [410, 194], [468, 224], [432, 302], [302, 322], [214, 290]], label: [322, 268] },
  nld: { pts: [[618, 176], [668, 168], [684, 214], [632, 228]] },
  bnd: { pts: [[712, 70], [752, 62], [764, 102], [722, 110]] },
  bhd: { pts: [[52, 286], [100, 278], [110, 322], [60, 330]] },
};

const LINKS: [string, string][] = [
  ["bzd", "nld"],
  ["bzd", "bnd"],
  ["shd", "bhd"],
];

function centroid(pts: [number, number][]): [number, number] {
  const n = pts.length;
  return [pts.reduce((a, p) => a + p[0], 0) / n, pts.reduce((a, p) => a + p[1], 0) / n];
}

function Shape({ d }: { d: District }) {
  const s = SHAPES[d.id];
  if (!s) return null;
  const [cx, cy] = s.label ?? centroid(s.pts);
  const on = d.zone === "standard";
  const small = d.zone === "negotiable";
  return (
    <g>
      <polygon
        points={s.pts.map((p) => p.join(",")).join(" ")}
        fill={on ? "#FF6B2C" : "#1E2A44"}
        fillOpacity={on ? 0.85 : 1}
        stroke={on ? "#0B1220" : "#9AA5B8"}
        strokeOpacity={on ? 1 : 0.5}
        strokeWidth={on ? 4 : 1.5}
        strokeDasharray={on ? undefined : "5 4"}
        strokeLinejoin="round"
      />
      <text
        x={cx}
        y={small ? Math.max(...s.pts.map((p) => p[1])) + 20 : cy + 4}
        textAnchor="middle"
        fontSize={small ? 13 : 14}
        fontWeight={on ? 700 : 500}
        fill={on ? "#0B1220" : "#9AA5B8"}
      >
        {d.name}
      </text>
    </g>
  );
}

export function CoverageMap() {
  const standard = districts.filter((d) => d.zone === "standard");
  const negotiable = districts.filter((d) => d.zone === "negotiable");
  return (
    <section aria-labelledby="coverage-title" className="mt-16 bg-card py-16 sm:mt-24 sm:py-20">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-14">
        <Reveal>
          <p className="eyebrow">Хамрах хүрээ</p>
          <h2 id="coverage-title" className="mt-3 text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
            Хаана хүргэдэг вэ?
          </h2>
          <ul className="mt-8 space-y-4 text-[15px]">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-4 w-4 shrink-0 rounded bg-accent" aria-hidden="true" />
              <span>
                <span className="font-semibold">{coverageNote.standard}</span>
                <span className="mt-0.5 block text-sm text-muted">{standard.map((d) => d.name).join(", ")}</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-4 w-4 shrink-0 rounded border border-dashed border-muted/70 bg-[#1E2A44]" aria-hidden="true" />
              <span>
                <span className="font-semibold">{coverageNote.negotiable}</span>
                <span className="mt-0.5 block text-sm text-muted">Хуваарь, үнийг урьдчилан тохиролцоно.</span>
              </span>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.06} className="min-w-0">
          <figure className="rounded-2xl border border-line bg-bg p-3 sm:p-5">
            <svg
              viewBox="20 20 760 330"
              className="h-auto w-full"
              role="img"
              aria-label={`Улаанбаатарын дүүргүүдийн схем. Ердийн хүргэлттэй: ${standard.map((d) => d.name).join(", ")}. Тохиролцоно: ${negotiable.map((d) => d.name).join(", ")}.`}
              fontFamily="var(--font-inter), system-ui, sans-serif"
            >
              {LINKS.map(([a, b]) => {
                const pa = SHAPES[a];
                const pb = SHAPES[b];
                if (!pa || !pb) return null;
                const [x1, y1] = centroid(pa.pts);
                const [x2, y2] = centroid(pb.pts);
                return <line key={a + b} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9AA5B8" strokeOpacity=".35" strokeDasharray="3 6" />;
              })}
              {[...negotiable, ...standard].map((d) => (
                <Shape key={d.id} d={d} />
              ))}
            </svg>
            <figcaption className="mt-2 text-center text-[11px] text-muted">Ойролцоо схем — бодит хил хязгаар биш</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
