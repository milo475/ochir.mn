import { Reveal } from "./Reveal";

export function SectionTitle({
  eyebrow,
  title,
  text,
  center = false,
  as: H = "h2",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H className="mt-3 text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">{title}</H>
      {text && <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">{text}</p>}
    </Reveal>
  );
}
