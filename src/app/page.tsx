'use client';

import React, { useState } from 'react';
import { CandidateInputForm } from '@/components/upload/CandidateInputForm';
import { ChanceScoreGauge } from '@/components/assessment/ChanceScoreGauge';
import { SkillGapCard } from '@/components/assessment/SkillGapCard';
import { BenchmarkCard } from '@/components/assessment/BenchmarkCard';
import { RecruiterFeedbackCard } from '@/components/assessment/RecruiterFeedbackCard';
import { RoadmapCard } from '@/components/roadmap/RoadmapCard';
import { RoastCard } from '@/components/roast/RoastCard';
import { SalaryAndMatchesCard } from '@/components/assessment/SalaryAndMatchesCard';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { AssessmentInput } from '@/types/assessment';
import { evaluateCandidateProfile } from '@/lib/evaluator';
import { Flame, Share2, Sparkles, Building, Briefcase } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const { currentResult, setAssessmentResult, isAnalyzing, setIsAnalyzing, roastMode, setRoastMode } =
    useAssessmentStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'recruiter' | 'roadmap'>('overview');

  const handleAssessmentSubmit = async (input: AssessmentInput & { apiKey?: string }) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      const json = await response.json();

      if (json.success && json.data) {
        setAssessmentResult(json.data);
        if (json.data.chanceScore >= 65) {
          confetti({
            particleCount: 70,
            spread: 75,
            origin: { y: 0.6 }
          });
        }
      } else {
        // Fallback locally if network or route error
        const res = evaluateCandidateProfile(input);
        setAssessmentResult(res);
      }
    } catch (e) {
      console.error('Analysis error:', e);
      const res = evaluateCandidateProfile(input);
      setAssessmentResult(res);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-900 relative overflow-x-hidden">
      {/* Background Decorative Ambient Blurs for Glassmorphism */}
      <div className="fixed top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-400/10 blur-[130px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-400/10 blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-[40%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-emerald-400/10 blur-[130px] pointer-events-none -z-10" />

      {/* Glassmorphic Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-black text-xl">
              🎯
            </div>
            <div>
              <span className="font-black text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                Rate My Chances <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-300 text-slate-900 font-extrabold uppercase tracking-wider">AI</span>
              </span>
              <p className="text-[11px] text-slate-500 hidden sm:block">Career Intelligence & Probability Modeling</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentResult && (
              <button
                onClick={() => setRoastMode(!roastMode)}
                className={roastMode ? "clay-btn-orange px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer" : "clay-pill-neutral px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"}
              >
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>{roastMode ? 'Standard Mode' : '🔥 Roast My Profile'}</span>
              </button>
            )}

            <button
              onClick={() => {
                if (currentResult) {
                  navigator.clipboard.writeText(
                    `I evaluated my hiring chances for ${currentResult.targetCompany} ${currentResult.targetRole} on Rate My Chances: ${currentResult.chanceScore}% Selection Probability! Check yours out.`
                  );
                  alert('Scorecard summary copied to clipboard! 🚀');
                } else {
                  alert('Run an analysis first to share your scorecard!');
                }
              }}
              className="clay-pill-neutral px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-700" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Hero Section if no result */}
        {!currentResult && (
          <div className="text-center max-w-3xl mx-auto py-6 sm:py-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 border border-white/80 shadow-xs text-blue-700 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Data-Backed Hiring Probability
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Stop Blindly Applying.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Know Your Real Odds.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              Our AI Bar Raiser simulates company-specific hiring committees, calculates your selection chance score, benchmarks your skills, and charts your exact path to an offer.
            </p>
          </div>
        )}

        {/* Input Form Glass Card */}
        <div className="max-w-4xl mx-auto">
          <CandidateInputForm onSubmit={handleAssessmentSubmit} isLoading={isAnalyzing} />
        </div>

        {/* Dynamic Bento Grid Assessment Results */}
        {currentResult && (
          <div className="space-y-6 pt-4">
            {/* Roast Banner if toggled */}
            {roastMode && (
              <RoastCard
                headline={currentResult.roast.headline}
                content={currentResult.roast.content}
                burns={currentResult.roast.burns}
                onToggleBack={() => setRoastMode(false)}
              />
            )}

            {/* Bento Grid Header / Top Summary */}
            <div className="glass-panel p-6 sm:p-8 fluent-hover">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Gauge Cell */}
                <div className="lg:col-span-4 flex justify-center border-b lg:border-b-0 lg:border-r border-white/60 pb-6 lg:pb-0">
                  <ChanceScoreGauge
                    score={currentResult.chanceScore}
                    confidence={currentResult.confidenceLevel}
                  />
                </div>

                {/* Candidate Overview Cell */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                        Evaluated Candidate Benchmark
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                        {currentResult.targetCompany} • {currentResult.targetRole}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-white/70 text-slate-700 font-bold border border-white/80 shadow-xs">
                        Exp: {currentResult.yearsExperience} Yrs
                      </span>
                      <button
                        onClick={() => {
                          const element = document.getElementById('roadmap-section');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="clay-btn-primary px-3.5 py-1.5 text-xs font-bold cursor-pointer"
                      >
                        View Preparation Plan
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentResult.recruiterEvaluation.summary}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-white/60 border border-white/80 shadow-xs">
                      <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Hiring Odds</div>
                      <div className="text-lg font-black text-slate-900 mt-0.5">{currentResult.chanceScore}%</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/60 border border-white/80 shadow-xs">
                      <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Interview Readiness</div>
                      <div className="text-lg font-black text-blue-600 mt-0.5">
                        {currentResult.interviewReadiness}%
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/60 border border-white/80 shadow-xs col-span-2 sm:col-span-1">
                      <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Target Compensation</div>
                      <div className="text-lg font-black text-emerald-600 mt-0.5">
                        {currentResult.salary.potentialMin}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={activeTab === 'overview' ? "clay-btn-primary px-4 py-2 text-xs font-bold cursor-pointer" : "clay-pill-neutral px-4 py-2 text-xs font-bold cursor-pointer"}
              >
                Bento Overview & Skills
              </button>
              <button
                onClick={() => setActiveTab('recruiter')}
                className={activeTab === 'recruiter' ? "clay-btn-primary px-4 py-2 text-xs font-bold cursor-pointer" : "clay-pill-neutral px-4 py-2 text-xs font-bold cursor-pointer"}
              >
                AI Bar Raiser Simulation
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={activeTab === 'roadmap' ? "clay-btn-primary px-4 py-2 text-xs font-bold cursor-pointer" : "clay-pill-neutral px-4 py-2 text-xs font-bold cursor-pointer"}
              >
                Personalized Roadmap
              </button>
            </div>

            {/* Bento Grid Content Sections */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 2-Column Bento Grid Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7">
                    <SkillGapCard
                      strongSkills={currentResult.skills.strong}
                      needsImprovement={currentResult.skills.needsImprovement}
                    />
                  </div>
                  <div className="lg:col-span-5">
                    <BenchmarkCard
                      companyName={currentResult.targetCompany}
                      benchmarks={currentResult.benchmarks}
                    />
                  </div>
                </div>

                {/* Salary & Career Path Row */}
                <SalaryAndMatchesCard
                  salary={currentResult.salary}
                  interviewReadiness={currentResult.interviewReadiness}
                  alternateMatches={currentResult.alternateOpportunities}
                />
              </div>
            )}

            {activeTab === 'recruiter' && (
              <div className="space-y-6">
                <RecruiterFeedbackCard
                  resumeQuality={currentResult.recruiterEvaluation.resumeQuality}
                  technicalDepth={currentResult.recruiterEvaluation.technicalDepth}
                  summary={currentResult.recruiterEvaluation.summary}
                  hiringRisks={currentResult.recruiterEvaluation.hiringRisks}
                />
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div id="roadmap-section" className="space-y-6">
                <RoadmapCard
                  steps={currentResult.roadmap}
                  prepWeeks={currentResult.recommendedPrepWeeks}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Minimalist Glass Footer */}
      <footer className="backdrop-blur-md bg-white/50 border-t border-white/60 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Rate My Chances © 2026 — AI Career Intelligence & Hiring Benchmark Engine
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <span className="hover:text-slate-900 cursor-pointer">Privacy & Data Redaction</span>
            <span className="hover:text-slate-900 cursor-pointer">Company Rubrics</span>
            <span className="hover:text-slate-900 cursor-pointer">API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
