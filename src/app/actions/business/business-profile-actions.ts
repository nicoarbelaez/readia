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
import {
  createBusiness,
  insertQuestionOptions,
  insertQuestions,
  insertResponses,
} from "@/app/actions/business/business-aux";
import { DbQuestion, DbResponse } from "@/types/database/entities";
import {
  Business,
  BusinessProfile,
  QuestionData,
  QuestionWithResponses,
  ResponseData,
} from "@/types/business/type";
import { revalidatePath } from "next/cache";

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
      ...formData.extraQuestions.additionalQuestions.map((q) => ({
        ...q,
        aiGenerated: true,
      })),
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
      .select("*")
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
      category: business.category || "NaN",
      netEarnings: business.net_earnings || 0,
    })) as Business[];
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
      .select("*")
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
      description: rawBusiness.description || "N/A",
      sector: rawBusiness.sector || "N/A",
      employeeCount: rawBusiness.employee_count || 0,
      category: rawBusiness.category || "N/A",
      netEarnings: rawBusiness.net_earnings || 0,
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

    const responsesData: ResponseData[] = (rawResponses as DbResponse[]).map(
      (r) => ({
        id: r.id,
        businessId: r.business_id,
        userId: r.user_id,
        responseText: r.response_text,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
        questionId: r.question_id,
      }),
    );

    // 2b. Obtener todas las preguntas únicas asociadas
    const questionIds = [...new Set(responsesData.map((r) => r.questionId))];

    const { data: rawQuestions, error: questionsError } = await supabase
      .schema("public_web")
      .from("questions")
      .select("*")
      .in("id", questionIds);

    if (questionsError) {
      console.error("Error fetching questions:", questionsError);
      return null;
    }

    const questionsData: QuestionData[] = (rawQuestions as DbQuestion[]).map(
      (q) => ({
        id: q.id,
        questionType: q.question_type,
        questionText: q.question_text,
        aiGenerated: q.ai_generated || false,
        options: [],
      }),
    );

    // 2c. Obtener opciones para las preguntas (si las hay)
    const { data: rawOptions, error: optionsError } = await supabase
      .schema("public_web")
      .from("question_options")
      .select("*")
      .in("question_id", questionIds)
      .order("option_order", { ascending: true });

    if (optionsError) {
      console.error("Error fetching question options:", optionsError);
      // No fallamos todo, solo no habrá opciones
    } else if (rawOptions) {
      // Asignar opciones a las preguntas correspondientes
      rawOptions.forEach((opt) => {
        const q = questionsData.find((q) => q.id === opt.question_id);
        if (q) {
          if (!q.options) q.options = [];
          q.options.push({
            label: opt.option_label ?? "N/A",
            value: opt.option_text,
          });
        }
      });
    }

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

export async function updateBusinessResponses(
  businessId: number,
  responses: { questionId: string; response: string | string[] }[],
): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const user = await loadUser();

    if (!user?.id) {
      return { success: false, message: "Usuario no autenticado" };
    }

    const updates = responses.map((r) => {
      const responseText = Array.isArray(r.response)
        ? JSON.stringify(r.response)
        : r.response;

      return {
        business_id: businessId,
        question_id: r.questionId,
        user_id: user.id,
        response_text: responseText,
        updated_at: new Date().toISOString(),
      };
    });

    const { error } = await supabase
      .schema("public_web")
      .from("responses")
      .upsert(updates, {
        onConflict: "business_id, question_id, user_id",
        ignoreDuplicates: false,
      });

    if (error) {
      console.error("Error updating responses:", error);
      throw new Error(error.message);
    }

    revalidatePath("/business");
    return { success: true, message: "Respuestas actualizadas correctamente" };
  } catch (error) {
    console.error("Error in updateBusinessResponses:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error al actualizar respuestas",
    };
  }
}

export async function regenerateDiagnostic(
  businessId: number,
): Promise<ActionResult> {
  try {
    console.log("Regenerating diagnostic for business:", businessId);

    revalidatePath("/business");
    return {
      success: true,
      message: "Diagnóstico regenerado (simulado)",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al regenerar diagnóstico: " + error,
    };
  }
}
