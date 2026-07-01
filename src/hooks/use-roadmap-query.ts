import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { useRoadmapStore } from "@/stores/use-roadmap-store";
import { useGenerationStore } from "@/stores/use-generation-store";
import { useEffect } from "react";
import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import type { Subtask } from "@/types/roadmap-flow";

export interface RoadmapNodeRaw {
  id: string;
  type: string;
  position_x: number;
  position_y: number;
  label: string;
  node_type: string;
  short_description: string;
  description: string | null;
  owner: string | string[];
  objectives: string[] | null;
  actions: string[] | null;
  tools: string[] | null;
  kpis: string[] | null;
  next_steps: string[] | null;
  is_done: boolean;
  timeline: string | null;
  subtasks: Subtask[] | null;
}

interface RoadmapEdgeRaw {
  id: string;
  source: string;
  target: string;
  animated: boolean;
}

export interface RoadmapQueryResult {
  id: string;
  created_at: string;
  roadmap_nodes: RoadmapNodeRaw[];
  roadmap_edges: RoadmapEdgeRaw[];
}

export function useRoadmapQuery(businessId: number | null) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { setIsGenerating } = useRoadmapStore();
  const status = useGenerationStore((state) => state.getStatus(businessId));

  const query = useQuery({
    queryKey: ["roadmap", businessId],
    queryFn: async () => {
      if (!businessId) return null;

      // schema("public_web") operates outside generated DB types — cast via unknown
      const schemaClient = supabase.schema(
        "public_web",
      ) as unknown as SupabaseClient;
      const { data: roadmap, error } = (await schemaClient
        .from("roadmaps")
        .select(
          `
          id, created_at,
          roadmap_nodes (id, type, position_x, position_y, label, node_type, short_description, description, owner, objectives, actions, tools, kpis, next_steps, is_done, timeline, subtasks),
          roadmap_edges (id, source, target, animated)
        `,
        )
        .eq("business_id", businessId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()) as unknown as {
        data: RoadmapQueryResult | null;
        error: PostgrestError | null;
      };

      if (error && error.code !== "PGRST116") throw error;
      return roadmap || null;
    },
    enabled: !!businessId,
    // Poll every 3 seconds if status is "roadmap" and we don't have data yet
    refetchInterval: (query) => {
      const hasData = !!query.state.data;
      return status === "roadmap" && !hasData ? 3000 : false;
    },
  });

  // Clear "roadmap" status when data is successfully fetched
  useEffect(() => {
    if (query.data && status === "roadmap" && businessId) {
      useGenerationStore.getState().setStatus(businessId, "completed");
    }
  }, [query.data, status, businessId]);

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      setIsGenerating(true);
      const { data, error } = await supabase.functions.invoke(
        "generate-roadmap",
        {
          body: { businessId: id },
        },
      );
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap", businessId] });
    },
    onSettled: () => {
      setIsGenerating(false);
    },
  });

  return { ...query, generateMutation: mutation };
}
