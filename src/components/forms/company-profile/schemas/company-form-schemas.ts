import { z } from "zod";
import { QuestionSchema as QuestionOptionSchema } from "./question-schema";

export const CompanyGeneralInfoSchema = z.object({
  sector: z.string().min(2, "Sector obligatorio"),
  description: z.string().optional(),
  companyName: z
    .string()
    .min(2, "Debe ingresar al menos 2 caracteres para el nombre de empresa"),
  employeeCount: z
    .number({ error: "Debe ser un número" })
    .min(0, "No puede ser negativo")
    .transform((val) => Math.round(val)),
  netEarnings: z
    .number({ error: "Debe ser número" })
    .min(0, "No puede ser negativo")
    .transform((val) => Math.round(val)),
});

export const QuestionSchema = z.discriminatedUnion("type", [
  z.object({
    label: z.string(),
    type: z.literal("open"),
    answer: z.string().min(1, "Respuesta obligatoria"),
    originalQuestion: QuestionOptionSchema,
  }),
  z.object({
    label: z.string(),
    type: z.literal("single"),
    answer: z.string().min(1, "Respuesta obligatoria"),
    originalQuestion: QuestionOptionSchema,
  }),
  z.object({
    label: z.string(),
    type: z.literal("multiple"),
    answer: z.array(z.string()).min(1, "Selecciona al menos una opción"),
    originalQuestion: QuestionOptionSchema,
  }),
]);

export const CompanyQuestionsSchema = z.object({
  questions: z.array(QuestionSchema),
});

export const CompanyExtraQuestionsSchema = z.object({
  additionalQuestions: z.array(QuestionSchema),
});

export const CompanyFormSchema = z.object({
  generalInfo: CompanyGeneralInfoSchema,
  questions: CompanyQuestionsSchema,
  extraQuestions: CompanyExtraQuestionsSchema,
});

export type CompanyQuestion = z.infer<typeof QuestionSchema>;

export type CompanyGeneralInfo = z.infer<typeof CompanyGeneralInfoSchema>;
export type CompanyQuestions = z.infer<typeof CompanyQuestionsSchema>;
export type CompanyExtraQuestions = z.infer<typeof CompanyExtraQuestionsSchema>;
export type CompanyFormData = z.infer<typeof CompanyFormSchema>;
