"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    position: "CIO",
    comment:
      "La IA de diagnóstico identificó con precisión nuestras brechas tecnológicas en silos de datos. En pocos meses logramos trazar una hoja de ruta con impacto de negocio real.",
    company: "Grupo Santander Col",
  },
  {
    id: 2,
    name: "Ana Martínez",
    position: "Directora de Transformación Digital",
    comment:
      "Aplicamos las recomendaciones de infraestructura que arrojó el diagnóstico de Readia y redujimos tiempos de desarrollo técnico de modelos IA en un 40%.",
    company: "TechCorp Global",
  },
  {
    id: 3,
    name: "Miguel Ángel López",
    position: "CTO",
    comment:
      "Como startup tecnológica, necesitábamos priorizar recursos. El diagnóstico de la IA de Readia nos indicó exactamente dónde fortalecer bases de gobernanza y datos.",
    company: "FinTech Solutions",
  },
  {
    id: 4,
    name: "Elena Torres",
    position: "Directora de Innovación",
    comment:
      "La evaluación no solo analizó nuestro stack, sino también la preparación del equipo. Logramos alinear prioridades entre TI y el área de negocio rápidamente.",
    company: "RetailPlus SA",
  },
  {
    id: 5,
    name: "Javier Mendoza",
    position: "Gerente de TI",
    comment:
      "Después de múltiples auditorías estancadas, el reporte generado por Readia desbloqueó cuellos de botella clave de automatización. Altamente recomendado.",
    company: "IndustrialCorp Latam",
  },
  {
    id: 6,
    name: "Sofía Ramírez",
    position: "CEO",
    comment:
      "Ahorramos semanas de consultorías externas gracias al diagnóstico automatizado. Nos dio claridad inmediata para estructurar nuestro plan maestro de IA.",
    company: "StartupInnovation",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2);
  };

  return (
    <section className="bg-background py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.01),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Título de la sección */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-3">
            <Sparkles className="size-6 text-emerald-400 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            Empresas impulsadas por Readia
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Casos donde nuestro diagnóstico inteligente y hojas de ruta guiadas por IA facilitaron decisiones estratégicas eficaces.
          </p>
        </div>

        {/* Carousel principal */}
        <div
          className="relative max-w-3xl mx-auto mb-16"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Controles de navegación */}
          <div className="absolute -left-4 sm:-left-16 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="bg-card/80 border border-border/40 hover:bg-muted hover:border-primary/20 rounded-full size-10 md:size-12 shadow-md cursor-pointer transition-all"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="size-5 text-primary" />
            </Button>
          </div>

          <div className="absolute -right-4 sm:-right-16 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="bg-card/80 border border-border/40 hover:bg-muted hover:border-primary/20 rounded-full size-10 md:size-12 shadow-md cursor-pointer transition-all"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="size-5 text-primary" />
            </Button>
          </div>

          {/* Testimonial card */}
          <Card className="bg-card/45 backdrop-blur-sm border border-border/40 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-6 right-8 opacity-10 text-primary pointer-events-none group-hover:scale-110 transition-transform duration-300">
              <Quote className="size-16 md:size-20" />
            </div>

            <CardContent className="p-0">
              <Quote className="h-8 w-8 md:h-10 md:w-10 text-emerald-400 mb-6" />
              
              <p className="text-base sm:text-lg md:text-xl text-foreground font-medium leading-relaxed italic mb-8 relative z-10">
                &ldquo;{testimonials[currentIndex].comment}&rdquo;
              </p>
              
              <div className="flex items-center gap-4 border-t border-border/40 pt-6 relative z-10">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-primary to-emerald-400 text-primary-foreground font-bold text-base flex items-center justify-center shadow-md shadow-primary/10">
                  {getInitials(testimonials[currentIndex].name)}
                </div>
                <div>
                  <h4 className="font-extrabold text-foreground text-[15px] md:text-base leading-none">
                    {testimonials[currentIndex].name}
                  </h4>
                  <div className="text-muted-foreground text-xs md:text-sm mt-1">
                    {testimonials[currentIndex].position} en <strong className="text-primary font-semibold">{testimonials[currentIndex].company}</strong>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Indicadores de paginación */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 w-1.5 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mini testimonios adicionales - Grid de 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((item) => (
            <Card
              key={item.id}
              className="bg-card/35 backdrop-blur-sm border border-border/40 rounded-2xl p-5 hover:border-primary/20 transition-all duration-300 shadow-sm"
            >
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-muted/60 text-primary font-bold text-xs flex items-center justify-center border border-border/40">
                    {getInitials(item.name)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-xs md:text-sm leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-muted-foreground text-[11px] leading-tight">
                      {item.company}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed italic">
                  &ldquo;{item.comment.substring(0, 110)}...&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
