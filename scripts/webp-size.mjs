import { readFileSync } from "node:fs";
import { join } from "node:path";
const dir = join(process.cwd(), "public", "hero");
const files = ["stojak","naklejka","krazek","iphone-off","iphone-on"];
function size(buf){
  const fourcc = buf.toString("ascii",12,16);
  if(fourcc==="VP8 "){
    const w=(buf.readUInt16LE(26)&0x3fff), h=(buf.readUInt16LE(28)&0x3fff);
    return [w,h];
  }
  if(fourcc==="VP8L"){
    const b=buf.readUInt32LE(21);
    const w=(b&0x3fff)+1, h=((b>>14)&0x3fff)+1;
    return [w,h];
  }
  if(fourcc==="VP8X"){
    const w=((buf[24]|(buf[25]<<8)|(buf[26]<<16))&0xffffff)+1;
    const h=((buf[27]|(buf[28]<<8)|(buf[29]<<16))&0xffffff)+1;
    return [w,h];
  }
  return ["?","?"];
}
for(const f of files){
  const buf=readFileSync(join(dir,`${f}.webp`));
  const [w,h]=size(buf);
  console.log(`${f}: ${w} x ${h}  (chunk ${buf.toString("ascii",12,16)})`);
}
