"use server";

import {
  CompanyGeneralInfo,
  CompanyQuestion,
} from "@/components/forms/company-profile/schemas/company-form-schemas";
import {
  DbQuestionInsert,
  DbQuestionOptionInsert,
  DbResponseInsert,
} from "@/types/database/entities";
import { QuestionType } from "@/types/question";
import { CreateClientReturn } from "@/utils/supabase/server";

export async function createBusiness(
  supabase: CreateClientReturn,
  userId: string,
  generalInfo: CompanyGeneralInfo,
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
      category: generalInfo.category,
      net_earnings: generalInfo.netEarnings,
    })
    .select()
    .single();

  if (businessError || !businessData) {
    throw new Error(businessError?.message || "Error al crear el negocio");
  }

  // Retorna el ID del negocio recién creado
  return businessData.id;
}

export async function insertQuestions(
  supabase: CreateClientReturn,
  businessId: number,
  questions: CompanyQuestion[],
): Promise<{ id: string; question_text: string }[]> {
  const questionsToInsert: DbQuestionInsert[] = questions.map((question) => ({
    business_id: businessId,
    // Usamos la etiqueta original del formulario, que es el texto de la pregunta
    question_text: question.originalQuestion.label,
    question_type: question.originalQuestion.type as QuestionType,
    required: true,
  }));

  const { data: questionsData, error: questionsError } = await supabase
    .schema("public_web")
    .from("questions")
    .insert(questionsToInsert)
    .select("id, question_text"); // Necesitamos el ID y el texto para el mapeo posterior

  if (questionsError || !questionsData) {
    throw new Error(
      questionsError?.message || "Error al insertar las preguntas",
    );
  }

  return questionsData;
}

export async function insertQuestionOptions(
  supabase: CreateClientReturn,
  questions: CompanyQuestion[],
  questionIdMap: Map<string, string>,
): Promise<void> {
  const optionsToInsert: DbQuestionOptionInsert[] = [];

  questions.forEach((question) => {
    const questionId = questionIdMap.get(question.originalQuestion.label);

    if (!questionId) {
      console.warn(
        `Question ID not found for text: ${question.originalQuestion.label}`,
      );
      return;
    }

    // Solo insertamos opciones si la pregunta es de tipo selección
    if (
      question.originalQuestion.type === "multiple" ||
      question.originalQuestion.type === "single"
    ) {
      question.originalQuestion.options?.forEach(
        (option, optionIndex: number) => {
          optionsToInsert.push({
            question_id: questionId,
            option_text: option.value,
            option_label: option.label,
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

export async function insertResponses(
  supabase: CreateClientReturn,
  businessId: number,
  userId: string,
  questions: CompanyQuestion[],
  questionIdMap: Map<string, string>, // question_text -> question_id
): Promise<void> {
  const responsesToInsert: DbResponseInsert[] = [];

  questions.forEach((question) => {
    const questionId = questionIdMap.get(question.originalQuestion.label);

    if (!questionId) {
      console.warn(
        `Question ID not found for text: ${question.originalQuestion.label}`,
      );
      return;
    }

    let answerText: string;

    // La respuesta puede ser un string (open/single) o un array de strings (multiple)
    if (Array.isArray(question.answer)) {
      // Para respuestas múltiples, serializamos el array a JSON
      answerText = JSON.stringify(question.answer);
    } else {
      // Para respuestas abiertas o de selección simple, usamos el string directamente
      answerText = question.answer;
    }

    responsesToInsert.push({
      business_id: businessId,
      question_id: questionId,
      user_id: userId,
      response_text: answerText,
    });
  });

  if (responsesToInsert.length > 0) {
    const { error: responsesError } = await supabase
      .schema("public_web")
      .from("responses")
      .insert(responsesToInsert);

    if (responsesError) {
      throw new Error(
        responsesError.message || "Error al insertar las respuestas",
      );
    }
  }
}
