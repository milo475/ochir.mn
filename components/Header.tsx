"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { isActive, mainNav as nav } from "@/lib/nav";


export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" aria-label="Ochir нүүр хуудас">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm xl:gap-7 text-muted lg:flex" aria-label="Үндсэн цэс">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(pathname, n.href) ? "page" : undefined}
              className={`border-b-2 py-1 transition-colors hover:text-ink ${
                isActive(pathname, n.href) ? "border-accent text-ink" : "border-transparent"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/order" className="btn-primary hidden min-h-[40px] px-4 text-sm sm:inline-flex">
            Захиалах
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Цэс хаах" : "Цэс нээх"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M5 5l10 10M15 5 5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="container-page grid gap-1 pb-4 lg:hidden" aria-label="Гар утасны цэс">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(pathname, n.href) ? "page" : undefined}
              className={`rounded-xl border-l-2 px-3 py-3 text-[15px] hover:bg-card ${
                isActive(pathname, n.href) ? "border-accent bg-card text-ink" : "border-transparent text-ink/90"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/order" className="btn-primary mt-2">
            Захиалга өгөх
          </Link>
        </nav>
      )}
    </header>
  );
}
