"use client";

import React from "react";
import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RotateCcw, Loader2, Save, FileText, Sparkles, Building2 } from "lucide-react";

import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BusinessProfile } from "@/types/business/type";
import {
  updateBusinessResponses,
  regenerateDiagnostic,
} from "@/app/actions/business/business-profile-actions";
import { PageLayout } from "@/components/page-layout";
import {
  CompanyFormData,
  CompanyFormSchema,
} from "@/components/forms/company-profile/schemas/company-form-schemas";
import { InputFormItem } from "@/components/forms/company-profile/components/input-form-item";
import { QuestionField } from "./question-field";
import { DeleteBusinessDialog } from "./delete-business-dialog";

interface HomeFormProps {
  profile: BusinessProfile;
  onRefresh: () => Promise<void>;
}

export function HomeForm({ profile, onRefresh }: HomeFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isRegenerating, setIsRegenerating] = React.useState(false);

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues: {
      extraQuestions: {
        additionalQuestions: [{}],
      },
      generalInfo: {
        companyName: "",
        description: "",
        sector: "",
        employeeCount: 0,
      },
      questions: {
        questions: [{}],
      },
    },
  });

  // Re-sync values when profile changes
  React.useEffect(() => {
    if (profile) {
      const defaultValues: CompanyFormData = {
        extraQuestions: {
          additionalQuestions: profile.questionsAndResponses
            .filter((q) => q.aiGenerated)
            .map((q) => {
              const latestResponse =
                q.responses.length > 0
                  ? q.responses[q.responses.length - 1].responseText
                  : "";

              const baseOriginal = {
                id: q.id,
                label: q.questionText,
                type: q.questionType,
              };

              if (q.questionType === "multiple") {
                let answer: string[] = [];
                try {
                  answer = latestResponse ? JSON.parse(latestResponse) : [];
                } catch {
                  answer = [];
                }
                return {
                  type: "multiple",
                  label: q.questionText,
                  answer,
                  originalQuestion: {
                    ...baseOriginal,
                    type: "multiple",
                    options: q.options || [],
                  },
                };
              } else if (q.questionType === "single") {
                return {
                  type: "single",
                  label: q.questionText,
                  answer: latestResponse || "",
                  originalQuestion: {
                    ...baseOriginal,
                    type: "single",
                    options: q.options || [],
                  },
                };
              } else {
                return {
                  type: "open",
                  label: q.questionText,
                  answer: latestResponse || "",
                  originalQuestion: {
                    ...baseOriginal,
                    type: "open",
                  },
                };
              }
            }),
        },
        generalInfo: {
          companyName: profile.business.companyName,
          description: profile.business.description ?? "",
          sector: profile.business.sector,
          employeeCount: profile.business.employeeCount,
          netEarnings: profile.business.netEarnings,
          category: profile.business.category,
        },
        questions: {
          questions: profile.questionsAndResponses
            .filter((q) => !q.aiGenerated)
            .map((q) => {
              const latestResponse =
                q.responses.length > 0
                  ? q.responses[q.responses.length - 1].responseText
                  : "";

              const baseOriginal = {
                id: q.id,
                label: q.questionText,
                type: q.questionType,
              };

              if (q.questionType === "multiple") {
                let answer: string[] = [];
                try {
                  answer = latestResponse ? JSON.parse(latestResponse) : [];
                } catch {
                  answer = [];
                }
                return {
                  type: "multiple",
                  label: q.questionText,
                  answer,
                  originalQuestion: {
                    ...baseOriginal,
                    type: "multiple",
                    options: q.options || [],
                  },
                };
              } else if (q.questionType === "single") {
                return {
                  type: "single",
                  label: q.questionText,
                  answer: latestResponse || "",
                  originalQuestion: {
                    ...baseOriginal,
                    type: "single",
                    options: q.options || [],
                  },
                };
              } else {
                return {
                  type: "open",
                  label: q.questionText,
                  answer: latestResponse || "",
                  originalQuestion: {
                    ...baseOriginal,
                    type: "open",
                  },
                };
              }
            }),
        },
      };

      form.reset(defaultValues);
    }
  }, [profile, form]);

  const onSubmit = async (data: CompanyFormData) => {
    setIsSubmitting(true);
    try {
      const baseResponses = data.questions.questions.map((q) => ({
        questionId: q.originalQuestion.id,
        response: Array.isArray(q.answer) ? JSON.stringify(q.answer) : q.answer,
      }));

      const aiResponses = data.extraQuestions.additionalQuestions.map((q) => ({
        questionId: q.originalQuestion.id,
        response: Array.isArray(q.answer) ? JSON.stringify(q.answer) : q.answer,
      }));

      const allResponses = [...baseResponses, ...aiResponses];

      const result = await updateBusinessResponses(
        profile.business.id,
        allResponses,
      );

      if (result.success) {
        toast.success("Información actualizada correctamente");
        await onRefresh();
      } else {
        toast.error(result.message || "Error al actualizar");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al guardar respuestas");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const result = await regenerateDiagnostic(profile.business.id);
      if (result.success) {
        toast.success("Diagnóstico regenerado correctamente");
        await onRefresh();
      } else {
        toast.error(result.message || "Error al regenerar el diagnóstico");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al regenerar diagnóstico");
    } finally {
      setIsRegenerating(false);
    }
  };

  const baseQuestions = profile.questionsAndResponses.filter((q) => !q.aiGenerated);
  const aiQuestions = profile.questionsAndResponses.filter((q) => q.aiGenerated);

  const headerActions = (
    <div className="flex flex-wrap items-center gap-3">
      <DeleteBusinessDialog
        businessId={profile.business.id}
        companyName={profile.business.companyName}
      />
      <Button
        variant="secondary"
        className="shadow-primary-soft/10 flex items-center gap-2 border cursor-pointer"
        onClick={handleRegenerate}
        disabled={isRegenerating || isSubmitting}
      >
        {isRegenerating ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <RotateCcw className="size-4" />
        )}
        Re-generar diagnóstico
      </Button>
      <Button
        onClick={form.handleSubmit(onSubmit)}
        disabled={isSubmitting || isRegenerating}
        className="flex items-center gap-2 cursor-pointer shadow-md shadow-primary/20"
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Save className="size-4" />
        )}
        Guardar cambios
      </Button>
    </div>
  );

  return (
    <PageLayout
      title="Mi empresa"
      description={`Perfil y configuración de ${profile.business.companyName}`}
      actions={headerActions}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 pb-16"
        >
          {/* Section 1: General Info */}
          <div className="bg-surface-900/40 border border-border/60 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-sm shadow-xl shadow-surface-950/20">
            <h2 className="text-xl font-bold flex items-center gap-2 text-primary border-b border-border/50 pb-3">
              <Building2 className="size-5" />
              Información General
            </h2>
            <FormFieldGroup control={form.control} />
          </div>

          {/* Section 2: Base Diagnostic Questions */}
          {baseQuestions.length > 0 && (
            <div className="bg-surface-900/40 border border-border/60 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-sm shadow-xl shadow-surface-950/20">
              <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-400 border-b border-border/50 pb-3">
                <FileText className="size-5" />
                Preguntas de Diagnóstico Base
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {baseQuestions.map((q, index) => (
                  <QuestionField
                    key={q.id}
                    question={q}
                    index={index}
                    control={form.control}
                    type="base"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Section 3: AI-generated additional Questions */}
          {aiQuestions.length > 0 && (
            <div className="bg-surface-900/40 border border-border/60 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-sm shadow-xl shadow-surface-950/20">
              <h2 className="text-xl font-bold flex items-center gap-2 text-violet-400 border-b border-border/50 pb-3">
                <Sparkles className="size-5 animate-pulse" />
                Preguntas Personalizadas de IA
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {aiQuestions.map((q, index) => (
                  <QuestionField
                    key={q.id}
                    question={q}
                    index={index}
                    control={form.control}
                    type="ai"
                  />
                ))}
              </div>
            </div>
          )}
        </form>
      </Form>
    </PageLayout>
  );
}

const FormFieldGroup = ({ control }: { control: Control<CompanyFormData> }) => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField
          control={control}
          name="generalInfo.companyName"
          render={({ field }) => (
            <InputFormItem
              type="text"
              field={field}
              label="Nombre de la empresa"
              inputProps={{
                placeholder: "Ej: InnovaTech S.A.S.",
                className: "bg-background/40 border-border/60 focus-visible:ring-primary/30",
              }}
            />
          )}
        />
        <FormField
          control={control}
          name="generalInfo.sector"
          render={({ field }) => (
            <InputFormItem
              type="select"
              field={field}
              label="Sector"
              selectItems={["Industrial", "Comercio", "Servicios"]}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FormField
          control={control}
          name="generalInfo.category"
          render={({ field }) => (
            <InputFormItem
              type="text"
              field={field}
              label="Categoría"
              inputProps={{
                placeholder: "Ej: Tecnología, Salud, Finanzas",
                className: "bg-background/40 border-border/60 focus-visible:ring-primary/30",
              }}
            />
          )}
        />
        <FormField
          control={control}
          name="generalInfo.employeeCount"
          render={({ field }) => (
            <InputFormItem
              type="number"
              field={field}
              label="Cantidad de empleados"
              inputProps={{
                placeholder: "Ej: 25",
                className: "bg-background/40 border-border/60 focus-visible:ring-primary/30",
              }}
            />
          )}
        />
        <FormField
          control={control}
          name="generalInfo.netEarnings"
          render={({ field }) => (
            <InputFormItem
              type="number"
              field={field}
              label="Ganancias netas anuales"
              inputProps={{
                placeholder: "Ej: 150000",
                className: "bg-background/40 border-border/60 focus-visible:ring-primary/30",
              }}
            />
          )}
        />
      </div>

      <FormField
        control={control}
        name="generalInfo.description"
        render={({ field }) => (
          <InputFormItem
            type="textarea"
            field={field}
            label="Descripción del negocio"
            inputProps={{
              placeholder: "Describe brevemente las actividades principales y visión de tu empresa...",
              className: "min-h-[120px] bg-background/40 border-border/60 focus-visible:ring-primary/30 resize-y",
            }}
          />
        )}
      />
    </div>
  );
};
