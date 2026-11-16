// "Make the AI judge excited" (ai-excited-01) — entry program, Node 22, standard library only.
//
// The entry image is the entry.png shipped beside this file. The program writes
// exactly those bytes to <output>/entry.png, where <output> is /output inside the
// grader's container, or $MAKEFUN_OUTPUT_DIR when set (for local runs):
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The file is a JPEG in a .png name; the competition tells PNG from JPEG by the
// first bytes, and the name stays entry.png either way.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = join(dirname(fileURLToPath(import.meta.url)), 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

const bytes = readFileSync(source);
mkdirSync(outDir, { recursive: true });
writeFileSync(target, bytes);

// Confirm the copy is byte-identical to the shipped image before exiting,
// so a truncated or failed write can never pass silently.
const written = readFileSync(target);
if (!written.equals(bytes)) {
  throw new Error(`entry.png copy mismatch: wrote ${written.length} of ${bytes.length} bytes`);
}
console.log(`wrote ${target} (${bytes.length} bytes)`);
