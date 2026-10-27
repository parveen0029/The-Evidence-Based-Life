// Compile all 767 rules into an official Anki Deck (.apkg).
// Each rule produces one flashcard with subdecks divided by chapter.
// Usage: node tools/anki/build.mjs [output_path]   Default: dist/The-Evidence-Based-Life.apkg
//
// Zero-dependency implementation using Node.js built-in node:sqlite (DatabaseSync) and tools/lib/zip.mjs.
import { writeFileSync, readFileSync, mkdirSync, mkdtempSync, rmSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { zip } from '../lib/zip.mjs';
import { ROOT, SITE, TITLE, read, gitCommit, buildStamp } from '../lib/book.mjs';

const OUT = resolve(ROOT, process.argv[2] ?? 'dist/The-Evidence-Based-Life.apkg');
const NOW = new Date();
const NOW_S = Math.floor(NOW.getTime() / 1000);
const NOW_MS = NOW.getTime();

const MODEL_ID = 1759900000001;
const ROOT_DECK_ID = 1759900000100;
const deckId = sec => ROOT_DECK_ID + Number(sec);
const noteId = (sec, n) => 1759900100000 + Number(sec) * 1000 + Number(n);
const cardId = (sec, n) => 1759900200000 + Number(sec) * 1000 + Number(n);

const W = {
  money: { '0': 0, 'Low': 1, 'High': 2 },
  time: { 'Low': 0, 'Med': 1, 'High': 2 },
  will: { 'No': 0, 'Some': 1, 'Yes': 2 },
};

function ratioOf(cost, level) {
  if (level === 'High') return cost === 0 ? 'Very High' : cost <= 2 ? 'High' : 'Moderate';
  return level === 'Med' && cost === 0 ? 'High' : 'Moderate';
}

function parseSection(filename) {
  const md = read(join('book', filename));
  const head = md.match(/^# (\d+)\. (.+)$/m);
  if (!head) throw new Error(`Section file ${filename} missing '# N. Section Title' header`);
  const sec = head[1];
  const name = head[2].trim();
  const entries = [];
  let e = null;

  for (const line of md.split('\n')) {
    const h = line.match(/^### (\d+)\. (.+)$/);
    if (h) {
      e = { n: h[1], title: h[2].trim(), sec, secName: name };
      entries.push(e);
      continue;
    }
    if (!e) continue;

    const tag = line.match(/<!--\s*Cost Tag:\s*Money=(\S+)\s+Time=(\S+)\s+Willpower=(\S+)\s+Benefit=(\S+)\s+Metric=(\S+)\s*-->/i);
    if (tag) {
      e.money = tag[1];
      e.time = tag[2];
      e.will = tag[3];
      e.benefit = tag[4];
      e.metric = tag[5];
      continue;
    }

    const fCost = line.match(/^- Cost:\s*(.*)$/i);
    if (fCost) e.cost = fCost[1].trim();

    const fPlain = line.match(/^- In plain terms:\s*(.*)$/i);
    if (fPlain) e.plain = fPlain[1].trim();

    const fGrade = line.match(/^- Evidence grade:\s*([ABC])/i);
    if (fGrade) e.grade = fGrade[1].trim();

    const fNotes = line.match(/^- Notes:\s*(.*)$/i);
    if (fNotes) e.notes = fNotes[1].trim();
  }

  return { sec, name, filename, entries };
}

const bookFiles = readdirSync(join(ROOT, 'book')).filter(f => f.endsWith('.md')).sort();
const sections = bookFiles.map(parseSection);

const esc = s => String(s ?? '')
  .replace(/\*\*/g, '')
  .replace(/\\([*_])/g, '$1')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const pad = n => String(n).padStart(2, '0');
const deckName = s => `${TITLE}::Ch ${pad(s.sec)} ${s.name}`;

const notes = [];
let due = 0;

for (const s of sections) {
  for (const e of s.entries) {
    const m = W.money[e.money] ?? 0;
    const tm = W.time[e.time] ?? 0;
    const w = W.will[e.will] ?? 0;
    const roi = e.benefit ? ratioOf(m + tm + w, e.benefit) : 'Moderate';
    const grade = e.grade ?? 'B';
    const dispute = /dispute|controvers/i.test(e.notes ?? '');

    const badgeLine = [
      roi && `<b>ROI</b>: ${roi}`,
      e.benefit && `<b>Benefit</b>: ${e.benefit}`,
      e.metric && `<b>Metric</b>: ${e.metric}`,
      `<b>Grade</b>: ${grade}${dispute ? ' (Controversial)' : ''}`,
    ].filter(Boolean).join(' &nbsp;•&nbsp; ');

    const chapterFileBase = s.filename.replace(/\.md$/, '');
    const url = `${SITE}#${chapterFileBase}`;

    const fields = [
      `Chapter ${s.sec} · ${esc(s.name)} · Rule ${e.n}`,
      esc(e.title),
      esc(e.plain || ''),
      esc(e.cost || 'Negligible financial and time cost.'),
      badgeLine,
      `<a href="${url}" target="_blank" rel="noopener">Read Full Empirical Evidence & Sources Online</a>`,
    ];

    const tags = [
      `Ch-${pad(s.sec)}`,
      `Grade-${grade}`,
      `ROI-${roi.replace(/\s+/g, '-')}`,
      e.metric && `Metric-${e.metric}`,
      dispute && 'Disputed',
    ].filter(Boolean);

    notes.push({ s, e, fields, tags, due: due++ });
  }
}

const CSS = `.card {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 17px;
  line-height: 1.6;
  text-align: left;
  max-width: 42em;
  margin: 0 auto;
  padding: 24px 28px;
  color: #1f2937;
  background-color: #ffffff;
}
.dark .card {
  color: #f3f4f6;
  background-color: #111827;
}
.sec {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6366f1;
  margin-bottom: 8px;
}
.title {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.35;
  color: #111827;
  margin-bottom: 16px;
}
.dark .title { color: #f9fafb; }
.desc {
  margin: 16px 0;
  font-size: 17px;
  color: #374151;
}
.dark .desc { color: #d1d5db; }
.box {
  background: #f9fafb;
  border-left: 4px solid #6366f1;
  padding: 12px 16px;
  margin: 16px 0;
  border-radius: 0 8px 8px 0;
  font-size: 15px;
}
.dark .box { background: #1f2937; border-left-color: #818cf8; }
.meta {
  font-size: 14px;
  color: #4b5563;
  margin: 14px 0;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}
.dark .meta { color: #9ca3af; border-top-color: #374151; }
.link {
  font-size: 14px;
  margin-top: 16px;
}
.link a {
  color: #4f46e5;
  text-decoration: underline;
  font-weight: 500;
}
.dark .link a { color: #a5b4fc; }
`;

const model = {
  id: MODEL_ID,
  name: `${TITLE} Flashcard`,
  type: 0,
  mod: NOW_S,
  usn: -1,
  sortf: 1,
  did: ROOT_DECK_ID,
  tmpls: [{
    name: 'Rule Card',
    ord: 0,
    qfmt: '<div class="card"><div class="sec">{{Section}}</div><div class="title">{{Title}}</div></div>',
    afmt: '<div class="card">'
      + '<div class="sec">{{Section}}</div>'
      + '<div class="title">{{Title}}</div>'
      + '<hr id="answer">'
      + '<div class="desc">{{In Plain Terms}}</div>'
      + '<div class="box"><b>Cost</b>: {{Cost}}</div>'
      + '<div class="meta">{{Key Points}}</div>'
      + '<div class="link">{{Online Link}}</div>'
      + '</div>',
    did: null,
    bafmt: '',
    bqfmt: '',
  }],
  flds: [
    { name: 'Section', ord: 0, sticky: false, rtl: false, font: 'Arial', size: 12 },
    { name: 'Title', ord: 1, sticky: false, rtl: false, font: 'Arial', size: 20 },
    { name: 'In Plain Terms', ord: 2, sticky: false, rtl: false, font: 'Arial', size: 14 },
    { name: 'Cost', ord: 3, sticky: false, rtl: false, font: 'Arial', size: 14 },
    { name: 'Key Points', ord: 4, sticky: false, rtl: false, font: 'Arial', size: 12 },
    { name: 'Online Link', ord: 5, sticky: false, rtl: false, font: 'Arial', size: 12 },
  ],
  css: CSS,
  req: [[0, 'all', [0, 1]]],
};

const deck = (id, name, desc = '') => ({
  id, name, desc, mod: NOW_S, usn: -1, dyn: 0, conf: 1, collapsed: false, browserCollapsed: false,
  newToday: [0, 0], revToday: [0, 0], lrnToday: [0, 0], timeToday: [0, 0], extendNew: 0, extendRev: 0,
});

const commit = gitCommit();
const rootDesc = `${TITLE}: Complete 767 peer-reviewed empirical life rules with ROI rankings. Generated on ${buildStamp()} (UTC)${commit ? `, commit ${commit.slice(0, 7)}` : ''}. For full verification records and interactive apps, see <a href="${SITE}">The Evidence-Based Life</a>.`;

const decks = {
  1: deck(1, 'Default'),
  [ROOT_DECK_ID]: deck(ROOT_DECK_ID, TITLE, rootDesc),
  ...Object.fromEntries(sections.map(s => [deckId(s.sec), deck(deckId(s.sec), deckName(s))])),
};

const dconf = {
  1: {
    id: 1, name: 'Default', mod: 0, usn: 0, maxTaken: 60, autoplay: true, timer: 0, replayq: true, dyn: false,
    new: { delays: [1, 10], ints: [1, 4, 7], initialFactor: 2500, order: 1, perDay: 20, bury: true, separate: true },
    rev: { perDay: 200, ease4: 1.3, fuzz: 0.05, ivlFct: 1, maxIvl: 36500, minSpace: 1, bury: true },
    lapse: { delays: [10], mult: 0, minInt: 1, leechFails: 8, leechAction: 0 },
  },
};

const conf = {
  activeDecks: [1], curDeck: 1, newSpread: 0, collapseTime: 1200, timeLim: 0, estTimes: true, dueCounts: true,
  curModel: String(MODEL_ID), nextPos: notes.length + 1, sortType: 'noteFld', sortBackwards: false, addToCur: true,
};

const SCHEMA = `
CREATE TABLE col (id integer primary key, crt integer not null, mod integer not null, scm integer not null,
  ver integer not null, dty integer not null, usn integer not null, ls integer not null, conf text not null,
  models text not null, decks text not null, dconf text not null, tags text not null);
CREATE TABLE notes (id integer primary key, guid text not null, mid integer not null, mod integer not null,
  usn integer not null, tags text not null, flds text not null, sfld integer not null, csum integer not null,
  flags integer not null, data text not null);
CREATE TABLE cards (id integer primary key, nid integer not null, did integer not null, ord integer not null,
  mod integer not null, usn integer not null, type integer not null, queue integer not null, due integer not null,
  ivl integer not null, factor integer not null, reps integer not null, lapses integer not null, left integer not null,
  odue integer not null, odid integer not null, flags integer not null, data text not null);
CREATE TABLE revlog (id integer primary key, cid integer not null, usn integer not null, ease integer not null,
  ivl integer not null, lastIvl integer not null, factor integer not null, time integer not null, type integer not null);
CREATE TABLE graves (usn integer not null, oid integer not null, type integer not null);
CREATE INDEX ix_notes_usn on notes (usn);
CREATE INDEX ix_cards_usn on cards (usn);
CREATE INDEX ix_revlog_usn on revlog (usn);
CREATE INDEX ix_cards_nid on cards (nid);
CREATE INDEX ix_cards_sched on cards (did, queue, due);
CREATE INDEX ix_revlog_cid on revlog (cid);
CREATE INDEX ix_notes_csum on notes (csum);`;

const tmp = mkdtempSync(join(tmpdir(), 'anki-'));
const dbPath = join(tmp, 'collection.anki2');
const db = new DatabaseSync(dbPath);
db.exec(SCHEMA);

const dayStart = Math.floor(new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()).getTime() / 1000);
db.prepare('INSERT INTO col VALUES (1, ?, ?, ?, 11, 0, 0, 0, ?, ?, ?, ?, ?)').run(
  dayStart, NOW_MS, NOW_MS, JSON.stringify(conf), JSON.stringify({ [MODEL_ID]: model }),
  JSON.stringify(decks), JSON.stringify(dconf), '{}');

const stripHtml = s => s.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const csum = s => parseInt(createHash('sha1').update(stripHtml(s)).digest('hex').slice(0, 8), 16);
const insNote = db.prepare('INSERT INTO notes VALUES (?, ?, ?, ?, -1, ?, ?, ?, ?, 0, \'\')');
const insCard = db.prepare('INSERT INTO cards VALUES (?, ?, ?, 0, ?, -1, 0, 0, ?, 0, 0, 0, 0, 0, 0, 0, 0, \'\')');

db.exec('BEGIN');
for (const { s, e, fields, tags, due } of notes) {
  const sortField = fields[model.sortf];
  insNote.run(noteId(s.sec, e.n), `tebl-${s.sec}-${e.n}`, MODEL_ID, NOW_S, ` ${tags.join(' ')} `,
    fields.join('\x1f'), stripHtml(sortField), csum(sortField));
  insCard.run(cardId(s.sec, e.n), noteId(s.sec, e.n), deckId(s.sec), NOW_S, due);
}
db.exec('COMMIT');
db.close();

const collection = readFileSync(dbPath);
rmSync(tmp, { recursive: true, force: true });

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, zip([
  { name: 'collection.anki2', data: collection },
  { name: 'media', data: Buffer.from('{}') },
], NOW));

console.log(`Successfully generated Anki deck ${OUT}: ${sections.length} chapters, ${notes.length} flashcards.`);
