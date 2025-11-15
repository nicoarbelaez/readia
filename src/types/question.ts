import {
  QuestionSchema,
  QuestionsListSchema,
} from "@/components/forms/company-profile/schemas/question-schema";
import z from "zod";
import { Database } from "@/types/database";

/**
 * Antes de usar Zod, la definición de tipos era la siguiente:
 */

// type QuestionType = "open" | "multiple" | "single";

// interface QuestionOption {
//   value: string;
//   label: string;
// }

// interface BaseQuestion {
//   id: string;
//   type: QuestionType;
//   label: string;
// }

// interface OpenQuestion extends BaseQuestion {
//   type: "open";
//   // answer se asume como string en tu formulario
// }

// interface MultipleQuestion extends BaseQuestion {
//   type: "multiple";
//   options: QuestionOption[];
//   // answer se asume como string[] en tu formulario
// }

// interface SingleQuestion extends BaseQuestion {
//   type: "single";
//   options: QuestionOption[];
//   // answer se asume como string en tu formulario
// }

// export type Question = OpenQuestion | MultipleQuestion | SingleQuestion;
// export type QuestionsList = Question[];

export type Question = z.infer<typeof QuestionSchema>;
export type QuestionsList = z.infer<typeof QuestionsListSchema>;

export type QuestionType =
  Database["public_web"]["Enums"]["question_type_enum"];
