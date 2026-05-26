"use client";

import React from "react";
import { TableProperties, ShieldCheck, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Prioridad = "Alta" | "Media" | "Baja";
type Nivel = 1 | 2 | 3 | 4 | 5;

interface TableRow {
  dimension: string;
  nivel: number;
  brecha: string;
  prioridad: string;
  evidencias: string;
}

interface DiagnosisTableProps {
  rows: TableRow[];
}

export function DiagnosisTable({ rows }: DiagnosisTableProps) {
  const getValidNivel = (nivel: number): Nivel => {
    return nivel >= 1 && nivel <= 5 ? (nivel as Nivel) : 1;
  };

  const getValidPrioridad = (prioridad: string): Prioridad => {
    const prio = prioridad.toLowerCase();
    if (prio === "alta") return "Alta";
    if (prio === "media") return "Media";
    if (prio === "baja") return "Baja";
    return "Media";
  };

  return (
    <div
      id="tabla"
      className="mx-auto max-w-5xl rounded-3xl bg-card/60 backdrop-blur-md p-6 md:p-8 lg:p-10 shadow-2xl border border-border/40 relative overflow-hidden group"
    >
      {/* Decorative backdrop glow inside card */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none group-hover:bg-primary/15 transition-all duration-500" />

      {/* Título de la sección */}
      <div className="text-center mb-8 md:mb-10 relative z-10">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-3.5">
          <TableProperties className="size-6 text-emerald-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
          Diagnóstico de Madurez en IA
        </h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Evaluación de las dimensiones críticas y brechas de capacidades para la adopción efectiva de Inteligencia Artificial.
        </p>
      </div>

      {/* Leyenda de niveles */}
      <div className="mb-6 rounded-2xl bg-muted/40 px-5 py-4 text-xs md:text-sm text-muted-foreground border border-border/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-primary" />
          <span className="font-semibold text-foreground">Niveles de madurez:</span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 opacity-90 text-[13px]">
          <span><strong className="text-foreground">1</strong> Inicial</span>
          <span className="text-muted-foreground/30">·</span>
          <span><strong className="text-foreground">2</strong> Básico</span>
          <span className="text-muted-foreground/30">·</span>
          <span><strong className="text-foreground">3</strong> Estable</span>
          <span className="text-muted-foreground/30">·</span>
          <span><strong className="text-foreground">4</strong> Gestionado</span>
          <span className="text-muted-foreground/30">·</span>
          <span><strong className="text-foreground">5</strong> Optimizado</span>
        </div>
      </div>

      {/* CONTENEDOR PARA DESKTOP */}
      <div className="overflow-x-auto relative z-10">
        <div className="hidden lg:block min-w-[850px] pb-2">
          <div className="grid grid-cols-[1.3fr_0.7fr_1.3fr_0.8fr_1.9fr] gap-y-3.5 text-sm font-medium text-foreground w-full">
            
            {/* Encabezados */}
            <div className="col-span-5 grid grid-cols-subgrid rounded-xl bg-muted/60 border border-border/40 px-5 py-3.5 font-bold text-muted-foreground tracking-wide text-xs uppercase">
              <div>Dimensión</div>
              <div>Nivel</div>
              <div>Brecha</div>
              <div>Prioridad</div>
              <div>Evidencias</div>
            </div>

            {/* Filas dinámicas */}
            {rows.map((r, index) => (
              <div
                key={index}
                className="col-span-5 grid grid-cols-subgrid items-center rounded-2xl border border-border/30 bg-card/45 px-5 py-4 hover:bg-muted/30 hover:border-primary/20 hover:shadow-sm transition-all duration-300"
              >
                <div className="font-semibold text-foreground text-[15px]" title={r.dimension || "Sin dimensión"}>
                  {r.dimension || "Sin dimensión"}
                </div>
                <div>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold border border-primary/25 shadow-sm text-sm">
                    {getValidNivel(r.nivel)}
                  </span>
                </div>
                <div className="text-muted-foreground text-[13.5px] truncate pr-4" title={r.brecha || "Sin información"}>
                  {r.brecha || "Sin información"}
                </div>
                <div>
                  <Badge
                    variant="outline"
                    className={`font-semibold rounded-lg px-2.5 py-0.5 border text-xs ${
                      getValidPrioridad(r.prioridad) === "Alta"
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : getValidPrioridad(r.prioridad) === "Media"
                        ? "bg-amber-400/10 text-amber-500 border-amber-400/20"
                        : "bg-emerald-400/10 text-emerald-500 border-emerald-400/20"
                    }`}
                  >
                    {getValidPrioridad(r.prioridad)}
                  </Badge>
                </div>
                <div className="text-muted-foreground/80 text-[13.5px] truncate pr-2" title={r.evidencias || "Sin evidencias"}>
                  {r.evidencias || "Sin evidencias"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLA MOBILE - CARDS SÚPER DETALLADAS */}
      <div className="lg:hidden space-y-4 relative z-10">
        {rows.map((r, index) => (
          <div
            key={index}
            className="bg-card/50 border border-border/40 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground text-base">
                {r.dimension || "Sin dimensión"}
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold border border-primary/25 shadow-sm text-sm">
                {getValidNivel(r.nivel)}
              </span>
            </div>
            
            <div className="space-y-3 text-sm border-t border-border/40 pt-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Brecha</span>
                <span className="text-foreground text-[13.5px]">{r.brecha || "Sin información"}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Prioridad</span>
                <Badge
                  variant="outline"
                  className={`font-semibold rounded-lg px-2.5 py-0.5 border text-[11px] ${
                    getValidPrioridad(r.prioridad) === "Alta"
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : getValidPrioridad(r.prioridad) === "Media"
                      ? "bg-amber-400/10 text-amber-500 border-amber-400/20"
                      : "bg-emerald-400/10 text-emerald-500 border-emerald-400/20"
                  }`}
                >
                  {getValidPrioridad(r.prioridad)}
                </Badge>
              </div>
              
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Evidencias</span>
                <span className="text-muted-foreground text-[13px]">{r.evidencias || "Sin evidencias"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nota al pie */}
      <div className="mt-8 text-xs text-muted-foreground/60 text-center flex items-center justify-center gap-1.5 relative z-10">
        <ShieldCheck className="size-4 text-primary" />
        <span>Este diagnóstico es una demostración preliminar. Para un análisis detallado y personalizado, regístrate en Readia.</span>
      </div>
    </div>
  );
}