type Prioridad = "Alta" | "Media" | "Baja";
type Nivel = 1 | 2 | 3 | 4 | 5;

interface TableRow {
  dimension: string;
  nivel: number;
  brecha: string;
  prioridad: string;
  evidencias: string;
}

interface DiagnosisTableProps {
  rows: TableRow[];
}

export function DiagnosisTable({ rows }: DiagnosisTableProps) {
  const getValidNivel = (nivel: number): Nivel => {
    return (nivel >= 1 && nivel <= 5) ? nivel as Nivel : 1;
  };

  const getValidPrioridad = (prioridad: string): Prioridad => {
    const prio = prioridad.toLowerCase();
    if (prio === "alta") return "Alta";
    if (prio === "media") return "Media";
    if (prio === "baja") return "Baja";
    return "Media";
  };

  return (
    <div
      id="tabla"
      className="mx-auto max-w-5xl rounded-2xl bg-[var(--card)] p-4 md:p-6 lg:p-8 shadow-xl border border-[var(--border)]"
    >
      {/* Título de la sección */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--card-foreground)]">
          Diagnóstico de Madurez en IA
        </h2>
        <p className="text-[var(--muted-foreground)] mt-2 text-sm md:text-base">
          Evaluación de las dimensiones críticas para la implementación de IA
        </p>
      </div>

      {/* Leyenda de niveles */}
      <div className="mb-4 md:mb-6 rounded-xl bg-[var(--accent)] px-4 py-3 text-xs md:text-sm text-[var(--accent-foreground)] border border-[var(--input)]">
        <span className="font-semibold">Niveles de madurez:</span> 1=Inicial · 2=Básico · 3=Estable · 4=Gestionado · 5=Optimizado
      </div>

      {/* CONTENEDOR PARA DESKTOP CON SCROLL */}
      <div className="overflow-x-auto">
        <div className="hidden lg:block min-w-[800px]">
          <div className="grid grid-cols-[1.2fr_0.8fr_1.2fr_0.8fr_1.6fr] gap-y-4 text-sm font-medium text-[var(--card-foreground)] w-full">
            {/* Encabezados */}
            <div className="col-span-5 grid grid-cols-subgrid rounded-lg bg-[var(--primary)]/10 px-4 py-3 font-semibold text-[var(--primary)]">
              <div>Dimensión</div>
              <div>Nivel</div>
              <div>Brecha</div>
              <div>Prioridad</div>
              <div>Evidencias</div>
            </div>

            {/* Filas dinámicas */}
            {rows.map((r, index) => (
              <div
                key={index}
                className="col-span-5 grid grid-cols-subgrid items-center rounded-lg px-4 py-3 even:bg-[var(--muted)] hover:bg-[var(--accent)] transition-colors duration-200"
              >
                <div className="font-medium truncate" title={r.dimension || "Sin dimensión"}>
                  {r.dimension || "Sin dimensión"}
                </div>
                <div>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] font-bold">
                    {getValidNivel(r.nivel)}
                  </span>
                </div>
                <div className="text-[var(--muted-foreground)] truncate" title={r.brecha || "Sin información"}>
                  {r.brecha || "Sin información"}
                </div>
                <div className={`font-semibold ${
                  getValidPrioridad(r.prioridad) === "Alta" ? "text-[var(--destructive)]" :
                  getValidPrioridad(r.prioridad) === "Media" ? "text-[oklch(0.828_0.189_84.429)]" :
                  "text-[oklch(0.769_0.188_70.08)]"
                }`}>
                  {getValidPrioridad(r.prioridad)}
                </div>
                <div className="text-[var(--muted-foreground)] truncate" title={r.evidencias || "Sin evidencias"}>
                  {r.evidencias || "Sin evidencias"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLA MOBILE - SEPARADA Y FUNCIONAL */}
      <div className="lg:hidden space-y-3 mt-6">
        {rows.map((r, index) => (
          <div
            key={index}
            className="bg-[var(--muted)] rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="font-medium text-[var(--card-foreground)]">
                {r.dimension || "Sin dimensión"}
              </div>
              <div>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] font-bold">
                  {getValidNivel(r.nivel)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-[var(--card-foreground)]">Brecha:</span>
                <span className="text-[var(--muted-foreground)] ml-2">{r.brecha || "Sin información"}</span>
              </div>
              
              <div>
                <span className="font-medium text-[var(--card-foreground)]">Prioridad:</span>
                <span className={`font-semibold ml-2 ${
                  getValidPrioridad(r.prioridad) === "Alta" ? "text-[var(--destructive)]" :
                  getValidPrioridad(r.prioridad) === "Media" ? "text-[oklch(0.828_0.189_84.429)]" :
                  "text-[oklch(0.769_0.188_70.08)]"
                }`}>
                  {getValidPrioridad(r.prioridad)}
                </span>
              </div>
              
              <div>
                <span className="font-medium text-[var(--card-foreground)]">Evidencias:</span>
                <span className="text-[var(--muted-foreground)] ml-2">{r.evidencias || "Sin evidencias"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nota al pie */}
      <div className="mt-6 md:mt-8 text-xs text-[var(--muted-foreground)] text-center">
        Este diagnóstico es una evaluación preliminar. Para un análisis detallado, contacte a nuestros especialistas.
      </div>
    </div>
  );
}