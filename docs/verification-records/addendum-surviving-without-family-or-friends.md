# Addendum: Implementing "Do Not Stay Alone" When You Have Neither Family nor Friends · Verification Record (2026-09-18)

Task Origin: A user inquired regarding Section 29 Rule 1 — "In the initial days after a loved one passes away, do not stay alone. But if someone has neither family nor friends, how can they actually implement this?"

This marked the third time the same systemic issue surfaced (the previous two being "prohibitions without alternatives" and "disclaimers overstepping boundaries"): the actionable steps prescribed by rules implicitly assumed the reader has a reachable person nearby. Auditing the entire section revealed four such implicit assumptions:

| Rule | Location of Implicit "Accompaniment" Assumption |
|---|---|
| Section 29 Rule 1 (Initial days of bereavement) | "Do not stay alone", "Hand over medicine containers to someone else" |
| Section 29 Rule 2 (First week of severe medical diagnosis) | "Bring someone along when picking up the diagnostic report" |
| Section 29 Rule 5 (First six months of spousal bereavement) | "Find a specific person (child, sibling, friend) to make regular home visits or phone calls" |
| Section 29 Rule 12 (Postponing major decisions) | "Talk it through first with someone who has no financial stake in the outcome" |

Placement: Added **Rule 6 to Section 29** (inserted after the spousal bereavement check-in window), shifting original Rules 6 through 12 sequentially to Rules 7 through 13. Intra-section cross-references (original Rule 8 title, Plain Terms, and "Rule 7" in remarks) synchronized to "Rule 8", while two mentions of "Rule 4 of this section" remained unaffected. The four rules listed above each added a sentence pointing to the new rule as an actionable outlet; Rule 12 simultaneously provided an alternative when no one is available to talk to (call helpline 12356, or write thoughts down and reread after three days).

## Structure of the Added Rule

Deconstructing "having accompaniment" into two independently replaceable components forms the structural backbone of this rule:

1. **Ensuring someone discovers you if an emergency occurs** — This component must substitute the person with institutional and technical mechanisms: entrust a neighbor or property management with a spare key or temporary keypad pin and inform them "I will be alone for the next few days"; visit the neighborhood committee (residents' committee) to register as living alone, asking to be placed on the wellness check list and inquiring about free emergency call pendants or smart water meters; configure emergency contacts and the Medical ID on your phone, keeping it off silent and powered on.
2. **Ensuring someone monitors medication and food intake** — This component ultimately relies on personal systems anyway: replace memory with written checklists and phone alarms.

## Source Verification

- **Udell JA, et al. (2012). Living alone and cardiovascular risk in outpatients at risk of or with atherothrombosis. Arch Intern Med. <https://doi.org/10.1001/archinternmed.2012.2782>**: Core record and abstract retrieved via Europe PMC and verified verbatim. 44,573 participants, 8,594 (19%) living alone; 4-year all-cause mortality 14.1% vs. 11.1%, cardiovascular death 8.6% vs. 6.8% (log-rank P<.01), interaction P=.03; age 45–65: 7.7% vs. 5.7%, HR 1.24 (1.01–1.51); age 66–80: 13.2% vs. 12.3%, HR 1.12 (1.01–1.26); age >80: 24.6% vs. 28.4%, HR 0.92 (0.79–1.06) — all from abstract. In concluding remarks authors state "although this observation warrants confirmation"; noted accordingly in remarks.
- **Ministry of Civil Affairs et al. 10 Departments (2022). Guiding Opinions on Conducting Visiting and Caring Services for Elderly Persons in Special Difficulty (Min Fa [2022] No. 73). <https://www.gov.cn/zhengce/zhengceku/2022-10/13/content_5718017.htm>**: Matched in State Council policy library, full text verified verbatim. Target group includes "elderly people living alone, empty-nest, left-behind, disabled, severely impaired, or from family-planning special-need households"; methods include "regular home visits, phone/video calls, remote monitoring"; screening leads are townships/subdistricts with village/resident committee assistance; targets include "ensuring monthly visit rates for seniors in special difficulty reach 100% by end of 2025" and "at least one visit per month for disabled seniors"; smart call systems, smart water/power meters, health monitoring devices with "prompt automatic alerts sent to emergency contacts upon abnormal sensor readings" and "immediate assistance in dialing emergency hotlines." The 10 departments comprise Civil Affairs, Central Political and Legal Affairs Commission, Civilization Office, Education, Finance, Housing and Urban-Rural Development, Agriculture and Rural Affairs, National Health Commission, China Disabled Persons' Federation, and National Working Commission on Aging.
- Reused three existing verified sources without adding new citations: Section 13 Rule 1 (79.2% of out-of-hospital cardiac arrests occur at home; bystander CPR 16.1% vs. 3.9%), Section 22 Rule 10 (living alone mortality odds ratio 1.32), and the 25-department 2026 plan cited in Section 29 Rule 11 (grid workers and social workers "promptly identifying psychological crisis risks such as family tragedies, unemployment, or dropping out of school").

Unobtained / Omitted: Attempted to locate primary studies establishing "longer hospital arrival delays during acute MI or stroke among individuals living alone"; Europe PMC suffered persistent 502/503 errors during this session. Consequently, the mechanism of presentation delay was omitted from the text, retaining only the direct causal link derived from Section 13 data: "if no one is present, no one performs chest compressions."

## Evidence Rating and Benefit Determination

- **Evidence Level B**: The association between living alone and mortality is observational; reverse causality (unhealthy or economically disadvantaged individuals being more likely to live alone) cannot be eliminated. The visiting and caring policy covers only older adults; readers under 60 lack a tailored national system and rely instead on the proactive identification mandates for grid workers under the 25-department plan. The concrete interventions (keys, registry, emergency contacts) lack randomized trials.
- **Benefit Magnitude "Moderate" rather than mechanical threshold mapping**: Strictly mechanical mapping would take HR 1.24 or 4-year mortality 14.1% vs. 11.1% (~27% relative difference) and label it "Large." However, the actions in this rule do not eliminate living alone itself; they only address the "being discovered" failure mode. The overall association between living alone and mortality cannot be attributed entirely to this rule's interventions, justifying a "Moderate" rating.
- Cost tag: Money=0 (resident committee registration and hotlines are free; smart devices are installed free for solitary seniors in many jurisdictions and not treated as mandatory prerequisites), Time=Few, Perseverance=Some (requires proactively admitting "I live alone"), Benefit=Moderate, Metric=Mortality.

## Synchronization

- Rules count +1, Level B +1, Links +2 (Udell DOI and gov.cn policy link). Ran `tools/sync-stats.ps1` to update README, index.html, tools/og.html, and regenerated og.png.
- Manual edits: Section 29 TOC summary in CLAUDE.md (added new rule, modified metric summary from "final three rules are money" to "four rules discussing expenditure and entitlements are money"), identical line in README Section 29 overview, and introductory note in Section 29 (added metric explanation and link pointing to Rule 6).
- Historical mentions in earlier verification records referring to "Section 29 Rule 8" or "Section 29 Rule 12" denoted rules before renumbering (corresponding to current Rules 9 and 13); historical records are left unchanged.
