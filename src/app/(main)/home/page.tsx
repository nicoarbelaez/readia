"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  LandPlot,
  Map,
  ArrowRight,
  Sparkles,
  BarChart3,
  Route,
} from "lucide-react";

import { useBusinessStore } from "@/stores/use-business-store";
import { Button } from "@/components/ui/button";
import { CompanyProfileDialog } from "@/components/forms/company-profile/organisms/company-profile-dialog";
import { Skeleton } from "@/components/ui/skeleton";

// ----- Feature cards data -----
const FEATURES = [
  {
    icon: LandPlot,
    title: "Diagnóstico de Madurez",
    description:
      "Evalúa el nivel de adopción de IA en tu empresa con un análisis profundo de múltiples pilares estratégicos.",
    href: "/diagnostic",
    color: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/40",
  },
  {
    icon: Map,
    title: "Hoja de Ruta",
    description:
      "Visualiza un roadmap personalizado con pasos concretos para escalar la inteligencia artificial en tu negocio.",
    href: "/roadmap",
    color: "from-violet-500/20 to-violet-600/5",
    iconColor: "text-violet-400",
    borderColor: "hover:border-violet-500/40",
  },
  {
    icon: BarChart3,
    title: "Perfil de Empresa",
    description:
      "Gestiona la información de tu empresa y responde preguntas clave que alimentan el diagnóstico de IA.",
    href: "/business",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
    borderColor: "hover:border-primary/40",
  },
];

export default function Home() {
  const { activeBusiness } = useBusinessStore();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  // businesses length === 0 means not loaded yet (context sets them); we track a mounted flag
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Small delay so Zustand hydrates from context before we decide to show "no company"
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  const hasCompany = Boolean(activeBusiness);
  const companyName = activeBusiness?.companyName ?? "";

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col gap-12 pb-16">
      {/* ── Hero / Greeting ── */}
      <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-surface-900/60 via-surface-900/40 to-transparent p-8 md:p-12 backdrop-blur-sm shadow-2xl shadow-surface-950/30">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-12 size-48 rounded-full bg-violet-500/8 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            {!mounted ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-72" />
                <Skeleton className="h-5 w-96" />
              </div>
            ) : hasCompany ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Sparkles className="size-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                    Panel de Control
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                  Bienvenido,{" "}
                  <span className="text-primary">{companyName}</span> 👋
                </h1>
                <p className="mt-3 text-muted-foreground max-w-xl text-sm md:text-base">
                  Aquí tienes una vista rápida de las herramientas disponibles
                  para evaluar y potenciar la adopción de IA en tu empresa.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center animate-pulse">
                    <Building2 className="size-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                    Primeros Pasos
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                  Bienvenido a{" "}
                  <span className="text-primary">Readia</span>
                </h1>
                <p className="mt-3 text-muted-foreground max-w-xl text-sm md:text-base">
                  Aún no tienes ninguna empresa registrada. Crea una para
                  comenzar a diagnosticar la madurez de IA de tu negocio y
                  generar tu hoja de ruta personalizada.
                </p>
              </>
            )}
          </div>

          {/* CTA */}
          {mounted && !hasCompany && (
            <div className="shrink-0">
              <Button
                size="lg"
                onClick={() => setIsDialogOpen(true)}
                className="cursor-pointer shadow-xl shadow-primary/25 flex items-center gap-2 text-base px-6"
              >
                <Plus className="size-5" />
                Crear mi empresa
              </Button>
              <CompanyProfileDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
              />
            </div>
          )}

          {mounted && hasCompany && (
            <div className="shrink-0">
              <Link href="/diagnostic">
                <Button
                  size="lg"
                  className="cursor-pointer shadow-xl shadow-primary/25 flex items-center gap-2 text-base px-6"
                >
                  Ver Diagnóstico
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Route className="size-5 text-primary" />
            Herramientas disponibles
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Explora las secciones de la plataforma para sacar el máximo provecho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((feat) => (
            <Link key={feat.href} href={feat.href} className="group block">
              <div
                className={`
                  relative h-full flex flex-col gap-4 p-6 rounded-2xl border border-border/50
                  bg-gradient-to-br ${feat.color}
                  ${feat.borderColor}
                  transition-all duration-300 hover:shadow-lg hover:shadow-surface-950/30
                  hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer
                `}
              >
                <div
                  className={`size-12 rounded-xl bg-surface-900/60 flex items-center justify-center ${feat.iconColor} transition-transform duration-300 group-hover:scale-110`}
                >
                  <feat.icon className="size-6" />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-1.5 text-xs font-medium ${feat.iconColor} opacity-70 group-hover:opacity-100 transition-opacity`}
                >
                  Ir a {feat.title.split(" ")[0]}
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── No company CTA block (only if no company and mounted) ── */}
      {mounted && !hasCompany && (
        <section className="flex flex-col items-center justify-center gap-6 text-center py-10 px-8 rounded-2xl border border-dashed border-border/60 bg-surface-900/10">
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Building2 className="size-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Empieza registrando tu empresa
            </h3>
            <p className="text-muted-foreground text-sm mt-1.5 max-w-sm">
              Con un perfil de empresa completo, la IA generará un diagnóstico y
              hoja de ruta totalmente personalizados.
            </p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant="outline"
            className="cursor-pointer flex items-center gap-2"
          >
            <Plus className="size-4" />
            Crear empresa ahora
          </Button>
        </section>
      )}
    </div>
  );
}
