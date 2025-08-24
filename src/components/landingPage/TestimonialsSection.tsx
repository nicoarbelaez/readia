// components/landingPage/TestimonialsSection.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    position: "CIO en Grupo Empresarial Santander",
    comment: "El diagnóstico de capacidades de TI nos permitió identificar exactamente dónde estábamos fallando en nuestra estrategia de IA. En 3 meses ya teníamos una hoja de ruta clara y priorizada.",
    company: "Grupo Empresarial Santander"
  },
  {
    id: 2,
    name: "Ana Martínez",
    position: "Directora de Transformación Digital en TechCorp",
    comment: "Implementamos las recomendaciones del diagnóstico y en 6 meses redujimos un 40% el tiempo de desarrollo de nuestros proyectos de IA. La claridad estratégica que obtuvimos fue invaluable.",
    company: "TechCorp"
  },
  {
    id: 3,
    name: "Miguel Ángel López",
    position: "CTO en FinTech Solutions",
    comment: "Como startup, necesitábamos maximizar cada recurso. El diagnóstico nos ayudó a enfocar nuestros esfuerzos en las áreas que realmente importaban para escalar nuestra IA de manera eficiente.",
    company: "FinTech Solutions"
  },
  {
    id: 4,
    name: "Elena Torres",
    position: "Directora de Innovación en RetailPlus",
    comment: "El proceso de diagnóstico no solo evaluó nuestra tecnología, sino también nuestras capacidades organizacionales. Ahora tenemos un plan de capacitación específico para nuestro equipo.",
    company: "RetailPlus"
  },
  {
    id: 5,
    name: "Javier Mendoza",
    position: "Gerente de TI en IndustrialCorp",
    comment: "Llevábamos años intentando implementar IA sin éxito. El diagnóstico identificó nuestros cuellos de botella y nos proporcionó un camino claro. Hoy tenemos 3 proyectos de IA en producción.",
    company: "IndustrialCorp"
  },
  {
    id: 6,
    name: "Sofía Ramírez",
    position: "CEO en StartupInnovation",
    comment: "Como empresa en crecimiento, el diagnóstico nos ayudó a construir cimientos sólidos para nuestra infraestructura de IA. Evitamos costosos errores y aceleramos nuestro time-to-market.",
    company: "StartupInnovation"
  }
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
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-blue-900/30 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white">
            Cientos de empresas confían en nuestro diagnóstico
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2 md:mt-4 text-sm md:text-base lg:text-lg">
            Descubre cómo nuestro enfoque está transformando la manera en que las empresas adoptan IA
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
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
          </button>

          {/* Testimonial actual */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl">
            <Quote className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-blue-400 mb-4 md:mb-6" />
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 italic mb-6 md:mb-8">
              "{testimonials[currentIndex].comment}"
            </p>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 md:pt-6">
              <h4 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                {testimonials[currentIndex].position}
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-xs md:text-sm mt-1">
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
                    ? "bg-blue-600"
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mini testimonios adicionales (grid debajo) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 lg:mt-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-xl shadow-md"
            >
              <div className="flex items-start mb-3 md:mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center mr-2 md:mr-3 text-xs md:text-sm">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                    {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm">
                "{testimonial.comment.substring(0, 80)}..."
              </p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-8 md:mt-12">
          <button className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-sm md:text-base">
            Ver todos los casos de éxito
          </button>
        </div>
      </div>
    </section>
  );
}