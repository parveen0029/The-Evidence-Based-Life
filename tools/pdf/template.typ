$--
$-- Typst template for pandoc (uses $body$ and -V variables).
$--
#set terms(hanging-indent: 1.5em)

#set table(inset: 6pt, stroke: none)
// Ensure left alignment for tables for optimal readability
#show table.cell: it => align(left, it)

#let horizontalRule = line(start: (25%, 0%), end: (75%, 0%))
#let divider = if "divider" in std { divider } else { horizontalRule }

#show figure.where(kind: table): set figure.caption(position: top)
#show figure.where(kind: image): set figure.caption(position: bottom)
// Multi-page breakable tables
#show figure: set block(breakable: true)
#set smartquote(enabled: false)

// ---------- Layout ----------
#set document(title: "$booktitle$", author: "parveen0029")
#set text(
  font: ("Libertinus Serif", "Linux Libertine", "Times New Roman", "DejaVu Serif"),
  size: 10.5pt, lang: "en", region: "us",
)
#set par(justify: false, leading: 0.78em, spacing: 0.9em)
#set list(indent: 0.6em, spacing: 0.75em)
#show raw: set text(font: ("DejaVu Sans Mono", "Consolas", "Courier New"), size: 9pt)
#show link: set text(fill: rgb("#1a4fb4"))
#show heading: set block(sticky: true, above: 1.5em, below: 0.65em)
#show heading.where(level: 1): set text(19pt)
#show heading.where(level: 2): set text(14pt)
#show heading.where(level: 3): set text(11.5pt)
// Start each chapter on a new page; weak break avoids trailing blank pages
#show heading.where(level: 1): it => { pagebreak(weak: true); it }

// Running header: Left book title, right current section title; omitted on section cover
#let running-head = context {
  let next = query(selector(heading.where(level: 1)).after(here())).at(0, default: none)
  if next != none and next.location().page() == here().page() { return }
  let seen = query(selector(heading.where(level: 1)).before(here()))
  if seen.len() == 0 { return }
  set text(8.5pt, fill: luma(120))
  grid(columns: (1fr, auto), align(left)[$booktitle$], align(right)[#seen.last().body])
  v(-7pt)
  line(length: 100%, stroke: 0.4pt + luma(215))
}

// ---------- Cover ----------
#set page(paper: "a4", margin: (x: 2.2cm, top: 2.2cm, bottom: 2cm), header: none, footer: none)
#align(center + horizon)[
  #image("/og.png", width: 100%)
  #v(1.2cm)
  #block(width: 80%)[#text(11.5pt, fill: luma(60))[$subtitle$]]
  #v(2cm)
  #text(10pt, fill: luma(90))[
    Built on $builddate$ (UTC) · Commit $commit$ \
    The book is continuously updated; refer to the online edition: $site$ \
    Online search, EPUB, and latest PDF releases: $repo$
  ]
]

// ---------- Table of Contents ----------
#pagebreak()
#outline(title: [Table of Contents], depth: 1, indent: 1em)

// ---------- Body ----------
#pagebreak(weak: true)
#set page(header: running-head, footer: context align(center, text(8.5pt, fill: luma(120))[#counter(page).at(here()).first() / #counter(page).final().first()]))
#counter(page).update(1)

$body$
