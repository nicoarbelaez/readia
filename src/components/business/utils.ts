import { BusinessProfile } from "@/types/business/type";
import {
  CompanyFormData,
  CompanyQuestion,
} from "@/components/forms/company-profile/schemas/company-form-schemas";

export const transformProfileToFormData = (
  p: BusinessProfile,
): CompanyFormData => {
  // 1. Tipado explícito del retorno: FormQuestionItem[]
  const mapQuestions = (
    questions: typeof p.questionsAndResponses,
  ): CompanyQuestion[] => {
    return questions.map((q) => {
      const latestResponse =
        q.responses.length > 0
          ? q.responses[q.responses.length - 1].responseText
          : "";

      // Base común para originalQuestion
      const baseOriginal = {
        id: q.id,
        label: q.questionText,
      };

      // 2. Bloques explícitos para satisfacer la Discriminated Union
      if (q.questionType === "multiple") {
        let answer: string[] = [];
        try {
          answer = latestResponse ? JSON.parse(latestResponse) : [];
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          answer = [];
        }

        return {
          type: "multiple",
          label: q.questionText,
          answer: answer,
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
    });
  };

  return {
    extraQuestions: {
      additionalQuestions: mapQuestions(
        p.questionsAndResponses.filter((q) => q.aiGenerated),
      ),
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
      questions: mapQuestions(
        p.questionsAndResponses.filter((q) => !q.aiGenerated),
      ),
    },
  };
};
