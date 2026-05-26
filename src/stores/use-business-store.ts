import { create } from 'zustand';
import { Business } from '@/types/business/type';

interface BusinessStore {
  activeBusiness: Business | null;
  businesses: Business[];
  setActiveBusiness: (business: Business | null) => void;
  setBusinesses: (businesses: Business[]) => void;
}

export const useBusinessStore = create<BusinessStore>((set) => ({
  activeBusiness: null,
  businesses: [],
  setActiveBusiness: (business) => set({ activeBusiness: business }),
  setBusinesses: (businesses) => set({ businesses }),
}));
