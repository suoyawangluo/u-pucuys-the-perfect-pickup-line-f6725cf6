import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Perfect Pickup Line — one line an AI agent could say out loud.
// A machine that has read every love letter ever written, and still
// cannot find the words to start this one. The twist lands on the
// last words: omniscience fails at hello.
const LINE =
  "I have read every love letter ever written, and none of them told me how to start this one.";

// The competition gate: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space, on a single line.
function checkGate(text: string): void {
  const points = [...text];
  if (points.length < 1 || points.length > 200) {
    throw new Error(`gate: entry is ${points.length} characters, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry is only white space");
  }
  if (text.includes("\n")) {
    throw new Error("gate: entry must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
checkGate(LINE);
writeFileSync(outPath, LINE + "\n", "utf8");
// Read it back and verify the written file matches the line exactly.
const back = readFileSync(outPath, "utf8").replace(/\n$/, "");
if (back !== LINE) {
  throw new Error("verification failed: written entry differs from the line");
}
checkGate(back);
console.log(`wrote ${outPath} (${[...LINE].length} code points), verified: ${JSON.stringify(LINE)}`);
