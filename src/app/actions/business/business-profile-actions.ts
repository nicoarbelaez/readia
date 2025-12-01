"use server";

import {
  CompanyFormData,
  CompanyGeneralInfo,
  CompanyQuestion,
  CompanyQuestions,
} from "@/components/forms/company-profile/schemas/company-form-schemas";
import { QuestionsList, QuestionType } from "@/types/question";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { QuestionsListSchema } from "@/components/forms/company-profile/schemas/question-schema";
import { ActionResult } from "@/types/action-type";
import { createClient, CreateClientReturn } from "@/utils/supabase/server";
import loadUser from "@/lib/load-session";
import { Database } from "@/types/database";
import { type Business } from "@/components/sidebar/hooks/use-business-switcher";

type QuestionInsertData =
  Database["public_web"]["Tables"]["questions"]["Insert"];

type QuestionOptionInsertData =
  Database["public_web"]["Tables"]["question_options"]["Insert"];

export async function generarteIAQuestion(
  questionsAnswered: CompanyQuestions,
  generalInfo: CompanyGeneralInfo,
  questions: QuestionsList,
): Promise<QuestionsList> {
  const prompt = `
    Generate up to 10 additional questions for a company based on the following user responses. The questions should elicit answers that help create a diagnosis of the company's capabilities regarding the adoption of artificial intelligence in its IT processes:

    ${JSON.stringify(questionsAnswered)}

    Another context of the company:
    ${JSON.stringify(generalInfo)}

    ### Instructions:

    1. New questions must be related to the topics mentioned in the user’s answers.
    2. Each question must have a "type": "open", "multiple", or "single".
    3. If the type is "multiple" or "single", include an "options" property with an array of { "value": string, "label": string }.
    4. All string content (labels, options, text) must be written in Spanish.
    5. Return only a valid JSON, without any extra text or explanation.
    6. The JSON must be an array of objects, following this example structure:

    ${JSON.stringify(questions)}

    Do not include any text, explanation, or comments outside the JSON output.
  `;

  try {
    const { object } = await generateObject({
      model: google("gemini-2.5-flash-lite"),
      output: "array",
      schema: QuestionsListSchema,
      prompt,
    });

    const flattened: QuestionsList = object.flat();
    return flattened;
  } catch (error) {
    console.error("Error generating AI questions:", error);
    // Aquí lanzar o devolver un error estructurado
    throw new Error(
      "No se pudieron generar nuevas preguntas. Por favor intenta de nuevo.",
    );
  }
}

export async function createBusinessProfile(
  formData: CompanyFormData,
): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const user = await loadUser();

    if (!user?.id) {
      throw new Error("Usuario no autenticado");
    }

    // 1. Crear el negocio
    const businessId = await createBusiness(
      supabase,
      user.id,
      formData.generalInfo,
    );

    // 2. Preparar y insertar preguntas
    const allQuestions: CompanyQuestion[] = [
      ...formData.questions.questions,
      ...formData.extraQuestions.additionalQuestions,
    ];

    const questionIds = await insertQuestions(
      supabase,
      businessId,
      allQuestions,
    );

    // 3. Insertar opciones de preguntas
    await insertQuestionOptions(supabase, allQuestions, questionIds);

    return {
      success: true,
      data: { businessId },
      message: "Perfil de empresa creado exitosamente",
    };
  } catch (error) {
    console.error("Error creating business profile:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error desconocido al crear el perfil de empresa",
    };
  }
}

async function createBusiness(
  supabase: CreateClientReturn,
  userId: string,
  generalInfo: CompanyFormData["generalInfo"],
): Promise<number> {
  const { data: businessData, error: businessError } = await supabase
    .schema("public_web")
    .from("businesses")
    .insert({
      company_name: generalInfo.companyName,
      sector: generalInfo.sector,
      employee_count: generalInfo.employeeCount,
      description: generalInfo.description,
      user_owner_id: userId,
    })
    .select()
    .single();

  if (businessError || !businessData) {
    throw new Error(businessError?.message || "Error al crear el negocio");
  }

  return businessData.id;
}

async function insertQuestions(
  supabase: CreateClientReturn,
  businessId: number,
  questions: CompanyQuestion[],
): Promise<string[]> {
  const questionsToInsert: QuestionInsertData[] = questions.map((question) => ({
    business_id: businessId,
    question_text: question.originalQuestion.label,
    question_type: question.originalQuestion.type as QuestionType,
    required: true,
  }));

  const { data: questionsData, error: questionsError } = await supabase
    .schema("public_web")
    .from("questions")
    .insert(questionsToInsert)
    .select("id, question_text");

  if (questionsError || !questionsData) {
    throw new Error(
      questionsError?.message || "Error al insertar las preguntas",
    );
  }

  return questionsData.map((q) => q.id);
}

async function insertQuestionOptions(
  supabase: CreateClientReturn,
  questions: CompanyQuestion[],
  questionIds: string[],
): Promise<void> {
  const optionsToInsert: QuestionOptionInsertData[] = [];

  questions.forEach((question, index) => {
    if (
      question.originalQuestion.type === "multiple" ||
      question.originalQuestion.type === "single"
    ) {
      question.originalQuestion.options?.forEach(
        (option, optionIndex: number) => {
          optionsToInsert.push({
            question_id: questionIds[index],
            option_text: option.label,
            option_order: optionIndex,
          });
        },
      );
    }
  });

  if (optionsToInsert.length > 0) {
    const { error: optionsError } = await supabase
      .schema("public_web")
      .from("question_options")
      .insert(optionsToInsert);

    if (optionsError) {
      throw new Error(
        optionsError.message || "Error al insertar las opciones de preguntas",
      );
    }
  }
}

export async function getBusinesses(): Promise<Business[]> {
  try {
    const supabase = await createClient();
    const user = await loadUser();

    if (!user?.id) {
      return [];
    }

    const { data: businesses, error } = await supabase
      .schema("public_web")
      .from("businesses")
      .select("id, company_name, description, sector, employee_count")
      .eq("user_owner_id", user.id)
      .order("create_at", { ascending: false });

    if (error) {
      console.error("Error fetching businesses:", error);
      return [];
    }

    return businesses.map((business) => ({
      id: business.id,
      companyName: business.company_name,
      description: business.description,
      sector: business.sector || "NaN",
      employeeCount: business.employee_count || 0,
    }));
  } catch (error) {
    console.error("Error in getBusinesses:", error);
    return [];
  }
}
