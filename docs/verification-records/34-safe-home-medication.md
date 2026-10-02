# Section 34: Don’t get into trouble if you take the medicine you always have at home

2026-09-29. The cause was issue #43. A reader suggested adding a "Guide to the Use of Over-the-Counter Drugs" and wanted the book to answer antipyretic and analgesic, gastrointestinal medications, and colds.

First, check the coverage: there are only two places in the book that talk about over-the-counter drugs. Section 2, the article on smoking cessation drugs, mentions that nicotine substitutes are over-the-counter drugs, and Section 28 talks about the regulations on the classified sales of prescription drugs and over-the-counter drugs. There is no information on how to take these medicines without causing any problems after buying them yourself. A new section 34 will be opened after confirming with the user.

Positioning: It is not written as a medication manual, and it does not tell what medicine should be taken for each disease. Only entries with "one action can avoid serious consequences" are included, a total of 9 entries. The caliber is all mortality (including health endpoints such as liver failure, gastric bleeding, and neonatal renal failure).

## Check sources one by one

### Official documents in Chinese (all verbatim from the original text)

nmpa.gov.cn still gets 412 when using Invoke-WebRequest, but **Headless Chrome with a proxy can get the rendered text**, and the attachment docx can be downloaded directly using curl with a proxy, browser UA and Referer.

| File | How to take | used in | Checked key points of the original text |
| --- | --- | --- | --- |
| State Food and Drug Administration Announcement No. 15 of 2020 (Revision of Acetaminophen Instructions) | Hunan Provincial Food and Drug Administration reprint page + Attachment 2 of .doc, antiword to get the full text | Article 1 | Attachment 2 (over-the-counter drugs) Precautions Item 3 "It is recommended that the maximum oral dose of acetaminophen per day should not exceed 2 grams"; Item 4 "The combined use of drugs containing acetaminophen or other antipyretic analgesics should be avoided as much as possible to avoid drug overdose or toxic synergy"; adverse reaction item "Excessive use of acetaminophen can cause serious liver damage." **There are no drinking regulations in the attachment**. The sentence about drinking is quoted from the American regulations. |
| State Food and Drug Administration [2011] No. 209 (Usage Management of Nimesulide Oral Preparations) | nmpa original page, headless Chrome | Article 2 | "Nimesulide oral preparations are prohibited for use in children under 12 years old"; for second-line medication, the maximum single dose is 100 mg, and the course of treatment does not exceed 15 days. |
| State Food and Drug Administration Announcement No. 34 of 2020 (Revision of Instructions for Metamizole Related Varieties) | nmpa original page + docx for attachments 1 to 3 | Article 2 | The three revised requirements for metamizole tablets, Compound Artemisia annua metamizole tablets, and Chongganling tablets (capsules) all include "This product is prohibited for use by adolescents and children under the age of 18." The warning for metamizole tablets is "This product is generally not used as the first-choice drug and is only used when the condition is acute and severe and there are no other effective drug treatments." Adverse reactions include agranulocytosis, aplastic anemia, and anaphylactic shock |
| State Food and Drug Administration Announcement No. 57 of 2021 (Revision of Instructions for 14 Varieties of Aminophen Asami Oral Solution and Other Varieties) | nmpa original page + attachment .doc | Article 4 | The list of 14 varieties is verbatim; the warning "It is not recommended that parents or guardians use this product on their own for infants and young children under 2 years old, and should be used under the guidance of a physician or pharmacist"; the precautions are added as "Use in strict accordance with the instructions and dosage to avoid overdose", and the old sentence is changed to "The combined use of anti-cold drugs containing the same or similar active ingredients should be avoided" |
| State Food and Drug Administration Announcement No. 68 of 2022 (Omeprazole Enteric-Coated Tablets Converted to Over-the-Counter Drugs) and Attachment 2 Sample Instructions | nmpa original page + attachment docx | Article 6 | Indications: "For short-term relief of heartburn and acid reflux symptoms caused by excessive gastric acidity"; Precautions: Item 1: "Do not use for more than 7 days", Item 2: "Do not take it again within two months", Item 3: Do not use it if you have difficulty swallowing or pain, vomiting blood, blood in the stool or melena; Item 13: Alarm symptoms and ruling out malignant tumors; Item 18: Avoid combination with clopidogrel; Item 29: People over 55 years old should consult a doctor for new or changing symptoms. |

The "Cough medicines containing codeine and dextromethorphan will be banned for children under 2 years old starting from 2025" circulating on the Internet can only be seen in second-hand reports, and the original text of the Food and Drug Administration has not been found, and it is **not written**. The popular science page of the Jilin Provincial Food and Drug Administration (reprinted from the WeChat public account) lists "Aspirin should be used with caution under 16 years old, lysine is prohibited under 3 months of age" and "Builus Bupleurum Injection is prohibited for children". Also because only the public account reprinted it, ** was not written **.

### US regulations and regulatory documents

