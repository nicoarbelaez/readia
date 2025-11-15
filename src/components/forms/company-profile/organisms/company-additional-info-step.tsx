"use client";

/**
 * Este comopenente de puede refactorizar con el componente CompanyQuestionsStep,
 * pero por claridad y para evitar complejidades innecesarias, se mantiene separado.
 *
 * src\components\forms\company-profile\organisms\company-questions-step.tsx
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { NavigationButtons } from "@/components/forms/company-profile/components/navigation-buttons";
import { useCompanyForm } from "@/components/forms/company-profile/context/company-form-context";
import {
  CompanyExtraQuestions,
  CompanyExtraQuestionsSchema,
} from "@/components/forms/company-profile/schemas/company-form-schemas";
import { InputFormItem } from "@/components/forms/company-profile/components/input-form-item";
import { useState } from "react";
import { RadioFormItem } from "@/components/forms/company-profile/components/radio-form-item";
import { QuestionsList } from "@/types/question";

export function CompanyAdditionalInfoStep() {
  const { questionsAI } = useCompanyForm();

  if (!questionsAI) {
    return <div>Error cargando preguntas</div>;
  }

  return <AdditionalInfoForm questionsAI={questionsAI} />;
}

function AdditionalInfoForm({ questionsAI }: { questionsAI: QuestionsList }) {
  const { setStepData, goToNextStep, goToPreviousStep } = useCompanyForm();

  const totalQuestions = questionsAI.length;

  const defaultQuestions: CompanyExtraQuestions["additionalQuestions"] =
    questionsAI.map((q) => {
      if (q.type === "multiple") {
        return {
          label: q.label,
          type: "multiple" as const,
          answer: [] as string[],
          originalQuestion: q,
        };
      } else if (q.type === "single") {
        return {
          label: q.label,
          type: "single" as const,
          answer: "" as string,
          originalQuestion: q,
        };
      } else {
        return {
          label: q.label,
          type: "open" as const,
          answer: "" as string,
          originalQuestion: q,
        };
      }
    });

  const form = useForm<CompanyExtraQuestions>({
    resolver: zodResolver(CompanyExtraQuestionsSchema),
    defaultValues: {
      additionalQuestions: defaultQuestions,
    },
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questionsAI[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const currentPath =
    `additionalQuestions.${currentQuestionIndex}.answer` as const;

  const handleNextQuestion = async () => {
    const valid = await form.trigger(currentPath);
    if (!valid) {
      return;
    }

    // Si es la última, completar paso
    if (isLastQuestion) {
      const allValues = form.getValues();
      // Enviar datos al contexto de formulario
      setStepData({ extraQuestions: allValues });
      goToNextStep();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (isFirstQuestion) {
      goToPreviousStep();
    } else {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const onSubmit = (data: CompanyExtraQuestions) => {
    // En este diseño, no usamos submit normal, usamos handleNextQuestion
    console.log("Submit:", data);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <p className="text-muted-foreground text-sm">
          Pregunta {currentQuestionIndex + 1} de {totalQuestions}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            key={currentPath} // Este key fuerza a React a resetear el estado interno del input al cambiar de pregunta
            control={form.control}
            name={currentPath}
            render={({ field }) => {
              // Dependiendo del tipo de la pregunta, renderizamos distinto input
              if (
                currentQuestion.type === "multiple" ||
                currentQuestion.type === "single"
              ) {
                return (
                  <RadioFormItem
                    type={currentQuestion.type}
                    field={field}
                    label={currentQuestion.label}
                    options={currentQuestion.options ?? []}
                  />
                );
              } else {
                return (
                  <InputFormItem
                    type="textarea"
                    field={field}
                    label={currentQuestion.label}
                    inputProps={{
                      placeholder: "Tu respuesta...",
                      className: "min-h-[100px]",
                    }}
                  />
                );
              }
            }}
          />

          <NavigationButtons
            onNext={handleNextQuestion}
            onBack={handlePreviousQuestion}
            nextLabel={isLastQuestion ? "Finalizar" : "Siguiente"}
            backLabel={"Atrás"}
            isNextDisabled={form.formState.isSubmitting}
            isBackDisabled={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </div>
  );
}
