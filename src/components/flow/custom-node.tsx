"use client";
import { NodeProps, Handle, Position } from "@xyflow/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReadmapNodeSheet } from "@/components/flow/roadmap-node-sheet";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ReactFlowEdges, ReactFlowNode } from "@/types/roadmap-flow";


export default function CustomNode({
  data,
  id,
  positionAbsoluteX,
  positionAbsoluteY,
}: NodeProps<ReactFlowNode>) {

  console.log({
    data,
    id,
    positionAbsoluteX,
    positionAbsoluteY,
  });

  return (
    <>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{data.label}</CardTitle>
          <CardDescription>{data.details.description}</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent>
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex items-center justify-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="font-normal">
                ¿Hecho?
              </Label>
            </div>

            <ReadmapNodeSheet data={data}/>
          </div>
        </CardContent>
      </Card>

      <Handle type="target" position={Position.Top} className="!bg-secondary" />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-secondary"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-secondary"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="!bg-secondary"
      />
    </>
  );
}
