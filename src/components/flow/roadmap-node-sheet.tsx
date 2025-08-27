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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Data } from "@/types/roadmap-flow";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Componente para renderear campos de detalles
function DetailItem({
  title,
  value,
}: {
  title: string;
  value?: string | string[];
}) {
  if (!value) return null;
  return (
    <div className="space-y-1">
      <Label className="font-semibold">{title}</Label>
      {Array.isArray(value) ? (
        <ul className="text-muted-foreground list-disc pl-4 text-sm">
          {value.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground text-sm">{value}</p>
      )}
    </div>
  );
}

interface RoadmapNodeSheetProps {
  data: Data;
  onDone?: () => void;
  side?: "top" | "right" | "bottom" | "left";
}

export function ReadmapNodeSheet({
  data,
  onDone,
  side = "right",
}: RoadmapNodeSheetProps) {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (done && onDone) onDone();
  }, [done, onDone]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          Ver
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="w-96 sm:w-[500px]">
        <SheetHeader>
          <SheetTitle>{data.label}</SheetTitle>
          <SheetDescription>{data.details.description}</SheetDescription>
        </SheetHeader>

        <Separator />

        <ScrollArea className="px-4 [&>[data-radix-scroll-area-viewport]]:max-h-[calc(100vh-200px)]">
          <div className="space-y-4 px-4 py-2">
            <DetailItem title="Descripción" value={data.details.description} />
            <DetailItem title="Responsable" value={data.details.owner} />
            <DetailItem title="Prioridades" value={data.details.priorities} />
            <DetailItem title="Objetivos" value={data.details.objectives} />
            <DetailItem title="Objetivos" value={data.details.objectives} />
            <DetailItem title="Objetivos" value={data.details.objectives} />
            <DetailItem title="Objetivos" value={data.details.objectives} />
            <DetailItem title="Objetivos" value={data.details.objectives} />
            <DetailItem title="Objetivos" value={data.details.objectives} />
            <DetailItem title="Acciones" value={data.details.actions} />
            <DetailItem title="Herramientas" value={data.details.tools} />
            <DetailItem title="Entregables" value={data.details.deliverables} />
            <DetailItem title="KPIs" value={data.details.kpis} />
            <DetailItem
              title="Criterios de éxito"
              value={data.details.successCriteria}
            />
            <DetailItem title="Próximos pasos" value={data.details.nextSteps} />
          </div>
        </ScrollArea>

        <SheetFooter className="mb-5 flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="done-checkbox"
              checked={done}
              onCheckedChange={(checked) => setDone(checked === true)}
            />
            <Label
              htmlFor="done-checkbox"
              className="cursor-pointer select-none"
            >
              Marca como lista
            </Label>
          </div>
          <div className="flex space-x-2">
            <SheetClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cerrar
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
