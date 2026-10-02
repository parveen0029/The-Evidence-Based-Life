# Audit: Citation Links in Remarks · Record (2026-09-21)

Task Origin: A user reading the search interface encountered Section 2 Rule 1 (smoking cessation) remarks, which had an entire English bibliographic citation embedded inside, remarking: "Why is this still here? Readers are Chinese; why leave a long string of foreign references sitting in the text?"

Earlier that same day, two rules had already been addressed (Section 2 Rule 41 on night shifts, Section 6 Rule 26 on breakfast); at that point only the two rules with the most links were patched without a comprehensive repo audit. This round closes the gap book-wide.

## Criteria and Standard

- **All bibliographic citations must reside strictly in the "Sources" column; remarks must not contain external URLs.** Remarks may retain at most one relative markdown link pointing to an in-depth document in `docs/`.
- Rationale: CLAUDE.md plain-language rules state: "**Except for the Sources column**, citations and statutory article numbers must be preserved as-is for verification" — implying the proper home for academic citations is exclusively the Sources column. Remarks are intended as accessible explanatory text for general readers; stuffing long English titles and DOIs into them creates unreadable visual noise.
- Scan command: `grep -c http` scanning all `- Remarks: ` lines across the book.

## Before and After Audit

| Metric | Before Audit | After Audit |
|---|---|---|
| Rules with links in remarks | 19 rules (including 11 rules with full English citations embedded in Chinese text) | **0 rules** |
| Maximum links in a single rule's remarks | 3 | 0 |
| Total literature links across book | 1,234 | **1,234 (unchanged)** |

Preserving the total link count was the central invariant of this round: **citations were moved from remarks to the Sources column, not deleted.** When relocated to Sources, each entry received a descriptive tag indicating which specific claim it supports (e.g. "(Controversial side)", "(High-purity prescription fish oil trial cited in remarks)"), preventing the Sources column from turning into an opaque list of detached titles.

## Rule-by-Rule Inventory

Section 1: Rule 20 (Influenza vaccine Cochrane), Rule 28 (PrEP, Fonner 2016), Rule 29 (Window period, Guangdong CDC portal).
Section 2: Rule 1 (Secondhand smoke, Oberg 2011), Rule 9 (Low-sodium salt dissenting view, PURE), Rule 19 (Processed meat dissenting view, NutriRECS guideline), Rule 20 (Alcohol consumption dissenting view, Di Castelnuovo 2006), Rule 34 (BMI dissenting view, Flegal 2013), Rule 41 (Night shift cancer studies ×2 + Light therapy Czeisler, addressed in prior round).
Section 3: Rule 9 (Two dissenting papers: Grubbs 2018, Prause & Pfaus 2015).
Section 5: Rule 17 (Index funds dissenting view, Harvey & Liu 2022).
Section 6: Rule 1 (Multivitamins, Gaziano 2012), Rule 2 (Fish oil, Bhatt 2019 REDUCE-IT), Rule 26 (Breakfast papers ×3, addressed in prior round).
Section 10: Rule 3 (Perilloux & Kurzban 2015), Rule 6 (Dargie 2015).
Section 20: Rule 12 (General infant trial EAT, Perkin 2016).
Section 29: Rule 4 (Kristensen 2012), Rule 9 (Stroebe 2007).

## Completed Full Article Titles

Five rules originally used abbreviated citations in remarks (author, year, journal only); when moved to Sources, full titles were restored. **Never reconstructed from memory**, each was retrieved via Crossref by DOI:

| DOI | Retrieved Title |
|---|---|
| 10.1097/QAD.0000000000001145 | Effectiveness and safety of oral HIV preexposure prophylaxis for all populations (AIDS, 2016) |
| 10.1001/jama.2012.14641 | Multivitamins in the Prevention of Cancer in Men (JAMA, 2012) |
| 10.1056/NEJMoa1812792 | Cardiovascular Risk Reduction with Icosapent Ethyl for Hypertriglyceridemia (NEJM, 2019) |
| 10.1007/s10508-018-1248-x | Pornography Problems Due to Moral Incongruence: An Integrative Model with a Systematic Review and Meta-Analysis (Arch Sex Behav; **Crossref records publication year as 2018 rather than 2019 in original text**; formatted as 2018) |
| 10.1002/sm2.58 | Viewing Sexual Stimuli Associated with Greater Sexual Responsiveness, Not Erectile Dysfunction (Sexual Medicine, 2015) |

## Verification

- Rules with `- Remarks: ` lines containing http across entire book: **0**.
- Punctuation was audited after link extraction; no double periods, empty parentheses, or orphaned ". " remained.
- `node tools/check-refs.mjs --check`: all 454 cross-references point to valid targets with anchors; rule count unchanged.
- `tools/sync-stats.ps1`: 600 rules, Level A 404, Links 1,234; all eight statistical positions remained untouched.
