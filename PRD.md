# Product Requirements Document (PRD)
## Rate My Chances — AI-Powered Career Intelligence Platform

---

### 1. Product Overview & Problem Statement

#### 1.1 Executive Summary
**Rate My Chances** is an AI-powered career intelligence and assessment platform that calculates a candidate's probabilistic likelihood of getting selected for a target role at a target company (e.g., *Google - Software Engineer*, *Microsoft - Cloud Solution Architect*). 

Instead of passive resume reviews or generic career blogs, Rate My Chances delivers actionable, data-backed insights:
- **Chance Score (%)** with predictive confidence intervals.
- **Skill Gap & Technical Depth Breakdown** (Strong Areas vs. Gaps vs. Critical Risks).
- **Recruiter Simulation & Hiring Risk Analysis** (an AI evaluator acting as Senior Hiring Managers / Bar Raisers).
- **Industry & Peer Benchmarking** (Candidate profile vs. Average Hire).
- **Personalized Actionable Roadmap** (Step-by-step milestones to raise selection probability).
- **Viral Engagement Features**: "Roast Mode" (brutally candid profile critique), "Salary Predictor" (current vs. potential target compensation), and "Interview Readiness Score".

#### 1.2 The Problem
Millions of candidates across software engineering, product, and tech roles ask:
1. *"Can I realistically get into Google/Amazon/Microsoft right now?"*
2. *"Why are my applications getting rejected or ghosted despite 50+ submissions?"*
3. *"What exact skills or architectural experiences am I missing for Mid/Senior roles?"*
4. *"Where do my profile strengths give me the highest immediate hiring odds?"*

Existing platforms provide either superficial ATS keyword checklists, static templates, or expensive coaching without quantifiable data.

#### 1.3 Value Proposition
- **Objective Probability Modeling**: Real-time evaluation against real company hiring bars.
- **Pinpoint Remediation**: Direct answers to "what to learn next" with time-to-readiness estimates.
- **Alternative Target Matching**: Identifies high-probability alternate employers (e.g., "68% at Google, but 89% at Razorpay and 84% at Atlassian").
- **Viral Hooks**: High-shareability features ("Roast My Resume", "Salary Potential") to drive organic viral loops.

---

### 2. Target Users & Personas

1. **The Ambitious Job Seeker (0–3 Years Exp - Junior/Associate)**
   - *Goal*: Break into FAANG / Tier-1 tech or top unicorns.
   - *Pain Point*: Has personal projects and leetcode practice, but doesn't know if their resume meets the bar.
2. **The Career Pivot / Lateral Switcher (3–7 Years Exp - Mid-Level)**
   - *Goal*: Transition from service-based/IT consulting to product-based engineering.
   - *Pain Point*: Lacks clear benchmark of system design, scalable architecture, and ownership expectations.
3. **The High-Velocity Applicant**
   - *Goal*: Maximize interview callback rates across multiple job applications with tailored adjustments.

---

### 3. Core User Journeys

#### Journey A: Quick Career Assessment (Core MVP)
1. **Landing & Input**: User enters target company (e.g., Google), target role (e.g., Software Engineer), years of experience, and uploads resume (PDF) or inputs LinkedIn/GitHub URL.
2. **AI Analysis Engine**: The platform parses the resume, extracts experiences, skills, projects, and benchmarks them against the role's verified rubric.
3. **Assessment Dashboard**:
   - Primary metric: **Chance Score (e.g., 68%) & Confidence Level**.
   - Skill Gap Cards (Strengths, Gaps, Missing keywords).
   - Candidate vs. Hire Benchmark radar/bar comparison.
   - Top alternative matching companies.
   - 4-Week / 8-Week Personalized Action Roadmap.
4. **Roast / Bonus Tabs**: User switches between "Constructive Recruiter View" and "Viral Roast Mode" with one click.
5. **Export / Save**: User saves report or shares a sanitized scorecard to LinkedIn/X.

---

### 4. Functional Requirements

#### 4.1 Profile Ingestion & Parsing
- **Resume Parsing**: Support PDF format up to 10MB. Robust text extraction with fallback OCR.
- **Structured Extraction**: Extract Name, Contact, Work History, Education, Skills, Projects, Metrics/Achievements, GitHub/Portfolio links.
- **Manual Overrides**: Allow candidate to adjust experience years or add extra context prior to running evaluation.

#### 4.2 Scoring & Intelligence Engine
- **Chance Score Engine**: Weighted multi-factor evaluation algorithm:
  - Technical Skill Fit (30%)
  - Experience Relevance & Scale/Scope (25%)
  - Project Complexity & Proof-of-Work (20%)
  - Education / Pedigree / Track Record (10%)
  - Target Company Hiring Bar Strictness Index (15%)
- **Recruiter Simulation**: Generate natural language critique structured by:
  - Resume Quality & Formatting Score
  - Project Depth & Scalability Analysis
  - Hiring Risks & Red Flags
- **Company Benchmarking**:
  - Compare candidate metrics against standard benchmarks for Tier 1 (FAANG/MAMAA), Tier 2 (High-growth product unicorns), and Tier 3 companies.
- **Alternative Opportunity Engine**:
  - Re-score candidate against peer companies in similar domains (e.g., Microsoft, Uber, Razorpay, Atlassian, Stripe).

#### 4.3 Viral & Engagement Modules
- **Roast Mode**: Toggleable mode providing witty, brutally candid critique of buzzwords, repetitive projects, and resume formatting sins.
- **Salary Predictor**: Estimates current estimated compensation vs. market benchmark band for target role at target company.
- **Interview Readiness Index**: 0–100% readiness gauge with recommended prep timeline (e.g., "5 Weeks").

---

### 5. Non-Functional Requirements

- **Performance**: Resume upload and initial analysis completed in `< 12 seconds`.
- **Accuracy & Faithfulness**: Grounded AI outputs without hallucinating non-existent qualifications.
- **Responsiveness**: Flawless experience on Mobile (375px+), Tablet, and Desktop (1440px+).
- **Privacy & Security**: Resumes encrypted at rest, strict tenant isolation, no PII leak in public shares, option to delete uploaded data immediately.
- **Accessibility**: WCAG 2.1 AA compliant, screen-reader friendly data charts, keyboard accessible navigation.

---

### 6. MVP Scope vs. Future Phases

| Feature | Phase 1 (MVP) | Phase 2 (Fast Follow) | Phase 3 (Scale) |
|---|---|---|---|
| Resume Upload (PDF) | ✅ Included | ✅ Enhanced OCR | ✅ Batch resumes |
| Target Role & Company Selector | ✅ Curated 50+ Top Tech | ✅ Custom Any Company | ✅ Real-time Job URL scrape |
| Chance Score & Skill Gap | ✅ Included | ✅ Sub-skill drilldown | ✅ Skill quiz verification |
| Recruiter Simulation | ✅ Included | ✅ Multi-persona recruiter | ✅ Voice AI mock interview |
| Benchmark Comparison | ✅ Included | ✅ Live candidate pool data | ✅ Peer anonymized ranking |
| Roast Mode & Salary Predictor | ✅ Included | ✅ Shareable viral graphic card | ✅ Salary negotiation script |
| Auth & History | ✅ Optional Guest + Clerk/Auth | ✅ Saved Career Reports | ✅ Application Tracker Kanban |

---

### 7. Measurable Success Criteria
- **User Activation**: >75% of users who drop a resume complete the analysis view.
- **Engagement**: >40% toggle on "Roast Mode" or share scorecard.
- **Actionability**: >50% expand at least one milestone in the Personalized Roadmap.
