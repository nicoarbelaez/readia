"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  Loader2,
  BrainCircuit,
  Map,
  BookOpen,
  Download,
  HelpCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

// --- MOCK DATA / SERVICIOS ---

type Priority = "Alta" | "Media" | "Baja";

interface Recommendation {
  id: string;
  text: string;
  priority: Priority;
  category: string;
}

interface PillarData {
  subject: string;
  A: number;
  fullMark: number;
}

interface DiagnosticResult {
  overallScore: number;
  scoreLabel: string;
  scoreDescription: string;
  distribution: { name: string; value: number; color: string }[];
  pillars: {
    title: string;
    description: string; // Descripción para el tooltip
    data: PillarData[];
  }[];
  recommendations: Recommendation[];
  conclusionsMarkdown: string;
}

const MOCK_DATA: DiagnosticResult = {
  overallScore: 68,
  scoreLabel: "Nivel 3: Gestionado",
  scoreDescription:
    "Su organización ha formalizado procesos de IA y tiene pilotos exitosos, pero aún carece de una integración profunda en el núcleo del negocio.",
  distribution: [
    { name: "Estrategia", value: 30, color: "#3b82f6" },
    { name: "Datos", value: 20, color: "#ef4444" },
    { name: "Tecnología", value: 25, color: "#22c55e" },
    { name: "Cultura", value: 15, color: "#eab308" },
    { name: "Gobernanza", value: 10, color: "#a855f7" },
  ],
  pillars: [
    {
      title: "Datos e Infraestructura",
      description:
        "Evalúa la calidad, accesibilidad y arquitectura de los datos disponibles para entrenar modelos.",
      data: [
        { subject: "Calidad", A: 65, fullMark: 100 },
        { subject: "Acceso", A: 80, fullMark: 100 },
        { subject: "Volumen", A: 90, fullMark: 100 },
        { subject: "Arquitectura", A: 50, fullMark: 100 },
      ],
    },
    {
      title: "Cultura y Talento",
      description:
        "Mide la disposición al cambio del equipo y las capacidades técnicas instaladas.",
      data: [
        { subject: "Liderazgo", A: 70, fullMark: 100 },
        { subject: "Upskilling", A: 40, fullMark: 100 },
        { subject: "Adopción", A: 60, fullMark: 100 },
        { subject: "Ética", A: 50, fullMark: 100 },
      ],
    },
    {
      title: "Estrategia y Visión",
      description:
        "Analiza la alineación entre los objetivos de negocio y las iniciativas de Inteligencia Artificial.",
      data: [
        { subject: "KPIs", A: 85, fullMark: 100 },
        { subject: "Roadmap", A: 75, fullMark: 100 },
        { subject: "Presupuesto", A: 60, fullMark: 100 },
        { subject: "Alineación", A: 90, fullMark: 100 },
        { subject: "Innovación", A: 70, fullMark: 100 },
        { subject: "Riesgo", A: 80, fullMark: 100 },
      ],
    },
  ],
  recommendations: [
    {
      id: "1",
      text: "Establecer un Data Lake centralizado para eliminar silos de información entre departamentos.",
      priority: "Alta",
      category: "Datos",
    },
    {
      id: "2",
      text: "Definir un marco ético de IA antes de escalar los modelos a producción.",
      priority: "Alta",
      category: "Gobernanza",
    },
    {
      id: "3",
      text: "Capacitar a mandos medios en conceptos básicos de IA Generativa.",
      priority: "Media",
      category: "Talento",
    },
    {
      id: "4",
      text: "Automatizar el pipeline de despliegue (MLOps) para reducir tiempos de entrega.",
      priority: "Media",
      category: "Tecnología",
    },
    {
      id: "5",
      text: "Crear un boletín interno de casos de éxito de IA.",
      priority: "Baja",
      category: "Cultura",
    },
    {
      id: "6",
      text: "Evaluar proveedores de nube para optimizar costos de inferencia.",
      priority: "Baja",
      category: "Infraestructura",
    },
    {
      id: "7",
      text: "Definir KPIs de negocio claros para los pilotos actuales.",
      priority: "Alta",
      category: "Estrategia",
    },
  ],
  conclusionsMarkdown: `
### Resumen Ejecutivo

La organización muestra una **base sólida en estrategia**, con una visión clara de hacia dónde quiere ir. Sin embargo, la brecha más crítica se encuentra en la **gobernanza de datos** y la democratización del acceso a la información.

### Puntos Clave

1. **Fortaleza en Liderazgo:** Existe un patrocinio claro desde la dirección, lo cual es el motor principal para avanzar al siguiente nivel.
2. **Cuello de Botella Tecnológico:** Aunque hay herramientas, la falta de automatización (MLOps) está ralentizando la entrega de valor de meses a semanas.
3. **Riesgo Operativo:** La dependencia de "héroes de datos" individuales en lugar de procesos estandarizados representa un riesgo significativo si hay rotación de personal.

### Siguientes Pasos

Se recomienda priorizar la **estandarización de la ingesta de datos** antes de invertir en modelos más complejos. La madurez actual permite pilotos exitosos, pero no soportará una carga de producción a escala sin refactorizar la arquitectura de datos subyacente.
  `,
};

