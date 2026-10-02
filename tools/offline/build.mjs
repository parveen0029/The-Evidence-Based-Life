// Bundles index.html + README + book/*.md + docs/*.md into a single, self-contained offline HTML file.
// Can be opened directly in any web browser without needing a web server or internet connection.
// Usage: node tools/offline/build.mjs [output-path]   Default: dist/The-Evidence-Based-Life.html
// Inlines the corpus into window.__CORPUS__, allowing the web app to initialize without network requests;
// converts relative repository links to online URLs, and embeds sidebar images as data URIs.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { ROOT, REPO, SITE, read, gitCommit, buildStamp } from '../lib/book.mjs';

const OUT = resolve(ROOT, process.argv[2] ?? 'dist/The-Evidence-Based-Life.html');
const STAMP = buildStamp();
const COMMIT = gitCommit();

// ---------- Corpus ----------
const readme = read('README.md');
let files = [...new Set([...readme.matchAll(/\]\((book\/[^)]+\.md)\)/g)].map(m => m[1]))].sort();
if (!files.length || !existsSync(resolve(ROOT, files[0]))) {
  files = readdirSync(resolve(ROOT, 'book')).filter(f => f.endsWith('.md')).sort().map(f => `book/${f}`);
}
if (!files.length) throw new Error('No book/ markdown files found; offline build would be empty');

// Supplementary long-form essays under docs/*.md are also included for instant client-side modal reading
let docs = [...new Set([...readme.matchAll(/\]\((docs\/[^)#/]+\.md)\)/g)].map(m => m[1]))].sort();
if (!docs.length || !existsSync(resolve(ROOT, docs[0]))) {
  docs = readdirSync(resolve(ROOT, 'docs')).filter(f => f.endsWith('.md')).sort().map(f => `docs/${f}`);
}

const corpus = {
  readme,
  parts: Object.fromEntries(files.map(f => [f, read(f)])),
  docs: Object.fromEntries(docs.map(f => [f, read(f)])),
};
// Escaping </script prevents premature termination of the HTML script tag
const corpusJson = JSON.stringify(corpus).replace(/<\/script/gi, '<\\/script');

// ---------- HTML Document ----------
let html = read('index.html');
const must = (needle, label) => {
  if (!html.includes(needle)) throw new Error(`Could not find ${label} in index.html: ${needle}`);
};

// Strip analytics scripts: offline copies should not initiate outbound network tracking requests
const GA_START = '<!-- ga:start', GA_END = '<!-- ga:end -->';
must(GA_START, 'Google Analytics starting comment');
must(GA_END, 'Google Analytics ending comment');
html = html.slice(0, html.indexOf(GA_START)) + html.slice(html.indexOf(GA_END) + GA_END.length);
if (/googletagmanager|google-analytics/.test(html)) throw new Error('Analytics domains still detected after stripping GA block');

// Convert local relative links to live online GitHub URLs for offline reading
must('href="README.md"', 'README.md link');
must('href="book/"', 'book/ link');
html = html
  .replaceAll('href="README.md"', `href="${REPO}/blob/main/README.md"`)
  .replaceAll('href="book/"', `href="${REPO}/tree/main/book"`)
  .replaceAll('<a class="title" href="./"', `<a class="title" href="${SITE}"`);

// Embed sidebar graphics as Base64 data URIs so images render without broken paths
for (const [img, mime] of [['ads/mcyyy-side.webp', 'image/webp'], ['ads/wechat-reward.png', 'image/png']]) {
  must(`src="${img}"`, `image ${img}`);
  const data = readFileSync(resolve(ROOT, img)).toString('base64');
  html = html.replace(`src="${img}"`, `src="data:${mime};base64,${data}"`);
}

// Add build metadata note in footer
const foot = '<div class="foot">';
must(foot, 'footer tag');
const commitNote = COMMIT ? `, source commit ${COMMIT.slice(0, 7)}` : '';
html = html.replace(foot, `${foot}Offline edition, generated at ${STAMP} (UTC)${commitNote}; the text is continuously updated, refer to the <a href="${SITE}">online edition</a> for the latest version.<br>`);

// Inject inlined corpus before the main client script executes
const scriptMarker = '\n<script>\n/* ----------';
must(scriptMarker, 'main script opening marker');
html = html.replace(scriptMarker, `\n<script>window.__CORPUS__=${corpusJson}</script>${scriptMarker}`);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
const kb = n => (n / 1024 | 0) + ' KB';
console.log(`Generated ${OUT}: ${files.length} chapter files, ${docs.length} supplementary essays, ${kb(Buffer.byteLength(html))} (content ${kb(Buffer.byteLength(corpusJson))})`);
