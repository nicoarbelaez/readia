"use client";

import React from "react";
import { Map, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { LoadingScreen } from "@/components/diagnostic/loading-screen";
import { ScoreCard } from "@/components/diagnostic/score-card";
import { RecommendationsPanel } from "@/components/diagnostic/recommendations-panel";
import { RadarCard } from "@/components/diagnostic/radar-card";
import { DistributionChart } from "@/components/diagnostic/distribution-chart";
import { ConclusionsBook } from "@/components/diagnostic/conclusions-book";
import { SponsorCard } from "@/components/diagnostic/sponsor-card";
import { useDiagnosticQuery } from "@/hooks/use-diagnostic-query";
import { useBusinessStore } from "@/stores/use-business-store";
import { useGenerationStore } from "@/stores/use-generation-store";
import { triggerManualDiagnostic } from "@/hooks/use-create-business-profile";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

import { Spinner } from "@/components/ui/spinner";

function GenerateDiagnosticButton({
  businessId,
  variant = "default",
  label = "Generar Diagnóstico (AI)",
}: {
  businessId: number;
  variant?: "default" | "outline" | "secondary";
  label?: string;
}) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const status = useGenerationStore((state) => state.getStatus(businessId));
  const isGenerating = status === "diagnostic";
  // Disable while any other generation is in progress to avoid conflicts
  const isBlocked = status === "roadmap";

  return (
    <Button
      variant={variant}
      onClick={() => {
        triggerManualDiagnostic(businessId, supabase, queryClient);
      }}
      disabled={isGenerating || isBlocked}
      className="flex items-center gap-2"
    >
      {isGenerating && <Spinner className="size-4" />}
      {isGenerating ? "Generando..." : label}
    </Button>
  );
}

export default function Diagnostic() {
  const { activeBusiness } = useBusinessStore();
  const { data, isLoading, isError } = useDiagnosticQuery(
    activeBusiness?.id || null,
  );
  const status = useGenerationStore((state) =>
    state.getStatus(activeBusiness?.id || null),
  );
  const isGenerating = status === "diagnostic";

  if (!activeBusiness) {
    return (
      <PageLayout title="Diagnóstico de Madurez" description="Análisis AICam">
        <div className="text-muted-foreground flex h-64 items-center justify-center">
          Selecciona o crea una empresa para ver su diagnóstico.
        </div>
      </PageLayout>
    );
  }

  const dynamicHeaderActions = (
    <>
      <GenerateDiagnosticButton
        businessId={activeBusiness.id}
        variant="outline"
        label="Regenerar Diagnóstico"
      />
      <Link href="/roadmap">
        <Button variant="outline" className="shadow-primary-soft/10">
          <Map className="size-4" />
          Hoja de Ruta
        </Button>
      </Link>
      <Button
        variant="secondary"
        className="shadow-primary-soft/10 flex items-center"
      >
        <Download className="size-4" />
        PDF
      </Button>
    </>
  );

  if (isLoading || (isGenerating && !data)) return <LoadingScreen />;

  if (isError) {
    return (
      <PageLayout title="Diagnóstico de Madurez" description="Análisis AICam">
        <div className="flex h-64 items-center justify-center text-red-500">
          Ocurrió un error al cargar el diagnóstico.
        </div>
      </PageLayout>
    );
  }

  if (!data) {
    const hasFailed = status === "failed_diagnostic";
    return (
      <PageLayout title="Diagnóstico de Madurez" description="Análisis AICam">
        <div className="flex h-64 flex-col items-center justify-center gap-4 px-4 text-center">
          {hasFailed ? (
            <p className="max-w-md font-medium text-red-500">
              La generación del diagnóstico con IA falló. Esto puede deberse a
              políticas de seguridad de la base de datos o problemas temporales.
            </p>
          ) : (
            <p className="text-muted-foreground">
              Aún no se ha generado un diagnóstico para esta empresa.
            </p>
          )}
          <GenerateDiagnosticButton businessId={activeBusiness.id} />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Diagnóstico de Madurez"
      description={`Análisis AICam - Generado el ${new Date(data.created_at).toLocaleDateString()}`}
      actions={dynamicHeaderActions}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2 xl:col-span-1">
          <ScoreCard
            score={data.overall_score}
            label={data.score_label}
            description={data.score_description}
          />
        </div>

        <div className="min-h-96 sm:col-start-3 sm:row-span-2 xl:col-start-1 xl:row-start-2">
          <DistributionChart data={data.diagnostic_distributions || []} />
        </div>

        <div className="row-span-2 hidden xl:block">
          <SponsorCard />
        </div>

        <div className="sm:col-span-3 sm:row-start-4 sm:max-h-96 xl:col-span-2 xl:row-span-4 xl:max-h-[856px]">
          <RecommendationsPanel
            recommendations={data.diagnostic_recommendations || []}
          />
        </div>

        {data.diagnostic_pillars && data.diagnostic_pillars.length > 0 && (
          <div className="sm:row-span-2 sm:row-start-2 xl:col-start-1 xl:row-start-4">
            <RadarCard
              title={data.diagnostic_pillars[0].title}
              description={data.diagnostic_pillars[0].description}
              data={data.diagnostic_pillars[0].diagnostic_pillar_data.map(
                (d: { subject: string; a_value: number; full_mark: number }) => ({
                  subject: d.subject,
                  A: d.a_value,
                  fullMark: d.full_mark,
                }),
              )}
            />
          </div>
        )}

        {data.diagnostic_pillars && data.diagnostic_pillars.length > 1 && (
          <div className="sm:row-span-2 sm:row-start-2 xl:col-start-2 xl:row-start-3">
            <RadarCard
              title={data.diagnostic_pillars[1].title}
              description={data.diagnostic_pillars[1].description}
              data={data.diagnostic_pillars[1].diagnostic_pillar_data.map(
                (d: { subject: string; a_value: number; full_mark: number }) => ({
                  subject: d.subject,
                  A: d.a_value,
                  fullMark: d.full_mark,
                }),
              )}
            />
          </div>
        )}

        {data.diagnostic_pillars && data.diagnostic_pillars.length > 2 && (
          <div className="sm:col-start-3 sm:row-start-3 xl:col-span-3 xl:col-start-2 xl:row-start-5">
            <RadarCard
              title={data.diagnostic_pillars[2].title}
              description={data.diagnostic_pillars[2].description}
              data={data.diagnostic_pillars[2].diagnostic_pillar_data.map(
                (d: { subject: string; a_value: number; full_mark: number }) => ({
                  subject: d.subject,
                  A: d.a_value,
                  fullMark: d.full_mark,
                }),
              )}
              wide={true}
            />
          </div>
        )}

        <div className="sm:col-span-4 sm:row-start-6">
          <ConclusionsBook markdown={data.conclusions_markdown} />
        </div>
      </div>
    </PageLayout>
  );
}
