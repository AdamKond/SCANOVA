import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "reference", "compare");
mkdirSync(outDir, { recursive: true });
const url = "http://localhost:3000/produkt/wizytowka-opinii-google";

const browser = await chromium.launch();

// desktop
const d = await browser.newPage({ viewport: { width: 1700, height: 950 } });
await d.goto(url, { waitUntil: "networkidle" });
await d.waitForTimeout(500);
await d.screenshot({ path: join(outDir, "pdp-desktop.png") });
await d.close();

// mobile
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(url, { waitUntil: "networkidle" });
await m.waitForTimeout(500);
await m.screenshot({ path: join(outDir, "pdp-mobile.png"), fullPage: true });
await m.close();

await browser.close();
console.log("done");
