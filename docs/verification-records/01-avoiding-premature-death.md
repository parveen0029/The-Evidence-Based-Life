# Section 1 Source Verification Record

Verification date 2026-09-07. Most publishing sites (NEJM, Elsevier, Wiley, BMJ, AHA) return 403 to WebFetch. These documents read the title, author, journal, year and abstract full text of the corresponding record of the same DOI through the Europe PMC REST interface (`<https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:">…"&resultType=core&format=json`); doi.org itself can parse (302 to the publisher). The following "original texts" are all original sentences captured from the abstract/text.

## 1. Safety belt
- <https://crashstats.nhtsa.dot.gov/Api/Public/ViewPublication/813573> — Opened (PDF converted to text using pdftotext). Title "Occupant Protection in Passenger Vehicles: 2022 Data, DOT HS 813 573, May 2024" matches.
  - Original text: "Fifty percent of passenger vehicle occupants killed in traffic crashes in 2022 were unrestrained (based on known restraint use)."
  - Original text: "lap/shoulder seat belts, when used, reduce the risk of: fatal injury to front-seat passenger car occupants by 45 percent; … fatal injury to front-seat light-truck occupants by 60 percent"
  - Original text: "60 percent of those in the second row were unrestrained."
- <https://www.who.int/news-room/fact-sheets/detail/road-traffic-injuries> — Opened. Original text: "Wearing a seat-belt can reduce the risk of death among vehicle occupants by up to 50%."
- <https://ghoapi.azureedge.net/api/RS_196?$filter=SpatialDim%20eq%20%27CHN%27> — Opened (WHO GHO API). China 2021: 248,099 (95% CI 233,685–262,513). RS_198 Same method opens: 2021 17.4/100,000.
  - Note: When the GHO interface returns, RS_196 gives an absolute number and RS_198 gives a rate, which is opposite to the indicator number I expected; the number itself is taken from the returned JSON.

## 2. Helmet
- <https://doi.org/10.1002/14651858.CD004333.pub3> — doi.org resolved to Wiley (403), Europe PMC record acknowledgment: Liu BC, 2008, "Helmets for preventing injury in motorcycle riders".
  - Original text: "helmets were estimated to reduce the risk of death by 42% (OR 0.58, 95% CI 0.50 to 0.68)"; "reduce the risk of head injury by 69% (OR 0.31, 95% CI 0.25 to 0.38)"

## 3. Smoke alarm/carbon monoxide
- <https://doi.org/10.1001/jama.279.20.1633> — Europe PMC Record acknowledgment: Marshall SW, Runyan CW, et al., JAMA 1998, "Fatal residential fires: who dies and who survives?".
  - Original text: "Overall, a functioning smoke detector lowered the risk of death (OR, 0.39; 95% CI, 0.18-0.83)."
- <https://www.usfa.fema.gov/downloads/pdf/statistics/v22i2.pdf> — Opened (PDF to text). Title "Fatal Fires in Residential Buildings (2018-2020), Topical Fire Report Series June 2022 Vol 22 Issue 2" matches.
  - Original text: "Smoke alarms were not present in 24% of fatal fires in occupied residential buildings."; "The leading human factor contributing to the ignition of fatal fires in residential buildings was being 'asleep' (41%)."
- <https://doi.org/10.46234/ccdcw2020.008> — doi.org parsed to weekly.chinacdc.cn (metadata only), full text read via Europe PMC PMC8392909 fullTextXML. Author You J, Liu J, Zhou M, China CDC Weekly 2020.
  - Original text: "In 2018, there were 11,523 deaths caused by carbon monoxide poisoning reported in China"; "highest proportions occurring in December (72.59%), January (67.42%), and February (66.48%)"
- Not adopted: The NFPA "Smoke Alarms in US Home Fires" page only returns the title, and the report PDF returns 500, which cannot be verified, so the NFPA's "55% lower mortality rate" figure is not quoted.

