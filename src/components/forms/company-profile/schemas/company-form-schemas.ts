import { z } from "zod";

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

const QuestionSchema = z.discriminatedUnion("type", [
  z.object({
    label: z.string(),
    type: z.literal("open"),
    answer: z.string().min(1, "Respuesta obligatoria"),
  }),
  z.object({
    label: z.string(),
    type: z.literal("single"),
    answer: z.string().min(1, "Respuesta obligatoria"),
  }),
  z.object({
    label: z.string(),
    type: z.literal("multiple"),
    answer: z.array(z.string()).min(1, "Selecciona al menos una opción"),
  }),
]);

export const CompanyQuestionsSchema = z.object({
  questions: z.array(QuestionSchema),
});

export const CompanyAdditionalInfoSchema = z.object({
  additionalQuestions: z.array(
    z.object({
      id: z.string(),
      answer: z.string().min(1, "Respuesta obligatoria"),
    }),
  ),
});

export const CompanyFormSchema = z.object({
  generalInfo: CompanyGeneralInfoSchema,
  questions: CompanyQuestionsSchema,
  additionalInfo: CompanyAdditionalInfoSchema,
});

export type CompanyGeneralInfo = z.infer<typeof CompanyGeneralInfoSchema>;
export type CompanyQuestions = z.infer<typeof CompanyQuestionsSchema>;
export type CompanyAdditionalInfo = z.infer<typeof CompanyAdditionalInfoSchema>;
export type CompanyFormData = z.infer<typeof CompanyFormSchema>;