const fetchDiagnosticData = (): Promise<DiagnosticResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 100);
  });
};

// --- HELPER COMPONENTS ---

const InfoTooltip = ({ content }: { content: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon">
        <HelpCircle className="size-5" />
        <span className="sr-only">Más información</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{content}</p>
    </TooltipContent>
  </Tooltip>
);

// --- MAIN COMPONENTS ---

const LoadingScreen = () => (
  <div className="animate-in fade-in flex min-h-[60vh] flex-col items-center justify-center space-y-6 p-8 text-center duration-700">
    <div className="relative">
      <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/20 blur-xl" />
      <BrainCircuit className="relative z-10 h-20 w-20 animate-pulse text-blue-600" />
    </div>
    <div className="max-w-md space-y-2">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        Analizando sus respuestas...
      </h2>
      <p className="text-slate-500">
        Estamos generando el diagnóstico perfecto para usted.
      </p>
    </div>
    <div className="flex items-center space-x-2 text-sm text-slate-400">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Procesando dimensiones...</span>
    </div>
  </div>
);

const CardBento = ({
  title,
  infoTooltipContent,
  description,
  cardContent,
  cardFooter,
  className,
  ...props
}: {
  title: string;
  infoTooltipContent?: string;
  description?: React.ReactNode | string;
  cardContent: React.ReactNode;
  cardFooter?: React.ReactNode;
} & React.ComponentProps<"div">) => (
  <Card
    className={cn(
      "group h-full shadow-sm transition-all duration-300 hover:shadow-md",
      className,
    )}
    {...props}
  >
    <CardHeader>
      <CardTitle className="text-sm font-bold tracking-widest uppercase">
        {title}
      </CardTitle>
      {description && (
        <CardDescription>
          {typeof description === "string" ? (
            <span>{description}</span>
          ) : (
            description
          )}
        </CardDescription>
      )}
      {infoTooltipContent && (
        <CardAction>
          <InfoTooltip content={infoTooltipContent} />
        </CardAction>
      )}
    </CardHeader>
    <CardContent className="flex h-full flex-col">{cardContent}</CardContent>
    {cardFooter && <CardFooter>{cardFooter}</CardFooter>}
  </Card>
);

const ScoreCard = ({
  score,
  label,
  description,
}: {
  score: number;
  label: string;
  description: string;
}) => (
  <CardBento
    title="Puntaje Global"
    infoTooltipContent="Puntaje calculado ponderando las 5 dimensiones del modelo AICam."
    description={
      <Badge
        variant="secondary"
        className={`${score > 50 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
      >
        {label}
      </Badge>
    }
    cardContent={
      <div className="flex h-full flex-col">
        <div className="flex flex-grow flex-col justify-center">
          <div className="flex items-baseline space-x-1">
            <span className="text-6xl font-black tracking-tighter lg:text-7xl">
              {score}
            </span>
            <span className="text-muted-foreground text-xl font-medium lg:text-2xl">
              /100
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    }
  />
);

const DistributionChart = ({ data }: { data: any[] }) => (
  <CardBento
    title="Distribución"
    infoTooltipContent="Peso relativo de cada pilar en su puntaje final."
    cardContent={
      <div className="min-h-[160px] w-full flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={65}
              paddingAngle={5}
              dataKey="value"
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <RechartsTooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{
                color: "#1e293b",
                fontSize: "12px",
                fontWeight: 600,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Legend simplificado */}
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {data.slice(0, 3).map((item, i) => (
            <div
              key={i}
              className="flex items-center text-[10px] text-slate-500"
            >
              <div
                className="mr-1.5 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    }
  />
);

const RadarCard = ({
  title,
  description,
  data,
  wide = false,
}: {
  title: string;
  description: string;
  data: PillarData[];
  wide?: boolean;
}) => (
  <CardBento
    title={title}
    infoTooltipContent={description}
    description={description}
    cardContent={
      <div className="min-h-[180px] w-full flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius={wide ? "75%" : "65%"}
            data={data}
          >
            <PolarGrid stroke="#f1f5f9" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name={title}
              dataKey="A"
              stroke="#2563eb"
              strokeWidth={3}
              fill="#3b82f6"
              fillOpacity={0.15}
              isAnimationActive={true}
            />
            <RechartsTooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                fontSize: "12px",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    }
  />
);

const RecommendationsPanel = ({
  recommendations,
}: {
  recommendations: Recommendation[];
}) => {
  const getPriorityStyles = (p: Priority) => {
    switch (p) {
      case "Alta":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "Media":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Baja":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-slate-800 text-slate-400";
    }
  };

  return (
    <CardBento
      title="Recomendaciones"
      infoTooltipContent="Acciones sugeridas basadas en las brechas más grandes encontradas."
      description="Priorizadas por impacto"
      cardContent={
        <ScrollArea className="flex h-full flex-col">
          <div className="h-full flex-grow space-y-3 overflow-y-auto pr-2 md:min-h-0">
            {recommendations.map((rec) => (
              <>
                <Item key={rec.id} variant="outline" className="group hover:bg-accent">
                  <ItemContent>
                    <ItemTitle>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase",
                          getPriorityStyles(rec.priority),
                        )}
                      >
                        {rec.priority}
                      </span>
                    </ItemTitle>
                    <ItemDescription>{rec.text}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <span className="group-hover:text-foreground text-[10px] uppercase transition-colors">
                      {rec.category}
                    </span>
                  </ItemActions>
                </Item>
                {/* <div
                  key={rec.id}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${getPriorityStyles(rec.priority)}`}
                    >
                      {rec.priority}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 uppercase transition-colors group-hover:text-slate-300">
                      {rec.category}
                    </span>
                  </div>
                  <p className="text-sm leading-snug font-light text-slate-300">
                    {rec.text}
                  </p>
                </div> */}
              </>
            ))}
          </div>
        </ScrollArea>
      }
    />
  );
};

