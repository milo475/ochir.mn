import { Hero } from "@/components/home/Hero";
import { Familiar } from "@/components/home/Familiar";
import { ServiceDoors } from "@/components/home/ServiceDoors";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    areaServed: "Улаанбаатар",
    description: "Хүргэлт, вэб сайт, AI автоматжуулалтын багц үйлчилгээ",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Familiar />
      <ServiceDoors />
    </>
  );
}
