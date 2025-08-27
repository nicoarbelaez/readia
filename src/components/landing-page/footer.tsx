export function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Logo y descripción */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-[var(--primary)]">
              Readia
            </h3>
            <p className="text-[var(--muted-foreground)] text-sm md:text-base">
              IA que evalúa tus capacidades tecnológicas y genera un plan claro para adoptar Inteligencia Artificial.
            </p>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-[var(--foreground)]">Recursos</h4>
            <ul className="space-y-2 text-[var(--muted-foreground)] text-sm">
              <li>
                <a href="#faq" className="hover:text-[var(--primary)] transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="#recursos" className="hover:text-[var(--primary)] transition-colors">
                  Documentación
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-[var(--primary)] transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-[var(--foreground)]">Contacto</h4>
            <ul className="space-y-2 text-[var(--muted-foreground)] text-sm">
              <li>
                <a href="mailto:info@readia.com" className="hover:text-[var(--primary)] transition-colors">
                  info@readia.com
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-[var(--primary)] transition-colors">
                  Formulario de contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer inferior */}
        <div className="border-t border-[var(--border)] mt-6 pt-6 text-center text-xs text-[var(--muted-foreground)]">
          © 2025 Readia. Proyecto universitario.
        </div>
      </div>
    </footer>
  );
}
