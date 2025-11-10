export interface ActionResult {
  success: boolean;
  message?: string;
  data?: unknown;
  error?: string;
}