# Book-Wide Audit: Aligning "Plain Terms" with the "Benefit" Column (2026-09-19)

Task Origin: A user reading Section 6's blood donation rule encountered the sentence "'Pale complexion and feeling cold' is not made up," which they found confusing — they did not know who had ever claimed "pale complexion," and indeed no source in the book mentioned that phrase. The user noted the systemic nature of this issue: "Many readers habitually read only the Plain Terms section without checking sources or verification records," prompting a comprehensive repo audit for identical issues.

## Audit Methodology

Initially conducted two rounds of mechanical scans (scanning hits for 19 rebuttal-style phrases in Plain Terms lines, and comparing all quoted claims in Section 6 against Benefit entries), which caught only one new issue in the cold shower rule, indicating mechanical audits had insufficient coverage. Subsequently deployed 6 reviewing subagents running in parallel across all 32 files and 544 rules under `book/`, each provided with identical audit criteria:

Four target flaw categories: **[Fabricated Numbers]** Numbers in Plain Terms missing from the rule's Benefit column; **[Fabricated Facts]** Symptoms, outcomes, or factual assertions in Plain Terms lacking evidence in the rule's Benefit or Sources columns; **[Invented Mechanisms]** Plain Terms proposing causal or physiological explanations absent from the cited research; **[Non-Self-Contained Phrasing]** Plain Terms referencing unfamiliar claims or popular memes without context and critiquing them.

Also provided six non-issue counterexamples to avoid false positives: differing wording with identical substance, technical terms translated into plain language, hazard/risk ratios converted to everyday benchmarks, self-contained logical pivots, widely known common-knowledge background, and concluding action recommendations.

