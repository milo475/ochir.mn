import Link from "next/link";
import { IsometricCity } from "@/components/IsometricCity";
import { MessengerIcon } from "@/components/SocialIcons";
import { messengerUrl } from "@/lib/site";

export function Hero() {
  return (
    <section>
      <div className="container-page pb-0 pt-12 sm:pt-16 lg:pt-20">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="inline-flex items-center rounded-full border border-line px-3 py-1 text-xs text-muted">Улаанбаатарын онлайн бизнест</p>
          <h1 className="mt-5 text-balance text-[36px] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]">
            Хүргэлт, вэб, автоматжуулалт — <span className="text-accent-strong">нэг багцаар</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-text sm:text-lg">
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
              <MessengerIcon className="h-[18px] w-[18px]" />
              Messenger-ээр бичих
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">Улаанбаатар · Instagram, Facebook дэлгүүрүүдэд зориулав</p>
        </div>
        <div className="canvas mx-auto mt-10 max-w-[1200px] px-4 pb-4 pt-5 sm:mt-12 sm:px-6 sm:pt-6">
          <IsometricCity />
        </div>
      </div>
    </section>
  );
}