const ConclusionsBook = ({ markdown }: { markdown: string }) => {
  return (
    <CardBento
      title="Informe de Conclusiones"
      infoTooltipContent="Este resumen se genera automáticamente analizando todas sus respuestas y puntuaciones."
      description="Resumen generado por IA"
      cardContent={
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-base max-w-none md:columns-2">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      }
      cardFooter={
        <>
          <Badge variant="outline" className="rounded">
            ID: REF-2024-AI-CAM-882
          </Badge>
        </>
      }
    />
  );
};

// --- MAIN PAGE ---

export default function Diagnostic() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DiagnosticResult | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchDiagnosticData();
        setData(result);
      } catch (error) {
        console.error("Error loading diagnostic:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <LoadingScreen />;
  if (!data) return <div>Error al cargar datos.</div>;

  return (
    <TooltipProvider>
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Diagnóstico de Madurez
              </h1>
              <p className="mt-1 text-sm md:text-base">Análisis AICam</p>
            </div>
            <div className="flex space-x-2 md:space-x-3">
              <button className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 md:text-sm">
                <Map className="mr-2 h-4 w-4" />
                Hoja de Ruta
              </button>
              <button className="flex items-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 md:text-sm">
                <Download className="mr-2 h-4 w-4" />
                PDF
              </button>
            </div>
          </div>

          {/* Bento Grid Layout - CORREGIDO: Eliminado auto-rows-fr */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* ROW 1 */}
            {/* Col 1: Score */}
            <div className="col-span-1 min-h-[250px] md:col-span-1 md:h-auto">
              <ScoreCard
                score={data.overallScore}
                label={data.scoreLabel}
                description={data.scoreDescription}
              />
            </div>

            {/* Col 2: Distribution */}
            <div className="col-span-1 min-h-[250px] md:col-span-1 md:h-auto">
              <DistributionChart data={data.distribution} />
            </div>

            {/* Col 3-4: Recommendations - Ocupa 2 filas implícitas en visual, pero aquí lo dejamos libre */}
            <div className="col-span-1 min-h-[500px] md:col-span-2 md:row-span-2">
              <RecommendationsPanel recommendations={data.recommendations} />
            </div>

            {/* ROW 2 */}
            {/* Col 1: Radar 1 */}
            <div className="col-span-1 min-h-[250px] md:col-span-1">
              <RadarCard
                title={data.pillars[0].title}
                description={data.pillars[0].description}
                data={data.pillars[0].data}
              />
            </div>

            {/* Col 2: Radar 2 */}
            <div className="col-span-1 min-h-[250px] md:col-span-1">
              <RadarCard
                title={data.pillars[1].title}
                description={data.pillars[1].description}
                data={data.pillars[1].data}
              />
            </div>

            {/* ROW 3 */}
            {/* Radar Wide */}
            <div className="col-span-1 min-h-[300px] md:col-span-4">
              <RadarCard
                title={data.pillars[2].title}
                description={data.pillars[2].description}
                data={data.pillars[2].data}
                wide={true}
              />
            </div>

            {/* ROW 4 */}
            {/* Conclusions Book */}
            <div className="col-span-1 md:col-span-4">
              <ConclusionsBook markdown={data.conclusionsMarkdown} />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
