import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlansSection } from "@/components/PlansSection";
import { ServiceFaq } from "@/components/ServiceFaq";
import { CoverageMap } from "@/components/delivery/CoverageMap";
import { DeliveryJourney } from "@/components/delivery/DeliveryJourney";
import { IsometricDelivery } from "@/components/delivery/IsometricDelivery";
import { ReportSample } from "@/components/delivery/ReportSample";
import { TrialCard } from "@/components/TrialCard";

const title = "Хүргэлтийн үйлчилгээ";
const description =
  "Улаанбаатар хот доторх онлайн дэлгүүрийн хүргэлт: төлбөр нь баталгаажсан захиалгыг өдөрт нь хүргэж, статус, тайлан өгнө. Бэлэн мөнгө цуглуулдаггүй.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/delivery" },
  openGraph: { title: `${title} | Ochir`, description, url: "/services/delivery" },
};

export default function DeliveryPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page relative pt-8 sm:pt-12">
          <Breadcrumb items={[{ href: "/services/delivery", label: "Хүргэлт" }]} />
          <div className="mt-8 grid items-center gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
            <div>
              <h1 className="text-balance text-[34px] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[52px]">
                Захиалга чинь баталгаажмагц <span className="text-accent-strong">бид хөдөлнө</span>
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-text sm:text-lg">
                Бэлэн мөнгө цуглуулдаггүй — төлбөр нь баталгаажсан захиалгыг тань өдөрт нь хүргэж, хүргэлт бүрийн тайланг өгнө.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/order?service=delivery" className="btn-primary">
                  Хүргэлт захиалах
                </Link>
                <a href="#plans" className="btn-ghost">
                  Багц үзэх
                </a>
              </div>
            </div>
            <div className="canvas p-2 sm:p-4">
              <IsometricDelivery />
            </div>
          </div>
        </div>
      </section>

      <PlansSection service="delivery" />

      <DeliveryJourney />
      <CoverageMap />
      <ReportSample />
      <ServiceFaq category="delivery" title="Хүргэлтийн асуулт" />
      <TrialCard />
    </>
  );
}
