import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Ochir — Хүргэлт, вэб сайт, AI автоматжуулалт";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    title: "Хүргэлт, вэб, автоматжуулалт — нэг багцаар",
    subtitle: "Улаанбаатарын онлайн дэлгүүр, жижиг бизнест зориулсан үйлчилгээ",
  });
}
