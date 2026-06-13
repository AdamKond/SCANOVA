import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "reference", "compare");
mkdirSync(outDir, { recursive: true });

const PROGRESS = [0, 0.25, 0.47, 0.675, 0.79, 0.95];

const targets = [
  { name: "demo", url: pathToFileURL(join(root, "reference", "hero-demo-v3.html")).href },
  { name: "next", url: "http://localhost:3000/" },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
});

for (const t of targets) {
  await page.goto(t.url, { waitUntil: "networkidle" });
  await page.waitForTimeout(700); // pozwól doładować obrazy
  for (let i = 0; i < PROGRESS.length; i++) {
    const p = PROGRESS[i];
    await page.evaluate((p) => {
      const track = document.querySelector(".hero-track");
      const total = track.offsetHeight - window.innerHeight;
      window.scrollTo(0, p * total);
    }, p);
    await page.waitForTimeout(350); // pozwól RAF zastosować klatkę
    const tag = String(p).replace("0.", "p");
    const file = join(outDir, `${t.name}-${i}-${tag}.png`);
    await page.screenshot({ path: file });
    console.log(`saved ${file}`);
  }
}

await browser.close();
console.log("done");
