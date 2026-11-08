import Link from "next/link";
import { IsometricCity } from "@/components/IsometricCity";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 right-[-20%] h-[520px] w-[520px] rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="container-page relative grid items-center gap-8 pb-12 pt-8 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-20 lg:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3 py-1 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Улаанбаатарын онлайн бизнест
          </p>
          <h1 className="mt-5 text-[34px] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]">
            Хүргэлт, вэб, автоматжуулалт —{" "}
            <span className="text-accent">нэг багцаар</span>
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:text-lg">
            Захиалга авахаас эхлээд хүргэж, тооцоо хийх хүртэлх бүх ажлыг бид хариуцна. Та зөвхөн бизнесээ өсгөхөд
            анхаар.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/order" className="btn-primary">
              Багцаа сонгох
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="#services" className="btn-ghost">
              Үйлчилгээтэй танилцах
            </Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              ["24ц", "дотор холбогдоно"],
              ["3 хоног", "Landing хуудас"],
              ["24/7", "чатбот хариулт"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="text-xl font-bold sm:text-2xl">{v}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <IsometricCity />
      </div>
    </section>
  );
}
