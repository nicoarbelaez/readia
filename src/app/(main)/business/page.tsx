"use client";

import React from "react";
import { toast } from "sonner";
import { Building2, Plus } from "lucide-react";

import { useBusinessStore } from "@/stores/use-business-store";
import { getFullBusinessProfile } from "@/app/actions/business/business-profile-actions";
import { BusinessProfile } from "@/types/business/type";
import { PageLayout } from "@/components/page-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CompanyProfileDialog } from "@/components/forms/company-profile/organisms/company-profile-dialog";
import { HomeForm } from "@/components/home/home-form";

export default function BusinessPage() {
  const { activeBusiness } = useBusinessStore();
  const [profile, setProfile] = React.useState<BusinessProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const fetchProfile = React.useCallback(async () => {
    if (!activeBusiness?.id) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const p = await getFullBusinessProfile(activeBusiness.id);
      setProfile(p);
    } catch (err) {
      console.error("Failed to load profile:", err);
      toast.error("Error al cargar el perfil de la empresa");
    } finally {
      setLoading(false);
    }
  }, [activeBusiness?.id]);

  React.useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <PageLayout title="Mi empresa" description="Cargando perfil de negocio...">
        <div className="space-y-10 pb-16">
          <div className="bg-surface-900/40 border border-border/60 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-border/50 pb-3">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!activeBusiness || !profile) {
    return (
      <PageLayout
        title="Mi empresa"
        description="Registra tu empresa para comenzar el diagnóstico"
      >
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-surface-900/20 border border-border/50 rounded-2xl backdrop-blur-sm shadow-xl">
          <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 animate-pulse">
            <Building2 className="size-8" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            No tienes ninguna empresa registrada
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mb-8">
            Crea tu empresa para poder gestionar su perfil, responder preguntas de
            diagnóstico y generar hojas de ruta de adopción de IA.
          </p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="cursor-pointer shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Plus className="size-4" />
            Crear mi primera empresa
          </Button>
          <CompanyProfileDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </div>
      </PageLayout>
    );
  }

  return <HomeForm profile={profile} onRefresh={fetchProfile} />;
}
