import { AssessmentInput, AssessmentResult } from '@/types/assessment';

interface CompanyRubric {
  name: string;
  tier: 'tier1' | 'tier2' | 'unicorn';
  difficultyWeight: number; // 1.0 (baseline) to 1.35 (Google/Meta strict)
  coreExpectations: string[];
  salaryMultiplier: { min: number; max: number };
}

const COMPANY_RUBRICS: Record<string, CompanyRubric> = {
  'google': {
    name: 'Google',
    tier: 'tier1',
    difficultyWeight: 1.35,
    coreExpectations: ['Distributed Systems', 'Algorithms & Data Structures', 'High Scale QPS', 'Testing Discipline'],
    salaryMultiplier: { min: 2.2, max: 2.8 }
  },
  'microsoft': {
    name: 'Microsoft',
    tier: 'tier1',
    difficultyWeight: 1.25,
    coreExpectations: ['Cloud Computing', 'System Architecture', 'Design Patterns', 'Enterprise Scalability'],
    salaryMultiplier: { min: 2.0, max: 2.5 }
  },
  'amazon': {
    name: 'Amazon',
    tier: 'tier1',
    difficultyWeight: 1.28,
    coreExpectations: ['Ownership & Scale', 'AWS Architecture', 'Microservices', 'Leadership Principles'],
    salaryMultiplier: { min: 2.1, max: 2.6 }
  },
  'atlassian': {
    name: 'Atlassian',
    tier: 'tier2',
    difficultyWeight: 1.18,
    coreExpectations: ['Modern Frontend / Backend', 'Collaborative Tooling', 'Clean Code', 'API Design'],
    salaryMultiplier: { min: 1.8, max: 2.3 }
  },
  'razorpay': {
    name: 'Razorpay',
    tier: 'unicorn',
    difficultyWeight: 1.15,
    coreExpectations: ['Fintech Resiliency', 'Transactional Systems', 'High Availability', 'Database Optimization'],
    salaryMultiplier: { min: 1.7, max: 2.2 }
  },
  'uber': {
    name: 'Uber',
    tier: 'tier1',
    difficultyWeight: 1.30,
    coreExpectations: ['Real-time Event Systems', 'Geospatial / Concurrency', 'Fault Tolerance', 'Kafka / Redis'],
    salaryMultiplier: { min: 2.1, max: 2.7 }
  }
};

const TECH_KEYWORD_MAP: Record<string, string[]> = {
  frontend: ['react', 'next.js', 'vue', 'typescript', 'tailwind', 'javascript', 'redux', 'angular', 'css'],
  backend: ['node.js', 'express', 'nestjs', 'python', 'go', 'golang', 'java', 'spring', 'postgresql', 'mongodb', 'redis', 'kafka'],
  cloud: ['aws', 'gcp', 'azure', 'docker', 'kubernetes', 'ci/cd', 'terraform'],
  dsa: ['algorithms', 'data structures', 'leetcode', 'dynamic programming', 'graphs', 'trees', 'time complexity'],
  scale: ['microservices', 'distributed', 'qps', 'sharding', 'caching', 'concurrency', 'load balancing']
};

