import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const svg = readFileSync("public/brand/scanova-logo.svg", "utf8");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 1 });
await page.setContent(
  `<!doctype html><html><body style="margin:0">
     <div id="ico" style="width:512px;height:512px;background:#07194a;display:flex;align-items:center;justify-content:center">
       <div style="width:440px">${svg}</div>
     </div>
   </body></html>`,
  { waitUntil: "networkidle" },
);
// upewnij się, że svg skaluje się do kontenera
await page.evaluate(() => {
  const s = document.querySelector("#ico svg");
  if (s) { s.setAttribute("width", "440"); s.removeAttribute("height"); s.style.width = "440px"; s.style.height = "auto"; }
});
await page.waitForTimeout(150);
await page.locator("#ico").screenshot({ path: "app/icon.png" });
await browser.close();
console.log("icon written");
