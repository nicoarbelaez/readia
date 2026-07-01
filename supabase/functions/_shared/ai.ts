import { generateObject } from 'npm:ai';
import { createGoogleGenerativeAI } from 'npm:@ai-sdk/google';
import { createOpenAI } from 'npm:@ai-sdk/openai';
import { z } from 'npm:zod';

interface GenerateSharedObjectOptions<T extends z.ZodTypeAny> {
  prompt: string;
  system?: string;
  schema: T;
  output?: 'object' | 'array';
}

export async function generateSharedObject<T extends z.ZodTypeAny>({
  prompt,
  system,
  schema,
  output = 'object',
}: GenerateSharedObjectOptions<T>) {
  const attemptsLog: { model: string; attempt: number; success: boolean; error?: string }[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastError: any = null;

  // 1. Try Gemini (gemini-2.5-flash-lite)
  const geminiApiKey = Deno.env.get('GOOGLE_GENERATIVE_AI_API_KEY') || '';
  if (!geminiApiKey) {
    console.warn('[ai-helper] GOOGLE_GENERATIVE_AI_API_KEY is not defined.');
  }
  const googleModel = createGoogleGenerativeAI({ apiKey: geminiApiKey });

  for (let i = 1; i <= 2; i++) {
    try {
      console.log(`[ai-helper] Attempt ${i} with Gemini (gemini-2.5-flash-lite)...`);
      const { object } = await generateObject({
        model: googleModel('gemini-2.5-flash-lite'),
        schema,
        output,
        prompt,
        system,
      });

      attemptsLog.push({ model: 'gemini-2.5-flash-lite', attempt: i, success: true });
      console.log(`[ai-helper] Gemini success on attempt ${i}.`);
      return {
        object,
        meta: {
          modelUsed: 'gemini-2.5-flash-lite',
          attemptsCount: i,
          attemptsLog,
        },
      };
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errMsg = (err as any)?.message || String(err);
      console.error(`[ai-helper] Gemini attempt ${i} failed:`, errMsg);
      attemptsLog.push({ model: 'gemini-2.5-flash-lite', attempt: i, success: false, error: errMsg });
      lastError = err;
    }
  }

  // 2. Try OpenRouter (openrouter/free)
  const openrouterApiKey = Deno.env.get('OPENROUTER_API_KEY') || '';
  if (!openrouterApiKey) {
    console.warn('[ai-helper] OPENROUTER_API_KEY is not defined. Fallback to OpenRouter might fail.');
  }
  const openrouterModel = createOpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: openrouterApiKey,
  });

  for (let i = 1; i <= 2; i++) {
    try {
      console.log(`[ai-helper] Fallback: Attempt ${i} with OpenRouter (openrouter/free)...`);
      const { object } = await generateObject({
        model: openrouterModel('openrouter/free'),
        schema,
        output,
        prompt,
        system,
      });

      attemptsLog.push({ model: 'openrouter/free', attempt: i, success: true });
      console.log(`[ai-helper] OpenRouter success on attempt ${i}.`);
      return {
        object,
        meta: {
          modelUsed: 'openrouter/free',
          attemptsCount: i,
          attemptsLog,
        },
      };
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errMsg = (err as any)?.message || String(err);
      console.error(`[ai-helper] OpenRouter attempt ${i} failed:`, errMsg);
      attemptsLog.push({ model: 'openrouter/free', attempt: i, success: false, error: errMsg });
      lastError = err;
    }
  }

  // If both failed, throw error
  throw new Error(`AI generation failed after all attempts. Last error: ${(lastError as any)?.message || lastError}`);
}
