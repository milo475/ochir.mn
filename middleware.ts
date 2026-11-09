import { NextResponse, type NextRequest } from "next/server";
import { LEGACY_PACKAGE_IDS } from "@/data/packages";

/** /order?plan=delivery-growth (эсвэл ?package=) → /order?plan=pro — хуучин хүргэлтийн багцын холбоосыг дэмжинэ */
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  let changed = false;
  for (const key of ["plan", "package"]) {
    const v = url.searchParams.get(key);
    if (v && LEGACY_PACKAGE_IDS[v]) {
      url.searchParams.delete(key);
      url.searchParams.set("plan", LEGACY_PACKAGE_IDS[v]);
      changed = true;
    }
  }
  return changed ? NextResponse.redirect(url, 308) : NextResponse.next();
}

export const config = { matcher: "/order" };
