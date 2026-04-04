import fs from "fs";

const path = new URL("../src/data/products.ts", import.meta.url);
let s = fs.readFileSync(path, "utf8");

const blockRe =
  /\n  \{\n    "id": [\s\S]*?(?=\n  \},\n  \{|\n  \}\n\];)/g;

let nVong = 0,
  nSp = 0;
const out = s.replace(blockRe, (block) => {
  const catM = block.match(/"category":\s*"([^"]+)"/);
  if (!catM) return block;
  const cat = catM[1];
  if (cat === "Vòng tay") {
    nVong++;
    return block.replace(/\/images\/t(\d+)/g, "/images/v$1");
  }
  if (cat === "Áo" || cat === "Set" || cat === "Váy") {
    nSp++;
    return block.replace(/\/images\/t(\d+)/g, "/images/sp$1");
  }
  return block;
});
console.log("blocks vòng tay:", nVong, "áo/set/váy:", nSp);

fs.writeFileSync(path, out);
console.log("patched", path.pathname);
