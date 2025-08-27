export function MetricsSection() {
  return (
    <section className="bg-[var(--background)] py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Título */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
            Resultados del Diagnóstico de IA
          </h2>
          <p className="text-[var(--muted-foreground)] mt-2 md:mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Las organizaciones que usan nuestro diagnóstico de capacidades TI → IA
            logran mejoras medibles en eficiencia, datos y adopción de inteligencia artificial.
          </p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: "60%", text: "menos tiempo en implementar proyectos de IA" },
            { value: "81%", text: "mejora en la gobernanza de datos para IA" },
            { value: "40%", text: "más eficiencia en equipos técnicos" },
            { value: "87%", text: "menos errores en despliegue de modelos de IA" }
          ].map((metric, index) => (
            <div
              key={index}
              className="bg-[var(--card)] rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--primary)] mb-2 md:mb-3">
                {metric.value}
              </div>
              <div className="text-[var(--foreground)] text-xs md:text-sm opacity-80">
                {metric.text}
              </div>
            </div>
          ))}
        </div>

        {/* Texto y botón */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-[var(--muted-foreground)] text-xs md:text-sm mb-4 md:mb-6">
            *Resultados basados en simulaciones y análisis de pruebas del diagnóstico IA.
          </p>
          <button className="px-4 py-2 md:px-6 md:py-3 bg-[var(--primary)] hover:bg-[var(--primary-foreground)] text-white rounded-lg font-medium transition-colors text-sm md:text-base">
            Conocer más
          </button>
        </div>
      </div>
    </section>
  );
}
