import {
  Building2,
  Trophy,
  ClipboardCheck,
  FileText,
  Box,
  LucideIcon,
} from "lucide-react";
import { RoadmapNodeType } from "@/types/roadmap-flow";

export type NodeStyleConfig = {
  base: string;
  doneBorder: string;
  defaultBorder: string;
  color: string;
};

export const ICON_MAP: Record<RoadmapNodeType, LucideIcon> = {
  Phase: Building2,
  Goal: Trophy,
  Task: ClipboardCheck,
  Artifact: FileText,
  Component: Box,
};

export const NODE_STYLES: Record<RoadmapNodeType, NodeStyleConfig> = {
  Phase: {
    base: "bg-primary-foreground/90 shadow-primary/10",
    doneBorder: "border-primary",
    defaultBorder: "border-primary/50",
    color: "text-primary",
  },
  Goal: {
    base: "bg-yellow-50/90 dark:bg-yellow-900/40 shadow-yellow-500/10",
    doneBorder: "border-yellow-600",
    defaultBorder: "border-yellow-500/50",
    color: "text-yellow-600 dark:text-yellow-400",
  },
  Task: {
    base: "bg-white dark:bg-gray-800 shadow-indigo-500/10",
    doneBorder: "border-indigo-600",
    defaultBorder: "border-indigo-400/50",
    color: "text-indigo-600 dark:text-indigo-400",
  },
  Artifact: {
    base: "bg-blue-50/90 dark:bg-blue-900/40 shadow-blue-500/10",
    doneBorder: "border-blue-600",
    defaultBorder: "border-blue-400/50",
    color: "text-blue-600 dark:text-blue-400",
  },
  Component: {
    base: "bg-purple-50/90 dark:bg-purple-900/40 shadow-purple-500/10",
    doneBorder: "border-purple-600",
    defaultBorder: "border-purple-400/50",
    color: "text-purple-600 dark:text-purple-400",
  },
};
