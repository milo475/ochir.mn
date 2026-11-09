import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PricingTabs } from "@/components/pricing/PricingTabs";
import { TrialCard } from "@/components/TrialCard";
import { serviceSlugs, type ServiceSlug } from "@/data/packages";

const description = "Хүргэлт, вэб сайт, AI автоматжуулалтын багцуудыг хажуу хажуугаар нь харьцуулж, бизнестээ тохирохыг сонгоорой.";

export const metadata: Metadata = {
  title: "Үнэ & багц",
  description,
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Үнэ & багц | Ochir", description, url: "/pricing" },
};

export default function PricingPage({ searchParams }: { searchParams: { tab?: string } }) {
  const initial = (serviceSlugs as string[]).includes(searchParams.tab ?? "") ? (searchParams.tab as ServiceSlug) : "delivery";
  return (
    <>
      <section className="relative">
        <div className="container-page relative pt-8 sm:pt-12">
          <Breadcrumb items={[{ href: "/pricing", label: "Үнэ" }]} />
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <h1 className="text-[34px] font-bold leading-tight tracking-tight sm:text-5xl">Хэмжээндээ тохирсон багц</h1>
            <p className="mt-4 text-[16px] leading-relaxed text-muted sm:text-lg">
              Хүргэлт бүр 6 000₮-с. Сарын тоо хэмжээнээс хамаарч багцын үнэ буурна.
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <PricingTabs key={initial} initial={initial} />
          </div>
        </div>
      </section>
      <TrialCard />
    </>
  );
}
