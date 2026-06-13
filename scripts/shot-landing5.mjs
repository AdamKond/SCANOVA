import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "reference", "compare");
mkdirSync(out, { recursive: true });
const base = "http://localhost:3000";
const browser = await chromium.launch();

const d = await browser.newPage({ viewport: { width: 1700, height: 950 } });
await d.goto(base + "/", { waitUntil: "networkidle" });
await d.waitForTimeout(1400);
await d.screenshot({ path: join(out, "v5-hero.png") });

// menu otwarte
await d.click('button[aria-label="Menu"]');
await d.waitForTimeout(400);
await d.screenshot({ path: join(out, "v5-menu.png") });
await d.keyboard.press("Escape").catch(() => {});
await d.click("body", { position: { x: 850, y: 500 } }).catch(() => {});

// animacja gwiazdek
await d.getByText("Opinie, które robią różnicę").scrollIntoViewIfNeeded();
await d.waitForTimeout(1200);
await d.screenshot({ path: join(out, "v5-stars.png") });

// pasek pigułek na dole
await d.getByText("Co zyskujesz").scrollIntoViewIfNeeded();
await d.waitForTimeout(700);
await d.screenshot({ path: join(out, "v5-pills.png") });
await d.close();

const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(base + "/", { waitUntil: "networkidle" });
await m.waitForTimeout(1400);
await m.screenshot({ path: join(out, "v5-hero-mobile.png") });
await m.close();

await browser.close();
console.log("done");
