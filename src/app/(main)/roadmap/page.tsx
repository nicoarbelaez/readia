import FlowClient from "@/components/flow/flow-client";
import { ReactFlowEdges, ReactFlowNode } from "@/types/roadmap-flow";

const type = "CustomNode";
const position = { x: 0, y: 0 };

const initialNodes: ReactFlowNode[] = [
  {
    id: "empresa",
    type,
    position,
    data: {
      label: "Empresa",
      details: {
        nodeType: "Goal",
        description:
          "Organización que desea implementar IA. Punto de partida para alinear estrategia, recursos y prioridades. Incluye restricciones legales, presupuestales y de gobernanza existentes.",
        owner: "Dirección general / CIO",
        constraints: [
          "Presupuesto anual asignado",
          "Regulaciones sectoriales aplicables",
          "Capacidad de contratación/contratación externa",
        ],
        priorities: [
          "Alineación estratégica",
          "Maximizar ROI",
          "Minimizar riesgo",
          "Velocidad de adopción",
        ],
        timeline: "Q1-Q4 año fiscal",
      },
    },
  },

  {
    id: "stakeholders",
    type,
    position,
    data: {
      label: "Stakeholders clave",
      details: {
        nodeType: "Artifact",
        description:
          "Lista y mapa de interés/influencia de los actores (ejecutivos, operaciones, ventas, clientes internos).",
        roles: [
          "CIO",
          "CFO",
          "Heads de producto",
          "Equipo legal",
          "Usuarios finales",
        ],
        actions: [
          "Mapear influencias y expectativas",
          "Definir sponsor ejecutivo",
          "Establecer comunicación recurrente",
        ],
        owner: "PMO / Comunicaciones",
      },
    },
  },

  {
    id: "diagnostico",
    type,
    position,
    data: {
      label: "1. Diagnóstico inicial",
      details: {
        nodeType: "Goal",
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
          "Registro de riesgos inicial",
        ],
        kpis: [
          "Número de casos de uso priorizados",
          "Índice de calidad de datos (0-100)",
        ],
        owner: "Equipo de análisis / BI",
        timeline: "4-8 semanas",
      },
    },
  },

  {
    id: "casos_de_uso",
    type,
    position,
    data: {
      label: "Catalogo de casos de uso",
      details: {
        nodeType: "Artifact",
        description:
          "Ficha técnica por caso de uso con beneficio estimado, complejidad, dependencias y sensibilidad de datos.",
        fields: [
          "Descripción",
          "Beneficio esperado",
          "Complejidad técnica",
          "Datos requeridos",
        ],
        actions: ["Priorizar, prototipar, validar negocio"],
        owner: "Product Owners / Equipo DS",
      },
    },
  },

  {
    id: "estrategia",
    type,
    position,
    data: {
      label: "2. Diseño de la estrategia de IA",
      details: {
        nodeType: "Phase",
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
        budgetGuideline: "CapEx + OpEx por fases",
      },
    },
  },

  {
    id: "proveedores",
    type,
    position,
    data: {
      label: "Evaluación de proveedores y partners",
      details: {
        nodeType: "Task",
        description:
          "Comparativa técnica/comercial de proveedores cloud, modelos preentrenados, consultoras y plataformas MLOps.",
        criteria: [
          "Costo total",
          "Tiempo de integración",
          "Soporte y SLAs",
          "Compliances",
        ],
        actions: [
          "RFP/RFI",
          "POC con 1-2 partners",
          "Negociación de contratos",
        ],
        owner: "Procurement / IT",
      },
    },
  },

  {
    id: "infra",
    type,
    position,
    data: {
      label: "Infra & Datos",
      details: {
        nodeType: "Goal",
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
        risks: ["Dependencia de legacy systems", "Latencia en sincronización"],
      },
    },
  },

  {
    id: "feature_store",
    type,
    position,
    data: {
      label: "Feature Store & Versionado",
      details: {
        nodeType: "Component",
        description:
          "Repositorio centralizado para features reutilizables, con versionado y acceso controlado.",
        actions: [
          "Diseñar esquema de features",
          "Políticas de refresh y ownership",
          "Integración con training/serving",
        ],
        tools: ["Feast, Hopsworks, almacenamiento en objeto con metadata"],
        owner: "Ingeniería de Datos",
      },
    },
  },

  {
    id: "piloto",
    type,
    position,
    data: {
      label: "3. Desarrollo e implementación de pilotos",
      details: {
        nodeType: "Task",
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
        subtasks: [
          {
            id: "prep_data",
            title: "Preparación y limpieza de datos",
            effort: "2 semanas",
          },
          {
            id: "train_eval",
            title: "Entrenamiento y evaluación",
            effort: "3 semanas",
          },
          {
            id: "deploy_canary",
            title: "Despliegue canary",
            effort: "1 semana",
          },
        ],
      },
    },
  },

  {
    id: "experimentos",
    type,
    position,
    data: {
      label: "Banco de experimentos",
      details: {
        nodeType: "Artifact",
        description:
          "Registro centralizado de experimentos, hiperparámetros, resultados y lecciones aprendidas.",
        tools: ["MLflow, Weights & Biases", "Repositorios versionados"],
        owner: "Data Science",
      },
    },
  },

  {
    id: "integracion_erp",
    type,
    position,
    data: {
      label: "Integración con sistemas core (ERP/CRM)",
      details: {
        nodeType: "Task",
        description:
          "Conectar modelos y pipelines con ERPs/CRMs para que los insights alimenten procesos operativos.",
        actions: [
          "Diseñar adaptadores API",
          "Mapear PII y políticas de anonimización",
          "Pruebas de integración",
        ],
        owner: "Integraciones / Plataforma",
      },
    },
  },

  {
    id: "gobernanza",
    type,
    position,
    data: {
      label: "Gobernanza, Ética y Seguridad",
      details: {
        nodeType: "Goal",
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
        timeline: "Quarterly",
      },
    },
  },

  {
    id: "seguridad",
    type,
    position,
    data: {
      label: "Seguridad & Privacidad",
      details: {
        nodeType: "Component",
        description:
          "Controles técnicos y organizativos para proteger datos sensibles y garantizar confidencialidad e integridad.",
        actions: [
          "Encriptación en reposo y tránsito",
          "Control de accesos y auditoría",
          "Data minimization",
        ],
        standards: ["ISO27001", "GDPR (si aplica)"],
        owner: "CISO / Seguridad",
      },
    },
  },

  {
    id: "capacitacion",
    type,
    position,
    data: {
      label: "4. Capacitación & Gestión del Cambio",
      details: {
        nodeType: "Goal",
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
        cohorts: ["Ejecutivos", "Equipo técnico", "Usuarios finales"],
      },
    },
  },

  {
    id: "change_management",
    type,
    position,
    data: {
      label: "Programa de gestión del cambio",
      details: {
        nodeType: "Task",
        description:
          "Actividades para facilitar transición cultural: formación, communications plan, champions y feedback loops.",
        actions: [
          "Mapear resistencias",
          "Pilotos de adopción",
          "KPIs de engagement",
        ],
        owner: "RRHH / Comunicaciones",
      },
    },
  },

  {
    id: "ci_cd",
    type,
    position,
    data: {
      label: "CI/CD & MLOps",
      details: {
        nodeType: "Component",
        description:
          "Pipelines automatizados para testing, versionado, despliegue y rollback de modelos y servicios.",
        actions: [
          "Integrar tests automáticos",
          "Pipeline de validación pre-despliegue",
          "Monitoreo post-despliegue",
        ],
        tools: ["Jenkins/GitHub Actions, ArgoCD, Tekton, Seldon/KServe"],
        owner: "Platform / DevOps",
      },
    },
  },

  {
    id: "monitoring",
    type,
    position,
    data: {
      label: "Monitoreo & Observabilidad",
      details: {
        nodeType: "Goal",
        description:
          "Observabilidad de modelos en producción: drift detection, performance, latencia y alertas de negocio.",
        actions: [
          "Definir métricas de salud",
          "Configurar dashboards y alertas",
          "Procedimientos de rollback",
        ],
        tools: ["Prometheus/Grafana, Evidently, Seldon metrics"],
        kpis: [
          "Tiempo medio para detectar drift",
          "MTTR (mean time to recovery)",
        ],
        owner: "SRE / Platform",
      },
    },
  },

  {
    id: "escalabilidad",
    type,
    position,
    data: {
      label: "5. Escalabilidad y Optimización",
      details: {
        nodeType: "Goal",
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
        scaleStrategy: ["Regional rollout", "Multi-tenant vs single-tenant"],
      },
    },
  },

  {
    id: "finanzas",
    type,
    position,
    data: {
      label: "Modelo financiero y ROI",
      details: {
        nodeType: "Artifact",
        description:
          "Modelo para estimar ahorro/ingresos esperados, TCO y payback por caso de uso y por portfolio.",
        actions: [
          "Simulaciones de escenarios",
          "Alineamiento con finanzas",
          "Revisión trimestral",
        ],
        owner: "CFO / PMO",
        metrics: ["NPV", "Payback period", "Coste por caso"],
      },
    },
  },

  {
    id: "ia",
    type,
    position,
    data: {
      label: "Resultado: IA productiva",
      details: {
        nodeType: "Goal",
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
        owner: "Todas las áreas implicadas",
      },
    },
  },

  {
    id: "mantenimiento",
    type,
    position,
    data: {
      label: "Mantenimiento & Roadmap continuo",
      details: {
        nodeType: "Task",
        description:
          "Estrategia de soporte, retraining programado, y backlog de mejoras con priorización basada en impacto.",
        actions: [
          "Plan de retraining",
          "Gestión de tickets y runbooks",
          "Priorizar mejoras",
        ],
        owner: "Platform / Data Science",
      },
    },
  },

  {
    id: "legal",
    type,
    position,
    data: {
      label: "Legal & Compliance",
      details: {
        nodeType: "Component",
        description:
          "Revisión legal sobre privacidad, contratos con proveedores y usos aceptables de modelos.",
        actions: [
          "Revisar contratos",
          "Auditorías regulatorias",
          "Data processing agreements",
        ],
        owner: "Legal",
      },
    },
  },
];

