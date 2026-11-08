"use client";

import { useEffect, useRef, type Ref, type RefObject } from "react";

/* ------------------------------------------------------------------ */
/* Изометрик проекц — 1200×560                                         */
/* ------------------------------------------------------------------ */
const S = 25;
const C = 0.8660254;
const OX = 600;
const OY = 4;
const VB_W = 1200;
const VB_H = 560;

type P3 = [number, number, number];

function pr(x: number, y: number, z = 0): [number, number] {
  return [OX + (x - y) * C * S, OY + (x + y) * 0.5 * S - z * S];
}
const f = (n: number) => Math.round(n * 10) / 10;
function poly(pts: P3[]): string {
  return pts.map(([x, y, z]) => pr(x, y, z).map(f).join(",")).join(" ");
}
function pathD(pts: [number, number, number?][], close = false): string {
  return pts.map(([x, y, z], i) => `${i ? "L" : "M"}${pr(x, y, z ?? 0).map(f).join(",")}`).join(" ") + (close ? " Z" : "");
}

const COL = {
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
function Box({ x, y, z = 0, w, d, h, top = COL.top, left = COL.left, right = COL.right }: BoxProps) {
  return (
    <g>
      <polygon points={poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={left} />
      <polygon points={poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} fill={right} />
      <polygon points={poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={top} />
    </g>
  );
}

/** Барилга + цонх (детерминист гэрэл) */
function Building({ x, y, w, d, h, seed }: BoxProps & { seed: number }) {
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

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
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

function Lamp({ x, y }: { x: number; y: number }) {
  const [cx, cy] = pr(x, y);
  return (
    <g>
      <line x1={cx} y1={cy} x2={cx} y2={cy - 30} stroke={COL.line} strokeWidth="2" />
      <circle cx={cx} cy={cy - 31} r="9" fill={COL.accent} opacity=".14" />
      <circle cx={cx} cy={cy - 31} r="3" fill={COL.accent} />
    </g>
  );
}

function Ger({ x, y }: { x: number; y: number }) {
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
function Mark({ scale, dot = COL.text }: { scale: number; dot?: string }) {
  return (
    <g transform={`scale(${scale})`}>
      <path d="M 413.6 228.2 A 160 160 0 1 1 283.8 98.4" fill="none" stroke={COL.accent} strokeWidth="64" />
      <circle cx="372" cy="140" r="34" fill={dot} />
    </g>
  );
}

/* --- Хүмүүс (тус бүр ≤ 12 path) --------------------------------------- */

/** Мотоцикльтой хүргэлтийн ажилтан (0,0 = газар) */
function Rider() {
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
function Walker({ boxRef }: { boxRef?: Ref<SVGRectElement> }) {
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
function Loader() {
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
function Seated({ shirt }: { shirt: string }) {
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
function Tag({ label }: { label: string }) {
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

function OrderTicket() {
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
const ST = 20;
const RING = 14;
const HALF = 0.75;

// (а) Дэлгүүр
const SHOP = { x: 1, y: 13.4, w: 5, d: 2.8, h: 2.6 };
const SY = SHOP.y + SHOP.d; // урд нүүр (y хавтгай)
const DOOR_X = 4.8;
const WALKER: [number, number] = [4.3, 17.4];
const LOADER: [number, number] = [8.2, 18.4];

// (в) Вэб студи (2 давхар, гудамж руу харсан хана онгорхой)
const STU = { x: 15, y: 1, w: 4.1, d: 8.2, h: 4 };
const OPEN_X = STU.x + STU.w; // 19.1
const FLOOR_H = 2;
const DESK_Y = [1.8, 3.4, 5.0, 6.6, 8.2];
const SHIRTS = ["#9AA5B8", "#F5F7FA", "#3A4A6B", "#FF8A55", "#9AA5B8", "#3A4A6B", "#F5F7FA", "#9AA5B8", "#FF8A55", "#3A4A6B"];

// Хөдөлгөөний замууд
const LONG_PATH = `${pathD([[-4, ST], [ST, ST], [ST, -4], [ST, ST]])} Z`;
const RING_PATH = pathD([[RING, RING], [ST, RING], [ST, ST], [RING, ST]], true);
const ORDER_PATH = pathD([[OPEN_X - 0.1, 5, 2.6], [ST, 5, 0.9], [ST, ST, 0.6], [6, ST, 0.6], [DOOR_X, SY + 0.1, 0.7]]);

const BIKES = [
  { path: "long", dur: 30, start: 0.12, tag: "#1047" },
  { path: "long", dur: 21, start: 0.42, tag: "#1052" },
  { path: "ring", dur: 11, start: 0.6, tag: "#1049" },
] as const;

const TICKET_STARTS: [number, number][] = [
  [262, 446],
  [318, 458],
  [374, 446],
];

/* ------------------------------------------------------------------ */
function Shop({ glowRef }: { glowRef: RefObject<SVGGElement> }) {
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
function Desk({ y, z0, i }: { y: number; z0: number; i: number }) {
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

function Studio({ neonRef }: { neonRef: RefObject<SVGGElement> }) {
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

function OchirSign({ x, y }: { x: number; y: number }) {
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

/* ------------------------------------------------------------------ */
export function IsometricCity() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const backRef = useRef<SVGGElement>(null);
  const midRef = useRef<SVGGElement>(null);
  const frontRef = useRef<SVGGElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<SVGGElement>(null);
  const neonRef = useRef<SVGGElement>(null);
  const walkerBoxRef = useRef<SVGRectElement>(null);
  const flyBoxRef = useRef<SVGGElement>(null);
  const bikesRef = useRef<SVGGElement>(null);
  const bikeTagsRef = useRef<SVGGElement>(null);
  const ticketsRef = useRef<SVGGElement>(null);
  const checksRef = useRef<SVGGElement>(null);
  const orderDotRef = useRef<SVGGElement>(null);
  const longRef = useRef<SVGPathElement>(null);
  const ringRef = useRef<SVGPathElement>(null);
  const orderPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      const [{ gsap }, { MotionPathPlugin }] = await Promise.all([import("gsap"), import("gsap/MotionPathPlugin")]);
      if (cancelled) return;
      gsap.registerPlugin(MotionPathPlugin);
      const master = gsap.timeline();

      const ctx = gsap.context(() => {
        // 1) Мотоциклууд — 3 өөр хурдтай loop, шошго нь урд давхаргад дагана
        const bikeEls = bikesRef.current ? Array.from(bikesRef.current.children) : [];
        const tagEls = bikeTagsRef.current ? Array.from(bikeTagsRef.current.children) : [];
        BIKES.forEach((b, i) => {
          const el = bikeEls[i] as SVGGElement | undefined;
          const tag = tagEls[i] as SVGGElement | undefined;
          const flip = el?.firstElementChild as SVGGElement | null;
          if (!el) return;
          let lastX = Number.NaN;
          master.add(
            gsap.to(el, {
              duration: b.dur,
              ease: "none",
              repeat: -1,
              motionPath: { path: (b.path === "long" ? longRef : ringRef).current!, start: b.start, end: b.start + 1 },
              onUpdate() {
                const x = Number(gsap.getProperty(el, "x"));
                const y = Number(gsap.getProperty(el, "y"));
                if (!Number.isNaN(lastX) && Math.abs(x - lastX) > 0.01) flip?.setAttribute("transform", x < lastX ? "scale(-1,1)" : "");
                lastX = x;
                if (tag) gsap.set(tag, { x, y });
              },
            }),
            0,
          );
        });

        // 2) Шошгууд хөвнө
        gsap.utils.toArray<SVGElement>("[data-bob]", svgRef.current).forEach((t, i) => {
          master.add(gsap.to(t, { y: -4, duration: 1.4 + (i % 3) * 0.3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.25 }), 0);
        });
        gsap.utils.toArray<HTMLElement>("[data-float]", root).forEach((el, i) => {
          master.add(gsap.to(el, { y: -6, duration: 2.2 + i * 0.35, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.4 }), 0);
        });

        // 3) Дэлгүүрийн цонх 3с тутам анивчина
        master.add(gsap.fromTo(glowRef.current, { opacity: 0.45 }, { opacity: 1, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 }), 0);

        // 4) Хаалганаас 5с тутам шинэ хайрцаг ажилтны гарт очно
        const [dx0, dy0] = pr(DOOR_X, SY + 0.05, 0.55);
        const [hx, hy] = pr(WALKER[0], WALKER[1]);
        const fly = flyBoxRef.current;
        const held = walkerBoxRef.current;
        if (fly && held) {
          gsap.set(held, { opacity: 0 });
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 - 3.4 });
          tl.fromTo(fly, { x: dx0, y: dy0, opacity: 0, scale: 0.7, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3 })
            .to(fly, { x: hx + 8, y: hy - 19, duration: 1.1, ease: "power1.inOut" })
            .set(fly, { opacity: 0 })
            .set(held, { opacity: 1 })
            .to(held, { opacity: 0, duration: 0.4, delay: 1.6 });
          master.add(tl, 0);
        }

        // 5) Студийн дэлгэцүүд 2–4с тутам өөр өөр цагт "шинэ хуудас"
        gsap.utils.toArray<SVGElement>("[data-screen]", svgRef.current).forEach((sc, i) => {
          const tl = gsap.timeline({ repeat: -1, delay: (i * 0.73) % 3, repeatDelay: 2 + ((i * 7) % 5) * 0.5 });
          tl.to(sc, { opacity: 0.15, duration: 0.12 }).to(sc, { opacity: 1, duration: 0.35, ease: "power1.out" });
          master.add(tl, 0);
        });

        // 6) Хааяа дэлгэцээс "✓" дээш хөвнө
        (checksRef.current ? Array.from(checksRef.current.children) : []).forEach((ck, i) => {
          const tl = gsap.timeline({ repeat: -1, delay: 1.5 + i * 2.6, repeatDelay: 6 + i });
          tl.fromTo(ck, { y: 0, opacity: 0 }, { y: -10, opacity: 1, duration: 0.4 }).to(ck, { y: -30, opacity: 0, duration: 1.1, ease: "power1.in" });
          master.add(tl, 0);
        });

        // 7) Неон хаяг зөөлөн анивчина
        master.add(gsap.to(neonRef.current, { opacity: 0.7, duration: 0.08, repeat: -1, yoyo: true, repeatDelay: 3.7, ease: "none" }), 0);

        // 8) Вэб студи → гудамж → дэлгүүр: "ирсэн захиалга" 8с тутам
        const dot = orderDotRef.current;
        if (dot && orderPathRef.current) {
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 8 - 4.2, delay: 1 });
          tl.set(dot, { opacity: 0 })
            .to(dot, { opacity: 1, duration: 0.3 })
            .to(dot, { duration: 3.6, ease: "power1.inOut", motionPath: { path: orderPathRef.current } }, 0)
            .to(dot, { opacity: 0, duration: 0.3 }, 3.9);
          master.add(tl, 0);
        }

        // 9) Захиалгын тасалбарууд 4с тутам доод ирмэгээс дэлгүүр рүү
        const tickets = ticketsRef.current ? Array.from(ticketsRef.current.children) : [];
        const [ex, ey] = pr(DOOR_X, SY + 0.15, 0.7);
        tickets.forEach((t, i) => {
          const [sx, sy] = TICKET_STARTS[i] ?? TICKET_STARTS[0]!;
          const inner = t.firstElementChild;
          const tl = gsap.timeline({ repeat: -1, delay: i * 4, repeatDelay: 4 * tickets.length - 3.1 });
          tl.fromTo(inner, { x: 0, y: 14, scale: 1, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", transformOrigin: "50% 50%" })
            .to(inner, { x: ex - sx, y: ey - sy, scale: 0.3, duration: 2.2, ease: "power2.inOut" }, "+=0.4")
            .to(inner, { opacity: 0, duration: 0.35, ease: "power1.in" }, "-=0.35");
          master.add(tl, 0);
        });
      }, root);

      // Parallax: арын 6px, гудамж/хүмүүс 12px, урд шошго 20px
      let raf = 0;
      const layers: [Element | null, number][] = [
        [backRef.current, 6],
        [midRef.current, 12],
        [frontRef.current, 20],
        [chipsRef.current, 20],
      ];
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = root.getBoundingClientRect();
          const vh = window.innerHeight;
          const p = Math.min(1, Math.max(0, (vh - r.top) / Math.max(1, vh + r.height)));
          for (const [el, amt] of layers) if (el) (el as HTMLElement).style.transform = `translate3d(0, ${(-amt * p).toFixed(2)}px, 0)`;
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? master.resume() : master.pause()), { threshold: 0 });
      io.observe(root);
      const onReduce = () => reduce.matches && master.pause();
      reduce.addEventListener("change", onReduce);

      cleanup = () => {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(raf);
        io.disconnect();
        reduce.removeEventListener("change", onReduce);
        master.kill();
        ctx.revert();
      };
    };

    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(() => void start(), { timeout: 1500 }) : window.setTimeout(() => void start(), 300);
    return () => {
      cancelled = true;
      if (!w.requestIdleCallback) window.clearTimeout(id);
      cleanup?.();
    };
  }, []);

  // Статик (reduced-motion / JS ачаалахаас өмнөх) байрлалууд
  const bikeStatic: [number, number][] = [pr(9, ST), pr(ST, 9), pr(ST, 17)];
  const [walkerX, walkerY] = pr(WALKER[0], WALKER[1]);
  const [loaderX, loaderY] = pr(LOADER[0], LOADER[1]);
  const checkAt: [number, number][] = [pr(OPEN_X - 0.42, 3.4, 1.5), pr(OPEN_X - 0.42, 6.6, 3.5), pr(OPEN_X - 0.42, 1.8, 3.5)];

  const chips = (
    <div ref={chipsRef} className="flex items-center justify-center gap-1 sm:gap-2" aria-hidden="true">
      {["Баталгаажсан захиалга", "Хүргэлт", "Тайлан"].map((label, i) => (
        <div key={label} className="flex items-center gap-1 sm:gap-2">
          {i > 0 && (
            <svg width="18" height="10" viewBox="0 0 18 10" className="w-3.5 shrink-0 text-accent sm:w-[18px]">
              <path d="M1 5h14m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span
            data-float
            className="inline-flex items-center gap-1 rounded-full border border-line bg-card/90 px-2 py-1 text-[10.5px] font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)] sm:gap-1.5 sm:px-3 sm:text-xs"
          >
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-bold text-bg">{i + 1}</span>
            <span className="max-w-[5.6rem] leading-[1.15] sm:max-w-none sm:whitespace-nowrap">{label}</span>
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={rootRef} className="relative">
      {/* Тэнгэрийн шошгууд: desktop-д хотын дээр, mobile-д гүйлгэх хэсгийн дээр */}
      <div className="relative z-10 mb-3 sm:mb-1">{chips}</div>

      <div className="-mx-4 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] sm:mx-0 sm:snap-none sm:overflow-visible">
        <div className="relative h-[400px] w-[857px] sm:aspect-[1200/560] sm:h-auto sm:w-full">
          {/* mobile scroll-snap цэгүүд: дэлгүүр / талбай / вэб студи */}
          <span className="absolute left-[25%] top-0 h-px w-px snap-center sm:hidden" aria-hidden="true" />
          <span className="absolute left-[50%] top-0 h-px w-px snap-center sm:hidden" aria-hidden="true" />
          <span className="absolute left-[74%] top-0 h-px w-px snap-center sm:hidden" aria-hidden="true" />
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 h-full w-full select-none"
            role="img"
            aria-label="Изометрик хот: зүүн талд дэлгүүрээс хүргэлтийн ажилтнууд хайрцаг авч мотоциклоор гарч байна, голд тойрог зам, гэр, Ochir хаяг, баруун талд 2 давхар вэб студид 10 хүн компьютер дээр вэб хуудас хийж байна"
          >
            <defs>
              <linearGradient id="city-fade" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset=".1" stopColor="#fff" />
                <stop offset=".9" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <mask id="city-mask" maskUnits="userSpaceOnUse" x="0" y="-40" width={VB_W} height={VB_H + 80}>
                <rect x="0" y="-40" width={VB_W} height={VB_H + 80} fill="url(#city-fade)" />
              </mask>
            </defs>

            <g mask="url(#city-mask)">
              {/* ===== АРЫН ДАВХАРГА: тэнгэр, уул, алсын барилгууд ===== */}
              <g ref={backRef} style={{ willChange: "transform" }}>
                {[
                  [90, 60], [210, 34], [330, 96], [470, 70], [760, 50], [880, 92], [1010, 40], [1120, 110], [150, 150], [1060, 170],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.6 : 1} fill={COL.muted} opacity=".5" />
                ))}
                <path d="M0 250 L70 196 L130 214 L210 150 L270 178 L350 120 L420 150 L500 104 L560 132 L640 96 L720 140 L800 112 L870 158 L950 120 L1030 176 L1110 150 L1200 196 V320 H0Z" fill="#0F182C" />
                <path d="M0 290 L90 246 L170 262 L260 214 L340 240 L430 196 L520 226 L620 186 L700 222 L790 194 L880 236 L980 204 L1080 246 L1200 228 V340 H0Z" fill="#111B31" />
                <polygon points={poly([[-4, -4, 0], [13, -4, 0], [13, 12, 0], [-4, 12, 0]])} fill={COL.far} />
                <Building x={10} y={2.2} w={2.5} d={3} h={3.4} seed={2} />
                <Building x={2} y={8} w={3} d={2.6} h={2.6} seed={3} />
                <Building x={6} y={6.5} w={3} d={3} h={2.8} seed={1} />
                <Building x={9.6} y={8.6} w={2.4} d={2.4} h={1.8} seed={4} />
              </g>

              {/* ===== ГОЛ ДАВХАРГА: газар, гудамж, үзэгдлүүд, хүмүүс ===== */}
              <g ref={midRef} style={{ willChange: "transform" }}>
                {/* газрын хавтан (V хэлбэр) */}
                <polygon points={poly([[-4, 12, 0], [13, 12, 0], [13, -4, 0], [21.5, -4, 0], [21.5, 21.5, 0], [-4, 21.5, 0]])} fill={COL.ground} />
                <polygon points={poly([[-4, 21.5, 0], [21.5, 21.5, 0], [21.5, 21.5, -0.45], [-4, 21.5, -0.45]])} fill={COL.groundL} />
                <polygon points={poly([[21.5, -4, 0], [21.5, 21.5, 0], [21.5, 21.5, -0.45], [21.5, -4, -0.45]])} fill={COL.groundR} />

                {/* гудамж + тойрог */}
                <path
                  d={[
                    poly([[-4, ST - HALF, 0], [ST + HALF, ST - HALF, 0], [ST + HALF, ST + HALF, 0], [-4, ST + HALF, 0]]),
                    poly([[ST - HALF, -4, 0], [ST + HALF, -4, 0], [ST + HALF, ST, 0], [ST - HALF, ST, 0]]),
                    poly([[RING - HALF, RING - HALF, 0], [RING + HALF, RING - HALF, 0], [RING + HALF, ST, 0], [RING - HALF, ST, 0]]),
                    poly([[RING - HALF, RING - HALF, 0], [ST, RING - HALF, 0], [ST, RING + HALF, 0], [RING - HALF, RING + HALF, 0]]),
                  ]
                    .map((p) => `M${p.replace(/ /g, "L")}Z`)
                    .join("")}
                  fill={COL.road}
                />
                <polygon points={poly([[RING + HALF, RING + HALF, 0], [ST - HALF, RING + HALF, 0], [ST - HALF, ST - HALF, 0], [RING + HALF, ST - HALF, 0]])} fill={COL.walk} />
                <polygon points={poly([[RING + 1.05, RING + 1.05, 0], [ST - 1.05, RING + 1.05, 0], [ST - 1.05, ST - 1.05, 0], [RING + 1.05, ST - 1.05, 0]])} fill={COL.plaza} />
                <path d={`${pathD([[-4, ST], [ST, ST], [ST, -4]])} ${pathD([[RING, ST], [RING, RING], [ST, RING]])}`} fill="none" stroke={COL.muted} strokeOpacity=".32" strokeWidth="1.4" strokeDasharray="7 9" />
                {/* гарц */}
                <path d={[0, 1, 2, 3, 4].map((i) => `M${poly([[9.2 + i * 0.32, ST - 0.6, 0], [9.36 + i * 0.32, ST - 0.6, 0], [9.36 + i * 0.32, ST + 0.6, 0], [9.2 + i * 0.32, ST + 0.6, 0]]).replace(/ /g, "L")}Z`).join("")} fill={COL.text} opacity=".2" />

                {/* (а) Дэлгүүр + ачих талбай */}
                <polygon points={poly([[0.2, SY, 0], [9.6, SY, 0], [9.6, ST - HALF - 0.1, 0], [0.2, ST - HALF - 0.1, 0]])} fill={COL.walk} />
                <path d={[7, 8, 9].map((u) => `M${pr(u, SY + 0.6).map(f).join(",")}L${pr(u, ST - HALF - 0.4).map(f).join(",")}`).join("")} stroke={COL.muted} strokeOpacity=".25" strokeWidth="1.2" />
                <Building x={-2.6} y={12.4} w={3} d={2.6} h={2.4} seed={5} />
                <Building x={6.6} y={12.2} w={2.8} d={2.4} h={3.4} seed={6} />
                <Shop glowRef={glowRef} />
                <Tree x={0.4} y={17.6} s={0.9} />

                {/* (в) Вэб студи */}
                <Building x={13.4} y={-1.6} w={1.4} d={4} h={5.4} seed={7} />
                <Box x={15} y={-3.4} w={4} d={3.4} h={1.6} />
                <Studio neonRef={neonRef} />
                <Tree x={16} y={11} s={0.85} />
                <Tree x={18.2} y={11.6} s={0.75} />

                {/* (б) Талбай */}
                <Tree x={15.6} y={18.4} s={0.85} />
                <Tree x={18.6} y={15.6} s={0.85} />
                <Lamp x={15.3} y={15.3} />
                <OchirSign x={16.4} y={16.2} />
                <Ger x={18.1} y={18.1} />

                {/* Ачих талбайн ажилтнууд */}
                <g transform={`translate(${f(loaderX)} ${f(loaderY)}) scale(1.15)`}>
                  <Loader />
                </g>
                <g transform={`translate(${f(walkerX)} ${f(walkerY)}) scale(1.15)`}>
                  <Walker boxRef={walkerBoxRef} />
                </g>
                {/* хаалганаас ажилтны гарт очих хайрцаг */}
                <g ref={flyBoxRef} opacity="0">
                  <rect x="-5" y="-4" width="10" height="8" rx="1" fill="#FF8A55" stroke={COL.accentDark} strokeWidth=".8" />
                </g>

                {/* Хөдөлгөөний замууд (үл харагдах) */}
                <path ref={longRef} d={LONG_PATH} fill="none" />
                <path ref={ringRef} d={RING_PATH} fill="none" />

                {/* Мотоциклууд */}
                <g ref={bikesRef}>
                  {BIKES.map((b, i) => {
                    const [bx, by] = bikeStatic[i]!;
                    return (
                      <g key={b.tag} transform={`translate(${f(bx)} ${f(by)})`}>
                        <g>
                          <g transform="scale(1.15)">
                            <Rider />
                          </g>
                        </g>
                      </g>
                    );
                  })}
                </g>
              </g>
            </g>

            {/* ===== УРД ДАВХАРГА: шошго, тасалбар, захиалгын цэг ===== */}
            <g ref={frontRef} style={{ willChange: "transform" }}>
              <path ref={orderPathRef} d={ORDER_PATH} fill="none" />
              {/* Ажилтан бүрийн "захиалга #" шошго */}
              <g transform={`translate(${f(walkerX - 10)} ${f(walkerY - 52)})`}>
                <g data-bob="">
                  <Tag label="#1051" />
                </g>
              </g>
              <g transform={`translate(${f(loaderX + 14)} ${f(loaderY - 56)})`}>
                <g data-bob="">
                  <Tag label="#1050" />
                </g>
              </g>
              <g ref={bikeTagsRef}>
                {BIKES.map((b, i) => {
                  const [bx, by] = bikeStatic[i]!;
                  return (
                    <g key={b.tag} transform={`translate(${f(bx)} ${f(by)})`}>
                      <g transform="translate(0 -50)">
                        <g data-bob="">
                          <Tag label={b.tag} />
                        </g>
                      </g>
                    </g>
                  );
                })}
              </g>
              {/* дэлгэцээс хөвөх ✓ */}
              <g ref={checksRef}>
                {checkAt.map(([cx, cy], i) => (
                  <g key={i} transform={`translate(${f(cx)} ${f(cy - 34)})`} opacity="0">
                    <circle r="7" fill={COL.accent} />
                    <path d="m-3 0 2 2 4-4.5" fill="none" stroke={COL.sky} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                ))}
              </g>
              {/* вэб → захиалга → хүргэлт цэг */}
              <g ref={orderDotRef} opacity="0">
                <circle r="10" fill={COL.accent} opacity=".22" />
                <circle r="4.5" fill={COL.accent} />
              </g>
              {/* захиалгын тасалбарууд (хөдөлгөөнгүй горимд нэг нь л харагдана) */}
              <g ref={ticketsRef}>
                {TICKET_STARTS.map(([x, y], i) => (
                  <g key={i} transform={`translate(${x} ${y})`}>
                    <g opacity={i === 1 ? 1 : 0}>
                      <OrderTicket />
                    </g>
                  </g>
                ))}
              </g>
            </g>
          </svg>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-muted sm:hidden" aria-hidden="true">
        ← Дэлгүүр · Гудамж · Вэб студи →
      </p>
    </div>
  );
}
