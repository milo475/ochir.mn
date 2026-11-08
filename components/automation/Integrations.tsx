import { Reveal } from "@/components/Reveal";

/** "Хаана холбогддог вэ" — брэндийн лого биш, энгийн дүрс + нэр */
const ic = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const items: { name: string; text: string; icon: React.ReactNode }[] = [
  {
    name: "Facebook Messenger",
    text: "Хуудсанд ирсэн чат",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <path d="M14 3C8 3 3.5 7.3 3.5 13c0 3.1 1.4 5.8 3.7 7.6V25l4-2.2c.9.2 1.8.3 2.8.3 6 0 10.5-4.3 10.5-10S20 3 14 3z" {...ic} />
        <path d="m8.5 15.5 3.8-4 2.6 2.6 4.4-4" {...ic} />
      </svg>
    ),
  },
  {
    name: "Instagram DM",
    text: "Direct мессеж, сторигийн хариу",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h15A2.5 2.5 0 0 1 24 6.5v10a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4h0.5A2.5 2.5 0 0 1 4 16.5z" {...ic} />
        <circle cx="10" cy="11.5" r="1" fill="currentColor" />
        <circle cx="14" cy="11.5" r="1" fill="currentColor" />
        <circle cx="18" cy="11.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Google Sheets",
    text: "Захиалгын хүснэгт",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <rect x="5" y="4" width="18" height="20" rx="2" {...ic} />
        <path d="M5 10h18M5 15h18M5 20h18M11 10v14" {...ic} />
      </svg>
    ),
  },
  {
    name: "Telegram",
    text: "Танд шинэ захиалгын мэдэгдэл",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <path d="M24 5 3.5 13l7 2.5L21 8l-8 9 .5 6 3.5-4 5 3.5z" {...ic} />
      </svg>
    ),
  },
  {
    name: "Таны сайт / систем",
    text: "API эсвэл webhook-оор",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <rect x="3" y="5" width="22" height="18" rx="2.5" {...ic} />
        <path d="M3 10h22M11 15l-2.5 2.5L11 20M17 15l2.5 2.5L17 20" {...ic} />
      </svg>
    ),
  },
];

export function Integrations() {
  return (
    <section aria-labelledby="int-title" className="container-page mt-16 sm:mt-24">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Холболт</p>
        <h2 id="int-title" className="mt-3 text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
          Хаана холбогддог вэ?
        </h2>
      </Reveal>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((it, i) => (
          <Reveal as="li" key={it.name} delay={i * 0.05} className={`card flex flex-col items-start gap-3 p-5 ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent">{it.icon}</span>
            <span>
              <span className="block font-semibold leading-tight">{it.name}</span>
              <span className="mt-1 block text-sm text-muted">{it.text}</span>
            </span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
