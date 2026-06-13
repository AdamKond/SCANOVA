import { chromium } from "playwright";
import { join } from "node:path";
const out = join(process.cwd(), "reference", "compare");
const browser = await chromium.launch();
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await m.waitForTimeout(3000);
// czy animacja istnieje na mobile?
const has = await m.evaluate(() => !!document.querySelector(".hero-track"));
console.log("hero-track present:", has);
if (has) {
  // przewiń do ~60% animacji
  await m.evaluate(() => {
    const t = document.querySelector(".hero-track");
    const top = t.getBoundingClientRect().top + window.scrollY;
    const total = t.offsetHeight - window.innerHeight;
    window.scrollTo(0, top + 0.62 * total);
  });
  await m.waitForTimeout(600);
  await m.screenshot({ path: join(out, "v16-anim-mobile.png") });
}
await browser.close();
console.log("done");
