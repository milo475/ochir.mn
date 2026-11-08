/**
 * /services/web — "Жишээ ажлууд".
 * TODO: Бодит ажлуудаар солих — зураг (public/work/*.png, 1200×750), нэр, тайлбар, `url`.
 * Одоогийн зургууд нь зөвхөн PLACEHOLDER; `url: null` үед "Үзэх" линк "Удахгүй" болж харагдана.
 */
export interface WorkItem {
  slug: string;
  name: string;
  kind: "Landing" | "Онлайн дэлгүүр" | "Дотоод систем";
  summary: string;
  image: string;
  url: string | null;
}

export const work: WorkItem[] = [
  {
    slug: "shop",
    name: "Хувцасны онлайн дэлгүүр",
    kind: "Онлайн дэлгүүр",
    summary: "Instagram-аар зардаг брэндийн каталог, сагс, QPay төлбөр, админ самбар.",
    image: "/work/shop.png",
    url: null,
  },
  {
    slug: "landing",
    name: "Гоо сайхны салоны landing",
    kind: "Landing",
    summary: "3 хоногт нээх нэг хуудас — үйлчилгээ, үнэ, Messenger-ээр цаг захиалах.",
    image: "/work/landing.png",
    url: null,
  },
  {
    slug: "system",
    name: "Захиалга, агуулахын систем",
    kind: "Дотоод систем",
    summary: "Өдрийн захиалга, үлдэгдэл, ажилтны эрх, долоо хоногийн тайлан нэг дор.",
    image: "/work/system.png",
    url: null,
  },
  {
    slug: "booking",
    name: "Цаг захиалгын сайт",
    kind: "Онлайн дэлгүүр",
    summary: "Хуанлиас цагаа сонгож, урьдчилгаагаа QPay-ээр төлдөг захиалгын сайт.",
    image: "/work/booking.png",
    url: null,
  },
];
