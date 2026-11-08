import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Cta } from "@/components/Cta";
import { PackageMini } from "@/components/PackageMini";
import { ServiceFaq } from "@/components/ServiceFaq";
import { TrialTicket } from "@/components/TrialTicket";
import { CoverageMap } from "@/components/delivery/CoverageMap";
import { DeliveryJourney } from "@/components/delivery/DeliveryJourney";
import { IsometricDelivery } from "@/components/delivery/IsometricDelivery";
import { ReportSample } from "@/components/delivery/ReportSample";

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
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" aria-hidden="true" />
        <div className="container-page relative pt-8 sm:pt-12">
          <Breadcrumb items={[{ href: "/services/delivery", label: "Хүргэлт" }]} />
          <div className="mt-8 grid items-center gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-4">
            <div>
              <h1 className="text-balance text-[34px] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[52px]">
                Захиалга чинь баталгаажмагц <span className="text-accent">бид хөдөлнө</span>
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:text-lg">
                Бэлэн мөнгө цуглуулдаггүй — төлбөр нь баталгаажсан захиалгыг тань өдөрт нь хүргэж, хүргэлт бүрийн тайланг өгнө.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/order?service=delivery" className="btn-primary">
                  Хүргэлт захиалах
                </Link>
                <Link href="/pricing?tab=delivery" className="btn-ghost">
                  Багц харьцуулах
                </Link>
              </div>
            </div>
            <div className="-mx-4 sm:mx-0 lg:-mr-8">
              <IsometricDelivery />
            </div>
          </div>
        </div>
      </section>

      <DeliveryJourney />
      <CoverageMap />
      <ReportSample />
      <PackageMini service="delivery" title="Хүргэлтийн багц" />
      <ServiceFaq category="delivery" title="Хүргэлтийн асуулт" />
      <TrialTicket />
      <Cta title="Маргаашийн захиалгаа бидэнд даатга" text="Захиалга илгээгээд 24 цагийн дотор холбогдоно." href="/order?service=delivery" />
    </>
  );
}
