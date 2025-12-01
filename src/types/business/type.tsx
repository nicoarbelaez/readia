import { CompanyGeneralInfo } from "@/components/forms/company-profile/schemas/company-form-schemas";
import { Database } from "@/types/database";

export type Business = {
  id: number;
} & CompanyGeneralInfo;

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
  questionType: Database["public_web"]["Enums"]["question_type_enum"];
  questionText: string;
  aiGenerated: boolean;
  options?: { label: string; value: string }[];
}

export interface QuestionWithResponses extends QuestionData {
  responses: ResponseData[];
}

export interface BusinessProfile {
  business: Business;
  questionsAndResponses: QuestionWithResponses[];
}
