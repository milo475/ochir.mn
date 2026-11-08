import type { Ref, RefObject } from "react";

/** Изометрик хотын дүрслэлийн нийтлэг хэсгүүд (IsometricCity / IsometricDelivery / IsometricStudio) */

/* ------------------------------------------------------------------ */
/* Изометрик проекц — 1200×560                                         */
/* ------------------------------------------------------------------ */
export const S = 25;
export const C = 0.8660254;
export const OX = 600;
export const OY = 4;
export const VB_W = 1200;
export const VB_H = 560;

type P3 = [number, number, number];

export function pr(x: number, y: number, z = 0): [number, number] {
  return [OX + (x - y) * C * S, OY + (x + y) * 0.5 * S - z * S];
}
export const f = (n: number) => Math.round(n * 10) / 10;
export function poly(pts: P3[]): string {
  return pts.map(([x, y, z]) => pr(x, y, z).map(f).join(",")).join(" ");
}
export function pathD(pts: [number, number, number?][], close = false): string {
  return pts.map(([x, y, z], i) => `${i ? "L" : "M"}${pr(x, y, z ?? 0).map(f).join(",")}`).join(" ") + (close ? " Z" : "");
}

export const COL = {
  sky: "#0B1220",
  ground: "#101A31",
  groundL: "#0D152A",
  groundR: "#0A1122",
  far: "#0D1529",
  road: "#172239",
  walk: "#1B2843",
  plaza: "#122039",
  top: "#26334F",
  left: "#1B2744",
  right: "#131D35",
  win: "#0E1628",
  lit: "#FFB088",
  litR: "#E8935F",
  accent: "#FF6B2C",
  accentDark: "#C2501F",
  text: "#F5F7FA",
  muted: "#9AA5B8",
  line: "#33415F",
};

/* ------------------------------------------------------------------ */
/* Үндсэн дүрсүүд                                                       */
/* ------------------------------------------------------------------ */
interface BoxProps {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  top?: string;
  left?: string;
  right?: string;
}
export function Box({ x, y, z = 0, w, d, h, top = COL.top, left = COL.left, right = COL.right }: BoxProps) {
  return (
    <g>
      <polygon points={poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={left} />
      <polygon points={poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} fill={right} />
      <polygon points={poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={top} />
    </g>
  );
}

/** Барилга + цонх (детерминист гэрэл) */
export function Building({ x, y, w, d, h, seed }: BoxProps & { seed: number }) {
  const ww = 0.36;
  const wh = 0.4;
  const gap = 0.4;
  const floors: number[] = [];
  for (let z = 0.5; z + wh < h - 0.25; z += 0.85) floors.push(z);
  const cols = (len: number) => {
    const n = Math.max(1, Math.floor((len - 0.5 + gap) / (ww + gap)));
    const start = (len - (n * ww + (n - 1) * gap)) / 2;
    return Array.from({ length: n }, (_, i) => start + i * (ww + gap));
  };
  // Цонхнуудыг нэг path болгон нэгтгэнэ (SVG хэмжээ багасгана)
  let dim = "";
  let lit = "";
  let dimR = "";
  let litR = "";
  cols(w).forEach((u, i) =>
    floors.forEach((z, j) => {
      const p = `M${poly([[x + u, y + d, z], [x + u + ww, y + d, z], [x + u + ww, y + d, z + wh], [x + u, y + d, z + wh]]).replace(/ /g, "L")}Z`;
      if ((i * 13 + j * 7 + seed * 5) % 9 < 2) lit += p;
      else dim += p;
    }),
  );
  cols(d).forEach((u, i) =>
    floors.forEach((z, j) => {
      const p = `M${poly([[x + w, y + u, z], [x + w, y + u + ww, z], [x + w, y + u + ww, z + wh], [x + w, y + u, z + wh]]).replace(/ /g, "L")}Z`;
      if ((i * 11 + j * 5 + seed * 3) % 10 < 2) litR += p;
      else dimR += p;
    }),
  );
  return (
    <g>
      <Box x={x} y={y} w={w} d={d} h={h} />
      <path d={dim} fill={COL.win} />
      <path d={dimR} fill={COL.win} opacity=".9" />
      <path d={lit} fill={COL.lit} opacity=".9" />
      <path d={litR} fill={COL.litR} opacity=".75" />
      <polyline points={poly([[x, y + d, h], [x + w, y + d, h], [x + w, y, h]])} fill="none" stroke={COL.line} strokeWidth="1.2" />
    </g>
  );
}

export function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const [cx, cy] = pr(x, y);
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={9 * s} ry={4.5 * s} fill="#000" opacity=".28" />
      <rect x={cx - 1.5} y={cy - 15 * s} width="3" height={15 * s} fill="#2A3655" />
      <circle cx={cx} cy={cy - 21 * s} r={10 * s} fill="#1E3150" />
      <circle cx={cx - 3 * s} cy={cy - 24 * s} r={5 * s} fill="#2B4268" />
    </g>
  );
}

