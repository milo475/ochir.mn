import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Cta } from "@/components/Cta";
import { PackageMini } from "@/components/PackageMini";
import { ServiceFaq } from "@/components/ServiceFaq";
import { CareCard } from "@/components/web/CareCard";
import { IsometricStudio } from "@/components/web/IsometricStudio";
import { WebProcess } from "@/components/web/WebProcess";
import { WhatWeBuild } from "@/components/web/WhatWeBuild";
import { WorkGrid } from "@/components/web/WorkGrid";

const title = "Вэб сайт & систем";
const description =
  "Landing хуудас 3 хоногт, QPay-тэй онлайн дэлгүүр, захиалга/агуулахын дотоод систем. Домэйн, хостинг таны нэр дээр, нээсний дараа ч хариуцна.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/web" },
  openGraph: { title: `${title} | Ochir`, description, url: "/services/web" },
};

export default function WebPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" aria-hidden="true" />
        <div className="container-page relative pt-8 sm:pt-12">
          <Breadcrumb items={[{ href: "/services/web", label: "Вэб & систем" }]} />
          {/* Хүргэлтийн хуудаснаас ялгаатай: дүрслэл зүүн талд, текст баруун талд */}
          <div className="mt-8 grid items-center gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
            <div className="order-2 -mx-4 sm:mx-0 lg:order-1 lg:-ml-10">
              <IsometricStudio />
            </div>
            <div className="order-1 lg:order-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3 py-1 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Landing · Онлайн дэлгүүр · Систем
              </p>
              <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[52px]">
                <span className="whitespace-nowrap">Instagram-аас</span> гадуур ч <span className="text-accent">захиалга ав</span>
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:text-lg">
                QPay-тэй өөрийн сайт — домэйн, хостинг нь таны нэр дээр, бараа, үнээ өөрөө удирдана.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/order?service=web" className="btn-primary">
                  Сайт захиалах
                </Link>
                <a href="#live" className="btn-ghost">
                  Жишээ ажлууд
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WorkGrid />
      <WhatWeBuild />
      <WebProcess />
      <CareCard />
      <PackageMini service="web" title="Вэбийн багц" />
      <ServiceFaq category="web" title="Вэбийн асуулт" />
      <Cta title="Сайтаа 3 хоногт нээе" text="Хэрэгцээгээ бичээд илгээ — 24 цагийн дотор үнийн санал ирнэ." href="/order?service=web" />
    </>
  );
}
