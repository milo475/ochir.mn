/** Header, footer, гар утасны цэсийн нийтлэг навигац */
export const mainNav = [
  { href: "/", label: "Нүүр" },
  { href: "/services/delivery", label: "Хүргэлт" },
  { href: "/services/web", label: "Вэб & систем" },
  { href: "/services/automation", label: "AI автоматжуулалт" },
  { href: "/pricing", label: "Үнэ" },
  { href: "/faq", label: "Асуулт" },
];

export function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
