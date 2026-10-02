# Addendum: Early Peanut Introduction for Allergy Prevention · Verification Record (2026-09-21)

Task Origin: After reading an in-depth article on circadian rhythms, a user asked: "Are there other fascinating physiological mechanisms in the human body we could add?" The screening criterion was not "how novel the biological mechanism sounds," but "whether knowing this mechanism alters a reader's actionable behavior." Four candidates were screened against this criterion; the user chose to write this first.

Original Coverage: Searching the book for "peanut" yielded zero hits. "Allergy" appeared in Section 6, Section 13, and Section 20, but the Section 20 instance merely clarified that "so-called allergic constitution, family history of allergies, or prior food/drug allergies do not constitute contraindications to vaccination," which concerns immunization rather than infant food introduction. Zero coverage existed for this topic.

Implementation: Section 20 Rule 12, appended at the end of the section without disturbing existing rule numbering.

## Literature

| DOI | Verified | Source Excerpt |
|---|---|---|
| <https://doi.org/10.1056/NEJMoa1414850> (Primary evidence, LEAP trial) | Yes (Du Toit G, Roberts G, Sayre PH, et al. NEJM 2015;372(9):803-813, PMID 25705822) | "We randomly assigned 640 infants with severe eczema, egg allergy, or both to consume or avoid peanuts until 60 months of age. Participants, who were at least 4 months but younger than 11 months of age at randomization, were assigned to separate study cohorts on the basis of preexisting sensitivity to peanut extract, which was determined with the use of a skin-prick test—one consisting of participants with no measurable wheal after testing and the other consisting of those with a wheal measuring 1 to 4 mm in diameter." "Among the 530 infants in the intention-to-treat population who initially had negative results on the skin-prick test, the prevalence of peanut allergy at 60 months of age was 13.7% in the avoidance group and 1.9% in the consumption group (P<0.001). Among the 98 participants in the intention-to-treat population who initially had positive test results, the prevalence of peanut allergy was 35.3% in the avoidance group and 10.6% in the consumption group (P=0.004). There was no significant between-group difference in the incidence of serious adverse events." |
| <https://doi.org/10.1056/NEJMoa1514210> (Remarks · General population, EAT trial) | Yes (Perkin MR, Logan K, Tseng A, et al. NEJM 2016;374(18):1733-1743, PMID 26943128) | "In the intention-to-treat analysis, food allergy to one or more of the six intervention foods developed in 7.1% of the participants in the standard-introduction group (42 of 595 participants) and in 5.6% of those in the early-introduction group (32 of 567) (P=0.32). In the per-protocol analysis, the prevalence of any food allergy was significantly lower in the early-introduction group than in the standard-introduction group (2.4% vs. 7.3%, P=0.01), as was the prevalence of peanut allergy (0% vs. 2.5%, P=0.003) and egg allergy (1.4% vs. 5.5%, P=0.009)" "The early introduction of all six foods was not easily achieved but was safe." "The trial did not show the efficacy of early introduction of allergenic foods in an intention-to-treat analysis." |
| <https://www.gov.cn/zhengce/zhengceku/2020-08/01/content_5531915.htm> (Safety prerequisite) | Yes (General Office of the National Health Commission, "Core Health Education Information on Infant and Toddler Feeding", issued 2020-07-29, extracted verbatim from gov.cn policy database) | "Whole peanuts, tree nuts, jellies, and similar foods easily enter the trachea and cause asphyxiation; infants and young children must avoid eating them." |

## Chinese Official Documents Audited

Querying "infant and toddler feeding" in the State Council policy database JSON interface (`searchfield=title`) retrieved two operative documents, audited for exact keywords:

| Document | Allergy | Sensitization | Avoidance | Peanut |
|---|---|---|---|---|
| Core Health Education Information on Infant and Toddler Feeding (2020) | 0 | 0 | 0 | 2 (both choking warnings) |
| Service Guidelines for Infant and Toddler Nutritional Feeding Assessment (Trial) (2025-02) | 2 (both in context of cow milk protein allergy impacting iron absorption) | 0 | 0 | 0 |

**Conclusion: Official Chinese feeding policies currently take no formal position on whether to introduce allergenic solids early or delay/avoid them.** The rule's remarks document this explicitly, explaining that the rule rests on international trial evidence. The "Dietary Guidelines for Chinese Residents" is a professional publication of the Chinese Nutrition Society rather than an official government decree, and was neither retrieved nor cited.

## Grading and Trade-offs

- **Graded A**: LEAP is a landmark randomized controlled trial with statistically significant findings under intention-to-treat (ITT) analysis across both cohorts, with numbers verifiable verbatim.
- **Benefit rated "large"**: In the negative skin-prick cohort, allergy dropped from 13.7% to 1.9%, representing an ~86% relative risk reduction—far exceeding the mortality/health metric threshold of "≥20% relative reduction rated large."
- **Costs rated "Money = low" (not 0)**: Purchasing peanut butter (dozens of yuan) plus a clinical medical evaluation prior to introduction.
- **Three mandatory safety boundaries—omitting any one would make the rule dangerous**:
  1. **Never feed whole peanuts**—explicitly mandated by NHC; severe choking hazard. Form must be thinned smooth peanut butter or peanut powder mixed into purees. Remarks cross-reference Section 13 Rule 28 (foreign body airway obstruction).
  2. **Must be evaluated by a pediatrician first, never initiated blindly at home**—LEAP evaluated every infant via skin-prick testing prior to enrollment; **infants with wheals >4 mm were excluded from the trial**, and the study never fed peanuts to those children. The "no measurable wheal" and "1 to 4 mm" cohorts in the abstract provide direct evidence.
  3. **Strictly targets high-risk infants** (severe eczema and/or existing egg allergy), not the general infant population.
- **General infant population evidence reported neutrally as weak**: The EAT trial was not statistically significant in ITT analysis (5.6% vs 7.1%, P=0.32), reaching significance only in per-protocol analysis. Remarks note: "Per-protocol analysis tends to inflate effect sizes; the authors explicitly state the trial failed to demonstrate efficacy in ITT," while preserving the authors' finding that "early introduction was safe."
- **Not flagged as "Controversy"**: LEAP and EAT do not represent conflicting schools of thought; they investigated different target populations (high-risk vs general), and their conclusions do not clash. Per project rules, controversy tags are reserved for contradictory evidence; here, scope boundaries are demarcated in remarks.
- **Reconciliation with Section 20 Rule 4 timing**: LEAP initiated introduction between 4 and 11 months, whereas Chinese pediatric guidance introduces complementary solids at 6 months. Remarks detail this nuance and defer individual timing decisions to the pediatrician rather than prescribing it. Rule 4 remarks include mutual cross-references.
- Beneficiary tier: Tier 2 (Children).

## Three Other Candidates Not Written This Round

- **Statin-associated muscle pain is predominantly nocebo (SAMSON trial)**: The NEJM paper was a brief correspondence lacking abstract; full publication in JACC 2021;78:1210-1222 (DOI 10.1016/j.jacc.2021.07.022, Crossref record verified) lacked verbatim retrieved numbers this round, deferred.
- **Muscle tensing against vasovagal syncope during needle phobia**: Evidence strength unverified.
- **Oral hygiene in bedridden elderly preventing aspiration pneumonia**: Evidence strength unverified; Section 17 has 8 rules without it.
