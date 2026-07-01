import type { DiagnosticData } from "@/types/diagnostic";
import type { Business } from "@/types/business/type";

export interface RoadmapInitiative {
  id: string;
  label: string;
  nodeType: string;
  owner: string;
  timeline: string;
  description: string;
  objectives: string[];
  kpis: string[];
}

export interface RoadmapPhase {
  id: string;
  label: string;
  timeline: string;
  objective: string;
  initiatives: RoadmapInitiative[];
  dependencies: string[];
}

export interface ReportData {
  business: Business;
  diagnostic: DiagnosticData;
  roadmapPhases: RoadmapPhase[] | null;
}

export const COLORS = {
  PRIMARY_DARK: "#0F172A",
  PRIMARY_MID: "#1E40AF",
  PRIMARY_LIGHT: "#DBEAFE",
  ACCENT: "#3B82F6",
  TEXT_PRIMARY: "#1E293B",
  TEXT_SECONDARY: "#64748B",
  BORDER: "#E2E8F0",
  BG_LIGHT: "#F8FAFC",
  BG_SECTION: "#F1F5F9",
  WHITE: "#FFFFFF",
  PRIORITY_HIGH: "#EF4444",
  PRIORITY_MID: "#F59E0B",
  PRIORITY_LOW: "#22C55E",
  SCORE_BAR: "#3B82F6",
  SCORE_TRACK: "#E2E8F0",
} as const;

export function getScoreColor(score: number): string {
  if (score <= 25) return "#EF4444";
  if (score <= 50) return "#F97316";
  if (score <= 75) return "#EAB308";
  return "#22C55E";
}

export function getScoreLevel(score: number): string {
  if (score <= 25) return "Inicial";
  if (score <= 50) return "Emergente";
  if (score <= 75) return "En Desarrollo";
  return "Avanzado";
}

export function getPillarScore(pillarData: { a_value: number; full_mark: number }[]): number {
  if (pillarData.length === 0) return 0;
  const avg = pillarData.reduce((sum, d) => sum + (d.a_value / d.full_mark) * 100, 0) / pillarData.length;
  return Math.round(avg);
}
