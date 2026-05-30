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
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(120,119,198,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,119,198,0.03)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 container mx-auto max-w-5xl px-6 text-center">
        {/* Glow badge */}
        <div className="bg-primary/10 border-primary/20 text-primary animate-fade-in shadow-primary/5 mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm md:mb-8 md:text-sm">
          <Sparkles className="size-3.5 animate-pulse text-emerald-400" />
          <span>Diagnóstico de Madurez TI en 5 Minutos</span>
        </div>

        {/* Headline */}
        <h1 className="text-foreground mx-auto mb-6 max-w-4xl text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
          <span className="from-foreground via-foreground/90 to-muted-foreground/80 block bg-linear-to-r bg-clip-text text-transparent md:inline">
            {left.trim()}
          </span>
          <span className="text-primary mx-3 inline-flex scale-95 items-center justify-center transition-transform duration-300 hover:rotate-12 md:mx-4 md:scale-100">
            →
          </span>
          <span className="from-primary block bg-linear-to-r to-emerald-400 bg-clip-text text-transparent md:inline">
            {right?.trim()}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-base leading-relaxed sm:text-lg md:mb-10 md:text-xl">
          {subtitle}
        </p>

        {/* Action Buttons */}
        <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/95 shadow-primary/25 group flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 sm:w-auto"
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
            className="border-border/60 hover:bg-muted/50 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-8 py-6 text-base font-semibold sm:w-auto"
          >
            <a href="#tabla">Ver demo interactivo</a>
          </Button>
        </div>

        {/* Floating tech cards demo effect (Micro-animations) */}
        <div className="text-muted-foreground/80 mt-16 flex flex-wrap items-center justify-center gap-6 text-xs font-medium md:mt-20">
          <div className="bg-card/40 border-border/40 flex items-center gap-1.5 rounded-xl border px-3 py-1.5 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-0.5">
            <Building2 className="text-primary size-3.5" />
            <span>Infraestructura TI</span>
          </div>
          <div className="bg-card/40 border-border/40 flex items-center gap-1.5 rounded-xl border px-3 py-1.5 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-0.5">
            <Sparkles className="size-3.5 text-emerald-400" />
            <span>Gobernanza de Datos</span>
          </div>
          <div className="bg-card/40 border-border/40 flex items-center gap-1.5 rounded-xl border px-3 py-1.5 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-0.5">
            <Sparkles className="text-primary size-3.5" />
            <span>Talento y Capacidades</span>
          </div>
        </div>
      </div>
    </section>
  );
}
