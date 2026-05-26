"use client";

import { useState, useRef } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

const faqItems = [
  {
    id: 1,
    question: "¿Qué analiza exactamente el diagnóstico de Readia?",
    answer: "Readia evalúa de manera integral cuatro dimensiones fundamentales: tu Infraestructura de TI (servidores, redes, nubes), Arquitectura y Gobernanza de Datos (almacenes, seguridad, silos), Talento Humano (brechas de competencias digitales) y Gobernanza Ética/Procesos de Negocio. Con esto determina qué tan preparada está tu organización para adoptar Inteligencia Artificial."
  },
  {
    id: 2,
    question: "¿Qué diferencia a Readia de una consultora tradicional?",
    answer: "A diferencia de las consultorías de TI tradicionales que tardan semanas y resultan costosas, Readia utiliza un motor interactivo impulsado por IA para realizar el diagnóstico y trazar planes estratégicos y arquitectónicos en cuestión de minutos, con rigor metodológico y de forma 100% personalizada."
  },
  {
    id: 3,
    question: "¿Es seguro compartir la información técnica de mi empresa?",
    answer: "Absolutamente. La privacidad de tus datos es nuestra prioridad número uno. Utilizamos encriptación de grado bancario (AES-256) en tránsito y reposo. Además, tu información técnica es confidencial y jamás se compartirá con terceros ni se utilizará para entrenar modelos públicos."
  },
  {
    id: 4,
    question: "¿Qué tipo de empresas pueden usar Readia?",
    answer: "Readia está diseñado para empresas de cualquier escala y sector: desde startups en crecimiento rápido que desean consolidar sus bases técnicas, hasta medianas y grandes corporaciones que buscan estructurar su transformación digital e iniciar proyectos de IA sin cometer errores costosos."
  },
  {
    id: 5,
    question: "¿En cuánto tiempo recibo mi diagnóstico y hoja de ruta?",
    answer: "El diagnóstico inicial de madurez y la estructuración del perfil se generan de forma instantánea al completar tu perfil interactivo de preguntas de TI. Los informes detallados estratégicos y de arquitectura de hoja de ruta se despliegan en tiempo real tras la evaluación."
  },
  {
    id: 6,
    question: "¿La plataforma ayuda en el plan de implementación?",
    answer: "Sí. Readia no solo identifica tus brechas tecnológicas, sino que genera una Hoja de Ruta interactiva (Roadmap) estructurada por fases claras (inicial, intermedia, avanzada) con tareas recomendadas, sugerencias de stack tecnológico y métricas para medir el ROI."
  }
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="bg-background py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.015),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        {/* Título de la sección */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-3">
            <HelpCircle className="size-6 text-emerald-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Todo lo que necesitas saber sobre nuestro diagnóstico automatizado de TI e implementación estratégica de Inteligencia Artificial.
          </p>
        </div>

        {/* Acordeón de FAQs */}
        <div className="space-y-4">
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
    </section>
  );
}

function FAQItem({
  item,
  isOpen,
  onToggle
}: {
  item: { id: number; question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="bg-card/45 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-sm transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-muted/30 transition-colors duration-200 cursor-pointer group"
      >
        <span className="font-bold text-foreground text-sm md:text-base pr-4 group-hover:text-primary transition-colors">
          {item.question}
        </span>
        <ChevronDown
          className={`size-4 md:size-5 text-primary transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        ref={contentRef}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-border/20 pt-4">
          <p className="text-muted-foreground leading-relaxed text-xs md:text-[14.5px] opacity-90">
            {item.answer}
          </p>
        </div>
      </div>
    </Card>
  );
}
