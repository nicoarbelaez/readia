"use client";

import FlowClient from "@/components/flow/flow-client";
import { useRoadmapQuery } from "@/hooks/use-roadmap-query";
import type { RoadmapNodeRaw } from "@/hooks/use-roadmap-query";
import type { RoadmapNodeType, NodeCustomType } from "@/types/roadmap-flow";
import { useBusinessStore } from "@/stores/use-business-store";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PageLayout } from "@/components/page-layout";
import { useGenerationStore } from "@/stores/use-generation-store";
import { triggerManualRoadmap } from "@/hooks/use-create-business-profile";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useDiagnosticQuery } from "@/hooks/use-diagnostic-query";
import Link from "next/link";
import { Map } from "lucide-react";

// ---------------------------------------------------------------------------
// Mini-component: GenerateRoadmapButton
// Only renders if a diagnostic already exists for the business.
// ---------------------------------------------------------------------------
function GenerateRoadmapButton({
  businessId,
  hasDiagnostic,
  variant = "default",
  label = "Generar Hoja de Ruta (AI)",
}: {
  businessId: number;
  hasDiagnostic: boolean;
  variant?: "default" | "outline" | "secondary";
  label?: string;
}) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const status = useGenerationStore((state) => state.getStatus(businessId));
  const isGenerating = status === "roadmap";
  // Disable while a diagnostic is generating too (they share the same business)
  const isBlocked = status === "diagnostic";

  // Guard: only render when a diagnostic exists
  if (!hasDiagnostic) return null;

  return (
    <Button
      variant={variant}
      onClick={() => {
        triggerManualRoadmap(businessId, supabase, queryClient);
      }}
      disabled={isGenerating || isBlocked}
      className="flex items-center gap-2"
    >
      {isGenerating ? (
        <Spinner className="size-4" />
      ) : (
        <Map className="size-4" />
      )}
      {isGenerating ? "Generando..." : label}
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function RoadMap() {
  const { activeBusiness } = useBusinessStore();
  const { data, isLoading, isError } = useRoadmapQuery(
    activeBusiness?.id || null,
  );
  const { data: diagnostic, isLoading: isDiagLoading } = useDiagnosticQuery(
    activeBusiness?.id || null,
  );
  const status = useGenerationStore((state) =>
    state.getStatus(activeBusiness?.id || null),
  );

  const isDiagGenerating = status === "diagnostic";
  const isRoadmapGenerating = status === "roadmap";
  const hasDiagnostic = Boolean(diagnostic);
  const hasRoadmapData = Boolean(
    data && data.roadmap_nodes && data.roadmap_nodes.length > 0,
  );

  // ── No business selected
  if (!activeBusiness) {
    return (
      <PageLayout
        title="Hoja de Ruta"
        description="Roadmap de implementación AI"
      >
        <div className="text-muted-foreground flex h-64 items-center justify-center">
          Selecciona o crea una empresa para ver su hoja de ruta.
        </div>
      </PageLayout>
    );
  }

  // ── Header actions (shown on the loaded state)
  const dynamicHeaderActions = (
    <>
      <GenerateRoadmapButton
        businessId={activeBusiness.id}
        hasDiagnostic={hasDiagnostic}
        variant="outline"
        label="Regenerar Hoja de Ruta"
      />
    </>
  );

  // ── Diagnostic still generating
  if (isDiagGenerating && !hasRoadmapData) {
    return (
      <PageLayout
        title="Hoja de Ruta"
        description="Roadmap de implementación AI"
      >
        <div className="flex h-64 flex-col items-center justify-center gap-4">
          <Spinner className="size-8" />
          <span className="text-muted-foreground animate-pulse font-medium">
            Esperando a que finalice la generación del diagnóstico...
          </span>
        </div>
      </PageLayout>
    );
  }

  // ── Roadmap still generating
  if (isRoadmapGenerating && !hasRoadmapData) {
    return (
      <PageLayout
        title="Hoja de Ruta"
        description="Roadmap de implementación AI"
      >
        <div className="flex h-64 flex-col items-center justify-center gap-4">
          <Spinner className="size-8" />
          <span className="text-muted-foreground animate-pulse font-medium">
            Construyendo hoja de ruta con IA...
          </span>
        </div>
      </PageLayout>
    );
  }

  // ── Standard query loading
  if (isLoading || isDiagLoading) {
    return (
      <PageLayout
        title="Hoja de Ruta"
        description="Roadmap de implementación AI"
      >
        <div className="flex h-64 flex-col items-center justify-center gap-4">
          <Spinner className="size-8" />
          <span className="text-muted-foreground">Cargando datos...</span>
        </div>
      </PageLayout>
    );
  }

  // ── Error
  if (isError) {
    return (
      <PageLayout
        title="Hoja de Ruta"
        description="Roadmap de implementación AI"
      >
        <div className="flex h-64 items-center justify-center text-red-500">
          Ocurrió un error al cargar la hoja de ruta.
        </div>
      </PageLayout>
    );
  }

  // ── No diagnostic exists yet
  if (!diagnostic) {
    const hasDiagFailed = status === "failed_diagnostic";
    return (
      <PageLayout
        title="Hoja de Ruta"
        description="Roadmap de implementación AI"
      >
        <div className="flex h-64 flex-col items-center justify-center gap-4 px-4 text-center">
          {hasDiagFailed ? (
            <p className="max-w-md font-medium text-red-500">
              La generación del diagnóstico falló. Por favor, corrígelo o
              reinténtalo en la página de diagnóstico primero.
            </p>
          ) : (
            <p className="text-muted-foreground max-w-md">
              Para poder generar la hoja de ruta, primero necesitas contar con
              un diagnóstico generado para esta empresa.
            </p>
          )}
          <Link href="/diagnostic">
            <Button>Ir a Diagnóstico</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // ── No roadmap yet (diagnostic exists)
  if (!data || !data.roadmap_nodes || data.roadmap_nodes.length === 0) {
    const hasFailed = status === "failed_roadmap";
    return (
      <PageLayout
        title="Hoja de Ruta"
        description="Roadmap de implementación AI"
      >
        <div className="flex h-64 flex-col items-center justify-center gap-4 px-4 text-center">
          {hasFailed ? (
            <p className="max-w-md font-medium text-red-500">
              La generación de la hoja de ruta falló. Esto puede deberse a
              políticas de seguridad de la base de datos o problemas temporales.
            </p>
          ) : (
            <p className="text-muted-foreground">
              Aún no se ha generado una hoja de ruta para esta empresa.
            </p>
          )}
          {/* Button renders because hasDiagnostic === true here */}
          <GenerateRoadmapButton
            businessId={activeBusiness.id}
            hasDiagnostic={hasDiagnostic}
          />
        </div>
      </PageLayout>
    );
  }

  // ── Loaded
  const nodes = data.roadmap_nodes.map((n: RoadmapNodeRaw) => ({
    id: n.id,
    type: n.type as NodeCustomType,
    position: { x: n.position_x, y: n.position_y },
    data: {
      label: n.label,
      details: {
        nodeType: n.node_type as RoadmapNodeType,
        shortDescription: n.short_description,
        description: n.description ?? undefined,
        owner: n.owner,
        objectives: n.objectives ?? undefined,
        actions: n.actions ?? undefined,
        tools: n.tools ?? undefined,
        kpis: n.kpis ?? undefined,
        nextSteps: n.next_steps ?? undefined,
        timeline: n.timeline ?? undefined,
        isDone: n.is_done,
        subtasks: n.subtasks ?? undefined,
      },
    },
  }));

  console.log("Hoja de Ruta");
  console.log(data);
  return (
    <PageLayout
      title="Hoja de Ruta"
      description={`Roadmap de implementación AI - Generado el ${new Date(data.created_at).toLocaleDateString()}`}
      actions={dynamicHeaderActions}
    >
      <div className="h-[calc(100vh-140px)] w-full">
        <FlowClient nodes={nodes} edges={data.roadmap_edges} />
      </div>
    </PageLayout>
  );
}
