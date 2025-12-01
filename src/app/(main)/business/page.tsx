"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  getFullBusinessProfile,
  updateBusinessResponses,
  regenerateDiagnostic,
} from "@/app/actions/business/business-profile-actions";
import { BusinessProfile } from "@/types/business/type";
import {
  CompanyFormData,
  CompanyFormSchema,
} from "@/components/forms/company-profile/schemas/company-form-schemas";
import { PageLayout } from "@/components/page-layout";
import { transformProfileToFormData } from "@/components/business/utils";
import { BusinessProfileForm } from "@/components/business/business-profile-form";

export default function BusinessFormPage() {
  // 1. Estado
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // 2. Configuración del Formulario
  const form = useForm<CompanyFormData>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues: {
      extraQuestions: { additionalQuestions: [] },
      questions: { questions: [] },
      generalInfo: {
        companyName: "",
        description: "",
        sector: "",
        employeeCount: 0,
      },
    },
  });

  // 3. Efectos (Data Fetching)
  useEffect(() => {
    let mounted = true;
    async function fetchProfile() {
      try {
        const p = await getFullBusinessProfile();
        if (mounted && p) {
          setProfile(p);
          const formData = transformProfileToFormData(p);
          form.reset(formData);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
        toast.error("Error al cargar el perfil");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProfile();
    return () => {
      mounted = false;
    };
  }, [form]);

  // 4. Handlers
  const onSubmit = async (data: CompanyFormData) => {
    if (!profile) return;
    setIsSubmitting(true);
    try {
      // Mapeo inverso: Form -> API
      const responsesToUpdate = [
        ...data.extraQuestions.additionalQuestions,
        ...data.questions.questions,
      ].map((q) => ({
        questionId: q.originalQuestion.id,
        response: Array.isArray(q.answer) ? JSON.stringify(q.answer) : q.answer,
      }));

      const result = await updateBusinessResponses(
        profile.business.id,
        responsesToUpdate,
      );

      if (result.success) {
        toast.success("Información actualizada correctamente");
      } else {
        toast.error(result.message || "Error al actualizar");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegenerate = async () => {
    if (!profile) return;
    setIsRegenerating(true);
    try {
      const result = await regenerateDiagnostic(profile.business.id);
      if (result.success) {
        toast.success("Diagnóstico regenerado");
        // Refetch profile
        const p = await getFullBusinessProfile();
        if (p) {
          setProfile(p);
          form.reset(transformProfileToFormData(p));
        }
      } else {
        toast.error(result.message || "Error al regenerar");
      }
    } catch (error) {
      toast.error("Error inesperado");
      console.error(error);
    } finally {
      setIsRegenerating(false);
    }
  };

  // 5. Renderizado Condicional de Estados de Carga
  if (loading) {
    return (
      <PageLayout title="Mi empresa" description="Cargando perfil...">
        <div className="flex h-40 items-center justify-center">
          <span className="text-muted-foreground">Cargando datos...</span>
        </div>
      </PageLayout>
    );
  }

  if (!profile) {
    return (
      <PageLayout title="Mi empresa" description="No se encontró información">
        <div className="py-10 text-center">
          <p className="text-muted-foreground">
            No pudimos cargar tu perfil de negocio.
          </p>
        </div>
      </PageLayout>
    );
  }

  // 6. Renderizado Principal
  return (
    <>
      <BusinessProfileForm
        form={form}
        profile={profile}
        onSubmit={onSubmit}
        onRegenerate={handleRegenerate}
        isSubmitting={isSubmitting}
        isRegenerating={isRegenerating}
      />
    </>
  );
}
