import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Subtask } from "@/types/roadmap-flow";
import { NodeStyleConfig } from "@/components/flow/utils/node-styles";
import { Label } from "@/components/ui/label";

export function DetailItem({
  title,
  value,
}: {
  title: string;
  value?: string | string[];
}) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  const displayValue = Array.isArray(value) ? value.join(", ") : value;

  return (
    <div className="flex flex-col text-sm">
      <span className="text-muted-foreground text-xs tracking-wider uppercase">
        {title}
      </span>
      <span className="font-medium">{displayValue}</span>
    </div>
  );
}

export function CheckList({
  title,
  items,
  accentColor = "text-gray-500",
}: {
  title: string;
  items?: string[];
  accentColor?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <Separator className="my-4" />
      <div>
        <div className="mb-2 text-sm font-semibold">{title}</div>
        <ul className="space-y-1.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center text-sm">
              <Check
                className={cn("mr-2 size-4 shrink-0 opacity-70", accentColor)}
              />
              <span className="text-muted-foreground text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function ActionTags({
  actions,
  tools,
  styles,
}: {
  actions?: string[];
  tools?: string[];
  styles: NodeStyleConfig;
}) {
  if ((!actions || actions.length === 0) && (!tools || tools.length === 0))
    return null;

  return (
    <>
      <Separator className="my-4" />
      <div className="space-y-4">
        {actions && actions.length > 0 && (
          <div>
            <div className="mb-2 text-sm font-semibold">Acciones clave</div>
            <div className="flex flex-wrap gap-2">
              {actions.map((a, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className={cn(
                    "hover:bg-secondary/80 text-xs font-semibold",
                    styles.defaultBorder,
                  )}
                >
                  {a}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {tools && tools.length > 0 && (
          <div>
            <div className="mb-2 text-sm font-semibold">
              Herramientas/Tecnologías
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((t, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className={cn("text-xs font-medium", styles.defaultBorder)}
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export function KpiGrid({
  kpis,
  styles,
}: {
  kpis?: string[];
  styles: NodeStyleConfig;
}) {
  if (!kpis || kpis.length === 0) return null;

  return (
    <div className="space-y-4">
      <Separator />
      <h3
        className={cn(
          "mb-3 border-l-4 pl-2 text-lg font-bold",
          styles.defaultBorder,
        )}
      >
        Indicadores Clave (KPIs)
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {kpis.map((k, i) => (
          <Badge
            key={i}
            variant="secondary"
            className={cn(
              "bg-card flex w-full flex-col items-start justify-between rounded-lg p-3 shadow-sm",
              styles.defaultBorder,
            )}
          >
            <p className="text-sm font-medium text-balance">{k}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Métrica de éxito
            </p>
          </Badge>
        ))}
      </div>
    </div>
  );
}


export function SubtaskList({
  subtasks,
  styles,
  onToggle,
  idPrefix,
}: {
  subtasks: Subtask[];
  styles: NodeStyleConfig;
  onToggle: (id: string) => void;
  idPrefix: string;
}) {
  if (!subtasks || subtasks.length === 0) return null;

  return (
    <div>
      <h3
        className={cn(
          "mb-3 border-l-4 pl-2 text-lg font-bold",
          styles.defaultBorder,
        )}
      >
        Subtareas Pendientes
      </h3>

      <ul className="space-y-3">
        {subtasks.map((s) => {
          const isDone = s.status === "done";
          const inputId = `sub-${idPrefix}-${s.id}`;

          return (
            <li key={s.id}>
              <Label
                htmlFor={inputId}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-all hover:shadow-md",
                  isDone && [styles.doneBorder, styles.base],
                )}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={inputId}
                    checked={isDone}
                    onCheckedChange={() => onToggle(s.id)}
                    className={cn(
                      "pointer-events-none size-5 transition-colors",
                      styles.defaultBorder,
                    )}
                    aria-label={`Toggle subtask ${s.title}`}
                  />
                  <span
                    className={cn(
                      "pointer-events-none text-sm font-medium transition-colors",
                      isDone && "text-muted-foreground line-through",
                    )}
                  >
                    {s.title}
                  </span>
                </div>

                {s.effort && (
                  <Badge
                    className={cn(
                      "text-xs transition-opacity",
                      isDone && "opacity-50",
                    )}
                    variant={isDone ? "secondary" : "outline"}
                  >
                    {s.effort}
                  </Badge>
                )}
              </Label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}