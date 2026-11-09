import Link from "next/link";
import { faqFor, type FaqCategoryId } from "@/data/faq";
import { FaqAccordion } from "./FaqAccordion";
import { Reveal } from "./Reveal";

/** Үйлчилгээний хуудсанд /faq-гийн тухайн ангиллын эхний 4 асуулт */
export function ServiceFaq({ category, title = "Түгээмэл асуулт" }: { category: FaqCategoryId; title?: string }) {
  return (
    <section aria-labelledby={`faq-${category}`} className="container-page mt-16 sm:mt-24">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
        <Reveal>
          <h2 id={`faq-${category}`} className="text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
            {title}
          </h2>
          <Link href={`/faq#${category}`} className="mt-5 inline-block text-sm link">
            Бүх асуулт <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <Reveal>
          <FaqAccordion items={faqFor(category, 4)} />
        </Reveal>
      </div>
    </section>
  );
}
