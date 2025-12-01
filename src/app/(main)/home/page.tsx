"use client";

import React from "react";
import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { BusinessProfile } from "@/types/business/type";
import {
  getFullBusinessProfile,
  updateBusinessResponses,
  regenerateDiagnostic,
} from "@/app/actions/business/business-profile-actions";
import { RotateCcw, Loader2 } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import {
  CompanyFormData,
  CompanyFormSchema,
} from "@/components/forms/company-profile/schemas/company-form-schemas";
import { InputFormItem } from "@/components/forms/company-profile/components/input-form-item";

export default function Home() {
  const [profile, setProfile] = React.useState<BusinessProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
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

  React.useEffect(() => {
    let mounted = true;
    async function fetchProfile() {
      try {
        const p = await getFullBusinessProfile();
        if (mounted && p) {
          setProfile(p);

          const defaultValues: CompanyFormData = {
            extraQuestions: {
              additionalQuestions: p.questionsAndResponses.filter((q) => q.aiGenerated).map((q) => {
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
                  } catch (e) {
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
              companyName: p.business.companyName,
              description: p.business.description ?? "",
              sector: p.business.sector,
              employeeCount: p.business.employeeCount,
              netEarnings: p.business.netEarnings,
              category: p.business.category,
            },
            questions: {
              questions: p.questionsAndResponses.filter((q) => !q.aiGenerated).map((q) => {
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
                  } catch (e) {
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

  const onSubmit = async (data: CompanyFormData) => {
    if (!profile) return;
    setIsSubmitting(true);
    try {
      const responsesToUpdate = data.extraQuestions.additionalQuestions.map(
        (q) => ({
          questionId: q.originalQuestion.id,
          response: Array.isArray(q.answer)
            ? JSON.stringify(q.answer)
            : q.answer,
        }),
      );

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
        // Reload profile
        const p = await getFullBusinessProfile();
        if (p) setProfile(p);
      } else {
        toast.error(result.message || "Error al regenerar");
      }
    } catch (error) {
      toast.error("Error inesperado");
    } finally {
      setIsRegenerating(false);
    }
  };

  if (loading) {
    return (
      <PageLayout title="Mi empresa" description="Cargando perfil...">
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </PageLayout>
    );
  }

  if (!profile) {
    return (
      <PageLayout title="Mi empresa" description="No se encontró información">
        <div className="text-center">
          <p>No pudimos cargar tu perfil de negocio.</p>
        </div>
      </PageLayout>
    );
  }

  const headerActions = (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        className="shadow-primary-soft/10 flex items-center gap-2"
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
      >
        {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
        Enviar
      </Button>
    </div>
  );

  return (
    <PageLayout
      title="Mi empresa"
      description={`Perfil de ${profile.business.companyName}`}
      actions={headerActions}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="flex flex-col gap-4">
            <FormFieldGroup control={form.control} />
          </div>

          {profile.questionsAndResponses.map((q, index) => (
            <FormField
              key={q.id}
              control={form.control}
              name={`extraQuestions.additionalQuestions.${index}.answer`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    {q.questionText}
                  </FormLabel>
                  <FormControl>
                    {q.questionType === "open" ? (
                      <Textarea
                        placeholder="Escribe tu respuesta aquí..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    ) : q.questionType === "single" ? (
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex flex-col space-y-1"
                      >
                        {q.options?.map((opt) => (
                          <FormItem
                            key={opt.value}
                            className="flex items-center space-y-0 space-x-3"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={opt.value}
                                checked={field.value == opt.value}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {opt.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    ) : q.questionType === "multiple" ? (
                      <div className="flex flex-col space-y-2">
                        {q.options?.map((opt) => (
                          <FormItem
                            key={opt.value}
                            className="flex flex-row items-start space-y-0 space-x-3"
                          >
                            <FormControl>
                              <Checkbox
                                defaultChecked={field.value?.includes(
                                  opt.value,
                                )}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {opt.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    ) : null}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
    </PageLayout>
  );
}

const FormFieldGroup = ({ control }: { control: Control<CompanyFormData> }) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between gap-4">
          <FormField
            control={control}
            name="generalInfo.companyName"
            render={({ field }) => (
              <div className="flex-1">
                <InputFormItem
                  type="text"
                  field={field}
                  label="Nombre de la empresa"
                  inputProps={{
                    placeholder: "Empresa S.A.",
                  }}
                />
              </div>
            )}
          />
          <FormField
            control={control}
            name="generalInfo.sector"
            render={({ field }) => (
              <div className="flex-1">
                <InputFormItem
                  type="select"
                  field={field}
                  label="Sector"
                  selectItems={["Industrial", "Comercio", "Servicios"]}
                />
              </div>
            )}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <FormField
            control={control}
            name="generalInfo.category"
            render={({ field }) => (
              <div className="flex-1">
                <InputFormItem
                  type="text"
                  field={field}
                  label="Categoría"
                  inputProps={{
                    placeholder: "Ej: Tecnología, Agricultura, etc.",
                  }}
                />
              </div>
            )}
          />
          <FormField
            control={control}
            name="generalInfo.employeeCount"
            render={({ field }) => (
              <div className="flex-1">
                <InputFormItem
                  type="number"
                  field={field}
                  label="Cantidad de empleados"
                  inputProps={{
                    placeholder: "Ej: 50",
                  }}
                />
              </div>
            )}
          />
          <FormField
            control={control}
            name="generalInfo.netEarnings"
            render={({ field }) => (
              <div className="flex-1">
                <InputFormItem
                  type="number"
                  field={field}
                  label="Ganancias netas"
                  inputProps={{
                    placeholder: "Ej: 100000",
                  }}
                />
              </div>
            )}
          />
        </div>
      </div>
      <FormField
        control={control}
        name="generalInfo.description"
        render={({ field }) => (
          <InputFormItem type="textarea" field={field} label="Descripción" />
        )}
      />
    </>
  );
};