export function Lamp({ x, y }: { x: number; y: number }) {
  const [cx, cy] = pr(x, y);
  return (
    <g>
      <line x1={cx} y1={cy} x2={cx} y2={cy - 30} stroke={COL.line} strokeWidth="2" />
      <circle cx={cx} cy={cy - 31} r="9" fill={COL.accent} opacity=".14" />
      <circle cx={cx} cy={cy - 31} r="3" fill={COL.accent} />
    </g>
  );
}

export function Ger({ x, y }: { x: number; y: number }) {
  const r = 0.95;
  const h = 0.72;
  const [cx, cy] = pr(x, y);
  const rx = 1.2247 * r * S;
  const ry = 0.7071 * r * S;
  const top = cy - h * S;
  const rr = 1.1;
  return (
    <g>
      <ellipse cx={cx} cy={cy + 2} rx={rx + 4} ry={ry + 2} fill="#000" opacity=".25" />
      <path d={`M${f(cx - rx)},${f(top)} L${f(cx - rx)},${f(cy)} A${f(rx)} ${f(ry)} 0 0 0 ${f(cx + rx)},${f(cy)} L${f(cx + rx)},${f(top)} A${f(rx)} ${f(ry)} 0 0 1 ${f(cx - rx)},${f(top)} Z`} fill="#C9D1DE" />
      <path d={`M${f(cx - rx)},${f(top + 6)} A${f(rx)} ${f(ry)} 0 0 0 ${f(cx + rx)},${f(top + 6)}`} fill="none" stroke={COL.accent} strokeWidth="2" opacity=".85" />
      <path d={`M${f(cx - rx * rr)},${f(top)} L${f(cx)},${f(top - 0.62 * S)} L${f(cx + rx * rr)},${f(top)} A${f(rx * rr)} ${f(ry * rr)} 0 0 1 ${f(cx - rx * rr)},${f(top)} Z`} fill="#E6EAF1" />
      <ellipse cx={cx} cy={top - 0.62 * S + 2} rx="5" ry="2.6" fill={COL.accent} />
      <rect x={cx - 5} y={cy + ry - 17} width="10" height="14" rx="1.5" fill={COL.accent} />
    </g>
  );
}

/** Ochir O-тэмдэг (512 viewBox-оос) */
export function Mark({ scale, dot = COL.text }: { scale: number; dot?: string }) {
  return (
    <g transform={`scale(${scale})`}>
      <path d="M 413.6 228.2 A 160 160 0 1 1 283.8 98.4" fill="none" stroke={COL.accent} strokeWidth="64" />
      <circle cx="372" cy="140" r="34" fill={dot} />
    </g>
  );
}

/* --- Хүмүүс (тус бүр ≤ 12 path) --------------------------------------- */

/** Мотоцикльтой хүргэлтийн ажилтан (0,0 = газар) */
export function Rider() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="15" ry="3.5" fill="#000" opacity=".4" />
      <rect x="-17" y="-25" width="12" height="11" rx="1.5" fill={COL.accent} />
      <circle cx="-9" cy="-5.5" r="5" fill={COL.sky} stroke={COL.muted} strokeWidth="2" />
      <circle cx="9" cy="-5.5" r="5" fill={COL.sky} stroke={COL.muted} strokeWidth="2" />
      <path d="M-11-9 L-3-13 H6 L10-6 L6-6 L3-9 H-6 Z" fill="#E8EDF4" />
      <path d="M6-13 L9-19" stroke={COL.muted} strokeWidth="2" strokeLinecap="round" />
      <path d="M-2-13 L2-24" stroke={COL.accent} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M1-21 L8-18" stroke={COL.accent} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="3" cy="-28" r="5" fill={COL.text} />
      <path d="M4-30 h4" stroke={COL.sky} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/** Хайрцаг барьсан алхаж буй ажилтан */
