"use client";

import React, { useState, useEffect } from "react";
import { Map, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { LoadingScreen } from "@/components/diagnostic/loading-screen";
import { ScoreCard } from "@/components/diagnostic/score-card";
import { RecommendationsPanel } from "@/components/diagnostic/recommendations-panel";
import { RadarCard } from "@/components/diagnostic/radar-card";
import { DistributionChart } from "@/components/diagnostic/distribution-chart";
import { ConclusionsBook } from "@/components/diagnostic/conclusions-book";
import { SponsorCard } from "@/components/diagnostic/sponsor-card";

export type Priority = "Alta" | "Media" | "Baja";

export interface Recommendation {
  id: string;
  text: string;
  priority: Priority;
  category: string;
}

export interface PillarData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface DiagnosticResult {
  overallScore: number;
  scoreLabel: string;
  scoreDescription: string;
  distribution: { name: string; value: number; color: string }[];
  pillars: {
    title: string;
    description: string;
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

const headerActions = (
  <>
    <Link href="/roadmap">
      <Button variant="outline" className="shadow-primary-soft/10">
        <Map className="size-4" />
        Hoja de Ruta
      </Button>
    </Link>
    <Button
      variant="secondary"
      className="shadow-primary-soft/10 flex items-center"
    >
      <Download className="size-4" />
      PDF
    </Button>
  </>
);

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
    <PageLayout
      title="Diagnóstico de Madurez"
      description="Análisis AICam"
      actions={headerActions}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2 xl:col-span-1">
          <ScoreCard
            score={data.overallScore}
            label={data.scoreLabel}
            description={data.scoreDescription}
          />
        </div>

        <div className="min-h-96 sm:col-start-3 sm:row-span-2 xl:col-start-1 xl:row-start-2">
          <DistributionChart data={data.distribution} />
        </div>

        <div className="row-span-2 hidden xl:block">
          <SponsorCard />
        </div>

        <div className="sm:col-span-3 sm:row-start-4 sm:max-h-96 xl:col-span-2 xl:row-span-4 xl:max-h-[856px]">
          <RecommendationsPanel recommendations={data.recommendations} />
        </div>

        <div className="sm:row-span-2 sm:row-start-2 xl:col-start-1 xl:row-start-4">
          <RadarCard
            title={data.pillars[0].title}
            description={data.pillars[0].description}
            data={data.pillars[0].data}
          />
        </div>

        <div className="sm:row-span-2 sm:row-start-2 xl:col-start-2 xl:row-start-3">
          <RadarCard
            title={data.pillars[1].title}
            description={data.pillars[1].description}
            data={data.pillars[1].data}
          />
        </div>

        <div className="sm:col-start-3 sm:row-start-3 xl:col-span-3 xl:col-start-2 xl:row-start-5">
          <RadarCard
            title={data.pillars[2].title}
            description={data.pillars[2].description}
            data={data.pillars[2].data}
            wide={true}
          />
        </div>

        <div className="sm:col-span-4 sm:row-start-6">
          <ConclusionsBook markdown={data.conclusionsMarkdown} />
        </div>
      </div>
    </PageLayout>
  );
}
