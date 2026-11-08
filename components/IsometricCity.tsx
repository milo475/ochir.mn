"use client";

import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/* Изометрик проекц                                                    */
/* ------------------------------------------------------------------ */
const S = 26; // 1 нэгж = 26px
const OX = 400;
const OY = 232;
const C = 0.8660254;

type P3 = [number, number, number];

function pr(x: number, y: number, z = 0): [number, number] {
  return [OX + (x - y) * C * S, OY + (x + y) * 0.5 * S - z * S];
}
function f(n: number) {
  return Math.round(n * 10) / 10;
}
function poly(pts: P3[]): string {
  return pts
    .map(([x, y, z]) => {
      const [a, b] = pr(x, y, z);
      return `${f(a)},${f(b)}`;
    })
    .join(" ");
}

const COL = {
  sky: "#0B1220",
  ground: "#101A31",
  groundL: "#0D152A",
  groundR: "#0A1122",
  road: "#172239",
  roadLine: "#9AA5B8",
  walk: "#1B2843",
  plaza: "#122039",
  top: "#26334F",
  left: "#1B2744",
  right: "#131D35",
  win: "#0E1628",
  lit: "#FFB088",
  litR: "#E8935F",
  accent: "#FF6B2C",
  text: "#F5F7FA",
  muted: "#9AA5B8",
};

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
  stroke?: string;
}

