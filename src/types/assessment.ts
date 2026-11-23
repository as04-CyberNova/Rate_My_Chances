export interface BenchmarkItem {
  category: string;
  you: number;
  avg: number;
}

export interface RoadmapStepItem {
  step: number;
  title: string;
  description: string;
  timeEstimate: string;
  impactGain: string;
  category?: 'skills' | 'projects' | 'dsa' | 'opensource';
}

export interface AlternateOpportunity {
  company: string;
  role: string;
  probability: number;
  tags?: string[];
}

export interface AssessmentResult {
  id: string;
  targetCompany: string;
  targetRole: string;
  yearsExperience: number;
  chanceScore: number;
  confidenceLevel: 'High' | 'Medium' | 'Calibrating';
  interviewReadiness: number;
  recommendedPrepWeeks: number;
  salary: {
    currentEstimated: string;
    potentialMin: string;
    potentialMax: string;
  };
  skills: {
    strong: string[];
    needsImprovement: string[];
  };
  recruiterEvaluation: {
    resumeQuality: number;
    technicalDepth: number;
    summary: string;
    hiringRisks: string[];
  };
  benchmarks: BenchmarkItem[];
  alternateOpportunities: AlternateOpportunity[];
  roadmap: RoadmapStepItem[];
  roast: {
    headline: string;
    content: string;
    burns?: string[];
  };
}

export interface AssessmentInput {
  targetCompany: string;
  targetRole: string;
  yearsExperience: number;
  resumeText: string;
  githubUrl?: string;
  linkedinUrl?: string;
}
