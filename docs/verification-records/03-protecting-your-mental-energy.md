# Section 3 Source Verification Records

Note: Most publisher pages (APA psycnet, Elsevier, SAGE, PNAS, Springer, PubMed) return 403 / verification code / cookie prompt only to native WebFetch, so the verification path is: first use <https://doi.org/>... to parse and confirm the existence of the DOI and check the redirection target (confirm the publisher and journal), and then use Europe PMC REST API / Crossref API / OpenAlex API / PMC full text page / Author or university official PDF Get the title, author, year and abstract of the original text. Each entry lists the actual URL opened and the original text location of the reference number.

## Entry 1

- <https://doi.org/10.1037/xhp0000100> → 302 to doi.apa.org, DOI exists; psycnet page 403
- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1037/xhp0000100&format=json&resultType=core> → Confirmed: Stothart C, Mitchum A, Yehnert C (2015) The attentional cost of receiving a cell phone notification. J Exp Psychol Hum Percept Perform
  - Abstract original text: "cellular phone notifications alone significantly disrupted performance on an attention-demanding task, even when participants did not directly interact with a mobile device during the task. The magnitude of observed distraction effects was comparable in magnitude to those seen when users actively used a mobile phone, either for voice calls or text messaging."
- <https://doi.org/10.1086/691462> → 302 to journals.uchicago.edu, DOI exists; Publisher page 403
- <https://api.crossref.org/works/10.1086/691462> → Confirmed: Ward AF, Duke K, Gneezy A, Bos MW (2017) Brain Drain: The Mere Presence of One's Own Smartphone Reduces Available Cognitive Capacity. J Assoc Consum Res 2(2):140-154
- <https://api.openalex.org/works/doi:10.1086/691462> → Abstract original text: "Results from two experiments indicate that even when people are successful at maintaining sustained attention—as when avoiding the temptation to check their phones—the mere presence of these devices reduces available cognitive capacity. Moreover, these costs are highest for those in smartphone dependence."
  - The three conditions of "desk/pocket/another room" and the two indicators of "working memory, fluid intelligence" are from my memory of the paper. The abstract only mentions two experiments and available cognitive capacity. These two details are not confirmed verbatim in the original text (the text cannot be opened) and have been deleted from the entry. The entry only retains the expressions supported by the original abstract.

## Entry 2

- <https://doi.org/10.1038/s41598-017-03171-4> → 302 Go to nature.com, DOI exists; permission to jump to the nature page is required
- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1038/s41598-017-03171-4&format=json&resultType=core> → Confirmed: Phillips AJK, Clerx WM, O'Brien CS, Sano A, Barger LK, Picard RW, Lockley SW, Klerman EB, Czeisler CA (2017) Irregular sleep/wake patterns are associated with poorer academic performance and delayed circadian and sleep/wake timing. Sci Rep
  - Abstract original text: "We studied 61 undergraduates for 30 days ... DLMO occurred later (00:08 ± 1:54 vs. 21:32 ± 1:48; p < 0.003); the daily sleep propensity rhythm peaked later (06:33 ± 0:19 vs. 04:45 ± 0:11; p < 0.005) ... A positive correlation (r = 0.37; p < 0.004) between academic performance and SRI was observed ... Irregular vs. Regular group differences in circadian timing were likely primarily due to their different patterns of light exposure."
  - "About 2.5 hours" and "About 1.8 hours" are approximate values I calculated based on the above time difference.

## Entry 3

- <https://doi.org/10.1093/sleep/26.2.117> → 302 to academic.oup.com, then <https://academic.oup.com/sleep/article-lookup/doi/10.1093/sleep/26.2.117> is opened successfully
  - Confirmed: Van Dongen HPA, Maislin G, Mullington JM, Dinges DF (2003) The Cumulative Cost of Additional Wakefulness: Dose-Response Effects on Neurobehavioral Functions and Sleep Physiology From Chronic Sleep Restriction and Total Sleep Deprivation. Sleep 26(2):117-126
  - Abstract original text (OUP page + Europe PMC are consistent in both places): "A total of n = 48 healthy adults (ages 21-38)"; "Chronic restriction of sleep periods to 4 h or 6 h per night over 14 consecutive days resulted in significant cumulative, dose-dependent deficits in cognitive performance on all tasks"; "chronic restriction of sleep to 6 h or less per night produced cognitive performance deficits equivalent to up to 2 nights of total sleep deprivation"; "Subjective sleepiness ratings showed an acute response to sleep restriction but only small further increases on subsequent days, and did not significantly differentiate the 6 h and 4 h conditions."
