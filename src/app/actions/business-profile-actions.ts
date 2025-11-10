"use server";

import { CompanyQuestions } from "@/components/forms/company-profile/schemas/company-form-schemas";
import loadUser from "@/lib/load-session";
import { QuestionsList } from "@/types/question";
import { createClient } from "@/utils/supabase/server";
import { setTimeout } from "timers/promises";

export async function generarteIAQuestion(
  questions: CompanyQuestions,
): Promise<QuestionsList> {
  await setTimeout(2000);
  return [
    {
      id: "que1",
      type: "open" as const,
      label: "¿Test 1?",
    },
    {
      id: "que2",
      type: "multiple" as const,
      label: "¿Test 2?",
      options: [
        {
          value: "inicial",
          label: "Inicial - Procesos principalmente manuales",
        },
        {
          value: "desarrollo",
          label: "En desarrollo - Algunos procesos digitalizados",
        },
        {
          value: "avanzado",
          label: "Avanzado - Mayoría de procesos digitales",
        },
        { value: "optimizado", label: "Optimizado - Completamente digital" },
      ],
    },
    {
      id: "que3",
      type: "single" as const,
      label: "¿Test 3?",
      options: [
        { value: "si", label: "Sí" },
        { value: "no", label: "No" },
        { value: "en_proceso", label: "En proceso de desarrollo" },
      ],
    },
  ];
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
