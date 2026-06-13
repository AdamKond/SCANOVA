import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "reference", "compare");
mkdirSync(out, { recursive: true });
const base = "http://localhost:3000";
const browser = await chromium.launch();

async function shot(page, name) {
  await page.screenshot({ path: join(out, name) });
  console.log("saved", name);
}

// Landing desktop
const d = await browser.newPage({ viewport: { width: 1700, height: 950 } });
await d.goto(base + "/", { waitUntil: "networkidle" });
await d.waitForTimeout(1300);
await shot(d, "landing-desktop-hero.png");
await d.locator("#jak-to-dziala").scrollIntoViewIfNeeded();
await d.waitForTimeout(900);
await shot(d, "landing-desktop-feature.png");
await d.close();

// Landing mobile
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(base + "/", { waitUntil: "networkidle" });
await m.waitForTimeout(1300);
await shot(m, "landing-mobile-hero.png");
await m.locator("#jak-to-dziala").scrollIntoViewIfNeeded();
await m.waitForTimeout(900);
await shot(m, "landing-mobile-feature.png");
await m.close();

// PDP — sprawdź nowe zdjęcia dla każdego formatu
const p = await browser.newPage({ viewport: { width: 1400, height: 950 } });
await p.goto(base + "/produkt/wizytowka-opinii-google", { waitUntil: "networkidle" });
await p.waitForTimeout(600);
await shot(p, "pdp-stojak.png");
await p.click('button:has-text("Naklejka")');
await p.waitForTimeout(500);
await shot(p, "pdp-naklejka.png");
await p.click('button:has-text("Krążek")');
await p.waitForTimeout(500);
await shot(p, "pdp-krazek.png");
await p.close();

await browser.close();
console.log("done");
