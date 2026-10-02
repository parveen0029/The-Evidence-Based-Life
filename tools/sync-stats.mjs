// Synchronize Statistics: Recalculates book-wide metrics and syncs figures across files.
// Execution sequence:
// 1. Recalculates corpus statistics and updates README.md, index.html, and tools/og.html;
// 2. Invokes check-refs.mjs to refresh docs/citation-cross-reference.md;
// 3. Invokes check-plain.mjs to audit plain English descriptions (warnings only, does not halt);
// 4. Captures tools/og.html into og.png via headless Chrome.
//
// Usage:
//   node tools/sync-stats.mjs                   # Full run with screenshot
//   node tools/sync-stats.mjs --no-screenshot   # Skip screenshot generation
//   node tools/sync-stats.mjs --check           # Check only, exits with code 1 if stale (for CI)
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const read = f => readFileSync(join(ROOT, f), 'utf8');

// Cost weighting definitions
const W = {
  money: { '0': 0, 'Low': 1, 'High': 2 },
  time: { 'Low': 0, 'Med': 1, 'High': 2 },
  will: { 'No': 0, 'Some': 1, 'Yes': 2 },
};

function ratioOf(cost, level) {
  if (level === 'High') return cost === 0 ? 'Very High' : cost <= 2 ? 'High' : 'Moderate';
  return level === 'Med' && cost === 0 ? 'High' : 'Moderate';
}

const bookFiles = readdirSync(join(ROOT, 'book')).filter(f => f.endsWith('.md')).sort();
const sections = bookFiles.length;
let entries = 0, dispute = 0, todo = 0, links = 0;
const grade = { A: 0, B: 0, C: 0 };
const ratio = { 'Very High': 0, 'High': 0, 'Moderate': 0 };

