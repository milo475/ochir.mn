import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Ochir — Асуулт, хариулт";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "Асуулт, хариулт", subtitle: "Хүргэлт, вэб, автоматжуулалт, төлбөр, гэрээний талаар", tag: "Асуулт" });
}
