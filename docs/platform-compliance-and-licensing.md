[← Back to Table of Contents](../README.md)

# Regulatory Licenses for Online Platforms: Reference Tables and Server Hosting Decision Matrix

This reference document serves as the extended operational guide for Section 26 ("Building a Compliant Platform"). This document provides three reference tables and practical explanations of the most common licensing pitfalls. For company registration and tax filings, see Section 12 ("Starting and Running a Business"). For legal boundaries and criminal red lines for developers and systems engineers, see Section 11 ("Legal Boundaries for Developers").

---

## 1. Classifying Your Platform's Business Category

An online platform often spans multiple business models simultaneously. If your site engages in multiple categories, you must obtain every applicable permit and filing; holding one does not exempt you from the others.

| What Your Site Does | Regulatory Category | Required License or Filing | Primary Statutory Basis |
|---|---|---|---|
| Free informational sites, personal blogs, corporate brand pages | Non-commercial internet information services | **ICP Recordal (ICP Filing)**. This is not an operating permit, but a mandatory pre-launch registration with authorities. | *Administrative Measures on Internet Information Services*, Article 4 |
| Paid user subscriptions, value-added features, paywalled content | Commercial internet information services | **Value-Added Telecommunications Business Operating License (Information Services / ICP License)**. Governs collecting revenue directly from end-users. | *Administrative Measures on Internet Information Services*, Articles 3, 4, 7 |
| Marketplace platforms connecting third-party buyers and sellers, processing transactions | Online data processing and transaction processing services | **Value-Added Telecom License (Category B21 / EDI License)**. Governs processing commercial transactions between third parties. | *Telecommunications Business Classification Catalog (2015 Edition)*, Category B21 |
| Livestreams featuring on-camera hosts or gaming streamers | Online cultural performance activities | **Network Cultural Business Operating Permit** (scope including "online performances"). Without this, you cannot host live streamers. | *Administrative Measures for Online Performance Operating Activities*, Article 4 |
| In-house video streaming, aggregated third-party video, or user-uploaded video sharing | Internet audio-visual program services | **License for Disseminating Audio-Visual Programs via Information Networks**. Governs streaming online video programs. | *Provisions on the Administration of Internet Audio-Visual Program Services*, Articles 7, 8 |
| E-commerce live streaming ("live shopping") | Live-stream marketing services | Obtain the base licenses above, plus enforce merchant identity verification and archive transaction logs. | *Administrative Measures for Online Live-Streaming Marketing (Trial)*, Article 8 |
| Publishing original journalism, news curation, or current affairs | Internet news information services | **Internet News Information Service License**. Without this permit, you cannot publish or syndicate news. | *Provisions on the Administration of Internet Live-Streaming Services*, Article 5 |
| Colocating physical hardware racks, selling server hosting or bandwidth | Internet data center (IDC) and internet access services (ISP) | **Value-Added Telecom License (Categories B11 / B14)**. Governs leasing server infrastructure and network transit. | *Telecommunications Business Classification Catalog (2015 Edition)*, Categories B11, B14 |

### Inter-Agency Clarification on Live Streaming
A joint 2021 regulatory opinion from seven national ministries clearly defines the licensing boundaries for live streaming platforms:
- Platforms operating commercial cultural performances must hold a **Network Cultural Business Operating Permit** and complete **ICP Recordal**.
- Platforms streaming online audio-visual programming must hold a **License for Disseminating Audio-Visual Programs** (or complete registration in the National Audio-Visual Platform Registry) and complete **ICP Recordal**.
- Platforms streaming news information must hold an **Internet News Information Service License**.

---

### Three Common Licensing Pitfalls

#### 1. Individuals Cannot Obtain Value-Added Telecommunications Licenses
The very first statutory eligibility criterion for commercial telecom licenses is: *"The applicant must be a legally established company."* You cannot apply as an individual with a national ID card. 
- Intra-provincial operations require a company with a minimum registered capital of **1,000,000 RMB**.
- Cross-provincial operations require a minimum registered capital of **10,000,000 RMB**.
- Official review periods take up to 60 days following submission; licenses are valid for 5 years.
- If you intend to launch a fee-charging online service, establishing an incorporated entity is an unavoidable prerequisite (see Section 12).

#### 2. Private Enterprises Virtually Cannot Obtain Audio-Visual Program Licenses
Statutory qualification requirements explicitly state that applicants must *"be an entity with legal person status that is state-wholly-owned or state-majority-controlled."* The state reserves this license exclusively for state-capitalized entities. Individual entrepreneurs and private startups building video platforms cannot legally obtain this license. For live streaming, the attainable statutory permit is the Network Cultural Business Operating Permit.

#### 3. No Statute Explicitly States "All E-Commerce Platforms Must Hold an EDI License"
The term "EDI License" corresponds to Category B21 (Online Data Processing and Transaction Processing Services) in the table above. The Ministry of Industry and Information Technology (MIIT) operational guidelines state generally that companies must *"apply for corresponding telecom licenses based on business definition."* 

In official written advisory opinions, MIIT has clarified that online ride-hailing platforms and certain bulk equity/commodity trading portals require only standard ICP Recordal, not B21 EDI permits. Before paying intermediary agencies thousands of dollars to process an EDI license, contact your provincial Communications Administration Bureau to confirm whether your specific transaction flow requires a B21 permit.

