// Cross-Reference Verification: Resolves every internal citation (e.g., "Section X, Rule Y" or "Rule X")
// into its actual target rule title and writes the mapping to docs/citation-cross-reference.md.
//
// Usage:
//   node tools/check-refs.mjs            # Regenerates the cross-reference verification index
//   node tools/check-refs.mjs --check    # Validates references without modifying files; exits with code 1 if broken (for CI)
//   node tools/check-refs.mjs --suspect  # Flags references where context keywords do not match the target title
//
// Why this exists: Rule numbering is position-dependent. Inserting or deleting a rule shifts subsequent numbers.
// By expanding "Rule N -> Target Title" in version control, git diff immediately exposes displaced citations
// when numbers stay fixed but the underlying target rule title shifts.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK_ONLY = process.argv.includes('--check');

// Fields scanned for internal citations
const FIELDS = /^- (In plain terms|Benefit|Notes|Cost):\s*/i;
const CROSS_FIELDS = /^- (In plain terms|Benefit|Notes|Cost|Sources):\s*/i;

const files = readdirSync(resolve(ROOT, 'book')).filter(f => /^\d\d-.*\.md$/.test(f)).sort();
const docs = readdirSync(resolve(ROOT, 'docs')).filter(f => f.endsWith('.md') && f !== 'citation-cross-reference.md').sort();

// Load section rule titles: sections.get(secNum) = { file, titles: Map(ruleNo -> title) }
const sections = new Map();
for (const f of files) {
  const num = Number(f.slice(0, 2));
  const titles = new Map();
  for (const line of readFileSync(resolve(ROOT, 'book', f), 'utf8').split(/\r?\n/)) {
    const m = /^### (\d+)\. (.*)$/.exec(line);
    if (m) titles.set(Number(m[1]), m[2].trim());
  }
  sections.set(num, { file: f, titles });
}

// Parses number specifications such as "3", "3, 10", "11 to 14"
const RANGE = /^\s*(\d+)\s*(?:to|-)\s*(?:Rule|Item|Article)?\s*(\d+)\s*$/i;
const parseNums = s => {
  const out = [];
  for (const part of s.split(/[、,]/)) {
    const r = RANGE.exec(part);
    if (r) {
      const [a, b] = [Number(r[1]), Number(r[2])];
      if (b >= a && b - a <= 30) {
        for (let i = a; i <= b; i++) out.push([i, true]);
      }
      continue;
    }
    const n = Number(part.trim().replace(/^(?:Rule|Item|Article)\s*/i, ''));
    if (Number.isFinite(n) && n > 0) out.push([n, false]);
  }
  return out;
};

const SPEC = '\\d+(?:[\\s,]+\\d+)*(?:\\s*(?:to|-)\\s*(?:Rule|Item|Article)?\\s*\\d+)?';

const out = [];
const problems = [];
const suspects = [];
const weak = [];
let total = 0;

const targets = [
  ...files.map(f => ({ f, dir: 'book', isDoc: false })),
  ...docs.map(f => ({ f, dir: 'docs', isDoc: true })),
];

