/**
 * Үйлчилгээ, багцын мэдээлэл. Үнэ нэмэх бол `price` талбарт текстээр бичнэ
 * (жишээ: "290,000₮ / сар"). `null` үед "Үнийн санал авах" гэж харагдана.
 */

export type ServiceSlug = "delivery" | "web" | "automation";

export interface Package {
  id: string;
  service: ServiceSlug;
  name: string;
  tagline: string;
  features: string[];
  price: string | null;
  highlight?: boolean;
}

export interface Service {
  slug: ServiceSlug;
  title: string;
  short: string;
  description: string;
  seoDescription: string;
  benefits: { title: string; text: string }[];
  steps: string[];
}

export const services: Service[] = [
  {
    slug: "delivery",
    title: "Хүргэлт",
    short: "Захиалгыг тань хот дотор хурдан, найдвартай хүргэж, мөнгийг цаг тухайд нь тооцоо хийнэ.",
    description:
      "Онлайн дэлгүүр, жижиг бизнест зориулсан хүргэлтийн үйлчилгээ. Захиалгаа бидэнд дамжуулахад л хангалттай — авах, хүргэх, бэлэн мөнгө цуглуулах, тооцоо хийхийг бид хариуцна.",
    seoDescription:
      "Улаанбаатар хот доторх онлайн дэлгүүрийн хүргэлт: захиалгын портал, өдөр бүрийн тооцоо, SMS мэдэгдэл.",
    benefits: [
      { title: "Хот дотор хүргэлт", text: "Улаанбаатарын бүх дүүрэгт мотоциклтэй хүргэлтийн ажилтнууд." },
      { title: "Цагтаа тооцоо", text: "Бэлэн мөнгөөр авсан төлбөрийг долоо хоног эсвэл өдөр бүр шилжүүлнэ." },
      { title: "Ил тод хяналт", text: "Захиалга бүрийн явцыг порталаас харж, харилцагчдаа мэдэгдэнэ." },
    ],
    steps: [
      "Захиалгаа портал эсвэл чатаар илгээнэ",
      "Хүргэлтийн ажилтан дэлгүүрээс авна",
      "Харилцагчид хүргэж, төлбөрийг авна",
      "Тооцоог таны дансанд шилжүүлнэ",
    ],
  },
  {
    slug: "web",
    title: "Вэб сайт & систем",
    short: "Landing хуудаснаас эхлээд QPay-тэй онлайн дэлгүүр, дотоод систем хүртэл бүтээнэ.",
    description:
      "Бизнесээ онлайнд гаргах, борлуулалтаа нэмэх, дотоод ажлаа цэгцлэх вэб шийдлүүд. Гар утсанд тохирсон, хурдан ачаалдаг, өөрөө удирдахад амар.",
    seoDescription:
      "Landing хуудас, QPay холболттой онлайн дэлгүүр, захиалга/агуулах/тайлангийн дотоод систем хийнэ.",
    benefits: [
      { title: "Гар утсанд төгс", text: "Харилцагчдын ихэнх нь утсаар орж ирдэг — бид mobile-first бүтээнэ." },
      { title: "QPay холболт", text: "Онлайн төлбөрийг шууд хүлээн авч, захиалга автоматаар баталгаажна." },
      { title: "Өөрөө удирдана", text: "Бараа, үнэ, захиалгаа админ самбараас хялбар засна." },
    ],
    steps: [
      "Бизнесийн хэрэгцээг тодорхойлно",
      "Дизайн, бүтцийг баталгаажуулна",
      "Хөгжүүлж, туршина",
      "Нээлт хийж, сургалт өгнө",
    ],
  },
  {
    slug: "automation",
    title: "AI автоматжуулалт",
    short: "FB/IG чатбот, чатаас ирсэн захиалгыг автоматаар бүртгэх робот.",
    description:
      "Messenger, Instagram-аар ирэх асуулт, захиалгад 24/7 хариулж, захиалгыг Google Sheet эсвэл таны системд автоматаар бүртгэнэ. Гар ажлыг багасгаж, нэг ч захиалга алдахгүй.",
    seoDescription:
      "Facebook, Instagram messenger чатбот ба чатаас захиалгыг автоматаар бүртгэх AI робот.",
    benefits: [
      { title: "24/7 хариулт", text: "Шөнө ч бай, амралтын өдөр ч бай харилцагч хариугүй үлдэхгүй." },
      { title: "Автомат бүртгэл", text: "Чатаас нэр, утас, хаяг, барааг таньж бүртгэнэ." },
      { title: "Хүргэлттэй холбоно", text: "Бүртгэгдсэн захиалга шууд хүргэлт рүү дамжина." },
    ],
    steps: [
      "Түгээмэл асуулт, барааны мэдээллийг цуглуулна",
      "Чатбот, роботыг тохируулна",
      "Таны хуудастай холбож туршина",
      "Ажиллагааг хянаж, сайжруулна",
    ],
  },
];