## 4. Blood pressure
- <https://doi.org/10.1016/S0140-6736(15)01225-8> — Elsevier page showing only Redirecting; Europe PMC record acknowledgment: Ettehad D, Lancet 2016.
  - Original text: "relative risk [RR] 0·80, 95% CI 0·77-0·83" (major cardiovascular event); "stroke (0·73, 0·68-0·77)"; "heart failure (0·72, 0·67-0·78)"; "a significant 13% reduction in all-cause mortality (0·87, 0·84-0·91)"
  - Original text: "We identified 123 studies with 613,815 participants for the tabular meta-analysis."
- <https://doi.org/10.1016/S0140-6736(17)32478-9> — Europe PMC Record Acknowledgment: Lu J, Lancet 2017, China PEACE Million Persons Project.
  - Original text: "44·7% (95% CI 44·6-44·8) of the sample had hypertension, of whom 44·7% (44·6-44·8) were aware of their diagnosis, 30·1% (30·0-30·2) were taking prescribed antihypertensive medications, and 7·2% (7·1-7·2) had achieved control"

## 5. Do not speed or drink and drive
- <https://www.who.int/news-room/fact-sheets/detail/road-traffic-injuries> — Opened.
  - Original text: "Every 1% increase in mean speed produces a 4% increase in the fatal crash risk."; "The risk of a road traffic crash starts at low levels of blood alcohol concentration (BAC)."

## 6. Child safety seats
- NHTSA 813573 (same as section 1). Original text: "NHTSA has estimated that car seats reduce the risk of fatal injury by 71 percent for infants (younger than 1 year old) and by 54 percent for toddlers (1 to 4 years old) in passenger cars."
- WHO road traffic fact sheet (ibid.). Original text: "The use of child restraints can lead to a 71% reduction in deaths among infants."

## 7. Drowning
- <https://doi.org/10.1136/ip.2010.028688> — doi.org resolved to injuryprevention.bmj.com (403); Europe PMC record acknowledgment: Cummings P, Mueller BA, Quan L. Injury Prevention 2011;17(3):156-159, PMID 20889519.
  - Original text: "The adjusted RR was 0.51 (95% CI 0.35 to 0.74)."
  - NOTE: The DOI I originally wrote down (…028381) was wrong, doi.org returned a 404, and has been changed to…028688 given by Europe PMC.
- <https://doi.org/10.46234/ccdcw2023.198> — parsed to weekly.chinacdc.cn; the full text was read by Europe PMC PMC10689961. Li Z, China CDC Weekly 2023.
  - Original text: "the national drowning mortality rate from 6.60 per 100,000 in 2013 down to 3.28 per 100,000 in 2021"; "rural areas exhibited roughly double the mortality rate found in urban areas"; "in China, it is deemed the primary cause of death for children between the ages of 1 and 14"; "peaking at 3.95 per 100,000 in the 15–19 year age group"
- <https://doi.org/10.46234/ccdcw2024.057> — parsed to weekly.chinacdc.cn; abstract read by Europe PMC. Zhou J, China CDC Weekly 2024.
  - Original text: "In 2021, drowning and road traffic crashes were the top two causes of child injury deaths, explaining 31.1% and 27.9% of total injury deaths, respectively."
- Not adopted: The Chinese Center for Disease Control and Prevention website chinacdc.cn/…/t20210809_233793.html returns 404.

## 8. Prevent falls for the elderly
- <https://doi.org/10.1002/14651858.CD012424.pub2> — Wiley 403; Europe PMC Record Acknowledgment: Sherrington C, 2019.
  - Original text: "Exercise reduces the rate of falls by 23% (rate ratio (RaR) 0.77, 95% confidence interval (CI) 0.71 to 0.83"; "reduces the number of people experiencing one or more falls by 15% (risk ratio (RR) 0.85, 95% CI 0.81 to 0.89"
  - Original text: "We included 108 RCTs with 23,407 participants living in the community in 25 countries."
- <https://doi.org/10.1002/14651858.CD007146.pub3> — Europe PMC Record Acknowledgment: Gillespie LD, 2012.
  - Original text: "Home safety assessment and modification interventions were effective in reducing rate of falls (RR 0.81, 95% CI 0.68 to 0.97; six trials; 4208 participants)"; "Tai Chi did significantly reduce risk of falling (RR 0.71, 95% CI 0.57 to 0.87…)"
