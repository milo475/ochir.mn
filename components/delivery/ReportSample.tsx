import { Reveal } from "@/components/Reveal";
import { WeeklyReport } from "@/components/visuals/WeeklyReport";

/** "7 хоногийн тайлан ямар байдаг вэ?" — bar chart + жишээ мөрүүд */

type Status = "Хүргэгдсэн" | "Замд" | "Хойшилсон";
const rows: { date: string; id: string; district: string; status: Status }[] = [
  { date: "11/08 14:20", id: "#1052", district: "Баянзүрх", status: "Хүргэгдсэн" },
  { date: "11/08 13:05", id: "#1051", district: "Хан-Уул", status: "Хүргэгдсэн" },
  { date: "11/08 12:40", id: "#1050", district: "Сүхбаатар", status: "Замд" },
  { date: "11/08 11:15", id: "#1049", district: "Сонгинохайрхан", status: "Хойшилсон" },
  { date: "11/07 17:50", id: "#1048", district: "Баянгол", status: "Хүргэгдсэн" },
  { date: "11/07 16:30", id: "#1047", district: "Чингэлтэй", status: "Хүргэгдсэн" },
];

const pill: Record<Status, string> = {
  Хүргэгдсэн: "bg-accent/15 text-accent",
  Замд: "bg-ink/10 text-ink",
  Хойшилсон: "border border-muted/40 text-muted",
};

export function ReportSample() {
  return (
    <section aria-labelledby="report-title" className="container-page mt-16 sm:mt-24">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Тайлан</p>
        <h2 id="report-title" className="mt-3 text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
          7 хоногийн тайлан ямар байдаг вэ?
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
          Захиалга бүр хэзээ, хаана, ямар статустай байгааг нэг дороос харна. Хойшилсон захиалга яагаад хойшилсныг ч тэмдэглэнэ.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.25fr]">
        <Reveal className="min-w-0 rounded-2xl border border-line bg-card p-5 sm:p-6">
          <WeeklyReport />
        </Reveal>
        <Reveal delay={0.06} className="min-w-0 rounded-2xl border border-line bg-card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold">Захиалгын мөрүүд</p>
            <span className="rounded-full border border-muted/40 px-2 py-0.5 text-[11px] text-muted">жишээ</span>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[340px] text-left text-[13px] sm:text-sm">
              <caption className="sr-only">Жишээ тайлангийн мөрүүд</caption>
              <thead className="text-muted">
                <tr>
                  <th scope="col" className="pb-2 font-medium">Огноо</th>
                  <th scope="col" className="pb-2 font-medium">Захиалга</th>
                  <th scope="col" className="pb-2 font-medium">Дүүрэг</th>
                  <th scope="col" className="pb-2 text-right font-medium">Статус</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-line">
                    <td className="py-2.5 pr-2 tabular-nums text-muted">{r.date}</td>
                    <td className="py-2.5 pr-2 font-semibold tabular-nums">{r.id}</td>
                    <td className="py-2.5 pr-2">{r.district}</td>
                    <td className="py-2.5 text-right">
                      <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${pill[r.status]}`}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
