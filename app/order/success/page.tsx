import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Захиалга хүлээн авлаа",
  description: "Таны захиалгыг хүлээн авлаа. Бид 24 цагийн дотор холбогдоно.",
  robots: { index: false },
};

export default function SuccessPage({ searchParams }: { searchParams: { id?: string } }) {
  const ref = typeof searchParams.id === "string" ? searchParams.id.slice(-8).toUpperCase() : null;
  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-16">
      <div className="card w-full max-w-lg p-8 text-center sm:p-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-soft">
          <svg className="h-8 w-8 text-accent" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold sm:text-3xl">Захиалга хүлээн авлаа!</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Баярлалаа. Манай баг 24 цагийн дотор таны утсаар холбогдож, үнийн санал болон дараагийн алхмуудыг танилцуулна.
        </p>
        {ref && (
          <p className="mt-6 rounded-xl border border-line bg-bg px-4 py-3 text-sm">
            Захиалгын дугаар: <span className="font-mono font-semibold text-accent">#{ref}</span>
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-primary">Нүүр хуудас</Link>
          <Link href="/services/automation" className="btn-ghost">Автоматжуулалт үзэх</Link>
        </div>
      </div>
    </div>
  );
}
