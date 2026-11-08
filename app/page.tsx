import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PackagesPreview } from "@/components/home/PackagesPreview";
import { Faq } from "@/components/home/Faq";
import { Cta } from "@/components/home/Cta";
import { TrialOffer } from "@/components/TrialOffer";
import { faq } from "@/data/faq";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: SITE_NAME,
        url: SITE_URL,
        areaServed: "Улаанбаатар",
        description: "Хүргэлт, вэб сайт, AI автоматжуулалтын багц үйлчилгээ",
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <TrialOffer className="pt-2" />
      <ServicesOverview />
      <HowItWorks />
      <PackagesPreview />
      <Faq />
      <Cta />
    </>
  );
}
