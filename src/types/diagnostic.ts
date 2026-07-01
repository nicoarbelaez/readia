export interface DiagnosticPillarData {
  subject: string;
  a_value: number;
  full_mark: number;
}

export interface DiagnosticPillar {
  title: string;
  description: string;
  diagnostic_pillar_data: DiagnosticPillarData[];
}

export interface DiagnosticDistribution {
  name: string;
  value: number;
  color: string;
}

export interface DiagnosticRecommendation {
  text: string;
  priority: "Alta" | "Media" | "Baja";
  category: string;
}

export interface DiagnosticData {
  id: string;
  overall_score: number;
  score_label: string;
  score_description: string;
  conclusions_markdown: string;
  created_at: string;
  diagnostic_pillars: DiagnosticPillar[];
  diagnostic_distributions: DiagnosticDistribution[];
  diagnostic_recommendations: DiagnosticRecommendation[];
}