- <https://doi.org/10.46234/ccdcw2021.013> — parsed to weekly.chinacdc.cn; the full text was read by Europe PMC PMC8393086. Lu Z, China CDC Weekly 2021.
  - Original text: "Falls are the top cause for death from injuries in people aged 65 years and above"; "Home (55.97%), road/street (18.69%), and public residential institution (12.80%) were the sites where falls most often occurred"

## 9. Hepatitis B
- <https://doi.org/10.1371/journal.pmed.1001774> — Text not retrieved after PLOS redirect; Europe PMC record confirmed: Qu C, PLoS Medicine 2014.
  - Original text: "efficacies of 84% (95% CI 23%-97%)" (PLC onset); "catch-up vaccination on HBsAg seroprevalence in early adulthood was 21% (95% CI 10%-30%), substantially weaker than that of the neonatal vaccination (72%, 95% CI 68%-75%)"
- <https://doi.org/10.3201/eid2305.161477> — Europe PMC Acknowledgment of record: Cui F, Emerging Infectious Diseases 2017.
  - Original text: "HBV surface antigen prevalence declined 46% by 2006 and by 52% by 2014"; under 5 years old "the decline was 97%"

## 10. HPV vaccine
- <https://doi.org/10.1056/NEJMoa1917338> — NEJM 403; Europe PMC Record Acknowledgment: Lei J, NEJM 2020.
  - Original text: "the incidence rate ratio was 0.12 (95% CI, 0.00 to 0.34) among women who had been vaccinated before the age of 17 years and 0.47 (95% CI, 0.27 to 0.75) among women who had been vaccinated at the age of 17 to 30 years"
  - Original text: "follow an open population of 1,672,983 girls and women who were 10 to 30 years of age from 2006 through 2017"

## 11. Cervical Cancer Screening
- <https://doi.org/10.1056/NEJMoa0808516> — NEJM 403; Europe PMC Record Acknowledgment: Sankaranarayanan R, NEJM 2009.
  - Original text: "hazard ratio for the detection of advanced cancer in the HPV-testing group, 0.47; 95% confidence interval [CI], 0.32 to 0.69"; "34 deaths from cancer in the HPV-testing group, as compared with 64 in the control group (hazard ratio, 0.52; 95% CI, 0.33 to 0.83)"

## 12. Colorectal cancer screening
- <https://doi.org/10.1002/14651858.CD001216.pub2> — Europe PMC Record Acknowledgment: Hewitson P, 2007.
  - Original text: "a 16% reduction in the relative risk of colorectal cancer mortality (RR 0.84, CI: 0.78-0.90)"; "25% relative risk reduction (RR 0.75, CI: 0.66 - 0.84) for those attending at least one round of screening"
- <https://doi.org/10.1056/NEJMoa2208375> — Europe PMC Record Acknowledgment: Bretthauer M, NEJM 2022.
  - Original text: "the risk of colorectal cancer at 10 years was 0.98% in the invited group and 1.20% in the usual-care group, a risk reduction of 18% (risk ratio, 0.82; 95% confidence interval [CI], 0.70 to 0.93)"; "The risk of death from colorectal cancer was 0.28% in the invited group and 0.31% in the usual-care group (risk ratio, 0.90; 95% CI, 0.64 to 1.16)"

## 13. Flu vaccine
- <https://doi.org/10.1161/CIRCULATIONAHA.121.057042> — AHA 403; Europe PMC Record Acknowledgment: Fröbert O, Circulation 2021 (IAMI).
  - Original text: "Rates of all-cause death were 2.9% and 4.9% (hazard ratio, 0.59 [95% CI, 0.39-0.89]; P=0.010)"; "rates of cardiovascular death were 2.7% and 4.5%, (hazard ratio, 0.59 [95% CI, 0.39-0.90]"
  - Original text: "2571 participants were randomized at 30 centers across 8 countries"; "Over the 12-month follow-up, the primary outcome occurred in…"