export function evaluateCandidateProfile(input: AssessmentInput): AssessmentResult {
  const companyKey = input.targetCompany.toLowerCase().trim();
  const rubric = COMPANY_RUBRICS[companyKey] || {
    name: input.targetCompany,
    tier: 'tier2',
    difficultyWeight: 1.15,
    coreExpectations: ['Clean Architecture', 'API Development', 'Testing', 'Problem Solving'],
    salaryMultiplier: { min: 1.8, max: 2.3 }
  };

  const resumeLower = (input.resumeText || '').toLowerCase();

  // 1. Skill keyword matches
  const detectedSkills: string[] = [];
  const missingSkills: string[] = [];

  const candidateSkills = [
    { name: 'React', found: resumeLower.includes('react') },
    { name: 'Node.js', found: resumeLower.includes('node') },
    { name: 'TypeScript', found: resumeLower.includes('typescript') },
    { name: 'Data Structures', found: resumeLower.includes('data structure') || resumeLower.includes('algorithm') || resumeLower.includes('dsa') || resumeLower.includes('leetcode') },
    { name: 'System Design', found: resumeLower.includes('system design') || resumeLower.includes('distributed') || resumeLower.includes('microservices') },
    { name: 'Cloud Computing', found: resumeLower.includes('aws') || resumeLower.includes('docker') || resumeLower.includes('kubernetes') || resumeLower.includes('cloud') },
    { name: 'Open Source', found: !!input.githubUrl || resumeLower.includes('open source') || resumeLower.includes('contribut') },
    { name: 'PostgreSQL / SQL', found: resumeLower.includes('sql') || resumeLower.includes('postgres') || resumeLower.includes('mongo') }
  ];

  candidateSkills.forEach(s => {
    if (s.found) detectedSkills.push(s.name);
    else missingSkills.push(s.name);
  });

  // Ensure minimum items for robust display
  const strong = detectedSkills.length > 0 ? detectedSkills.slice(0, 4) : ['Core Problem Solving', 'Software Engineering Fundamentals'];
  const needsImprovement = missingSkills.length > 0 ? missingSkills.slice(0, 4) : ['Advanced Distributed Systems', 'Production Observability'];

  // 2. Score Calculation with strict weighting
  let rawScore = 52;
  // Experience factor
  if (input.yearsExperience >= 4) rawScore += 16;
  else if (input.yearsExperience >= 2) rawScore += 10;
  else rawScore += 4;

  // Skills factor
  rawScore += Math.min(22, detectedSkills.length * 3.5);

  // GitHub bonus
  if (input.githubUrl && input.githubUrl.includes('github.com')) rawScore += 5;

  // Normalized against target company difficulty
  let chanceScore = Math.round(rawScore / rubric.difficultyWeight);
  chanceScore = Math.max(32, Math.min(94, chanceScore));

  const confidenceLevel = chanceScore > 75 ? 'High' : chanceScore > 50 ? 'Medium' : 'Calibrating';
  const interviewReadiness = Math.round(chanceScore * 1.07);
  const prepWeeks = Math.max(3, Math.round((100 - chanceScore) / 6));

  // 3. Benchmarks Calculation
  const hasSystemDesign = resumeLower.includes('system design') || resumeLower.includes('distributed');
  const hasCloud = resumeLower.includes('aws') || resumeLower.includes('docker');

  const benchmarks = [
    { category: 'Projects Depth', you: Math.min(96, 70 + (input.yearsExperience * 5)), avg: 88 },
    { category: 'DSA / Algorithms', you: resumeLower.includes('leetcode') ? 85 : 72, avg: rubric.tier === 'tier1' ? 94 : 82 },
    { category: 'System Design', you: hasSystemDesign ? 78 : 42, avg: rubric.tier === 'tier1' ? 88 : 74 },
    { category: 'Open Source / Proof of Work', you: input.githubUrl ? 74 : 58, avg: 72 }
  ];

  // 4. Alternate Opportunities
  const alternateOpportunities: AssessmentResult['alternateOpportunities'] = [
    { company: 'Microsoft', role: 'SWE', probability: Math.min(95, Math.round(chanceScore * 1.15)), tags: ['Strong Tech Match', 'Enterprise Cloud'] },
    { company: 'Atlassian', role: 'Full Stack Engineer', probability: Math.min(95, Math.round(chanceScore * 1.20)), tags: ['Collaborative Stack', 'Work-Life Balance'] },
    { company: 'Razorpay', role: 'Software Engineer', probability: Math.min(96, Math.round(chanceScore * 1.28)), tags: ['High Growth', 'Fast Hiring Loop'] }
  ];

  // 5. Dynamic Roadmap
  const roadmap: AssessmentResult['roadmap'] = [
    {
      step: 1,
      title: 'Master System Design & Scalability',
      description: 'Study high-concurrency patterns, caching strategies with Redis, database indexing, and message queues (Kafka).',
      timeEstimate: '2 Weeks',
      impactGain: '+12% Chance',
      category: 'skills'
    },
    {
      step: 2,
      title: 'Complete 75 Targeted DSA Problems',
      description: 'Focus on Top 100 Liked problems on LeetCode: Binary Trees, Heaps, Dynamic Programming, and Graph Traversals.',
      timeEstimate: `${prepWeeks} Weeks`,
      impactGain: '+9% Chance',
      category: 'dsa'
    },
    {
      step: 3,
      title: 'Deploy Cloud-Native Proof-of-Work',
      description: 'Architect and deploy an observable multi-container project on AWS or GCP with Docker, GitHub Actions CI/CD, and live monitoring.',
      timeEstimate: '2 Weeks',
      impactGain: '+8% Chance',
      category: 'projects'
    },
    {
      step: 4,
      title: 'Revamp Resume Impact Metrics',
      description: 'Rewrite bullet points using Google XYZ format: "Accomplished [X] as measured by [Y], by doing [Z]" with concrete % metrics.',
      timeEstimate: '3 Days',
      impactGain: '+6% Chance',
      category: 'skills'
    }
  ];

  // 6. Recruiter Simulation Feedback
  const recruiterEvaluation = {
    resumeQuality: Math.min(95, 68 + (detectedSkills.length * 3)),
    technicalDepth: Math.min(95, Math.round(chanceScore * 0.95)),
    summary: `Your profile displays solid fundamentals in ${detectedSkills.slice(0, 3).join(', ') || 'software engineering'}, but exhibits clear gaps in scalable systems, distributed telemetry, and production deployment at ${rubric.name} scale.`,
    hiringRisks: [
      hasSystemDesign ? 'Need deeper evidence of managing large production outages or high QPS.' : `Lack of verified architectural experience with distributed microservices required at ${rubric.name}.`,
      hasCloud ? 'Docker/Cloud mentions present, but need infrastructure-as-code or cost optimization evidence.' : 'Minimal cloud infrastructure (AWS/GCP/Kubernetes) proof in live environments.',
      'Bullet points lean toward task descriptions rather than measurable business impact (latencies reduced, revenue enabled).'
    ]
  };

  // 7. Roast Feedback
  const roastBurns = [
    detectedSkills.includes('React')
      ? "You have multiple frontend apps, but they all smell like tutorial clones with different Tailwind gradients."
      : "Your technical stack looks like it hasn't received an npm audit since 2021.",
    input.yearsExperience < 2
      ? "Two years of experience listed, but 1.5 of those were spent arguing with CSS flexbox alignment."
      : "Listing 'Experienced in Agile' just means you attended a 15-minute daily standup while half asleep.",
    hasSystemDesign
      ? "Putting 'Distributed Systems' because you set up 2 microservices communicating on localhost is brave."
      : "The recruiter will notice your absence of System Design faster than a memory leak in Node.js."
  ];

  const roast = {
    headline: `Why ${rubric.name}'s Bar Raiser might leave you on read`,
    content: `You're applying for ${input.targetRole} with ${input.yearsExperience} years of experience, but your resume reads like a junior syllabus. Recruiters spend 6 seconds per resume — right now, 4 of those seconds are spent wondering why there are no quantifiable business outcomes.`,
    burns: roastBurns
  };

  // 8. Compensation Projections
  const currentLpa = Math.max(6, Math.round(input.yearsExperience * 3.5 + 4));
  const targetMinLpa = Math.round(currentLpa * rubric.salaryMultiplier.min);
  const targetMaxLpa = Math.round(currentLpa * rubric.salaryMultiplier.max);

  return {
    id: `asmt_${Date.now()}`,
    targetCompany: rubric.name,
    targetRole: input.targetRole,
    yearsExperience: input.yearsExperience,
    chanceScore,
    confidenceLevel,
    interviewReadiness,
    recommendedPrepWeeks: prepWeeks,
    salary: {
      currentEstimated: `₹${currentLpa} LPA`,
      potentialMin: `₹${targetMinLpa} LPA`,
      potentialMax: `₹${targetMaxLpa} LPA`
    },
    skills: {
      strong,
      needsImprovement
    },
    recruiterEvaluation,
    benchmarks,
    alternateOpportunities,
    roadmap,
    roast
  };
}