| File | used in | Original text checked |
| --- | --- | --- |
| 21 CFR 201.326(a)(1)(iii)(A), eCFR current version | Article 1 | The Liver warning for over-the-counter acetaminophen for adults must be the first item under Warnings; three situations: exceeding the maximum dose in 24 hours, with other drugs containing acetaminophen, and 3 or more alcoholic drinks every day |
| 21 CFR 201.326(a)(2)(iii)(A) | Article 3 | Six conditions for Stomach bleeding warning: age 60 or older; Stomach ulcers or bleeding problems; blood thinning (anticoagulant) or steroid drug; other drugs containing NSAIDs; 3 or more alcoholic drinks every day; take more or for a longer time than directed |
| FDA Drug Safety Communication 2020-10-15 (NSAIDs and 20 weeks of pregnancy) | Article 5 | It can cause fetal renal function problems and oligohydramnios after 20 weeks; covers prescriptions and OTC; FAERS As of 2017-07-21, there are 35 cases, all serious, 5 neonatal deaths and all with neonatal renal failure; most recover 72 hours to 6 days after stopping the drug; the exception is 81 mg low-dose aspirin; OTC label originally only warned for the last 3 months; "Many OTC medicines contain NSAIDs, including those used for pain, colds, flu, and insomnia"; "Other medicines, such as acetaminophen, are available" |

### English literature (Europe PMC takes the original abstract)

| Literature | used in | Numbers verified |
| --- | --- | --- |
| Larson 2005, Hepatology 42(6):1364-1372, doi:10.1002/hep.20948 | Article 1 | 22 centers, 6 years, 662 cases of acute liver failure; 275 cases (42%) acetaminophen; median dose 24 g; 131 cases (48%) unintentional; 38% in the unintentional group taking more than two agents; 65% alive, 27% died without transplantation, 8% transplanted |
| Belay 1999, NEJM 340(18):1377-1382, doi:10.1056/NEJM199905063401801 | Article 2 | 1207 cases under 18 years old from 1981 to 1997; peak of 555 cases in 1980, no more than 36 cases per year since 1987; 82% blood salicylic acid detectable; case fatality rate 31%; warnings on salicylic acid drugs began to be issued in 1980 |
| CNT Collaboration 2013, Lancet 382(9894):769-779, doi:10.1016/S0140-6736(13)60900-9 | Article 3 | 280 NSAID versus placebo trials, 124,513 people; upper gastrointestinal complications ibuprofen 3.97 (2.22–7.10), naproxen 4.22 (2.71–6.56), diclofenac 1.89 (1.16–3.09); all NSAIDs approximately double risk of heart failure; conclusions are high-dose |
| Smith 2014, Cochrane CD001831.pub5 | Article 4 | 29 trials (19 adults, 10 children); in children, cough suppressants, antihistamines, antihistamines plus decongestants, and cough suppressants plus bronchodilators were not better than placebo; 21 reported adverse effects, more with antihistamines and dextromethorphan; honey was better than placebo in one trial; not pooled |
| Kenealy 2025, Cochrane CD000247.pub4 | Article 7 | Write the abstract as 0.73 (0.47–1.13), adverse reactions 1.46 (1.10–1.94) |
| Hahn 2002, Cochrane CD002847 | Article 8 | 8 trials, hypotonic versus unscheduled intravenous infusion of standard oral rehydration salts OR 0.59 (0.45–0.79) |
| ICHD-3 (Cephalalgia 2018, doi:10.1177/0333102417738202) online version 8.2, 8.2.3, 8.2.5 | Article 9 | 8.2 Headache ≥15 days per month, overdose >3 months; 8.2.3 Non-opioid analgesics ≥15 days/month, a variety of non-opioid analgesics are cumulative; 8.2.5 Compound analgesics ≥10 days/month, compound analgesics are defined as containing auxiliary ingredients such as caffeine; |

### WHO

WHO (2005) The treatment of diarrhoea, 4th revision. iris.who.int is front-end rendering. Use the DSpace API (`/server/api/pid/find?id=hdl:10665/43209` to get the uuid and then check the bundles) to get the English and Chinese versions of the text layer. Section 2.6 and Section 10.2: "Antidiarrheal" drugs and antiemetics have no practical benefit in children with acute or persistent diarrhea and should never be given to children under 5 years of age; antiperistaltic drugs (loperamide, etc.) can cause severe paralytic ileus, which can be fatal, and may prolong infection. Section 4.5.1: Beverages containing too much sugar (soft drinks, commercial fruit drinks) can cause hypersodium dehydration. The hypotonic formula has a total osmolarity of 245 mOsm/l, which is 33% less than the standard formula (311) for unplanned intravenous infusion. Section 6: Bloody stools in children are mostly caused by Shigella and require antibiotics.

## How to determine the level of evidence and the magnitude of benefits?

- A: Article 3 (Individual data pooling, with RR), Article 7 (Cochrane, with RR), Article 8 (WHO Manual + Cochrane with OR).
- B: Numbers in Articles 1, 2, and 5 are from case registration, surveillance or adverse event reports, without controls; Article 4 is not merged by Cochrane; Article 6 is the instructions; Article 9 is the diagnostic criteria.
- Benefit magnitude: Article 1 is determined to be large (acute liver failure accounts for nearly 30% of deaths); Article 2 is determined to be large (the number of cases after the warning dropped from 555 to ≤36, a drop of more than 90%); Article 3 is determined to be large (upper gastrointestinal complications are about 4 times higher, a relative decrease of far more than 20%). The figures in the remaining six items cannot be directly converted into "how much less can be achieved if done." They are judged as medium according to the severity of the consequences. The reasons are written in the notes of each item. Special note for Article 8: The numbers in hand compare two rehydration salt formulas, not drinking or not drinking, so the mechanical threshold of ≥20% is not applied.

## Not written in

- "New 2025 Regulations" banning cough medicines containing codeine and dextromethorphan for children under 2 years old: only second-hand reprint, no original text found.
- Specific doses of antipyretics for children according to body weight, alternating use of ibuprofen and acetaminophen: each instruction manual is different, this section only provides guidance to doctors and pharmacists.
- Drug expiration, home medicine cabinet list: light consequences, low cost performance.
