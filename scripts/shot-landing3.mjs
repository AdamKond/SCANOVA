import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "reference", "compare");
mkdirSync(out, { recursive: true });
const base = "http://localhost:3000";
const browser = await chromium.launch();

async function scrollToText(page, text) {
  await page.getByText(text, { exact: false }).first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
}

// desktop
const d = await browser.newPage({ viewport: { width: 1700, height: 950 } });
await d.goto(base + "/", { waitUntil: "networkidle" });
await d.waitForTimeout(1300);
await d.screenshot({ path: join(out, "v3-hero-desktop.png") });
await scrollToText(d, "Dlaczego Scanova");
await d.screenshot({ path: join(out, "v3-compare-desktop.png") });
await scrollToText(d, "Jedna wizytówka");
await d.screenshot({ path: join(out, "v3-feature-desktop.png") });
await scrollToText(d, "Trzy kroki");
await d.screenshot({ path: join(out, "v3-how-desktop.png") });
await d.close();

// mobile
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(base + "/", { waitUntil: "networkidle" });
await m.waitForTimeout(1300);
await m.screenshot({ path: join(out, "v3-hero-mobile.png") });
await scrollToText(m, "Trzy kroki");
await m.screenshot({ path: join(out, "v3-how-mobile.png") });
await m.close();

await browser.close();
console.log("done");
