import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Ochir — AI автоматжуулалт";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "Шөнийн 2 цагт ч хариулдаг худалдагч", subtitle: "Messenger, Instagram чатбот ба захиалгын автомат бүртгэл", tag: "AI автоматжуулалт" });
}
