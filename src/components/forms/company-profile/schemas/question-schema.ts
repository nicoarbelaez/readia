import { z } from "zod";

export const QuestionOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const QuestionTypeSchema = z.enum(["open", "multiple", "single"]);

export const BaseQuestionSchema = z.object({
  id: z.string(),
  type: QuestionTypeSchema,
  label: z.string(),
});

export const OpenQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("open"),
});

export const MultipleQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("multiple"),
  options: z.array(QuestionOptionSchema),
});

export const SingleQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("single"),
  options: z.array(QuestionOptionSchema),
});

export const QuestionSchema = z.discriminatedUnion("type", [
  OpenQuestionSchema,
  MultipleQuestionSchema,
  SingleQuestionSchema,
]);

export const QuestionsListSchema = z.array(QuestionSchema);
