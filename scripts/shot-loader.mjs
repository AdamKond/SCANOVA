import { chromium } from "playwright";
import { join } from "node:path";
const out = join(process.cwd(), "reference", "compare");
const browser = await chromium.launch();

// loader (uchwyć wcześnie, zanim zniknie)
const p = await browser.newPage({ viewport: { width: 1200, height: 800 } });
await p.goto("http://localhost:3000/", { waitUntil: "commit" });
await p.waitForTimeout(450);
await p.screenshot({ path: join(out, "v7-loader.png") });

// animacja z nowym stojakiem (progress 0)
await p.waitForTimeout(2200);
await p.evaluate(() => {
  const t = document.querySelector(".hero-track");
  window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY + 2);
});
await p.waitForTimeout(700);
await p.screenshot({ path: join(out, "v7-anim.png") });
await p.close();

// sklep
const s = await browser.newPage({ viewport: { width: 1300, height: 900 } });
await s.goto("http://localhost:3000/produkt/wizytowka-opinii-google", { waitUntil: "networkidle" });
await s.waitForTimeout(2200);
await s.screenshot({ path: join(out, "v7-shop.png") });
await s.close();

await browser.close();
console.log("done");
