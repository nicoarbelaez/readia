import { Database } from "@/types/database";

// Alias corto para no repetir la ruta larga a "public_web"
type PublicWebSchema = Database["public_web"]["Tables"];

// ------------------------------------------------------------------
// TABLE: QUESTIONS
// ------------------------------------------------------------------

export type DbQuestion = PublicWebSchema["questions"]["Row"];
export type DbQuestionInsert = PublicWebSchema["questions"]["Insert"];
export type DbQuestionUpdate = PublicWebSchema["questions"]["Update"];

// ------------------------------------------------------------------
// TABLE: RESPONSES
// ------------------------------------------------------------------

export type DbResponse = PublicWebSchema["responses"]["Row"];
export type DbResponseInsert = PublicWebSchema["responses"]["Insert"];
export type DbResponseUpdate = PublicWebSchema["responses"]["Update"];

// ------------------------------------------------------------------
// TABLE: QUESTION OPTIONS
// ------------------------------------------------------------------

export type DbQuestionOption = PublicWebSchema["question_options"]["Row"];
export type DbQuestionOptionInsert =
  PublicWebSchema["question_options"]["Insert"];
export type DbQuestionOptionUpdate =
  PublicWebSchema["question_options"]["Update"];

// ------------------------------------------------------------------
// TABLE: BUSINESS OPTIONS
// ------------------------------------------------------------------

export type DbBusiness = PublicWebSchema["businesses"]["Row"];
export type DbBusinessInsert = PublicWebSchema["businesses"]["Insert"];
export type DbBusinessUpdate = PublicWebSchema["businesses"]["Update"];
