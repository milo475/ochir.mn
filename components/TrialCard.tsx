import Link from "next/link";
import { Reveal } from "@/components/Reveal";

/** 7 хоногийн үнэгүй туршилтын санал — энгийн surface карт, улбар шар зөвхөн товчин дээр */
export function TrialCard() {
  return (
    <section aria-labelledby="trial-title" className="container-page mt-16 sm:mt-24">
      <Reveal className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-sm text-muted">Эхний 10 дэлгүүрт</p>
          <h2 id="trial-title" className="mt-2 text-[24px] font-bold leading-tight tracking-tight text-ink sm:text-[28px]">
            7 хоногийн үнэгүй туршилт
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-text">Таалагдаагүй бол зогсооно — асуулт хариулт байхгүй.</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 md:items-center">
          <Link href="/order?service=delivery" className="btn-primary">
            Туршилтад бүртгүүлэх →
          </Link>
          <p className="text-xs text-muted">Үлдсэн: 10/10</p>
        </div>
      </Reveal>
    </section>
  );
}
