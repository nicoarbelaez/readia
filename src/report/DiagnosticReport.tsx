import { Document } from "@react-pdf/renderer";
import type { ReportData } from "@/report/types";
import { CoverPage } from "@/report/components/CoverPage";
import { ExecutiveSummary } from "@/report/components/ExecutiveSummary";
import { PillarSection } from "@/report/components/PillarSection";
import { RecommendationsSection } from "@/report/components/RecommendationsSection";
import { ConclusionsSection } from "@/report/components/ConclusionsSection";
import { RoadmapSection } from "@/report/components/RoadmapSection";
import { GanttSection } from "@/report/components/GanttSection";
import { TargetStateSection } from "@/report/components/TargetStateSection";

interface DiagnosticReportProps {
  data: ReportData;
}

export function DiagnosticReport({ data }: DiagnosticReportProps) {
  const hasRoadmap = !!data.roadmapPhases && data.roadmapPhases.length > 0;

  return (
    <Document
      title={`Diagnóstico IA - ${data.business.companyName}`}
      author="ReadIA"
      subject="Diagnóstico de Madurez IA"
      creator="ReadIA Platform"
    >
      <CoverPage data={data} />
      <ExecutiveSummary data={data} />
      <PillarSection data={data} />
      <RecommendationsSection data={data} />
      <ConclusionsSection data={data} />
      {hasRoadmap && <RoadmapSection data={data} />}
      {hasRoadmap && <GanttSection data={data} />}
      {hasRoadmap && <TargetStateSection data={data} />}
    </Document>
  );
}
