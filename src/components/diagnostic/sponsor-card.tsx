import { Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SponsorCard() {
  return (
    <Card className="relative h-full">
      <CardContent className="flex h-full flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-3">
          <div className="from-primary/20 to-primary-soft/5 flex-none rounded-full bg-gradient-to-br p-3 shadow-md">
            <Bot className="text-primary size-7" />
          </div>

          <div className="text-left">
            <h3 className="text-foreground text-base font-semibold md:text-lg">
              Diagnóstico impulsado por{" "}
              <span className="text-primary">ReadIA</span>
            </h3>
            <p className="text-muted-foreground mt-0.5 text-xs md:text-sm">
              Análisis automatizado y recomendaciones priorizadas
            </p>
          </div>
        </div>

        <p className="max-w-xs text-sm md:max-w-sm md:text-base">
          Hemos analizado sus respuestas con modelos explicables y mejores
          prácticas de gobernanza. El resultado es un diagnóstico accionable y
          priorizado por impacto.
        </p>

        <CardFooter className="mt-1 flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary inline-flex"
          >
            <Sparkles className="text-primary h-3 w-3" />
            Tecnología: ReadIA
          </Badge>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
