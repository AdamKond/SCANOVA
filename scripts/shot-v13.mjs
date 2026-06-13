import { chromium } from "playwright";
import { join } from "node:path";
const out = join(process.cwd(), "reference", "compare");
const browser = await chromium.launch();
// mobile hero
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await m.waitForTimeout(2300);
await m.screenshot({ path: join(out, "v13-hero-mobile.png") });
await m.close();
// desktop why-worth
const d = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await d.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await d.waitForTimeout(2300);
await d.getByText("same się zbierają").scrollIntoViewIfNeeded();
await d.waitForTimeout(900);
await d.screenshot({ path: join(out, "v13-why.png") });
await d.close();
await browser.close();
console.log("done");
