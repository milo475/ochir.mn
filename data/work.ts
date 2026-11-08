/**
 * /services/web — "Жишээ ажлууд". Зөвхөн бодит төслүүд.
 * Дараалал: харилцагчийн төслүүд → бидний систем → демо загварууд.
 * Зураг: public/work/<slug>.png (1280×800 @2x). `url: null` бол "Үзэх" линк харагдахгүй.
 */
export interface WorkItem {
  slug: string;
  name: string;
  tag: "Харилцагчийн төсөл" | "Бидний систем" | "Демо хувилбар" | "Демо загвар";
  summary: string;
  image: string;
  url: string | null;
  /** Картын доорх жижиг тэмдэглэл */
  note?: string;
}

export const work: WorkItem[] = [
  {
    slug: "tofu",
    name: "Tofu",
    tag: "Харилцагчийн төсөл",
    summary: "Муурны барааны онлайн дэлгүүр: каталог, сагс, QPay төлбөр, захиалгын админ.",
    image: "/work/tofu.png",
    url: "https://tofu.mn",
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
    slug: "shop-demo",
    name: "Миний дэлгүүр",
    tag: "Демо хувилбар",
    summary: "Онлайн дэлгүүрийн бэлэн загвар: ангилал, бараа, сагс, админ самбар. Таны брэнд, бараагаар 1 өдөрт тохируулна.",
    image: "/work/shop-demo.png",
    url: "https://shop-demo.up.railway.app",
    note: "Демо — захиалга бодитоор биелэхгүй",
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
