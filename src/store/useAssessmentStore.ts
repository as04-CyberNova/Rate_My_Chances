import { create } from 'zustand';
import { AssessmentResult } from '@/types/assessment';

interface AssessmentState {
  currentResult: AssessmentResult | null;
  isAnalyzing: boolean;
  roastMode: boolean;
  activeTab: 'overview' | 'skills' | 'recruiter' | 'roadmap' | 'roast';
  setAssessmentResult: (result: AssessmentResult | null) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  setRoastMode: (active: boolean) => void;
  setActiveTab: (tab: AssessmentState['activeTab']) => void;
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  currentResult: null,
  isAnalyzing: false,
  roastMode: false,
  activeTab: 'overview',
  setAssessmentResult: (result) => set({ currentResult: result }),
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  setRoastMode: (active) => set({ roastMode: active }),
  setActiveTab: (tab) => set({ activeTab: tab })
}));
