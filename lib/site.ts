export const SITE_NAME = "Ochir";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ochir.mn").replace(/\/$/, "");
export const SITE_DESCRIPTION =
  "Улаанбаатарын онлайн дэлгүүр, жижиг бизнест зориулсан хүргэлт, вэб сайт, AI автоматжуулалтын багц үйлчилгээ.";

// TODO: Facebook page, Instagram хаяг бэлэн болмогц бодит холбоосоор солих
export const messengerUrl = "https://m.me/ochir.mn";
export const instagramUrl = "https://instagram.com/ochir.mn";

// TODO: бодит утасны дугаар ирэхэд энд бичнэ. null үед сайт дээр "Удахгүй" гэж харагдана.
export const CONTACT_PHONE: string | null = null;
// TODO: жишээ имэйл — бодит хаягаар солих
export const CONTACT_EMAIL = "hello@ochir.mn";