for (const { f, dir, isDoc } of targets) {
  const num = isDoc ? 0 : Number(f.slice(0, 2));
  const self = isDoc ? null : sections.get(num);
  const lines = readFileSync(resolve(ROOT, dir, f), 'utf8').split(/\r?\n/);
  const rows = [];
  let cur = 0;
  let unit = isDoc ? 'Intro' : 'Section Lead';

  const ctxOf = (line, idx) => {
    const before = line.slice(0, idx);
    let start = -1;
    for (const p of ['.', ';', '!', '?', ':']) start = Math.max(start, before.lastIndexOf(p));
    return before.slice(start + 1).slice(-50).replace(/\|/g, '-');
  };

  const CLAUSE = ['.', ';', '!', '?', ':', ','];
  const narrowOf = (line, idx) => {
    const before = line.slice(0, idx);
    let start = -1;
    for (const p of CLAUSE) start = Math.max(start, before.lastIndexOf(p));
    return before.slice(start + 1).slice(-30);
  };

  const afterOf = (line, idx) => {
    const rest = line.slice(idx).replace(new RegExp(`^(?:Section\\s*\\d+[\\s,]+)?(?:Rule|Item|Article)\\s*(?:${SPEC})`, 'i'), '');
    const end = rest.search(/[.;!?]/);
    return (end === -1 ? rest : rest.slice(0, end)).slice(0, 50).replace(/\|/g, '-');
  };

  lines.forEach((line, i) => {
    if (isDoc) {
      const h = /^#{1,6}\s+(.+?)\s*$/.exec(line);
      if (h) { unit = h[1].slice(0, 30); return; }
    } else {
      const t = /^### (\d+)\. (.*)$/.exec(line);
      if (t) { cur = Number(t[1]); unit = `Rule ${cur}`; return; }
    }

    const inEntry = !isDoc && cur > 0;
    if (inEntry ? !CROSS_FIELDS.test(line) : !line.trim()) return;

    // Disallow unanchored relative references (e.g., "next rule", "previous rule")
    for (const m of line.matchAll(/\b(the previous rule|the next rule|the rule above|the rule below)\b/gi)) {
      problems.push(`${f}:${i + 1} ${unit} uses relative reference "${m[1]}" — replace with "Rule N (anchor keyword)"`);
    }

    // Cross-section: Section N, Rule X
    const crossPattern = new RegExp(`(?:Section|Chapter)\\s*(\\d+)[,\\s]+(?:Rule|Item|Article)\\s*(${SPEC})`, 'gi');
    for (const m of line.matchAll(crossPattern)) {
      const targetSec = Number(m[1]);
      const target = sections.get(targetSec);
      for (const [x, range] of parseNums(m[2])) {
        const title = target?.titles.get(x);
        rows.push({
          from: unit,
          range,
          ref: `Section ${targetSec}, Rule ${x}`,
          title,
          line: i + 1,
          ctx: ctxOf(line, m.index),
          narrow: narrowOf(line, m.index),
          after: afterOf(line, m.index),
        });
        if (!title) {
          problems.push(`${f}:${i + 1} ${unit} references "Section ${targetSec}, Rule ${x}" — no such rule exists in that chapter`);
        }
      }
    }

    if (isDoc) return;
    if (inEntry && !FIELDS.test(line)) return;

    // Within-section: Rule X
    const stripped = line.replace(crossPattern, '');
    const localPattern = new RegExp(`(?:(?:this\\s+(?:section|chapter)[,\\s]+)?(?:Rule|Item|Article)\\s*(${SPEC})|see\\s+item\\s*(${SPEC}))`, 'gi');
    for (const m of stripped.matchAll(localPattern)) {
      const specText = m[1] ?? m[2];
      if (!specText) continue;
      // Skip legal statutory citations like "Article 20 of the Regulations"
      const tail = stripped.slice(0, m.index).replace(/\s+$/, '');
      const head = stripped.slice(m.index + m[0].length);
      if (/(?:law|code|regulation|regulations|act|provisions|order|statute|amendment|measures|rules|notice|decree)\s*(?:\([^)]*)?$/i.test(tail)) continue;
      if (/^Article\b/i.test(m[0]) && /^\s*of\b/i.test(head)) continue;
      if (/^Article\b/i.test(m[0]) && /\(\s*$/.test(tail)) continue;
      if (inEntry && line.startsWith('- Benefit:') && /^Article\b/i.test(m[0])) continue;
      if (/^Article\b/i.test(m[0]) && /(?:states|adds|stipulates|mandates|penalizes|requires|criminalizes|allows|outlines|specifies|imposes|levies|designates|qualifies|holds|protects|obliges|lists|defines|describes|contains|governs)/i.test(head.slice(0, 40))) continue;

      for (const [x, range] of parseNums(specText)) {
        if (!self) continue;
        const title = self.titles.get(x);
        rows.push({
          from: unit,
          range,
          ref: `This Section, Rule ${x}`,
          title,
          line: i + 1,
          ctx: ctxOf(stripped, m.index),
          narrow: narrowOf(stripped, m.index),
          after: afterOf(stripped, m.index),
        });
        if (!title && x > self.titles.size) {
          // Rule index beyond chapter size is likely an unhandled statutory reference or typo
          problems.push(`${f}:${i + 1} ${unit} references "Rule ${x}" — this section has only ${self.titles.size} rules (possible legal citation)`);
        }
        if (inEntry && x === cur) {
          problems.push(`${f}:${i + 1} Rule ${cur} self-references itself`);
        }
      }
    }
  });

  // Verify keyword anchoring in context
  const token = (text, title) => {
    const words = (text.toLowerCase().match(/[a-z]{4,}/g) ?? []);
    const titleWords = new Set(title.toLowerCase().match(/[a-z]{4,}/g) ?? []);
    return words.some(w => titleWords.has(w));
  };

  for (const r of rows) {
    if (!r.title || r.range) continue;
    const wide = r.ctx + ' ' + r.after;
    if (token(wide, r.title)) continue;
    if (token(r.narrow + ' ' + r.after, r.title)) continue;
    suspects.push(`${f}:${r.line} ${r.from} -> "${r.ref}" ${r.title.slice(0, 30)}... context: ...${r.ctx} [${r.ref}] ${r.after}...`);
  }

  if (!rows.length) continue;
  total += rows.length;
  out.push(`## ${isDoc ? 'docs/' : ''}${basename(f, '.md')}\n`);
  out.push('| Source | Citation | Target Rule | Context at Citation |');
  out.push('| --- | --- | --- | --- |');
  for (const r of rows) {
    const title = r.title ? r.title : '**Target Rule Does Not Exist**';
    out.push(`| ${r.from} | ${r.ref} | ${title} | ...${r.ctx.trim()}... |`);
  }
  out.push('');
}

const body = [
  '# Cross-Reference Verification Index',
  '',
  'This document is automatically generated by `node tools/check-refs.mjs`. Do not edit manually.',
  '',
  'Internal citations throughout the book link directly to related rules and evidence summaries.',
  'This cross-reference index maps each internal citation to its exact target rule title and source context.',
  'By tracking these mappings in version control, git diff immediately catches displaced references',
  'whenever rule insertions or deletions alter underlying rule indices.',
  '',
  `Total Citations: ${total} references across chapters and supplementary essays.`,
  '',
  ...out,
].join('\n');

if (problems.length) {
  console.log('Issues requiring review:');
  for (const p of problems) console.log('  ' + p);
  console.log('');
}

if (process.argv.includes('--suspect') && suspects.length) {
  console.log(`Citations with unanchored context keywords (${suspects.length} entries):`);
  for (const s of suspects) console.log('  ' + s);
  console.log('');
}

if (CHECK_ONLY) {
  const fatal = problems.filter(p => p.includes('no such rule exists') || p.includes('self-references') || p.includes('relative reference'));
  for (const p of fatal) console.log('  ' + p);
  const bad = fatal.length;
  console.log(bad ? `Total ${bad} critical citation issues found` : `Citation verification passed: ${total} references resolved`);
  process.exit(bad ? 1 : 0);
}

const targetPath = resolve(ROOT, 'docs/citation-cross-reference.md');
writeFileSync(targetPath, body, 'utf8');
console.log(`Written to docs/citation-cross-reference.md (${total} citations mapped)`);
