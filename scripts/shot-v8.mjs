import { chromium } from "playwright";
import { join } from "node:path";
const out = join(process.cwd(), "reference", "compare");
const browser = await chromium.launch();
const d = await browser.newPage({ viewport: { width: 1500, height: 950 } });
await d.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await d.waitForTimeout(2200); // przeczekaj loader
await d.screenshot({ path: join(out, "v8-hero.png") });

// animacja: notif + payoff (progress ~0.9)
await d.evaluate(() => {
  const t = document.querySelector(".hero-track");
  const top = t.getBoundingClientRect().top + window.scrollY;
  const total = t.offsetHeight - window.innerHeight;
  window.scrollTo(0, top + 0.9 * total);
});
await d.waitForTimeout(500);
await d.screenshot({ path: join(out, "v8-payoff.png") });

// feature section
await d.getByText("Jedna wizytówka").scrollIntoViewIfNeeded();
await d.waitForTimeout(700);
await d.screenshot({ path: join(out, "v8-feature.png") });
await d.close();
await browser.close();
console.log("done");
