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
          background: "#EFF0F3",
          color: "#0D0D0D",
          fontFamily: "Inter, InterCyr",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* public/brand/mark-transparent.svg */}
          <svg width="56" height="56" viewBox="0 0 512 512">
            <path d="M 413.6 228.2 A 160 160 0 1 1 283.8 98.4" fill="none" stroke="#FF6B2C" strokeWidth="64" />
            <circle cx="372" cy="140" r="34" fill="#0B1220" />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 800, color: "#0D0D0D" }}>Ochir</span>
          {tag && (
            <span
              style={{
                marginLeft: 16,
                fontSize: 24,
                color: "#0D0D0D",
                border: "2px solid #0D0D0D",
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
          <div style={{ marginTop: 24, fontSize: 30, color: "#2A2A2A", maxWidth: 940, lineHeight: 1.35 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, color: "#6B6B6B" }}>
          <span style={{ color: "#0D0D0D" }}>Баталгаажсан захиалга</span>
          <span style={{ color: "#FF6B2C" }}>→</span>
          <span style={{ color: "#0D0D0D" }}>Хүргэлт</span>
          <span style={{ color: "#FF6B2C" }}>→</span>
          <span style={{ color: "#0D0D0D" }}>Тайлан</span>
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
