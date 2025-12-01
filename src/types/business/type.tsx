export interface Business {
  id: number;
  companyName: string;
  description: string | null;
  sector: string;
  employeeCount: number;
}

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

export interface QuestionWithResponses extends QuestionData {
  responses: ResponseData[];
}

export interface BusinessProfile {
  business: Business;
  questionsAndResponses: QuestionWithResponses[];
}
