import { chromium } from "playwright";
import { join } from "node:path";
const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: 1000, height: 760 } });
await p.goto("http://localhost:3000/", { waitUntil: "commit" });
await p.waitForTimeout(500);
await p.screenshot({ path: join(process.cwd(), "reference", "compare", "v10-loader.png") });
await browser.close();
console.log("done");
