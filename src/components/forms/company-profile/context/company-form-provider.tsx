"use client";

import { ReactNode } from "react";
import { CompanyFormData } from "@/components/forms/company-profile/schemas/company-form-schemas";
import { useMultiStepForm } from "@/components/forms/company-profile/hooks/use-multi-step-form";
import { CompanyFormContext } from "@/components/forms/company-profile/context/company-form-context";
import { QuestionsList } from "@/types/question";

interface CompanyFormProviderProps {
  children: ReactNode;
  initialData?: Partial<CompanyFormData>;
  onStepComplete?: (stepData: Partial<CompanyFormData>, step: number) => void;
  onFormComplete?: (formData: CompanyFormData) => void;
  totalSteps?: number;
}

export function CompanyFormProvider({
  children,
  initialData,
  onStepComplete,
  onFormComplete,
  totalSteps = 3,
}: CompanyFormProviderProps) {
  const {
    currentStep,
    formData,
    questionsAI,
    setQuestionsAI,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    setStepData,
  } = useMultiStepForm<CompanyFormData, QuestionsList>({
    initialData,
    onStepComplete,
    onFormComplete,
    totalSteps,
  });

  return (
    <CompanyFormContext.Provider
      value={{
        formData,
        questionsAI,
        setQuestionsAI,
        currentStep,
        setStepData,
        goToNextStep,
        goToPreviousStep,
        isLastStep,
        isFirstStep,
      }}
    >
      {children}
    </CompanyFormContext.Provider>
  );
}
