import { create } from 'zustand';
import { CompanyGeneralInfo, CompanyQuestion } from '@/components/forms/company-profile/schemas/company-form-schemas';
import { QuestionsList } from '@/types/question';

interface CompanyFormStore {
  currentStep: number;
  totalSteps: number;
  generalInfo: CompanyGeneralInfo | null;
  questionsAnswers: CompanyQuestion[];
  extraQuestionsAnswers: CompanyQuestion[];
  aiQuestions: QuestionsList | null;
  currentQuestionIndex: number;
  setGeneralInfo: (info: CompanyGeneralInfo) => void;
  setAiQuestions: (questions: QuestionsList) => void;
  setQuestionAnswer: (index: number, answer: string | string[]) => void;
  setExtraQuestionAnswer: (index: number, answer: string | string[]) => void;
  setQuestionsAnswers: (answers: CompanyQuestion[]) => void;
  setExtraQuestionsAnswers: (answers: CompanyQuestion[]) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  reset: () => void;
}

export const useCompanyFormStore = create<CompanyFormStore>((set) => ({
  currentStep: 1,
  totalSteps: 3,
  generalInfo: null,
  questionsAnswers: [],
  extraQuestionsAnswers: [],
  aiQuestions: null,
  currentQuestionIndex: 0,
  setGeneralInfo: (info) => set({ generalInfo: info }),
  setAiQuestions: (questions) => set({ aiQuestions: questions }),
  setQuestionsAnswers: (answers) => set({ questionsAnswers: answers }),
  setExtraQuestionsAnswers: (answers) => set({ extraQuestionsAnswers: answers }),
  setQuestionAnswer: (index, answer) => set((state) => {
    const newAnswers = [...state.questionsAnswers];
    if (newAnswers[index]) {
      (newAnswers[index] as { answer: string | string[] }).answer = answer;
    }
    return { questionsAnswers: newAnswers };
  }),
  setExtraQuestionAnswer: (index, answer) => set((state) => {
    const newAnswers = [...state.extraQuestionsAnswers];
    if (newAnswers[index]) {
      (newAnswers[index] as { answer: string | string[] }).answer = answer;
    }
    return { extraQuestionsAnswers: newAnswers };
  }),
  goToNextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, state.totalSteps), currentQuestionIndex: 0 })),
  goToPreviousStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1), currentQuestionIndex: 0 })),
  nextQuestion: () => set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
  previousQuestion: () => set((state) => ({ currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0) })),
  reset: () => set({
    currentStep: 1,
    generalInfo: null,
    questionsAnswers: [],
    extraQuestionsAnswers: [],
    aiQuestions: null,
    currentQuestionIndex: 0,
  }),
}));
