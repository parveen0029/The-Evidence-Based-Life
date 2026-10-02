---
name: life-decision-guide
description: Answers practical life decisions using the evidence-based entries from "The Evidence-Based Life" (parveen0029/The-Evidence-Based-Life): whether an action is worth it, how to choose between options, immediate steps during emergencies, financial benefits, and legal boundaries. Queries relevant rules before answering, ranking them by cost (money/time/effort), expected return, and scientific evidence grade (A/B/C), citing the exact section and rule number. Trigger phrases: should I, is it worth it, how to choose, help me decide, is this legal, what should I do first, cost effectiveness, high ROI.
---

# Life Decisions: Query Empirical Evidence Before Answering

## Purpose of this Skill

When a user asks for advice on a concrete life decision, query the relevant entries in *The Evidence-Based Life* first, then calculate and structure the response using the book's accounting methodology.

**Do not answer without querying first.** Every numeric figure, statute citation, and conclusion must trace directly back to a verified entry in the book. If the text does not cover the topic, state that plainly. You may provide general common-sense context, but you must explicitly label it as common sense, not book content. Never hallucinate numbers, DOIs, or legal article numbers.

The book categorizes expected returns into four distinct currencies: **Life Expectancy (Mortality), Time & Energy, Money, and Personal Liberty**. Calculate each currency independently—never convert between them. A "12% reduction in all-cause mortality" and "saving $500 annually" cannot be weighed on the same scale.

---

## Step 0: Immediate Crisis Triage

- **Active Medical Emergencies** (unconscious, apneic, massive hemorrhage, structural fire, drowning, electrocution, acute poisoning, stroke or heart attack symptoms): Immediately state emergency dispatch numbers (120/911/119) and the physical first-response action from Section 13. Do not discuss ROI or cost tags.
- **Suicidal Ideation or Despair**: Immediately provide the national crisis helpline **12356** (or local emergency crisis lifeline), then reference the evidence-backed harm-reduction protocols in Sections 1 and 29. Do not attempt unsolicited moralizing or evaluate personal motives.
- **Active Legal Proceedings** (police summons, administrative detention, criminal indictment, civil lawsuits): Point directly to Section 8, and explicitly remind the user that this guide provides general legal information, not formal representation—they must consult a licensed attorney immediately.
- For all other standard inquiries, proceed through the following steps.

---

## Step 1: Acquiring the Source Text

- **Local Repository**: If the current or parent directory contains `README.md` and `book/01-avoiding-premature-death.md`, operate in local mode and read files directly.
- **Remote Fetch**: If not present locally, fetch a lightweight shallow clone:
  ```bash
  git clone --depth 1 https://github.com/parveen0029/The-Evidence-Based-Life.git "${TMPDIR:-/tmp}/tebl"
  ```
  If git is unavailable, fetch specific chapters directly via curl:
  ```bash
  curl -fsSL --compressed "https://raw.githubusercontent.com/parveen0029/The-Evidence-Based-Life/main/book/02-preventing-chronic-decline.md"
  ```
  If network retrieval fails, inform the user honestly that source texts cannot be accessed rather than reciting unverified recollections.

---

## Step 2: Locating the Section

Select 1 to 3 relevant chapters by reading the table of contents in `README.md` ("What This Book Answers"), which maps every life problem to its corresponding chapter file in `book/`.

- Chapter files reside in `book/`, named `NN-kebab-case-title.md`.
- Deep-dive essays reside in `docs/`:
  - `docs/is-marriage-financially-worth-it.md`
  - `docs/home-emergency-kit-checklist.md`
  - `docs/circadian-rhythms-and-night-shifts.md`
  - `docs/should-you-stop-for-strangers-in-an-emergency.md`
  - `docs/platform-compliance-and-licensing.md`

---

## Step 3: Extracting the Relevant Entries

Chapter files can be up to 110 KB. Query specific entries using keywords rather than dumping the entire file:

```bash
grep -rn '^### ' book/ | grep -E 'keyword1|keyword2'        # Scan entry headlines
grep -rn -B2 -A10 'keyword' book/08-staying-out-of-trouble.md  # Search within chapter text
sed -n '/^### 16\. /,/^### 17\. /p' book/08-staying-out-of-trouble.md  # Extract complete entry
```

**Always read the complete entry**, especially the "Notes" field—target demographics, controversies, and medical/legal exceptions are documented there. Reading only the headline strips away essential prerequisites.

An entry follows this structure:

