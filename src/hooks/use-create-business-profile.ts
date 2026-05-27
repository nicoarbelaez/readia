import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { CompanyFormData } from "@/components/forms/company-profile/schemas/company-form-schemas";
import { createBusinessProfile } from "@/app/actions/business/business-profile-actions";
import { toast } from "sonner";
import { useGenerationStore } from "@/stores/use-generation-store";

// ─────────────────────────────────────────────────────────────────
// Helpers de generación secuencial y manual
// ─────────────────────────────────────────────────────────────────

export async function triggerSequentialGeneration(
  businessId: number,
  supabase: ReturnType<typeof createClient>,
  queryClient: ReturnType<typeof useQueryClient>,
) {
  const setStatus = useGenerationStore.getState().setStatus;

  // 1. Diagnostic Generation
  setStatus(businessId, "diagnostic");
  const diagToastId = toast.loading("Generando diagnóstico de IA…", {
    description: "Analizando las capacidades de TI de tu empresa.",
  });

  try {
    const { error: diagError } = await supabase.functions.invoke(
      "generate-diagnostic",
      {
        body: { businessId },
      },
    );
    if (diagError) throw diagError;

    // Invalidate diagnostic query
    await queryClient.invalidateQueries({
      queryKey: ["diagnostic", businessId],
    });

    toast.success("Diagnóstico generado 🎯", {
      id: diagToastId,
      description: "Tu diagnóstico de IA está listo para explorar.",
    });

    // 2. Roadmap Generation
    setStatus(businessId, "roadmap");
    const roadmapToastId = toast.loading("Generando hoja de ruta…", {
      description: "Construyendo tu plan de transformación digital.",
    });

    try {
      const { error: roadmapError } = await supabase.functions.invoke(
        "generate-roadmap",
        {
          body: { businessId },
        },
      );
      if (roadmapError) throw roadmapError;

      // Invalidate roadmap query
      await queryClient.invalidateQueries({
        queryKey: ["roadmap", businessId],
      });

      toast.success("Hoja de ruta generada 🗺️", {
        id: roadmapToastId,
        description: "Tu plan de transformación digital está listo.",
      });

      setStatus(businessId, "completed");
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setStatus(businessId, "failed_roadmap");
      toast.error("No se pudo generar la hoja de ruta", {
        id: roadmapToastId,
        description:
          "Puedes regenerarla manualmente desde la página de hoja de ruta.",
      });
    }
  } catch (err) {
    console.error("Error generating diagnostic:", err);
    setStatus(businessId, "failed_diagnostic");
    toast.error("No se pudo generar el diagnóstico", {
      id: diagToastId,
      description:
        "Puedes regenerarlo manualmente desde la página de diagnóstico.",
    });
  }
}

export async function triggerManualDiagnostic(
  businessId: number,
  supabase: ReturnType<typeof createClient>,
  queryClient: ReturnType<typeof useQueryClient>,
) {
  const setStatus = useGenerationStore.getState().setStatus;
  setStatus(businessId, "diagnostic");
  const toastId = toast.loading("Generando diagnóstico de IA…", {
    description: "Analizando las capacidades de TI de tu empresa.",
  });

  try {
    const { error } = await supabase.functions.invoke("generate-diagnostic", {
      body: { businessId },
    });
    if (error) throw error;

    await queryClient.invalidateQueries({
      queryKey: ["diagnostic", businessId],
    });
    setStatus(businessId, "idle");

    toast.success("Diagnóstico generado 🎯", {
      id: toastId,
      description: "Tu diagnóstico está listo para explorar.",
    });
  } catch (err) {
    console.error("Error generating diagnostic:", err);
    setStatus(businessId, "failed_diagnostic");
    toast.error("No se pudo generar el diagnóstico", {
      id: toastId,
      description: "Por favor intenta de nuevo.",
    });
  }
}

export async function triggerManualRoadmap(
  businessId: number,
  supabase: ReturnType<typeof createClient>,
  queryClient: ReturnType<typeof useQueryClient>,
) {
  const setStatus = useGenerationStore.getState().setStatus;
  setStatus(businessId, "roadmap");
  const toastId = toast.loading("Generando hoja de ruta…", {
    description: "Construyendo tu plan de transformación digital.",
  });

  try {
    const { error } = await supabase.functions.invoke("generate-roadmap", {
      body: { businessId },
    });
    if (error) throw error;

    await queryClient.invalidateQueries({
      queryKey: ["roadmap", businessId],
    });
    setStatus(businessId, "completed");

    toast.success("Hoja de ruta generada 🗺️", {
      id: toastId,
      description: "Tu plan de transformación digital está listo.",
    });
  } catch (err) {
    console.error("Error generating roadmap:", err);
    setStatus(businessId, "failed_roadmap");
    toast.error("No se pudo generar la hoja de ruta", {
      id: toastId,
      description: "Por favor intenta de nuevo.",
    });
  }
}

// ─────────────────────────────────────────────────────────────────
// Hook principal
// ─────────────────────────────────────────────────────────────────

interface UseCreateBusinessProfileOptions {
  /** Callback cuando la empresa se crea exitosamente (cierra el modal, resetea store, etc.) */
  onSuccess?: (businessId: number) => void;
}

export function useCreateBusinessProfile(
  options?: UseCreateBusinessProfileOptions,
) {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (formData: CompanyFormData): Promise<number> => {
      const response = await createBusinessProfile(formData);
      const data = response.data as { businessId?: number } | null | undefined;

      if (!response.success || !data?.businessId) {
        throw new Error(
          response.message || "Error al crear el perfil de empresa",
        );
      }

      return data.businessId;
    },

    onSuccess: (businessId: number) => {
      // 1. Invalidar cachés
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      queryClient.invalidateQueries({ queryKey: ["business-profile"] });

      // 2. Notificar al caller
      options?.onSuccess?.(businessId);

      // 3. Toast de empresa creada
      toast.success("¡Empresa creada exitosamente! 🏢", {
        description: "Generando diagnóstico y hoja de ruta en segundo plano…",
        duration: 4000,
      });

      // 4. Disparar generación secuencial
      triggerSequentialGeneration(businessId, supabase, queryClient);
    },

    onError: (error: Error) => {
      toast.error("Error al crear la empresa", {
        description: error.message,
        duration: 6000,
      });
    },
  });
}
