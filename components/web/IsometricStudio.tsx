"use client";

import { useRef } from "react";
import { Box, Building, COL, HALF, Lamp, OPEN_X, ST, Studio, Tree, f, pathD, poly, pr } from "@/components/iso/kit";
import { animateChecks, animateNeon, animateScreens, useIsoScene } from "@/components/iso/scene";

/**
 * IsometricCity-ийн баруун үзэгдэл — WEB · SYSTEM студи (2 давхар, 10 хүн) томруулсан.
 * Хотын координатыг ашиглаж, viewBox-оор тайрна.
 */
const VB = { x: 640, y: 30, w: 500, h: 410 };

export function IsometricStudio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const backRef = useRef<SVGGElement>(null);
  const midRef = useRef<SVGGElement>(null);
  const frontRef = useRef<SVGGElement>(null);
  const neonRef = useRef<SVGGElement>(null);
  const checksRef = useRef<SVGGElement>(null);

  useIsoScene(
    rootRef,
    (gsap, master) => {
      animateScreens(gsap, master, svgRef.current);
      animateChecks(gsap, master, checksRef.current);
      animateNeon(gsap, master, neonRef.current);
    },
    () => [
      [backRef.current, 6],
      [midRef.current, 12],
      [frontRef.current, 20],
    ],
  );

  const checkAt: [number, number][] = [
    pr(OPEN_X - 0.42, 3.4, 1.5),
    pr(OPEN_X - 0.42, 6.6, 3.5),
    pr(OPEN_X - 0.42, 1.8, 3.5),
    pr(OPEN_X - 0.42, 8.2, 1.5),
    pr(OPEN_X - 0.42, 5.0, 3.5),
  ];

  return (
    <div ref={rootRef} className="relative">
      <svg
        ref={svgRef}
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        className="h-auto w-full select-none"
        role="img"
        aria-label="Изометрик дүрслэл: урд хана нь онгорхой 2 давхар WEB · SYSTEM студид 10 хүн компьютер дээр өөр өөр вэб хуудас хийж байна"
      >
        <defs>
          <linearGradient id="st-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".1" stopColor="#fff" />
            <stop offset=".9" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="st-mask" maskUnits="userSpaceOnUse" x={VB.x} y={VB.y - 40} width={VB.w} height={VB.h + 80}>
            <rect x={VB.x} y={VB.y - 40} width={VB.w} height={VB.h + 80} fill="url(#st-fade)" />
          </mask>
        </defs>
        <g mask="url(#st-mask)">
          <g ref={backRef} style={{ willChange: "transform" }}>
            {[
              [690, 70], [760, 50], [880, 84], [1010, 46], [1090, 96], [720, 150],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={i % 2 ? 1 : 1.5} fill={COL.muted} opacity=".5" />
            ))}
            <polygon points={poly([[9, -6, 0], [13, -6, 0], [13, 12, 0], [9, 12, 0]])} fill={COL.far} />
            <Building x={10.4} y={1.2} w={2.4} d={2.8} h={3.6} seed={2} />
            <Building x={10.6} y={6} w={2.2} d={2.6} h={2.6} seed={4} />
          </g>

          <g ref={midRef} style={{ willChange: "transform" }}>
            {/* газар */}
            <polygon points={poly([[13, -6, 0], [21.5, -6, 0], [21.5, 14, 0], [13, 14, 0]])} fill={COL.ground} />
            <polygon points={poly([[13, 14, 0], [21.5, 14, 0], [21.5, 14, -0.45], [13, 14, -0.45]])} fill={COL.groundL} />
            <polygon points={poly([[21.5, -6, 0], [21.5, 14, 0], [21.5, 14, -0.45], [21.5, -6, -0.45]])} fill={COL.groundR} />
            {/* гудамж */}
            <polygon points={poly([[ST - HALF, -6, 0], [ST + HALF, -6, 0], [ST + HALF, 14, 0], [ST - HALF, 14, 0]])} fill={COL.road} />
            <path d={pathD([[ST, -6], [ST, 14]])} fill="none" stroke={COL.muted} strokeOpacity=".32" strokeWidth="1.4" strokeDasharray="7 9" />
            {/* явган зам (студийн урд) */}
            <polygon points={poly([[OPEN_X, 0.4, 0], [ST - HALF - 0.05, 0.4, 0], [ST - HALF - 0.05, 9.8, 0], [OPEN_X, 9.8, 0]])} fill={COL.walk} />

            <Building x={13.4} y={-1.6} w={1.4} d={4} h={5.4} seed={7} />
            <Box x={15} y={-3.4} w={4} d={3.4} h={1.6} />
            <Studio neonRef={neonRef} />
            <Tree x={16} y={11} s={0.85} />
            <Tree x={18.2} y={11.6} s={0.75} />
            <Lamp x={ST - HALF - 0.3} y={10.4} />
            <Tree x={14.2} y={12.6} s={0.8} />
          </g>
        </g>

        <g ref={frontRef} style={{ willChange: "transform" }}>
          <g ref={checksRef}>
            {checkAt.map(([cx, cy], i) => (
              <g key={i} transform={`translate(${f(cx)} ${f(cy - 34)})`} opacity="0">
                <circle r="7" fill={COL.accent} />
                <path d="m-3 0 2 2 4-4.5" fill="none" stroke={COL.sky} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
