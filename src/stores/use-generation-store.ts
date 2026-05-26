import { create } from "zustand";

export type GenerationStatus =
  | "idle"
  | "diagnostic"
  | "roadmap"
  | "completed"
  | "failed_diagnostic"
  | "failed_roadmap";

// Statuses that represent an in-flight async operation.
// If the app was closed mid-generation these would be stale — reset them to
// "idle" so the button is never permanently disabled after a page reload.
const TRANSIENT_STATUSES: GenerationStatus[] = ["diagnostic", "roadmap"];

/** Read all persisted business statuses from localStorage at startup. */
function loadFromStorage(): Record<number, GenerationStatus> {
  if (typeof window === "undefined") return {};
  const result: Record<number, GenerationStatus> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith("generation_status_")) continue;
    const bizId = parseInt(key.replace("generation_status_", ""), 10);
    if (isNaN(bizId)) continue;
    const raw = localStorage.getItem(key) as GenerationStatus | null;
    if (!raw) continue;
    // Reset transient statuses so a page-reload doesn't permanently lock buttons
    const status: GenerationStatus = TRANSIENT_STATUSES.includes(raw) ? "idle" : raw;
    if (status !== raw) localStorage.setItem(key, status); // keep storage in sync
    result[bizId] = status;
  }
  return result;
}

interface GenerationStore {
  /** Map of businessId → status */
  statuses: Record<number, GenerationStatus>;
  setStatus: (businessId: number, status: GenerationStatus) => void;
  /** Pure read — no side effects, safe to call inside selectors. */
  getStatus: (businessId: number | null) => GenerationStatus;
}

export const useGenerationStore = create<GenerationStore>((set, get) => ({
  statuses: loadFromStorage(),

  setStatus: (businessId, status) => {
    set((state) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(`generation_status_${businessId}`, status);
      }
      return { statuses: { ...state.statuses, [businessId]: status } };
    });
  },

  // Pure read — no set() calls, safe inside React selectors.
  getStatus: (businessId) => {
    if (!businessId) return "idle";
    return get().statuses[businessId] ?? "idle";
  },
}));
