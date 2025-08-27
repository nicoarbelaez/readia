"use client";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaText?: string;
}

export function Hero({
  title = "Diagnóstico TI → IA Empresarial",
  subtitle = "Evalúa tu infraestructura, datos, talento y gobernanza para adoptar IA de forma efectiva.",
  ctaHref = "/login",
  ctaText = "Comenzar diagnóstico",
}: HeroProps) {
  const [left, right] = title.split("→");
  return (
    <section className="relative overflow-hidden py-40 md:py-50 lg:py-50">   
      <div className="container relative mx-auto px-4 sm:px-6 text-center z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-4 md:mb-6">
          <div className="hidden md:block">
            <span className="inline-block">{left.trim()}</span>
            <span className="text-[var(--primary)] mx-2">→</span>
            <span className="text-[var(--ring)] inline-block">{right?.trim()}</span>
          </div>
          
          <div className="md:hidden flex flex-col items-center">
            <span className="block">{left.trim()}</span>
            <span className="text-[var(--primary)] my-2 transform rotate-90">→</span>
            <span className="text-[var(--ring)] block">{right?.trim()}</span>
          </div>
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-6 md:mb-8 px-4">
          {subtitle}
        </p>
        
        <div className="mt-8 md:mt-10">
          <Button 
            asChild 
            className="px-6 py-4 md:px-8 md:py-4 text-base md:text-lg 
                      bg-[var(--ring)] text-[var(--on-primary)] 
                      hover:bg-[var(--ring)]/90 hover:text-[var(--on-primary)] 
                      transition-all duration-300 shadow-lg hover:shadow-xl 
                      transform hover:scale-105"
          >
            <a href={ctaHref}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}