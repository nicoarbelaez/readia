"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    position: "CIO en Grupo Empresarial Santander",
    comment:
      "La IA de diagnóstico identificó con precisión nuestras brechas tecnológicas. En pocos meses ya teníamos una hoja de ruta clara y accionable.",
    company: "Grupo Empresarial Santander",
  },
  {
    id: 2,
    name: "Ana Martínez",
    position: "Directora de Transformación Digital en TechCorp",
    comment:
      "Aplicamos las recomendaciones generadas por la IA y logramos reducir tiempos de desarrollo en un 40%. La claridad que obtuvimos fue clave.",
    company: "TechCorp",
  },
  {
    id: 3,
    name: "Miguel Ángel López",
    position: "CTO en FinTech Solutions",
    comment:
      "Como startup, necesitábamos priorizar al máximo. El diagnóstico de la IA nos indicó dónde enfocar recursos para escalar de forma eficiente.",
    company: "FinTech Solutions",
  },
  {
    id: 4,
    name: "Elena Torres",
    position: "Directora de Innovación en RetailPlus",
    comment:
      "La evaluación de la IA no solo analizó nuestra tecnología, sino también la organización. Ahora contamos con un plan claro de fortalecimiento interno.",
    company: "RetailPlus",
  },
  {
    id: 5,
    name: "Javier Mendoza",
    position: "Gerente de TI en IndustrialCorp",
    comment:
      "Después de varios intentos fallidos, la IA detectó los cuellos de botella en nuestro camino. Hoy tenemos varios proyectos en producción.",
    company: "IndustrialCorp",
  },
  {
    id: 6,
    name: "Sofía Ramírez",
    position: "CEO en StartupInnovation",
    comment:
      "El diagnóstico basado en IA nos permitió construir bases sólidas para nuestra infraestructura. Evitamos errores y aceleramos nuestro crecimiento.",
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
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="bg-[var(--background)] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--foreground)]">
            Empresas que ya confían en nuestro diagnóstico con IA
          </h2>
          <p className="text-[var(--muted-foreground)] mt-2 md:mt-4 text-sm md:text-base lg:text-lg">
            Casos donde la inteligencia artificial guió decisiones y aceleró la
            adopción de nuevas soluciones.
          </p>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Controles de navegación */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-[var(--card)] p-2 md:p-3 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-[var(--primary)]" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-[var(--card)] p-2 md:p-3 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-[var(--primary)]" />
          </button>

          {/* Testimonial actual */}
          <div className="bg-[var(--card)] rounded-2xl p-6 md:p-8 shadow-xl">
            <Quote className="h-8 w-8 md:h-10 md:w-10 text-[var(--primary)] mb-4 md:mb-6" />
            <p className="text-base md:text-lg text-[var(--foreground)]/80 italic mb-6 md:mb-8">
              &ldquo;{testimonials[currentIndex].comment}&rdquo;
            </p>
            <div className="border-t border-[var(--border)] pt-4 md:pt-6">
              <h4 className="font-semibold text-[var(--foreground)] text-sm md:text-base">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-[var(--muted-foreground)] text-xs md:text-sm">
                {testimonials[currentIndex].position}
              </p>
              <p className="text-[var(--primary)] text-xs md:text-sm mt-1">
                {testimonials[currentIndex].company}
              </p>
            </div>
          </div>

          {/* Indicadores de paginación */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-[var(--primary)]"
                    : "bg-[var(--muted-foreground)]/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mini testimonios adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 lg:mt-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-[var(--card)] p-4 md:p-6 rounded-xl shadow-md"
            >
              <div className="flex items-start mb-3 md:mb-4">
                <div className="bg-[var(--accent)]/30 text-[var(--primary)] font-bold rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center mr-2 md:mr-3 text-xs md:text-sm">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--foreground)] text-sm md:text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-[var(--muted-foreground)] text-xs md:text-sm">
                    {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-[var(--muted-foreground)] text-xs md:text-sm">
                &ldquo;{testimonial.comment.substring(0, 80)}...&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-8 md:mt-12">
        </div>
      </div>
    </section>
  );
}
