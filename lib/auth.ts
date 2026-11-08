import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ochir_admin";

function token(password: string): string {
  return createHmac("sha256", password).update("ochir-admin-session-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  return safeEqual(token(input), token(pw));
}

export function sessionValue(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw ? token(pw) : null;
}

export function isAdmin(): boolean {
  const expected = sessionValue();
  const got = cookies().get(ADMIN_COOKIE)?.value;
  return Boolean(expected && got && safeEqual(got, expected));
}
