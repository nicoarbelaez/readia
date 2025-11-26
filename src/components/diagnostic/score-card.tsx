import { CardBento } from "@/components/diagnostic/card-bento";
import { Badge } from "@/components/ui/badge";

export function ScoreCard({
  score,
  label,
  description,
}: {
  score: number;
  label: string;
  description: string;
}) {
  return (
    <CardBento
      title="Puntaje Global"
      infoTooltipContent="Puntaje calculado ponderando las 5 dimensiones del modelo AICam."
      description={
        <Badge
          variant="secondary"
          className={`${score > 50 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
        >
          {label}
        </Badge>
      }
      cardContent={
        <div className="flex h-full flex-col">
          <div className="flex flex-grow flex-col justify-center">
            <div className="flex items-baseline space-x-1">
              <span className="text-6xl font-bold tracking-tighter lg:text-7xl">
                {score}
              </span>
              <span className="text-muted-foreground text-xl font-medium lg:text-2xl">
                /100
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      }
    />
  );
}
