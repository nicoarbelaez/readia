
"use client";

import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";

const faqItems = [
  {
    id: 1,
    question: "¿Qué incluye exactamente el diagnóstico de capacidades de TI hacia IA?",
    answer: "Nuestro diagnóstico evalúa cuatro dimensiones clave: infraestructura tecnológica, calidad y gobernanza de datos, talento y capacidades del equipo, y marco de gobernanza de IA. Incluye un reporte detallado, identificación de brechas, recomendaciones prioritarias y una hoja de ruta personalizada."
  },
  {
    id: 2,
    question: "¿Cuánto tiempo toma completar el diagnóstico?",
    answer: "El proceso completo toma entre 2-4 semanas dependiendo del tamaño de la organización. Incluye reuniones de descubrimiento, análisis técnico, evaluación de datos y la elaboración del reporte final con recomendaciones."
  },
  {
    id: 3,
    question: "¿Necesitamos preparar algo antes de comenzar el diagnóstico?",
    answer: "Recomendamos tener disponible información sobre: infraestructura TI actual, proyectos de datos existentes, organigrama del equipo tecnológico, y objetivos estratégicos de IA. Nuestros consultores guiarán todo el proceso."
  },
  {
    id: 4,
    question: "¿El diagnóstico es compatible con nuestra infraestructura tecnológica actual?",
    answer: "Sí, nuestros sistemas se adaptan a su entorno tecnológico y pueden interactuar o integrarse con sus herramientas actuales, así como desplegarse tanto en servidor local como en la nube."
  },
  {
    id: 5,
    question: "¿Qué diferencia su diagnóstico de otras soluciones del mercado?",
    answer: "Nuestra metodología combina evaluación técnica con estrategia empresarial, ofreciendo no solo identificación de problemas sino también soluciones prácticas priorizadas y una hoja de ruta ejecutable con métricas de ROI claras."
  },
  {
    id: 6,
    question: "¿En qué idiomas está disponible el servicio?",
    answer: "Ofrecemos nuestro diagnóstico y reportes en español, inglés y portugués. Todos nuestros consultores son bilingües y con experiencia en proyectos internacionales."
  },
  {
    id: 7,
    question: "¿Qué tipo de empresas pueden beneficiarse del diagnóstico?",
    answer: "Trabajamos con empresas de todos los tamaños, desde startups hasta grandes corporaciones, en diversos sectores incluyendo fintech, retail, healthcare, manufacturing y servicios."
  },
  {
    id: 8,
    question: "¿Ofrecen soporte post-diagnóstico para la implementación?",
    answer: "Sí, ofrecemos servicios de consultoría continuada para apoyar la implementación de las recomendaciones, incluyendo gestión de proyectos, capacitación de equipos y seguimiento de métricas."
  }
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="bg-white dark:bg-slate-900 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white">
            Preguntas frecuentes
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg">
            Resolvemos todas tus dudas sobre nuestro diagnóstico de capacidades de TI hacia IA
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-3 md:space-y-4">
            {faqItems.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openItems.includes(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Contacto adicional */}
        <div className="text-center mt-8 md:mt-12 lg:mt-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
            <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-white mb-3 md:mb-4">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 md:mb-6 text-sm md:text-base">
              Nuestro equipo de expertos está listo para responder cualquier pregunta específica sobre tu caso
            </p>
            <button className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-sm md:text-base">
              Contactar a un especialista
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente individual para cada item del FAQ con animaciones
function FAQItem({ item, isOpen, onToggle }: { 
  item: { id: number; question: string; answer: string }; 
  isOpen: boolean; 
  onToggle: () => void; 
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
      >
        <span className="font-semibold text-slate-800 dark:text-white pr-4 text-sm md:text-base">
          {item.question}
        </span>
        <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? (
            <Minus className="h-4 w-4 md:h-5 md:w-5 text-blue-600 transition-colors duration-200" />
          ) : (
            <Plus className="h-4 w-4 md:h-5 md:w-5 text-blue-600 transition-colors duration-200" />
          )}
        </div>
      </button>
      
      <div
        ref={contentRef}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-4 md:px-6 pb-4 md:pb-6">
          <div className="border-t border-slate-200 dark:border-slate-700 pt-3 md:pt-4">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}