'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

interface SkillGapCardProps {
  strongSkills: string[];
  needsImprovement: string[];
}

export function SkillGapCard({ strongSkills, needsImprovement }: SkillGapCardProps) {
  return (
    <div className="glass-panel p-6 sm:p-7 fluent-hover h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/10 text-blue-600 rounded-xl border border-blue-200/50">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Skill Gap Breakdown</h3>
              <p className="text-xs text-slate-500">Strengths & missing criteria for target company</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 bg-white/70 text-slate-600 rounded-full border border-white/80 shadow-xs">
            Bar Match
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
          {/* Strong Areas */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified Strengths</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {strongSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-300/50 shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Needs Improvement */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-rose-700 font-semibold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Critical Gaps</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {needsImprovement.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-800 border border-rose-300/50 shadow-xs"
                >
                  <AlertTriangle className="w-3 h-3 text-rose-500" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
