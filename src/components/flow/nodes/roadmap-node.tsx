"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { ClipboardCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { NodeDetailsSheet } from "@/components/flow/node-details-sheet";
import { ReactFlowNode, Details, Subtask } from "@/types/roadmap-flow";
import { Separator } from "@/components/ui/separator";
import { ICON_MAP, NODE_STYLES } from "@/components/flow/utils/node-styles";
import { NodeStatusToggle } from "@/components/flow/shared/node-status-toggle";
import {
  updateNodeStatus,
  updateNodeWithSubtasks,
} from "@/app/actions/roadmap-actions";
import { useDebouncedCallback } from "use-debounce";

const HANDLE_CLASS =
  "!size-2 !rounded-full !border-none transition-all duration-300";

const RoadmapNode = ({
  data,
  id,
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
  isConnectable,
}: NodeProps<ReactFlowNode>) => {
  const [nodeData, setNodeData] = useState<Details>(data.details);

  useEffect(() => {
    setNodeData(data.details);
  }, [data.details]);

  const isDone = !!nodeData.isDone;
  const nodeType = nodeData.nodeType || "Task";

  const Icon = ICON_MAP[nodeType] || ClipboardCheck;
  const styles = NODE_STYLES[nodeType] || NODE_STYLES.Task;

  const debouncedUpdate = useDebouncedCallback(
    async (id: string, checked: boolean, subtasks?: Subtask[]) => {
      if (subtasks && subtasks.length > 0) {
        await updateNodeWithSubtasks(id, checked, subtasks);
      } else {
        await updateNodeStatus(id, checked);
      }
    },
    500,
  );

  const handleDoneChange = async (checked: boolean) => {
    const updatedSubtasks = nodeData.subtasks?.map((s) => ({
      ...s,
      status: checked ? "done" : "todo",
    })) as Subtask[];

    setNodeData((prev) => ({
      ...prev,
      isDone: checked,
      subtasks: updatedSubtasks,
    }));

    debouncedUpdate(id, checked, updatedSubtasks);
  };

  const ownerDisplay = useMemo(() => {
    if (!nodeData.owner) return null;
    return Array.isArray(nodeData.owner)
      ? nodeData.owner.join(", ")
      : nodeData.owner;
  }, [nodeData.owner]);

  return (
    <Card
      className={cn(
        "max-h-96 w-80 border-2 shadow-md transition-all duration-300 hover:scale-105",
        styles.base,
        isDone ? styles.doneBorder : styles.defaultBorder,
        isDone && "border-dashed opacity-90 grayscale-[0.2]",
      )}
    >
      {data.isChild && (
        <Handle
          type="target"
          position={targetPosition}
          isConnectable={isConnectable}
          className={cn(
            HANDLE_CLASS,
            "!bg-primary outline-2 outline-offset-2 outline-solid",
          )}
        />
      )}

      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="text-tiny tracking-wider uppercase shadow-sm"
          >
            {nodeType}
          </Badge>
          <Icon className="size-5 opacity-80" aria-hidden="true" />
        </div>

        <CardTitle className="line-clamp-2 text-lg leading-tight font-bold">
          {data.label}
        </CardTitle>

        {ownerDisplay && (
          <CardDescription>
            Responsable:{" "}
            <span className="text-foreground font-medium">{ownerDisplay}</span>
          </CardDescription>
        )}

        {nodeData.timeline && (
          <Badge variant="outline" className="text-tiny">
            {nodeData.timeline}
          </Badge>
        )}
      </CardHeader>

      {nodeData.description && (
        <CardContent>
          <Separator className="mb-2" />
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {nodeData.description}
          </p>
        </CardContent>
      )}

      <CardFooter className="flex items-center justify-between gap-3 bg-black/5 px-4 py-3 dark:bg-white/5">
        <NodeStatusToggle id={id} isDone={isDone} onToggle={handleDoneChange} />

        <NodeDetailsSheet
          id={id}
          data={data}
          nodeData={nodeData}
          setNodeData={setNodeData}
          onDoneChange={handleDoneChange}
        />
      </CardFooter>

      {data.isParent && (
        <Handle
          type="source"
          position={sourcePosition}
          isConnectable={isConnectable}
          className={cn(
            HANDLE_CLASS,
            "!bg-ring outline-2 outline-offset-2 outline-dashed",
          )}
        />
      )}
    </Card>
  );
};

export default memo(RoadmapNode);
