import { create } from 'zustand';

interface DiagnosticStore {
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

export const useDiagnosticStore = create<DiagnosticStore>((set) => ({
  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
}));