for (const f of bookFiles) {
  for (const line of read(join('book', f)).split(/\r?\n/)) {
    if (line.startsWith('### ')) entries++;
    const g = line.match(/^- Evidence grade:\s*([ABC])/i);
    if (g) grade[g[1].toUpperCase()]++;
    if (/^- Notes:.*(?:dispute|controvers)/i.test(line)) dispute++;
    if (/\b(?:TODO|to be verified|under verification)\b/i.test(line)) todo++;
    if (/^- (?:Sources|Notes):/i.test(line)) links += (line.match(/https?:\/\//g) ?? []).length;
    const t = line.match(/<!--\s*Cost Tag:\s*Money=(\S+)\s+Time=(\S+)\s+Willpower=(\S+)\s+Benefit=(\S+)\s+Metric=/i);
    if (t) {
      const m = W.money[t[1]] ?? 0;
      const tm = W.time[t[2]] ?? 0;
      const w = W.will[t[3]] ?? 0;
      const r = ratioOf(m + tm + w, t[4]);
      ratio[r] = (ratio[r] || 0) + 1;
    }
  }
}

const tagged = ratio['Very High'] + ratio['High'] + ratio['Moderate'];
if (tagged !== entries) console.warn(`Warning: ${entries - tagged} rules lack cost tags; ratio counts do not match total entries`);
if (grade.A + grade.B + grade.C !== entries) console.warn('Warning: Evidence grade count does not match total entries; please check for missing grades');

// Percentage allocation using Largest Remainder Method to ensure exact 100% sum
const ORDER = ['Very High', 'High', 'Moderate'];
const pct = {}, rem = {};
for (const k of ORDER) {
  const exact = ratio[k] * 100 / entries;
  pct[k] = Math.floor(exact);
  rem[k] = exact - pct[k];
}
const short = 100 - ORDER.reduce((s, k) => s + pct[k], 0);
for (const k of [...ORDER].sort((a, b) => rem[b] - rem[a]).slice(0, Math.max(short, 0))) pct[k]++;

console.log(`Rules: ${entries} | Chapters: ${sections} | Grade A: ${grade.A}, B: ${grade.B}, C: ${grade.C} | Disputed: ${dispute} | TODO: ${todo} | Sources: ${links}`);
console.log(`ROI Distribution: Very High ${ratio['Very High']} (${pct['Very High']}%) | High ${ratio['High']} (${pct['High']}%) | Moderate ${ratio['Moderate']} (${pct['Moderate']}%)`);
console.log('');

const EDITS = [
  ['tools/og.html', 'og recommendations count', /<b>(\d+)<\/b>\s+(?:Recommendations|\u6761\u5efa\u8bae)/gi, `<b>${entries}</b> Recommendations`],
  ['tools/og.html', 'og Grade A count', /(?:Grade A Evidence:\s*<b>(\d+)<\/b>\s+Rules|A\s*\u7ea7\u8bc1\u636e\s*<b>(\d+)<\/b>\s*\u6761)/gi, `Grade A Evidence: <b>${grade.A}</b> Rules`],
  ['tools/og.html', 'og links count', /<b>(\d+)<\/b>\s+(?:Peer-Reviewed Sources|\u6761\u539f\u59cb\u6587\u732e\u94fe\u63a5)/gi, `<b>${links}</b> Peer-Reviewed Sources`],
  ['README.md', 'Hero recommendations count', /(\d+)\s+(?:recommendations|\u6761\u5efa\u8bae)/gi, `${entries} recommendations`],
  ['README.md', 'Entries badge', /(?:%E6%9D%A1%E7%9B%AE-(\d+)%20%E6%9D%A1|Rules-(\d+))/gi, `Rules-${entries}`],
  ['README.md', 'Evidence grade badge', /A%20(\d+)%20%C2%B7%20B%20\d+%20%C2%B7%20C%20\d+/g, `A%20${grade.A}%20%C2%B7%20B%20${grade.B}%20%C2%B7%20C%20${grade.C}`],
  ['README.md', 'Source links badge', /-(\d+)%20(?:%E6%9D%A1%E9%93%BE%E6%8E%A5|Sources)/gi, `-${links}%20Sources`],
  ['index.html', 'Description recommendations count', /(\d+)\s+(?:recommendations|\u6761\u5efa\u8bae)/gi, `${entries} recommendations`],
  ['index.html', 'numberOfPages', /numberOfPages":(\d+)/g, `numberOfPages":${entries}`],
  ['index.html', 'Header stats', /(\d+)\s+(?:chapters|sections|\u8282)\s*,?\s*(\d+)\s+(?:rules|recommendations|\u6761)/gi, `${sections} chapters, ${entries} rules`],
  ['index.html', 'Footer files count', /(?:under\s+`book\/`\s*\((\d+)\s+files\)|`book\/`\s*\u4e0b\u7684\s*(\d+)\s*\u4e2a\u6587\u4ef6)/gi, `under \`book/\` (${sections} files)`],
];

const texts = new Map();
const stale = [];
for (const [file, label, pattern, repl] of EDITS) {
  if (!existsSync(join(ROOT, file))) continue;
  const text = texts.get(file) ?? read(file);
  const found = [...text.matchAll(pattern)];
  if (found.length === 0) continue;
  const old = found[0][1] ?? found[0][2] ?? found[0][0];
  const updated = text.replace(pattern, () => repl);
  texts.set(file, updated);
  if (updated === text) {
    console.log(`  ${file} ${label}: ${old} (up to date)`);
    continue;
  }
  stale.push(`${file} ${label}`);
  console.log(`  ${file} ${label}: ${old} -> ${CHECK ? 'STALE' : `UPDATED (${found.length} instances)`}`);
}

if (CHECK) {
  if (stale.length === 0) {
    console.log('\nAll statistics checks passed.');
    process.exit(0);
  }
  console.log(`\nFound ${stale.length} stale statistics. Run "node tools/sync-stats.mjs" to synchronize.`);
  process.exit(1);
}

for (const [file, text] of texts) {
  if (text !== read(file)) writeFileSync(join(ROOT, file), text, 'utf8');
}

// 2. Invoke check-refs.mjs to update docs/citation-cross-reference.md
const runTool = (name, args = []) => spawnSync(process.execPath, [join(ROOT, 'tools', name), ...args], { stdio: 'inherit' }).status;
console.log('');
if (runTool('check-refs.mjs') !== 0) throw new Error('check-refs.mjs failed');

// 3. Invoke check-plain.mjs (informational warnings, does not halt execution)
console.log('');
if (runTool('check-plain.mjs', ['--stat']) !== 0) {
  console.log('Plain language audit flagged items for review. See tools/check-plain.mjs.');
}

if (process.argv.includes('--no-screenshot')) process.exit(0);

// 4. Capture og.png using headless Chrome
const CHROME_PATHS = [
  process.env.CHROME,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
];
const chrome = CHROME_PATHS.find(p => p && existsSync(p));
if (!chrome) {
  console.log('Chrome executable not found. Pass --no-screenshot to skip image generation.');
  process.exit(0);
}

const profile = mkdtempSync(join(tmpdir(), 'og-shot-'));
const target = join(ROOT, 'og.png');
const startedAt = Date.now();

spawnSync(chrome, [
  '--headless', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--window-size=1200,630', `--user-data-dir=${profile}`, `--screenshot=${target}`,
  pathToFileURL(join(ROOT, 'tools', 'og.html')).href,
], { stdio: 'ignore' });
rmSync(profile, { recursive: true, force: true });

const png = statSync(target);
if (png.mtimeMs < startedAt - 1000) throw new Error('og.png was not written during this execution run');
if (png.size < 80 * 1024 || png.size > 500 * 1024) {
  throw new Error(`og.png file size is unexpected (${png.size} bytes); expected between 80KB and 500KB`);
}
console.log(`\nog.png generated successfully: ${png.size} bytes.`);
