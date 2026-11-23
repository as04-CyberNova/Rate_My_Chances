import { GoogleGenAI } from '@google/genai';
import { AssessmentInput, AssessmentResult } from '@/types/assessment';
import { evaluateCandidateProfile as fallbackEvaluate } from './evaluator';

export async function analyzeProfileWithGemini(
  input: AssessmentInput,
  apiKey: string
): Promise<AssessmentResult> {
  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `You are a Principal Bar Raiser and Senior Tech Recruiter at top tech companies.
Your job is to rigorously evaluate a candidate's probability of passing the hiring bar for their target role at a target company.
You must return only a valid JSON object matching the exact schema below without markdown backticks.

Schema:
{
  "chanceScore": number (0 to 100, realistic and calibrated to target company difficulty),
  "confidenceLevel": "High" | "Medium" | "Calibrating",
  "interviewReadiness": number (0 to 100),
  "recommendedPrepWeeks": number (e.g. 4 to 12),
  "salary": {
    "currentEstimated": string (e.g. "₹8 LPA" or "$85k"),
    "potentialMin": string (e.g. "₹18 LPA" or "$140k"),
    "potentialMax": string (e.g. "₹24 LPA" or "$180k")
  },
  "skills": {
    "strong": string[] (3 to 6 verified competencies),
    "needsImprovement": string[] (3 to 6 missing or weak areas)
  },
  "recruiterEvaluation": {
    "resumeQuality": number (0 to 100),
    "technicalDepth": number (0 to 100),
    "summary": string (2-3 sentences of objective bar raiser feedback),
    "hiringRisks": string[] (2 to 4 explicit friction points or red flags)
  },
  "benchmarks": [
    { "category": "Projects Depth", "you": number (0-100), "avg": number (0-100) },
    { "category": "DSA / Algorithms", "you": number (0-100), "avg": number (0-100) },
    { "category": "System Design", "you": number (0-100), "avg": number (0-100) },
    { "category": "Open Source / Proof of Work", "you": number (0-100), "avg": number (0-100) }
  ],
  "alternateOpportunities": [
    { "company": string, "role": string, "probability": number (0-100) },
    { "company": string, "role": string, "probability": number (0-100) },
    { "company": string, "role": string, "probability": number (0-100) }
  ],
  "roadmap": [
    {
      "step": number (1, 2, 3, 4),
      "title": string,
      "description": string,
      "timeEstimate": string,
      "impactGain": string (e.g. "+10% Chance")
    }
  ],
  "roast": {
    "headline": string (witty, punchy headline),
    "content": string (humorous, brutally honest assessment of resume cliches/gaps),
    "burns": string[] (3 specific witty burns targeting projects, stack, or experience)
  }
}`;

  const prompt = `Candidate Assessment Request:
- Target Company: ${input.targetCompany}
- Target Role: ${input.targetRole}
- Years of Experience: ${input.yearsExperience}
- GitHub Profile: ${input.githubUrl || 'None provided'}
- LinkedIn Profile: ${input.linkedinUrl || 'None provided'}

Candidate Resume / Profile Details:
"""
${input.resumeText || 'No resume text provided'}
"""

Evaluate this candidate against the real ${input.targetCompany} hiring bar for ${input.targetRole}. Return the strictly formatted JSON output.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text?.trim() || '';
    const parsedData = JSON.parse(text);

    return {
      id: `asmt_${Date.now()}`,
      targetCompany: input.targetCompany,
      targetRole: input.targetRole,
      yearsExperience: input.yearsExperience,
      chanceScore: parsedData.chanceScore ?? 65,
      confidenceLevel: parsedData.confidenceLevel ?? 'Medium',
      interviewReadiness: parsedData.interviewReadiness ?? 70,
      recommendedPrepWeeks: parsedData.recommendedPrepWeeks ?? 5,
      salary: parsedData.salary ?? {
        currentEstimated: '₹8 LPA',
        potentialMin: '₹18 LPA',
        potentialMax: '₹22 LPA'
      },
      skills: parsedData.skills ?? {
        strong: ['Core Problem Solving', 'Software Engineering'],
        needsImprovement: ['System Scalability', 'Distributed Telemetry']
      },
      recruiterEvaluation: parsedData.recruiterEvaluation ?? {
        resumeQuality: 75,
        technicalDepth: 70,
        summary: 'Solid foundational profile, but requires stronger proof of high-scale production systems.',
        hiringRisks: ['Limited evidence of distributed microservices architecture.']
      },
      benchmarks: parsedData.benchmarks ?? [
        { category: 'Projects Depth', you: 78, avg: 85 },
        { category: 'DSA / Algorithms', you: 72, avg: 90 },
        { category: 'System Design', you: 55, avg: 82 },
        { category: 'Open Source / Proof of Work', you: 60, avg: 70 }
      ],
      alternateOpportunities: parsedData.alternateOpportunities ?? [
        { company: 'Microsoft', role: 'Software Engineer', probability: 78 },
        { company: 'Atlassian', role: 'Full Stack Engineer', probability: 82 },
        { company: 'Razorpay', role: 'Backend Engineer', probability: 87 }
      ],
      roadmap: parsedData.roadmap ?? [
        {
          step: 1,
          title: 'Master System Design Fundamentals',
          description: 'Focus on caching, rate limiting, and database indexing.',
          timeEstimate: '2 Weeks',
          impactGain: '+10% Chance'
        }
      ],
      roast: parsedData.roast ?? {
        headline: `Why ${input.targetCompany} might keep you in the queue`,
        content: 'Your resume shows ambition, but needs measurable business outcomes rather than task lists.',
        burns: ['Your microservices look suspiciously like 2 local Node servers.']
      }
    };
  } catch (error) {
    console.warn('Gemini API call failed or timed out. Falling back to calibrated rule engine:', error);
    return fallbackEvaluate(input);
  }
}
