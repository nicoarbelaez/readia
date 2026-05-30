"use client";

import { Zap, Database, Users, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function MetricsSection() {
  const metricsData = [
    { 
      value: "60%", 
      text: "menos tiempo en implementar proyectos de IA",
      icon: <Zap className="size-5 text-amber-400" />,
      description: "Aceleración del time-to-market gracias a diagnósticos precisos."
    },
    { 
      value: "81%", 
      text: "mejora en la gobernanza de datos para IA",
      icon: <Database className="size-5 text-primary" />,
      description: "Estructuración segura y de alta calidad para modelos de Machine Learning."
    },
    { 
      value: "40%", 
      text: "más eficiencia en equipos técnicos",
      icon: <Users className="size-5 text-emerald-400" />,
      description: "Optimización de capacidades y distribución inteligente del talento."
    },
    { 
      value: "87%", 
      text: "menos errores en despliegue de modelos de IA",
      icon: <ShieldCheck className="size-5 text-primary" />,
      description: "Reducción drástica del riesgo operativo con auditorías previas de TI."
    }
  ];

  return (
    <section className="bg-background py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.02),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Título */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Resultados del Diagnóstico de IA
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            Las organizaciones que usan nuestro diagnóstico de capacidades logran mejoras sustanciales en eficiencia, datos y gobernanza tecnológica.
          </p>
        </div>

        {/* Métricas en Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => (
            <Card
              key={index}
              className="bg-card/40 backdrop-blur-sm rounded-3xl border border-border/40 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            >
              <CardContent className="p-6 md:p-8 flex flex-col items-start h-full">
                {/* Icon box */}
                <div className="p-3 rounded-2xl bg-muted/50 border border-border/40 mb-5 text-foreground flex items-center justify-center">
                  {metric.icon}
                </div>

                {/* Percentage value */}
                <div className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-primary to-emerald-400 bg-clip-text text-transparent mb-2.5">
                  {metric.value}
                </div>

                {/* Text main */}
                <div className="text-foreground font-semibold text-sm md:text-base mb-2 group-hover:text-primary transition-colors">
                  {metric.text}
                </div>

                {/* Description helper text */}
                <div className="text-muted-foreground text-xs leading-relaxed opacity-85 mt-auto">
                  {metric.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <p className="text-muted-foreground/60 text-xs italic">
            *Resultados basados en análisis de capacidades de proyectos de TI implementados y auditorías estimadas.
          </p>
        </div>
      </div>
    </section>
  );
}
