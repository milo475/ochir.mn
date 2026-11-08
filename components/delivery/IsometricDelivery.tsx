"use client";

import { useRef } from "react";
import { Building, COL, HALF, LOADER, Lamp, Loader, Rider, ST, SY, Shop, Tag, Tree, WALKER, Walker, f, pathD, poly, pr } from "@/components/iso/kit";
import { animateBikes, animateBobs, animateGlow, animateHandoff, useIsoScene } from "@/components/iso/scene";

/**
 * IsometricCity-ийн зүүн үзэгдэл (дэлгүүр + ачих талбай + 5 хүргэгч + гудамж) — томруулсан.
 * Хотын координатыг ашиглаж, viewBox-оор тайрна.
 */
const VB = { x: 60, y: 36, w: 470, h: 400 };
const LANE_PATH = pathD([[-4, ST - 0.38], [14, ST - 0.38], [14, ST + 0.38], [-4, ST + 0.38]], true);
const BIKES = [
  { dur: 15, start: 0.05, tag: "#1047", at: [1.5, ST - 0.38] },
  { dur: 12, start: 0.4, tag: "#1052", at: [9, ST - 0.38] },
  { dur: 19, start: 0.74, tag: "#1049", at: [4, ST + 0.38] },
] as const;

export function IsometricDelivery() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const backRef = useRef<SVGGElement>(null);
  const midRef = useRef<SVGGElement>(null);
  const frontRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGGElement>(null);
  const walkerBoxRef = useRef<SVGRectElement>(null);
  const flyBoxRef = useRef<SVGGElement>(null);
  const bikesRef = useRef<SVGGElement>(null);
  const bikeTagsRef = useRef<SVGGElement>(null);
  const laneRef = useRef<SVGPathElement>(null);

  useIsoScene(
    rootRef,
    (gsap, master) => {
      animateBikes(gsap, master, bikesRef.current, bikeTagsRef.current, BIKES.map((b) => ({ dur: b.dur, start: b.start, path: laneRef.current })));
      animateBobs(gsap, master, svgRef.current);
      animateGlow(gsap, master, glowRef.current);
      animateHandoff(gsap, master, flyBoxRef.current, walkerBoxRef.current, WALKER);
    },
    () => [
      [backRef.current, 6],
      [midRef.current, 12],
      [frontRef.current, 20],
    ],
  );

  const [walkerX, walkerY] = pr(WALKER[0], WALKER[1]);
  const [loaderX, loaderY] = pr(LOADER[0], LOADER[1]);

  return (
    <div ref={rootRef} className="relative">
      <svg
        ref={svgRef}
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        className="h-auto w-full select-none"
        role="img"
        aria-label="Изометрик дүрслэл: дэлгүүрийн хаалганаас хүргэлтийн ажилтан хайрцаг авч, нөгөө нь мотоциклдоо ачиж, гурав нь гудамжаар хүргэлтэд явж байна"
      >
        <defs>
          <linearGradient id="dl-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".12" stopColor="#fff" />
            <stop offset=".88" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="dl-mask" maskUnits="userSpaceOnUse" x={VB.x} y={VB.y - 40} width={VB.w} height={VB.h + 80}>
            <rect x={VB.x} y={VB.y - 40} width={VB.w} height={VB.h + 80} fill="url(#dl-fade)" />
          </mask>
        </defs>
        <g mask="url(#dl-mask)">
          <g ref={backRef} style={{ willChange: "transform" }}>
            {[
              [110, 92], [190, 76], [300, 84], [420, 72], [480, 120], [150, 140],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={i % 2 ? 1 : 1.5} fill={COL.muted} opacity=".5" />
            ))}
            <polygon points={poly([[-5, 8, 0], [12, 8, 0], [12, 12, 0], [-5, 12, 0]])} fill={COL.far} />
            <Building x={-1} y={8.4} w={2.6} d={2.4} h={3.2} seed={3} />
            <Building x={3} y={8.6} w={3} d={2.6} h={3.2} seed={1} />
          </g>

          <g ref={midRef} style={{ willChange: "transform" }}>
            {/* газар */}
            <polygon points={poly([[-5, 12, 0], [14, 12, 0], [14, 21.5, 0], [-5, 21.5, 0]])} fill={COL.ground} />
            <polygon points={poly([[-5, 21.5, 0], [14, 21.5, 0], [14, 21.5, -0.45], [-5, 21.5, -0.45]])} fill={COL.groundL} />
            {/* гудамж */}
            <polygon points={poly([[-5, ST - HALF, 0], [14, ST - HALF, 0], [14, ST + HALF, 0], [-5, ST + HALF, 0]])} fill={COL.road} />
            <path d={pathD([[-5, ST], [14, ST]])} fill="none" stroke={COL.muted} strokeOpacity=".32" strokeWidth="1.4" strokeDasharray="7 9" />
            <path
              d={[0, 1, 2, 3, 4].map((i) => `M${poly([[9.2 + i * 0.32, ST - 0.6, 0], [9.36 + i * 0.32, ST - 0.6, 0], [9.36 + i * 0.32, ST + 0.6, 0], [9.2 + i * 0.32, ST + 0.6, 0]]).replace(/ /g, "L")}Z`).join("")}
              fill={COL.text}
              opacity=".2"
            />
            {/* ачих талбай */}
            <polygon points={poly([[0.2, SY, 0], [9.6, SY, 0], [9.6, ST - HALF - 0.1, 0], [0.2, ST - HALF - 0.1, 0]])} fill={COL.walk} />
            <path d={[7, 8, 9].map((u) => `M${pr(u, SY + 0.6).map(f).join(",")}L${pr(u, ST - HALF - 0.4).map(f).join(",")}`).join("")} stroke={COL.muted} strokeOpacity=".25" strokeWidth="1.2" />
            <Building x={-2.6} y={12.4} w={3} d={2.6} h={2.4} seed={5} />
            <Building x={6.6} y={12.2} w={2.8} d={2.4} h={3.4} seed={6} />
            <Shop glowRef={glowRef} />
            <Tree x={0.4} y={17.6} s={0.9} />
            <Tree x={11.2} y={17.4} s={0.9} />
            <Lamp x={10.2} y={18.6} />

            <g transform={`translate(${f(loaderX)} ${f(loaderY)}) scale(1.15)`}>
              <Loader />
            </g>
            <g transform={`translate(${f(walkerX)} ${f(walkerY)}) scale(1.15)`}>
              <Walker boxRef={walkerBoxRef} />
            </g>
            <g ref={flyBoxRef} opacity="0">
              <rect x="-5" y="-4" width="10" height="8" rx="1" fill="#FF8A55" stroke={COL.accentDark} strokeWidth=".8" />
            </g>

            <path ref={laneRef} d={LANE_PATH} fill="none" />
            <g ref={bikesRef}>
              {BIKES.map((b) => {
                const [bx, by] = pr(b.at[0], b.at[1]);
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

        <g ref={frontRef} style={{ willChange: "transform" }}>
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
            {BIKES.map((b) => {
              const [bx, by] = pr(b.at[0], b.at[1]);
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
        </g>
      </svg>
    </div>
  );
}
