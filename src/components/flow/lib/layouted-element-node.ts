import { Position } from "@xyflow/react";
import dagre from "dagre";
import { RoadmapFlowProps } from "@/components/flow/flow-client";
import { ReactFlowEdges, ReactFlowNode } from "@/types/roadmap-flow";

type LayoutedElements = RoadmapFlowProps & {
  direction?: string;
  dagreGraph: dagre.graphlib.Graph;
  nodeWidth: number;
  nodeHeight: number;
};

type LayoutedElementsResult = {
  nodes: ReactFlowNode[];
  edges: ReactFlowEdges[];
};

export function getLayoutedElements({
  nodes: oldNodes,
  edges: oldEdges,
  direction,
  dagreGraph,
  nodeWidth,
  nodeHeight,
}: LayoutedElements): LayoutedElementsResult {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  const parentIds = new Set<string>();
  const childIds = new Set<string>();

  oldEdges.forEach((edge) => {
    parentIds.add(edge.source);
    childIds.add(edge.target);
  });

  // 1. Añadir Nodos al Grafo Dagre con dimensiones
  oldNodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // 2. Añadir Aristas al Grafo Dagre
  oldEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // 3. Ejecutar el cálculo del layout de Dagre
  dagre.layout(dagreGraph);

  // 4. Aplicar las posiciones calculadas y actualizar la data del nodo
  const layoutedNodes = oldNodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    // Ajustamos la posición para centrar el nodo
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    // Ajustar Handles según dirección
    if (isHorizontal) {
      node.targetPosition = Position.Left;
      node.sourcePosition = Position.Right;
    }

    node.data = {
      ...node.data,
      isParent: parentIds.has(node.id),
      isChild: childIds.has(node.id),
    };

    return node;
  });

  return { nodes: layoutedNodes, edges: oldEdges };
}
