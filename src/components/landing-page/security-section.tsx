"use client";

import { Shield, Lock, CheckCircle, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SecuritySection() {
  const securityItems = [
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Protección integral",
      desc: "Seguridad de datos corporativos de extremo a extremo, encriptación en tránsito y reposo.",
    },
    {
      icon: <Lock className="h-5 w-5 text-emerald-400" />,
      title: "Confidencialidad absoluta",
      desc: "Tus datos técnicos se procesan únicamente para el diagnóstico y nunca se usan para entrenamiento público.",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      title: "Cumplimiento normativo",
      desc: "Alineado con las mejores prácticas internacionales de gobernanza digital y ciberseguridad.",
    },
  ];

  const badges = [
    "🔒 Datos Encriptados",
    "🛡️ Cumplimiento SOC2 Ready",
    "🌐 Arquitectura Local y Cloud",
  ];

  return (
    <section className="bg-background py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.02),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Texto principal */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="size-6 text-emerald-400 animate-pulse" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              Seguridad y confianza de nivel empresarial en cada análisis
            </h2>
            
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              Nuestra inteligencia artificial procesa tu información técnica con protocolos avanzados de confidencialidad y aislamiento de datos.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-4">
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-muted/40 text-foreground border border-border/40 px-3 py-1.5 rounded-xl font-medium text-xs md:text-sm shadow-sm"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tarjetas de características */}
          <div className="lg:col-span-5 space-y-4">
            {securityItems.map((item, index) => (
              <Card
                key={index}
                className="bg-card/40 backdrop-blur-sm rounded-2xl border border-border/40 hover:border-primary/25 hover:shadow-md transition-all duration-300 group"
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="bg-muted/50 border border-border/40 p-2.5 rounded-xl flex-shrink-0 text-foreground">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm md:text-base group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}