function Box({ x, y, z = 0, w, d, h, top = COL.top, left = COL.left, right = COL.right, stroke }: BoxProps) {
  const sp = stroke ? { stroke, strokeWidth: 0.6, strokeLinejoin: "round" as const } : {};
  return (
    <g>
      <polygon points={poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={left} {...sp} />
      <polygon points={poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} fill={right} {...sp} />
      <polygon points={poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={top} {...sp} />
    </g>
  );
}

/* Барилгын цонхнууд — детерминист "санамсаргүй" гэрэлтэй */
function Windows({
  x,
  y,
  w,
  d,
  h,
  seed,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  seed: number;
}) {
  const ww = 0.38;
  const wh = 0.42;
  const gap = 0.36;
  const out: JSX.Element[] = [];
  const floors: number[] = [];
  for (let z = 0.5; z + wh < h - 0.25; z += 0.82) floors.push(z);

  const face = (len: number) => {
    const n = Math.max(1, Math.floor((len - 0.5 + gap) / (ww + gap)));
    const used = n * ww + (n - 1) * gap;
    const start = (len - used) / 2;
    return Array.from({ length: n }, (_, i) => start + i * (ww + gap));
  };

  // зүүн нүүр (y = y + d)
  face(w).forEach((u, i) =>
    floors.forEach((z, j) => {
      const hsh = (i * 13 + j * 7 + seed * 5) % 9;
      const lit = hsh < 2;
      out.push(
        <polygon
          key={`l${i}-${j}`}
          points={poly([[x + u, y + d, z], [x + u + ww, y + d, z], [x + u + ww, y + d, z + wh], [x + u, y + d, z + wh]])}
          fill={lit ? COL.lit : COL.win}
          opacity={lit ? 0.9 : 1}
          data-twinkle={lit && hsh === 0 ? "" : undefined}
        />,
      );
    }),
  );
  // баруун нүүр (x = x + w)
  face(d).forEach((u, i) =>
    floors.forEach((z, j) => {
      const hsh = (i * 11 + j * 5 + seed * 3) % 10;
      const lit = hsh < 2;
      out.push(
        <polygon
          key={`r${i}-${j}`}
          points={poly([[x + w, y + u, z], [x + w, y + u + ww, z], [x + w, y + u + ww, z + wh], [x + w, y + u, z + wh]])}
          fill={lit ? COL.litR : COL.win}
          opacity={lit ? 0.75 : 0.9}
        />,
      );
    }),
  );
  return <g>{out}</g>;
}

function Building(props: BoxProps & { seed: number }) {
  const { seed, ...box } = props;
  return (
    <g>
      <Box {...box} />
      <Windows x={box.x} y={box.y} w={box.w} d={box.d} h={box.h} seed={seed} />
      {/* дээвэр дээрх хашлага */}
      <polyline
        points={poly([[box.x, box.y + box.d, box.h], [box.x + box.w, box.y + box.d, box.h], [box.x + box.w, box.y, box.h]])}
        fill="none"
        stroke="#33415F"
        strokeWidth="1.2"
      />
    </g>
  );
}

/* Гэр */
function Ger({ x, y }: { x: number; y: number }) {
  const r = 0.95;
  const h = 0.72;
  const [cx, cy] = pr(x, y, 0);
  const rx = 1.2247 * r * S;
  const ry = 0.7071 * r * S;
  const top = cy - h * S;
  const rr = 1.1;
  return (
    <g>
      <ellipse cx={cx} cy={cy + 2} rx={rx + 4} ry={ry + 2} fill="#000" opacity=".25" />
      <path
        d={`M${f(cx - rx)},${f(top)} L${f(cx - rx)},${f(cy)} A${f(rx)} ${f(ry)} 0 0 0 ${f(cx + rx)},${f(cy)} L${f(cx + rx)},${f(top)} A${f(rx)} ${f(ry)} 0 0 1 ${f(cx - rx)},${f(top)} Z`}
        fill="#C9D1DE"
      />
      <path
        d={`M${f(cx - rx)},${f(top + 6)} A${f(rx)} ${f(ry)} 0 0 0 ${f(cx + rx)},${f(top + 6)}`}
        fill="none"
        stroke={COL.accent}
        strokeWidth="2"
        opacity=".85"
      />
      <path
        d={`M${f(cx - rx * rr)},${f(top)} L${f(cx)},${f(top - 0.62 * S)} L${f(cx + rx * rr)},${f(top)} A${f(rx * rr)} ${f(ry * rr)} 0 0 1 ${f(cx - rx * rr)},${f(top)} Z`}
        fill="#E6EAF1"
      />
      <ellipse cx={cx} cy={top - 0.62 * S + 2} rx="5" ry="2.6" fill={COL.accent} />
      <rect x={cx - 5} y={cy + ry - 17} width="10" height="14" rx="1.5" fill={COL.accent} />
    </g>
  );
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const [cx, cy] = pr(x, y, 0);
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={9 * s} ry={4.5 * s} fill="#000" opacity=".28" />
      <rect x={cx - 1.5} y={cy - 16 * s} width="3" height={16 * s} fill="#2A3655" />
      <circle cx={cx} cy={cy - 22 * s} r={10 * s} fill="#1E3150" />
      <circle cx={cx - 3 * s} cy={cy - 25 * s} r={5 * s} fill="#2B4268" />
    </g>
  );
}

function Lamp({ x, y }: { x: number; y: number }) {
  const [cx, cy] = pr(x, y, 0);
  return (
    <g>
      <line x1={cx} y1={cy} x2={cx} y2={cy - 30} stroke="#33415F" strokeWidth="2" />
      <circle cx={cx} cy={cy - 31} r="3" fill={COL.accent} />
      <circle cx={cx} cy={cy - 31} r="9" fill={COL.accent} opacity=".14" />
    </g>
  );
}

/* Мотоцикльтой хүргэлтийн ажилтан (0,0 = газарт хүрэх цэг) */
function Courier() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="15" ry="3.5" fill="#000" opacity=".4" />
      <rect x="-17" y="-25" width="12" height="11" rx="1.5" fill={COL.accent} />
      <path d="M-11-25v11" stroke="#B4471A" strokeWidth="1.4" />
      <circle cx="-9" cy="-5.5" r="5" fill={COL.sky} stroke={COL.muted} strokeWidth="2" />
      <circle cx="9" cy="-5.5" r="5" fill={COL.sky} stroke={COL.muted} strokeWidth="2" />
      <path d="M-11-9 L-3-13 H6 L10-6 L6-6 L3-9 H-6 Z" fill="#E8EDF4" />
      <path d="M6-13 L9-19" stroke={COL.muted} strokeWidth="2" strokeLinecap="round" />
      <path d="M-2-13 L2-24" stroke={COL.text} strokeWidth="5" strokeLinecap="round" />
      <path d="M1-21 L8-18" stroke={COL.text} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="3" cy="-28" r="5" fill={COL.accent} />
      <path d="M4-30 h4" stroke={COL.sky} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/* Замын төв шугам = мотоциклын зам */
const ROAD = { a: 5, b: 12.5 };
const roadPathD = (() => {
  const pts = [pr(ROAD.a, ROAD.a), pr(ROAD.b, ROAD.a), pr(ROAD.b, ROAD.b), pr(ROAD.a, ROAD.b)];
  return `M${pts.map(([a, b]) => `${f(a)},${f(b)}`).join(" L")} Z`;
})();
const BIKE_START = pr(8.5, ROAD.b);

/* Дэлгүүр */
const SHOP = { x: 5.4, y: 1.7, w: 3.2, d: 2.2, h: 2.2 };
const SY = SHOP.y + SHOP.d; // урд нүүрний хавтгай
const DOOR_X = 8.05;

function Shop({ glowRef }: { glowRef: React.RefObject<SVGGElement> }) {
  const tiles = [5.95, 6.5, 7.05];
  const [tx, ty] = pr(6.1, SHOP.y + 1.3, 2.36);
  return (
    <g>
      <Box {...SHOP} top="#2A3657" left="#202D4D" right="#16213C" />
      {/* гэрлийн туяа газарт */}
      <g ref={glowRef} opacity=".6">
        <polygon points={poly([[5.6, SY, 0], [7.6, SY, 0], [7.9, SY + 1.1, 0], [5.3, SY + 1.1, 0]])} fill={COL.accent} opacity=".12" />
        <polygon points={poly([[5.75, SY, 0.42], [7.55, SY, 0.42], [7.55, SY, 1.86], [5.75, SY, 1.86]])} fill={COL.accent} opacity=".35" />
      </g>
      {/* дэлгүүрийн цонх = вэб сайтын дэлгэц */}
      <polygon points={poly([[5.85, SY, 0.5], [7.45, SY, 0.5], [7.45, SY, 1.78], [5.85, SY, 1.78]])} fill="#0B1220" />
      <polygon points={poly([[5.85, SY, 1.58], [7.45, SY, 1.58], [7.45, SY, 1.78], [5.85, SY, 1.78]])} fill={COL.accent} />
      {tiles.map((u) => (
        <g key={u}>
          <polygon points={poly([[u, SY, 0.92], [u + 0.4, SY, 0.92], [u + 0.4, SY, 1.38], [u, SY, 1.38]])} fill="#26365A" />
          <polygon points={poly([[u, SY, 0.66], [u + 0.28, SY, 0.66], [u + 0.28, SY, 0.78], [u, SY, 0.78]])} fill={COL.lit} />
        </g>
      ))}
      {/* хаалга */}
      <polygon points={poly([[DOOR_X - 0.28, SY, 0], [DOOR_X + 0.28, SY, 0], [DOOR_X + 0.28, SY, 1.4], [DOOR_X - 0.28, SY, 1.4]])} fill="#0E1628" stroke="#33415F" strokeWidth=".8" />
      {/* саравч */}
      <polygon points={poly([[5.5, SY, 1.98], [8.55, SY, 1.98], [8.55, SY + 0.55, 1.7], [5.5, SY + 0.55, 1.7]])} fill={COL.accent} />
      <polygon points={poly([[5.5, SY + 0.55, 1.7], [8.55, SY + 0.55, 1.7], [8.55, SY + 0.55, 1.6], [5.5, SY + 0.55, 1.6]])} fill="#C2501F" />
      {/* баруун цонх */}
      <polygon points={poly([[SHOP.x + SHOP.w, 2.2, 0.7], [SHOP.x + SHOP.w, 3.3, 0.7], [SHOP.x + SHOP.w, 3.3, 1.6], [SHOP.x + SHOP.w, 2.2, 1.6]])} fill={COL.litR} opacity=".5" />
      {/* дээврийн самбар */}
      <polygon points={poly([[5.9, SHOP.y + 1.3, 2.2], [8.3, SHOP.y + 1.3, 2.2], [8.3, SHOP.y + 1.3, 2.75], [5.9, SHOP.y + 1.3, 2.75]])} fill="#0E1628" stroke={COL.accent} strokeWidth="1" />
      <text
        transform={`matrix(${C} 0.5 0 1 ${f(tx)} ${f(ty)})`}
        fill={COL.accent}
        fontSize="9"
        fontWeight="800"
        letterSpacing="0.4"
        fontFamily="var(--font-inter), system-ui, sans-serif"
      >
        ДЭЛГҮҮР
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------ */

export function IsometricCity() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const bikeRef = useRef<SVGGElement>(null);
  const flipRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGGElement>(null);
  const boxesRef = useRef<SVGGElement>(null);

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
        // 1) Хүргэлтийн мотоцикл — зам дагуу тасралтгүй
        let lastX = BIKE_START[0];
        master.add(
          gsap.to(bikeRef.current, {
            duration: 22,
            ease: "none",
            repeat: -1,
            motionPath: { path: pathRef.current!, start: 0.85, end: 1.85 },
            onUpdate() {
              const x = Number(gsap.getProperty(bikeRef.current, "x"));
              const dx = x - lastX;
              if (Math.abs(dx) > 0.01) flipRef.current?.setAttribute("transform", dx < 0 ? "scale(-1,1)" : "");
              lastX = x;
            },
          }),
          0,
        );

        // 2) Дэлгүүрийн дэлгэцийн гэрэл
        // 3 секунд тутам нэг бүтэн анивчилт (1.5с гэрэлтэж, 1.5с бүдгэрнэ)
        master.add(
          gsap.fromTo(glowRef.current, { opacity: 0.45 }, { opacity: 1, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 }),
          0,
        );

        // 3) Дэлгүүрээс гарах хайрцагнууд
        const boxes = boxesRef.current ? Array.from(boxesRef.current.children) : [];
        // Хаалганаас (y≈3.95) мотоциклын замын төв шугам (y=5) хүртэл
        const dist = ROAD.a - SY;
        const dx = -dist * C * S;
        const dy = dist * 0.5 * S;
        const BOX_EVERY = 4; // секунд тутам нэг хайрцаг
        const cycle = BOX_EVERY * boxes.length;
        boxes.forEach((b, i) => {
          const tl = gsap.timeline({ repeat: -1, delay: i * BOX_EVERY, repeatDelay: cycle - 2.2 });
          tl.fromTo(b, { x: 0, y: 0, opacity: 0 }, { opacity: 1, duration: 0.3 })
            .to(b, { x: dx, y: dy, duration: 1.8, ease: "power1.inOut" }, "<")
            .to(b, { opacity: 0, duration: 0.4 });
          master.add(tl, 0);
        });

        // 4) Цонхны гэрэл анивчих
        gsap.utils.toArray<SVGElement>("[data-twinkle]", svgRef.current).forEach((w, i) => {
          master.add(
            gsap.to(w, { opacity: 0.25, duration: 1.6 + (i % 3) * 0.7, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.9 }),
            0,
          );
        });

        // 5) Тэнгэрийн шошгууд хөвнө
        gsap.utils.toArray<HTMLElement>("[data-float]", root).forEach((el, i) => {
          master.add(gsap.to(el, { y: -6, duration: 2.2 + i * 0.35, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.4 }), 0);
        });
      }, root);

      // Дэлгэцээс гарвал зогсооно (CPU хэмнэнэ)
      const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? master.resume() : master.pause()), { threshold: 0 });
      io.observe(root);
      const onReduce = () => {
        if (reduce.matches) master.pause();
      };
      reduce.addEventListener("change", onReduce);

      cleanup = () => {
        io.disconnect();
        reduce.removeEventListener("change", onReduce);
        master.kill();
        ctx.revert();
      };
    };

    // Эхний зурагтыг саатуулахгүйн тулд сул үед ачаална
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(() => void start(), { timeout: 1500 }) : window.setTimeout(() => void start(), 300);

    return () => {
      cancelled = true;
      if (!w.requestIdleCallback) window.clearTimeout(id);
      cleanup?.();
    };
  }, []);

  const boxSize = 0.36;

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[640px] select-none lg:max-w-none">
      {/* Тэнгэрт хөвөх шошгууд */}
      <div className="absolute inset-x-0 -top-3.5 z-10 flex items-center justify-center gap-1 sm:top-0 sm:gap-2" aria-hidden="true">
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
              {/* Гар утсанд урт шошго 2 мөрөнд хуваагдана */}
              <span className="max-w-[5.6rem] leading-[1.15] sm:max-w-none sm:whitespace-nowrap">{label}</span>
            </span>
          </div>
        ))}
      </div>

      <svg
        ref={svgRef}
        viewBox="70 64 660 554"
        className="h-auto w-full"
        role="img"
        aria-label="Улаанбаатарын жижиг хороолол: дэлгүүрээс захиалгын хайрцаг гарч, мотоциклтой хүргэлтийн ажилтан зам дагуу хүргэж байна"
      >
        <defs>
          <linearGradient id="mt-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".18" stopColor="#fff" />
            <stop offset=".82" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="mt-mask">
            <rect x="70" y="64" width="660" height="554" fill="url(#mt-fade)" />
          </mask>
        </defs>
        {/* Уулс */}
        <g mask="url(#mt-mask)">
        <path d="M40 420 L95 330 L140 350 L215 262 L262 292 L330 214 L380 236 L455 176 L520 228 L580 205 L650 280 L700 262 L760 330 V430 H40Z" fill="#0F182C" />
        <path d="M40 430 L120 372 L190 392 L270 330 L340 362 L420 300 L500 340 L590 300 L660 350 L760 380 V440 H40Z" fill="#111B31" />
        </g>
        {[
          [110, 120], [200, 95], [300, 140], [520, 110], [610, 150], [690, 100], [160, 190], [660, 210],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.6 : 1} fill={COL.muted} opacity=".55" />
        ))}

        {/* Газрын хавтан */}
        <Box x={0} y={0} z={-0.6} w={14} d={14} h={0.6} top={COL.ground} left={COL.groundL} right={COL.groundR} />

        {/* Зам */}
        <polygon points={poly([[4.2, 4.2, 0], [13.3, 4.2, 0], [13.3, 13.3, 0], [4.2, 13.3, 0]])} fill={COL.road} />
        <polygon points={poly([[5.75, 5.75, 0], [11.75, 5.75, 0], [11.75, 11.75, 0], [5.75, 11.75, 0]])} fill={COL.walk} />
        <polygon points={poly([[6.05, 6.05, 0], [11.45, 6.05, 0], [11.45, 11.45, 0], [6.05, 11.45, 0]])} fill={COL.plaza} />
        <path d={roadPathD} fill="none" stroke={COL.roadLine} strokeOpacity=".35" strokeWidth="1.4" strokeDasharray="7 9" />
        <path ref={pathRef} d={roadPathD} fill="none" stroke="none" />
        {/* Явган хүний гарц */}
        {[0, 1, 2, 3, 4].map((i) => (
          <polygon
            key={i}
            points={poly([[12.0, 8.0 + i * 0.32, 0], [13.0, 8.0 + i * 0.32, 0], [13.0, 8.16 + i * 0.32, 0], [12.0, 8.16 + i * 0.32, 0]])}
            fill={COL.text}
            opacity=".22"
          />
        ))}

        {/* Барилгууд (араас урагш) */}
        <Building x={0.8} y={0.8} w={3.2} d={3} h={6.2} seed={1} />
        <Box x={1.4} y={1.3} z={6.2} w={0.8} d={0.8} h={0.5} />
        <line x1={pr(3.2, 1.6, 6.2)[0]} y1={pr(3.2, 1.6, 6.2)[1]} x2={pr(3.2, 1.6, 7.6)[0]} y2={pr(3.2, 1.6, 7.6)[1]} stroke="#33415F" strokeWidth="1.5" />
        <circle cx={pr(3.2, 1.6, 7.6)[0]} cy={pr(3.2, 1.6, 7.6)[1]} r="2.2" fill={COL.accent} />
        <Shop glowRef={glowRef} />
        <Building x={9.6} y={0.8} w={3.4} d={2.8} h={4.6} seed={2} />
        <Building x={0.8} y={6.2} w={2.8} d={4.6} h={3.8} seed={3} />
        <Building x={0.8} y={11.5} w={2.8} d={2.1} h={1.9} seed={4} />

        {/* Талбай */}
        <Tree x={7} y={7} />
        <Tree x={7.2} y={10.4} s={0.85} />
        <Tree x={10.9} y={6.9} s={0.9} />
        <Ger x={9.4} y={9.1} />
        <Lamp x={6.2} y={6.2} />
        <Lamp x={11.3} y={11.3} />
        <Tree x={13.6} y={2} s={0.8} />
        <Tree x={4} y={13.6} s={0.8} />

        {/* Дэлгүүрээс гарах хайрцагнууд */}
        <g ref={boxesRef}>
          {[0, 1].map((i) => (
            <g key={i} opacity={i === 0 ? 1 : 0} transform={i === 0 ? `translate(${f(-0.5 * C * S)} ${f(0.25 * S)})` : undefined}>
              <Box x={DOOR_X - boxSize / 2} y={SY + 0.05} w={boxSize} d={boxSize} h={boxSize} top="#FF8A55" left={COL.accent} right="#C2501F" />
            </g>
          ))}
        </g>

        {/* Хүргэлтийн ажилтан */}
        <g ref={bikeRef} transform={`translate(${f(BIKE_START[0])} ${f(BIKE_START[1])})`}>
          <g ref={flipRef}>
            <g transform="scale(1.3)">
              <Courier />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