- <https://doi.org/10.1001/jamanetworkopen.2022.8873> — The JAMA page is directly opened successfully. Behrouzi B, JAMA Network Open 2022.
  - Original text: "influenza vaccine was associated with a lower risk of composite cardiovascular events (3.6% vs 5.4%; RR, 0.66; 95% CI, 0.53-0.83"; "1.7% of vaccine recipients died of cardiovascular causes compared with 2.5% of placebo or control recipients (RR, 0.74; 95% CI, 0.42-1.30"
- <https://doi.org/10.1002/14651858.CD004876.pub4> — Europe PMC Record Acknowledgment: Demicheli V, 2018.
  - Original text: "may experience less influenza over a single season compared with placebo, from 6% to 2.4%" (low-certainty); "very low-certainty evidence for the effect on mortality"

## 14. Helicobacter pylori
- <https://doi.org/10.1136/bmj.l5016> — BMJ 403; Europe PMC Record Acknowledgment: Li WQ, BMJ 2019.
  - Original text: "A protective effect of H pylori treatment on gastric cancer incidence persisted 22 years post-intervention (odds ratio 0.48, 95% confidence interval 0.32 to 0.71)"; "fully adjusted hazard ratio for H pylori treatment was 0.62 (95% confidence interval 0.39 to 0.99)"

## 15. Low-dose CT
- <https://doi.org/10.1056/NEJMoa1102873> — NEJM 403; Europe PMC record acknowledgment (PMID 21714641) and open full-text abstract at <https://pmc.ncbi.nlm.nih.gov/articles/PMC4356534/>.
  - Original text: "53,454 persons at high risk for lung cancer at 33 U.S. medical centers"; "24.2% with low-dose CT and 6.9% with radiography over all three rounds"; "96.4% of the positive screening results in the low-dose CT group … were false positive results"; "20.0% (95% CI, 6.8 to 26.7; P = 0.004)";
  - Inclusion criteria (55–74 years, ≥30 pack-years, ≤15 years abstinent) were confirmed in the Europe PMC abstract.

## 16. Psychological crisis
- <https://doi.org/10.1016/S2215-0366(16)30030-X> — Elsevier page showing only Redirecting; Europe PMC record acknowledgment: Zalsman G, Lancet Psychiatry 2016.
  - Original text: "Evidence for restricting access to lethal means in prevention of suicide has strengthened since 2005"; "overall decrease of 43% since 2005" (analgesic control); "hot-spots for suicide by jumping (reduction of 86% since 2005, 79% to 91%)"; "School-based awareness programmes have been shown to reduce suicide attempts (odds ratio [OR] 0·45, 95% CI 0·24-0·85"
- <https://www.gov.cn/zhengce/zhengceku/202412/content_6994470.htm> — Opened. Title "Notice of the National Health Commission on the Application of "12356" National Unified Psychological Assistance Hotline Number", National Health Medical Policy Letter [2024] No. 259, 2024-12-06.
  - Original text: "Set '12356' as the national unified psychological assistance hotline number"; "Provide psychological assistance services for no less than 18 hours a day"; "Ensure that the function of dialing the '12356' telephone number to connect to the psychological assistance hotline is realized before 0:00 on May 1, 2025."
  - The original link to nhc.gov.cn returned 412, which was redirected to the same document in the State Council Policy Document Library.

## Not confirmed/not adopted
- NHTSA webpage nhtsa.gov/risky-driving/seat-belts, car-seats-and-booster-seats: 403, unconfirmed, official PDF of crashstats instead.
- NFPA Smoke Alarm Report: Not Confirmed, Not Cited.
- WHO Global status report on road safety 2023 China country profile PDF: 404, not confirmed; China road deaths use GHO API instead.
- WHO drowning fact sheet (opened, version 2026-05-01): No Chinese figures, not cited; "around 300 000 annual drowning deaths worldwide" not used.
- Trial size figures in the revenue column (Ettehad 123/613,815, Sherrington 108/23,407, Lei 1,672,983, IAMI 2571) have been verified verbatim in the second round of Europe PMC crawls, see the original text of each article.
- The prices in the cost column (helmets, alarms, vaccines, inspection fees, etc.) are the author's rough estimates based on market prices and are not quoted figures and have not been verified.
