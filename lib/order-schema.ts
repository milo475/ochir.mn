import { z } from "zod";
import { packages, serviceSlugs, type ServiceSlug } from "@/data/packages";

const slugEnum = z.enum(serviceSlugs as [ServiceSlug, ...ServiceSlug[]]);

export const PHONE_RE = /^(\+?976)?[\s-]?\d{4}[\s-]?\d{4}$/;

export const orderSchema = z
  .object({
    services: z.array(slugEnum).min(1, "Дор хаяж нэг үйлчилгээ сонгоно уу").max(3),
    packages: z.array(z.string()).min(1).max(3),
    businessName: z.string().trim().min(2, "Бизнесийн нэрээ оруулна уу").max(120),
    socialLink: z.string().trim().min(3, "Instagram/Facebook линкээ оруулна уу").max(300),
    phone: z.string().trim().regex(PHONE_RE, "Утасны дугаар 8 оронтой байна"),
    dailyOrders: z.number().int().min(0).max(100000).nullable().optional(),
    // Spam-аас хамгаалах нуусан талбар — хүн бөглөхгүй.
    website: z.string().max(0).optional(),
  })
  .superRefine((data, ctx) => {
    const unique = new Set(data.services);
    if (unique.size !== data.services.length) {
      ctx.addIssue({ code: "custom", path: ["services"], message: "Давхардсан үйлчилгээ" });
    }
    for (const slug of data.services) {
      const chosen = data.packages.filter((id) => packages.find((p) => p.id === id)?.service === slug);
      if (chosen.length !== 1) {
        ctx.addIssue({ code: "custom", path: ["packages"], message: "Үйлчилгээ бүрт нэг багц сонгоно уу" });
      }
    }
    for (const id of data.packages) {
      const pkg = packages.find((p) => p.id === id);
      if (!pkg || !unique.has(pkg.service)) {
        ctx.addIssue({ code: "custom", path: ["packages"], message: "Буруу багц" });
      }
    }
    if (unique.has("delivery") && (data.dailyOrders === null || data.dailyOrders === undefined)) {
      ctx.addIssue({ code: "custom", path: ["dailyOrders"], message: "Өдрийн дундаж захиалгын тоог оруулна уу" });
    }
  });

export type OrderInput = z.infer<typeof orderSchema>;

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("976") ? digits.slice(3) : digits;
}
