import "server-only";
import { getPackage, getService } from "@/data/packages";

interface NotifyOrder {
  id: string;
  services: string[];
  packages: string[];
  businessName: string;
  socialLink: string;
  phone: string;
  dailyOrders: number | null;
}

export function formatOrderMessage(o: NotifyOrder): string {
  const lines = [
    "🆕 Шинэ захиалга — Ochir",
    `Бизнес: ${o.businessName}`,
    `Утас: ${o.phone}`,
    `Сошиал: ${o.socialLink}`,
    `Үйлчилгээ: ${o.services.map((s) => getService(s)?.title ?? s).join(", ")}`,
    `Багц: ${o.packages.map((p) => getPackage(p)?.name ?? p).join(", ")}`,
  ];
  if (o.dailyOrders !== null) lines.push(`Өдрийн захиалга: ~${o.dailyOrders}`);
  lines.push(`ID: ${o.id}`);
  return lines.join("\n");
}

/**
 * ORDER_WEBHOOK_URL тохируулсан бол мэдэгдэл явуулна.
 * Telegram: https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<CHAT_ID>
 * Бусад webhook-д { text, order } JSON илгээнэ. Алдаа гарвал захиалгыг унагахгүй.
 */
export async function notifyNewOrder(order: NotifyOrder): Promise<void> {
  const raw = process.env.ORDER_WEBHOOK_URL;
  if (!raw) return;
  try {
    const url = new URL(raw);
    const text = formatOrderMessage(order);
    const body: Record<string, unknown> = { text, order };
    const chatId = url.searchParams.get("chat_id");
    if (chatId) body.chat_id = chatId;
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!res.ok) console.error("[notify] webhook", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("[notify] webhook failed", err);
  }
}
