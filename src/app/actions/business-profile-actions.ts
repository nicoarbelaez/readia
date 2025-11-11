"use server";

import {
  CompanyGeneralInfo,
  CompanyQuestions,
} from "@/components/forms/company-profile/schemas/company-form-schemas";
import { QuestionsList } from "@/types/question";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { QuestionsListSchema } from "@/components/forms/company-profile/schemas/question-schema";

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

  console.log("Prompt to AI:", prompt);

  const { object } = await generateObject({
    model: google("gemini-2.5-flash-lite"),
    output: "array",
    schema: QuestionsListSchema,
    prompt,
  });

  const flattened: QuestionsList = object.flat();

  console.log("Generated Questions from AI:", flattened);
  return flattened;
}

// export async function saveCompanyInfo({
//   companyName,
//   sector,
//   numberOfEmployees,
//   largeDescription,
// }: saveCompanyInfoParams): Promise<ActionResult> {
//   const supabase = await createClient();
//   const { id } = await loadUser();

//   const { error, data } = await supabase
//     .schema("public_web")
//     .from("businesses")
//     .insert([
//       {
//         company_name: companyName,
//         sector: sector,
//         employee_count: numberOfEmployees,
//         description: largeDescription,
//         user_owner_id: id,
//       },
//     ])
//     .select();

//   if (error) {
//     return { success: false, message: `Error guardando business: ${error}` };
//   }

//   return { success: true, data };
// }
