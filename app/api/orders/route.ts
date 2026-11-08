import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizePhone, orderSchema } from "@/lib/order-schema";
import { notifyNewOrder } from "@/lib/notify";

export const dynamic = "force-dynamic";

// IP тус бүрт минутад 5 захиалга (нэг инстанс дотор хангалттай энгийн хамгаалалт)
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return NextResponse.json({ error: "Хэт олон хүсэлт. Түр хүлээгээд дахин оролдоно уу." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Буруу хүсэлт" }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? "Мэдээлэл буруу байна", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const d = parsed.data;

  try {
    const order = await prisma.order.create({
      data: {
        services: d.services,
        packages: d.packages,
        businessName: d.businessName,
        socialLink: d.socialLink,
        phone: normalizePhone(d.phone),
        dailyOrders: d.services.includes("delivery") ? (d.dailyOrders ?? null) : null,
      },
    });
    await notifyNewOrder(order);
    return NextResponse.json({ id: order.id }, { status: 201 });
  } catch (err) {
    console.error("[orders] create failed", err);
    return NextResponse.json({ error: "Захиалга хадгалахад алдаа гарлаа. Дахин оролдоно уу." }, { status: 500 });
  }
}
