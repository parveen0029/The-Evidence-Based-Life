# Verification of Records: Addendum 4 to Section 19 (Work-related Injuries)

Verification date: 2026-09-07. Section 19, 6 → 10, the section title is changed from "Layoffs and Voluntary Resignations" to "Laidoffs, Resignations and Work Injuries", 318 → 322 in the book.

Work-related injury turns out to be the biggest single blank in the book: Section 7, Article 3 mentions that work-related injury cases are within the scope of legal aid, but there is no mention of "how to identify it, what time limit, and how much to get." This amount of money is an order of magnitude greater than N for layoffs, and the deadline is even harder.

Method: Use `Invoke-WebRequest` to get the original bytes of the gov.cn bulletin page, decode it according to GB18030 and remove the tags, and compare the original text of the legal articles one by one.

---

## 1. Check the original text item by item

The source is the full text of the "Regulations on Work-related Injury Insurance" (State Council Order No. 586, revised in 2010), the Chinese government website bulletin <https://www.gov.cn/gongbao/content/2011/content_1778064.htm>.

| Laws and regulations | Checked original text | Where to use |
| --- | --- | --- |
| Article 14 | There are seven situations that "should be recognized as work-related injuries", of which item (6) is the revised statement in 2010: "While commuting to and from get off work, you are injured by a traffic accident that is not your main responsibility or an urban rail transit, passenger ferry, or train accident." | Article 7 (Being hit on the way to and from get off work also counts) |
| Article 15 | "(1) Death from a sudden illness during working hours and at the workplace or death after rescue fails within 48 hours" are considered as work-related injuries. | Notes to Article 7 |
| Article 16 | "(1) Those who intentionally commit crimes; (2) Those who are drunk or drug addicts; (3) Those who commit self-mutilation or suicide" shall not be deemed | Notes to Article 7 |
| Article 17 | "The employer shall submit an application for work-related injury identification within 30 days from the date of the accident injury or the date of diagnosis or identification of an occupational disease." Within one year from the date of occupational illness, an application for work-related injury recognition can be submitted directly to the social insurance administration department in the coordinating area where the employer is located. "If the employer fails to submit an application for work-related injury recognition within the time limit specified in paragraph 1 of this article, the employer shall bear the relevant expenses such as work-related injury benefits that comply with the provisions of these regulations during this period." | Two time limits in Article 7 |
| Article 18 | Three application materials: work-related injury identification application form, labor relationship certificate, medical diagnosis certificate or occupational disease diagnosis certificate | Article 7 Cost Column |
| Article 19 | "If the employee or his close relatives believe that the injury is a work-related injury, but the employer does not think it is a work-related injury, the employer shall bear the burden of proof." | Article 7 |
| Article 20 | "The social insurance administrative department shall make a decision on work-related injury identification within 60 days from the date of accepting the application for work-related injury identification." | Article 7 Source Column |
| Articles 21 and 22 | "If after treatment, the injury is relatively stable and there is a disability that affects the ability to work, a labor ability appraisal should be carried out." "Working dysfunction is divided into ten disability levels, the most serious is level one, and the lightest is level 10." | Article 9 |
| Article 36 | Levels 5 and 6: The one-time disability allowance is 18 months and 16 months of personal salary; for those who are difficult to arrange work, the monthly disability allowance is 70% and 60% of personal salary. | Article 9 |
| Article 37 | Levels 7 to 10: The one-time disability subsidy is 13, 11, 9, and 7 months of personal salary; when the contract is terminated or the person requests termination, the fund will pay a one-time work-related injury medical subsidy, and the unit will pay a one-time disability employment subsidy. The standards are stipulated by the provincial government. | Article 9 |
| Article 39 | "(1) The funeral subsidy is six months of the average monthly salary of employees in the coordinated area in the previous year; (2) The pension for dependent relatives...40% per month for spouses, 30% per month for each other relative, and an increase of 10% per month for the elderly or orphans alone on the basis of the above standards... (3) The standard for one-time work-related death benefits is 20 times the per capita disposable income of urban residents nationwide in the previous year." | Article 10 |
| Article 62 | Paragraph 2: "If an employee of an employer who is required to participate in work-related injury insurance but has not participated in work-related injury insurance in accordance with the provisions of these Regulations is injured at work, the employer shall pay the fees in accordance with the work-related injury insurance benefit items and standards stipulated in these Regulations." Paragraph 1: Ordered to participate in and make up payment within a time limit, "an additional late payment penalty of 0.05% per day will be charged; if payment is still not made within the time limit, a fine of not less than 1 time but not more than 3 times the amount of overpayment will be imposed." | Article 8 |

## 2. Not obtained/not adopted

| looking for | result | Process |
| --- | --- | --- |
| The specific amount of one-time work-related death benefit for the year | The national per capita disposable income of urban residents in 2025 is required. The statistical bulletin body cannot be retrieved from the State Council policy document database; the bulletin interpretation article on gov.cn only gives "residents' per capita disposable income actually increased by 5.0% over the previous year", without an absolute value; the latest release list of stats.gov.cn does not have this entry either | In Article 10, only write the multiple formula and write TODO for the amount. |
| Controversial materials on the 48-hour clause in practice | Only a large number of second-hand reviews were found, and no citations or official citations were obtained. | The main text only states the original text of the law and does not expand on the evaluation. |

## 3. Caliber and revenue magnitude

All four calibers are money. The magnitude of benefits is determined based on the monetary thresholds since Section 8: one-time disability benefits are calculated based on monthly wages, and the lowest tenth level is also 7 months' wages; work-related death benefits are "20 times the national per capita disposable income of urban residents in the previous year", all of which are above the 10,000 yuan level, so they are all rated as "large". In terms of cost, identification and appraisal itself cost nothing, but they have to go through the process and wait for the conclusion, and the time is recorded as "mid"; Article 8 (the unit is not insured) additionally records "perseverance = some", because the other party will most likely not recognize it and will have to wait until arbitration.
