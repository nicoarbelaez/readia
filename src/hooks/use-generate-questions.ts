import { useMutation } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { useCompanyFormStore } from '@/stores/use-company-form-store';
import { QuestionsList } from '@/types/question';

export function useGenerateQuestions() {
  const store = useCompanyFormStore();
  const supabase = createClient();
  
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (params: { questionsAnswered: any, generalInfo: any, existingQuestions: any }) => {
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
