import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { CardBento } from "@/components/diagnostic/card-bento";
import { Priority, Recommendation } from "@/app/(main)/diagnostic/page";

export function RecommendationsPanel({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  const getPriorityStyles = (p: Priority) => {
    switch (p) {
      case "Alta":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "Media":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Baja":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-slate-800 text-slate-400";
    }
  };

  return (
    <CardBento
      title="Recomendaciones"
      infoTooltipContent="Acciones sugeridas basadas en las brechas más grandes encontradas."
      description="Priorizadas por impacto"
      className="flex flex-col"
      cardContent={
        <ScrollArea className="flex h-full flex-1 flex-col">
          <div className="h-full flex-1 space-y-3 overflow-y-auto">
            {recommendations.map((rec) => (
              <Item
                key={rec.id}
                variant="outline"
                className="group hover:bg-accent"
              >
                <ItemContent>
                  <ItemTitle>
                    <Badge
                      variant="secondary"
                      className={cn(getPriorityStyles(rec.priority))}
                    >
                      {rec.priority}
                    </Badge>
                  </ItemTitle>
                  <ItemDescription>{rec.text}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <span className="group-hover:text-foreground text-[10px] uppercase transition-colors">
                    {rec.category}
                  </span>
                </ItemActions>
              </Item>
            ))}
          </div>
        </ScrollArea>
      }
    />
  );
}
