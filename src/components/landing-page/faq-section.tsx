
"use client";

import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";

const faqItems = [
  {
    id: 1,
    question: "¿Qué hace exactamente la IA de Readia?",
    answer: "La IA de Readia analiza la infraestructura tecnológica, la calidad de los datos, las capacidades del equipo y la gobernanza digital de tu organización. Con esta información genera automáticamente un diagnóstico completo y una hoja de ruta para adoptar IA de manera efectiva."
  },
  {
    id: 2,
    question: "¿Qué diferencia a Readia de otros servicios?",
    answer: "A diferencia de una consultoría tradicional, Readia es una inteligencia artificial que procesa datos de tu empresa en tiempo real, identifica brechas y propone soluciones personalizadas en cuestión de minutos, reduciendo tiempo y costos."
  },
  {
    id: 3,
    question: "¿Es seguro compartir la información de mi empresa?",
    answer: "Sí. La IA de Readia utiliza protocolos de seguridad avanzados y procesa la información de forma confidencial. Los datos nunca se comparten con terceros y pueden almacenarse en servidores locales o en la nube, según prefieras."
  },
  {
    id: 4,
    question: "¿Qué tipo de empresas pueden beneficiarse?",
    answer: "Cualquier empresa, desde startups hasta grandes corporaciones. La IA adapta el diagnóstico según el tamaño, la industria y el nivel de madurez digital de cada organización."
  },
  {
    id: 5,
    question: "¿Cuánto tiempo tarda en dar un diagnóstico?",
    answer: "El diagnóstico inicial se genera en minutos tras ingresar la información básica. El informe detallado completo puede estar listo en pocos días, dependiendo de la cantidad de datos proporcionados."
  },
  {
    id: 6,
    question: "¿La IA también apoya en la implementación?",
    answer: "Sí. Readia no solo entrega un diagnóstico, también genera una hoja de ruta priorizada con fases de implementación, casos de uso recomendados y métricas para medir el retorno de inversión (ROI)."
  },
  {
    id: 7,
    question: "¿Qué necesito para empezar a usar Readia?",
    answer: "Únicamente registrar tu empresa en la plataforma y proporcionar información básica sobre tus sistemas, datos y objetivos. El resto lo hace automáticamente la IA."
  },
  {
    id: 8,
    question: "¿En qué idiomas está disponible?",
    answer: "Actualmente la IA de Readia está disponible en español"
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
    <section id="faq" className="bg-[var(--background)] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--foreground)]">
            Preguntas frecuentes
          </h2>
          <p className="text-[var(--muted-foreground)] mt-2 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg">
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
          <div className="bg-[var(--accent)]/20 rounded-2xl p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
            <h3 className="text-lg md:text-xl font-semibold text-[var(--foreground)] mb-3 md:mb-4">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-[var(--muted-foreground)] mb-4 md:mb-6 text-sm md:text-base">
              Nuestro equipo de expertos está listo para responder cualquier pregunta específica sobre tu caso
            </p>
            <button className="px-4 py-2 md:px-6 md:py-3 bg-[var(--primary)] hover:bg-[var(--primary-soft)] text-[var(--primary-foreground)] rounded-lg font-semibold transition-colors text-sm md:text-base">
              Contactanos
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
    <div className="bg-[var(--card)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-[var(--muted)] transition-colors duration-200"
      >
        <span className="font-semibold text-[var(--foreground)] pr-4 text-sm md:text-base">
          {item.question}
        </span>
        <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? (
            <Minus className="h-4 w-4 md:h-5 md:w-5 text-[var(--primary)] transition-colors duration-200" />
          ) : (
            <Plus className="h-4 w-4 md:h-5 md:w-5 text-[var(--primary)] transition-colors duration-200" />
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
          <div className="border-t border-[var(--border)] pt-3 md:pt-4">
            <p className="text-[var(--muted-foreground)] leading-relaxed text-sm md:text-base">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
