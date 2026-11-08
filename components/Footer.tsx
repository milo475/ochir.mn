"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { InstagramIcon, MessengerIcon } from "./SocialIcons";
import { isActive, mainNav as nav } from "@/lib/nav";
import { instagramHandle, instagramUrl, messengerUrl, phone, phoneHref } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <span className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/mark-mono-white.svg" width={24} height={24} alt="" aria-hidden="true" />
            Ochir
          </span>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Онлайн дэлгүүр, жижиг бизнесийн хүргэлт, вэб сайт, AI автоматжуулалт — нэг дор, багцаар.
          </p>
          <p className="mt-6 text-xs text-muted">© {new Date().getFullYear()} Ochir</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Цэс</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {nav.map((n) => (
              <li key={n.href}>
                <Link className="hover:text-ink" href={n.href} aria-current={isActive(pathname, n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Холбоо барих</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a className="inline-flex items-center gap-2 hover:text-ink" href={messengerUrl} target="_blank" rel="noopener noreferrer">
                <MessengerIcon /> Messenger
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-ink" href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <InstagramIcon /> {instagramHandle}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-ink" href={phoneHref} aria-label={`Утсаар залгах: ${phone}`}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                </svg>
                {phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
