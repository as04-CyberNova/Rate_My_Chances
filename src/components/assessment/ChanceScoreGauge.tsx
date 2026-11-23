'use client';

import React from 'react';

interface ChanceScoreGaugeProps {
  score: number;
  confidence: 'High' | 'Medium' | 'Calibrating';
  size?: number;
}

export function ChanceScoreGauge({ score, confidence, size = 190 }: ChanceScoreGaugeProps) {
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (val: number) => {
    if (val >= 75) return '#10B981';
    if (val >= 55) return '#2563EB';
    if (val >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90 drop-shadow-sm" width={size} height={size}>
          {/* Subtle Outer Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(226, 232, 240, 0.7)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Meter with Fluent ease */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={scoreColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-[cubic-bezier(0.1,0.9,0.2,1)]"
          />
        </svg>

        {/* Center Score Value with Minimalist Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline">
            <span className="text-5xl font-black tracking-tight text-slate-900 drop-shadow-sm">
              {score}
            </span>
            <span className="text-xl font-bold text-slate-400 ml-0.5">%</span>
          </div>
          <span className="text-[11px] uppercase tracking-widest font-semibold text-slate-400 mt-0.5">
            Probability
          </span>
        </div>
      </div>

      {/* Tactile Clay Pill Confidence */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs font-medium text-slate-500">Confidence:</span>
        <span
          className={`text-xs px-3 py-0.5 rounded-full font-bold shadow-sm border ${
            confidence === 'High'
              ? 'bg-emerald-500/10 text-emerald-700 border-emerald-300/60'
              : confidence === 'Medium'
              ? 'bg-blue-500/10 text-blue-700 border-blue-300/60'
              : 'bg-amber-500/10 text-amber-700 border-amber-300/60'
          }`}
        >
          {confidence}
        </span>
      </div>
    </div>
  );
}
