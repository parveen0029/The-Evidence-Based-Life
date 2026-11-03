#!/usr/bin/env node
// Zero-dependency CLI for querying The Evidence-Based Life decision corpus from the terminal or AI agents.
//
// Usage:
//   node tools/cli.mjs search <query> [--grade A|B|C] [--roi "Very High"|High|Moderate] [--chapter N] [--limit N] [--json]
//   node tools/cli.mjs rule <chapter> [rule] [--json]
//   node tools/cli.mjs chapters [--json]
//   node tools/cli.mjs random [--grade A|B|C] [--roi "Very High"|High|Moderate] [--json]
//   node tools/cli.mjs stats [--json]

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DATA_PATH = join(ROOT, 'the-evidence-based-life.json');

const { values, positionals } = parseArgs({
  options: {
    grade: { type: 'string', short: 'g' },
    roi: { type: 'string', short: 'r' },
    chapter: { type: 'string', short: 'c' },
    limit: { type: 'string', short: 'l', default: '5' },
    json: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
  allowPositionals: true,
  strict: false,
});

function printHelp() {
  console.log(`The Evidence-Based Life — Command-Line Decision Reference

Usage:
  node tools/cli.mjs search <keywords> [options]   Search rules by keyword across all 34 chapters
  node tools/cli.mjs rule <chapter> <rule>         Display full details & citations for a specific rule (e.g. "1 1" or "1.1")
  node tools/cli.mjs chapters                      List all 34 chapters with rule counts
  node tools/cli.mjs random [options]              Pick a random evidence-based rule
  node tools/cli.mjs stats                         Show corpus summary statistics

Options:
  -g, --grade <A|B|C>                  Filter by evidence grade
  -r, --roi <"Very High"|High|Moderate> Filter by ROI tier
  -c, --chapter <1-34>                 Filter by chapter number
  -l, --limit <n>                      Max results for search (default: 5)
      --json                           Output machine-readable JSON for AI agents & scripts
  -h, --help                           Show this help message`);
}

if (values.help || positionals.length === 0) {
  printHelp();
  process.exit(0);
}

const dataset = JSON.parse(readFileSync(DATA_PATH, 'utf8'));
const rules = dataset.rules || [];
const cmd = positionals[0].toLowerCase();

function filterPool(list) {
  let out = list;
  if (values.grade) {
    const g = String(values.grade).toUpperCase();
    out = out.filter(r => r.grade === g);
  }
  if (values.roi) {
    const targetRoi = String(values.roi).toLowerCase();
    out = out.filter(r => (r.roi || '').toLowerCase() === targetRoi);
  }
  if (values.chapter) {
    const ch = Number(values.chapter);
    if (Number.isFinite(ch)) out = out.filter(r => r.chapter === ch);
  }
  return out;
}

function formatRuleSummary(r) {
  const disputeTag = r.disputed ? ' [Disputed]' : '';
  return [
    `[Ch.${String(r.chapter).padStart(2, '0')} Rule ${r.n}] ${r.title}`,
    `  Chapter : ${r.chapterTitle}`,
    `  Metrics : Grade ${r.grade} | ROI: ${r.roi} | Money: ${r.money}, Time: ${r.time}, Will: ${r.will}${disputeTag}`,
    `  Summary : ${r.plainTerms || r.gain}`,
    `  URL     : ${r.url}`,
  ].join('\n');
}

function formatRuleFull(r) {
  const lines = [
    `================================================================================`,
    `Chapter ${r.chapter} (${r.chapterTitle}) — Rule ${r.n}`,
    `${r.title}`,
    `================================================================================`,
    `Evidence Grade : Grade ${r.grade}${r.disputed ? ' (Note: Contains academic controversy)' : ''}`,
    `ROI Tier       : ${r.roi} (Benefit: ${r.benefitLevel}, Metric: ${r.metric})`,
    `Resource Cost  : Money=${r.money} | Time=${r.time} | Willpower=${r.will}`,
    ``,
    `In Plain Terms:`,
    `  ${r.plainTerms || 'N/A'}`,
    ``,
    `Cost Detail:`,
    `  ${r.cost || 'N/A'}`,
    ``,
    `Empirical Benefit:`,
    `  ${r.gain || 'N/A'}`,
  ];
  if (r.note) {
    lines.push(``, `Notes & Boundaries:`, `  ${r.note}`);
  }
  if (Array.isArray(r.sources) && r.sources.length > 0) {
    lines.push(``, `Sources (${r.sources.length}):`);
    for (const s of r.sources) {
      lines.push(`  - ${s.text}${s.url ? ` <${s.url}>` : ''}`);
    }
  }
  lines.push(``, `Link: ${r.url}`);
  return lines.join('\n');
}

if (cmd === 'stats') {
  const gradeCounts = { A: 0, B: 0, C: 0 };
  const roiCounts = { 'Very High': 0, High: 0, Moderate: 0 };
  let totalSources = 0;
  for (const r of rules) {
    if (gradeCounts[r.grade] !== undefined) gradeCounts[r.grade]++;
    if (roiCounts[r.roi] !== undefined) roiCounts[r.roi]++;
    totalSources += Array.isArray(r.sources) ? r.sources.length : 0;
  }
  const summary = {
    title: dataset.title,
    chaptersCount: dataset.chaptersCount,
    rulesCount: dataset.rulesCount,
    grades: gradeCounts,
    roi: roiCounts,
    sourcesCount: totalSources,
  };
  if (values.json) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    console.log(`${summary.title}`);
    console.log(`Chapters : ${summary.chaptersCount}`);
    console.log(`Rules    : ${summary.rulesCount} (Grade A: ${gradeCounts.A}, Grade B: ${gradeCounts.B}, Grade C: ${gradeCounts.C})`);
    console.log(`ROI Tiers: Very High: ${roiCounts['Very High']} | High: ${roiCounts.High} | Moderate: ${roiCounts.Moderate}`);
    console.log(`Sources  : ${summary.sourcesCount}`);
  }
  process.exit(0);
}

