import { NextResponse } from 'next/server';
import { evaluateCandidateProfile } from '@/lib/evaluator';
import { analyzeProfileWithGemini } from '@/lib/gemini';
import { AssessmentInput } from '@/types/assessment';

export async function POST(req: Request) {
  try {
    const body: AssessmentInput & { apiKey?: string } = await req.json();

    if (!body.targetCompany || !body.targetRole) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Target company and target role are required.'
          }
        },
        { status: 400 }
      );
    }

    const effectiveApiKey =
      body.apiKey?.trim() ||
      process.env.GEMINI_API_KEY?.trim() ||
      process.env.GOOGLE_API_KEY?.trim();

    let assessmentResult;

    if (effectiveApiKey) {
      // Execute live AI evaluation via Google Gemini
      assessmentResult = await analyzeProfileWithGemini(body, effectiveApiKey);
    } else {
      // Execute verified heuristic rule-based calibration engine
      assessmentResult = evaluateCandidateProfile({
        targetCompany: body.targetCompany,
        targetRole: body.targetRole,
        yearsExperience: Number(body.yearsExperience) || 1,
        resumeText: body.resumeText || '',
        githubUrl: body.githubUrl,
        linkedinUrl: body.linkedinUrl
      });
    }

    return NextResponse.json({
      success: true,
      data: assessmentResult,
      engine: effectiveApiKey ? 'Google Gemini 2.5 Flash' : 'Calibrated Rule Engine'
    });
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An error occurred while evaluating your chances. Please try again.'
        }
      },
      { status: 500 }
    );
  }
}
