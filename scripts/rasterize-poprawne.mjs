import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const svg = readFileSync("brand_assets/poprawne.svg", "utf8");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1120, height: 1540 }, deviceScaleFactor: 2 });
await page.setContent(
  `<!doctype html><html><body style="margin:0;background:transparent">${svg}</body></html>`,
  { waitUntil: "networkidle" },
);
const el = page.locator("svg").first();
await el.screenshot({ path: "public/brand/poprawne.png", omitBackground: true });
await browser.close();
console.log("done");
