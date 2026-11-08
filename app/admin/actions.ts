"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { OrderStatus } from "@prisma/client";
import { ADMIN_COOKIE, checkPassword, isAdmin, sessionValue } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const STATUSES: OrderStatus[] = ["NEW", "CONTACTED", "ACTIVE", "CLOSED"];

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  // brute-force-ийг удаашруулна
  await new Promise((r) => setTimeout(r, 400));
  if (!checkPassword(password)) return { error: "Нууц үг буруу байна" };
  cookies().set(ADMIN_COOKIE, sessionValue()!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });
  redirect("/admin");
}

export async function logout() {
  cookies().delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin");
}

export async function updateStatus(formData: FormData) {
  if (!isAdmin()) redirect("/admin");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;
  if (!id || !STATUSES.includes(status)) return;
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
}