- <https://doi.org/10.1037/a0018883> → 302 to doi.apa.org, DOI exists
- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1037/a0018883&format=json&resultType=core> → Confirmed: Lim J, Dinges DF (2010) A meta-analysis of the impact of short-term sleep deprivation on cognitive variables. Psychol Bull
  - Abstract original text: "short-term (<48 hr) total sleep deprivation"; "70 articles containing 147 cognitive tests"; "lapses in simple attention: g = -0.776, 95% CI [-0.96, -0.60], p < .001"; "reasoning accuracy: g = -0.125, 95% CI [-0.27, 0.02]"

## Entry 4

- <https://doi.org/10.5664/jcsm.3170> → 302, DOI exists; jcsm.aasm.org certificate error, springer requires authorization
- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.5664/jcsm.3170&format=json&resultType=core> → Confirmed: Drake C, Roehrs T, Shambroom J, Roth T (2013) Caffeine effects on sleep taken 0, 3, or 6 hours before going to bed. J Clin Sleep Med; PMID 24235903, PMCID PMC3805807
- <https://pmc.ncbi.nlm.nih.gov/articles/PMC3805807/> → Full text opened successfully
  - Original text: "For TST, reductions in duration relative to placebo were significant at each of the caffeine administration time points, reducing TST between 1.1 to 1.2 hours."; "Caffeine administered 6 h prior to bedtime reduced total sleep time by 41 min, which approached significance (p = 0.08)." (diary); "only the objective measure detected differences when caffeine was taken 6 hours prior to bedtime"
- <https://doi.org/10.1016/j.smrv.2023.101764> → 302 to linkinghub.elsevier.com, DOI exists
- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1016/j.smrv.2023.101764&format=json&resultType=core> → Confirmed: Gardiner C, Weakley J, Burke LM, Roach GD, Sargent C, Maniar N, Townshend A, Halson SL (2023) The effect of caffeine on subsequent sleep: A systematic review and meta-analysis. Sleep Med Rev
  - Abstract original text: "Caffeine consumption reduced total sleep time by 45 min and sleep efficiency by 7%"; "coffee (107 mg per 250 mL) should be consumed at least 8.8 h prior to bedtime"

## Entry 5

- <https://doi.org/10.1016/j.chb.2014.11.005> → 302 to linkinghub.elsevier.com, DOI exists; sciencedirect 403
- <https://api.crossref.org/works/10.1016/j.chb.2014.11.005> → Confirmed: Kushlev K, Dunn EW (2015) Checking email less frequently reduces stress. Comput Hum Behav 43:220-228
- <https://dunn.psych.ubc.ca/wp-content/uploads/2010/11/kushlev-dunn-email-and-stress-in-press1.pdf> (accepted manuscript PDF from the official website of the author's laboratory, extracted by local pdftotext)
  - Abstract original text: "During one week, 124 adults were randomly assigned to limit checking their email to three times a day; during the other week, participants could check their email an unlimited number of times per day."
  - Original text: "participants felt less daily stress in the limited as compared to the unlimited email condition, F(1, 121) = 4.18, p = .04, Cohen's d = .37"; "the average number of times people reported checking their email on a normal day at work was 15.48 at baseline (SD = 8.69)"; "there were no significant differences between conditions in how many emails people received (Mlimited = 16.64 vs. Munlimited = 16.04 ...) or responded to"

## Entry 6

- <https://doi.org/10.1037/a0030986> → 302 to doi.apa.org, DOI exists
- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1037/a0030986&format=json&resultType=core> → Confirmed: Altmann EM, Trafton JG, Hambrick DZ (2014) Momentary interruptions can derail the train of thought. J Exp Psychol Gen
  - Abstract original text: "Interruptions averaging 4.4 s long tripled the rate of sequence errors on post-interruption trials relative to baseline trials. Interruptions averaging 2.8 s long--about the time to perform a step in the interrupted task--doubled the rate of sequence errors."
- <https://www.ics.uci.edu/~gmark/CHI2005.pdf> (author UCI official homepage PDF, local pdftotext extraction)
  - Abstract original text: "detailed observation of 24 information workers";
  - DOI Verification: The 10.1145/1054972.1054989 I originally wrote down was verified by OpenAlex to be from another article (Marshall & Bly) and has been changed. <https://api.crossref.org/works/10.1145/1054972.1055017> and <https://api.openalex.org/works/doi:10.1145/1054972.1055017> are both identified as Mark, Gonzalez, Harris (2005) No task left behind? Examining the nature of fragmented work. CHI 2005 pp.321-330
