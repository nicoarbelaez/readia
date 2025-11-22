"use server";

import {
  CompanyFormData,
  CompanyGeneralInfo,
  CompanyQuestion,
  CompanyQuestions,
} from "@/components/forms/company-profile/schemas/company-form-schemas";
import { QuestionsList } from "@/types/question";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { QuestionsListSchema } from "@/components/forms/company-profile/schemas/question-schema";
import { ActionResult } from "@/types/action-type";
import { createClient } from "@/utils/supabase/server";
import loadUser from "@/lib/load-session";
import { Database } from "@/types/database";
import { type Business } from "@/components/sidebar/hooks/use-business-switcher";
import {
  createBusiness,
  insertQuestionOptions,
  insertQuestions,
  insertResponses,
} from "@/app/actions/business/business-aux";

type RawQuestionData = Database["public_web"]["Tables"]["questions"]["Row"];

type RawResponseData = Database["public_web"]["Tables"]["responses"]["Row"];

export interface ResponseData {
  id: string;
  businessId: number;
  userId: string;
  responseText: string;
  createdAt: string;
  updatedAt: string;
  questionId: string;
}

export interface QuestionData {
  id: string;
  questionText: string;
}

interface QuestionWithResponses extends QuestionData {
  responses: ResponseData[];
}

export interface BusinessProfile {
  business: Business;
  questionsAndResponses: QuestionWithResponses[];
}

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

    // 2. Preparar y obtener la lista unificada de preguntas
    const allQuestions: CompanyQuestion[] = [
      ...formData.questions.questions,
      ...formData.extraQuestions.additionalQuestions,
    ];

    // 3. Insertar Preguntas y obtener sus IDs de vuelta
    const insertedQuestions = await insertQuestions(
      supabase,
      businessId,
      allQuestions,
    );

    // Mapear el ID insertado de vuelta a la pregunta original
    const questionIdMap = new Map<string, string>(); // question_text -> question_id
    insertedQuestions.forEach((q) => {
      // Usamos question_text como clave para emparejar
      questionIdMap.set(q.question_text, q.id);
    });

    // 4. Insertar Opciones de Pregunta (si las hay)
    await insertQuestionOptions(supabase, allQuestions, questionIdMap);

    // 5. Insertar Respuestas (la nueva función)
    await insertResponses(
      supabase,
      businessId,
      user.id,
      allQuestions,
      questionIdMap,
    );

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
      .order("create_at", { ascending: true });

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

export async function getFullBusinessProfile(): Promise<BusinessProfile | null> {
  try {
    const supabase = await createClient();
    const user = await loadUser();

    if (!user?.id) {
      console.error("User not logged in.");
      return null;
    }

    const { data: firstBusiness, error: firstBusinessError } = await supabase
      .schema("public_web")
      .from("businesses")
      .select("id")
      .eq("user_owner_id", user.id)
      .order("create_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (firstBusinessError && firstBusinessError.code !== "PGRST116") {
      // PGRST116 es 'Row not found', el cual es un caso de negocio válido
      console.error("Error fetching first business ID:", firstBusinessError);
      return null;
    }

    if (!firstBusiness) {
      console.log("No business found for user:", user.id);
      return null;
    }

    const firstBusinessId = firstBusiness.id;

    const { data: businessData, error: businessError } = await supabase
      .schema("public_web")
      .from("businesses")
      .select("id, company_name, description, sector, employee_count")
      .eq("id", firstBusinessId)
      .single();

    if (businessError || !businessData) {
      console.error("Error fetching business details:", businessError);
      return null;
    }

    const rawBusiness = businessData;
    const business: Business = {
      id: rawBusiness.id,
      companyName: rawBusiness.company_name,
      description: rawBusiness.description,
      sector: rawBusiness.sector || "N/A",
      employeeCount: rawBusiness.employee_count || 0,
    };

    const { data: rawResponses, error: responsesError } = await supabase
      .schema("public_web")
      .from("responses")
      .select(
        "id, business_id, user_id, response_text, created_at, updated_at, question_id",
      )
      .eq("business_id", firstBusinessId)
      .eq("user_id", user.id);

    if (responsesError) {
      console.error("Error fetching responses:", responsesError);
      return null;
    }

    const responsesData: ResponseData[] = (
      rawResponses as RawResponseData[]
    ).map((r) => ({
      id: r.id,
      businessId: r.business_id,
      userId: r.user_id,
      responseText: r.response_text,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      questionId: r.question_id,
    }));

    // 2b. Obtener todas las preguntas únicas asociadas
    const questionIds = [...new Set(responsesData.map((r) => r.questionId))];

    const { data: rawQuestions, error: questionsError } = await supabase
      .schema("public_web")
      .from("questions")
      .select("id, question_text")
      .in("id", questionIds);

    if (questionsError) {
      console.error("Error fetching questions:", questionsError);
      return null;
    }

    // Mapear RawQuestionData[] (snake_case) a QuestionData[] (camelCase)
    const questionsData: QuestionData[] = (
      rawQuestions as RawQuestionData[]
    ).map((q) => ({
      id: q.id,
      questionText: q.question_text,
    }));

    // 3. Procesar y estructurar la data (JOIN manual: Agrupar respuestas por pregunta)
    const questionsMap = new Map<string, QuestionWithResponses>();

    // Inicializar el mapa con todas las preguntas
    questionsData.forEach((q) => {
      questionsMap.set(q.id, {
        ...q,
        responses: [],
      });
    });

    // Asignar las respuestas a sus preguntas correspondientes
    responsesData.forEach((response) => {
      const questionId = response.questionId;
      const questionEntry = questionsMap.get(questionId);

      if (questionEntry) {
        questionEntry.responses.push(response);
      } else {
        console.warn(`Response found for unknown question ID: ${questionId}`);
      }
    });

    const questionsAndResponses = Array.from(questionsMap.values());

    // 4. Retornar el perfil completo
    const profile: BusinessProfile = {
      business,
      questionsAndResponses,
    };

    return profile;
  } catch (error) {
    console.error("Error in getFullBusinessProfile:", error);
    return null;
  }
}
