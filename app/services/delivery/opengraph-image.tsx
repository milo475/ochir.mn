import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Ochir — Хүргэлтийн үйлчилгээ";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "Захиалга чинь баталгаажмагц бид хөдөлнө", subtitle: "Улаанбаатар хот доторх хүргэлт, статус, тайлан", tag: "Хүргэлт" });
}
