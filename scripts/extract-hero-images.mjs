import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const srcHtml = "C:/Users/Absolus/Downloads/hero-demo-v3.html";
const refDir = join(root, "reference");
const heroDir = join(root, "public", "hero");

mkdirSync(refDir, { recursive: true });
mkdirSync(heroDir, { recursive: true });

const html = readFileSync(srcHtml, "utf8");
copyFileSync(srcHtml, join(refDir, "hero-demo-v3.html"));

// Grab base64 payloads in document order.
const re = /data:image\/webp;base64,([A-Za-z0-9+/=]+)/g;
const payloads = [];
let m;
while ((m = re.exec(html)) !== null) payloads.push(m[1]);

const names = ["stojak", "naklejka", "krazek", "iphone-off", "iphone-on"];
if (payloads.length !== names.length) {
  console.error(`Expected ${names.length} webp images, found ${payloads.length}`);
  process.exit(1);
}

names.forEach((name, i) => {
  const buf = Buffer.from(payloads[i], "base64");
  const out = join(heroDir, `${name}.webp`);
  writeFileSync(out, buf);
  console.log(`${name}.webp -> ${buf.length} bytes`);
});

console.log("Done.");
