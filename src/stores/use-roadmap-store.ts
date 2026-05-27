import { create } from 'zustand';

interface RoadmapStore {
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

export const useRoadmapStore = create<RoadmapStore>((set) => ({
  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
}));
