# ReadIA

English · [Español](./README.md)

Web application that turns a questionnaire about a company's infrastructure, data and talent into an IT/AI maturity diagnostic, an interactive roadmap and a downloadable PDF report. A language model (Gemini, with OpenRouter as fallback) generates the questions, the diagnostic and the roadmap through Supabase Edge Functions.

University project at Universidad Santiago de Cali (USC). Demo: <https://readia.arbelaeznicolas.dev/>

## Features

- Google and GitHub sign-in through Supabase Auth, with session refresh in the Next.js middleware.
- Multiple companies per user: create, switch and delete.
- Multi-step company profile (React Hook Form + Zod) with a carousel of AI-generated questions.
- Maturity diagnostic with an overall score, a radar chart by pillar, a distribution chart, prioritized recommendations (High, Medium, Low) and Markdown conclusions.
- Roadmap rendered as a node graph (React Flow + dagre) with phases, tasks, owners, KPIs and subtasks.
- PDF report with cover, executive summary, pillars, recommendations, roadmap, Gantt chart and conclusions (`@react-pdf/renderer`).
- Model fallback chain: Gemini (2 attempts), then OpenRouter (2 attempts), with an attempts log.
- Light and dark theme.

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 15.4.10 (App Router, Turbopack in dev), React 19.1.0, TypeScript 5.9.2 |
| Styling and UI | Tailwind CSS 4, shadcn/ui, Radix UI, next-themes |
| State and data | Zustand ^5.0.13, TanStack Query ^5.100.14 |
| Forms | React Hook Form ^7.62.0, Zod ^4.1.5 |
| Visualization | @xyflow/react ^12.8.4, dagre ^0.8.5, Recharts ^3.5.0 |
| PDF | @react-pdf/renderer ^4.5.1 |
| Backend | Supabase: PostgreSQL with RLS, Auth, Edge Functions (Deno) |
| AI | Vercel AI SDK (`ai` ^5.0.37), `@ai-sdk/google` ^2.0.13, OpenRouter through `@ai-sdk/openai` |
| Tooling | pnpm, ESLint 9, Prettier 3.6.2, Supabase CLI 2.47.2 |

## Requirements

- Node.js 20 or later and pnpm.
- A Supabase project (or the Supabase CLI with Docker to run it locally).
- A Google AI Studio key (Gemini). The OpenRouter key is optional and only used as a fallback.

## Getting started

```bash
pnpm install
```

Environment variables. There is no `.env.example`; these are the ones the code reads:

| Variable | Used by |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Next.js (client, server and middleware) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Next.js (client, server and middleware) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Next.js Server Action and Edge Functions |
| `OPENROUTER_API_KEY` | Edge Functions (fallback) |

Create `.env.local` with the first two and the Gemini key. Edge Function keys are stored as Supabase secrets:

```bash
supabase secrets set GOOGLE_GENERATIVE_AI_API_KEY=... OPENROUTER_API_KEY=...
```

Database and functions:

```bash
supabase link --project-ref <your-project-ref>
pnpm db:push                         # applies migrations and regenerates src/types/database.ts
supabase functions deploy generate-questions
supabase functions deploy generate-diagnostic
supabase functions deploy generate-roadmap
```

Enable the Google and GitHub providers in Supabase Auth and add `http://localhost:3000/auth/callback` as a redirect URL. Then:

```bash
pnpm dev
```

Open <http://localhost:3000>.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Development server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Serves the build |
| `pnpm lint` | ESLint (`next lint`) |
| `pnpm gen:types` | Generates `src/types/database.ts` from the `public` and `public_web` schemas. Change the script's `--project-id` to your own project |
| `pnpm db:push` | `supabase db push`, then `gen:types` |

## Structure

```text
src/
  app/            routes (main)/{home,business,diagnostic,roadmap,dashboard}, login, auth/callback, actions/
  components/     landing-page, forms/company-profile, diagnostic, flow, sidebar, ui
  hooks/          TanStack Query hooks and Edge Function triggers
  stores/         client state with Zustand
  report/         PDF document and its sections
  utils/supabase/ Supabase clients (browser, server, middleware)
supabase/
  functions/      generate-questions, generate-diagnostic, generate-roadmap, _shared
  migrations/     public_web schema, RLS and seed data
```

The architecture, with diagrams, is in [docs/architecture.en.md](./docs/architecture.en.md).

## Known limitations

- Marking a roadmap node or subtask as done is not persisted yet: the Server Actions in `src/app/actions/roadmap-actions.ts` are simulated.
- There are no automated tests and no CI pipeline; only ESLint.
- The metrics and testimonials on the landing page are sample content, not measured results.

## Credits

Development: Nicolas Arbelaez (Supabase schema, RLS, Edge Functions, diagnostic, roadmap and PDF report). The landing page was started by [@jevg2003](https://github.com/jevg2003).
