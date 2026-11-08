import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function Cta({ title = "Бизнесээ өнөөдөр онлайнд өсгөе", text = "Багцаа сонгоод илгээхэд л болно. 24 цагийн дотор бид холбогдоно." }: { title?: string; text?: string }) {
  return (
    <section className="container-page py-8">
      <Reveal className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-[#1a1f33] via-card to-card p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-[90px]" aria-hidden="true" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted sm:text-base">{text}</p>
          </div>
          <Link href="/order" className="btn-primary shrink-0">
            Захиалга өгөх
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
