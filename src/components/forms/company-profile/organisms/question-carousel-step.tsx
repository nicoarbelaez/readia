"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { NavigationButtons } from "@/components/forms/company-profile/components/navigation-buttons";
import { useCompanyFormStore } from "@/stores/use-company-form-store";
import { InputFormItem } from "@/components/forms/company-profile/components/input-form-item";
import { RadioFormItem } from "@/components/forms/company-profile/components/radio-form-item";
import { QuestionsList } from "@/types/question";
import { Bot } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";

interface QuestionCarouselStepProps {
  questions: QuestionsList;
  stepKey: "questionsAnswers" | "extraQuestionsAnswers";
  onComplete: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function QuestionCarouselStep({
  questions,
  stepKey,
  onComplete,
  onBack,
  isLoading,
}: QuestionCarouselStepProps) {
  const store = useCompanyFormStore();
  const currentIndex = store.currentQuestionIndex;

  const currentQuestion = questions?.[currentIndex];
  const isLastQuestion = currentIndex === (questions?.length || 1) - 1;
  const isFirstQuestion = currentIndex === 0;

  const singleSchema = z.object({
    answer:
      currentQuestion?.type === "multiple"
        ? z.array(z.string()).min(1, "Selecciona al menos una opción")
        : z.string().min(1, "Respuesta obligatoria"),
  });

  const form = useForm({
    resolver: zodResolver(singleSchema),
    defaultValues: {
      answer:
        store[stepKey][currentIndex]?.answer ||
        (currentQuestion?.type === "multiple" ? [] : ""),
    },
  });

  useEffect(() => {
    form.reset({
      answer:
        store[stepKey][currentIndex]?.answer ||
        (currentQuestion?.type === "multiple" ? [] : ""),
    });
  }, [currentIndex, currentQuestion, store, stepKey, form]);

  const handleNext = async () => {
    const valid = await form.trigger();
    if (!valid) return;

    const val = form.getValues().answer;

    if (stepKey === "questionsAnswers") {
      store.setQuestionAnswer(currentIndex, val as string | string[]);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      store.setExtraQuestionAnswer(currentIndex, val as any);
    }

    if (isLastQuestion) {
      onComplete();
    } else {
      store.nextQuestion();
    }
  };

  const handlePrevious = () => {
    if (isFirstQuestion) {
      onBack();
    } else {
      store.previousQuestion();
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-x-4 text-gray-500">
        <div className="flex flex-col items-center gap-3">
          <Bot className="size-12 animate-bounce" strokeWidth={1} />
          <div className="flex items-center gap-2">
            <Spinner className="text-primary size-5" />
            <span className="text-foreground text-sm font-medium">
              Generando...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return <div>No hay preguntas para mostrar.</div>;
  }

  if (!currentQuestion) return null;

  return (
    <div className="space-y-6">
      <div className="text-muted-foreground mb-4 text-sm">
        Pregunta {currentIndex + 1} de {questions.length}
      </div>

      <Form {...form}>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <FormField
            key={currentQuestion.id}
            control={form.control}
            name="answer"
            render={({ field }) => {
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
              }

              return (
                <InputFormItem
                  type="textarea"
                  field={field}
                  label={currentQuestion.label}
                  textareaProps={{
                    placeholder: "Tu respuesta...",
                    className: "min-h-[100px]",
                  }}
                />
              );
            }}
          />

          <NavigationButtons
            onNext={handleNext}
            onBack={handlePrevious}
            nextLabel={isLastQuestion ? "Completar" : "Siguiente"}
            backLabel="Atrás"
          />
        </form>
      </Form>
    </div>
  );
}
