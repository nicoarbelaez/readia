import { useState, useCallback } from "react";
import { useBusinessStore } from "@/stores/use-business-store";
import { useDiagnosticQuery } from "@/hooks/use-diagnostic-query";
import { useRoadmapQuery } from "@/hooks/use-roadmap-query";
import { buildPhasesFromRoadmap } from "@/report/utils/build-phases";
import type { ReportData } from "@/report/types";

export function usePdfReport(businessId: number | null) {
  const { activeBusiness } = useBusinessStore();
  const { data: diagnostic } = useDiagnosticQuery(businessId);
  const { data: roadmap } = useRoadmapQuery(businessId);
  const [isGenerating, setIsGenerating] = useState(false);

  const download = useCallback(async () => {
    if (!activeBusiness || !diagnostic) return;
    setIsGenerating(true);
    try {
      const roadmapPhases = roadmap ? buildPhasesFromRoadmap(roadmap) : null;
      const reportData: ReportData = {
        business: activeBusiness,
        diagnostic,
        roadmapPhases,
      };

      const { pdf } = await import("@react-pdf/renderer");
      const { DiagnosticReport } = await import("@/report/DiagnosticReport");

      const blob = await pdf(<DiagnosticReport data={reportData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `diagnostico-${activeBusiness.companyName.replace(/\s+/g, "-")}-${Date.now()}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  }, [activeBusiness, diagnostic, roadmap]);

  return { download, isGenerating };
}
