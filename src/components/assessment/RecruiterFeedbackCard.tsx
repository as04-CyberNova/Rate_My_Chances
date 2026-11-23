'use client';

import React from 'react';
import { UserCheck, AlertOctagon, FileCheck, Layers } from 'lucide-react';

interface RecruiterFeedbackCardProps {
  resumeQuality: number;
  technicalDepth: number;
  summary: string;
  hiringRisks: string[];
}

export function RecruiterFeedbackCard({
  resumeQuality,
  technicalDepth,
  summary,
  hiringRisks
}: RecruiterFeedbackCardProps) {
  return (
    <div className="glass-panel p-6 sm:p-7 fluent-hover">
      <div className="flex items-center justify-between pb-4 border-b border-white/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-500/10 text-blue-600 rounded-xl border border-blue-200/50">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">AI Bar Raiser Simulation</h3>
            <p className="text-xs text-slate-500">Unfiltered evaluation from hiring committee perspective</p>
          </div>
        </div>
      </div>

      {/* Metric highlights */}
      <div className="grid grid-cols-2 gap-4 my-5">
        <div className="p-4 rounded-2xl bg-white/70 border border-white/80 shadow-xs flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Resume Quality</div>
            <div className="text-xl font-black text-slate-900">{resumeQuality}/100</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 border border-white/80 shadow-xs flex items-center gap-3">
          <Layers className="w-5 h-5 text-indigo-600 shrink-0" />
          <div>
            <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Technical Depth</div>
            <div className="text-xl font-black text-slate-900">{technicalDepth}/100</div>
          </div>
        </div>
      </div>

      {/* Recruiter Summary */}
      <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-200/50 text-xs sm:text-sm text-slate-800 leading-relaxed">
        <span className="font-bold text-blue-900 block mb-1">Recruiter Verdict:</span>
        {summary}
      </div>

      {/* Hiring Risks */}
      <div className="mt-5 space-y-2.5">
        <div className="flex items-center gap-2 text-rose-700 font-semibold text-xs uppercase tracking-wider">
          <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
          <span>Friction Points & Hiring Risks</span>
        </div>
        <ul className="space-y-2">
          {hiringRisks.map((risk, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-xs text-slate-700 bg-rose-500/5 p-3 rounded-xl border border-rose-200/40"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>{risk}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