export const packages: Package[] = [
  // Хүргэлт
  {
    id: "delivery-start",
    service: "delivery",
    name: "Эхлэл",
    tagline: "Дөнгөж эхэлж буй дэлгүүрт",
    features: ["Өдөрт 5 хүртэл захиалга", "Долоо хоног бүр тооцоо", "Хот доторх хүргэлт", "Утас, чатаар захиалга өгөх"],
    price: null,
  },
  {
    id: "delivery-growth",
    service: "delivery",
    name: "Өсөлт",
    tagline: "Тогтмол борлуулалттай бизнест",
    features: ["Хязгааргүй захиалга", "Өдөр бүр тооцоо", "Захиалгын портал", "Хүргэлтийн явцыг хянах"],
    price: null,
    highlight: true,
  },
  {
    id: "delivery-full",
    service: "delivery",
    name: "Бүрэн",
    tagline: "Агуулахаа ч бидэнд даатга",
    features: ["Өсөлт багцын бүх боломж", "Агуулахын бүртгэл", "Харилцагчид SMS мэдэгдэл", "Сарын тайлан"],
    price: null,
  },
  // Вэб
  {
    id: "web-landing",
    service: "web",
    name: "Landing",
    tagline: "Хурдан эхлэх нэг хуудас",
    features: ["1 хуудастай сайт", "3 хоногт хүлээлгэн өгнө", "Гар утсанд тохирсон", "Домэйн, хостинг тохиргоо"],
    price: null,
  },
  {
    id: "web-shop",
    service: "web",
    name: "Онлайн дэлгүүр",
    tagline: "Онлайнаар зарж, төлбөр авна",
    features: ["Барааны каталог", "Сагс, захиалга", "QPay төлбөрийн холболт", "Админ самбар"],
    price: null,
    highlight: true,
  },
  {
    id: "web-system",
    service: "web",
    name: "Систем",
    tagline: "Дотоод ажлаа цэгцэл",
    features: ["Захиалгын систем", "Агуулахын бүртгэл", "Тайлан, статистик", "Ажилтны эрхийн тохиргоо"],
    price: null,
  },
  // Автоматжуулалт
  {
    id: "auto-chatbot",
    service: "automation",
    name: "Чат бот",
    tagline: "Messenger-т автомат хариулт",
    features: ["FB/IG messenger автомат хариулт", "24/7 түгээмэл асуултад хариулна", "Бараа, үнийн мэдээлэл өгнө", "Оператор руу шилжүүлнэ"],
    price: null,
  },
  {
    id: "auto-robot",
    service: "automation",
    name: "Захиалгын робот",
    tagline: "Чатаас шууд бүртгэл",
    features: ["Чатаас захиалгыг автоматаар таньна", "Google Sheet эсвэл системд бүртгэнэ", "Хүргэлт рүү шууд дамжуулна", "Өдрийн тайлан"],
    price: null,
    highlight: true,
  },
];

export const PRICE_PLACEHOLDER = "Үнийн санал авах";

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function packagesFor(slug: ServiceSlug): Package[] {
  return packages.filter((p) => p.service === slug);
}

export function getPackage(id: string): Package | undefined {
  return packages.find((p) => p.id === id);
}
