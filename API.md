# API Specification (API.md)
## Rate My Chances — REST & Server Actions API

---

### 1. Base URL & Protocol
- **Base Route**: `/api`
- **Content-Type**: `application/json` (except `/api/parse` which accepts `multipart/form-data`)
- **Error Format**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Detailed human-readable error description"
  }
}
```

---

### 2. Endpoints

#### 2.1 Resume Parsing Endpoint
- **Route**: `POST /api/parse`
- **Request**: `multipart/form-data` with field `file` (PDF, max 10MB).
- **Response**:
```json
{
  "success": true,
  "data": {
    "text": "Extracted text content from resume...",
    "charCount": 3420,
    "suggestedName": "Alex Chen",
    "suggestedRole": "Software Engineer",
    "estimatedExperienceYears": 2.5,
    "detectedSkills": ["React", "TypeScript", "Node.js", "Docker"]
  }
}
```

#### 2.2 Core Assessment Analysis Endpoint
- **Route**: `POST /api/analyze`
- **Request Payload**:
```json
{
  "targetCompany": "Google",
  "targetRole": "Software Engineer",
  "yearsExperience": 2,
  "resumeText": "Alex Chen ... 2 years building React and Node.js microservices ...",
  "githubUrl": "https://github.com/alexchen",
  "linkedinUrl": "https://linkedin.com/in/alexchen"
}
```
- **Response Payload**:
```json
{
  "success": true,
  "data": {
    "id": "asmt_12345678",
    "targetCompany": "Google",
    "targetRole": "Software Engineer",
    "chanceScore": 68,
    "confidenceLevel": "Medium",
    "interviewReadiness": 73,
    "recommendedPrepWeeks": 5,
    "salary": {
      "currentEstimated": "₹8 LPA",
      "potentialMin": "₹18 LPA",
      "potentialMax": "₹22 LPA"
    },
    "skills": {
      "strong": ["React", "Node.js", "Data Structures"],
      "needsImprovement": ["System Design", "Cloud Computing", "Open Source Contributions"]
    },
    "recruiterEvaluation": {
      "resumeQuality": 80,
      "technicalDepth": 65,
      "summary": "Your projects demonstrate strong frontend skills, but lack evidence of scalable systems and cloud deployment experience.",
      "hiringRisks": [
        "No documented experience with distributed systems handling high QPS.",
        "Limited production telemetry and automated testing pipeline presence."
      ]
    },
    "benchmarks": [
      { "category": "Projects", "you": 82, "avg": 90 },
      { "category": "DSA", "you": 75, "avg": 95 },
      { "category": "System Design", "you": 40, "avg": 88 },
      { "category": "Open Source", "you": 60, "avg": 72 }
    ],
    "alternateOpportunities": [
      { "company": "Microsoft", "role": "SWE", "probability": 81 },
      { "company": "Atlassian", "role": "SWE", "probability": 84 },
      { "company": "Razorpay", "role": "Backend Engineer", "probability": 89 }
    ],
    "roadmap": [
      {
        "step": 1,
        "title": "Learn System Design",
        "description": "Master microservices, rate limiters, caching layers (Redis), and database sharding.",
        "timeEstimate": "2 Weeks",
        "impactGain": "+12% Chance"
      },
      {
        "step": 2,
        "title": "Complete 100 Medium DSA Problems",
        "description": "Focus on Graphs, Dynamic Programming, and Heaps on LeetCode.",
        "timeEstimate": "3 Weeks",
        "impactGain": "+8% Chance"
      },
      {
        "step": 3,
        "title": "Build a Cloud-Native Project",
        "description": "Deploy a distributed application to AWS/GCP with Docker and Kubernetes.",
        "timeEstimate": "2 Weeks",
        "impactGain": "+7% Chance"
      }
    ],
    "roast": {
      "headline": "Full-Stack or Just Full of React?",
      "content": "You have 8 React projects, but they all solve essentially the same to-do list problem in different CSS frameworks. Recruiters at Google won't be fooled by 3 slightly different weather apps."
    }
  }
}
```

#### 2.3 Roast Mode Trigger Endpoint
- **Route**: `POST /api/roast`
- **Request**: `{ "resumeText": "...", "targetCompany": "Google", "targetRole": "Software Engineer" }`
- **Response**:
```json
{
  "success": true,
  "data": {
    "roastTitle": "Bar Raiser's Brutal Breakdown",
    "burns": [
      "You put 'Proficient in Python' because you wrote 4 lines of pandas once.",
      "Your 'Microservices Architecture' is just 2 Express servers running on localhost:3000 and localhost:3001."
    ],
    "verdict": "Likely to get filtered before human eyes ever see this."
  }
}
```
