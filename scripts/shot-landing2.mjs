import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "reference", "compare");
mkdirSync(out, { recursive: true });
const base = "http://localhost:3000";
const browser = await chromium.launch();

async function run(w, h, suffix, full = false) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1300);
  await page.screenshot({ path: join(out, `v2-hero-${suffix}.png`) });
  // comparison section
  await page.evaluate(() => window.scrollTo(0, document.querySelector("section.bg-zinc-100") ? document.querySelector("section.bg-zinc-100").offsetTop - 40 : 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: join(out, `v2-compare-${suffix}.png`), fullPage: false });
  await page.close();
  console.log("landing", suffix, "done");
}

await run(1700, 950, "desktop");
await run(390, 844, "mobile");

// PDP stojak (3 images now)
const p = await browser.newPage({ viewport: { width: 1400, height: 950 } });
await p.goto(base + "/produkt/wizytowka-opinii-google", { waitUntil: "networkidle" });
await p.waitForTimeout(700);
await p.screenshot({ path: join(out, "v2-pdp-stojak.png") });
await p.close();

await browser.close();
console.log("done");
