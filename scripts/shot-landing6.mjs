import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "reference", "compare");
mkdirSync(out, { recursive: true });
const base = "http://localhost:3000";
const browser = await chromium.launch();

const d = await browser.newPage({ viewport: { width: 1500, height: 950 } });
await d.goto(base + "/", { waitUntil: "networkidle" });
await d.waitForTimeout(1200);

// animowana sekcja (progress 0)
await d.evaluate(() => {
  const track = document.querySelector(".hero-track");
  const top = track.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, top + 2);
});
await d.waitForTimeout(700);
await d.screenshot({ path: join(out, "v6-anim.png") });

// dlaczego warto
await d.getByText("Opinie, które same się zbierają").scrollIntoViewIfNeeded();
await d.waitForTimeout(800);
await d.screenshot({ path: join(out, "v6-why.png") });
await d.close();

// PDP
const p = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
await p.goto(base + "/produkt/wizytowka-opinii-google", { waitUntil: "networkidle" });
await p.waitForTimeout(700);
await p.screenshot({ path: join(out, "v6-pdp.png") });
await p.click('button:has-text("Zestaw mix")');
await p.waitForTimeout(500);
await p.screenshot({ path: join(out, "v6-pdp-mix.png") });
await p.close();

await browser.close();
console.log("done");
