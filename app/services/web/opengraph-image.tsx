import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Ochir — Вэб сайт & систем";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "Instagram-аас гадуур ч захиалга ав", subtitle: "Landing, QPay-тэй онлайн дэлгүүр, дотоод систем", tag: "Вэб & систем" });
}
