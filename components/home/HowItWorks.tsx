"use client";

import { useEffect, useRef } from "react";
import { SectionTitle } from "@/components/SectionTitle";

const steps = [
  { title: "Багцаа сонго", text: "Хэрэгтэй үйлчилгээ, багцаа сонгоод 1 минутад захиалга өгнө." },
  { title: "Бид холбогдоно", text: "24 цагийн дотор залгаж, үнийн санал, нөхцөлөө тохирно." },
  { title: "Ажил эхэлнэ", text: "Хүргэлт, сайт, чатбот ажиллаж эхэлнэ. Явцыг та хянана." },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Хөдөлгөөнгүй горим: шугам, цэгүүдийг шууд бүрэн харуулна
      el.querySelectorAll<HTMLElement>("[data-line-h],[data-line-v]").forEach((n) => (n.style.transform = "none"));
      el.querySelectorAll<HTMLElement>("[data-dot]").forEach((n) => n.classList.add("!bg-accent", "!text-bg", "!border-accent"));
      return;
    }
    let revert: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const dots = gsap.utils.toArray<HTMLElement>("[data-dot]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        });
        tl.fromTo("[data-line-h]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0).fromTo(
          "[data-line-v]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", duration: 1 },
          0,
        );
        dots.forEach((d, i) => {
          tl.fromTo(
            d,
            { backgroundColor: "#111A2E", color: "#9AA5B8", borderColor: "#1E2A44" },
            { backgroundColor: "#FF6B2C", color: "#0B1220", borderColor: "#FF6B2C", duration: 0.12 },
            (i / (dots.length - 1)) * 0.94,
          );
        });
      }, el);
      revert = () => ctx.revert();
    })();
    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section className="mt-16 border-y border-line bg-card/30 py-16 sm:mt-24 sm:py-20">
      <div className="container-page">
        <SectionTitle eyebrow="Хэрхэн ажилладаг" title="3 алхамд эхэлнэ" center />
        <div ref={ref} className="relative mx-auto mt-12 max-w-4xl">
          {/* холбох шугам — desktop хэвтээ, mobile босоо */}
          <div className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-line md:block" aria-hidden="true">
            <div data-line-h className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
          </div>
          <div className="absolute bottom-10 left-6 top-6 w-px bg-line md:hidden" aria-hidden="true">
            <div data-line-v className="h-full origin-top bg-accent" style={{ transform: "scaleY(0)" }} />
          </div>
          <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5 md:flex-col md:items-center md:text-center">
                <span
                  data-dot
                  className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-card text-base font-bold text-muted"
                >
                  {i + 1}
                </span>
                <div className="pt-1.5 md:pt-0">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted md:mx-auto md:max-w-[240px]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