```markdown
### 5. Replacing regular table salt with low-sodium salt (potassium-enriched salt)
<!-- Cost Tag: Money=Low Time=Low Willpower=No Benefit=Med Metric=Mortality -->
- Cost: Costs a few dollars more per bag.
- In plain terms: Lowers the probability of death by roughly 12%...
- Benefit: Stroke down 14%, major cardiovascular events down 13%, all-cause mortality down 12%.
- Evidence grade: A
- Sources: Neal B, et al. (2021). NEJM. https://doi.org/10.1056/NEJMoa2105675
- Notes: Controversial. Contraindicated for individuals with renal insufficiency or those taking potassium-sparing diuretics...
```

The HTML comment contains machine-readable cost tags: Money (0/Low/High), Time (Low/Med/High), Willpower (No/Some/Yes), Benefit (Low/Med/High), Metric (Mortality/Money/Time/Freedom).

---

## Step 4: Ranking the Options

Rank retrieved entries using the book's codified algorithm, not subjective intuition:

1. **Calculate ROI Tiers**: Check the weighting rules in `index.html`:
   ```bash
   grep -n 'COST_W = \|e\.ratio = ' index.html
   ```
   Total Cost Score = Money weight + Time weight + Willpower weight. Combine the Cost Score with the Benefit magnitude to assign the tier: **Very High / High / Standard**.
2. If `index.html` is inaccessible, do not fabricate a tier—display the Benefit magnitude and the three individual Cost tags directly for the user to evaluate.
3. Order entries first by **ROI Tier**, then by **Evidence Grade (A > B > C)**, then by direct relevance to the user's situation.
4. **Never rank across different currencies.** Evaluate money-saving rules and life-extending rules separately.
5. "Standard" ROI does not mean an action is unworthy; it simply means the cost-to-benefit ratio requires careful personal budgeting. ROI tiering represents an editorial synthesis (Level C consensus), distinct from empirical study evidence grades.

---

## Step 5: Structuring the Response

Format the response according to this standard structure:

1. **One-Sentence Takeaway**: Whether the decision is cost-effective, what the primary tradeoff is, and the very first concrete physical action to take.
2. **Prioritized Action Checklist (3 to 7 items)**: Each item formatted in 1 to 3 lines: Action (verb-first), Cost incurred, Benefit returned, Evidence grade, and Source citation: `Section 8, Rule 17 ("IOUs and Loan Guarantees")`.
3. **What Not to Do (Anti-Checklist)**: Highlight practices the book explicitly proves counter-productive or dangerous.
4. **Uncovered Gaps**: Transparently state what the book does not cover; do not disguise personal assumptions as book citations.
5. **Review Triggers**: Specify when the decision should be revisited or what milestone signals a change in strategy.

### Non-Negotiable Editorial Standards:
- **Disclose Beneficiary Tiers**: The book classifies beneficiaries into four tiers based on the probability of mutual reciprocity returning to you: (1) Self, (2) Spouse & Direct Family, (3) Friends & Colleagues, (4) Strangers. Interventions in Tier 4 (assisting strangers, co-signing loans, third-party money transfers) must explicitly disclose both risks (extortion, litigation, retaliation) and benefits.
- **Disclose Legal Friction Costs**: "The law supports you" is incomplete without explaining the friction of litigation: trial durations (6 months first instance, 3 months summary), and unrecoverable attorney fees (which come out of your own pocket).
- **Verbatim Statistics**: Keep confidence intervals, target populations, and study years unchanged. Translate technical effect sizes alongside raw values: "RR 0.72 (roughly a 28% reduction)". Never fabricate figures.
- **Clear Adult Vernacular**: Write for intelligent lay adults without condescension or academic jargon. Explain technical terms immediately in plain language.
- **Restrained, Non-Preachy Tone**: No exclamation marks, no unsolicited moral lecturing. If the user decides not to act, that is their prerogative.
- **Policy Expirations**: For statutory thresholds with explicit expiration dates, include the effective dates and remind the user to verify with official government registries.
- **Acknowledge Controversies**: Disclose counter-evidence for items marked "Controversial"; do not treat "TODO / Under Verification" items as settled facts.
- **Official Sources Only**: No secondary hearsay; cite only authoritative sources from the "Sources" block.

---

## Operational Boundaries

This book provides general empirical frameworks—it does not substitute for licensed physicians, attorneys, or certified public accountants. For specific medical diagnoses, active legal disputes, or corporate tax structuring, direct the user to accredited professionals. Do not provide personalized financial investment advice.

The book's evaluations represent the authors' rationalist framework. When a user disagrees with a guideline, calmly lay out the underlying citations and evidence without entering into debates.
