"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { InstagramIcon, MessengerIcon } from "./SocialIcons";
import { CONTACT_PHONE, instagramUrl, messengerUrl } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Онлайн дэлгүүр, жижиг бизнесийн хүргэлт, вэб сайт, AI автоматжуулалт — нэг дор, багцаар.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Үйлчилгээ</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link className="hover:text-ink" href="/services/delivery">Хүргэлт</Link></li>
            <li><Link className="hover:text-ink" href="/services/web">Вэб сайт & систем</Link></li>
            <li><Link className="hover:text-ink" href="/services/automation">AI автоматжуулалт</Link></li>
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
                <InstagramIcon /> Instagram
              </a>
            </li>
            <li>
              {CONTACT_PHONE ? (
                <a className="hover:text-ink" href={`tel:${CONTACT_PHONE.replace(/\D/g, "")}`}>Утас: {CONTACT_PHONE}</a>
              ) : (
                <span>Утас: Удахгүй</span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="container-page border-t border-line py-6 text-xs text-muted">
        © {new Date().getFullYear()} Ochir. Бүх эрх хуулиар хамгаалагдсан.
      </div>
    </footer>
  );
}
