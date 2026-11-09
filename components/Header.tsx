"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isActive, mainNav as nav } from "@/lib/nav";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  // Гар утасны бүтэн дэлгэцийн цэс нээлттэй үед хуудсыг гүйлгэхгүй
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Ochir нүүр хуудас" className="inline-flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/mark-transparent.svg" width={24} height={24} alt="" aria-hidden="true" />
          <span className="text-lg font-semibold leading-none text-ink">Ochir</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 text-sm lg:flex" aria-label="Үндсэн цэс">
            {nav.map((n) => {
              const on = isActive(pathname, n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={on ? "page" : undefined}
                  className={`border-b-2 py-1 transition-colors hover:text-ink ${on ? "border-accent text-ink" : "border-transparent text-text"}`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <Link href="/order" className="btn-primary hidden min-h-[40px] px-4 text-sm sm:inline-flex">
            Захиалах
          </Link>
          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Цэс хаах" : "Цэс нээх"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M5 5l10 10M15 5 5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-surface lg:hidden"
          aria-label="Гар утасны цэс"
        >
          <div className="container-page flex flex-col py-6">
            {nav.map((n) => {
              const on = isActive(pathname, n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={on ? "page" : undefined}
                  className={`border-b border-line py-4 text-2xl font-semibold ${on ? "text-ink underline decoration-accent decoration-2 underline-offset-8" : "text-text"}`}
                >
                  {n.label}
                </Link>
              );
            })}
            <Link href="/order" className="btn-primary mt-8">
              Захиалга өгөх
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
