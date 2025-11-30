// src/types/roadmap-flow.ts
import type { Node, Edge, NodeProps } from "@xyflow/react";
import type { ComponentType } from "react";

export type NodeCustomType = "CustomNode";

export type RoadmapNodeType =
  | "Phase"
  | "Goal"
  | "Task"
  | "Artifact"
  | "Component";

export interface Subtask {
  id: string;
  title: string;
  effort?: string;
  assignee?: string;
  status?: "todo" | "done";
}

export interface Details {
  nodeType: RoadmapNodeType;
  shortDescription: string;
  description?: string; //Markdown
  owner: string | string[];
  objectives?: string[];
  actions?: string[];
  tools?: string[];
  kpis?: string[];
  nextSteps?: string[];
  isDone?: boolean;
  timeline?: string;
  subtasks?: Subtask[];
}

export type Data = {
  label: string;
  details: Details;
  isParent?: boolean;
  isChild?: boolean;
};

export type ReactFlowNode = Node<Data> & {
  type: NodeCustomType;
};

export type ReactFlowEdges = Edge;

export type NodeTypesMap<T extends string> = {
  [K in T]?: ComponentType<NodeProps<ReactFlowNode>>;
};
