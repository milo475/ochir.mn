import Link from "next/link";
import { Reveal } from "@/components/Reveal";

/** Хуудасны төгсгөлийн уриалга — энгийн улбар шар блок */
export function Cta({
  title = "Бизнесээ өнөөдөр онлайнд өсгөе",
  text = "Багцаа сонгоод илгээхэд л болно. 24 цагийн дотор бид холбогдоно.",
  href = "/order",
}: {
  title?: string;
  text?: string;
  href?: string;
}) {
  return (
    <section className="container-page mt-16 sm:mt-24">
      <Reveal className="rounded-xl bg-accent p-8 text-accent-ink sm:p-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed sm:text-base">{text}</p>
          </div>
          <Link href={href} className="btn-dark shrink-0">
            Захиалга өгөх
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
