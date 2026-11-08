import Link from "next/link";
import { SITE_URL } from "@/lib/site";

/** Замын хэлхээ + BreadcrumbList JSON-LD. Сүүлийн элемент нь одоогийн хуудас. */
export function Breadcrumb({ items }: { items: { href: string; label: string }[] }) {
  const all = [{ href: "/", label: "Нүүр" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, item: `${SITE_URL}${it.href}` })),
  };
  return (
    <nav aria-label="Замын хэлхээ" className="text-sm text-muted">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((it, i) => {
          const last = i === all.length - 1;
          return (
            <li key={it.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {last ? (
                <span aria-current="page" className="text-ink">
                  {it.label}
                </span>
              ) : (
                <Link href={it.href} className="hover:text-ink">
                  {it.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
