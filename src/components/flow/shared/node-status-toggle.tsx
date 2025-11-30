import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
interface NodeStatusToggleProps {
  id: string;
  isDone: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
  doneLabel?: string;
  className?: string;
}
export function NodeStatusToggle({
  id,
  isDone,
  onToggle,
  label = "Completar",
  doneLabel = "Completado",
  className,
}: NodeStatusToggleProps) {
  return (
    <div
      className={cn(
        "-m-2 flex cursor-pointer items-center gap-2.5 rounded-lg p-2",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(!isDone);
      }}
    >
      <Checkbox
        id={`done-${id}`}
        checked={isDone}
        onCheckedChange={(checked) => onToggle(checked as boolean)}
        className={cn(
          "pointer-events-none size-5 transition-colors",
          isDone
            ? "border-green-600 bg-green-600"
            : "border-muted-foreground/50 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600",
        )}
      />
      <Label
        htmlFor={`done-${id}`}
        className={cn(
          "pointer-events-none text-sm font-medium transition-colors select-none",
          isDone
            ? "text-muted-foreground decoration-muted-foreground/50 line-through"
            : "text-foreground",
        )}
      >
        {isDone ? doneLabel : label}
      </Label>
    </div>
  );
}
