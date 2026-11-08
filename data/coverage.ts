/**
 * Хүргэлтийн хамрах хүрээ. `zone` өөрчлөхөд /services/delivery дээрх схем, тайлбар шинэчлэгдэнэ.
 *  - standard: ердийн нөхцөлөөр хүргэнэ (улбар шар)
 *  - negotiable: урьдчилан тохиролцоно (muted)
 */
export type CoverageZone = "standard" | "negotiable";

export interface District {
  id: string;
  name: string;
  zone: CoverageZone;
}

export const districts: District[] = [
  { id: "shd", name: "Сонгинохайрхан", zone: "standard" },
  { id: "chd", name: "Чингэлтэй", zone: "standard" },
  { id: "sbd", name: "Сүхбаатар", zone: "standard" },
  { id: "bzd", name: "Баянзүрх", zone: "standard" },
  { id: "bgd", name: "Баянгол", zone: "standard" },
  { id: "hud", name: "Хан-Уул", zone: "standard" },
  { id: "nld", name: "Налайх", zone: "negotiable" },
  { id: "bnd", name: "Багануур", zone: "negotiable" },
  { id: "bhd", name: "Багахангай", zone: "negotiable" },
];

export const coverageNote = {
  standard: "Төв 6 дүүрэг: ердийн",
  negotiable: "Налайх, Багануур, Багахангай: тохиролцоно",
};
