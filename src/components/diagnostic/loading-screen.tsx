import { Bot } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export function LoadingScreen() {
  return (
    <div className="animate-in animate-slide-out-top flex min-h-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-xl" />
          <Bot className="text-primary relative z-10 h-20 w-20 animate-pulse" />
        </div>
        <div className="flex items-center gap-2 text-2xl">
          <Spinner className="text-primary size-6" />
          <span className="text-foreground font-medium">
            Analizando sus respuestas...
          </span>
        </div>
        <p className="text-muted-foreground max-w-xs text-center">
          Estamos generando el diagnóstico perfecto para usted.
        </p>
      </div>
    </div>
  );
}
