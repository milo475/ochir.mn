import { chromium } from "@playwright/test";
const out = "/tmp/claude-1000/-home-kali-ochir-mn/1a1a1d24-3eae-4ad3-84c3-5c0604e6ead3/scratchpad/pages";
const b = await chromium.launch({ executablePath: "/usr/bin/chromium" });
const pages = (process.argv[2] ?? "/,/faq,/pricing,/pricing?tab=web,/services/delivery").split(",");
for (const [w, name] of [[1440, "d"], [375, "m"]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 500, deviceScaleFactor: 1 });
  for (const path of pages) {
    const p = await ctx.newPage();
    const errs = [];
    p.on("pageerror", (e) => errs.push(e.message));
    p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    await p.goto("http://localhost:3210" + path, { waitUntil: "networkidle" });
    for (let y = 0; y < 12000; y += 600) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(80); }
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1500);
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    const slug = path.replace(/[/?=]/g, "_") || "_";
    await p.screenshot({ path: `${out}/${name}${slug}.png`, fullPage: true });
    console.log(name, path, "overflow", ov, "errors", errs.length ? errs : "none");
    await p.close();
  }
}
await b.close();
