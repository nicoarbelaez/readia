import { CheckCircle, Settings, Target, Route } from "lucide-react";

export function CustomSolutions() {
  return (
    <section className="bg-white dark:bg-slate-800 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white">
            Mucho más que un diagnóstico básico
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2 md:mt-4 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
            Combinamos evaluación técnica con estrategia empresarial. Soluciones específicas para cada industria, 
            tamaño de empresa y nivel de madurez digital.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Columna izquierda - Texto y botón */}
          <div className="space-y-6">
            {[
              { icon: <Settings className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />, 
                title: "Diagnóstico Integral", 
                desc: "Evaluación profunda de infraestructura, datos, talento y gobernanza para IA." },
              { icon: <Target className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />, 
                title: "Hoja de Ruta Estratégica", 
                desc: "Plan de implementación con objetivos claros, hitos y KPIs medibles." },
              { icon: <Route className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />, 
                title: "Implementación Guiada", 
                desc: "Acompañamiento continuo en la ejecución de tu transformación hacia IA." }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 md:gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mt-1 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white text-base md:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mt-1 text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            <button className="w-full md:w-auto px-6 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl text-base md:text-lg">
              Solicitar diagnóstico personalizado
            </button>
          </div>

          {/* Columna derecha - Personalización */}
          <div className="bg-slate-50 dark:bg-slate-700 p-4 md:p-6 lg:p-8 rounded-2xl">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-4 md:mb-6">
              Personaliza tu estrategia
            </h3>
            
            <div className="space-y-3">
              {[
                "Evaluación de infraestructura TI existente",
                "Análisis de calidad y gobernanza de datos",
                "Assessment de capacidades del equipo",
                "Priorización de casos de uso de IA",
                "Plan de implementación por fases",
                "Métricas de ROI y seguimiento"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-200 font-medium text-sm md:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}