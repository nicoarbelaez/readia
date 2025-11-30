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
        shortDescription: "Visión estratégica y restricciones del negocio.",
        description:
          "Organización que inicia la adopción de IA. Alinea objetivos corporativos, presupuesto, y condiciones regulatorias que condicionan la hoja de ruta.",
        owner: "Dirección general / CIO",
        objectives: [
          "Alinear IA con objetivos de negocio",
          "Asignar presupuesto y sponsor ejecutivo",
        ],
        actions: [
          "Confirmar sponsor ejecutivo",
          "Publicar mandato estratégico para IA",
        ],
        tools: ["Plantilla de visión estratégica", "Board ejecutivo"],
        kpis: ["Aprobación de presupuesto", "Adopción en roadmap por unidad"],
        nextSteps: ["Lanzar evaluación EICAM", "Nombrar PMO IA"],
        timeline: "Inicio (Q0)",
        isDone: false,
      },
    },
  },

  {
    id: "eicam_assessment",
    type,
    position,
    data: {
      label: "EICAM — Evaluación de madurez",
      details: {
        nodeType: "Artifact",
        shortDescription:
          "Evaluación estructurada de madurez TI/IA usando el modelo EICAM.",
        description:
          "Aplicar el modelo EICAM para obtener puntuaciones por dimensiones (Estrategia, Infraestructura, Cultura, Automatización, Monitorización). El resultado guía priorización y roadmap.",
        owner: "Equipo de diagnóstico / PMO IA",
        objectives: [
          "Obtener puntuación EICAM por dimensión",
          "Clasificar maturity level (ej. Inicial, En desarrollo, Establecido, Escalable)",
        ],
        actions: [
          "Aplicar cuestionario EICAM a stakeholders",
          "Recolectar evidencias (artefactos, métricas, casos de uso)",
          "Calcular score y generar informe ejecutivo",
        ],
        tools: [
          "Cuestionario EICAM (form)",
          "Plantilla de scoring (spreadsheet)",
        ],
        kpis: ["Score por dimensión", "Nivel de madurez global"],
        nextSteps: ["Priorizar iniciativas según gaps identificados"],
        timeline: "2-4 semanas",
        isDone: false,
        subtasks: [
          {
            id: "eicam_survey",
            title: "Aplicar encuesta EICAM",
            effort: "1 semana",
          },
          {
            id: "eicam_analysis",
            title: "Analizar resultados y generar informe",
            effort: "1 semana",
          },
        ],
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
        nodeType: "Phase",
        shortDescription: "Evaluación profunda de datos, TI y procesos.",
        description:
          "Diagnóstico técnico y organizacional para identificar gaps en datos, infraestructura, procesos y capacidades humanas relevantes para IA.",
        owner: "Equipo de análisis / BI",
        objectives: [
          "Evaluar calidad de datos y arquitectura TI",
          "Identificar casos de uso con mayor impacto",
          "Detectar barreras organizacionales",
        ],
        actions: [
          "Entrevistas con stakeholders",
          "Inventario de sistemas y datos",
          "Profiling de datasets y calidad",
          "Mapeo de procesos críticos",
        ],
        tools: [
          "SQL, notebooks para profiling",
          "Great Expectations / pandas-profiling",
          "Plantillas de mapeo de procesos",
        ],
        kpis: [
          "Número de casos priorizados",
          "Índice de calidad de datos (0-100)",
        ],
        nextSteps: ["Ejecución de POC en casos priorizados"],
        timeline: "4-8 semanas",
        isDone: false,
        subtasks: [
          {
            id: "diag_stake_int",
            title: "Entrevistas a stakeholders",
            effort: "1-2 semanas",
          },
          {
            id: "diag_data_inventory",
            title: "Inventario y profiling de datos",
            effort: "2-3 semanas",
          },
        ],
      },
    },
  },

  {
    id: "casos_de_uso",
    type,
    position,
    data: {
      label: "Catálogo de Casos de Uso",
      details: {
        nodeType: "Artifact",
        shortDescription: "Ficha técnica y priorización de casos de uso IA.",
        description:
          "Registro formal de ideas/casos con hipótesis de valor, requerimientos de datos, complejidad y sensibilidad legal para priorización.",
        owner: "Product Owners / Equipo DS",
        objectives: ["Catalogar, priorizar y validar factibilidad de casos"],
        actions: [
          "Definir template por caso de uso",
          "Scoring (Impacto vs. Complejidad vs. Riesgo)",
          "Seleccionar candidatos para POC/piloto",
        ],
        tools: ["Template de caso de uso", "Matriz RICE / ICE"],
        kpis: ["# casos priorizados para POC", "Tiempo hasta POC"],
        nextSteps: ["Ejecutar preparación de datos para POCs"],
        timeline: "2-4 semanas (iterativo)",
        isDone: false,
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
        shortDescription:
          "Política, gobernanza y arquitectura objetivo para IA.",
        description:
          "Definir visión, objetivos SMART, modelo de gobernanza, roles y el stack tecnológico para soportar los casos de uso priorizados.",
        owner: "CIO / PMO IA",
        objectives: [
          "Formalizar gobernanza de datos y modelos",
          "Definir build vs buy y roadmap de inversión",
        ],
        actions: [
          "Diseñar modelo de gobernanza",
          "Seleccionar arquitectura (cloud, on-prem, híbrida)",
          "Establecer SLAs y criterios de éxito por caso",
        ],
        tools: [
          "Model cards, plantillas de gobernanza",
          "Diagramas arquitectónicos",
        ],
        kpis: ["Porcentaje de casos con roadmap aprobado", "ROI estimado"],
        nextSteps: ["RFP a proveedores críticos"],
        timeline: "4-6 semanas",
        isDone: false,
      },
    },
  },

  {
    id: "proveedores",
    type,
    position,
    data: {
      label: "Evaluación de proveedores",
      details: {
        nodeType: "Task",
        shortDescription:
          "Seleccionar partners técnicos y proveedores cloud/ML.",
        description:
          "Comparativa técnica y comercial de proveedores de cloud, modelos preentrenados, plataformas de MLOps y consultoras.",
        owner: "Procurement / IT",
        objectives: ["Elegir opciones coste/beneficio para POC y production"],
        actions: ["RFP/RFI", "POC con partners", "Negociar contratos y SLAs"],
        tools: ["Checklist técnico", "Matrices comparativas"],
        kpis: ["Coste estimado TCO", "Tiempo hasta POC con partner"],
        timeline: "4-8 semanas",
        isDone: false,
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
        shortDescription:
          "Plataforma de datos y pipelines robustos y versionados.",
        description:
          "Diseñar y desplegar la infraestructura de datos y computación necesaria (lakehouse, pipelines, catalogación y gobernanza).",
        owner: "Equipo de datos / Platform",
        objectives: [
          "Contar con pipelines reproducibles y catalogados",
          "Asegurar almacenamiento y compute escalable",
        ],
        actions: [
          "Diseñar lakehouse/warehouse",
          "Implementar ingestion pipelines y catalogación",
          "Configurar políticas de acceso y encriptación",
        ],
        tools: ["Snowflake/BigQuery/S3", "Airflow/Prefect", "DBT"],
        kpis: ["% datasets con quality>=aceptable", "Freshness SLA"],
        nextSteps: ["Integrar feature store y CI/CD de datos"],
        timeline: "Q1-Q2",
        isDone: false,
      },
    },
  },

  {
    id: "feature_store",
    type,
    position,
    data: {
      label: "Feature Store",
      details: {
        nodeType: "Component",
        shortDescription:
          "Repositorio versionado de features para training y serving.",
        description:
          "Implementar un feature store con contrato de ownership, refresh policies y APIs para consumo online/offline.",
        owner: "Ingeniería de Datos",
        objectives: [
          "Reducir duplicidad y acelerar reproducibilidad de modelos",
        ],
        actions: ["Definir esquema de features", "Implementar refresh y APIs"],
        tools: ["Feast, Hopsworks o custom (S3+metadata)"],
        kpis: [
          "Tiempo para provisionar feature",
          "Reutilización de feature (%)",
        ],
        timeline: "Q2-Q3",
        isDone: false,
      },
    },
  },

  {
    id: "piloto",
    type,
    position,
    data: {
      label: "3. Pilotos & POC",
      details: {
        nodeType: "Phase",
        shortDescription:
          "Construcción y validación controlada de casos priorizados.",
        description:
          "Ejecutar pilotos robustos que validen hipótesis de valor y factibilidad técnica antes de escalar.",
        owner: "Equipo DS / Desarrollo",
        objectives: [
          "Validar impacto en métricas de negocio",
          "Probar integraciones con sistemas core",
        ],
        actions: [
          "Preparar datasets de training/validación",
          "Entrenar y evaluar modelos",
          "Desplegar canary y recoger métricas",
        ],
        tools: [
          "PyTorch/TF, scikit-learn",
          "MLflow / W&B",
          "FastAPI / serverless para inferencia",
        ],
        kpis: ["Metricas de ML por caso", "Impacto en KPIs de negocio"],
        nextSteps: ["Refinar y decidir escalado o pivot"],
        timeline: "6-12 semanas por piloto",
        isDone: false,
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
      label: "Banco de Experimentos",
      details: {
        nodeType: "Artifact",
        shortDescription:
          "Registro y trazabilidad de experimentos, hyperparams y resultados.",
        description:
          "Centralizar resultados experimentales para evitar pérdida de conocimiento y garantizar reproducibilidad.",
        owner: "Data Science",
        objectives: ["Trazabilidad y reproducibilidad de resultados"],
        actions: ["Configurar tracking (MLflow/W&B)", "Estandarizar metadata"],
        tools: ["MLflow, Weights & Biases, Git"],
        kpis: ["% experimentos reproducibles", "Velocidad de iteración"],
        timeline: "Continuo",
        isDone: false,
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
        shortDescription:
          "Pipelines automatizados para testing, despliegue y rollback.",
        description:
          "Automatizar pruebas, packaging de modelos, validaciones de rendimiento y despliegue con capacidad de rollback y trazabilidad.",
        owner: "Platform / DevOps",
        objectives: ["Reducir lead time de despliegue y riesgo de regresión"],
        actions: [
          "Crear CI para tests unitarios y de integración",
          "Pipeline de validación para modelos",
          "Automatizar despliegue canario y rollback",
        ],
        tools: ["GitHub Actions/Jenkins, ArgoCD, Seldon/KServe"],
        kpis: ["Lead time to production", "Rollback incidents"],
        timeline: "Q2-Q3",
        isDone: false,
      },
    },
  },

  {
    id: "integracion_erp",
    type,
    position,
    data: {
      label: "Integración con ERP/CRM",
      details: {
        nodeType: "Task",
        shortDescription:
          "Conectar outputs IA con procesos operativos existentes.",
        description:
          "Diseñar integraciones para que las predicciones/insights alimenten workflows en sistemas core (ERP, CRM, ticketing).",
        owner: "Integraciones / Plataforma",
        objectives: ["Garantizar flujo de datos y eficacia operativa"],
        actions: [
          "Diseñar adaptadores y APIs",
          "Mapear PII y aplicar anonimización",
          "Pruebas de integración con datos reales",
        ],
        tools: ["OpenAPI specs, ETL jobs, adaptadores"],
        kpis: ["Tiempo hasta integración", "Errores en integración"],
        timeline: "4-8 semanas",
        isDone: false,
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
        shortDescription:
          "Políticas y controles para uso responsable y seguro de IA.",
        description:
          "Implementar gobernanza de modelos y datos, revisiones de sesgo, explicabilidad y compliance regulatorio.",
        owner: "Legal / Seguridad / Equipo Ética",
        objectives: [
          "Asegurar cumplimiento normativo",
          "Mitigar sesgos y riesgo reputacional",
        ],
        actions: [
          "Definir políticas de uso y data processing agreements",
          "Implementar bias checks y model cards",
          "Auditorías periódicas",
        ],
        tools: ["Model cards, bias toolkits, auditorías"],
        kpis: ["% modelos con reviews aprobadas", "Incidentes regulatorios"],
        timeline: "Continuo (quarterly reviews)",
        isDone: false,
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
        shortDescription:
          "Controles técnicos y organizativos para protección de datos.",
        description:
          "Asegurar encriptación, control de accesos, logging y data minimization para modelos y pipelines.",
        owner: "CISO / Seguridad",
        objectives: ["Reducir riesgo de fuga y uso indebido de datos"],
        actions: [
          "Encriptación, IAM, logging, DLP",
          "Procedimientos de respuesta a incidentes",
        ],
        tools: ["Vault, IAM, SIEM, DLP tools"],
        kpis: ["Número de incidentes", "CPL (coste por leak)"],
        timeline: "Q1-Q4 según prioridades",
        isDone: false,
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
        shortDescription:
          "Formación y apoyo para adopción de IA en la organización.",
        description:
          "Programas por rol, champions y comunicación para acelerar adopción y reducir resistencia al cambio.",
        owner: "RRHH / PMO",
        objectives: ["Aumentar skills y adopción por usuarios"],
        actions: [
          "Diseñar cursos por rol",
          "Crear canales de soporte y playbooks",
          "Medir engagement y satisfacción",
        ],
        tools: ["LMS, workshops, documentación"],
        kpis: ["% usuarios formados", "Adopción post-training"],
        timeline: "Q2 en adelante",
        isDone: false,
      },
    },
  },

  {
    id: "change_management",
    type,
    position,
    data: {
      label: "Programa de Gestión del Cambio",
      details: {
        nodeType: "Task",
        shortDescription:
          "Actividades concretas para facilitar la transición cultural.",
        description:
          "Gestión de resistencias, comunicación, pilotos de adopción y champions internos.",
        owner: "RRHH / Comunicaciones",
        objectives: ["Minimizar fricción en la adopción"],
        actions: [
          "Mapear resistencias",
          "Diseñar pilotos de adopción",
          "Comunicación periódica",
        ],
        tools: ["Plan de comunicaciones", "Feedback loops"],
        kpis: ["Engagement en pilotos", "Tasa de adopción"],
        timeline: "Continuo",
        isDone: false,
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
        shortDescription:
          "Detección de drift, performance y alertas operacionales.",
        description:
          "Monitorear modelos en producción: drift en datos, rendimiento, latencia y alertas para operaciones y retraining.",
        owner: "SRE / Platform",
        objectives: ["Detectar degradación y habilitar respuesta rápida"],
        actions: [
          "Definir métricas de salud",
          "Configurar dashboards y alertas",
          "Procedimientos de rollback y retraining",
        ],
        tools: ["Prometheus/Grafana, Evidently, Seldon metrics"],
        kpis: ["MTTR", "Tiempo medio para detectar drift"],
        timeline: "Continuo",
        isDone: false,
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
        nodeType: "Phase",
        shortDescription: "Extender y optimizar soluciones IA validadas.",
        description:
          "Plan para llevar pilotos exitosos a mayor cobertura, optimizando costes y operaciones de inferencia.",
        owner: "Platform / DevOps",
        objectives: [
          "Escalar soluciones a units/países",
          "Optimizar coste por inferencia",
        ],
        actions: [
          "Automatizar pipelines de ML y CI/CD",
          "Estandarizar MLOps",
          "Optimizar modelos (pruning, quantization)",
        ],
        tools: ["Kubernetes, autoscaling, serverless inference"],
        kpis: ["Coste por inferencia", "Tiempo medio para deployment"],
        nextSteps: ["Crear roadmap de roll-out por unidad"],
        timeline: "Q3-Q4",
        isDone: false,
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
        shortDescription:
          "Estado objetivo: modelos en procesos con ROI probado y gobernanza operativa.",
        description:
          "Modelos y capacidades integradas que entregan valor medible de manera sostenible y cumplen con gobernanza y regulaciones.",
        owner: "Todas las áreas implicadas",
        objectives: [
          "Generar valor repetible y medible",
          "Mantener cumplimiento y observabilidad",
        ],
        actions: ["Mantenimiento continuo", "Expansión de casos de uso"],
        tools: ["Dashboards de negocio, runbooks"],
        kpis: ["Impacto en KPIs de negocio", "Adopción por usuarios"],
        nextSteps: ["Roadmap de mejoras y nuevos casos"],
        timeline: "Continuo",
        isDone: false,
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
        shortDescription:
          "Soporte, retraining programado y backlog priorizado.",
        description:
          "Estrategia de soporte y mejora continua: tickets, runbooks, retraining por drift y backlog priorizado por impacto.",
        owner: "Platform / Data Science",
        objectives: [
          "Mantener disponibilidad y performance",
          "Priorizar mejoras",
        ],
        actions: [
          "Plan de retraining",
          "Gestión de tickets",
          "Roadmap trimestral",
        ],
        tools: ["Issue trackers, runbooks, scheduler para retraining"],
        kpis: ["MTTR", "Backlog throughput"],
        timeline: "Continuo",
        isDone: false,
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
        shortDescription: "Controles legales, contratos y privacidad para IA.",
        description:
          "Revisión legal continua sobre privacidad, contratos con proveedores, licencias de modelo y usos aceptables.",
        owner: "Legal",
        objectives: ["Cumplir regulaciones y contratos"],
        actions: ["Revisar contratos", "Auditorías regulatorias", "DPAs"],
        tools: ["Checklist legal, plantilla DPA"],
        kpis: ["Audits passed", "Incidentes legales"],
        timeline: "Quarterly",
        isDone: false,
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
        shortDescription:
          "Cálculo de TCO, ahorro e ingresos por caso/portfolio IA.",
        description:
          "Modelos financieros para estimar ahorro, TCO y payback por caso de uso y portfolio, con escenarios conservador/optimista.",
        owner: "CFO / PMO",
        objectives: ["Cuantificar impacto económico", "Priorizar por ROI"],
        actions: [
          "Simulaciones",
          "Alineamiento con finanzas",
          "Revisión trimestral",
        ],
        tools: ["Modelos financieros, plantillas ROI"],
        kpis: ["TCO estimado", "Payback period"],
        timeline: "Iterativo",
        isDone: false,
      },
    },
  },
];