export function Walker({ boxRef }: { boxRef?: Ref<SVGRectElement> }) {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="9" ry="3" fill="#000" opacity=".35" />
      <path d="M-3 0 L-1-12 M4 0 L1-12" stroke="#26334F" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M-5-11 Q-6-23 0-25 Q6-23 5-11 Z" fill={COL.accent} />
      <circle cx="0" cy="-29.5" r="4.6" fill={COL.text} />
      <path d="M-4.6-31 a4.6 4.6 0 0 1 9.2 0 Z" fill={COL.accent} />
      <path d="M-4-20 L2-16 L8-17" fill="none" stroke={COL.accentDark} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect ref={boxRef} x="3" y="-23" width="10" height="8" rx="1" fill="#FF8A55" stroke={COL.accentDark} strokeWidth=".8" />
    </g>
  );
}

/** Мотоцикльдоо ачиж буй ажилтан (зогсоосон мотоцикльтой) */
export function Loader() {
  return (
    <g>
      <ellipse cx="6" cy="0" rx="22" ry="4" fill="#000" opacity=".35" />
      <circle cx="0" cy="-5.5" r="5" fill={COL.sky} stroke={COL.muted} strokeWidth="2" />
      <circle cx="18" cy="-5.5" r="5" fill={COL.sky} stroke={COL.muted} strokeWidth="2" />
      <path d="M-2-9 L6-13 H15 L19-6 L15-6 L12-9 H3 Z" fill="#E8EDF4" />
      <rect x="-6" y="-24" width="12" height="11" rx="1.5" fill={COL.accent} />
      <path d="M-14 0 L-13-12 M-9 0 L-10-12" stroke="#26334F" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M-16-11 Q-17-22 -11-24 Q-6-22 -7-11 Z" fill={COL.accent} />
      <circle cx="-11.5" cy="-28.5" r="4.5" fill={COL.text} />
      <path d="M-8-20 L-3-27 M-14-20 L-6-29" stroke={COL.accentDark} strokeWidth="2.4" strokeLinecap="round" />
      <rect x="-7" y="-36" width="10" height="8" rx="1" fill="#FF8A55" stroke={COL.accentDark} strokeWidth=".8" />
    </g>
  );
}

/** Компьютерийн ард суусан хүн (≈4 path) */
export function Seated({ shirt }: { shirt: string }) {
  return (
    <g>
      <path d="M-6 0 V-9 H6 V0 M-7-9 H7" stroke="#2A3657" strokeWidth="2" fill="none" />
      <path d="M-5-9 Q-6-20 0-21 Q6-20 5-9 Z" fill={shirt} />
      <circle cx="0" cy="-24.5" r="4.2" fill={COL.text} />
      <path d="M-4.2-25.5 a4.2 4.2 0 0 1 8.4 0 Z" fill="#26334F" />
    </g>
  );
}

/** Захиалгын "#" шошго */
export function Tag({ label }: { label: string }) {
  return (
    <g>
      <rect x="-23" y="-9" width="46" height="18" rx="9" fill="#111A2E" stroke="#1E2A44" />
      <circle cx="-13" cy="0" r="3" fill={COL.accent} />
      <text x="-7" y="3.5" fontSize="10" fontWeight="700" fill={COL.text} fontFamily="var(--font-inter), system-ui, sans-serif">
        {label}
      </text>
    </g>
  );
}

