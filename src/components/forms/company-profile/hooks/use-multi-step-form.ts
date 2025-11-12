import { useState } from "react";

interface UseMultiStepFormProps<T> {
  initialStep?: number;
  initialData?: Partial<T>;
  onStepComplete?: (stepData: Partial<T>, step: number) => void;
  onFormComplete?: (formData: T) => void;
  totalSteps: number;
}

interface UseMultiStepFormReturn<T, E> {
  currentStep: number;
  totalSteps: number;
  formData: Partial<T>;
  questionsAI: E | null;
  setQuestionsAI: (questions: E | null) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setStepData: (stepData: Partial<T>) => void;
  goToStep: (step: number) => void;
}

export function useMultiStepForm<T, E>({
  initialStep = 1,
  initialData = {} as T,
  onStepComplete,
  onFormComplete,
  totalSteps = 3,
}: UseMultiStepFormProps<T>): UseMultiStepFormReturn<T, E> {
  const [questionsAI, setQuestionsAI] = useState<E | null>(null);
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState<Partial<T>>(initialData);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const setStepData = (stepData: Partial<T>) => {
    const newFormData = { ...formData, ...stepData };
    setFormData(newFormData);

    if (onStepComplete) {
      onStepComplete(stepData, currentStep);
    }

    if (isLastStep && onFormComplete) {
      onFormComplete(newFormData as T);
    }
  };

  return {
    currentStep,
    totalSteps,
    questionsAI,
    setQuestionsAI,
    formData,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    setStepData,
    goToStep,
  };
}
