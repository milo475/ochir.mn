import Link from "next/link";
import { unstable_cache } from "next/cache";
import { Reveal } from "@/components/Reveal";
import { prisma } from "@/lib/prisma";

const TRIAL_SLOTS = 10;

/** Үлдсэн суудал = 10 − (хүргэлт сонгосон, хаагдаагүй захиалга). 60 сек кэшлэнэ; DB алдаатай бол null */
const trialLeft = unstable_cache(
  async (): Promise<number | null> => {
    try {
      const taken = await prisma.order.count({ where: { services: { has: "delivery" }, status: { not: "CLOSED" } } });
      return Math.max(0, TRIAL_SLOTS - taken);
    } catch {
      return null;
    }
  },
  ["trial-left"],
  { revalidate: 60 },
);

/** "Эхний 10 хүргэлт үнэгүй" санал (Plus багц) — улбар шар зөвхөн товчин дээр */
export async function TrialCard() {
  const left = await trialLeft();
  const over = left === 0;
  return (
    <section aria-labelledby="trial-title" className="container-page mt-16 sm:mt-24">
      <Reveal className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-sm text-muted">Эхний {TRIAL_SLOTS} дэлгүүрт</p>
          <h2 id="trial-title" className="mt-2 text-[24px] font-bold leading-tight tracking-tight text-ink sm:text-[28px]">
            Эхний {TRIAL_SLOTS} хүргэлт үнэгүй
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-text">Plus багцаар. Гэрээ, урьдчилгаа байхгүй — таалагдаагүй бол зогсооно.</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 md:items-center">
          <Link href="/order?service=delivery&plan=plus" className="btn-primary">
            {over ? "Туршилт дууссан — ердийн багцаар бүртгүүлнэ үү" : "Эхлэх →"}
          </Link>
          {left !== null && !over && (
            <p className="text-xs text-muted">
              Үлдсэн: {left}/{TRIAL_SLOTS}
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
