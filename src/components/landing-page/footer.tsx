"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-border/40 border-t py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold tracking-tight">
              <span className="from-primary bg-linear-to-r to-emerald-400 bg-clip-text text-transparent">
                Readia
              </span>
            </h3>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed opacity-90">
              Auditoría inteligente que evalúa tus capacidades tecnológicas y
              genera planes estratégicos automatizados para adoptar Inteligencia
              Artificial.
            </p>
          </div>

          {/* Recursos */}
          <div className="space-y-4">
            <h4 className="text-foreground text-sm font-extrabold tracking-wider uppercase">
              Recursos
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#faq"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer inferior */}
        <div className="border-border/40 text-muted-foreground/60 mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <span>
              © {currentYear} Readia. Proyecto académico de innovación
              tecnológica.
            </span>
            <span className="hidden sm:inline">·</span>
            <a
              href="http://arbelaeznicolas.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              by Nicolas Arbelaez
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
