'use client';

import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { RoadmapStepItem } from '@/types/assessment';

interface RoadmapCardProps {
  steps: RoadmapStepItem[];
  prepWeeks: number;
}

export function RoadmapCard({ steps, prepWeeks }: RoadmapCardProps) {
  return (
    <div className="glass-panel p-6 sm:p-7 fluent-hover">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/60 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Personalized Action Roadmap</h3>
          <p className="text-xs text-slate-500">Step-by-step milestones to maximize hiring probability</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-700 rounded-full text-xs font-bold border border-blue-200/50">
          <Calendar className="w-3.5 h-3.5" />
          <span>{prepWeeks} Weeks Suggested Prep</span>
        </div>
      </div>

      <div className="mt-6 space-y-3.5">
        {steps.map((item) => (
          <div
            key={item.step}
            className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 border border-white/80 hover:bg-white hover:border-blue-200 transition-all duration-300 shadow-xs"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm shrink-0 shadow-md shadow-blue-500/20">
              {item.step}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-300/40">
                  <TrendingUp className="w-3 h-3" />
                  {item.impactGain}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                <span>Estimated: {item.timeEstimate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
