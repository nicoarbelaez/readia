import type { RoadmapQueryResult, RoadmapNodeRaw } from "@/hooks/use-roadmap-query";
import type { RoadmapPhase, RoadmapInitiative } from "@/report/types";

function ownerToString(owner: string | string[]): string {
  return Array.isArray(owner) ? owner.join(", ") : (owner ?? "");
}

function buildInitiative(n: RoadmapNodeRaw): RoadmapInitiative {
  return {
    id: n.id,
    label: n.label,
    nodeType: n.node_type,
    owner: ownerToString(n.owner),
    timeline: n.timeline ?? "",
    description: n.description ?? "",
    objectives: n.objectives ?? [],
    kpis: n.kpis ?? [],
  };
}

export function buildPhasesFromRoadmap(roadmap: RoadmapQueryResult): RoadmapPhase[] {
  const nodeMap = new Map<string, RoadmapNodeRaw>(
    roadmap.roadmap_nodes.map((n) => [n.id, n])
  );

  const childrenOf = new Map<string, string[]>();
  const parentsOf = new Map<string, string[]>();

  for (const edge of roadmap.roadmap_edges) {
    if (!childrenOf.has(edge.source)) childrenOf.set(edge.source, []);
    childrenOf.get(edge.source)!.push(edge.target);
    if (!parentsOf.has(edge.target)) parentsOf.set(edge.target, []);
    parentsOf.get(edge.target)!.push(edge.source);
  }

  const phaseNodes = roadmap.roadmap_nodes.filter((n) => n.node_type === "Phase");

  return phaseNodes.map((phase) => {
    const visited = new Set<string>();
    const queue: string[] = [...(childrenOf.get(phase.id) ?? [])];

    while (queue.length > 0) {
      const id = queue.shift()!;
      if (visited.has(id)) continue;
      visited.add(id);
      const children = childrenOf.get(id) ?? [];
      queue.push(...children);
    }

    const initiatives = [...visited]
      .map((id) => nodeMap.get(id))
      .filter((n): n is RoadmapNodeRaw => !!n && n.node_type !== "Phase")
      .map(buildInitiative);

    const phaseDependencies = (parentsOf.get(phase.id) ?? [])
      .map((id) => nodeMap.get(id)?.label ?? id)
      .filter(Boolean);

    return {
      id: phase.id,
      label: phase.label,
      timeline: phase.timeline ?? "",
      objective: phase.short_description ?? "",
      initiatives,
      dependencies: phaseDependencies,
    };
  });
}

export function parseTimelineMonths(timeline: string): { start: number; end: number } | null {
  if (!timeline) return null;
  const clean = timeline.toLowerCase().replace(/meses?\s*/g, "").trim();
  const rangeMatch = clean.match(/^(\d+)\s*[-–]\s*(\d+)$/);
  if (rangeMatch) {
    return { start: parseInt(rangeMatch[1]), end: parseInt(rangeMatch[2]) };
  }
  const singleMatch = clean.match(/^(\d+)$/);
  if (singleMatch) {
    const m = parseInt(singleMatch[1]);
    return { start: m, end: m };
  }
  return null;
}
