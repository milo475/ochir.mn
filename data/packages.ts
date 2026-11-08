/**
 * Үйлчилгээ, багцын мэдээлэл. Жишиг үнийг `priceFrom` талбарт текстээр бичнэ
 * (жишээ: "сард 150 000₮-с"). `null` үед "Үнийн санал авах" / "Үнэ авах" гэж харагдана.
 */

export type ServiceSlug = "delivery" | "web" | "automation";

export interface Package {
  id: string;
  service: ServiceSlug;
  name: string;
  tagline: string;
  features: string[];
  /** Жишиг "-с эхлэх" үнэ; null бол үнийн санал авна */
  priceFrom: string | null;
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
  /** Алхмуудын хэсгийн гарчиг (анхдагч: "Хэрхэн хэрэгжүүлэх вэ") */
  stepsTitle?: string;
  /** Алхмуудын доорх жижиг тэмдэглэл */
  stepsNote?: string;
}

export const services: Service[] = [
  {
    slug: "delivery",
    title: "Хүргэлт",
    short: "Захиалгыг тань хот дотор хурдан, найдвартай хүргэж, хүргэлт бүрийн статус, тайланг тань өгнө.",
    description:
      "Онлайн дэлгүүр, жижиг бизнест зориулсан хүргэлтийн үйлчилгээ. Төлбөр нь баталгаажсан захиалгаа бидэнд дамжуулахад л хангалттай — дэлгүүрээс авах, хот дотор хүргэх, статусыг шинэчлэх, тайлан өгөхийг бид хариуцна.",
    seoDescription:
      "Улаанбаатар хот доторх онлайн дэлгүүрийн хүргэлт: захиалгын портал, хүргэлт бүрийн статус, тайлан, SMS мэдэгдэл.",
    benefits: [
      { title: "Хот дотор хүргэлт", text: "Улаанбаатарын бүх дүүрэгт мотоциклтэй хүргэлтийн ажилтнууд." },
      { title: "Хүргэлт бүрийн тайлан", text: "Хүргэгдсэн, хойшилсон захиалга бүрийг өдөр эсвэл долоо хоног бүр тайлагнана." },
      { title: "Ил тод хяналт", text: "Захиалга бүрийн явцыг порталаас харж, харилцагчдаа мэдэгдэнэ." },
    ],
    steps: [
      "Харилцагч тань танаас захиалж, төлбөрөө төлнө",
      "Та захиалгыг манай системд оруулна (эсвэл чатаар илгээнэ)",
      "Бид хот дотор хүргэж, статусыг нь шинэчилнэ",
      "Өдөр/долоо хоног бүр хүргэлтийн тайлан авна",
    ],
    stepsTitle: "Хэрхэн ажилладаг",
    stepsNote: "Бид бэлэн мөнгө цуглуулдаггүй — төлбөр таны болон харилцагчийн хооронд шууд явагдана.",
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
    features: ["Өдөрт 5 хүртэл захиалга", "Долоо хоног бүр тайлан", "Хот доторх хүргэлт", "Утас, чатаар захиалга өгөх"],
    priceFrom: "сард 150 000₮-с",
  },
  {
    id: "delivery-growth",
    service: "delivery",
    name: "Өсөлт",
    tagline: "Тогтмол борлуулалттай бизнест",
    features: ["Хязгааргүй захиалга", "Өдөр бүр тайлан", "Захиалгын портал", "Хүргэлтийн явцыг хянах"],
    priceFrom: null,
    highlight: true,
  },
  {
    id: "delivery-full",
    service: "delivery",
    name: "Бүрэн",
    tagline: "Агуулахаа ч бидэнд даатга",
    features: ["Өсөлт багцын бүх боломж", "Агуулахын бүртгэл", "Харилцагчид SMS мэдэгдэл", "Сарын тайлан"],
    priceFrom: null,
  },
  // Вэб
  {
    id: "web-landing",
    service: "web",
    name: "Landing",
    tagline: "Хурдан эхлэх нэг хуудас",
    features: ["1 хуудастай сайт", "3 хоногт хүлээлгэн өгнө", "Гар утсанд тохирсон", "Домэйн, хостинг тохиргоо"],
    priceFrom: null,
  },
  {
    id: "web-shop",
    service: "web",
    name: "Онлайн дэлгүүр",
    tagline: "Онлайнаар зарж, төлбөр авна",
    features: ["Барааны каталог", "Сагс, захиалга", "QPay төлбөрийн холболт", "Админ самбар"],
    priceFrom: null,
    highlight: true,
  },
  {
    id: "web-system",
    service: "web",
    name: "Систем",
    tagline: "Дотоод ажлаа цэгцэл",
    features: ["Захиалгын систем", "Агуулахын бүртгэл", "Тайлан, статистик", "Ажилтны эрхийн тохиргоо"],
    priceFrom: null,
  },
  // Автоматжуулалт
  {
    id: "auto-chatbot",
    service: "automation",
    name: "Чат бот",
    tagline: "Messenger-т автомат хариулт",
    features: ["FB/IG messenger автомат хариулт", "24/7 түгээмэл асуултад хариулна", "Бараа, үнийн мэдээлэл өгнө", "Оператор руу шилжүүлнэ"],
    priceFrom: null,
  },
  {
    id: "auto-robot",
    service: "automation",
    name: "Захиалгын робот",
    tagline: "Чатаас шууд бүртгэл",
    features: ["Чатаас захиалгыг автоматаар таньна", "Google Sheet эсвэл системд бүртгэнэ", "Хүргэлт рүү шууд дамжуулна", "Өдрийн тайлан"],
    priceFrom: null,
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

/* ------------------------------------------------------------------ */
/* /pricing — харьцуулах хүснэгт ба "Аль нь надад тохирох вэ?" сонгогч   */
/* ------------------------------------------------------------------ */

/** true = ✓, false = —, string = тухайн утга */
export type CompareCell = boolean | string;

export interface CompareRow {
  label: string;
  /** packagesFor(service)-ийн дарааллаар */
  values: CompareCell[];
}

export const compareRows: Record<ServiceSlug, CompareRow[]> = {
  delivery: [
    { label: "Захиалгын хязгаар", values: ["Өдөрт 5 хүртэл", "Хязгааргүй", "Хязгааргүй"] },
    { label: "Тайлангийн давтамж", values: ["7 хоног бүр", "Өдөр бүр", "Өдөр бүр + сарын"] },
    { label: "Хот доторх хүргэлт", values: [true, true, true] },
    { label: "Утас, чатаар захиалга өгөх", values: [true, true, true] },
    { label: "Захиалгын портал", values: [false, true, true] },
    { label: "Хүргэлтийн явцыг хянах", values: [false, true, true] },
    { label: "Харилцагчид SMS мэдэгдэл", values: [false, false, true] },
    { label: "Агуулахын бүртгэл", values: [false, false, true] },
    { label: "Дэмжлэгийн цаг", values: ["Ажлын өдөр 10–18", "Өдөр бүр 09–21", "Өдөр бүр 09–21"] },
  ],
  web: [
    { label: "Хуудасны тоо", values: ["1", "Хязгааргүй", "Хэрэгцээгээр"] },
    { label: "Хүлээлгэн өгөх хугацаа", values: ["3 ажлын өдөр", "2–3 долоо хоног", "Тохиролцоно"] },
    { label: "Гар утсанд тохирсон", values: [true, true, true] },
    { label: "Домэйн, хостинг тохиргоо", values: [true, true, true] },
    { label: "Барааны каталог, сагс", values: [false, true, false] },
    { label: "QPay төлбөрийн холболт", values: [false, true, true] },
    { label: "Админ самбар", values: [false, true, true] },
    { label: "Агуулахын бүртгэл", values: [false, false, true] },
    { label: "Тайлан, статистик", values: [false, "Энгийн", true] },
    { label: "Ажилтны эрхийн тохиргоо", values: [false, false, true] },
  ],
  automation: [
    { label: "FB/IG messenger автомат хариулт", values: [true, true] },
    { label: "24/7 түгээмэл асуултад хариулна", values: [true, true] },
    { label: "Бараа, үнийн мэдээлэл", values: [true, true] },
    { label: "Оператор руу шилжүүлэх", values: [true, true] },
    { label: "Чатаас захиалга таних", values: [false, true] },
    { label: "Google Sheets / системд бүртгэх", values: [false, true] },
    { label: "Хүргэлт рүү шууд дамжуулах", values: [false, true] },
    { label: "Өдрийн тайлан", values: [false, true] },
  ],
};

export interface PickerQuestion {
  q: string;
  /** Хариулт бүр багц (id) руу оноо нэмнэ */
  options: { label: string; scores: Record<string, number> }[];
}

export const pickerQuestions: Record<ServiceSlug, PickerQuestion[]> = {
  delivery: [
    {
      q: "Өдөрт хэдэн захиалга ирдэг вэ?",
      options: [
        { label: "5 хүртэл", scores: { "delivery-start": 2 } },
        { label: "6–20", scores: { "delivery-growth": 2 } },
        { label: "20-оос дээш", scores: { "delivery-growth": 1, "delivery-full": 2 } },
      ],
    },
    {
      q: "Өөрийн жолоочтой юу?",
      options: [
        { label: "Тийм, заримдаа тусламж хэрэгтэй", scores: { "delivery-start": 1 } },
        { label: "Үгүй, бүгдийг даатгана", scores: { "delivery-growth": 1, "delivery-full": 1 } },
      ],
    },
    {
      q: "Тайлан хэр олон хэрэгтэй вэ?",
      options: [
        { label: "Долоо хоногт нэг", scores: { "delivery-start": 1 } },
        { label: "Өдөр бүр", scores: { "delivery-growth": 1 } },
        { label: "Өдөр бүр + агуулахын үлдэгдэл", scores: { "delivery-full": 2 } },
      ],
    },
  ],
  web: [
    {
      q: "Сайтаар юу хиймээр байна?",
      options: [
        { label: "Бизнесээ танилцуулах", scores: { "web-landing": 2 } },
        { label: "Онлайнаар зарах", scores: { "web-shop": 2 } },
        { label: "Дотоод ажлаа цэгцлэх", scores: { "web-system": 2 } },
      ],
    },
    {
      q: "Хэдэн төрлийн бараатай вэ?",
      options: [
        { label: "Цөөн / бараагүй", scores: { "web-landing": 1 } },
        { label: "20-оос олон", scores: { "web-shop": 1, "web-system": 1 } },
      ],
    },
    {
      q: "Хэдэн хүн системд ажиллах вэ?",
      options: [
        { label: "Зөвхөн би", scores: { "web-landing": 1, "web-shop": 1 } },
        { label: "Хэд хэдэн ажилтан", scores: { "web-system": 2 } },
      ],
    },
  ],
  automation: [
    {
      q: "Өдөрт хэдэн чат ирдэг вэ?",
      options: [
        { label: "30 хүртэл", scores: { "auto-chatbot": 1 } },
        { label: "30-аас дээш", scores: { "auto-robot": 1 } },
      ],
    },
    {
      q: "Захиалгаа одоо хаана бүртгэдэг вэ?",
      options: [
        { label: "Бүртгэдэггүй / дэвтэрт", scores: { "auto-chatbot": 1 } },
        { label: "Excel, Sheets-д гараар", scores: { "auto-robot": 2 } },
      ],
    },
    {
      q: "Захиалгыг хүргэлт рүү шууд дамжуулах уу?",
      options: [
        { label: "Хэрэггүй", scores: { "auto-chatbot": 1 } },
        { label: "Тийм", scores: { "auto-robot": 2 } },
      ],
    },
  ],
};