A total of 104 candidate sites were flagged. Spot-checking three sites (drinking hot water control group in Section 2, emergency triage Beijing local standard in Section 24, and targeted medical students' service tenure in Section 31) confirmed all were valid findings, leading to a rule-by-rule review and remediation.

## What Was Remediated

**Inverted or Overly Narrow Scopes (The Most Critical Category)**

| Rule | Original Plain Terms Phrasing | Actual Wording in Benefit Column |
|---|---|---|
| Section 31 Targeted Medical Students | Residency training "these 3 years count toward service tenure" | "Training tenure in breach of contract does **not** count toward service tenure" (exact opposite meaning) |
| Section 24 Emergency Triage | 10 min / 30 min / 4 hrs are universal national deadlines | "The four-tier criteria are national standards; **response times are Beijing municipal standards**" |
| Section 24 Cross-Regional Medical Care | Reimbursement is "substantially lower" | "Maintain **reasonable differentials**" (original text specifies no direction) |
| Section 9 Rumor Dissemination | "Reposting without personally verifying" is punishable | Both statutory penalty clauses require **knowing** the information is false |
| Section 11 Crypto Mining | "Shall **also** be fined 50,000 to 500,000 yuan" | "**May** be fined" (fines are discretionary) |
| Section 12 Merchant Inventory Purchases | "**Directly** presumed as knowing infringement" | "**May** be deemed knowing (unless evidence proves genuine ignorance)" |
| Section 28 Eating Disorders | "None predict outcomes when examined in isolation" | "After **adjusting** for prior dieting and psychiatric symptoms" |
| Section 29 Unemployment | "Nearly a quarter of the mortality gap is explained by smoking and drinking" | "Studies adjusting for health behaviors reported HR 24% lower" (not the same metric) |
| Section 23 Child Labor | "Negotiate private compensation after accidents" | Article 10 of "Provisions on Prohibiting Child Labor" explicitly establishes statutory employer compensation obligations |
| Section 1 Colonoscopy | "Undergoing one colonoscopy" reduces risk to 0.98% | "**Invited** to undergo colonoscopy" (NordICC was intention-to-treat; actual screening adherence was ~40%) |
| Section 2 Drinking Hot Water | "Letting it sit 2 minutes eliminates most excess risk" | Control group was "waiting **≥4 minutes**"; no 2-minute bracket existed |
| Section 2 Daily Step Counts | "Plateaus above 7,800 steps" | Plateau varies by age: 6,000–8,000 steps for age ≥60, 8,000–10,000 steps for age <60 |

**Deleted unverified factual, mechanistic, and frequency assertions**: Seatbelts "crashing with severe injury," helmets "unbuckled equals unworn," shingles "rarely fatal" and neuralgia details, hematuria "frequently resolves on its own," Section 8 insurance fraud murder search histories and brake skid marks, Section 9 kidney sale iPad 2 and arbitrary figures like 400,000–500,000 yuan, Section 13 "usually both people drown together," "intervening bystanders are often the ones held liable," "cars are easiest to locate," foreign object compression hemostasis mechanisms, Section 17 pressure ulcers "broken skin turning black," Section 20 vitamin K oral comparisons and diaper rash etiology, Section 21 foreign driver's license claim denials, Section 25 pension misappropriation, Section 27 postpartum checkup items and hospitalization costs, Section 28 dermal filler vascular occlusion mechanisms, Section 29 "will be transferred," "proactive home visits," "highest scam concentration," Section 30 testicular torsion "accompanied by nausea and vomiting" and outdoor activity "does not depend on exercise type," Section 31 blanket online lending rejections, Section 32 RMB conversions.

**Adding sources rather than deleting** (claims were factually true but previously lacked explicit citations in the rule):

- Section 6 Vitamin C: 8% illness duration reduction and RR 0.48 in extreme athletes were already in remarks from the same Cochrane review; moved into the Benefit column.
- Section 7 Unemployment Benefits: Added Social Insurance Law Article 48 (participation in employee medical insurance while receiving benefits, paid from unemployment fund without personal contributions).
- Section 10 Premarital Health Exam: Added Civil Code Article 1053 (revocation rights must be exercised within one year from knowing or should have known).
- Section 1 HIV Testing: Originally read "can be anonymous"; verification located only **confidentiality** mandates ("Administrative Measures for National HIV Testing Work" forbids disclosing names, addresses, or test results), finding no official exemption from real-name registration. Confidentiality does not equate to anonymity; the rule title and text were revised to "results kept strictly confidential," and the Measures added to Sources.

**Incidental fix of displaced intra-section references in Section 7** (discovered by review subagents, unrelated to Plain Terms): Rule 5 referenced medical assistance as Rule 8 (should be Rule 11); Rule 8 referenced legal aid and subsidized insurance as Rules 2 and 8 (self-referential loop; should be Rules 3, 10, 11); Rule 11 referenced 4× LPR as Rule 13 (should be Rule 16); Rules 19 and 21 referenced resident medical insurance as Rule 8 (should be Rule 10); Rule 22 referenced relief shelters as Rule 3 (should be Rule 4). Subsequently scanned the entire book for out-of-bounds references (rule numbers exceeding section count), finding no further hits; within-bounds misdirections can only be identified through manual audit.

## Two Identical Errors I Personally Committed During Remediation

Documented here because they illustrate how easily this error occurs:

1. In Section 28 cosmetic medicine blindness rule, I rephrased the vascular occlusion mechanism to "in 48 cases, 60% occurred in nasal dorsum, glabella, and forehead" — this "60%" was written from memory. The actual figures in the Benefit column were nose 56.3%, glabella 27.1%, forehead 18.8%, and nasolabial fold 14.6%; because a single case can involve multiple anatomic sites, the sum exceeds 100% and cannot be collapsed into "60%." Corrected to verbatim itemized figures.
2. In Section 27 C-section rule, I wrote WHO's "above 10% **no evidence shows** mortality drops" as "maternal and neonatal mortality **no longer declines**." Absence of evidence is distinct from proven lack of effect. Restored to exact original phrasing.

**Lesson**: When rewriting Plain Terms, always open the Benefit column and copy verbatim on the spot; never paraphrase from recent memory.

## Cases Judged as Requiring No Revision

Where Plain Terms referenced content from other chapters with **explicit cross-section citations** (e.g. Section 3 Rule 20 citing "(Section 24...)"), this was not treated as fabricated facts — readers will not mistake it for findings of the current rule's research, differing in character from groundless claims like "pale complexion." This standard was incorporated into project review conventions.

## Rules Synchronized

CLAUDE.md previously prohibited only "**numbers** missing from the Benefit column"; the vast majority of audit violations here were not numbers. The rule was expanded: prohibited additions also include symptoms, factual assertions, and mechanistic interpretations; Plain Terms must be completely self-contained, banning phrases like "'XX' is not made up" or "'XX' is real" that rely on unstated external claims.
