// Plain language verification: Ensures the "In plain terms" section remains accessible, concise, and jargon-free.
// Readers rely heavily on this summary card on search pages.
//
// Usage:
//   node tools/check-plain.mjs            # Lists all non-compliant entries, exit code 1 on violations (for CI)
//   node tools/check-plain.mjs --stat     # Prints summary counts only
//   node tools/check-plain.mjs --numbers  # Adds check for novel numbers not found in Benefit/Cost fields
//
// Checks:
// 1. Length: Keep concise (recommended <= 140 words).
// 2. Academic/Clinical Jargon: Flags statistical abbreviations, study designs, and sample size recitations.
//    Readers care about direction and magnitude, not who conducted the study or trial cohort specifics.
// 3. Unsubstantiated Numbers (--numbers): Verifies that numbers cited in plain terms derive from Title, Cost, or Benefit.
// 4. Abstract Buzzwords: Avoid idioms, vague metaphors, or academic filler.
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const STAT = process.argv.includes('--stat');
const NUMBERS = process.argv.includes('--numbers');
const MAX_WORDS = 150;

const JARGON = [
  [/\b(HR|RR|OR|CI|RCT)\b/, 'Statistical abbreviation'],
  [/\b(hazard ratio|relative risk|odds ratio|p-value)\b/i, 'Statistical metric'],
  [/\b(meta-analysis|systematic review|double-blind)\b/i, 'Study design term'],
  [/\b\d[\d,.]*\s*(participants|subjects|patients|hospitals|trials)\b/i, 'Sample size recitation'],
  [/\b(placebo group|control arm|treatment arm)\b/i, 'Trial arm jargon'],
];

const VAGUE = [
  'clean endpoint',
  'at the end of the day',
  'silver bullet',
  'it goes without saying',
  'needless to say',
  'in a nutshell',
];

function extractNumbers(s) {
  return [...s.replace(/(\d),(\d{3})/g, '$1$2').matchAll(/(\d*\.?\d+)\s*(k|m|million|billion)?/gi)]
    .map(m => {
      let multiplier = 1;
      if (m[2]) {
        const unit = m[2].toLowerCase();
        if (unit === 'k') multiplier = 1000;
        if (unit === 'm' || unit === 'million') multiplier = 1000000;
        if (unit === 'billion') multiplier = 1000000000;
      }
      return Number(m[1]) * multiplier;
    });
}

function derived(n, p) {
  const near = (a, b) => a === b || Math.abs(a - b) <= 0.05 * Math.max(Math.abs(a), Math.abs(b));
  return near(n, p) || near(n / 100, p) || (p < 1 && near(n / 100, 1 - p)) || (p > 1 && p < 100 && near(n, 100 - p));
}

const bad = [];
const count = { Length: 0, Jargon: 0, Numbers: 0, Buzzwords: 0 };
let total = 0;

const files = readdirSync(resolve(ROOT, 'book')).filter(f => /^\d\d-.*\.md$/.test(f)).sort();
for (const f of files) {
  const sec = Number(f.slice(0, 2));
  const lines = readFileSync(resolve(ROOT, 'book', f), 'utf8').split(/\r?\n/);
  let no = 0, title = '', fields = {};

  const flush = () => {
    const plain = fields['In plain terms'];
    if (!no || plain == null) return;
    total++;
    const where = `Section ${sec}, Rule ${no}`;
    const problems = [];
    const words = plain.trim().split(/\s+/).length;
    if (words > MAX_WORDS) {
      problems.push(`${words} words (exceeds recommendation of ${MAX_WORDS})`);
      count.Length++;
    }
    const jar = JARGON.filter(([re]) => re.test(plain)).map(([re, name]) => `${name}: "${plain.match(re)[0]}"`);
    if (jar.length) {
      problems.push(...jar);
      count.Jargon++;
    }
    if (NUMBERS) {
      const pool = extractNumbers([title, fields['Cost'] ?? '', fields['Benefit'] ?? ''].join(' '));
      const fresh = [...new Set(extractNumbers(plain))].filter(n => !pool.some(p => derived(n, p)));
      if (fresh.length) {
        problems.push(`Novel numbers not in Benefit/Cost: ${fresh.join(', ')}`);
        count.Numbers++;
      }
    }
    const vague = VAGUE.filter(w => plain.toLowerCase().includes(w.toLowerCase()));
    if (vague.length) {
      problems.push(`Cliché/vague phrasing: "${vague.join('", "')}"`);
      count.Buzzwords++;
    }
    if (problems.length) bad.push(`${f}  ${where}: ${problems.join('; ')}`);
  };

  for (const line of lines) {
    const h = line.match(/^### (\d+)\. (.*)$/);
    if (h) { flush(); no = Number(h[1]); title = h[2]; fields = {}; continue; }
    const m = line.match(/^- (In plain terms|Cost|Benefit):\s*(.*)$/i);
    if (m && no) fields[m[1]] = m[2];
  }
  flush();
}

if (!STAT) for (const b of bad) console.log(b);
console.log(`\nPlain terms check: ${total} entries analyzed, ${bad.length} flagged for review: ` +
  Object.entries(count).map(([k, v]) => `${k}: ${v}`).join(', '));
if (bad.length && !STAT) process.exit(1);