if (cmd === 'chapters') {
  const map = new Map();
  for (const r of rules) {
    if (!map.has(r.chapter)) {
      map.set(r.chapter, { chapter: r.chapter, title: r.chapterTitle, rulesCount: 0, gradeA: 0 });
    }
    const item = map.get(r.chapter);
    item.rulesCount++;
    if (r.grade === 'A') item.gradeA++;
  }
  const chapters = [...map.values()].sort((a, b) => a.chapter - b.chapter);
  if (values.json) {
    console.log(JSON.stringify(chapters, null, 2));
  } else {
    for (const c of chapters) {
      console.log(`Chapter ${String(c.chapter).padStart(2, '0')}: ${c.title} (${c.rulesCount} rules, ${c.gradeA} Grade A)`);
    }
  }
  process.exit(0);
}

if (cmd === 'rule') {
  const arg1 = positionals[1] || '';
  const arg2 = positionals[2] || '';
  let ch = 0, rn = 0;
  const dotMatch = /^(?:e-)?(\d+)[.-](\d+)$/i.exec(arg1);
  if (dotMatch) {
    ch = Number(dotMatch[1]);
    rn = Number(dotMatch[2]);
  } else {
    ch = Number(arg1);
    rn = Number(arg2);
  }
  const found = rules.find(r => r.chapter === ch && r.n === rn);
  if (!found) {
    console.error(`Rule not found for chapter=${ch}, rule=${rn}. Example: node tools/cli.mjs rule 1 1`);
    process.exit(1);
  }
  if (values.json) {
    console.log(JSON.stringify(found, null, 2));
  } else {
    console.log(formatRuleFull(found));
  }
  process.exit(0);
}

if (cmd === 'random') {
  const pool = filterPool(rules);
  if (pool.length === 0) {
    console.error('No rules matched the specified filters.');
    process.exit(1);
  }
  const picked = pool[Math.floor(Math.random() * pool.length)];
  if (values.json) {
    console.log(JSON.stringify(picked, null, 2));
  } else {
    console.log(formatRuleFull(picked));
  }
  process.exit(0);
}

if (cmd === 'search') {
  const query = positionals.slice(1).join(' ').trim().toLowerCase();
  if (!query) {
    console.error('Please provide search keywords. Example: node tools/cli.mjs search "sleep temperature"');
    process.exit(1);
  }
  const terms = query.split(/\s+/).filter(Boolean);
  const pool = filterPool(rules);
  const scored = [];

  for (const r of pool) {
    const titleLower = (r.title || '').toLowerCase();
    const plainLower = (r.plainTerms || '').toLowerCase();
    const chLower = (r.chapterTitle || '').toLowerCase();
    const gainLower = (r.gain || '').toLowerCase();
    const noteLower = (r.note || '').toLowerCase();
    let score = 0;
    let matchedAll = true;

    for (const t of terms) {
      let termScore = 0;
      if (titleLower.includes(t)) termScore += 10;
      if (plainLower.includes(t)) termScore += 6;
      if (chLower.includes(t)) termScore += 4;
      if (gainLower.includes(t)) termScore += 2;
      if (noteLower.includes(t)) termScore += 1;
      if (termScore === 0) {
        matchedAll = false;
        break;
      }
      score += termScore;
    }

    if (matchedAll && score > 0) {
      if (r.grade === 'A') score += 2;
      if (r.roi === 'Very High') score += 2;
      scored.push({ score, rule: r });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  const limit = Math.max(1, Number(values.limit) || 5);
  const top = scored.slice(0, limit).map(x => x.rule);

  if (values.json) {
    console.log(JSON.stringify({ query, totalMatches: scored.length, results: top }, null, 2));
  } else {
    console.log(`Found ${scored.length} matching rule(s) for "${query}" (showing top ${top.length}):\n`);
    for (const r of top) {
      console.log(formatRuleSummary(r));
      console.log('');
    }
  }
  process.exit(0);
}

console.error(`Unknown command "${cmd}". Run with --help for usage.`);
process.exit(1);
