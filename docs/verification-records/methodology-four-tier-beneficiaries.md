# Metric Change: Four-Tier Beneficiary Framework · Record (2026-09-09)

Task Origin: After Section 13 Rule 38 (encountering a street brawl) was drafted, a reader asked: "The person on the ground has zero relationship to me and zero impact on my life — why should I intervene or care?" This question challenged the foundational calibration of the entire book: while the book professes to "answer what is spent and what is gained for every rule" with the reader as default subject, several rules in Section 13 actually reported the survival probability of the rescued victim in their "Benefit" column, inadvertently swapping the grammatical and economic subject. The author accordingly established the four-tier beneficiary framework.

## New Rules

Beneficiaries are divided into four tiers, ordered from highest to lowest based on "the expected return of that benefit flowing back to the reader": ① The reader themselves; ② Spouse and direct lineal relatives (parents, children, grandparents, grandchildren); ③ Friends, colleagues, and other relatives — reciprocal social relationships where favors rendered may return in the future; ④ Strangers — the lowest tier, though not zero: low probability of return, unknown personal character, coupled with risks of extortion, retaliatory accusations, or violent repercussions. Different tiers cannot be pooled or aggregated. When addressing Tier ④, the risk surface must be explicitly itemized alongside the benefits. Beneficiary tier does not alter the Benefit magnitude (which remains mechanically determined from the Benefit column); it influences whether the rule warrants paying that cost, documented within remarks. This rule was incorporated simultaneously into CLAUDE.md (new section "Whom Are Benefits Calculated For (Beneficiary Framework)", detailing a three-step drafting procedure for other-regarding rules), README (two paragraphs following "How to Read"), and synchronized across two locations in the search page index.html: the `<noscript>` fallback block (visible only with JS disabled or to crawlers) and the visible doc-head subtitle. Initially only the noscript block was updated, and after author feedback ("the page only displays 'Every rule answers two questions'"), the visible doc-head was amended. By project convention, that subtitle contains no numbers.

The initial draft formulated this as "calculate only for oneself and lineal relatives; friends, colleagues, and strangers are completely excluded," which misconstrued the author's original words and was revised on the same day to the four-tier framework above. Traces of that misinterpretation were purged from CLAUDE.md, README, index.html, Section 13 introduction, and remarks in Rules 2 and 15. The title of Rule 38 had dropped "call 110" during that misinterpretation, which was restored in this round as "if calling police, retreat to a safe distance before dialing 110," and the remark "this protects the person on the ground, not you" was rewritten to "falls into the lowest beneficiary tier; weigh for yourself whether spending this time is worthwhile."

## Comprehensive Audit Results

Scanned all 471 rule titles for keywords (someone, others, strangers, bystanders, passersby, counterpart, colleagues, friends, neighbors, heroic rescue, helping, people nearby), matching 37 rules. After individual review, only 9 rules required modifications:

- The overwhelming majority of matching rules were already purely self-interested calculations focused on preventing the reader from being penalized or defrauded (no upskirt filming, don't lend ID cards, don't transport luggage for strangers, don't accept candy from strangers, don't execute scripts on other people's machines, leave venues if offered suspicious items, etc.); left completely untouched.
- Child-related rules (safety seats, window guards, water safety) and eldercare/parenting/pregnancy chapters naturally center on children and parents, falling under Tier 2; left untouched.
- Section 13 Rule 40 (financial recovery after injury during rescue) calculates how the reader recovers expenses after being injured, representing a self-interested relief rule; left untouched.

Remediated locations (9 rules):

| Location | Remediation |
|---|---|
| Section 13 Introduction | Added sentence explaining beneficiary framework: primary axis is oneself and spouse/direct relatives; secondary is friends/colleagues; strangers represent non-zero but lowest-tier benefits, carrying risks of extortion and entanglement |
| Section 13 Rule 1 (CPR) | Plain Terms opened with "The person you are most likely to perform compressions on is a family member", Benefit column added home occurrence proportion |
| Section 13 Rule 2 (Fallen person / elderly fall) | Remarks state this protocol applies first to one's own elderly family members; when applied to strangers, the remainder consists of Good Samaritan liability protections and "do not move improperly" |
| Section 13 Rule 15 (Seizures) | Remarks clarify the primary scenario is family members with epilepsy; applying identical actions to strangers drops one beneficiary tier while incurring no liability |
| Section 13 Rule 16 (Hypoglycemia) | Remarks clarify default target is oneself or family members with diabetes |
| Section 13 Rule 17 (Electric shock) | Remarks emphasize "cut power before touching the person" is a purely self-interested safety rule |
| Section 13 Rule 26 (Drowning) | Remarks emphasize "do not enter the water" is a self-interested safety rule, and those needing rescue are overwhelmingly one's own children |
| Section 13 Rule 27 (Choking) | Remarks highlight that foreign body airway obstruction occurs most frequently at one's own dining table |
| Section 13 Rule 38 (Encountering a brawl) | Title revised to "Step back and leave...; if calling police, retreat to a safe distance before dialing 110", text presents reporting as an option for reader discretion; remarks note reporting benefits fall into lowest tier |
| Section 8 Rule 14 (Threats from domestic partners) | Remarks specify the calculation centers on cohabiting spouses, parents, and children, and involuntary psychiatric hospital admission rights are legally restricted to close relatives |

## Additional Verifications

The proportion of cardiac arrests occurring at home was retrieved from the previously cited study, with figures verified in this round: Zheng J et al. (2023), BASIC-OHCA registry, The Lancet Public Health, <https://doi.org/10.1016/S2468-2667(23)00173-1> — among 38,227 non-traumatic out-of-hospital cardiac arrests, "30 282 (79.2%) had a cardiac arrest at home"; from the same paper: "7121 (20.3%) received bystander cardiopulmonary resuscitation", and "441 (1.2%) of 38 227 survived". PubMed returned only a cookie prompt during this session; numbers were re-verified via abstractText from Europe PMC REST API.

## Out of Scope / Not Performed

Did not introduce "Beneficiary" as a filterable facet in the user interface (which would require altering the cost tag schema and index.html filtering logic), nor were any rules deleted: the lowest of the four tiers does not represent zero benefit, providing no justification for deletion. Rule counts and all statistics remained unchanged at 471 rules (A 299 / B 123 / C 49; Cost-performance Extremely High 83 / High 236 / Moderate 152).
