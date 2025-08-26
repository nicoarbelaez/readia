"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Connection,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import type {
  NodeTypesMap,
  NodeCustomType,
  ReactFlowEdges,
  ReactFlowNode,
} from "@/types/roadmap-flow";
import CustomNode from "@/components/flow/custom-node";

type Props = {
  initialNodes: ReactFlowNode[];
  initialEdges: ReactFlowEdges[];
};

export const nodeTypes: NodeTypesMap<NodeCustomType> = {
  customNode: CustomNode,
};

export default function FlowClient({ initialNodes, initialEdges }: Props) {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<ReactFlowNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { theme } = useTheme();

  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  // Actualizamos colorMode después de montar
  useEffect(() => {
    if (theme === "dark") setColorMode("dark");
    else setColorMode("light");
  }, [theme]);

  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge: Edge = {
        id: `${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
        animated: true,
      };
      setEdges((els) => addEdge(newEdge, els));
    },
    [setEdges],
  );

  return (
    // ReactFlowProvider puede envolver y compartir estado entre rutas/componentes.
    <ReactFlowProvider>
      <div className="bg-background dark:bg-background h-full w-full overflow-hidden rounded-xl border">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          colorMode={colorMode}
          nodesConnectable={false}
          fitView
        >
          <Controls />
          <Background
            style={{
              background:
                "linear-gradient(135deg, var(--background), var(--secondary))",
            }}
          />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
