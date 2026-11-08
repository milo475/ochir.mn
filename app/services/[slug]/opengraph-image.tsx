import { getService, serviceSlugs } from "@/data/packages";
import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Ochir үйлчилгээ";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  // delivery нь өөрийн тусдаа хуудастай
  return serviceSlugs.filter((slug) => slug !== "delivery").map((slug) => ({ slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  return renderOg({
    title: s?.title ?? "Ochir",
    subtitle: s?.short ?? "",
    tag: "Үйлчилгээ",
  });
}
