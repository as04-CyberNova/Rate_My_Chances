'use client';

import React from 'react';
import { BenchmarkItem } from '@/types/assessment';

interface BenchmarkCardProps {
  companyName: string;
  benchmarks: BenchmarkItem[];
}

export function BenchmarkCard({ companyName, benchmarks }: BenchmarkCardProps) {
  return (
    <div className="glass-panel p-6 sm:p-7 fluent-hover">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/60 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            You vs. Average {companyName} Hire
          </h3>
          <p className="text-xs text-slate-500">Benchmark comparison against verified successful applicants</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-xs"></span>
            <span className="text-slate-700">You</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
            <span className="text-slate-500">Avg Hire</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-5">
        {benchmarks.map((item, idx) => {
          const delta = item.you - item.avg;
          const isAhead = delta >= 0;

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800">{item.category}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{item.you}%</span>
                  <span className="text-[11px] text-slate-400">vs {item.avg}%</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold shadow-xs ${
                      isAhead
                        ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-300/50'
                        : 'bg-rose-500/10 text-rose-700 border border-rose-300/50'
                    }`}
                  >
                    {isAhead ? `+${delta}%` : `${delta}%`}
                  </span>
                </div>
              </div>

              {/* Glassmorphic Dual Bar Gauge */}
              <div className="w-full bg-slate-200/60 h-2.5 rounded-full overflow-hidden relative">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.1,0.9,0.2,1)]"
                  style={{ width: `${item.you}%` }}
                ></div>
                {/* Average marker */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-slate-800 rounded-full z-10"
                  style={{ left: `${item.avg}%` }}
                  title={`Average: ${item.avg}%`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
