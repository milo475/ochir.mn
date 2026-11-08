import type { Metadata } from "next";
import Link from "next/link";
import type { OrderStatus } from "@prisma/client";
import { getPackage, getService } from "@/data/packages";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Logo } from "@/components/Logo";
import { logout } from "./actions";
import { LoginForm } from "./LoginForm";
import { STATUS_LABEL } from "@/lib/status";
import { StatusSelect } from "./StatusSelect";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Админ", robots: { index: false, follow: false } };

const STATUS_STYLE: Record<OrderStatus, string> = {
  NEW: "bg-accent text-bg",
  CONTACTED: "bg-sky-400/15 text-sky-300",
  ACTIVE: "bg-emerald-400/15 text-emerald-300",
  CLOSED: "bg-muted/15 text-muted",
};

const FILTERS: (OrderStatus | "ALL")[] = ["ALL", "NEW", "CONTACTED", "ACTIVE", "CLOSED"];

export default async function AdminPage({ searchParams }: { searchParams: { status?: string } }) {
  if (!adminConfigured()) {
    return (
      <Shell>
        <div className="card mx-auto mt-20 max-w-md p-8 text-center">
          <h1 className="text-xl font-bold">ADMIN_PASSWORD тохируулаагүй</h1>
          <p className="mt-2 text-sm text-muted">Орчны хувьсагчид ADMIN_PASSWORD нэмээд серверээ дахин асаана уу.</p>
        </div>
      </Shell>
    );
  }

  if (!isAdmin()) {
    return (
      <Shell>
        <div className="card mx-auto mt-20 max-w-sm p-8">
          <Logo />
          <h1 className="mt-6 text-xl font-bold">Админ нэвтрэх</h1>
          <LoginForm />
        </div>
      </Shell>
    );
  }

  const filter = FILTERS.includes(searchParams.status as OrderStatus) ? (searchParams.status as OrderStatus) : undefined;
  const [orders, counts] = await Promise.all([
    prisma.order.findMany({ where: filter ? { status: filter } : undefined, orderBy: { createdAt: "desc" }, take: 200 }),
    prisma.order.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);
  const countOf = (s: OrderStatus) => counts.find((c) => c.status === s)?._count._all ?? 0;
  const total = counts.reduce((a, c) => a + c._count._all, 0);
  const fmt = new Intl.DateTimeFormat("mn-MN", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Ulaanbaatar" });

  return (
    <Shell>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/"><Logo /></Link>
          <h1 className="text-lg font-semibold text-muted">Захиалгууд</h1>
        </div>
        <form action={logout}>
          <button className="btn-ghost min-h-[40px] text-sm">Гарах</button>
        </form>
      </header>

      <nav className="mt-6 flex gap-2 overflow-x-auto pb-1" aria-label="Статусаар шүүх">
        {FILTERS.map((f) => {
          const active = (f === "ALL" && !filter) || f === filter;
          return (
            <Link
              key={f}
              href={f === "ALL" ? "/admin" : `/admin?status=${f}`}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm ${active ? "border-accent bg-accent-soft text-accent" : "border-line text-muted hover:text-ink"}`}
            >
              {f === "ALL" ? "Бүгд" : STATUS_LABEL[f]} <span className="ml-1 opacity-70">{f === "ALL" ? total : countOf(f)}</span>
            </Link>
          );
        })}
      </nav>

      {orders.length === 0 ? (
        <p className="card mt-6 p-10 text-center text-muted">Захиалга алга.</p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {orders.map((o) => (
            <li key={o.id} className="card grid gap-4 p-5 md:grid-cols-[1.3fr_1.5fr_auto] md:items-center">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS_STYLE[o.status]}`}>{STATUS_LABEL[o.status]}</span>
                  <span className="font-mono text-xs text-muted">#{o.id.slice(-8).toUpperCase()}</span>
                </div>
                <p className="mt-2 truncate text-base font-semibold">{o.businessName}</p>
                <p className="mt-0.5 text-sm text-muted">
                  <a className="hover:text-ink" href={`tel:${o.phone}`}>{o.phone}</a> · {fmt.format(o.createdAt)}
                </p>
                <a
                  href={/^https?:\/\//.test(o.socialLink) ? o.socialLink : `https://${o.socialLink.replace(/^@/, "instagram.com/")}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-0.5 block truncate text-sm text-accent hover:underline"
                >
                  {o.socialLink}
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {o.services.map((s, i) => {
                  const pkg = o.packages.map((p) => getPackage(p)).find((p) => p?.service === s);
                  return (
                    <span key={`${s}${i}`} className="rounded-lg border border-line bg-bg px-2.5 py-1.5 text-xs">
                      <span className="text-muted">{getService(s)?.title ?? s}:</span> <span className="font-semibold">{pkg?.name ?? "—"}</span>
                    </span>
                  );
                })}
                {o.dailyOrders !== null && (
                  <span className="rounded-lg border border-line bg-bg px-2.5 py-1.5 text-xs">
                    <span className="text-muted">Өдөрт:</span> <span className="font-semibold">~{o.dailyOrders}</span>
                  </span>
                )}
              </div>
              <StatusSelect id={o.id} status={o.status} />
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="container-page min-h-dvh py-8">{children}</div>;
}
