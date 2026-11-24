// FridgeLight — the worst app idea ever pitched.
// Writes one sentence (at most 240 characters) to /output/entry.txt,
// or to $OUTPUT_PATH when set. Deterministic, stdlib only, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 240;

const ENTRY =
  "FridgeLight livestreams the inside of your fridge 24/7 so you can finally confirm the light really does go off when you close the door, and Premium pings you every single time it does, so you'll never miss a blackout again.";

function main(): void {
  const line = ENTRY.trim();
  // Count code points, not UTF-16 units, so the check matches the gate.
  const length = [...line].length;
  if (length === 0 || length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${length}`,
    );
  }
  if (/[\n\r]/.test(line) || line !== ENTRY) {
    throw new Error("entry must be a single line with no surrounding whitespace");
  }
  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  // No trailing newline: the gate counts every character in the file.
  writeFileSync(outPath, line, "utf8");
}

main();
