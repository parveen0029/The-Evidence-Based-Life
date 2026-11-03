#!/usr/bin/env node
// Validate HTML & inline <script> integrity across index.html and selfcheck/index.html:
// 1. Every inline JavaScript <script> block parses cleanly with zero syntax/redeclaration errors.
// 2. Every static HTML id="..." attribute outside <script> blocks is globally unique.
// 3. Every static <label for="..."> attribute points to an existing id="..." in the document.

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const FILES = ['index.html', 'selfcheck/index.html'];

let totalScripts = 0;
let totalIds = 0;
let errors = 0;

for (const rel of FILES) {
  const full = join(ROOT, rel);
  if (!existsSync(full)) continue;
  const html = readFileSync(full, 'utf8');

  // 1. Check all inline <script> blocks (excluding application/ld+json or external src)
  const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let blockIdx = 0;
  for (const match of html.matchAll(scriptRegex)) {
    blockIdx++;
    const attrs = match[1] || '';
    const code = match[2] || '';
    if (/\btype\s*=\s*["']application\/ld\+json["']/i.test(attrs)) continue;
    if (/\bsrc\s*=/i.test(attrs) && !code.trim()) continue;
    totalScripts++;
    try {
      new Function(code);
    } catch (err) {
      console.error(`[FAIL] ${rel} inline <script> block #${blockIdx} failed to parse: ${err.message}`);
      errors++;
    }
  }

  // 2. Check static HTML ID uniqueness (strip <script> blocks first)
  const staticHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const idCounts = new Map();
  for (const m of staticHtml.matchAll(/\bid=["']([^"']+)["']/g)) {
    const id = m[1];
    idCounts.set(id, (idCounts.get(id) || 0) + 1);
    totalIds++;
  }

  for (const [id, count] of idCounts) {
    if (count > 1) {
      console.error(`[FAIL] ${rel} has duplicate static HTML id="${id}" (${count} occurrences)`);
      errors++;
    }
  }

  // 3. Check static <label for="..."> references
  for (const m of staticHtml.matchAll(/<label\b[^>]*\bfor=["']([^"']+)["']/gi)) {
    const targetId = m[1];
    if (!idCounts.has(targetId)) {
      console.error(`[FAIL] ${rel} has <label for="${targetId}"> with no matching id="${targetId}"`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\nHTML integrity check failed with ${errors} error(s).`);
  process.exit(1);
}

console.log(`HTML integrity check passed: ${totalScripts} inline script blocks parsed, ${totalIds} static DOM IDs verified unique.`);
