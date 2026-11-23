'use client';

import React, { useState, useEffect } from 'react';
import { UploadCloud, FileText, Check, Sparkles, Building, Briefcase, Clock, Globe, KeyRound } from 'lucide-react';
import { AssessmentInput } from '@/types/assessment';

interface CandidateInputFormProps {
  onSubmit: (input: AssessmentInput & { apiKey?: string }) => void;
  isLoading: boolean;
}

const PRESET_COMPANIES = ['Google', 'Microsoft', 'Amazon', 'Atlassian', 'Razorpay', 'Uber'];
const PRESET_ROLES = [
  'Software Engineer',
  'Frontend Engineer',
  'Backend Engineer',
  'Full Stack Developer',
  'DevOps / SRE'
];

export function CandidateInputForm({ onSubmit, isLoading }: CandidateInputFormProps) {
  const [targetCompany, setTargetCompany] = useState('Google');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [yearsExperience, setYearsExperience] = useState(2);
  const [githubUrl, setGithubUrl] = useState('https://github.com/alexchen');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showKeyField, setShowKeyField] = useState(false);
  const [resumeText, setResumeText] = useState(
    `Alex Chen - Software Engineer
Experience: 2 Years building React web apps, Node.js REST APIs, and PostgreSQL databases.
Skills: React, TypeScript, Node.js, Express, PostgreSQL, Git, Tailwind CSS, Jest, Data Structures & Algorithms.
Projects:
1. E-Commerce Dashboard: Built with Next.js, Redux, Node.js, and Stripe integration.
2. Chat Application: Real-time messaging with Socket.io and MongoDB.
3. Task Planner: Kanban board with drag-and-drop and local caching.`
  );
  const [fileName, setFileName] = useState<string | null>('alex_chen_resume.pdf');

  useEffect(() => {
    const savedKey = localStorage.getItem('rmc_gemini_key');
    if (savedKey) {
      setApiKey(savedKey);
      setShowKeyField(true);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text && text.trim().length > 20) {
          setResumeText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      localStorage.setItem('rmc_gemini_key', apiKey.trim());
    }
    onSubmit({
      targetCompany,
      targetRole,
      yearsExperience,
      resumeText,
      githubUrl,
      linkedinUrl,
      apiKey: apiKey.trim() || undefined
    });
  };

  return (
    <div className="glass-panel p-6 sm:p-9 fluent-hover">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-2 border-b border-white/60 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Calculate Your Selection Odds
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Evaluate your profile against real hiring committee bars.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowKeyField(!showKeyField)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/70 hover:bg-white text-slate-700 border border-white/80 shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <KeyRound className="w-3.5 h-3.5 text-blue-600" />
          <span>{apiKey ? 'Google API Key Configured' : 'Add Google API Key'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Optional Google API Key Row */}
        {showKeyField && (
          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-200/50 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                Google Gemini API Key
              </label>
              <span className="text-[11px] text-blue-700/80">Stored locally in your browser</span>
            </div>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-blue-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs font-mono text-slate-900 shadow-xs transition"
            />
            <p className="text-[11px] text-slate-500">
              Leave blank to use the built-in calibrated heuristic engine, or enter your key from Google AI Studio.
            </p>
          </div>
        )}

        {/* Target Company & Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                Target Company
              </span>
            </label>
            <select
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full px-3.5 py-3 rounded-2xl bg-white/70 border border-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs sm:text-sm font-semibold text-slate-900 shadow-xs transition"
            >
              {PRESET_COMPANIES.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                Target Role
              </span>
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3.5 py-3 rounded-2xl bg-white/70 border border-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs sm:text-sm font-semibold text-slate-900 shadow-xs transition"
            >
              {PRESET_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Years Experience
              </span>
            </label>
            <input
              type="number"
              min={0}
              max={25}
              step={0.5}
              value={yearsExperience}
              onChange={(e) => setYearsExperience(Number(e.target.value))}
              className="w-full px-3.5 py-3 rounded-2xl bg-white/70 border border-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs sm:text-sm font-semibold text-slate-900 shadow-xs transition"
            />
          </div>
        </div>

        {/* Resume Dropzone */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
            Resume Document / Profile Details
          </label>
          <div className="border-2 border-dashed border-slate-300/60 hover:border-blue-500/60 rounded-2xl p-5 bg-white/40 backdrop-blur-md transition-all text-center">
            <input
              type="file"
              id="resume-file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="resume-file"
              className="cursor-pointer flex flex-col items-center justify-center space-y-2"
            >
              <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl border border-blue-200/50">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="text-xs font-medium text-slate-700">
                <span className="font-bold text-blue-600">Click to upload resume (PDF)</span> or drag and drop
              </div>
              <div className="text-[11px] text-slate-400">PDF, TXT up to 10MB</div>
            </label>

            {fileName && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white/80 border border-blue-200/60 rounded-xl text-xs font-semibold text-blue-800 shadow-xs">
                <FileText className="w-3.5 h-3.5" />
                <span>{fileName}</span>
                <Check className="w-3.5 h-3.5 text-emerald-600 ml-1" />
              </div>
            )}
          </div>
        </div>

        {/* Profile Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-700" />
                GitHub Profile URL (Optional)
              </span>
            </label>
            <input
              type="url"
              placeholder="https://github.com/username"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white/70 border border-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs font-medium text-slate-900 shadow-xs transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-700" />
                LinkedIn Profile URL (Optional)
              </span>
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white/70 border border-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs font-medium text-slate-900 shadow-xs transition"
            />
          </div>
        </div>

        {/* Tactile Claymorphic CTA Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 clay-btn-primary font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing against {targetCompany} Bar with Gemini...</span>
            </div>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-lime-300" />
              <span>Rate My Chances at {targetCompany}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
