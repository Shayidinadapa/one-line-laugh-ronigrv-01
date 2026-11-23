// The One-Line Laugh — entry program.
//
// Writes exactly one funny line to /output/entry.txt:
// a single sentence, 1-200 characters, one line, about everyday life,
// with the surprise landing in the last few words.
//
// The line is a constant baked into this file: the program performs no
// network access, reads no other file, and produces the same bytes on
// every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "I water my plants every Sunday, and every Monday they wilt a little just to keep me humble.";

const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUT_PATH = join(OUT_DIR, "entry.txt");

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(
      `entry must be 1-200 characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line (no newline characters)");
  }
}

validate(LINE);

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, LINE, "utf8");

console.log(`Wrote ${LINE.length} characters to ${OUT_PATH}`);
