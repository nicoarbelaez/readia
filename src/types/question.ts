type QuestionType = "open" | "multiple" | "single";

interface QuestionOption {
  value: string;
  label: string;
}

interface BaseQuestion {
  id: string;
  type: QuestionType;
  label: string;
}

interface OpenQuestion extends BaseQuestion {
  type: "open";
  // answer se asume como string en tu formulario
}

interface MultipleQuestion extends BaseQuestion {
  type: "multiple";
  options: QuestionOption[];
  // answer se asume como string[] en tu formulario
}

interface SingleQuestion extends BaseQuestion {
  type: "single";
  options: QuestionOption[];
  // answer se asume como string en tu formulario
}

export type Question = OpenQuestion | MultipleQuestion | SingleQuestion;

export type QuestionsList = Question[];