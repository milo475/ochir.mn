"use client";

import { useEffect, type RefObject } from "react";
import { DOOR_X, SY, pr } from "./kit";

type Gsap = typeof import("gsap").gsap;
type Timeline = ReturnType<Gsap["timeline"]>;

/**
 * Изометрик үзэгдлийн нийтлэг амьдрал:
 *  - GSAP-ийг idle үед хойшлуулж ачаална
 *  - prefers-reduced-motion үед юу ч хөдлөхгүй (статик хувилбар)
 *  - дэлгэцээс гарвал master timeline зогсоно
 *  - scroll parallax: давхарга бүр [элемент, хамгийн их px]
 */
export function useIsoScene(
  rootRef: RefObject<HTMLElement>,
  build: (gsap: Gsap, master: Timeline, root: HTMLElement) => void,
  layers: () => [Element | null, number][] = () => [],
) {
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
      const ctx = gsap.context(() => build(gsap, master, root), root);

      let raf = 0;
      const ls = layers();
      const onScroll = () => {
        if (raf || !ls.length) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = root.getBoundingClientRect();
          const vh = window.innerHeight;
          const p = Math.min(1, Math.max(0, (vh - r.top) / Math.max(1, vh + r.height)));
          for (const [el, amt] of ls) if (el) (el as HTMLElement).style.transform = `translate3d(0, ${(-amt * p).toFixed(2)}px, 0)`;
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
    // build/layers нь render бүрт шинээр үүсдэг ч зөвхөн mount үед ажиллуулна
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* --- Дахин ашиглагдах анимацийн хэсгүүд -------------------------------- */

export interface BikeSpec {
  dur: number;
  start: number;
  path: SVGPathElement | null;
}

/** Мотоциклууд замаар loop хийнэ; чиглэлээрээ эргэж, шошго нь дагана */
export function animateBikes(gsap: Gsap, master: Timeline, bikes: Element | null, tags: Element | null, specs: BikeSpec[]) {
  const bikeEls = bikes ? Array.from(bikes.children) : [];
  const tagEls = tags ? Array.from(tags.children) : [];
  specs.forEach((b, i) => {
    const el = bikeEls[i] as SVGGElement | undefined;
    const tag = tagEls[i] as SVGGElement | undefined;
    const flip = el?.firstElementChild as SVGGElement | null;
    if (!el || !b.path) return;
    let lastX = Number.NaN;
    master.add(
      gsap.to(el, {
        duration: b.dur,
        ease: "none",
        repeat: -1,
        motionPath: { path: b.path, start: b.start, end: b.start + 1 },
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
}

/** [data-bob] шошгууд хөвнө */
export function animateBobs(gsap: Gsap, master: Timeline, scope: Element | null) {
  gsap.utils.toArray<SVGElement>("[data-bob]", scope).forEach((t, i) => {
    master.add(gsap.to(t, { y: -4, duration: 1.4 + (i % 3) * 0.3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.25 }), 0);
  });
}

/** Дэлгүүрийн цонхны гэрэл */
export function animateGlow(gsap: Gsap, master: Timeline, glow: Element | null) {
  if (glow) master.add(gsap.fromTo(glow, { opacity: 0.45 }, { opacity: 1, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 }), 0);
}

/** 5с тутам хаалганаас хайрцаг гарч ажилтны гарт очно */
export function animateHandoff(gsap: Gsap, master: Timeline, fly: Element | null, held: Element | null, hand: [number, number]) {
  if (!fly || !held) return;
  const [dx0, dy0] = pr(DOOR_X, SY + 0.05, 0.55);
  const [hx, hy] = pr(hand[0], hand[1]);
  gsap.set(held, { opacity: 0 });
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 - 3.4 });
  tl.fromTo(fly, { x: dx0, y: dy0, opacity: 0, scale: 0.7, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3 })
    .to(fly, { x: hx + 8, y: hy - 19, duration: 1.1, ease: "power1.inOut" })
    .set(fly, { opacity: 0 })
    .set(held, { opacity: 1 })
    .to(held, { opacity: 0, duration: 0.4, delay: 1.6 });
  master.add(tl, 0);
}

/** [data-screen] дэлгэцүүд 2–4с тутам өөр өөр цагт шинэчлэгдэнэ */
export function animateScreens(gsap: Gsap, master: Timeline, scope: Element | null) {
  gsap.utils.toArray<SVGElement>("[data-screen]", scope).forEach((sc, i) => {
    const tl = gsap.timeline({ repeat: -1, delay: (i * 0.73) % 3, repeatDelay: 2 + ((i * 7) % 5) * 0.5 });
    tl.to(sc, { opacity: 0.15, duration: 0.12 }).to(sc, { opacity: 1, duration: 0.35, ease: "power1.out" });
    master.add(tl, 0);
  });
}

/** "✓" хааяа дээш хөвж арилна */
export function animateChecks(gsap: Gsap, master: Timeline, group: Element | null) {
  (group ? Array.from(group.children) : []).forEach((ck, i) => {
    const tl = gsap.timeline({ repeat: -1, delay: 1.5 + i * 2.6, repeatDelay: 6 + i });
    tl.fromTo(ck, { y: 0, opacity: 0 }, { y: -10, opacity: 1, duration: 0.4 }).to(ck, { y: -30, opacity: 0, duration: 1.1, ease: "power1.in" });
    master.add(tl, 0);
  });
}

/** Неон хаяг анивчина */
export function animateNeon(gsap: Gsap, master: Timeline, neon: Element | null) {
  if (neon) master.add(gsap.to(neon, { opacity: 0.7, duration: 0.08, repeat: -1, yoyo: true, repeatDelay: 3.7, ease: "none" }), 0);
}