- <https://www.ics.uci.edu/~gmark/chi08-mark.pdf> (author’s official PDF, extracted locally)
  - Abstract original text: "people completed interrupted tasks in less time with no difference in quality ... but this comes at a price: experiencing more stress, higher frustration, time pressure and effort."; text: "Forty-eight subjects participated."
  - <https://api.crossref.org/works/10.1145/1357054.1357072> → Confirmed: Mark G, Gudith D, Klocke U (2008) The cost of interrupted work: more speed and stress. CHI 2008 pp.107-110
  - In the note, "About half of the interruptions were initiated by myself" comes from my memory of the paper. It was not verified verbatim in the extracted text and has been deleted from the entry notes.

## Entry 7

- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22Task%20switching%22%20AND%20AUTH:Monsell%20AND%20PUB_YEAR:2003&format=json&resultType=core> → Confirmed: Monsell S (2003) Task switching. Trends Cogn Sci; DOI 10.1016/s1364-6613(03)00028-7; PMID 12639695
  - Abstract original text: "Subjects' responses are substantially slower and, usually, more error-prone immediately after a task switch."
  - Note: Directly using DOI to search Europe PMC returns 0 items (bracket encoding problem), use title + author instead to find
- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1073/pnas.0903620106&format=json&resultType=core> → Confirmed: Ophir E, Nass C, Wagner AD (2009) Cognitive control in media multitaskers. PNAS
  - Abstract original text: "heavy media multitaskers are more susceptible to interference from irrelevant environmental stimuli and from irrelevant representations in memory ... heavy media multitaskers performed worse on a test of task-switching ability"
  - Note: This DOI has not been directly opened by doi.org and is confirmed by Europe PMC registration.
- Also check <https://api.crossref.org/works/10.1037/0096-1523.27.4.763> to confirm that Rubinstein, Meyer & Evans (2001) exists, but the abstract cannot be obtained and it was not cited in the entry.

## Entry 8

- <https://doi.org/10.1073/pnas.1418490112> → 302 to pnas.org, DOI exists; pnas.org 403
- Europe PMC Search confirmation: Chang AM, Aeschbach D, Duffy JF, Czeisler CA (2015) Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness. PNAS; PMCID PMC4313820
- <https://pmc.ncbi.nlm.nih.gov/articles/PMC4313820/> → Full text opened successfully
  - Original text: "took longer to fall asleep ... 25.65 ± 18.78 min vs. 15.75 ± 13.09 min"; "suppressed evening levels of melatonin by 55.12 ± 20.12%"; "Dim light melatonin onset was >1.5 h later on the day following the LE-eBook condition (22:31 ± 0:42) than in the print-book condition (21:01 ± 0:49)"; "feeling sleepier the morning after reading an LE-eBook ... it took them hours longer to fully wake up"
  - "Maximum brightness, continuous reading for several hours" in the notes is my memory of the experimental settings. I have not verified them verbatim and have been deleted from the entry notes.

## Entry 9

- <https://doi.org/10.1093/sleep/29.6.831> → 302, then <https://academic.oup.com/sleep/article-lookup/doi/10.1093/sleep/29.6.831> is opened successfully
  - Confirmed: Brooks A, Lack L (2006) A Brief Afternoon Nap Following Nocturnal Sleep Restriction: Which Nap Duration is Most Recuperative? Sleep 29(6):831-840
  - Original abstract: "The 5-minute nap produced few benefits in comparison with the no-nap control.";

## Entry 10

- <https://doi.org/10.1016/j.jenvp.2011.07.002> → 302 to linkinghub.elsevier.com, DOI exists; sciencedirect 403; PubMed not available (non-MEDLINE journal)
- <https://api.crossref.org/works/10.1016/j.jenvp.2011.07.002> → Confirmed: Jahncke H, Hygge S, Halin N, Green AM, Dimberg K (2011) Open-plan office noise: Cognitive performance and restoration. J Environ Psychol 31(4):373-382
- <http://hig.diva-portal.org/smash/record.jsf?pid=diva2%3A434794&dswid=2269> (official institutional repository record of the University of Gävle) → Opened successfully, title/author/journal/DOI consistent
  - Abstract original text: "The background sound level increased by 12 dB, from 39 to 51 dB LAeq."; "Decreased word memory performance, increased fatigue and motivational deficits when the background sound level increased."; "A break with a nature movie with corresponding sound increased energy ratings compared to just listening to river sounds or office noise."
  - N = 47, 2 hours at a time: Summary excerpt returned from WebSearch, not seen verbatim on the diva page, removed from the entry

## Entry 11

