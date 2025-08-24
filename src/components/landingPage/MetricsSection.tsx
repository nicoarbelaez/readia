
export function MetricsSection() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            Resultados del Diagnóstico de IA
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2 md:mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Las empresas que implementan nuestro diagnóstico de capacidades de TI hacia IA experimentan mejoras significativas en su transformación digital
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: "60%", text: "de reducción en el tiempo de implementación de proyectos de IA" },
            { value: "81%", text: "de las empresas mejoran su gobernanza de datos para IA" },
            { value: "40%", text: "de aumento en la eficiencia de los equipos de ciencia de datos" },
            { value: "87%", text: "de reducción en errores de implementación de modelos de IA" }
          ].map((metric, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 shadow-lg text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 md:mb-3">
                {metric.value}
              </div>
              <div className="text-slate-700 dark:text-slate-300 text-xs md:text-sm">
                {metric.text}
              </div>
            </div>
          ))}
        </div>

        {/* Texto adicional */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mb-4 md:mb-6">
            *Resultados basados en el análisis de empresas que han implementado nuestro diagnóstico de capacidades TI-IA
          </p>
          <button className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm md:text-base">
            Conocer casos de éxito
          </button>
        </div>
      </div>
    </section>
  );
}