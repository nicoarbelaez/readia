"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { NavigationButtons } from "@/components/forms/company-profile/components/navigation-buttons";
import { useCompanyForm } from "@/components/forms/company-profile/context/company-form-context";
import {
  CompanyQuestions,
  CompanyQuestionsSchema,
} from "@/components/forms/company-profile/schemas/company-form-schemas";
import { InputFormItem } from "@/components/forms/company-profile/components/input-form-item";
import { useState } from "react";
import { RadioFormItem } from "@/components/forms/company-profile/components/radio-form-item";
import { generarteIAQuestion } from "@/app/actions/business-profile-actions";
import { QuestionsList } from "@/types/question";
import { Bot } from "lucide-react";

// Definición de las preguntas de manera estructurada
const QUESTIONS: QuestionsList = [
  {
    id: "q1",
    type: "open" as const,
    label: "¿Cuál es el principal desafío que enfrenta tu empresa actualmente?",
  },
  {
    id: "q2",
    type: "multiple" as const,
    label: "¿En qué etapa de madurez digital consideras que está tu empresa?",
    options: [
      { value: "inicial", label: "Inicial - Procesos principalmente manuales" },
      {
        value: "desarrollo",
        label: "En desarrollo - Algunos procesos digitalizados",
      },
      { value: "avanzado", label: "Avanzado - Mayoría de procesos digitales" },
      { value: "optimizado", label: "Optimizado - Completamente digital" },
    ],
  },
  {
    id: "q3",
    type: "open" as const,
    label: "¿Cuáles son tus objetivos de crecimiento para el próximo año?",
  },
  {
    id: "q4",
    type: "single" as const,
    label: "¿Tienes un plan de transformación digital?",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" },
      { value: "en_proceso", label: "En proceso de desarrollo" },
    ],
  },
  {
    id: "q5",
    type: "open" as const,
    label:
      "¿Qué recursos necesitarías para alcanzar tus objetivos empresariales?",
  },
];

export function CompanyQuestionsStep() {
  const {
    formData,
    setStepData,
    goToNextStep,
    goToPreviousStep,
    questionsAI,
    setQuestionsAI,
  } = useCompanyForm();
  const totalQuestions = QUESTIONS.length;
  const defaultQuestions: CompanyQuestions["questions"] = QUESTIONS.map((q) => {
    if (q.type === "multiple") {
      return {
        label: q.label,
        type: "multiple" as const,
        answer: [] as string[],
      };
    } else if (q.type === "single") {
      return {
        label: q.label,
        type: "single" as const,
        answer: "" as string,
      };
    } else {
      return {
        label: q.label,
        type: "open" as const,
        answer: "" as string,
      };
    }
  });

  const form = useForm<CompanyQuestions>({
    resolver: zodResolver(CompanyQuestionsSchema),
    defaultValues: {
      questions: defaultQuestions,
    },
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const currentPath = `questions.${currentQuestionIndex}.answer` as const;

  const handleNextQuestion = async () => {
    const valid = await form.trigger(currentPath);
    if (!valid) return;

    if (isLastQuestion) {
      const allValues = form.getValues();
      setStepData({ questions: allValues });

      if (!questionsAI && formData.generalInfo) {
        setIsLoadingNext(true);
        const generatedQuestionsAI = await generarteIAQuestion(
          allValues,
          formData.generalInfo,
          QUESTIONS,
        );
        setQuestionsAI(generatedQuestionsAI);
        setIsLoadingNext(false);
      }

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

  if (isLoadingNext) {
    return (
      <div className="flex h-64 animate-pulse flex-col items-center justify-center space-x-4 text-gray-500">
        <Bot className="size-28" strokeWidth={1.2} />
        <p className="max-w-sm text-center text-lg text-balance">
          Estamos utilizando inteligencia artificial para generar{" "}
          <span className="inline-block animate-bounce delay-100">.</span>
          <span className="inline-block animate-bounce delay-200">.</span>
          <span className="inline-block animate-bounce delay-300">.</span>
        </p>
      </div>
    );
  }

  const onSubmit = (data: CompanyQuestions) => {
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
            nextLabel={"Siguiente"}
            backLabel={"Atrás"}
            isNextDisabled={form.formState.isSubmitting}
            isBackDisabled={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </div>
  );
}
