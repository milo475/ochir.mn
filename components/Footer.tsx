"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { InstagramIcon, MessengerIcon } from "./SocialIcons";
import { isActive, mainNav as nav } from "@/lib/nav";
import { instagramDmUrl, instagramHandle, messengerUrl, phone, phoneHref } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="mt-16 border-t border-line bg-bg sm:mt-24">
      <div className="container-page grid grid-cols-2 gap-6 py-8 sm:gap-10 sm:py-12">
        <div>
          <p className="text-sm font-semibold text-ink">Цэс</p>
          <ul className="mt-3 space-y-2 text-sm text-text">
            {nav.map((n) => (
              <li key={n.href}>
                <Link className="hover:text-ink hover:underline" href={n.href} aria-current={isActive(pathname, n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Холбоо барих</p>
          <ul className="mt-3 space-y-2 text-sm text-text">
            <li>
              <a className="inline-flex items-center gap-2 hover:text-ink hover:underline" href={messengerUrl} target="_blank" rel="noopener noreferrer">
                <MessengerIcon /> Messenger
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-ink hover:underline" href={instagramDmUrl} target="_blank" rel="noopener noreferrer">
                <InstagramIcon /> {instagramHandle}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-ink hover:underline" href={phoneHref} aria-label={`Утсаар залгах: ${phone}`}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                </svg>
                {phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-page border-t border-line py-4 text-xs text-muted sm:py-5">© {new Date().getFullYear()} Ochir</div>
    </footer>
  );
}
