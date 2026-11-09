import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { InstagramIcon, MessengerIcon } from "@/components/SocialIcons";
import { instagramDmUrl, messengerUrl } from "@/lib/site";

/** Хуудасны энгийн төгсгөл — блоггүй, дэвсгэргүй, төвд */
export function TalkEnd({ text, href }: { text: string; href: string }) {
  return (
    <section aria-labelledby="talk-title" className="container-page mt-16 sm:mt-24">
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 id="talk-title" className="text-[28px] font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          Ярилцъя
        </h2>
        <p className="mt-3 text-[16px] leading-relaxed text-text">{text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={href} className="btn-primary">
            Захиалга өгөх
          </Link>
          <a href={messengerUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost sm:w-60">
            <MessengerIcon className="h-[18px] w-[18px]" />
            Messenger-ээр бичих
          </a>
          <a href={instagramDmUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost sm:w-60">
            <InstagramIcon className="h-[18px] w-[18px]" />
            Instagram-аар бичих
          </a>
        </div>
      </Reveal>
    </section>
  );
}
