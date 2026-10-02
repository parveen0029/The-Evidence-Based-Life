// Formats README + book/*.md + docs/*.md into a publication-grade PDF:
// pandoc converts Markdown to typst, and typst renders the layout.
// Usage: node tools/pdf/build.mjs [output-path]   Default: dist/The-Evidence-Based-Life.pdf
// Requires pandoc (>= 3.1 with typst writer) and typst (>= 0.13) in PATH, or set via PANDOC and TYPST env vars.
// Layout template is located in tools/pdf/template.typ. The text content is preserved with three adaptations:
// strips back-links, attaches anchors to section headings, and updates internal repository links to document jumps or GitHub URLs.
import { writeFileSync, mkdirSync, statSync } from 'node:fs';
import { resolve, dirname, posix, basename } from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, REPO, SITE, TITLE, read, readBook, gitCommit, buildStamp, stripBackLink } from '../lib/book.mjs';

const OUT = resolve(ROOT, process.argv[2] ?? 'dist/The-Evidence-Based-Life.pdf');
const WORK = resolve(ROOT, 'dist/pdf-build.md');
const PANDOC = process.env.PANDOC ?? 'pandoc';
const TYPST = process.env.TYPST ?? 'typst';
const STAMP = buildStamp();
const COMMIT = gitCommit();

const { description, frontMd, contentsMd, bookFiles, docFiles } = readBook();

// ---------- Pages (each page has a level-1 heading; level-1 headings trigger a pagebreak in typst) ----------
const anchorOf = new Map();
bookFiles.forEach(f => anchorOf.set(f, 'sec-' + (basename(f).match(/^\d+/)?.[0] ?? anchorOf.size + 1)));
docFiles.forEach((f, i) => anchorOf.set(f, `doc-${i + 1}`));

const pages = [
  { src: 'README.md', md: `# Preface\n\n${description}\n\n${frontMd}`, anchor: 'front' },
  { src: 'README.md', md: contentsMd.replace(/^## (?:Table of Contents|\u76ee\u5f55)/i, '# Table of Contents'), anchor: 'contents' },
  ...[...bookFiles, ...docFiles].map(src => ({ src, md: stripBackLink(read(src)), anchor: anchorOf.get(src) })),
  { src: 'README.md', md: aboutMd(), anchor: 'about' },
];

function aboutMd() {
  const commitLine = COMMIT ? `- Corresponding commit: [${COMMIT.slice(0, 7)}](${REPO}/commit/${COMMIT})\n` : '';
  return `# Version Notes

This PDF edition is automatically compiled and formatted from the repository's Markdown source files.

- Generation timestamp: ${STAMP} (UTC)
${commitLine}- Latest releases, online search, and issue tracker: ${REPO}
- Web reader (filter by keyword, chapter, evidence grade, and cost/effort; single-file offline version also available): ${SITE}

Internal cross-references to other chapters have been converted into in-document links; links to verification audit records and licenses point to the GitHub repository.

The text is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0) (https://creativecommons.org/licenses/by/4.0/). You are free to share, adapt, and use commercially, provided appropriate credit is given to "The Evidence-Based Life" with a link to the repository, and indicating if changes were made.`;
}

// ---------- Links: In-book links converted to anchors, external repository links to full URLs ----------
function rewriteLinks(md, src) {
  return md.replace(/\]\(([^)\s]+)(\s+"[^"]*")?\)/g, (all, href, title) => {
    if (/^(https?:|mailto:)/.test(href)) return all;
    // Section anchors in README pointing to itself redirect to the GitHub repository README
    if (href.startsWith('#')) return `](${REPO}/blob/main/README.md${href}${title ?? ''})`;
    const [path] = href.split('#');
    const target = posix.normalize(posix.join(posix.dirname(src), path));
    const anchor = anchorOf.get(target);
    if (anchor) return `](#${anchor}${title ?? ''})`;
    const kind = target.endsWith('/') ? 'tree' : 'blob';
    return `](${REPO}/${kind}/main/${target}${title ?? ''})`;
  });
}

const body = pages.map(p => {
  const md = rewriteLinks(p.md, p.src)
    .replace(/<!--[\s\S]*?-->/g, '')                       // Strip HTML comments (e.g. Cost Tags) from PDF
    .replace(/^(# .+?)\s*$/m, `$1 {#${p.anchor}}`);        // Attach anchor to level-1 heading
  if (!md.includes(`{#${p.anchor}}`)) throw new Error(`Could not find level-1 heading in ${p.src} to attach anchor`);
  return md.trim();
}).join('\n\n');

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(WORK, body);

// ---------- pandoc → typst → pdf ----------
const run = (cmd, args) => {
  try {
    return execFileSync(cmd, args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (err) {
    if (err.code === 'ENOENT') throw new Error(`Cannot find ${cmd}. Please install it or set ${cmd === PANDOC ? 'PANDOC' : 'TYPST'} environment variable.`);
    throw new Error(`${cmd} failed:\n${err.stderr || err.stdout || err.message}`);
  }
};

const typFile = resolve(ROOT, 'dist/pdf-build.typ');
run(PANDOC, [
  '--from=gfm+attributes', '--to=typst', '--wrap=none',
  `--template=${resolve(ROOT, 'tools/pdf/template.typ')}`,
  '-V', `booktitle=${TITLE}`, '-V', `subtitle=${description}`,
  '-V', `builddate=${STAMP}`, '-V', `commit=${COMMIT.slice(0, 7) || 'unknown'}`,
  '-V', `site=${SITE}`, '-V', `repo=${REPO}`,
  '-o', typFile, WORK,
]);
const log = run(TYPST, ['compile', typFile, OUT, '--root', ROOT]);
if (log.trim()) console.log(log.trim());

const entries = pages.filter(p => bookFiles.includes(p.src))
  .reduce((n, p) => n + p.md.split('\n').filter(l => l.startsWith('### ')).length, 0);
console.log(`Generated ${OUT}: ${bookFiles.length} chapters, ${entries} rules, ${docFiles.length} supplementary essays, ${(statSync(OUT).size / 1048576).toFixed(1)} MB`);
