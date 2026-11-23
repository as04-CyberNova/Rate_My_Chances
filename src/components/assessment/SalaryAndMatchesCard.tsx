'use client';

import React from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';
import { AlternateOpportunity } from '@/types/assessment';

interface SalaryAndMatchesProps {
  salary: {
    currentEstimated: string;
    potentialMin: string;
    potentialMax: string;
  };
  interviewReadiness: number;
  alternateMatches: AlternateOpportunity[];
}

export function SalaryAndMatchesCard({
  salary,
  interviewReadiness,
  alternateMatches
}: SalaryAndMatchesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Salary Predictor Glass Card */}
      <div className="glass-panel p-6 sm:p-7 fluent-hover flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/60">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl border border-emerald-200/50">
                <IndianRupee className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Salary Predictor</h3>
                <p className="text-xs text-slate-500">Market benchmark projections</p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/60 border border-white/70 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Estimated Current Level</span>
              <span className="text-sm font-bold text-slate-800">{salary.currentEstimated}</span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-300/40">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                Potential Target Compensation Band
              </div>
              <div className="text-2xl font-black text-emerald-900 tracking-tight">
                {salary.potentialMin} – {salary.potentialMax}
              </div>
              <p className="text-[11px] text-emerald-700/80 mt-1">
                Calibrated across verified Tier-1 & Tier-2 compensation data
              </p>
            </div>
          </div>
        </div>

        {/* Readiness Meter */}
        <div className="mt-5 pt-4 border-t border-white/60">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            <span className="text-slate-600">Interview Readiness</span>
            <span className="font-bold text-blue-600">{interviewReadiness}%</span>
          </div>
          <div className="w-full bg-slate-200/60 h-2 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.1,0.9,0.2,1)]"
              style={{ width: `${interviewReadiness}%` }}
            />
          </div>
        </div>
      </div>

      {/* Alternate Opportunities Glass Card */}
      <div className="glass-panel p-6 sm:p-7 fluent-hover flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/60">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Alternate High-Fit Targets</h3>
              <p className="text-xs text-slate-500">Highest selection odds based on profile signals</p>
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            {alternateMatches.map((match, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/60 border border-white/80 hover:bg-white hover:border-blue-200 transition-all duration-200 shadow-xs"
              >
                <div>
                  <div className="font-bold text-sm text-slate-900">{match.company}</div>
                  <div className="text-xs text-slate-500">{match.role}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-blue-600">{match.probability}%</span>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-300/40">
                    High Fit
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