const initialEdges: ReactFlowEdges[] = [
  { id: "empresa->stakeholders", source: "empresa", target: "stakeholders" },
  {
    id: "empresa->diagnostico",
    source: "empresa",
    target: "diagnostico",
    animated: true,
  },

  {
    id: "diagnostico->casos_de_uso",
    source: "diagnostico",
    target: "casos_de_uso",
  },
  { id: "diagnostico->infra", source: "diagnostico", target: "infra" },
  {
    id: "diagnostico->proveedores",
    source: "diagnostico",
    target: "proveedores",
  },

  {
    id: "casos_de_uso->estrategia",
    source: "casos_de_uso",
    target: "estrategia",
  },
  {
    id: "stakeholders->estrategia",
    source: "stakeholders",
    target: "estrategia",
  },

  {
    id: "estrategia->proveedores",
    source: "estrategia",
    target: "proveedores",
  },
  { id: "estrategia->infra", source: "estrategia", target: "infra" },
  { id: "estrategia->ci_cd", source: "estrategia", target: "ci_cd" },

  { id: "proveedores->piloto", source: "proveedores", target: "piloto" },
  { id: "infra->feature_store", source: "infra", target: "feature_store" },
  { id: "feature_store->piloto", source: "feature_store", target: "piloto" },

  { id: "piloto->experimentos", source: "piloto", target: "experimentos" },
  { id: "experimentos->ci_cd", source: "experimentos", target: "ci_cd" },

  {
    id: "piloto->integracion_erp",
    source: "piloto",
    target: "integracion_erp",
  },
  {
    id: "integracion_erp->monitoring",
    source: "integracion_erp",
    target: "monitoring",
  },

  { id: "piloto->gobernanza", source: "piloto", target: "gobernanza" },
  { id: "piloto->capacitacion", source: "piloto", target: "capacitacion" },

  { id: "infra->seguridad", source: "infra", target: "seguridad" },
  { id: "seguridad->gobernanza", source: "seguridad", target: "gobernanza" },

  { id: "gobernanza->legal", source: "gobernanza", target: "legal" },
  { id: "legal->proveedores", source: "legal", target: "proveedores" },

  {
    id: "ci_cd->escalabilidad",
    source: "ci_cd",
    target: "escalabilidad",
    animated: true,
  },
  {
    id: "monitoring->escalabilidad",
    source: "monitoring",
    target: "escalabilidad",
  },

  {
    id: "capacitacion->change_management",
    source: "capacitacion",
    target: "change_management",
  },
  {
    id: "change_management->escalabilidad",
    source: "change_management",
    target: "escalabilidad",
  },

  {
    id: "escalabilidad->ia",
    source: "escalabilidad",
    target: "ia",
    animated: true,
  },
  { id: "finanzas->estrategia", source: "finanzas", target: "estrategia" },
  { id: "finanzas->empresa", source: "finanzas", target: "empresa" },

  { id: "ia->mantenimiento", source: "ia", target: "mantenimiento" },
  {
    id: "mantenimiento->monitoring",
    source: "mantenimiento",
    target: "monitoring",
  },

  {
    id: "stakeholders->capacitacion",
    source: "stakeholders",
    target: "capacitacion",
  },
  { id: "infra->ci_cd", source: "infra", target: "ci_cd" },
  {
    id: "feature_store->monitoring",
    source: "feature_store",
    target: "monitoring",
  },
  { id: "experimentos->finanzas", source: "experimentos", target: "finanzas" },

  { id: "monitoring->piloto", source: "monitoring", target: "piloto" }, // feedback loop desde operación a pilotos
  { id: "legal->gobernanza", source: "legal", target: "gobernanza" }, // revisión legal periódica
];

export default function RoadMap() {
  return (
    <div className="size-full">
      <FlowClient nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}
