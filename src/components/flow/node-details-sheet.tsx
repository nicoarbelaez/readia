import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ListChecks, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Data, Details, Subtask } from "@/types/roadmap-flow";
import { ICON_MAP, NODE_STYLES } from "@/components/flow/utils/node-styles";
import { NodeStatusToggle } from "@/components/flow/shared/node-status-toggle";
import { updateSubtaskStatus } from "@/app/actions/roadmap-actions";
import {
  ActionTags,
  CheckList,
  DetailItem,
  KpiGrid,
  SubtaskList,
} from "@/components/flow/helper-details-sheet";
import ReactMarkdown from "react-markdown";

interface NodeDetailsSheetProps {
  id: string;
  data: Data;
  onDoneChange?: (isDone: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  setNodeData?: (nodeData: Details) => void;
  nodeData: Details;
}

export function NodeDetailsSheet({
  id,
  data,
  nodeData,
  onDoneChange,
  side = "right",
}: NodeDetailsSheetProps) {
  const [done, setDone] = React.useState(nodeData.isDone || false);
  const [subtasks, setSubtasks] = React.useState<Subtask[]>(
    () => nodeData.subtasks ?? [],
  );

  React.useEffect(() => {
    setDone(nodeData.isDone || false);
    if (nodeData.subtasks) {
      setSubtasks(nodeData.subtasks);
    }
  }, [nodeData]);

  const nodeType = nodeData.nodeType || "Task";
  const styles = NODE_STYLES[nodeType] || NODE_STYLES.Task;
  const Icon = ICON_MAP[nodeType] || ClipboardCheck;

  const toggleSubtask = async (subtaskId: string) => {
    const updatedSubtasks = subtasks.map((s) => {
      if (s.id === subtaskId) {
        const newStatus: Subtask["status"] =
          s.status === "done" ? "todo" : "done";
        return { ...s, status: newStatus };
      }
      return s;
    });

    setSubtasks(updatedSubtasks);

    const allSubtasksDone = updatedSubtasks.every((s) => s.status === "done");

    if (allSubtasksDone && !done) {
      handleDoneChange(true);
    }
    if (!allSubtasksDone && done) {
      handleDoneChange(false);
    }

    const subtask = updatedSubtasks.find((s) => s.id === subtaskId);
    if (subtask) {
      const subtaskStatus: Subtask["status"] =
        subtask.status === "done" ? "todo" : "done";
      await updateSubtaskStatus(id, subtaskId, subtaskStatus);
    }
  };

  const handleDoneChange = async (checked: boolean) => {
    setDone(checked);
    if (onDoneChange) onDoneChange(checked);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("h-7 cursor-pointer text-xs transition-colors")}
        >
          <ListChecks className="mr-1 size-3" />
          Ver Detalles
        </Button>
      </SheetTrigger>
      <SheetContent
        side={side}
        className="bg-background/80 flex w-full flex-col backdrop-blur-sm sm:max-w-xl"
      >
        <SheetHeader>
          <div className="mb-2 flex items-center gap-2">
            <Icon className={cn("size-5", styles.color)} aria-hidden="true" />
            <Badge
              variant="outline"
              className={cn("text-tiny border-current", styles.color)}
            >
              {nodeType}
            </Badge>
          </div>

          <SheetTitle className="leading-snug">{data.label}</SheetTitle>

          {nodeData.shortDescription && (
            <SheetDescription className="text-muted-foreground">
              {nodeData.shortDescription}
            </SheetDescription>
          )}
        </SheetHeader>

        <Separator className="mx-3" />

        <ScrollArea className="h-full overflow-y-auto px-4">
          <div className="flex flex-wrap gap-4">
            <DetailItem title="Responsable" value={nodeData.owner} />
            <DetailItem title="Plazo" value={nodeData.timeline} />
          </div>

          {nodeData.description && (
            <div className="prose prose-slate dark:prose-invert prose-sm mt-3">
              <ReactMarkdown>{nodeData.description}</ReactMarkdown>
            </div>
          )}

          <div className="flex-1">
            <div className="space-y-6">
              <CheckList
                title="Objetivos/Deliverables"
                items={nodeData.objectives}
                accentColor={styles.color}
              />

              <ActionTags
                actions={nodeData.actions}
                tools={nodeData.tools}
                styles={styles}
              />

              <KpiGrid kpis={nodeData.kpis} styles={styles} />

              <SubtaskList
                subtasks={subtasks}
                styles={styles}
                onToggle={toggleSubtask}
                idPrefix={id}
              />

              <CheckList
                title="Siguientes Pasos"
                items={nodeData.nextSteps}
                accentColor={styles.color}
              />
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="mt-auto flex flex-row items-center justify-between border-t pt-4">
          <NodeStatusToggle
            id={id}
            isDone={done}
            onToggle={handleDoneChange}
            label="Marcar como completado"
            doneLabel="Completado"
          />

          <SheetClose asChild>
            <Button variant="secondary">Cerrar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
