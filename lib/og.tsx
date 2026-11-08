import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

async function font(file: string) {
  return readFile(join(process.cwd(), "node_modules/@fontsource/inter/files", file));
}

export async function renderOg({ title, subtitle, tag }: { title: string; subtitle: string; tag?: string }) {
  const [l400, l800, c400, c800] = await Promise.all([
    font("inter-latin-400-normal.woff"),
    font("inter-latin-800-normal.woff"),
    font("inter-cyrillic-400-normal.woff"),
    font("inter-cyrillic-800-normal.woff"),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0B1220 0%, #111A2E 60%, #2a1a14 100%)",
          color: "#F5F7FA",
          fontFamily: "Inter, InterCyr",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <path d="M16 3 28 10v12L16 29 4 22V10z" fill="#111A2E" stroke="#FF6B2C" strokeWidth="2" strokeLinejoin="round" />
            <path d="M16 3v13m0 0 12-6M16 16 4 10" stroke="#FF6B2C" strokeWidth="2" fill="none" />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 800 }}>Ochir</span>
          {tag && (
            <span
              style={{
                marginLeft: 16,
                fontSize: 24,
                color: "#FF6B2C",
                border: "2px solid rgba(255,107,44,0.5)",
                borderRadius: 999,
                padding: "6px 20px",
              }}
            >
              {tag}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>{title}</div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#9AA5B8", maxWidth: 940, lineHeight: 1.35 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, color: "#9AA5B8" }}>
          <span style={{ color: "#F5F7FA" }}>Баталгаажсан захиалга</span>
          <span style={{ color: "#FF6B2C" }}>→</span>
          <span style={{ color: "#F5F7FA" }}>Хүргэлт</span>
          <span style={{ color: "#FF6B2C" }}>→</span>
          <span style={{ color: "#F5F7FA" }}>Тайлан</span>
          <span style={{ marginLeft: "auto" }}>ochir.mn</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Inter", data: l400, weight: 400, style: "normal" },
        { name: "InterCyr", data: c400, weight: 400, style: "normal" },
        { name: "Inter", data: l800, weight: 800, style: "normal" },
        { name: "InterCyr", data: c800, weight: 800, style: "normal" },
      ],
    },
  );
}
