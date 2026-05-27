"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaText?: string;
}

export function Hero({
  title = "Diagnóstico TI → IA Empresarial",
  subtitle = "Evalúa tu infraestructura, datos, talento y gobernanza de forma interactiva y genera planes estratégicos de adopción guiados por inteligencia artificial.",
  ctaHref = "/login",
  ctaText = "Comenzar diagnóstico",
}: HeroProps) {
  const [left, right] = title.split("→");

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,119,198,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,119,198,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container relative mx-auto px-6 text-center z-10 max-w-5xl">
        {/* Glow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold mb-6 md:mb-8 animate-fade-in shadow-sm shadow-primary/5">
          <Sparkles className="size-3.5 animate-pulse text-emerald-400" />
          <span>Diagnóstico de Madurez TI en 5 Minutos</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6 md:mb-8 max-w-4xl mx-auto">
          <span className="block md:inline bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground/80 bg-clip-text text-transparent">
            {left.trim()}
          </span>
          <span className="inline-flex items-center justify-center text-primary mx-3 md:mx-4 scale-95 md:scale-100 hover:rotate-12 transition-transform duration-300">
            →
          </span>
          <span className="block md:inline bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
            {right?.trim()}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
          {subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto rounded-2xl bg-primary text-primary-foreground font-semibold px-8 py-6 text-base transition-all duration-300 hover:bg-primary/95 shadow-lg shadow-primary/25 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <Link href={ctaHref}>
              {ctaText}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-2xl border-border/60 font-semibold px-8 py-6 text-base hover:bg-muted/50 cursor-pointer flex items-center justify-center gap-2"
          >
            <a href="#tabla">
              Ver demo interactivo
            </a>
          </Button>
        </div>

        {/* Floating tech cards demo effect (Micro-animations) */}
        <div className="mt-16 md:mt-20 flex flex-wrap justify-center items-center gap-6 text-xs text-muted-foreground/80 font-medium">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card/40 border border-border/40 backdrop-blur-sm shadow-sm hover:-translate-y-0.5 transition-transform">
            <Building2 className="size-3.5 text-primary" />
            <span>Infraestructura TI</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card/40 border border-border/40 backdrop-blur-sm shadow-sm hover:-translate-y-0.5 transition-transform">
            <Sparkles className="size-3.5 text-emerald-400" />
            <span>Gobernanza de Datos</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card/40 border border-border/40 backdrop-blur-sm shadow-sm hover:-translate-y-0.5 transition-transform">
            <Sparkles className="size-3.5 text-primary" />
            <span>Talento y Capacidades</span>
          </div>
        </div>
      </div>
    </section>
  );
}