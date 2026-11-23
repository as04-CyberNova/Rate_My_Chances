# Database Architecture & Data Modeling (DATABASE.md)
## Rate My Chances — Data Model Specification

---

### 1. Database Technology & Rationale
- **Technology**: PostgreSQL (managed via Supabase, Neon, or local Docker) + Prisma ORM.
- **Rationale**: Relational integrity for user profiles, foreign keys linking assessments to target companies, JSONB flexibility for deeply nested AI assessment summaries, roadmaps, and benchmarks while maintaining relational speed and searchability.
- **Local/MVP Fallback**: In-memory / SQLite fallback support for local testing without requiring external credentials immediately.

---

### 2. Entity-Relationship Model (ERD)

```
[ User ] (Optional Auth)
   │ 1
   │
   └──< [ Assessment ]
           │ 1
           ├──< [ AssessmentSkill ]
           ├──< [ RoadmapStep ]
           └──< [ AlternateMatch ]
```

---

### 3. Prisma Schema Definition (`schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String       @id @default(uuid())
  email         String?      @unique
  name          String?
  avatarUrl     String?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  assessments   Assessment[]
}

model Assessment {
  id                 String           @id @default(uuid())
  userId             String?
  user               User?            @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Target Specification
  targetCompany      String           // e.g. "Google", "Microsoft"
  targetRole         String           // e.g. "Software Engineer", "Full Stack Developer"
  yearsExperience    Float            // e.g. 2.5
  
  // Input References
  resumeTextHash     String?          // SHA256 of text to prevent redundant processing
  linkedinUrl        String?
  githubUrl          String?
  
  // Computed Intelligence Scores
  chanceScore        Int              // 0 - 100
  confidenceLevel    String           // "High", "Medium", "Low"
  interviewReadiness Int              // 0 - 100
  recommendedPrepWeeks Int            // e.g. 5
  
  // Compensation Projections
  currentSalaryEst   String?          // e.g. "₹8 LPA" or "$85k"
  potentialMinSalary String?          // e.g. "₹18 LPA"
  potentialMaxSalary String?          // e.g. "₹22 LPA"
  
  // Recruiter Feedback (Structured JSON)
  recruiterSummary   String           @db.Text
  resumeQualityScore Int              // 0 - 100
  technicalDepthScore Int             // 0 - 100
  hiringRisks        String[]
  
  // Benchmark Breakdown (Candidate vs Industry)
  benchmarkData      Json             // { projects: { you: 82, avg: 90 }, dsa: { you: 75, avg: 95 }, ... }
  
  // Roast Mode Feedback
  roastFeedback      String?          @db.Text
  
  // Relational Collections
  skills             AssessmentSkill[]
  roadmapSteps       RoadmapStep[]
  alternateMatches   AlternateMatch[]
  
  createdAt          DateTime         @default(now())
  
  @@index([targetCompany, targetRole])
  @@index([userId])
}

model AssessmentSkill {
  id           String     @id @default(uuid())
  assessmentId String
  assessment   Assessment @relation(fields: [assessmentId], references: [id], onDelete: Cascade)
  
  name         String     // e.g. "React", "System Design"
  category     String     // "STRONG", "NEEDS_IMPROVEMENT", "CRITICAL_MISSING"
  description  String?
}

model RoadmapStep {
  id           String     @id @default(uuid())
  assessmentId String
  assessment   Assessment @relation(fields: [assessmentId], references: [id], onDelete: Cascade)
  
  stepNumber   Int        // 1, 2, 3...
  title        String     // e.g. "Learn System Design"
  description  String     @db.Text
  timeEstimate String     // e.g. "2 Weeks"
  impactGain   String     // e.g. "+8% Chance"
  completed    Boolean    @default(false)
}

model AlternateMatch {
  id           String     @id @default(uuid())
  assessmentId String
  assessment   Assessment @relation(fields: [assessmentId], references: [id], onDelete: Cascade)
  
  companyName  String     // e.g. "Microsoft"
  roleTitle    String     // e.g. "SWE"
  probability  Int        // e.g. 81
  matchReason  String?
}
```

---

### 4. Data Privacy & Retention Policies
- **Resume Text**: Raw parsed resume text is processed in-memory during inference; only extracted structured competencies and cryptographic hashes are persisted.
- **Anonymized Export**: Public shareable scorecard views redact any personal contact info, names, or private links.
- **User-Initiated Purge**: Users can delete their assessment records and all associated data at any time.
