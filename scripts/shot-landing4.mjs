import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "reference", "compare");
mkdirSync(out, { recursive: true });
const base = "http://localhost:3000";
const browser = await chromium.launch();

// desktop
const d = await browser.newPage({ viewport: { width: 1700, height: 950 } });
await d.goto(base + "/", { waitUntil: "networkidle" });
await d.waitForTimeout(1500);
await d.screenshot({ path: join(out, "v4-hero-desktop.png") });

// animacja w momencie powiadomienia (progress ~0.82)
await d.evaluate(() => {
  const track = document.querySelector(".hero-track");
  const rect = track.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  const total = track.offsetHeight - window.innerHeight;
  window.scrollTo(0, top + 0.82 * total);
});
await d.waitForTimeout(500);
await d.screenshot({ path: join(out, "v4-notif.png") });

await d.getByText("Trzy kroki", { exact: false }).first().scrollIntoViewIfNeeded();
await d.waitForTimeout(800);
await d.screenshot({ path: join(out, "v4-how-desktop.png") });

await d.getByText("Najczęstsze pytania", { exact: false }).first().scrollIntoViewIfNeeded();
await d.waitForTimeout(800);
await d.screenshot({ path: join(out, "v4-footer.png") });
await d.close();

// mobile hero
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(base + "/", { waitUntil: "networkidle" });
await m.waitForTimeout(1500);
await m.screenshot({ path: join(out, "v4-hero-mobile.png") });
await m.close();

await browser.close();
console.log("done");
