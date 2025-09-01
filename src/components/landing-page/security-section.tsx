import { Shield, Lock, CheckCircle } from "lucide-react";

export function SecuritySection() {
  return (
    <section className="bg-[var(--background)] py-12 md:py-16 text-[var(--foreground)]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Texto principal */}
          <div className="lg:w-2/3 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Seguridad y confianza en cada diagnóstico
            </h2>
            <p className="text-base md:text-lg text-[var(--muted-foreground)]">
              Nuestra IA garantiza privacidad y manejo responsable de los datos
              en todo el proceso de análisis y evaluación.
            </p>
          </div>

          {/* Iconos y características */}
          <div className="lg:w-1/3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 md:gap-6">
            {[
              {
                icon: <Shield className="h-5 w-5 md:h-6 md:w-6 text-[var(--primary)]" />,
                title: "Protección integral",
                desc: "Datos seguros de principio a fin",
              },
              {
                icon: <Lock className="h-5 w-5 md:h-6 md:w-6 text-[var(--primary)]" />,
                title: "Privacidad garantizada",
                desc: "Procesamiento confidencial de información",
              },
              {
                icon: <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[var(--primary)]" />,
                title: "Confianza",
                desc: "Buenas prácticas en ciberseguridad",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-[var(--card)] rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-[var(--accent)]/30 p-2 rounded-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] text-xs md:text-sm mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges de seguridad */}
        <div className="mt-8 md:mt-12 flex flex-wrap gap-3 justify-center items-center">
          {[
            "🔒 Datos encriptados",
            "✅ Buenas prácticas de seguridad",
            "🌐 Procesamiento local y en la nube",
          ].map((badge, index) => (
            <div
              key={index}
              className="bg-[var(--card)] px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm text-[var(--foreground)]"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}