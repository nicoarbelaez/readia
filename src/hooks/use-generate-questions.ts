import { useMutation } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { useCompanyFormStore } from '@/stores/use-company-form-store';
import { QuestionsList } from '@/types/question';
import type { CompanyQuestion } from '@/components/forms/company-profile/schemas/company-form-schemas';
import type { CompanyGeneralInfo } from '@/components/forms/company-profile/schemas/company-form-schemas';

interface GenerateQuestionsParams {
  questionsAnswered: CompanyQuestion[];
  generalInfo: CompanyGeneralInfo | null;
  existingQuestions: QuestionsList;
}

export function useGenerateQuestions() {
  const store = useCompanyFormStore();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (params: GenerateQuestionsParams) => {
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: params,
      });
      if (error) throw error;
      return data as QuestionsList;
    },
    onSuccess: (data) => {
      store.setAiQuestions(data);
    },
    retry: 2,
  });
}