export function OrderTicket() {
  return (
    <g>
      <rect x="-30" y="-12" width="60" height="24" rx="4" fill={COL.text} />
      <path d="M-30-8a4 4 0 0 1 4-4h8v24h-8a4 4 0 0 1-4-4z" fill={COL.accent} />
      <line x1="-18" y1="-10" x2="-18" y2="10" stroke={COL.sky} strokeOpacity=".35" strokeDasharray="2 2" />
      <text x="-13" y="-1" fontSize="7.5" fontWeight="800" fill={COL.sky} fontFamily="var(--font-inter), system-ui, sans-serif">
        Захиалга
      </text>
      <rect x="-13" y="3.5" width="24" height="3" rx="1.5" fill={COL.muted} />
      <circle cx="23" cy="-4" r="2.6" fill={COL.accent} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Үзэгдлүүдийн байрлал                                                 */
/* ------------------------------------------------------------------ */
// Гудамж: зүүн гар y=20 (x: -4→20), баруун гар x=20 (y: 20→-4), тойрог 14..20
export const ST = 20;
export const RING = 14;
export const HALF = 0.75;

// (а) Дэлгүүр
export const SHOP = { x: 1, y: 13.4, w: 5, d: 2.8, h: 2.6 };
export const SY = SHOP.y + SHOP.d; // урд нүүр (y хавтгай)
export const DOOR_X = 4.8;
export const WALKER: [number, number] = [4.3, 17.4];
export const LOADER: [number, number] = [8.2, 18.4];

// (в) Вэб студи (2 давхар, гудамж руу харсан хана онгорхой)
export const STU = { x: 15, y: 1, w: 4.1, d: 8.2, h: 4 };
export const OPEN_X = STU.x + STU.w; // 19.1
export const FLOOR_H = 2;
export const DESK_Y = [1.8, 3.4, 5.0, 6.6, 8.2];
export const SHIRTS = ["#9AA5B8", "#F5F7FA", "#3A4A6B", "#FF8A55", "#9AA5B8", "#3A4A6B", "#F5F7FA", "#9AA5B8", "#FF8A55", "#3A4A6B"];

// Хөдөлгөөний замууд
export const LONG_PATH = `${pathD([[-4, ST], [ST, ST], [ST, -4], [ST, ST]])} Z`;
export const RING_PATH = pathD([[RING, RING], [ST, RING], [ST, ST], [RING, ST]], true);
export const ORDER_PATH = pathD([[OPEN_X - 0.1, 5, 2.6], [ST, 5, 0.9], [ST, ST, 0.6], [6, ST, 0.6], [DOOR_X, SY + 0.1, 0.7]]);

export const BIKES = [
  { path: "long", dur: 30, start: 0.12, tag: "#1047" },
  { path: "long", dur: 21, start: 0.42, tag: "#1052" },
  { path: "ring", dur: 11, start: 0.6, tag: "#1049" },
] as const;

export const TICKET_STARTS: [number, number][] = [
  [262, 446],
  [318, 458],
  [374, 446],
];

/* ------------------------------------------------------------------ */
export function Shop({ glowRef }: { glowRef: RefObject<SVGGElement> }) {
  const { x, y, w, h } = SHOP;
  const signY = y + 1.4;
  const [tx, ty] = pr(2.25, signY, 2.82);
  const [mx, my] = pr(1.55, signY, 3.28);
  return (
    <g>
      <Box {...SHOP} top="#2A3657" left="#202D4D" right="#16213C" />
      <g ref={glowRef} opacity=".6">
        <polygon points={poly([[1.3, SY, 0], [3.9, SY, 0], [4.2, SY + 1.2, 0], [1, SY + 1.2, 0]])} fill={COL.accent} opacity=".12" />
        <polygon points={poly([[1.45, SY, 0.42], [3.95, SY, 0.42], [3.95, SY, 1.86], [1.45, SY, 1.86]])} fill={COL.accent} opacity=".35" />
      </g>
      {/* цонх = вэб сайтын дэлгэц */}
      <polygon points={poly([[1.55, SY, 0.5], [3.85, SY, 0.5], [3.85, SY, 1.78], [1.55, SY, 1.78]])} fill="#0B1220" />
      <polygon points={poly([[1.55, SY, 1.58], [3.85, SY, 1.58], [3.85, SY, 1.78], [1.55, SY, 1.78]])} fill={COL.accent} />
      <path
        d={[1.7, 2.4, 3.1]
          .map((u) => `M${poly([[u, SY, 0.92], [u + 0.55, SY, 0.92], [u + 0.55, SY, 1.38], [u, SY, 1.38]]).replace(/ /g, "L")}Z`)
          .join("")}
        fill="#26365A"
      />
      {/* хаалга */}
      <polygon points={poly([[DOOR_X - 0.3, SY, 0], [DOOR_X + 0.3, SY, 0], [DOOR_X + 0.3, SY, 1.45], [DOOR_X - 0.3, SY, 1.45]])} fill="#0E1628" stroke={COL.line} strokeWidth=".8" />
      {/* саравч */}
      <polygon points={poly([[1.1, SY, 2.0], [5.9, SY, 2.0], [5.9, SY + 0.55, 1.72], [1.1, SY + 0.55, 1.72]])} fill={COL.accent} />
      <polygon points={poly([[1.1, SY + 0.55, 1.72], [5.9, SY + 0.55, 1.72], [5.9, SY + 0.55, 1.62], [1.1, SY + 0.55, 1.62]])} fill={COL.accentDark} />
      {/* баруун цонх */}
      <polygon points={poly([[x + w, 14, 0.7], [x + w, 15.4, 0.7], [x + w, 15.4, 1.6], [x + w, 14, 1.6]])} fill={COL.litR} opacity=".5" />
      {/* дээврийн хаяг + O-тэмдэг */}
      <polygon points={poly([[1.35, signY, h], [4.7, signY, h], [4.7, signY, h + 0.85], [1.35, signY, h + 0.85]])} fill="#0E1628" stroke={COL.accent} strokeWidth="1" />
      <g transform={`matrix(${C} 0.5 0 1 ${f(mx)} ${f(my)})`}>
        <Mark scale={0.034} />
      </g>
      <text transform={`matrix(${C} 0.5 0 1 ${f(tx)} ${f(ty)})`} fill={COL.accent} fontSize="11" fontWeight="800" letterSpacing="0.6" fontFamily="var(--font-inter), system-ui, sans-serif">
        ДЭЛГҮҮР
      </text>
    </g>
  );
}

/** Ширээ + дэлгэц + хүн (нэг давхарт), дэлгэцийн контент нь data-screen */
export function Desk({ y, z0, i }: { y: number; z0: number; i: number }) {
  const mX = OPEN_X - 0.5; // дэлгэцийн хавтгай (гудамж руу харсан)
  const [px, py] = pr(OPEN_X - 0.4, y - 0.8, z0);
  const [gx, gy] = pr(mX + 0.2, y, z0 + 1.05);
  const hdr = i % 3 === 0 ? COL.accent : i % 3 === 1 ? "#7FA7FF" : COL.lit;
  const q = (y0: number, y1: number, z1: number, z2: number) =>
    poly([[mX, y + y0, z0 + z1], [mX, y + y1, z0 + z1], [mX, y + y1, z0 + z2], [mX, y + y0, z0 + z2]]);
  return (
    <g>
      {/* хүн (дэлгэцийн хажууд, гүнд) */}
      <g transform={`translate(${f(px)} ${f(py)})`}>
        <Seated shirt={SHIRTS[i] ?? COL.muted} />
      </g>
      {/* ширээ */}
      <Box x={OPEN_X - 0.75} y={y - 0.5} z={z0 + 0.55} w={0.6} d={1} h={0.08} top="#3A4A6B" left="#2A3657" right="#22304D" />
      {/* дэлгэцийн гэрэл */}
      <ellipse cx={gx} cy={gy} rx="16" ry="12" fill={hdr} opacity=".18" />
      <polygon points={q(-0.46, 0.46, 0.7, 1.5)} fill="#2E3B5C" />
      <g data-screen="">
        <polygon points={q(-0.41, 0.41, 0.75, 1.45)} fill="#E9EEF6" />
        <polygon points={q(-0.38, 0.38, 1.3, 1.41)} fill={hdr} />
        <polygon points={q(-0.38, -0.02, 0.8, 1.24)} fill={i % 2 ? "#C9D3E3" : hdr} opacity=".8" />
        <polygon points={q(0.03, 0.38, 0.8, 1.02)} fill="#B7C2D6" />
      </g>
    </g>
  );
}

export function Studio({ neonRef }: { neonRef: RefObject<SVGGElement> }) {
  const { x, y, d, h } = STU;
  const yb = y + d;
  const [nx, ny] = pr(OPEN_X - 0.5, 8.1, h + 0.28);
  return (
    <g>
      {/* дотоод ханууд */}
      <polygon points={poly([[x, y, 0], [x, yb, 0], [x, yb, h], [x, y, h]])} fill="#263556" />
      <polygon points={poly([[x, y, 0], [OPEN_X, y, 0], [OPEN_X, y, h], [x, y, h]])} fill="#1E2B4A" />
      {/* 1-р давхрын шал */}
      <polygon points={poly([[x, y, 0], [OPEN_X, y, 0], [OPEN_X, yb, 0], [x, yb, 0]])} fill="#1A2540" />
      {DESK_Y.map((dy, i) => (
        <Desk key={`a${dy}`} y={dy} z0={0} i={i} />
      ))}
      {/* 2-р давхрын хавтан */}
      <polygon points={poly([[x, y, FLOOR_H], [OPEN_X, y, FLOOR_H], [OPEN_X, yb, FLOOR_H], [x, yb, FLOOR_H]])} fill="#1A2540" />
      <polygon points={poly([[OPEN_X, y, FLOOR_H - 0.16], [OPEN_X, yb, FLOOR_H - 0.16], [OPEN_X, yb, FLOOR_H], [OPEN_X, y, FLOOR_H]])} fill="#2E3B5C" />
      {DESK_Y.map((dy, i) => (
        <Desk key={`b${dy}`} y={dy} z0={FLOOR_H} i={i + 5} />
      ))}
      {/* дээвэр */}
      <polygon points={poly([[x, y, h], [OPEN_X, y, h], [OPEN_X, yb, h], [x, yb, h]])} fill="#2A3657" />
      <polygon points={poly([[OPEN_X, y, h - 0.2], [OPEN_X, yb, h - 0.2], [OPEN_X, yb, h], [OPEN_X, y, h]])} fill="#33415F" />
      {/* талбай руу харсан гадна хана (цонхтой) */}
      <polygon points={poly([[x, yb, 0], [OPEN_X, yb, 0], [OPEN_X, yb, h], [x, yb, h]])} fill="#1B2744" />
      <path
        d={[0.5, 2.5]
          .flatMap((z) => [0.4, 1.5, 2.6].map((u) => `M${poly([[x + u, yb, z], [x + u + 0.7, yb, z], [x + u + 0.7, yb, z + 1], [x + u, yb, z + 1]]).replace(/ /g, "L")}Z`))
          .join("")}
        fill={COL.win}
      />
      {/* неон хаяг дээвэр дээр */}
      <line x1={pr(OPEN_X - 0.5, 8, h)[0]} y1={pr(OPEN_X - 0.5, 8, h)[1]} x2={pr(OPEN_X - 0.5, 8, h + 0.3)[0]} y2={pr(OPEN_X - 0.5, 8, h + 0.3)[1]} stroke={COL.line} strokeWidth="2" />
      <line x1={pr(OPEN_X - 0.5, 2.2, h)[0]} y1={pr(OPEN_X - 0.5, 2.2, h)[1]} x2={pr(OPEN_X - 0.5, 2.2, h + 0.3)[0]} y2={pr(OPEN_X - 0.5, 2.2, h + 0.3)[1]} stroke={COL.line} strokeWidth="2" />
      <g ref={neonRef}>
        <text transform={`matrix(${C} -0.5 0 1 ${f(nx)} ${f(ny)})`} fontSize="17" fontWeight="800" letterSpacing="2" fontFamily="var(--font-inter), system-ui, sans-serif" fill="none" stroke={COL.accent} strokeWidth="5" strokeOpacity=".28" strokeLinejoin="round">
          WEB · SYSTEM
        </text>
        <text transform={`matrix(${C} -0.5 0 1 ${f(nx)} ${f(ny)})`} fontSize="17" fontWeight="800" letterSpacing="2" fontFamily="var(--font-inter), system-ui, sans-serif" fill="#FFD2B8" stroke={COL.accent} strokeWidth="0.8">
          WEB · SYSTEM
        </text>
      </g>
    </g>
  );
}

export function OchirSign({ x, y }: { x: number; y: number }) {
  const [cx, cy] = pr(x, y);
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="16" ry="5" fill="#000" opacity=".3" />
      <rect x={cx - 2} y={cy - 22} width="4" height="22" fill={COL.line} />
      <rect x={cx - 32} y={cy - 46} width="64" height="24" rx="6" fill="#111A2E" stroke={COL.accent} />
      <g transform={`translate(${cx - 27} ${cy - 42})`}>
        <Mark scale={0.031} />
      </g>
      <text x={cx - 9} y={cy - 29.5} fontSize="11" fontWeight="800" fill={COL.text} fontFamily="var(--font-inter), system-ui, sans-serif">
        Ochir
      </text>
    </g>
  );
}

