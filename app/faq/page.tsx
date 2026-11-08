import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqBrowser } from "@/components/faq/FaqBrowser";
import { MessengerIcon } from "@/components/SocialIcons";
import { allFaq } from "@/data/faq";
import { messengerUrl } from "@/lib/site";

const description = "Хүргэлт, вэб сайт, AI автоматжуулалт, төлбөр, гэрээний талаар түгээмэл асуултууд ба хариултууд.";

export const metadata: Metadata = {
  title: "Асуулт, хариулт",
  description,
  alternates: { canonical: "/faq" },
  openGraph: { title: "Асуулт, хариулт | Ochir", description, url: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative">
        <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-80 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" aria-hidden="true" />
        <div className="container-page relative pt-8 sm:pt-12">
          <Breadcrumb items={[{ href: "/faq", label: "Асуулт" }]} />
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <h1 className="text-[34px] font-extrabold leading-tight tracking-tight sm:text-5xl">Асуулт, хариулт</h1>
            <p className="mt-4 text-[16px] leading-relaxed text-muted sm:text-lg">Хайж олоорой — эсвэл ангиллаар нь гүйлгэж үзээрэй.</p>
          </div>
          <FaqBrowser />
        </div>
      </section>

      <section className="container-page mt-16 sm:mt-24">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-line bg-card px-6 py-10 text-center sm:py-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Хариулт олдсонгүй юу?</h2>
          <p className="max-w-md text-[15px] text-muted">Асуултаа Messenger-ээр бичээрэй — ажлын цагаар хурдан хариулна.</p>
          <a href={messengerUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessengerIcon className="h-[18px] w-[18px]" />
            Messenger-ээр асуух
          </a>
        </div>
      </section>
    </>
  );
}
