import type { Node, Edge, NodeProps } from "@xyflow/react";

/**
 * Enumeración de nombres de nodos personalizados disponibles.
 */
export type NodeCustomType = "default" | "customNode";

/**
 * Representa la forma de los datos que contendrá cada nodo en React Flow.
 *
 * @property label - Etiqueta descriptiva que aparece visible en el nodo.
 * @property details - Información adicional estructurada, opcional y de varios campos, como descripción, objetivos o KPIs.
 */
export type Data = {
  label: string;
  details: Details;
};

/**
 * Estructura detallada para enriquecer la información de un nodo.
 * Ideal para añadir contexto útil sin saturar la etiqueta principal.
 *
 * Todos los campos son opcionales y permiten enriquecer el nodo con:
 * - description: descripción extendida del nodo.
 * - owner: responsable asignado.
 * - priorities, objectives, actions, tools, deliverables, kpis, successCriteria, nextSteps: listas que ayudan a clarificar propósito o acciones.
 */
export interface Details {
  description?: string;
  owner?: string;
  priorities?: string[];
  objectives?: string[];
  actions?: string[];
  tools?: string[];
  deliverables?: string[];
  kpis?: string[];
  successCriteria?: string[];
  nextSteps?: string[];
}

/**
 * Tipo que representa los nodos utilizados dentro de React Flow en la aplicación,
 * tipado con la estructura `Data` definida y permitiendo opcionalmente el tipo `NodeCustomType`.
 *
 * Al incluir `| undefined`, permite que algunos nodos no lleven definido un tipo personalizado,
 * lo que puede ser útil en escenarios dinámicos o de carga tardía del tipo.
 */
export type ReactFlowNode = Node<Data> & {
  type?: NodeCustomType;
};

/**
 * Tipo genérico que representa las aristas (edges) en React Flow.
 * Reutiliza la definición base de `Edge` proporcionada por la librería sin modificación.
 */
export type ReactFlowEdges = Edge;

/**
 * Mapa tipado que asegura que las claves corresponden estrictamente
 * a los valores definidos en `NodeCustomType`.
 *
 * Cada clave representa un tipo de nodo y debe mapear a un componente React
 * que maneje las props específicas de ese nodo.
 *
 * @template T - Unión de strings que representa los tipos de nodo válidos.
 */
export type NodeTypesMap<T extends string> = {
  [K in T]?: React.ComponentType<NodeProps<ReactFlowNode>>;
};