const initialEdges: ReactFlowEdges[] = [
  {
    id: "empresa->eicam",
    source: "empresa",
    target: "eicam_assessment",
    animated: true,
  },
  {
    id: "eicam->diagnostico",
    source: "eicam_assessment",
    target: "diagnostico",
  },

  { id: "diagnostico->casos", source: "diagnostico", target: "casos_de_uso" },
  { id: "diagnostico->infra", source: "diagnostico", target: "infra" },
  { id: "diagnostico->finanzas", source: "diagnostico", target: "finanzas" },

  { id: "casos->estrategia", source: "casos_de_uso", target: "estrategia" },
  { id: "eicam->estrategia", source: "eicam_assessment", target: "estrategia" },

  {
    id: "estrategia->proveedores",
    source: "estrategia",
    target: "proveedores",
  },
  { id: "estrategia->ci_cd", source: "estrategia", target: "ci_cd" },
  { id: "estrategia->infra", source: "estrategia", target: "infra" },

  { id: "infra->feature_store", source: "infra", target: "feature_store" },
  { id: "feature_store->piloto", source: "feature_store", target: "piloto" },

  { id: "proveedores->piloto", source: "proveedores", target: "piloto" },
  { id: "piloto->experimentos", source: "piloto", target: "experimentos" },
  { id: "experimentos->ci_cd", source: "experimentos", target: "ci_cd" },

  { id: "piloto->integracion", source: "piloto", target: "integracion_erp" },
  {
    id: "integracion->monitoring",
    source: "integracion_erp",
    target: "monitoring",
  },

  { id: "piloto->gobernanza", source: "piloto", target: "gobernanza" },
  { id: "seguridad->gobernanza", source: "seguridad", target: "gobernanza" },

  { id: "gobernanza->legal", source: "gobernanza", target: "legal" },
  {
    id: "legal->gobernanza_review",
    source: "legal",
    target: "gobernanza",
    animated: false,
  },

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
    id: "capacitacion->change",
    source: "capacitacion",
    target: "change_management",
  },
  {
    id: "change->escalabilidad",
    source: "change_management",
    target: "escalabilidad",
  },

  {
    id: "escalabilidad->ia",
    source: "escalabilidad",
    target: "ia",
    animated: true,
  },
  { id: "ia->mantenimiento", source: "ia", target: "mantenimiento" },
  {
    id: "mantenimiento->monitoring",
    source: "mantenimiento",
    target: "monitoring",
  },

  { id: "experimentos->finanzas", source: "experimentos", target: "finanzas" },
  { id: "finanzas->estrategia", source: "finanzas", target: "estrategia" },

  // Feedback loops
  { id: "monitoring->piloto_feedback", source: "monitoring", target: "piloto" },
  { id: "ia->stakeholder_update", source: "ia", target: "empresa" },
];

export default function RoadMap() {
  return (
    <div className="size-full">
      <FlowClient nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}
