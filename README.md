# ReadIA

[English](./README.en.md) · Español

Aplicación web que convierte un cuestionario sobre la infraestructura, los datos y el talento de una empresa en un diagnóstico de madurez TI/IA, una hoja de ruta interactiva y un informe PDF descargable. Las preguntas, el diagnóstico y la hoja de ruta los genera un modelo de lenguaje (Gemini, con OpenRouter como respaldo) a través de funciones Edge de Supabase.

Proyecto universitario de la Universidad Santiago de Cali (USC). Demo: <https://readia.arbelaeznicolas.dev/>

## Funcionalidades

- Inicio de sesión con Google y GitHub mediante Supabase Auth, con refresco de sesión en el middleware de Next.js.
- Gestión de varias empresas por usuario: crear, cambiar de empresa y eliminar.
- Perfil de empresa en varios pasos (React Hook Form + Zod) con un carrusel de preguntas generadas por IA.
- Diagnóstico de madurez con puntaje global, radar por pilares, distribución, recomendaciones priorizadas (Alta, Media, Baja) y conclusiones en Markdown.
- Hoja de ruta como grafo de nodos (React Flow + dagre) con fases, tareas, responsables, KPIs y subtareas.
- Informe PDF con portada, resumen ejecutivo, pilares, recomendaciones, hoja de ruta, Gantt y conclusiones (`@react-pdf/renderer`).
- Cadena de respaldo de modelos: Gemini (2 intentos) y luego OpenRouter (2 intentos), con registro de intentos.
- Tema claro y oscuro.

## Stack

| Capa | Tecnología |
| --- | --- |
| Frontend | Next.js 15.4.10 (App Router, Turbopack en desarrollo), React 19.1.0, TypeScript 5.9.2 |
| Estilos y UI | Tailwind CSS 4, shadcn/ui, Radix UI, next-themes |
| Estado y datos | Zustand ^5.0.13, TanStack Query ^5.100.14 |
| Formularios | React Hook Form ^7.62.0, Zod ^4.1.5 |
| Visualización | @xyflow/react ^12.8.4, dagre ^0.8.5, Recharts ^3.5.0 |
| PDF | @react-pdf/renderer ^4.5.1 |
| Backend | Supabase: PostgreSQL con RLS, Auth, Edge Functions (Deno) |
| IA | Vercel AI SDK (`ai` ^5.0.37), `@ai-sdk/google` ^2.0.13, OpenRouter vía `@ai-sdk/openai` |
| Herramientas | pnpm, ESLint 9, Prettier 3.6.2, Supabase CLI 2.47.2 |

## Requisitos

- Node.js 20 o superior y pnpm.
- Un proyecto de Supabase (o la CLI de Supabase con Docker para correrlo en local).
- Una clave de Google AI Studio (Gemini). La clave de OpenRouter es opcional y solo se usa como respaldo.

## Puesta en marcha

```bash
pnpm install
```

Variables de entorno. No hay `.env.example`; estas son las que lee el código:

| Variable | Dónde se usa |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Next.js (cliente, servidor y middleware) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Next.js (cliente, servidor y middleware) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Server Action de Next.js y funciones Edge |
| `OPENROUTER_API_KEY` | Funciones Edge (respaldo) |

Crea `.env.local` con las dos primeras y la de Gemini. Las claves de las funciones Edge se cargan como secretos de Supabase:

```bash
supabase secrets set GOOGLE_GENERATIVE_AI_API_KEY=... OPENROUTER_API_KEY=...
```

Base de datos y funciones:

```bash
supabase link --project-ref <tu-project-ref>
pnpm db:push                         # aplica las migraciones y regenera src/types/database.ts
supabase functions deploy generate-questions
supabase functions deploy generate-diagnostic
supabase functions deploy generate-roadmap
```

Habilita los proveedores Google y GitHub en Supabase Auth y agrega `http://localhost:3000/auth/callback` como URL de redirección. Después:

```bash
pnpm dev
```

Abre <http://localhost:3000>.

## Scripts

| Script | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo con Turbopack |
| `pnpm build` | Compilación de producción |
| `pnpm start` | Sirve la compilación |
| `pnpm lint` | ESLint (`next lint`) |
| `pnpm gen:types` | Genera `src/types/database.ts` desde los esquemas `public` y `public_web`. Cambia el `--project-id` del script por el de tu proyecto |
| `pnpm db:push` | `supabase db push` y luego `gen:types` |

## Estructura

```text
src/
  app/            rutas (main)/{home,business,diagnostic,roadmap,dashboard}, login, auth/callback, actions/
  components/     landing-page, forms/company-profile, diagnostic, flow, sidebar, ui
  hooks/          hooks de TanStack Query y disparo de funciones Edge
  stores/         estado de cliente con Zustand
  report/         documento PDF y sus secciones
  utils/supabase/ clientes de Supabase (browser, server, middleware)
supabase/
  functions/      generate-questions, generate-diagnostic, generate-roadmap, _shared
  migrations/     esquema public_web, RLS y datos base
```

El detalle de arquitectura, con diagramas, está en [docs/architecture.md](./docs/architecture.md).

## Limitaciones conocidas

- Marcar un nodo o subtarea de la hoja de ruta como hecho aún no se guarda en la base de datos: las Server Actions de `src/app/actions/roadmap-actions.ts` son simuladas.
- No hay pruebas automatizadas ni pipeline de CI; solo ESLint.
- Las métricas y testimonios de la landing son contenido de ejemplo, no resultados medidos.

## Créditos

Desarrollo: Nicolas Arbelaez (esquema de Supabase, RLS, funciones Edge, diagnóstico, hoja de ruta e informe PDF). La landing page la inició [@jevg2003](https://github.com/jevg2003).
