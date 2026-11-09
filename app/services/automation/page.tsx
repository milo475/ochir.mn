import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TalkEnd } from "@/components/TalkEnd";
import { PackageMini } from "@/components/PackageMini";
import { ServiceFaq } from "@/components/ServiceFaq";
import { ChatDemo } from "@/components/automation/ChatDemo";
import { DoesDoesnt } from "@/components/automation/DoesDoesnt";
import { Integrations } from "@/components/automation/Integrations";
import { SetupNeeds } from "@/components/automation/SetupNeeds";

const title = "AI автоматжуулалт";
const description =
  "Facebook Messenger, Instagram DM-д 24/7 хариулж, чатаас ирсэн захиалгыг Google Sheets эсвэл таны системд автоматаар бүртгэдэг чатбот.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/automation" },
  openGraph: { title: `${title} | Ochir`, description, url: "/services/automation" },
};

export default function AutomationPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page relative pt-8 sm:pt-12">
          <Breadcrumb items={[{ href: "/services/automation", label: "AI автоматжуулалт" }]} />
          {/* Демо нь hero өөрөө — текст дээр, чат голд */}
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <h1 className="text-balance text-[34px] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[52px]">
              Шөнийн 2 цагт ч <span className="text-accent-strong">хариулдаг худалдагч</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-text sm:text-lg">
              Messenger, Instagram-д 24/7 хариулж, захиалгыг автоматаар бүртгэнэ. Доор өөрөө туршаад үз.
            </p>
          </div>
          <div className="mt-10">
            <ChatDemo />
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/order?service=automation" className="btn-primary">
              Чатбот захиалах
            </Link>
            <Link href="/pricing?tab=automation" className="btn-ghost">
              Багц харьцуулах
            </Link>
          </div>
        </div>
      </section>

      <Integrations />
      <DoesDoesnt />
      <SetupNeeds />
      <PackageMini service="automation" title="Автоматжуулалтын багц" />
      <ServiceFaq category="automation" title="Чатботын асуулт" />
      <TalkEnd text="Хуудасныхаа нэрийг бичээд илгээ — 24 цагийн дотор холбогдоно." href="/order?service=automation" />
    </>
  );
}
