
export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Diagnóstico TI → IA</h3>
            <p className="text-slate-400 mb-4 md:mb-6 text-sm md:text-base">
              Expertos en evaluar y transformar las capacidades tecnológicas 
              de empresas hacia la implementación efectiva de Inteligencia Artificial.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-4">
              <div className="bg-slate-800 px-3 py-2 rounded-lg text-xs md:text-sm">
                🔒 ISO 27001
              </div>
              <div className="bg-slate-800 px-3 py-2 rounded-lg text-xs md:text-sm">
                🌐 EU Data
              </div>
            </div>
          </div>

          {/* Soluciones */}
          <div>
            <h4 className="font-semibold text-lg mb-3 md:mb-4">Soluciones</h4>
            <ul className="space-y-1 md:space-y-2 text-slate-400 text-sm md:text-base">
              {["Para grandes empresas", "Para pymes", "Para startups", "Sector financiero", 
                "Sector salud", "Sector retail", "Sector industrial", "Para desarrolladores"]
                .map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors text-xs md:text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold text-lg mb-3 md:mb-4">Recursos</h4>
            <ul className="space-y-1 md:space-y-2 text-slate-400 text-sm md:text-base">
              {["Blog", "Testimonios", "Casos de éxito", "Whitepapers", 
                "Webinars", "Soporte técnico", "Documentación API"]
                .map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors text-xs md:text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold text-lg mb-3 md:mb-4">Empresa</h4>
            <ul className="space-y-1 md:space-y-2 text-slate-400 text-sm md:text-base">
              {["Sobre nosotros", "Trabaja con nosotros", "Contacto", 
                "Solicitar demo", "Partners", "Prensa", "Eventos"]
                .map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors text-xs md:text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="border-t border-slate-800 my-6 md:my-8"></div>

        {/* Footer inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-xs md:text-sm text-center md:text-left">
            © 2025 Diagnóstico TI → IA. Todos los derechos reservados.
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm text-slate-400">
            {["Aviso legal", "Condiciones de contratación", "Política de privacidad", 
              "Política de cookies", "Política de seguridad"]
              .map((item, index) => (
              <a key={index} href="#" className="hover:text-white transition-colors whitespace-nowrap">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}