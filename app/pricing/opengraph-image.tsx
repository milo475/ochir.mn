import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Ochir — Үнэ & багц";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "Хэмжээндээ тохирсон багц", subtitle: "Хүргэлт · Вэб & систем · Автоматжуулалт — багцуудын харьцуулалт", tag: "Үнэ" });
}
