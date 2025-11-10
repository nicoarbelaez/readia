import { createContext, useContext } from "react";
import { CompanyFormData } from "@/components/forms/company-profile/schemas/company-form-schemas";
import { QuestionsList } from "@/types/question";

interface CompanyFormContextType {
  formData: Partial<CompanyFormData>;
  questionsAI: QuestionsList | null;
  setQuestionsAI: (questions: QuestionsList | null) => void;
  currentStep: number;
  setStepData: (data: Partial<CompanyFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
}

export const CompanyFormContext = createContext<
  CompanyFormContextType | undefined
>(undefined);

export function useCompanyForm() {
  const context = useContext(CompanyFormContext);
  if (!context) {
    throw new Error(
      "useCompanyForm debe ser usado dentro de un CompanyFormProvider",
    );
  }
  return context;
}
