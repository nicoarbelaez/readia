/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { useDiagnosticStore } from "@/stores/use-diagnostic-store";
import { useGenerationStore } from "@/stores/use-generation-store";
import { useEffect } from "react";

export function useDiagnosticQuery(businessId: number | null) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { setIsGenerating } = useDiagnosticStore();
  const status = useGenerationStore((state) => state.getStatus(businessId));

  const query = useQuery({
    queryKey: ["diagnostic", businessId],
    queryFn: async () => {
      if (!businessId) return null;
      const { data: diag, error } = await (supabase
        .schema("public_web") as any)
        .from("diagnostics")
        .select(`
          id, overall_score, score_label, score_description, conclusions_markdown, created_at,
          diagnostic_pillars (title, description, diagnostic_pillar_data (subject, a_value, full_mark)),
          diagnostic_distributions (name, value, color),
          diagnostic_recommendations (text, priority, category)
        `)
        .eq("business_id", businessId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single() as any;

      if (error && error.code !== "PGRST116") throw error;
      return diag || null;
    },
    enabled: !!businessId,
    // Poll every 3 seconds if status is "diagnostic" and we don't have data yet
    refetchInterval: (query) => {
      const hasData = !!query.state.data;
      return status === "diagnostic" && !hasData ? 3000 : false;
    },
  });

  // Clear "diagnostic" status when data is successfully fetched
  useEffect(() => {
    if (query.data && status === "diagnostic" && businessId) {
      useGenerationStore.getState().setStatus(businessId, "idle");
    }
  }, [query.data, status, businessId]);

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      setIsGenerating(true);
      const { data, error } = await supabase.functions.invoke(
        "generate-diagnostic",
        {
          body: { businessId: id },
        },
      );
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostic", businessId] });
      queryClient.invalidateQueries({ queryKey: ["roadmap", businessId] });
    },
    onSettled: () => {
      setIsGenerating(false);
    },
  });

  return { ...query, generateMutation: mutation };
}
