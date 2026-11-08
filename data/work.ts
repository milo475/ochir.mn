/**
 * /services/web — "Жишээ ажлууд". Зөвхөн бодит төслүүд.
 * kind: "live" — ажиллаж буй сайт (#live), "demo" — бэлэн загвар (#demo).
 * status: live картын зургийн буланд — "live" = Ажиллаж байна, "soon" = Нээлтэд бэлтгэж байна.
 * Зураг: public/work/<slug>.png (1280×800 @2x). `url: null` бол "Үзэх" линк харагдахгүй.
 */
export type WorkKind = "live" | "demo";

export interface WorkItem {
  slug: string;
  kind: WorkKind;
  /** Зөвхөн live: зургийн булан дахь төлөв */
  status?: "live" | "soon";
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
    kind: "live",
    status: "live",
    name: "Tofu",
    tag: "Харилцагчийн төсөл",
    summary: "Муурны барааны онлайн дэлгүүр: каталог, сагс, QPay төлбөр, захиалгын админ.",
    image: "/work/tofu.png",
    url: "https://tofu.mn",
  },
  {
    slug: "law-firm",
    kind: "live",
    status: "soon",
    name: "Өмгөөллийн стратеги",
    tag: "Харилцагчийн төсөл",
    summary: "Хуулийн фирмийн нүүр сайт + харилцагчийн портал + админ.",
    image: "/work/law-firm.png",
    // Түр нуусан — домэйн (umguulugch.com) бэлэн болмогц холбоно
    url: null,
  },
  {
    slug: "ursgal",
    kind: "live",
    status: "live",
    name: "Ochir систем",
    tag: "Бидний систем",
    summary:
      "Манай өөрийн захиалга, хүргэлт, агуулахын систем — хүргэлтийн харилцагч бүр үүгээр захиалгаа оруулж, тайлангаа авна.",
    image: "/work/ursgal.png",
    url: "https://web-production-ac9ab.up.railway.app",
    note: "Демо: demo@ochir.mn / Demo1234 — зөвхөн үзэх",
  },
  {
    slug: "shop-demo",
    kind: "demo",
    name: "Миний дэлгүүр",
    tag: "Демо хувилбар",
    summary: "Онлайн дэлгүүрийн бэлэн загвар: ангилал, бараа, сагс, админ самбар. Таны брэнд, бараагаар 1 өдөрт тохируулна.",
    image: "/work/shop-demo.png",
    url: "https://shop-demo.up.railway.app",
    note: "Демо — захиалга бодитоор биелэхгүй",
  },
  {
    slug: "delguur",
    kind: "demo",
    name: "Хувцасны дэлгүүр",
    tag: "Демо хувилбар",
    summary: "Хувцасны онлайн дэлгүүрийн загвар: ангилал, хямдрал, сагс, QPay төлбөр. Таны брэнд, бараагаар тохируулна.",
    image: "/work/delguur.png",
    url: "https://delguur-production-198d.up.railway.app",
    note: "Демо — захиалга бодитоор биелэхгүй",
  },
  {
    slug: "electronics",
    kind: "demo",
    name: "Цахилгаан барааны дэлгүүр",
    tag: "Демо загвар",
    summary: "Онлайн дэлгүүрийн бүрэн загвар: каталог, сагс, админ.",
    image: "/work/electronics.png",
    url: null,
    note: "Бараа, баннер нь зохиомол — загварыг харуулах зорилготой.",
  },
];

export const liveWork = work.filter((w) => w.kind === "live");
export const demoWork = work.filter((w) => w.kind === "demo");
