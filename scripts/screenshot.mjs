// Хэрэглээ: BASE_URL=http://localhost:3210 node scripts/screenshot.mjs
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = process.env.OUT_DIR || "screenshots";
await mkdir(OUT, { recursive: true });

const launch = async () => {
  try {
    return await chromium.launch();
  } catch {
    return chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/chromium" });
  }
};
const browser = await launch();

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812, isMobile: true, deviceScaleFactor: 2 },
];

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
}

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, deviceScaleFactor: vp.deviceScaleFactor ?? 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}/home-hero-${vp.name}.png` });
  await scrollThrough(page);
  await page.screenshot({ path: `${OUT}/home-${vp.name}.png`, fullPage: true });

  // Үндсэн 6 хуудас: бүтэн скриншот + хуудас бүрийн хэвтээ гүйлт
  const pages = [
    ["home", "/"],
    ["delivery", "/services/delivery"],
    ["web", "/services/web"],
    ["automation", "/services/automation"],
    ["pricing", "/pricing"],
    ["faq", "/faq"],
  ];
  for (const [name, path] of pages) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await scrollThrough(page);
    await page.screenshot({ path: `${OUT}/page-${name}-${vp.name}.png`, fullPage: true });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(`${vp.name} ${path}: hOverflow=${over}px`);
  }

  await page.goto(`${BASE}/order`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/order-1-${vp.name}.png`, fullPage: true });
  const main = page.locator("main");
  await main.getByText("Хүргэлт", { exact: true }).click();
  await main.getByText("Вэб сайт & систем", { exact: true }).click();
  await page.getByRole("button", { name: "Үргэлжлүүлэх" }).click();
  await page.waitForTimeout(500);
  await main.getByText("Өсөлт", { exact: true }).click();
  await main.getByText("Онлайн дэлгүүр", { exact: true }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/order-2-${vp.name}.png`, fullPage: true });
  await page.getByRole("button", { name: "Үргэлжлүүлэх" }).click();
  await page.waitForTimeout(500);
  await page.getByLabel("Бизнесийн нэр").fill("Nomin Style");
  await page.getByLabel("Instagram / Facebook линк").fill("instagram.com/nomin.style");
  await page.getByLabel("Утасны дугаар").fill("9911 2233");
  await page.getByLabel(/Өдөрт дунджаар/).fill("15");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/order-3-${vp.name}.png`, fullPage: true });
  await page.getByRole("button", { name: "Үргэлжлүүлэх" }).click();
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/order-4-${vp.name}.png`, fullPage: true });

  if (process.env.SUBMIT === "1" && vp.name === "desktop") {
    await page.getByRole("button", { name: "Захиалга илгээх" }).click();
    await page.waitForURL(/\/order\/success/);
    await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/order-success-${vp.name}.png`, fullPage: true });
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`${vp.name}: errors=${errors.length ? errors.join(" | ") : "none"} hOverflow=${overflow}`);
  await ctx.close();
}

await browser.close();
console.log(`saved to ${OUT}/`);
