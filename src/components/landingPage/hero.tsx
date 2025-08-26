"use client";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaText?: string;
}

export function HERO({
  title = "Diagnóstico TI → IA Empresarial",
  subtitle = "Evalúa tu infraestructura, datos, talento y gobernanza para adoptar IA de forma efectiva.",
  ctaHref = "#tabla",
  ctaText = "Comenzar diagnóstico",
}: HeroProps) {
  const [left, right] = title.split("→");
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950 py-16 md:py-24 lg:py-32">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative mx-auto px-4 sm:px-6 text-center z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
          <span className="block md:inline">{left.trim()}</span>
          <span className="text-blue-400 mx-2">→</span>
          <span className="text-blue-300 block md:inline">{right?.trim()}</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-6 md:mb-8 px-4">
          {subtitle}
        </p>
        <div className="mt-8 md:mt-10">
          <Button 
            asChild 
            className="px-6 py-4 md:px-8 md:py-4 text-base md:text-lg bg-white text-blue-900 hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <a href={ctaHref}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}