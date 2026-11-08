import Link from "next/link";
import { Reveal } from "@/components/Reveal";

/** Туршилтын санал — 2 талдаа хагас дугуй ховилтой "тасалбар" */
export function TrialTicket() {
  return (
    <section aria-labelledby="ticket-title" className="container-page mt-16 sm:mt-24">
      <Reveal className="mx-auto max-w-3xl">
        <div className="ticket transition-transform duration-300 ease-out hover:rotate-1 motion-reduce:hover:rotate-0">
          <div className="ticket-body grid bg-accent text-bg sm:grid-cols-[0.9fr_1.1fr]">
            {/* Зүүн: хайчлах хэсэг */}
            <div className="ticket-stub flex flex-col justify-center border-b-2 border-dashed border-bg/30 px-8 sm:border-b-0 sm:border-r-2 sm:px-10">
              <p id="ticket-title" className="leading-none">
                <span className="block text-[44px] font-black tracking-tight sm:text-[56px]">7 ХОНОГ</span>
                <span className="mt-2 block text-sm font-extrabold tracking-[0.3em]">· ҮНЭГҮЙ ·</span>
              </p>
            </div>
            {/* Баруун */}
            <div className="flex flex-col justify-center gap-5 px-8 py-7 sm:px-10">
              <p className="text-[16px] font-semibold leading-snug">
                Эхний 10 дэлгүүрт. Таалагдаагүй бол зогсооно, асуулт хариулт байхгүй.
              </p>
              <Link
                href="/order?service=delivery"
                className="btn self-start bg-bg text-accent hover:bg-[#16203a]"
              >
                Тасалбар авах →
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          Үлдсэн: <span className="font-semibold text-ink">10/10</span>
        </p>
      </Reveal>
    </section>
  );
}
