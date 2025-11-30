"use client";

import React, { useEffect, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";
import dagre from "dagre";

import type {
  NodeTypesMap,
  NodeCustomType,
  ReactFlowEdges,
  ReactFlowNode,
} from "@/types/roadmap-flow";
import RoadmapNode from "@/components/flow/nodes/roadmap-node";
import { getLayoutedElements } from "@/components/flow/lib/layouted-element-node";

export type RoadmapFlowProps = {
  nodes: ReactFlowNode[];
  edges: ReactFlowEdges[];
};

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const NODE_WIDTH = 320;
const NODE_HEIGHT = 320;
const DIRECTION = "LR";

export const nodeTypes: NodeTypesMap<NodeCustomType> = {
  CustomNode: RoadmapNode,
};

export default function RoadmapFlow({
  edges: initialEdges,
  nodes: initialNodes,
}: RoadmapFlowProps) {
  const { nodes, edges } = getLayoutedElements({
    nodes: initialNodes,
    edges: initialEdges,
    direction: DIRECTION,
    dagreGraph,
    nodeWidth: NODE_WIDTH,
    nodeHeight: NODE_HEIGHT,
  });

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const colorMode = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <ReactFlowProvider>
      <Card className="size-full overflow-hidden shadow-xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          colorMode={colorMode}
          nodesConnectable={false}
          fitView
          defaultEdgeOptions={{ type: "smoothstep" }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={12}
            size={1}
            color={colorMode === "dark" ? "#475569" : "#cbd5e1"}
          />
        </ReactFlow>
      </Card>
    </ReactFlowProvider>
  );
}
