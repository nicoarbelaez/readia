"use client";

import Link from "next/link";
import { CheckCircle, Settings, Target, Route, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CustomSolutions() {
  const features = [
    {
      icon: <Settings className="h-5 w-5 text-primary" />,
      title: "Diagnóstico Integral en Minutos",
      desc: "Evaluación exhaustiva de arquitectura de software, silos de datos, gobernanza ética y competencias del talento.",
    },
    {
      icon: <Target className="h-5 w-5 text-emerald-400" />,
      title: "Hoja de Ruta Estratégica",
      desc: "Diseño automático de planes de adopción de IA divididos por fases prácticas, priorizando el impacto y reduciendo el riesgo.",
    },
    {
      icon: <Route className="h-5 w-5 text-primary" />,
      title: "Monitoreo e Implementación",
      desc: "Indicadores de retorno de inversión (ROI), sugerencias de herramientas tecnológicas y medición del progreso continuo.",
    },
  ];

  const checklist = [
    "Evaluación de infraestructura TI heredada",
    "Análisis de arquitectura y almacenes de datos",
    "Evaluación de brecha de competencias técnicas",
    "Casos de uso e impacto de IA priorizados",
    "Planes de adopción incrementales por fases",
    "Modelado de retorno de inversión (ROI) estimado",
  ];

  return (
    <section className="bg-background py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.01),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            Mucho más que una simple evaluación
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Combinamos una profunda auditoría técnica con pragmatismo de negocio para ofrecer planes de acción accionables y personalizados.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Columna izquierda - Lista detallada y CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              {features.map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="bg-muted/60 border border-border/40 p-3 rounded-2xl flex-shrink-0 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base md:text-lg group-hover:text-primary transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base leading-relaxed opacity-90">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="rounded-2xl bg-primary text-primary-foreground font-semibold px-8 py-6 text-base transition-all duration-300 hover:bg-primary/95 shadow-lg shadow-primary/20 cursor-pointer flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                <Link href="/login">
                  Solicitar Diagnóstico
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Columna derecha - Tarjeta de personalización premium */}
          <div className="lg:col-span-5">
            <Card className="bg-card/45 backdrop-blur-sm border border-border/40 p-6 md:p-8 rounded-3xl shadow-xl hover:border-primary/20 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-primary/5 blur-2xl pointer-events-none group-hover:bg-primary/10 transition-all duration-500" />
              
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="size-5 text-emerald-400 animate-pulse" />
                <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                  Estrategias Cubiertas
                </h3>
              </div>

              <div className="space-y-4">
                {checklist.map((item, index) => (
                  <div key={index} className="flex items-center gap-3.5 group/item">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                    <span className="text-foreground font-semibold text-sm md:text-[15px] opacity-90 group-hover/item:text-primary transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
