/**
 * /services/web — "Жишээ ажлууд". Зөвхөн бодит төслүүд.
 * Зураг: public/work/<slug>.png (1280×800 @2x). `url: null` бол "Үзэх" линк харагдахгүй.
 */
export interface WorkItem {
  slug: string;
  name: string;
  tag: "Бидний систем" | "Харилцагчийн төсөл" | "Демо загвар";
  summary: string;
  image: string;
  url: string | null;
  /** Картын доорх жижиг тэмдэглэл */
  note?: string;
}

export const work: WorkItem[] = [
  {
    slug: "ursgal",
    name: "ursGAL",
    tag: "Бидний систем",
    summary:
      "Захиалга, хүргэлт, агуулахын дотоод систем. Дэлгүүр захиалгаа оруулж, хүргэгч статус шинэчилж, 7 хоногийн тайлан автоматаар гардаг.",
    image: "/work/ursgal.png",
    url: "https://web-production-ac9ab.up.railway.app",
    note: "Демо: demo@ursgal.mn / Demo1234 — зөвхөн үзэх",
  },
  {
    slug: "law-firm",
    name: "Өмгөөллийн стратеги",
    tag: "Харилцагчийн төсөл",
    summary: "Хуулийн фирмийн нүүр сайт + харилцагчийн портал + админ.",
    image: "/work/law-firm.png",
    // Түр нуусан — домэйн (umguulugch.com) бэлэн болмогц холбоно
    url: null,
  },
  {
    slug: "electronics",
    name: "Цахилгаан барааны дэлгүүр",
    tag: "Демо загвар",
    summary: "Онлайн дэлгүүрийн бүрэн загвар: каталог, сагс, админ.",
    image: "/work/electronics.png",
    url: null,
    note: "Бараа, баннер нь зохиомол — загварыг харуулах зорилготой.",
  },
];