- <https://doi.org/10.1111/ecoj.12166> → 302 to academic.oup.com/ej/article/125/589/2052-2076/5078088, DOI exists; OUP page only displays navigation
- <https://api.crossref.org/works/10.1111/ecoj.12166> → Confirmed: Pencavel J (2015) The Productivity of Working Hours. The Economic Journal 125(589):2052-2076
- <https://api.semanticscholar.org/graph/v1/paper/DOI:10.1111/ecoj.12166> → Abstract original text: "below an hours threshold, output is proportional to hours; above a threshold, output rises at a decreasing rate as hours increase."
- <https://docs.iza.org/dp8129.pdf> (IZA DP No. 8129, working paper version of the same paper, official institutional site; local pdftotext extraction)
  - Original text: "below 49 weekly hours, variations in output are proportional to variations in hours; for those observations corresponding to 49 or more hours, output rises with hours at a decreasing rate and a maximum of output occurs at about 63 hours. Output at 70 hours differs little from output at 56 hours"; Conclusion: "The working week threshold for the munition workers considered in this paper was at 48 hours, but for other workers it may be more or less."
  - Note: 49 hours are used as nodes in the text analysis, and 48 hours are used in the conclusion paragraph; 49 hours are used as entries. The working paper version was used for digital verification, and the official version of the journal could not be opened.

## Entry 12

- <https://doi.org/10.1111/j.1745-6924.2008.00088.x> → 302 to journals.sagepub.com, DOI exists; SAGE page 403
- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1111/j.1745-6924.2008.00088.x&format=json&resultType=core> → Confirmed: Nolen-Hoeksema S, Wisco BE, Lyubomirsky S (2008) Rethinking Rumination. Perspect Psychol Sci
  - Abstract original text: "rumination exacerbates depression, enhances negative thinking, impairs problem solving, interferes with instrumental behavior, and erodes social support"; also "anxiety, binge eating, binge drinking, and self-harm"

## Entry 13

- <https://api.crossref.org/works/10.1037/0022-3514.46.5.1097> → Confirmed: Rook KS (1984) The negative side of social interaction: Impact on psychological well-being. J Pers Soc Psychol 46(5):1097-1108
- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22The%20negative%20side%20of%20social%20interaction%22%20AND%20AUTH:Rook&format=json&resultType=core> → PMID 6737206，DOI 10.1037//0022-3514.46.5.1097
  - Abstract original text: "negative social outcomes were more consistently and more strongly related to well-being than were positive social outcomes"; sample 120 widowed women aged 60-89
- Note: <https://doi.org/10.1037/0022-3514.46.5.1097> itself is not directly clicked (similar APA old DOIs all jump to psycnet 403), but the DOI is registered in two independent libraries, Crossref and Europe PMC.

## Entry 14

- <https://api.crossref.org/works/10.1037/0022-3514.74.5.1252> → Confirmed: Baumeister RF, Bratslavsky E, Muraven M, Tice DM (1998) Ego depletion: Is the active self a limited resource? J Pers Soc Psychol 74:1252-1265
- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22Ego%20depletion%3A%20is%20the%20active%20self%20a%20limited%20resource%22&format=json&resultType=core> → PMID 9599441, abstract original text: "Choice, active response, self-regulation, and other volition may all draw on a common inner resource."
- <https://doi.org/10.1177/1745691616652873> → 302 to SAGE, DOI exists; SAGE 403
- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1177/1745691616652873&format=json&resultType=core> → Confirmed: Hagger MS, Chatzisarantis NLD, Alberts H, et al. (2016) A Multilab Preregistered Replication of the Ego-Depletion Effect. Perspect Psychol Sci
  - Abstract original text: 23 laboratories, 2141 people; "the size of the ego-depletion effect was small with 95% confidence intervals (CIs) that encompassed zero (d = 0.04, 95% CI [-0.07, 0.15]"
- <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1177/0956797621989733&format=json&resultType=core> → Confirmed: Vohs KD, Schmeichel BJ, Lohmann S, et al. (2021) A Multisite Preregistered Paradigmatic Test of the Ego-Depletion Effect. Psychol Sci
  - Abstract original text: "preregistered multilaboratory project (k = 36; N = 3,531) ... Confirmatory tests found a nonsignificant result (d = 0.06)"
  - Note: This DOI has not been directly opened by doi.org and is confirmed by Europe PMC registration.

## Summary of unconfirmed items

- Entry 1 The original manuscript once wrote "desk/pocket/another room" and "working memory and fluid intelligence". Since it could not be verified verbatim in the original text that can be opened, it has been deleted from the entry. Only the expressions supported by the original abstract are retained.
- Item 6 notes in the original manuscript "About half of the interruptions are initiated by oneself", Item 8 notes "Maximum brightness, continuous hours", and Item 10 "N = 47, working for 2 hours" are also deleted because they have not been verified verbatim.
- All figures in the 14 "Income" columns in the current version have the original sources listed above; no entries need to be marked TODO / pending verification
