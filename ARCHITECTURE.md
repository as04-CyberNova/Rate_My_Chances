# System Architecture (ARCHITECTURE.md)
## Rate My Chances — Technical Architecture

---

### 1. Technology Stack & Rationale

| Layer | Technology | Rationale |
|---|---|---|
| **Framework / Runtime** | **Next.js 14+ (App Router)** | Full-stack unified architecture, server-rendered landing with ultra-fast initial load, edge-ready API routes, native TypeScript. |
| **Language** | **TypeScript (Strict Mode)** | End-to-end type safety across domain models, analysis schemas, and UI components. |
| **Styling & UI** | **Tailwind CSS + Shadcn/UI + Lucide Icons** | High-velocity custom UI without bundle bloat, full accessibility out of the box, rapid responsive design. |
| **State Management** | **Zustand + TanStack Query** | Lightweight client assessment state combined with cached server-state fetching and mutations. |
| **Document Processing** | **pdf-parse / unpdf / native buffer parser** | Fast server-side text extraction from uploaded PDF resumes without external third-party file leaks. |
| **AI / LLM Layer** | **Vercel AI SDK (with Gemini 1.5/2.0 Flash / Pro fallback & OpenAI compatibility)** | Structured outputs via Zod schema enforcement (`generateObject`), robust retry handling, and low-latency streaming responses. |
| **Database & ORM** | **PostgreSQL + Prisma ORM (or Drizzle)** | Strongly typed schema for assessment results, user bookmarks, company rubrics, and anonymized hiring benchmarks. |
| **Authentication** | **Auth.js (NextAuth) or Clerk** | Passwordless email magic links, Google OAuth, and friction-free guest mode (anonymous session tokens). |
| **Deployment** | **Vercel / Docker Container** | Zero-config continuous deployment with environment variable isolation. |

---

### 2. High-Level System Architecture

```
[ Client Browser ]
        │  (Next.js App Router: React Server & Client Components)
        ▼
[ Next.js API Routes / Server Actions ]
   ├── /api/resume/upload (Multipart PDF ingestion & text extraction)
   ├── /api/analyze (AI Orchestration Engine with Vercel AI SDK)
   ├── /api/benchmarks (Query verified company hiring bars)
   └── /api/roast (Specialized witty roasting sub-prompt)
        │
   ┌────┴──────────────────────────────┐
   ▼                                   ▼
[ AI Engine (Gemini / OpenAI) ]     [ PostgreSQL Database ]
   - Structured JSON via Zod           - User Profiles & Sessions
   - Recruiter Simulation              - Company Rubrics & Criteria
   - Skill Match Matrix                - Saved Analysis Reports
   - Personalized Roadmap              - Anonymous Benchmark Data
```

---

### 3. Folder & Module Structure

```
rate-my-chances/
├── prisma/
│   └── schema.prisma             # PostgreSQL schema definition
├── public/                       # Favicons, sample resumes, static assets
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (auth)/               # Login / Register routes
│   │   ├── (dashboard)/          # User history & saved reports
│   │   ├── api/                  # Backend REST API endpoints
│   │   │   ├── analyze/route.ts  # Core intelligence engine
│   │   │   ├── parse/route.ts    # PDF parser endpoint
│   │   │   └── roast/route.ts    # Roast mode engine
│   │   ├── globals.css           # Tailwind + CSS variables
│   │   ├── layout.tsx            # Root layout & providers
│   │   └── page.tsx              # Main interactive analyzer page
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Shadcn base primitives
│   │   ├── assessment/           # Score gauge, skill gap, benchmark charts
│   │   ├── roadmap/              # Personalized milestone timeline
│   │   ├── roast/                # Roast card & flame animations
│   │   ├── upload/               # PDF dropzone & manual input form
│   │   └── shared/               # Header, Footer, Theme toggle
│   ├── lib/                      # Core backend utilities
│   │   ├── ai/                   # Prompts, schemas, LLM client
│   │   ├── parser/               # PDF text extractor
│   │   ├── benchmarks/           # Company baseline datasets
│   │   ├── db.ts                 # Prisma/Postgres connection singleton
│   │   └── utils.ts              # Formatting & helper routines
│   ├── store/                    # Zustand store for active analysis session
│   └── types/                    # Shared TypeScript interfaces & Zod schemas
├── .env.example
├── ARCHITECTURE.md
├── DESIGN.md
├── PRD.md
├── package.json
└── tsconfig.json
```

---

### 4. Data Flow & AI Analysis Pipeline

1. **Step 1: Document Parsing**: User uploads PDF resume. Server parses raw text, sanitizing malicious characters and trimming whitespace.
2. **Step 2: Profile Normalization**: Extract candidate attributes: Total YOE, Primary Domain (Frontend, Backend, DevOps, etc.), Tech Stack, Notable Projects, Education.
3. **Step 3: Company Rubric Fetching**: Load target company tier requirements (e.g., Google SWE vs. Startup Fullstack).
4. **Step 4: AI Analysis with Structured Output**:
   - Call LLM with strict Zod schema `AssessmentResultSchema`.
   - Compute `chanceScore` (0-100), `confidence` ("High" | "Medium" | "Low").
   - Extract `skillGaps` (strong, improvementNeeded, criticalMissing).
   - Generate `recruiterCritique` (resumeQuality, technicalDepth, projectScalability, hiringRisks).
   - Generate `benchmarks` (Projects, DSA, System Design, Open Source).
   - Generate `alternateOpportunities` (3-5 alternative matching companies with probabilities).
   - Generate `roadmap` (step-by-step milestones with expected probability bump).
5. **Step 5: Client Hydration**: Client updates Zustand store and animates the dashboard widgets synchronously.