---

## 2. Daily Regulatory Compliance Obligations

Securing your operating license merely grants permission to open. Below are the mandatory operational compliance duties that must be executed continuously:

| Statutory Duty | Measurable Compliance Requirement | Statutory Source |
|---|---|---|
| Audit and register platform merchants | Re-verify and update merchant registration credentials at least once every 6 months | *Measures for the Supervision and Administration of Online Transactions*, Article 24 |
| Submit merchant identity profiles | File updated merchant registries with market regulation authorities every January and July | *Measures for the Supervision and Administration of Online Transactions*, Article 25 |
| Report tax-related platform transaction data | Submit merchant tax data to tax authorities within the month following each calendar quarter | *Provisions on the Reporting of Tax-Related Information by Internet Platform Enterprises*, Article 4 |
| Archive transaction data | Retain complete transaction records for at least 3 years from the date of completion | *E-Commerce Law*, Article 31 |
| Retain livestream video content and logs | Retain all streaming footage and user interaction logs for at least 60 days | *Provisions on the Administration of Internet Live-Streaming Services*, Article 16 |
| Retain online cultural performance recordings | Retain complete audiovisual recordings for at least 60 days | *Administrative Measures for Online Performance Operating Activities*, Article 13 |
| Retain server and user network logs | Retain network access, login, and audit logs for at least 6 months | *Cybersecurity Law*, Article 23(3) *(renumbered in 2026 revision)* |
| Process intellectual property infringement notices | Forward counter-notices to complainants; if no lawsuit or complaint is filed within 15 days, restore content | *E-Commerce Law*, Article 43 |
| Prominently display grievance reporting portals | Maintain a visible, accessible portal for reporting unlawful content | *Provisions on the Governance of Network Information Content Ecosystem*, Article 16 |

> [!IMPORTANT]
> **Data Retention Architecture:** Platforms face four separate statutory retention windows: 3 years for financial transactions, 60 days for livestream video recordings, 6 months for server network logs, and 3 years for merchant identity records calculated from the date they depart your platform. When designing database storage and backup lifecycle policies, architect for the longest statutory window.

---

## 3. Server Hosting: How to Choose Across Three Tiers

Answer these four architectural questions before comparing hosting prices:

| Evaluation Question | If the Answer Is | Recommended Action |
|---|---|---|
| Can your platform tolerate a full 24 hours of unexpected downtime? | Yes | An entry-level virtual private server (VPS) is sufficient. |
| Does your service manage user logins, transactions, or uploads? | Yes | Deploy on mainstream cloud providers (Alibaba Cloud, Tencent Cloud, AWS). Choose instances with snapshot backups and autoscaling. |
| Do you have a dedicated full-time DevOps/infrastructure engineer? | No | Never colocate physical server hardware in a datacenter. |
| Are transit bandwidth and raw compute your single largest expense? | Yes, AND you have in-house infrastructure engineers | Only then consider leasing dedicated colocation racks in a datacenter. |

### Vetting Budget Hosting Providers
Colocating hardware and providing internet transit are themselves regulated telecom activities requiring B11/B14 licenses. Before contracting with budget hosting providers:
1. Search their full corporate legal name on the MIIT Integrated Telecommunications Market Management System (`tsm.miit.gov.cn`).
2. If they do not hold an active telecom license, eliminate them immediately.
3. Unlicensed budget providers carry three structural risks: overselling server resources, sudden business collapse, and upstream IP range blacklisting. If a licensed provider fails, you have administrative recourse through the provincial Communications Bureau; with an uncertified provider, you have zero recourse.

### Domestic vs. Overseas Hosting
Hosting servers domestically requires mandatory ICP Recordal; domestic internet service providers are legally barred from routing traffic to unfiled domains. 

Hosting servers overseas bypasses the domestic ICP filing process. However, if your target users and commercial transactions reside domestically, every regulatory platform obligation in Section 26, Rules 5–10 still applies. Furthermore, hosting overseas triggers cross-border data transfer regulations under Article 38 of the *Personal Information Protection Law* (PIPL):
- Transferring domestic user personal information to overseas servers legally constitutes cross-border data transmission.
- You must obtain explicit, separate informed consent from each user—it cannot be buried in a generic terms-of-service bundle.
- Cumulative thresholds apply (calculated annually from January 1): fewer than 100,000 individuals requires basic consent; 100,000 to 1,000,000 individuals requires executing CAC standard contracts or obtaining personal data protection certification; over 1,000,000 individuals requires undergoing a mandatory national security assessment.

### Backup Redundancy
Maintain off-site backups across at least two geographically separated locations, and never store both copies within the same availability zone or provider. This is an engineering best practice rather than a statutory mandate.

---

## 4. Statutory Scope and Regulatory Boundaries

- All statutory provisions cited in this guide reference the primary sources documented in Section 26 of this repository, including official document numbers, article numbers, and government gazette links.
- Internet regulatory statutes evolve rapidly. This reference was verified against current laws as of September 2026. Note that statutory article numbers in the *Cybersecurity Law* were reordered effective January 1, 2026, and minor tipping policies for live streaming were updated in April 2026.
- For open questions and unresolved ambiguities—such as the exact statutory boundaries of EDI licensing for pure marketplaces, and judicial interpretations treating unlicensed broadcasting under illegal business operation statutes—refer to the repository's verification records.
