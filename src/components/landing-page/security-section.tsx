import { Shield, Lock, CheckCircle } from "lucide-react";

export function SecuritySection() {
  return (
    <section className="bg-slate-900 dark:bg-slate-950 py-12 md:py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Texto principal */}
          <div className="lg:w-2/3 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Una IA segura y confiable
            </h2>
            <p className="text-lg md:text-xl text-blue-100">
              Garantizamos la privacidad y seguridad de los datos en todo el proceso de diagnóstico e implementación de IA empresarial.
            </p>
          </div>

          {/* Iconos y características */}
          <div className="lg:w-1/3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 md:gap-6">
            {[
              { icon: <Shield className="h-5 w-5 md:h-6 md:w-6" />, title: "Protección integral", desc: "Cifrado de datos end-to-end" },
              { icon: <Lock className="h-5 w-5 md:h-6 md:w-6" />, title: "Cumplimiento normativo", desc: "RGPD, HIPAA y estándares industry" },
              { icon: <CheckCircle className="h-5 w-5 md:h-6 md:w-6" />, title: "Certificaciones", desc: "Auditorías de seguridad regulares" }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                <div className="bg-blue-600 p-2 rounded-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">{item.title}</h3>
                  <p className="text-blue-200 text-xs md:text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges de seguridad */}
        <div className="mt-8 md:mt-12 flex flex-wrap gap-3 justify-center items-center">
          {["✅ ISO 27001 certificado", "🔒 Datos encriptados", "🌐 Hosting en UE", "📋 Contratos de confidencialidad"]
            .map((badge, index) => (
              <div key={index} className="bg-slate-800 px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm">
                {badge}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}