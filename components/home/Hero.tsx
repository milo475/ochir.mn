import Link from "next/link";
import { IsometricCity } from "@/components/IsometricCity";
import { MessengerIcon } from "@/components/SocialIcons";
import { messengerUrl } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="container-page relative pb-0 pt-10 sm:pt-14 lg:pt-16">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3 py-1 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Улаанбаатарын онлайн бизнест
          </p>
          <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]">
            Хүргэлт, вэб, автоматжуулалт —{" "}
            <span className="text-accent">нэг багцаар</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:text-lg">
            Төлбөр нь баталгаажсан захиалгыг тань бид хурдан, найдвартай хүргэнэ — та зөвхөн борлуулалтаа өсгөхөд
            анхаар.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/order" className="btn-primary">
              Багцаа сонгох
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a href={messengerUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <MessengerIcon className="h-[18px] w-[18px] text-accent" />
              Messenger-ээр бичих
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">
            <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-accent" aria-hidden="true" />
            Улаанбаатар · Instagram, Facebook дэлгүүрүүдэд зориулав
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-[1200px] sm:mt-10">
          <IsometricCity />
        </div>
      </div>
    </section>
  );
}
