// README structure parser and file manifest: Shared by both EPUB (tools/epub) and PDF (tools/pdf) builds.
// Parses the structure directly from README.md without maintaining a manual file list—
// adding a new chapter or long-form essay automatically updates both builds.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const REPO = 'https://github.com/parveen0029/The-Evidence-Based-Life';
export const SITE = 'https://parveen0029.github.io/The-Evidence-Based-Life/';
export const TITLE = 'The Evidence-Based Life';
export const RELEASE = `${REPO}/releases/download/epub-latest`;

// Always normalize line endings to LF across all builds: Windows checkout with core.autocrlf=true
// produces CRLF, which breaks string pattern matching on '\n' in build scripts.
export const read = p => readFileSync(resolve(ROOT, p), 'utf8').replace(/\r\n/g, '\n');
export const unique = arr => [...new Set(arr)];

export function gitCommit() {
  try {
    return execSync('git rev-parse HEAD', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'], encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

// Build timestamp with minute-level precision for continuous updates (UTC formatted).
export function buildStamp() {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'UTC', dateStyle: 'short', timeStyle: 'short' }).format(new Date());
}

export function stripBackLink(md) {
  return md.replace(/^\[← [^\]]+\]\([^)]*\)\s*\n/i, '');
}

// Extracts content sections between headers in README.md
export function readBook() {
  const readme = read('README.md');
  const lines = readme.split('\n');
  const between = (fromPatterns, toPatterns) => {
    const fromList = Array.isArray(fromPatterns) ? fromPatterns : [fromPatterns];
    const toList = Array.isArray(toPatterns) ? toPatterns : [toPatterns];
    const a = lines.findIndex(l => fromList.some(p => p instanceof RegExp ? p.test(l) : l.startsWith(p)));
    const b = lines.findIndex((l, i) => i > a && toList.some(p => p instanceof RegExp ? p.test(l) : l.startsWith(p)));
    if (a < 0 || b < 0) throw new Error(`Could not find section between ${fromList.join('/')} and ${toList.join('/')} in README.md`);
    return lines.slice(a, b).join('\n');
  };
  const description = between([/^#\s+/], ['[![', /^##\s+/])
    .split('\n').slice(1).map(l => l.replace(/<[^>]+>/g, '').trim()).filter(Boolean).join(' ');
  const frontMd = between([/^##\s+(?:What This Book Answers|\u8fd9\u672c\u4e66\u60f3\u56de\u7b54\u7684\u95ee\u9898)/i, /^##\s+/], [/^##\s+(?:Table of Contents|\u76ee\u5f55)/i]);
  const contentsMd = between([/^##\s+(?:Table of Contents|\u76ee\u5f55)/i], [/^##\s+(?:Chapters|\u6b63\u6587)/i]);
  const cleanContents = contentsMd.split('\n\n').filter(p => !p.includes('index.html')).join('\n\n');
  const bookFiles = unique([...cleanContents.matchAll(/\]\((book\/[^)#]+\.md)\)/g)].map(m => m[1]));
  const docFiles = unique([...readme.matchAll(/\]\((docs\/[^)#/]+\.md)\)/g)].map(m => m[1]));
  return { readme, description, frontMd, contentsMd: cleanContents, bookFiles, docFiles };
}
