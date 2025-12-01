import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CompanyFormData } from "@/components/forms/company-profile/schemas/company-form-schemas";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCcw } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { GeneralInfoSection } from "./general-info-section";
import { DynamicQuestionField } from "./dynamic-question-field";
import { BusinessProfile } from "@/types/business/type";

interface BusinessProfileFormProps {
  form: UseFormReturn<CompanyFormData>;
  profile: BusinessProfile;
  onSubmit: (data: CompanyFormData) => void;
  onRegenerate: () => void;
  isSubmitting: boolean;
  isRegenerating: boolean;
}

export const BusinessProfileForm = ({
  form,
  profile,
  onSubmit,
  onRegenerate,
  isSubmitting,
  isRegenerating,
}: BusinessProfileFormProps) => {
  const headerActions = (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        className="shadow-sm"
        onClick={(e) => {
          e.preventDefault();
          onRegenerate();
        }}
        disabled={isRegenerating || isSubmitting}
      >
        {isRegenerating ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <RotateCcw className="mr-2 size-4" />
        )}
        Re-generar diagnóstico
      </Button>
      <Button
        onClick={form.handleSubmit(onSubmit)}
        disabled={isSubmitting || isRegenerating}
      >
        {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
        Guardar Cambios
      </Button>
    </div>
  );

  const aiQuestions = profile.questionsAndResponses.filter(
    (q) => q.aiGenerated,
  );
  const otherQuestions = profile.questionsAndResponses.filter(
    (q) => !q.aiGenerated,
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
          {/* Sección 1: Info General */}
          <GeneralInfoSection control={form.control} />

          {/* Sección 2: Preguntas de Diagnóstico (AI Generated) */}
          {aiQuestions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-tight">
                Preguntas de Diagnóstico
              </h3>
              {aiQuestions.map((q, index) => (
                <DynamicQuestionField
                  key={q.id}
                  control={form.control}
                  index={index}
                  path="extraQuestions.additionalQuestions"
                  questionText={q.questionText}
                  questionType={q.questionType}
                  options={q.options}
                />
              ))}
            </div>
          )}

          {/* Sección 3: Otras Preguntas */}
          {otherQuestions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-tight">
                Otras Preguntas
              </h3>
              {otherQuestions.map((q, index) => (
                <DynamicQuestionField
                  key={q.id}
                  control={form.control}
                  index={index}
                  path="questions.questions"
                  questionText={q.questionText}
                  questionType={q.questionType}
                  options={q.options}
                />
              ))}
            </div>
          )}
        </form>
      </Form>
    </PageLayout>
  );
};
