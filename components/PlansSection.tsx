import Link from "next/link";
import type { ServiceSlug } from "@/data/packages";
import { PlanCards } from "./PlanCards";
import { Reveal } from "./Reveal";

/** Үйлчилгээний хуудсан дээрх "Багц" хэсэг (#plans) — hero-гийн шууд дараа */
export function PlansSection({ service }: { service: ServiceSlug }) {
  return (
    <section id="plans" aria-labelledby="plans-title" className="container-page mt-16 scroll-mt-24 sm:mt-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="plans-title" className="text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
          Багц
        </h2>
        <Link href={`/pricing?tab=${service}`} className="text-sm link">
          Харьцуулах <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
      <Reveal className="mt-10">
        <PlanCards service={service} />
      </Reveal>
    </section>
  );
}
