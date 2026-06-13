import { chromium } from "playwright";
import { join } from "node:path";
const out = join(process.cwd(), "reference", "compare");
const browser = await chromium.launch();
const d = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await d.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await d.waitForTimeout(2200);
await d.getByText("zebranych opinii").scrollIntoViewIfNeeded();
await d.waitForTimeout(1500); // niech liczniki dobiegną
await d.screenshot({ path: join(out, "v9-stats.png") });
await d.getByText("Pokochali").scrollIntoViewIfNeeded();
await d.waitForTimeout(900);
await d.screenshot({ path: join(out, "v9-testimonials.png") });
await d.close();
await browser.close();
console.log("done");
