// components/landingPage/IntegrationSection.tsx
import { Code, GitBranch, Cpu, Smartphone, Server } from "lucide-react";

export function IntegrationSection() {
  return (
    <section className="bg-slate-50 dark:bg-slate-800 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
            Documentación API
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mt-4">
            Integración fácil y escalable con tu ecosistema tecnológico
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda - Texto descriptivo */}
          <div>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
              Facilitamos la integración de nuestra plataforma de diagnóstico con cualquier 
              sistema empresarial existente: ERP, CRM, bases de datos, herramientas de BI 
              y soluciones cloud.
            </p>

            <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-4">
                Características de integración
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                    <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-200">
                    Disponemos de SDK y un conjunto de APIs RESTful
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                    <GitBranch className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-200">
                    Soporte para estándares abiertos: REST, GraphQL, y Webhooks
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                    <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-200">
                    Compatibilidad multi-plataforma y multi-dispositivo
                  </span>
                </div>
              </div>
            </div>

            <button className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              Acceder a documentación API
            </button>
          </div>

          {/* Columna derecha - Iconos y especificaciones técnicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-xl text-center shadow-md">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <Server className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                Backend Integration
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Conectores para AWS, Azure, Google Cloud, Oracle, SAP
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 p-6 rounded-xl text-center shadow-md">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                Multiplataforma
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Web, móvil, desktop y integración con herramientas empresariales
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 p-6 rounded-xl text-center shadow-md">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <GitBranch className="h-7 w-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                Webhooks & Events
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Notificaciones en tiempo real para automatización de flujos
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 p-6 rounded-xl text-center shadow-md">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <Code className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                SDK Disponible
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Librerías para Python, JavaScript, Java, .NET y Go
              </p>
            </div>
          </div>
        </div>

        {/* Sección adicional de ejemplos de integración */}
        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 text-center">
            Casos comunes de integración
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg">
              <div className="font-medium text-slate-800 dark:text-white">ERP Systems</div>
              <div className="text-slate-600 dark:text-slate-300 mt-1">SAP, Oracle, Microsoft Dynamics</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg">
              <div className="font-medium text-slate-800 dark:text-white">Data Platforms</div>
              <div className="text-slate-600 dark:text-slate-300 mt-1">Snowflake, Databricks, BigQuery</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg">
              <div className="font-medium text-slate-800 dark:text-white">BI Tools</div>
              <div className="text-slate-600 dark:text-slate-300 mt-1">Tableau, Power BI, Looker</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}