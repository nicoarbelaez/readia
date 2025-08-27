import FlowClient from "@/components/flow/flow-client";
import { ReactFlowEdges, ReactFlowNode } from "@/types/roadmap-flow";

const initialNodes: ReactFlowNode[] = [
  {
    id: "empresa",
    type: "customNode",
    position: { x: -320, y: -200 },
    data: {
      label: "Empresa",
      details: {
        description:
          "Organización que desea implementar IA. Punto de partida para alinear estrategia, recursos y prioridades.",
        owner: "Dirección general / CIO",
        priorities: [
          "Alineación estratégica",
          "Maximizar ROI",
          "Minimizar riesgo",
        ],
      },
    },
  },

  {
    id: "diagnostico",
    position: { x: -320, y: 140 },
    data: {
      label: "1. Diagnóstico inicial",
      details: {
        objectives: [
          "Evaluar madurez de datos y TI",
          "Identificar procesos con mayor potencial de automatización/optimización",
          "Detectar barreras (datos, cultura, infra)",
        ],
        actions: [
          "Entrevistas con stakeholders clave",
          "Mapeo de procesos y pain points",
          "Inventario y evaluación de calidad de datos",
          "Auditoría de sistemas y APIs existentes",
        ],
        tools: [
          "Encuestas internas",
          "SQL/BI para extracción de datos",
          "Herramientas de profiling (Great Expectations, pandas-profiling)",
        ],
        deliverables: [
          "Informe de madurez",
          "Lista priorizada de casos de uso",
          "Mapa de dependencias de datos",
        ],
        kpis: [
          "Número de casos de uso priorizados",
          "Índice de calidad de datos (0-100)",
        ],
        owner: "Equipo de análisis / BI",
      },
    },
  },

  {
    id: "estrategia",
    type: "customNode",
    position: { x: 0, y: 50 },
    data: {
      label: "2. Diseño de la estrategia de IA",
      details: {
        objectives: [
          "Establecer visión y objetivos SMART para IA",
          "Definir gobernanza, roles y presupuesto",
          "Seleccionar arquitectura y stack tecnológicos",
        ],
        actions: [
          "Definir casos de uso prioritarios y criterios de éxito",
          "Elegir enfoque: construir vs comprar vs servicio",
          "Diseñar gobernanza de datos y modelos (responsabilidades, revisión, explicabilidad)",
        ],
        tools: [
          "Plantillas de ROI",
          "Frameworks de gobernanza (p.ej. model cards)",
          "Documentación de arquitectura (diagramas)",
        ],
        deliverables: [
          "Hoja de ruta priorizada",
          "Políticas de gobernanza",
          "Estimación presupuestal por fase",
        ],
        kpis: ["Tasa de adopción prevista", "ROI estimado por caso de uso"],
        owner: "CIO / PMO de IA",
      },
    },
  },

  {
    id: "infra",
    position: { x: -480, y: 340 },
    data: {
      label: "Infra & Datos",
      details: {
        objectives: [
          "Asegurar plataforma de datos robusta y escalable",
          "Implementar pipelines reproducibles y control de versión de datos",
        ],
        actions: [
          "Diseñar data lake/warehouse y/o lakehouse",
          "Establecer ingestion pipelines, transformación, catalogación",
          "Implementar monitoring y alertas para la calidad de datos",
        ],
        tools: [
          "Snowflake/BigQuery/Databricks/S3",
          "Airflow/Prefect",
          "DBT, Data Catalogs, Great Expectations",
        ],
        deliverables: [
          "Arquitectura de datos",
          "Pipelines ETL/ELT",
          "Catálogo de datos con propietarios",
        ],
        kpis: [
          "SLA de freshness de datos",
          "Porcentaje de datasets con calidad aceptable",
        ],
        owner: "Equipo de datos / Platform",
      },
    },
  },

  {
    id: "piloto",
    position: { x: 320, y: 140 },
    data: {
      label: "3. Desarrollo e implementación de pilotos",
      details: {
        objectives: [
          "Probar hipótesis en entornos controlados",
          "Validar impacto y factibilidad técnica",
          "Obtener aprendizaje rápido para escalado",
        ],
        actions: [
          "Seleccionar 1-3 casos de uso de baja complejidad y alto impacto",
          "Preparar datasets de entrenamiento/validación",
          "Entrenar modelos, evaluar con métricas y realizar A/B tests",
          "Implementar integraciones mínimas a producción (canary/beta)",
        ],
        tools: [
          "Python, scikit-learn, PyTorch, TensorFlow",
          "MLOps: MLflow, Weights & Biases, TFX",
          "APIs para inferencia (FastAPI, serverless)",
        ],
        deliverables: [
          "Modelos validados",
          "Playbook de deployment",
          "Resultados del experimento (KPIs)",
        ],
        kpis: [
          "Precisión/Recall según caso",
          "Impacto en métricas de negocio (p.ej. reducción de costos)",
        ],
        owner: "Equipo de Data Science / Desarrollo",
      },
    },
  },

  {
    id: "gobernanza",
    position: { x: 480, y: 340 },
    data: {
      label: "Gobernanza, Ética y Seguridad",
      details: {
        objectives: [
          "Garantizar uso responsable y seguro de la IA",
          "Cumplir regulaciones y reducir sesgos",
        ],
        actions: [
          "Crear políticas de privacidad y uso de datos",
          "Implementar revisiones de sesgo y explicabilidad",
          "Auditorías de seguridad para modelos y datos",
        ],
        tools: [
          "Model cards, bias evaluation toolkits, auditorías de seguridad",
        ],
        deliverables: [
          "Políticas de IA",
          "Reportes de auditoría",
          "Checklist de aprobación para modelos",
        ],
        kpis: [
          "Número de modelos aprobados con compliance",
          "Incidentes de seguridad relacionados con IA",
        ],
        owner: "Legal / Seguridad / Equipo de Ética",
      },
    },
  },

  {
    id: "capacitacion",
    position: { x: -120, y: 340 },
    data: {
      label: "4. Capacitación & Gestión del Cambio",
      details: {
        objectives: [
          "Aumentar adopción y reducir resistencia",
          "Empoderar a usuarios y equipos con habilidades necesarias",
        ],
        actions: [
          "Diseñar programas formativos por roles (ejecutivos, analistas, ops)",
          "Comunicación interna con pilotos de éxito y casos de uso",
          "Crear canal de soporte y base de conocimiento",
        ],
        tools: [
          "LMS (Coursera for Business, internal LMS)",
          "Workshops prácticos",
          "Documentación y playbooks",
        ],
        deliverables: [
          "Planes de formación",
          "Materiales y videos",
          "Programa de champions internos",
        ],
        kpis: [
          "% de usuarios formados",
          "Satisfacción y adopción post-training",
        ],
        owner: "RRHH / PMO",
      },
    },
  },

  {
    id: "escalabilidad",
    position: { x: 120, y: 520 },
    data: {
      label: "5. Escalabilidad y Optimización",
      details: {
        objectives: [
          "Extender soluciones exitosas a mayor alcance",
          "Optimizar costes y performance de modelos",
        ],
        actions: [
          "Automatizar pipelines de ML y CI/CD para modelos",
          "Estandarizar MLops y prácticas de monitoring",
          "Iterar modelos con nuevos datos y feedback",
        ],
        tools: [
          "Kubernetes, serverless inference, autoscaling",
          "Prometheus/Grafana para monitoring",
          "Feature stores",
        ],
        deliverables: [
          "Plataforma MLOps estable",
          "Runbooks de operación",
          "Roadmap de mejoras contínuas",
        ],
        kpis: [
          "Tiempo medio para deployment",
          "Coste por inferencia",
          "Disponibilidad de servicio",
        ],
        owner: "Platform / DevOps",
      },
    },
  },

  {
    id: "ia",
    type: "default",
    position: { x: 360, y: 520 },
    data: {
      label: "Resultado: IA productiva",
      details: {
        description:
          "Modelos y capacidades integradas en los procesos de negocio que aportan valor medible y repetible.",
        successCriteria: [
          "Impacto en KPIs de negocio",
          "Adopción por usuarios",
          "Gobernanza y cumplimiento",
        ],
        nextSteps: [
          "Mantenimiento continuo",
          "Nuevos casos de uso",
          "Monitoreo y retraining",
        ],
      },
    },
  },
];

const initialEdges: ReactFlowEdges[] = [
  {
    id: "empresa->diagnostico",
    source: "empresa",
    target: "diagnostico",
  },
  {
    id: "diagnostico->estrategia",
    source: "diagnostico",
    target: "estrategia",
  },
  { id: "estrategia->piloto", source: "estrategia", target: "piloto" },
  { id: "estrategia->infra", source: "estrategia", target: "infra" },
  { id: "piloto->gobernanza", source: "piloto", target: "gobernanza" },
  { id: "piloto->capacitacion", source: "piloto", target: "capacitacion" },
  { id: "infra->capacitacion", source: "infra", target: "capacitacion" },
  {
    id: "capacitacion->escalabilidad",
    source: "capacitacion",
    target: "escalabilidad",
  },
  {
    id: "gobernanza->escalabilidad",
    source: "gobernanza",
    target: "escalabilidad",
  },
  {
    id: "escalabilidad->ia",
    source: "escalabilidad",
    target: "ia",
    animated: true,
  },
];

export default function RoadMap() {
  return (
    <div className="h-full px-6 pb-6">
      {/* puedes pasar datos desde server -> cliente */}
      <FlowClient initialNodes={initialNodes} initialEdges={initialEdges} />
    </div>
  );
}
