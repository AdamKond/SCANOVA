import { chromium } from "playwright";
import { join } from "node:path";
const browser = await chromium.launch();
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await m.waitForTimeout(2300);
await m.screenshot({ path: join(process.cwd(), "reference", "compare", "v11-hero-mobile.png") });
await browser.close();
console.log("done");
