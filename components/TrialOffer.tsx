import Link from "next/link";
import { Reveal } from "./Reveal";

/** "Эхлэх нь амархан" — үнэгүй туршилтын санал (нүүр, /services/delivery) */
export function TrialOffer({ className = "" }: { className?: string }) {
  return (
    <section aria-labelledby="trial-title" className={`container-page ${className}`}>
      <Reveal className="flex flex-col gap-4 rounded-2xl border border-accent/70 bg-accent/[0.06] p-5 shadow-[0_0_0_4px_rgba(255,107,44,0.06)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        <div className="flex items-start gap-3.5 sm:items-center">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-bg" aria-hidden="true">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z" />
            </svg>
          </span>
          <p className="text-[15px] leading-relaxed">
            <span id="trial-title" className="font-bold text-accent">Эхлэх нь амархан: </span>
            Эхний 10 дэлгүүрт 7 хоногийн үнэгүй туршилт — таалагдаагүй бол зогсооно.
          </p>
        </div>
        <Link href="/order?service=delivery" className="btn-primary shrink-0">
          Туршилтад бүртгүүлэх
        </Link>
      </Reveal>
    </section>
  );
}
