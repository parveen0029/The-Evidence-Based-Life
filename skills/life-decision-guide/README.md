# Life Decision Skill (`life-decision-guide`)

Equip your AI assistant to answer concrete life decisions using *The Evidence-Based Life*: whether an action is worth it, how to choose between competing options, immediate steps during emergencies, financial benefits, and legal boundaries.

This skill performs one primary action: **queries the relevant empirical rules from the book first, then calculates and ranks the response using the book's accounting methodology**, citing the exact section and rule number for every claim. If an answer cannot be verified from the book, it states that plainly rather than hallucinating figures.

The complete operational instructions reside in [SKILL.md](SKILL.md). Both tools share this single source of truth so they never fall out of sync.

---

## Installing for Claude Code

When running Claude Code inside this repository, no installation is necessary—`.claude/skills/life-decision-guide/` already links directly to these rules.

To use this skill globally across any directory on your system, copy it to your personal skills directory:

```bash
mkdir -p ~/.claude/skills/life-decision-guide && curl -fsSL -o ~/.claude/skills/life-decision-guide/SKILL.md "https://raw.githubusercontent.com/parveen0029/The-Evidence-Based-Life/main/skills/life-decision-guide/SKILL.md"
```

After installation, asking questions like *"Is a two-hour daily commute worth it?"* or *"A friend asked me to co-sign a loan, should I sign?"* will trigger this skill automatically. You can also invoke it explicitly: *"Answer using life-decision-guide."*

---

## Installing for Codex

When running Codex inside this repository, no installation is necessary—`AGENTS.md` at the repository root already declares it.

To make it available globally across all directories, place it in Codex's custom prompts directory and invoke it using `/life-decision-guide`:

```bash
mkdir -p ~/.codex/prompts && curl -fsSL -o ~/.codex/prompts/life-decision-guide.md "https://raw.githubusercontent.com/parveen0029/The-Evidence-Based-Life/main/skills/life-decision-guide/SKILL.md"
```

To have it trigger automatically for life-decision questions in all sessions without typing slash commands, append this line to `~/.codex/AGENTS.md`:

```markdown
When answering practical life decision questions (whether to do something, is it worth it, how to choose, statutory benefits, legal risks), follow ~/.codex/prompts/life-decision-guide.md.
```

---

## How the Text Is Retrieved

If the repository exists locally, the skill reads directly from the local `book/` directory. If not present, it fetches a lightweight copy:

```bash
git clone --depth 1 https://github.com/parveen0029/The-Evidence-Based-Life.git "${TMPDIR:-/tmp}/tebl"
```

The entire book is approximately 1.3 MB; a shallow clone takes only a few seconds. If network access is unavailable, the assistant states that it cannot retrieve the source text rather than improvising from memory.

---

## Maintenance Guidelines

`SKILL.md` intentionally does not hard-code section lists or numeric weights that could drift as the book evolves:
- For the full section directory, it inspects the table in `README.md`.
- For ROI tiering weights, it parses the `COST_W` and `e.ratio` definitions in `index.html`.

Consequently, adding or removing chapters or adjusting tier weights does not require modifying this skill directory.
