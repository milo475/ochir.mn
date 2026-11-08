"use client";

import { useRef } from "react";
import {
  BIKES, Box, Building, COL, DOOR_X, Ger, HALF, LOADER, LONG_PATH, Lamp, OPEN_X, ORDER_PATH, OchirSign, OrderTicket, RING, RING_PATH,
  Rider, ST, SY, Shop, Studio, TICKET_STARTS, Tag, Tree, VB_H, VB_W, WALKER, Walker, Loader, f, pathD, poly, pr,
} from "./iso/kit";
import { animateBikes, animateBobs, animateChecks, animateGlow, animateHandoff, animateNeon, animateScreens, useIsoScene } from "./iso/scene";

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

  useIsoScene(
    rootRef,
    (gsap, master, root) => {
      animateBikes(
        gsap,
        master,
        bikesRef.current,
        bikeTagsRef.current,
        BIKES.map((b) => ({ dur: b.dur, start: b.start, path: (b.path === "long" ? longRef : ringRef).current })),
      );
      animateBobs(gsap, master, svgRef.current);
      gsap.utils.toArray<HTMLElement>("[data-float]", root).forEach((el, i) => {
        master.add(gsap.to(el, { y: -6, duration: 2.2 + i * 0.35, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.4 }), 0);
      });
      animateGlow(gsap, master, glowRef.current);
      animateHandoff(gsap, master, flyBoxRef.current, walkerBoxRef.current, WALKER);
      animateScreens(gsap, master, svgRef.current);
      animateChecks(gsap, master, checksRef.current);
      animateNeon(gsap, master, neonRef.current);

      // Вэб студи → гудамж → дэлгүүр: "ирсэн захиалга" 8с тутам
      const dot = orderDotRef.current;
      if (dot && orderPathRef.current) {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 8 - 4.2, delay: 1 });
        tl.set(dot, { opacity: 0 })
          .to(dot, { opacity: 1, duration: 0.3 })
          .to(dot, { duration: 3.6, ease: "power1.inOut", motionPath: { path: orderPathRef.current } }, 0)
          .to(dot, { opacity: 0, duration: 0.3 }, 3.9);
        master.add(tl, 0);
      }

      // Захиалгын тасалбарууд 4с тутам доод ирмэгээс дэлгүүр рүү
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
    },
    // Parallax: арын 6px, гудамж/хүмүүс 12px, урд шошго 20px
    () => [
      [backRef.current, 6],
      [midRef.current, 12],
      [frontRef.current, 20],
      [chipsRef.current, 20],
    ],
  );

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
