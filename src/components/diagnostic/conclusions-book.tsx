import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { CardBento } from "@/components/diagnostic/card-bento";

export function ConclusionsBook({ markdown }: { markdown: string }) {
  return (
    <CardBento
      title="Informe de Conclusiones"
      infoTooltipContent="Este resumen se genera automáticamente analizando todas sus respuestas y puntuaciones."
      description="Resumen generado por IA"
      cardContent={
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-base max-w-none md:columns-2">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      }
      cardFooter={
        <Badge variant="outline" className="rounded">
          ID: REF-2024-AI-CAM-882
        </Badge>
      }
    />
  );
}
