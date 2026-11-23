'use client';

import React from 'react';
import { Flame, Skull, Sparkles } from 'lucide-react';

interface RoastCardProps {
  headline: string;
  content: string;
  burns?: string[];
  onToggleBack: () => void;
}

export function RoastCard({ headline, content, burns, onToggleBack }: RoastCardProps) {
  return (
    <div className="glass-panel-dark text-white p-7 sm:p-9 relative overflow-hidden fluent-hover">
      {/* Background flare glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/20 text-orange-400 rounded-2xl border border-orange-500/30">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-orange-400">
                Viral Roast Mode 🔥
              </span>
              <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-mono border border-red-500/30">
                Brutal Honesty
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">{headline}</h3>
          </div>
        </div>

        <button
          onClick={onToggleBack}
          className="text-xs px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold transition border border-white/10"
        >
          Exit Roast
        </button>
      </div>

      <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-200 text-xs sm:text-sm leading-relaxed">
        {content}
      </div>

      {burns && burns.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
            <Skull className="w-3.5 h-3.5 text-orange-400" />
            Specific Burns from the Hiring Committee:
          </h4>
          <div className="space-y-2">
            {burns.map((burn, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs text-orange-100 bg-orange-500/10 p-3.5 rounded-xl border border-orange-500/20"
              >
                <span className="text-orange-400 font-bold shrink-0">#{idx + 1}</span>
                <span>{burn}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
        <span>Share your roast with friends on Twitter / LinkedIn</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${headline}\n\n${content}`);
            alert('Roast text copied to clipboard! 🚀');
          }}
          className="clay-btn-orange px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Copy Roast
        </button>
      </div>
    </div>
  );
}
